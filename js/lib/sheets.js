/* ============================================================
   lib/sheets.js — descarga de datos desde Google Sheets (GViz / JSONP)
   Funciones compartidas por todos los paneles.
   Implementación idéntica a la que estaba duplicada en cada HTML.
   ============================================================ */

window.App = window.App || {};
App.lib = App.lib || {};

App.lib.sheets = (function () {
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

    function loadSheetJSONP(sheetId, sheetName) {
        return new Promise((resolve, reject) => {
            const cbName = 'GVIZ_CB_' + Math.random().toString(36).slice(2);
            let script = document.createElement('script');
            const timer = setTimeout(() => {
                cleanup();
                reject(new Error(`Timeout al cargar "${sheetName}"`));
            }, 15000);

            function cleanup() {
                clearTimeout(timer);
                delete window[cbName];
                if (script && script.parentNode) {
                    script.parentNode.removeChild(script);
                }
            }

            window[cbName] = function (resp) {
                cleanup();
                try {
                    resolve(gvizToObjects(resp));
                } catch (e) {
                    reject(new Error('Error al procesar datos: ' + e.message));
                }
            };

            script.onerror = () => {
                cleanup();
                reject(new Error(`No se pudo cargar "${sheetName}"`));
            };

            const base = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq`;
            const url = `${base}?sheet=${encodeURIComponent(sheetName)}&headers=1&tq=${encodeURIComponent('select *')}&tqx=out:json;responseHandler:${cbName}&nocache=${Date.now()}`;

            script.src = url;
            document.head.appendChild(script);
        });
    }

    return { gvizToObjects, loadSheetJSONP };
})();
