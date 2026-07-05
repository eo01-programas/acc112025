/* ============================================================
   lib/sheets.js — descarga de datos desde Google Sheets (GViz / JSONP)
   Funciones compartidas por todos los paneles.

   Caché de dos niveles (patrón tomado de PCP_confecciones/moldes):
   memoria → localStorage → red.
   - Datos con menos de TTL_MS se entregan AL INSTANTE (la vista pinta
     de inmediato) y se dispara un refresco en segundo plano que deja
     la caché fresca para la próxima navegación.
   - Tras recargar la página (o al día siguiente dentro del TTL no,
     pero sí como respaldo), localStorage evita esperar a Google.
   - Si la red falla y hay datos guardados (< MAX_AGE_MS), se entregan
     esos en lugar de mostrar error (igual que hace PCP).
   - Las vistas MUTAN las filas que reciben (_year, _week, sort...):
     la caché guarda y entrega SIEMPRE copias (deepClone) para que un
     montaje no contamine al siguiente.
   ============================================================ */

window.App = window.App || {};
App.lib = App.lib || {};

App.lib.sheets = (function () {

    // ---------- Parámetros de la caché ----------
    const TTL_MS = 5 * 60 * 1000;               // frescura máxima para pintar sin esperar la red
    const MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000; // más viejo que esto se purga (solo es respaldo sin red)
    const LS_PREFIX_BASE = 'ascal_sheets_';     // prefijo común (permite purgar formatos viejos)
    const LS_PREFIX = LS_PREFIX_BASE + 'v1::';  // subir v1 → v2 si cambia el formato guardado
    const MAX_PERSIST_CHARS = 4 * 1024 * 1024;  // hojas más grandes viven solo en memoria (no agotar la cuota)

    const memCache = new Map();   // clave -> { ts, data }  (los datos son propiedad de la caché)
    const inflight = new Map();   // clave -> Promise       (evita descargas duplicadas simultáneas)

    function cacheKey(sheetId, sheetName) {
        return sheetId + '::' + sheetName;
    }

    // ---------- Serialización para localStorage ----------
    // GViz entrega fechas como objetos Date reales y JSON los perdería:
    // se etiquetan al guardar y se reviven al leer.
    function jsonReplacer(key, value) {
        const raw = this[key];
        if (raw instanceof Date) return { __fecha__: raw.getTime() };
        return value;
    }
    function jsonReviver(key, value) {
        if (value && typeof value === 'object' && typeof value.__fecha__ === 'number') {
            return new Date(value.__fecha__);
        }
        return value;
    }

    function deepClone(value) {
        if (typeof structuredClone === 'function') return structuredClone(value);
        return JSON.parse(JSON.stringify(value, jsonReplacer), jsonReviver);
    }

    // ---------- Acceso a localStorage (puede fallar: modo privado, cuota) ----------
    function lsGet(key) { try { return localStorage.getItem(key); } catch (e) { return null; } }
    function lsSet(key, value) { try { localStorage.setItem(key, value); return true; } catch (e) { return false; } }
    function lsRemove(key) { try { localStorage.removeItem(key); } catch (e) { } }
    function lsKeys() {
        const keys = [];
        try {
            for (let i = 0; i < localStorage.length; i++) keys.push(localStorage.key(i));
        } catch (e) { }
        return keys;
    }

    // Lee la edad de una entrada sin parsear todo el JSON (el ts va primero
    // en el payload; las hojas pueden pesar varios MB).
    function tsDeEntrada(raw) {
        const m = String(raw).slice(0, 32).match(/"ts":(\d+)/);
        return m ? Number(m[1]) : NaN;
    }

    // Elimina entradas nuestras del localStorage: formatos viejos, vencidas
    // (> MAX_AGE_MS) y, con `todas`, cualquier otra salvo `conservar`.
    function purgeLs(todas, conservar) {
        lsKeys().forEach(k => {
            if (!k || k.indexOf(LS_PREFIX_BASE) !== 0 || k === conservar) return;
            if (todas || k.indexOf(LS_PREFIX) !== 0) { lsRemove(k); return; }
            const ts = tsDeEntrada(lsGet(k));
            if (!isFinite(ts) || Date.now() - ts >= MAX_AGE_MS) lsRemove(k);
        });
    }
    // Limpieza al arrancar, fuera del camino crítico del primer render.
    setTimeout(() => purgeLs(false), 0);

    // ---------- Lectura / escritura de la caché ----------
    // Devuelve una COPIA de los datos si hay algo utilizable, o null.
    // `permitirViejos` acepta datos con TTL vencido (respaldo cuando la red falla).
    function readCache(key, permitirViejos) {
        const ahora = Date.now();
        const enMem = memCache.get(key);
        if (enMem && (permitirViejos || ahora - enMem.ts < TTL_MS)) return deepClone(enMem.data);

        const raw = lsGet(LS_PREFIX + key);
        if (!raw) return null;
        const ts = tsDeEntrada(raw);
        if (!isFinite(ts)) return null;
        if (enMem && ts <= enMem.ts) return null;              // el LS no es más fresco que la memoria
        if (ahora - ts >= MAX_AGE_MS) return null;
        if (!permitirViejos && ahora - ts >= TTL_MS) return null;
        try {
            const entry = JSON.parse(raw, jsonReviver);
            if (!entry || !Array.isArray(entry.data) || !entry.data.length) return null;
            // Hidratar la memoria para próximas lecturas (la entrada queda en la caché).
            memCache.set(key, { ts: ts, data: entry.data });
            return deepClone(entry.data);
        } catch (e) {
            return null;
        }
    }

    function writeCache(key, data) {
        memCache.set(key, { ts: Date.now(), data: deepClone(data) });
        // Persistir después de que la vista pinte (stringify puede tardar con hojas grandes).
        setTimeout(() => persist(key), 0);
    }

    function persist(key) {
        const entry = memCache.get(key);
        if (!entry) return;
        let dataJson;
        try { dataJson = JSON.stringify(entry.data, jsonReplacer); } catch (e) { return; }
        if (dataJson.length > MAX_PERSIST_CHARS) return;    // demasiado grande: solo caché en memoria
        // El ts va primero para que purgeLs/readCache lean la edad sin parsear todo.
        const payload = '{"ts":' + entry.ts + ',"data":' + dataJson + '}';
        if (lsSet(LS_PREFIX + key, payload)) return;
        // Sin espacio: liberar el resto de nuestras entradas y reintentar una vez.
        purgeLs(true, LS_PREFIX + key);
        if (!lsSet(LS_PREFIX + key, payload)) {
            console.warn('[sheets] sin espacio en localStorage para "' + key + '"; la caché seguirá solo en memoria.');
        }
    }

    // ---------- Conversión GViz ----------
    function gvizToObjects(resp) {
        if (!resp || !resp.table) return [];
        const cols = (resp.table.cols || []).map(c => String(c.label || c.id || '').trim());
        return (resp.table.rows || []).map(r => {
            const o = {};
            cols.forEach((h, i) => {
                const cell = r.c && r.c[i] ? r.c[i] : null;
                o[h] = cell && (cell.v !== null && cell.v !== undefined) ? cell.v : '';
            });
            return o;
        });
    }

    // ---------- Descarga vía JSONP (sin caché) ----------
    // Timeout amplio, detección de error de GViz (hoja inexistente / sin
    // permiso), try/catch al mapear y captura de error de red.
    // Nota: ya NO se agrega `nocache=Date.now()`; así Google puede servir su
    // propia caché de resultados y la respuesta llega antes.
    function fetchSheetJSONP(sheetId, sheetName) {
        const TIMEOUT_MS = 20000;
        return new Promise((resolve, reject) => {
            const cbName = 'GVIZ_CB_' + Math.random().toString(36).slice(2);
            let script = document.createElement('script');
            let timer = null;

            function cleanup() {
                if (timer) { clearTimeout(timer); timer = null; }
                delete window[cbName];
                if (script && script.parentNode) {
                    script.parentNode.removeChild(script);
                    script = null;
                }
            }

            timer = setTimeout(() => {
                cleanup();
                reject(new Error(`Tiempo de espera agotado al cargar "${sheetName}".`));
            }, TIMEOUT_MS);

            window[cbName] = function (resp) {
                cleanup();
                // GViz puede responder con un objeto de error en lugar de tabla.
                if (resp && resp.status === 'error') {
                    const detail = resp.errors && resp.errors[0] && resp.errors[0].detailed_message;
                    reject(new Error(detail || `No se pudieron cargar los datos de "${sheetName}".`));
                    return;
                }
                try {
                    resolve(gvizToObjects(resp));
                } catch (e) {
                    reject(new Error('Error al procesar los datos: ' + e.message));
                }
            };

            script.onerror = () => {
                cleanup();
                reject(new Error(`No se pudo cargar la hoja "${sheetName}". Verifica que sea pública.`));
            };

            const base = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq`;
            const url = `${base}?sheet=${encodeURIComponent(sheetName)}&headers=1&tq=${encodeURIComponent('select *')}&tqx=out:json;responseHandler:${cbName}`;

            script.src = url;
            document.head.appendChild(script);
        });
    }

    // Descarga con de-duplicación: si ya hay una descarga en curso de la misma
    // hoja, se reutiliza esa promesa en vez de disparar otra.
    function fetchAndCache(key, sheetId, sheetName) {
        let p = inflight.get(key);
        if (p) return p;
        p = fetchSheetJSONP(sheetId, sheetName).then(data => {
            inflight.delete(key);
            // No cachear respuestas vacías: una hoja transitoriamente vacía no
            // debe "pisar" datos buenos ni quedarse pegada durante el TTL.
            if (Array.isArray(data) && data.length) writeCache(key, data);
            return data;
        }, err => {
            inflight.delete(key);
            throw err;
        });
        inflight.set(key, p);
        return p;
    }

    // Refresco en segundo plano: mantiene la caché fresca sin bloquear la vista.
    function refreshInBackground(key, sheetId, sheetName) {
        if (inflight.has(key)) return;
        fetchAndCache(key, sheetId, sheetName).catch(err => {
            console.warn(`[sheets] falló el refresco en segundo plano de "${sheetName}":`, err.message);
        });
    }

    // ---------- API pública ----------
    // Mismos parámetros de siempre; `opts` es opcional:
    //   { forceFresh: true } → ignora la caché y va directo a la red.
    function loadSheetJSONP(sheetId, sheetName, opts) {
        const key = cacheKey(sheetId, sheetName);
        if (!opts || !opts.forceFresh) {
            const cached = readCache(key, false);
            if (cached) {
                refreshInBackground(key, sheetId, sheetName);
                return Promise.resolve(cached);
            }
        }
        return fetchAndCache(key, sheetId, sheetName).catch(err => {
            // Red caída u hoja inaccesible: mejor datos de hasta 7 días que un error.
            const viejos = readCache(key, true);
            if (viejos) {
                console.warn(`[sheets] error al descargar "${sheetName}"; se muestran los últimos datos guardados:`, err.message);
                return viejos;
            }
            throw err;
        });
    }

    // Borra toda la caché (memoria + localStorage). Útil desde la consola:
    //   App.lib.sheets.clearCache()
    function clearCache() {
        memCache.clear();
        purgeLs(true);
    }

    return { gvizToObjects, loadSheetJSONP, clearCache };
})();
