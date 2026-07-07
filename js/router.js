/* ============================================================
   router.js — router por hash + carga perezosa de vistas
   - Registra vistas con App.registerView(name, { title, mount }).
   - Carga el JS (y CSS) de cada vista solo cuando se navega a ella.
   - Vistas aún no migradas siguen como archivos .html aparte (enlaces directos).
   ============================================================ */

window.App = window.App || {};

(function () {
    const views = {};            // name -> { title, mount }
    const loadedScripts = {};    // src -> true

    // Tabla de rutas de la SPA. Agregar aquí cada panel a medida que se migra.
    // libs: librerías pesadas (CDN) que NO están en el shell y se cargan bajo demanda.
    //   - preload: deben estar listas ANTES de montar la vista (se usan al renderizar).
    //   - lazy:    solo se usan en acciones posteriores (exportar/importar); se cargan
    //              en segundo plano al entrar a la vista, sin bloquear el render.
    // Ver tabla LIBS más abajo. Chart.js + plugins viven en el shell (los usa casi todo).
    const ROUTES = {
        depurado: {
            title: 'Reporte Depurado en Corte',
            script: 'js/views/depurado.js',
            css: 'css/views/depurado.css',
            libs: { lazy: ['xlsx'] }
        },
        'factory-code': {
            title: 'Resumen de Auditoría por Factory Code',
            script: 'js/views/factory-code.js',
            css: 'css/views/factory-code.css',
            libs: { preload: ['select2'], lazy: ['xlsx'] }
        },
        'segundas-terceras': {
            title: 'Segundas y Terceras',
            script: 'js/views/segundas-terceras.js',
            css: 'css/views/segundas-terceras.css',
            libs: { lazy: ['xlsx'] }
        },
        'producto-terminado': {
            title: 'Auditorías de Producto Terminado',
            script: 'js/views/producto-terminado.js',
            css: 'css/views/producto-terminado.css',
            libs: { lazy: ['xlsx'] }
        },
        'empaque': {
            title: 'Resultado Auditoría Empaque',
            script: 'js/views/empaque.js',
            css: 'css/views/empaque.css',
            libs: { lazy: ['xlsx'] }
        },
        'auditoria-lotes': {
            title: 'Auditoría Lotes de Producción',
            script: 'js/views/auditoria-lotes.js',
            css: 'css/views/auditoria-lotes.css',
            libs: { lazy: ['papa'] }
        },
        'reporte-inspeccion': {
            title: 'Reporte Inspección',
            script: 'js/views/reporte-inspeccion.js',
            css: 'css/views/reporte-inspeccion.css'
        }
    };

    // Menú de inicio. Los paneles ya migrados usan hash (#/...);
    // los pendientes siguen apuntando a su .html original.
    const HOME_HTML = `
        <div class="home-wrap">
            <div class="card-wrapper">
                <div class="card-header">ASEGURAMIENTO CALIDAD CONFECCIONES</div>
                <div class="menu-list">
                    <a class="menu-item" href="#/depurado">
                        <div class="icon-circle"><span>✔</span></div>
                        <div class="menu-texts">
                            <div class="menu-title">REPORTE DEPURADO EN CORTE</div>
                            <div class="menu-subtitle">Prendas y piezas depuradas en corte</div>
                        </div>
                    </a>
                    <a class="menu-item" href="#/factory-code">
                        <div class="icon-circle"><span>✔</span></div>
                        <div class="menu-texts">
                            <div class="menu-title">RESUMEN DE AUDITORÍA POR FACTORY CODE</div>
                            <div class="menu-subtitle">Reportes Interna y Cliente - Performance Auditorias</div>
                        </div>
                    </a>
                    <a class="menu-item" href="#/segundas-terceras">
                        <div class="icon-circle"><span>✔</span></div>
                        <div class="menu-texts">
                            <div class="menu-title">SEGUNDAS Y TERCERAS</div>
                            <div class="menu-subtitle">Distribución de defectos por cliente y tipo</div>
                        </div>
                    </a>
                    <a class="menu-item" href="#/producto-terminado">
                        <div class="icon-circle"><span>✔</span></div>
                        <div class="menu-texts">
                            <div class="menu-title">AUDITORIAS DE PRODUCTO TERMINADO</div>
                            <div class="menu-subtitle">Resumen y gráficos de producto terminado</div>
                        </div>
                    </a>
                    <a class="menu-item" href="#/empaque">
                        <div class="icon-circle"><span>✔</span></div>
                        <div class="menu-texts">
                            <div class="menu-title">RESULTADO AUDITORIA EMPAQUE</div>
                            <div class="menu-subtitle">Resumen por Factory Code, Customer y Result</div>
                        </div>
                    </a>
                    <a class="menu-item" href="#/auditoria-lotes">
                        <div class="icon-circle"><span>✔</span></div>
                        <div class="menu-texts">
                            <div class="menu-title">AUDITORIA LOTES DE PRODUCCION</div>
                            <div class="menu-subtitle">Auditoría por lotes y equipos (costura / acabados)</div>
                        </div>
                    </a>
                    <a class="menu-item" href="#/reporte-inspeccion">
                        <div class="icon-circle"><span>✔</span></div>
                        <div class="menu-texts">
                            <div class="menu-title">REPORTE INSPECCION</div>
                            <div class="menu-subtitle">Defectos por Linea y tipo</div>
                        </div>
                    </a>
                </div>
            </div>
        </div>`;

    // Cache-busting: subir este número al cambiar archivos de vistas/CSS para que
    // el navegador no use versiones cacheadas (evita tener que hacer Ctrl+F5).
    const ASSET_VERSION = '49';
    const bust = (url) => url + (url.indexOf('?') === -1 ? '?' : '&') + 'v=' + ASSET_VERSION;

    // ---- Librerías externas bajo demanda (no en el shell) -------------------
    // Cada una declara su(s) URL(s) de JS, CSS opcional y dependencias (needs).
    // Las URLs llevan versión fija, por eso NO se les aplica cache-busting.
    const LIBS = {
        xlsx:    { js: ['https://cdn.jsdelivr.net/npm/xlsx-js-style@1.2.0/dist/xlsx.bundle.js'] },
        papa:    { js: ['https://cdn.jsdelivr.net/npm/papaparse@5.3.2/papaparse.min.js'] },
        jquery:  { js: ['https://code.jquery.com/jquery-3.6.0.min.js'] },
        select2: {
            needs: ['jquery'],
            css: ['https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/css/select2.min.css'],
            js:  ['https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/js/select2.min.js']
        }
    };
    const loadedLibCss = {};   // href -> true
    const loadingLibs = {};    // name -> Promise (carga única e idempotente)

    function ensureLibCss(href) {
        if (loadedLibCss[href]) return;
        const l = document.createElement('link');
        l.rel = 'stylesheet';
        l.href = href;
        document.head.appendChild(l);
        loadedLibCss[href] = true;
    }

    // Carga una librería: primero sus dependencias, luego su CSS, luego su JS en
    // orden. Devuelve una Promesa cacheada (llamarla dos veces no recarga nada).
    function ensureLib(name) {
        if (loadingLibs[name]) return loadingLibs[name];
        const def = LIBS[name];
        if (!def) return Promise.reject(new Error('Librería desconocida: ' + name));
        loadingLibs[name] = (async () => {
            for (const dep of (def.needs || [])) await ensureLib(dep);
            (def.css || []).forEach(ensureLibCss);
            for (const src of (def.js || [])) await ensureScript(src, false);
        })().catch(err => {
            // No cachear el fallo: permite reintentar al volver a entrar a la vista.
            delete loadingLibs[name];
            throw err;
        });
        return loadingLibs[name];
    }

    function ensureLibs(names) {
        return Promise.all((names || []).map(ensureLib));
    }

    App.registerView = function (name, def) {
        views[name] = Object.assign(views[name] || {}, def);
    };

    function ensureScript(src, doBust) {
        return new Promise((resolve, reject) => {
            if (loadedScripts[src]) return resolve();
            const s = document.createElement('script');
            // Las vistas locales se "bustean" (?v=) para evitar caché vieja; las
            // librerías externas (versión fija en la URL) se cargan tal cual.
            s.src = (doBust === false) ? src : bust(src);
            s.onload = () => { loadedScripts[src] = true; resolve(); };
            s.onerror = () => reject(new Error('No se pudo cargar ' + src));
            document.body.appendChild(s);
        });
    }

    function ensureCss(href, id) {
        if (document.getElementById(id)) return;
        const l = document.createElement('link');
        l.rel = 'stylesheet';
        l.href = bust(href);
        l.id = id;
        l.dataset.viewCss = '1';
        document.head.appendChild(l);
    }

    function clearViewCss(keepId) {
        document.querySelectorAll('link[data-view-css]').forEach(l => {
            if (l.id !== keepId) l.remove();
        });
    }

    // ---- Toast de estado ("Datos ✓") en la esquina inferior derecha ----------
    // Cada panel trae su propio indicador de carga (#statusBadge / #loadingStatus /
    // #status). Tras montar la vista lo reubicamos en un toast común; cuando marca
    // "ok" se auto-oculta a los 3 s (si hay error, permanece visible).
    let _toastHideTimer = null;
    let _statusObserver = null;
    function getToastEl() {
        let t = document.getElementById('app-toast');
        if (!t) { t = document.createElement('div'); t.id = 'app-toast'; document.body.appendChild(t); }
        return t;
    }
    function clearStatusToast() {
        const t = document.getElementById('app-toast');
        if (t) { t.classList.remove('show'); t.innerHTML = ''; }
        if (_toastHideTimer) { clearTimeout(_toastHideTimer); _toastHideTimer = null; }
        if (_statusObserver) { try { _statusObserver.disconnect(); } catch (e) {} _statusObserver = null; }
    }
    function showStatusToast(root) {
        if (!root || typeof root.querySelector !== 'function') return;
        const badge = root.querySelector('#statusBadge, #loadingStatus, #status');
        if (!badge) return;
        const toast = getToastEl();
        toast.appendChild(badge);            // reubica el indicador del panel al toast
        toast.classList.add('show');
        const update = () => {
            const txt = (badge.textContent || '').toLowerCase();
            const cls = (badge.className || '').toLowerCase();
            const isError = cls.indexOf('error') > -1 || txt.indexOf('error') > -1;
            const isOk = cls.indexOf('ok') > -1 || txt.indexOf('✓') > -1 || txt.indexOf('listo') > -1;
            toast.classList.add('show');
            if (_toastHideTimer) { clearTimeout(_toastHideTimer); _toastHideTimer = null; }
            if (isOk && !isError) _toastHideTimer = setTimeout(() => toast.classList.remove('show'), 3000);
        };
        update();
        _statusObserver = new MutationObserver(update);
        _statusObserver.observe(badge, { childList: true, characterData: true, subtree: true, attributes: true, attributeFilter: ['class'] });
    }

    function parseHash() {
        // '#/depurado' -> 'depurado' ; '' -> ''
        return location.hash.replace(/^#\/?/, '').split('?')[0].trim();
    }

    // Chart.js y sus plugins van con `defer` en el shell: se ejecutan antes de
    // DOMContentLoaded. Esperar ese momento garantiza que las vistas encuentren
    // window.Chart al montar (el menú no depende de esto y pinta sin esperar).
    const shellLibsReady = new Promise(resolve => {
        if (document.readyState !== 'loading') resolve();
        else document.addEventListener('DOMContentLoaded', () => resolve(), { once: true });
    });

    async function render() {
        const root = document.getElementById('view-root');
        if (!root) return;
        const name = parseHash();
        clearStatusToast();

        // Inicio (menú)
        if (!name) {
            clearViewCss(null);
            document.body.dataset.view = '';
            document.title = 'Aseguramiento Calidad Confecciones';
            root.innerHTML = HOME_HTML;
            return;
        }

        const route = ROUTES[name];
        if (!route) {
            root.innerHTML = '<div class="router-msg error">Vista no encontrada: ' + name + '. <a href="#/">Volver al menú</a></div>';
            return;
        }

        document.body.dataset.view = name;
        document.title = route.title || 'Dashboard';
        root.innerHTML = '<div class="router-msg">Cargando ' + (route.title || name) + '…</div>';

        const cssId = 'viewcss-' + name;
        if (route.css) ensureCss(route.css, cssId);
        clearViewCss(cssId);

        // Librerías "lazy" (export/import): se descargan en segundo plano, sin
        // bloquear el render. Estarán listas cuando el usuario pulse Exportar/Importar.
        const libs = route.libs || {};
        if (libs.lazy && libs.lazy.length) {
            ensureLibs(libs.lazy).catch(e => console.warn('No se pudieron precargar libs (lazy) de', name, e));
        }

        try {
            // Esperar a que los scripts `defer` del shell (Chart.js + plugins) ya
            // se hayan ejecutado antes de montar la vista.
            await shellLibsReady;
            // Librerías "preload": la vista las necesita al renderizar (p. ej. Select2).
            // Si fallan (sin red), seguimos igual: las vistas degradan a controles
            // nativos, tal como hacían cuando se cargaban en el shell.
            if (libs.preload && libs.preload.length) {
                try { await ensureLibs(libs.preload); }
                catch (e) { console.warn('No se pudieron cargar libs (preload) de', name, e); }
            }
            if (route.script) await ensureScript(route.script);
            const v = views[name];
            if (v && typeof v.mount === 'function') {
                v.mount(root);
                showStatusToast(root);
            } else {
                root.innerHTML = '<div class="router-msg error">La vista "' + name + '" no se registró correctamente.</div>';
            }
        } catch (e) {
            console.error('Error cargando vista', name, e);
            root.innerHTML = '<div class="router-msg error">Error cargando la vista: ' + e.message + ' <a href="#/">Volver al menú</a></div>';
        }
    }

    window.addEventListener('hashchange', render);
    // Primer render inmediato (router.js es el último script del <body>, el DOM ya
    // existe): el menú aparece sin esperar la descarga de los scripts `defer` del
    // CDN. Si se entra directo a una vista (#/...), render() muestra "Cargando…"
    // al instante y espera shellLibsReady antes de montarla.
    render();
})();
