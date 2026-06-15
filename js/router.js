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
    const ROUTES = {
        depurado: {
            title: 'Reporte Depurado en Corte',
            script: 'js/views/depurado.js',
            css: 'css/views/depurado.css'
        },
        'factory-code': {
            title: 'Resumen de Auditoría por Factory Code',
            script: 'js/views/factory-code.js',
            css: 'css/views/factory-code.css'
        },
        'segundas-terceras': {
            title: 'Segundas y Terceras',
            script: 'js/views/segundas-terceras.js',
            css: 'css/views/segundas-terceras.css'
        },
        'producto-terminado': {
            title: 'Auditorías de Producto Terminado',
            script: 'js/views/producto-terminado.js',
            css: 'css/views/producto-terminado.css'
        },
        'empaque': {
            title: 'Resultado Auditoría Empaque',
            script: 'js/views/empaque.js',
            css: 'css/views/empaque.css'
        },
        'auditoria-lotes': {
            title: 'Auditoría Lotes de Producción',
            script: 'js/views/auditoria-lotes.js',
            css: 'css/views/auditoria-lotes.css'
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
    const ASSET_VERSION = '3';
    const bust = (url) => url + (url.indexOf('?') === -1 ? '?' : '&') + 'v=' + ASSET_VERSION;

    App.registerView = function (name, def) {
        views[name] = Object.assign(views[name] || {}, def);
    };

    function ensureScript(src) {
        return new Promise((resolve, reject) => {
            if (loadedScripts[src]) return resolve();
            const s = document.createElement('script');
            s.src = bust(src);
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

    function parseHash() {
        // '#/depurado' -> 'depurado' ; '' -> ''
        return location.hash.replace(/^#\/?/, '').split('?')[0].trim();
    }

    async function render() {
        const root = document.getElementById('view-root');
        if (!root) return;
        const name = parseHash();

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

        try {
            if (route.script) await ensureScript(route.script);
            const v = views[name];
            if (v && typeof v.mount === 'function') {
                v.mount(root);
            } else {
                root.innerHTML = '<div class="router-msg error">La vista "' + name + '" no se registró correctamente.</div>';
            }
        } catch (e) {
            console.error('Error cargando vista', name, e);
            root.innerHTML = '<div class="router-msg error">Error cargando la vista: ' + e.message + ' <a href="#/">Volver al menú</a></div>';
        }
    }

    window.addEventListener('hashchange', render);
    window.addEventListener('DOMContentLoaded', render);
})();
