/* ============================================================
   views/segundas-terceras.js - Vista "Segundas y Terceras" (SPA)
   Migrado desde SEGUNDAS Y TERCERAS.html. Logica y marcado originales: el <script> se
   ejecuta dentro de mount() (tras inyectar el template) para que el
   DOM exista, igual que cuando el <script> estaba al final del body.
   Arranques diferidos (DOMContentLoaded / ready) -> ejecucion inmediata.
   ============================================================ */
(function () {
    var TEMPLATE = "\u003cdiv class=\"container\"\u003e\r\n\r\n    \u003cdiv style=\"display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px; gap: 16px;\"\u003e\r\n        \u003cdiv style=\"display: flex; flex-direction: column; align-items: stretch; gap: 6px;\"\u003e\r\n                \u003cdiv style=\"display: flex; align-items: center; gap: 8px; flex-wrap:nowrap;\"\u003e\r\n                \u003ch1 style=\"text-align: left; margin: 0; font-size: 26px; letter-spacing: 0.03em; white-space:nowrap;\"\u003eSEGUNDAS Y TERCERAS\u003c/h1\u003e\r\n\r\n                \u003c!-- Controles de filtro: Periodo y Selección (semana/mes) --\u003e\r\n                \u003cdiv id=\"filters\" style=\"display: flex; align-items: center; gap: 8px; margin-left: 12px; flex-wrap: wrap;\"\u003e\r\n                    \u003cdiv class=\"labelframe\"\u003e\r\n                        \u003cspan class=\"labelframe-title\"\u003ePeriodo:\u003c/span\u003e\r\n                        \u003cdiv class=\"labelframe-content\" style=\"gap: 4px; flex-wrap: nowrap;\"\u003e\r\n                            \u003cselect id=\"filterGroupBy\" class=\"small-select\" style=\"font-family: Calibri, Arial, sans-serif; font-size:9pt; padding:2px 6px;\"\u003e\r\n                                \u003coption value=\"SEMANA\"\u003eSemana\u003c/option\u003e\r\n                                \u003coption value=\"MES\"\u003eMes\u003c/option\u003e\r\n                            \u003c/select\u003e\r\n                            \u003cselect id=\"filterPeriodSelect\" class=\"small-select\" style=\"font-family: Calibri, Arial, sans-serif; font-size:9pt; padding:2px 6px;\"\u003e\u003c/select\u003e\r\n                        \u003c/div\u003e\r\n                    \u003c/div\u003e\r\n                    \u003cdiv class=\"labelframe\"\u003e\r\n                        \u003cspan class=\"labelframe-title\"\u003eTipo:\u003c/span\u003e\r\n                        \u003cdiv class=\"labelframe-content\" style=\"gap: 10px; flex-wrap: nowrap;\"\u003e\r\n                            \u003cdiv class=\"switch-group\"\u003e\r\n                                \u003cspan class=\"switch-label\" style=\"font-size:9pt;\"\u003eSEGUNDA\u003c/span\u003e\r\n                                \u003clabel class=\"switch\" style=\"transform: scale(0.85); margin: 0;\"\u003e\r\n                                    \u003cinput id=\"switchSeg\" type=\"checkbox\" aria-checked=\"false\"\u003e\r\n                                    \u003cspan class=\"slider\"\u003e\u003c/span\u003e\r\n                                \u003c/label\u003e\r\n                            \u003c/div\u003e\r\n                            \u003cdiv class=\"switch-group\"\u003e\r\n                                \u003cspan class=\"switch-label\" style=\"font-size:9pt;\"\u003eTERCERA\u003c/span\u003e\r\n                                \u003clabel class=\"switch\" style=\"transform: scale(0.85); margin: 0;\"\u003e\r\n                                    \u003cinput id=\"switchTer\" type=\"checkbox\" aria-checked=\"false\"\u003e\r\n                                    \u003cspan class=\"slider\"\u003e\u003c/span\u003e\r\n                                \u003c/label\u003e\r\n                            \u003c/div\u003e\r\n                        \u003c/div\u003e\r\n                    \u003c/div\u003e\r\n                    \u003cdiv class=\"labelframe\"\u003e\r\n                        \u003cspan class=\"labelframe-title\"\u003eCliente:\u003c/span\u003e\r\n                        \u003cdiv class=\"labelframe-content\"\u003e\r\n                            \u003cselect id=\"filterCliente\" class=\"small-select\" style=\"font-family: Calibri, Arial, sans-serif; font-size:9pt; padding:2px 6px;\"\u003e\u003c/select\u003e\r\n                        \u003c/div\u003e\r\n                    \u003c/div\u003e\r\n                \u003c/div\u003e\r\n            \u003c/div\u003e\r\n\r\n            \u003cspan id=\"subtitle\" style=\"font-family: Calibri, Arial, sans-serif; font-size: 7pt; color: #666; font-weight: 500;\"\u003eDistribución de defectos por cliente y tipo\u003c/span\u003e\r\n        \u003c/div\u003e\r\n        \u003cdiv class=\"top-actions\" style=\"display:flex; align-items:center; gap:10px;\"\u003e\r\n            \u003cbutton id=\"paretoBtn\" class=\"btn-graficos\" title=\"Pareto\" style=\"background: linear-gradient(180deg,#f59e0b,#f97316);\"\u003e\r\n                \u003cspan class=\"ico\" aria-hidden=\"true\"\u003e\r\n                    \u003csvg width=\"18\" height=\"18\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"\u003e\u003crect x=\"3\" y=\"3\" width=\"3\" height=\"18\" rx=\"1\" fill=\"#fff\"/\u003e\u003crect x=\"9\" y=\"7\" width=\"3\" height=\"14\" rx=\"1\" fill=\"#fff\"/\u003e\u003crect x=\"15\" y=\"13\" width=\"3\" height=\"8\" rx=\"1\" fill=\"#fff\"/\u003e\u003c/svg\u003e\r\n                \u003c/span\u003e\r\n                Pareto\r\n            \u003c/button\u003e\r\n            \u003cbutton id=\"graficosBtn\" class=\"btn-graficos\" title=\"Gráficos\"\u003e\r\n                \u003cspan class=\"ico\" aria-hidden=\"true\"\u003e\r\n                    \u003c!-- simple icon --\u003e\r\n                    \u003csvg width=\"18\" height=\"18\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"\u003e\u003crect x=\"3\" y=\"11\" width=\"3\" height=\"10\" rx=\"1\" fill=\"#fff\"/\u003e\u003crect x=\"9\" y=\"6\" width=\"3\" height=\"15\" rx=\"1\" fill=\"#fff\"/\u003e\u003crect x=\"15\" y=\"2\" width=\"3\" height=\"19\" rx=\"1\" fill=\"#fff\"/\u003e\u003c/svg\u003e\r\n                \u003c/span\u003e\r\n                Gráficos\r\n            \u003c/button\u003e\r\n            \u003cbutton id=\"opBtn\" class=\"btn-graficos\" title=\"Buscar OP\" style=\"background: linear-gradient(180deg,#2b6cb0,#1f4e8a); padding:6px 10px;\"\u003eOP\u003c/button\u003e\r\n            \u003ca href=\"#/\" class=\"back-btn\" title='Inicio'\u003e🏠\u003c/a\u003e\r\n            \u003cspan id=\"statusBadge\" class=\"badge badge-loading\"\u003eCargando datos desde Google Sheets…\u003c/span\u003e\r\n        \u003c/div\u003e\r\n    \u003c/div\u003e\r\n\r\n    \u003cdiv id=\"errorBanner\" class=\"error-banner\"\u003e\u003c/div\u003e\r\n\r\n    \u003c!-- status-bar eliminado por solicitud --\u003e\r\n\r\n    \u003c!-- RESUMEN GLOBAL MOVIDO AQUÍ (debajo del estado y fuente) --\u003e\r\n    \u003cdiv id=\"resumenGlobal\" class=\"footer-summary hidden\"\u003e\r\n        \u003cdiv id=\"resumenGlobalLeft\" style=\"display:flex;gap:8px;align-items:center;\"\u003e\u003c/div\u003e\r\n    \u003c/div\u003e\r\n\r\n    \u003cdiv id=\"tableContainer\" class=\"table-wrapper hidden\"\u003e\r\n        \u003ctable id=\"tablaReporte\"\u003e\u003c/table\u003e\r\n    \u003c/div\u003e\r\n\r\n    \u003c!-- Modal para detalle por cliente/segundo-tercera --\u003e\r\n    \u003cdiv id=\"detailModalOverlay\" class=\"modal-overlay\" aria-hidden=\"true\"\u003e\r\n        \u003cdiv class=\"modal\" role=\"dialog\" aria-modal=\"true\"\u003e\r\n            \u003cheader\u003e\r\n                \u003ch3 id=\"detailModalTitle\"\u003eDetalle\u003c/h3\u003e\r\n                \u003cbutton id=\"detailModalClose\" class=\"close-btn\"\u003eCerrar\u003c/button\u003e\r\n            \u003c/header\u003e\r\n            \u003cdiv id=\"detailModalBody\"\u003e\r\n                \u003c!-- tabla de detalles --\u003e\r\n            \u003c/div\u003e\r\n        \u003c/div\u003e\r\n    \u003c/div\u003e\r\n\r\n    \u003cdiv id=\"noData\" class=\"footer-summary hidden\"\u003e\r\n        \u003cspan\u003eNo se encontraron datos en la hoja Defectos.\u003c/span\u003e\r\n    \u003c/div\u003e\r\n\r\n    \u003c!-- Modal para GRÁFICOS --\u003e\r\n    \u003cdiv id=\"chartsModalOverlay\" class=\"modal-overlay\" aria-hidden=\"true\"\u003e\r\n        \u003cdiv class=\"modal modal-large\" role=\"dialog\" aria-modal=\"true\"\u003e\r\n            \u003cheader\u003e\r\n                \u003ch3 id=\"chartsModalTitle\"\u003e% DEFECTOS vs INGRESO\u003c/h3\u003e\r\n                \u003cbutton id=\"chartsModalClose\" class=\"close-btn\"\u003eCerrar\u003c/button\u003e\r\n            \u003c/header\u003e\r\n            \u003cdiv id=\"chartsModalBody\"\u003e\r\n                \u003cdiv class=\"charts-controls\"\u003e\r\n                    \u003clabel style=\"display:flex;align-items:center;gap:8px;\"\u003eTipo:\r\n                        \u003clabel for=\"chartSwitchSeg\" style=\"margin:0;display:flex;align-items:center;gap:6px;font-size:10px;\"\u003e\r\n                            \u003cspan style=\"font-size:10px;\"\u003eSEGUNDA\u003c/span\u003e\r\n                            \u003cspan class=\"switch\"\u003e\r\n                                \u003cinput id=\"chartSwitchSeg\" type=\"checkbox\"\u003e\r\n                                \u003cspan class=\"slider\"\u003e\u003c/span\u003e\r\n                            \u003c/span\u003e\r\n                        \u003c/label\u003e\r\n                        \u003clabel for=\"chartSwitchTer\" style=\"margin:0;display:flex;align-items:center;gap:6px;font-size:10px;\"\u003e\r\n                            \u003cspan style=\"font-size:10px;\"\u003eTERCERA\u003c/span\u003e\r\n                            \u003cspan class=\"switch\"\u003e\r\n                                \u003cinput id=\"chartSwitchTer\" type=\"checkbox\"\u003e\r\n                                \u003cspan class=\"slider\"\u003e\u003c/span\u003e\r\n                            \u003c/span\u003e\r\n                        \u003c/label\u003e\r\n                    \u003c/label\u003e\r\n                    \u003clabel\u003ePeriodo:\r\n                        \u003cselect id=\"chartPeriodo\" class=\"small-select\"\u003e\r\n                            \u003coption value=\"SEMANA\"\u003eSemanal\u003c/option\u003e\r\n                            \u003coption value=\"MES\"\u003eMensual\u003c/option\u003e\r\n                        \u003c/select\u003e\r\n                    \u003c/label\u003e\r\n                    \u003c!-- Controles comunes --\u003e\r\n                    \u003clabel\u003eDesde Año:\r\n                        \u003cselect id=\"chartDesdeYear\"\u003e\u003c/select\u003e\r\n                    \u003c/label\u003e\r\n                    \u003c!-- Controles para vista SEMANAL --\u003e\r\n                    \u003clabel id=\"lblDesdeWeek\"\u003eDesde Semana:\r\n                        \u003cselect id=\"chartDesdeWeek\"\u003e\u003c/select\u003e\r\n                    \u003c/label\u003e\r\n                    \u003c!-- Controles para vista MENSUAL --\u003e\r\n                    \u003clabel id=\"lblDesdeMonth\" style=\"display:none;\"\u003eDesde Mes:\r\n                        \u003cselect id=\"chartDesdeMonth\"\u003e\u003c/select\u003e\r\n                    \u003c/label\u003e\r\n                    \u003clabel\u003eHasta Año:\r\n                        \u003cselect id=\"chartHastaYear\"\u003e\u003c/select\u003e\r\n                    \u003c/label\u003e\r\n                    \u003clabel id=\"lblHastaWeek\"\u003eHasta Semana:\r\n                        \u003cselect id=\"chartHastaWeek\"\u003e\u003c/select\u003e\r\n                    \u003c/label\u003e\r\n                    \u003clabel id=\"lblHastaMonth\" style=\"display:none;\"\u003eHasta Mes:\r\n                        \u003cselect id=\"chartHastaMonth\"\u003e\u003c/select\u003e\r\n                    \u003c/label\u003e\r\n                    \u003c!-- Removed Update button and \u0027Últimas 10 semanas\u0027 checkbox; chart updates on select change and defaults to last 10 weeks --\u003e\r\n                \u003c/div\u003e\r\n\r\n                \u003ccanvas id=\"chartsCanvas\" height=\"360\"\u003e\u003c/canvas\u003e\r\n            \u003c/div\u003e\r\n        \u003c/div\u003e\r\n    \u003c/div\u003e\r\n\u003c/div\u003e\r\n\r\n\u003c!-- Modal para PARETO --\u003e\r\n\u003cdiv id=\"paretoModalOverlay\" class=\"modal-overlay\" aria-hidden=\"true\"\u003e\r\n    \u003cdiv class=\"modal modal-large\" role=\"dialog\" aria-modal=\"true\"\u003e\r\n        \u003cheader\u003e\r\n            \u003ch3 id=\"paretoModalTitle\"\u003ePareto - Distribución de defectos\u003c/h3\u003e\r\n            \u003cbutton id=\"paretoModalClose\" class=\"close-btn\"\u003eCerrar\u003c/button\u003e\r\n        \u003c/header\u003e\r\n            \u003cdiv id=\"paretoModalBody\"\u003e\r\n            \u003cdiv class=\"charts-controls\"\u003e\r\n                \u003clabel style=\"display:flex;align-items:center;gap:8px;\"\u003eTipo:\r\n                    \u003clabel style=\"margin:0;display:flex;align-items:center;gap:6px;font-size:10px;\"\u003e\r\n                        \u003cspan style=\"font-size:10px;\"\u003eSEGUNDA\u003c/span\u003e\r\n                        \u003cspan class=\"switch\"\u003e\r\n                            \u003cinput id=\"paretoSwitchSeg\" type=\"checkbox\"\u003e\r\n                            \u003cspan class=\"slider\"\u003e\u003c/span\u003e\r\n                        \u003c/span\u003e\r\n                    \u003c/label\u003e\r\n                    \u003clabel style=\"margin:0;display:flex;align-items:center;gap:6px;font-size:10px;\"\u003e\r\n                        \u003cspan style=\"font-size:10px;\"\u003eTERCERA\u003c/span\u003e\r\n                        \u003cspan class=\"switch\"\u003e\r\n                            \u003cinput id=\"paretoSwitchTer\" type=\"checkbox\"\u003e\r\n                            \u003cspan class=\"slider\"\u003e\u003c/span\u003e\r\n                        \u003c/span\u003e\r\n                    \u003c/label\u003e\r\n                \u003c/label\u003e\r\n                \u003clabel\u003ePeriodo:\r\n                    \u003cselect id=\"paretoGroupBy\" class=\"small-select\"\u003e\r\n                        \u003coption value=\"SEMANA\"\u003eSemana\u003c/option\u003e\r\n                        \u003coption value=\"MES\"\u003eMes\u003c/option\u003e\r\n                    \u003c/select\u003e\r\n                \u003c/label\u003e\r\n                \u003clabel\u003eSeleccionar:\r\n                    \u003cselect id=\"paretoPeriodSelect\" class=\"small-select\"\u003e\u003c/select\u003e\r\n                \u003c/label\u003e\r\n            \u003c/div\u003e\r\n            \u003ccanvas id=\"paretoCanvas\" height=\"480\"\u003e\u003c/canvas\u003e\r\n        \u003c/div\u003e\r\n    \u003c/div\u003e\r\n\u003c/div\u003e\r\n\r\n        \u003c!-- Modal para BUSCADOR OP --\u003e\r\n        \u003cdiv id=\"opModalOverlay\" class=\"modal-overlay\" aria-hidden=\"true\"\u003e\r\n            \u003cdiv class=\"modal\" role=\"dialog\" aria-modal=\"true\"\u003e\r\n                \u003cheader\u003e\r\n                    \u003ch3 id=\"opModalTitle\"\u003eResumen por OP\u003c/h3\u003e\r\n                    \u003cbutton id=\"opModalClose\" class=\"close-btn\"\u003eCerrar\u003c/button\u003e\r\n                \u003c/header\u003e\r\n                \u003cdiv id=\"opModalBody\"\u003e\r\n                    \u003cdiv style=\"display:flex;gap:8px;align-items:center;margin-bottom:8px;\"\u003e\r\n                        \u003clabel style=\"display:flex;align-items:center;gap:6px;\"\u003eOP (buscar)\r\n                            \u003cinput id=\"opSearchInput\" type=\"text\" style=\"margin-left:6px;padding:6px;border:1px solid #d1d5db;border-radius:4px;\"\u003e\r\n                        \u003c/label\u003e\r\n                        \u003clabel style=\"display:flex;align-items:center;gap:6px;\"\u003eCOLOR (filtrar)\r\n                            \u003cselect id=\"opColorSelect\" style=\"margin-left:6px;padding:6px;border:1px solid #d1d5db;border-radius:4px;min-width:160px;\"\u003e\r\n                                \u003coption value=\"(todos)\"\u003e(todos)\u003c/option\u003e\r\n                            \u003c/select\u003e\r\n                        \u003c/label\u003e\r\n                        \u003cbutton id=\"opResumenBtn\" style=\"padding:6px 10px;border-radius:6px;background:#1f4e8a;color:#fff;border:none;\"\u003eResumen\u003c/button\u003e\r\n                        \u003cbutton id=\"opExcelBtn\" class=\"excel-btn\"\u003eExcel\u003c/button\u003e\r\n                    \u003c/div\u003e\r\n                    \u003cdiv id=\"opResumenTableContainer\" style=\"max-height:60vh;overflow:auto;border-top:1px solid #e2e8f0;padding-top:8px;\"\u003e\u003c/div\u003e\r\n                \u003c/div\u003e\r\n            \u003c/div\u003e\r\n        \u003c/div\u003e\r\n\r\n\u003c!-- Chart.js CDN --\u003e\r\n\u003c!-- Chart.js DataLabels plugin --\u003e\r\n\u003c!-- SheetJS (XLSX) for Excel export --\u003e\r\n";

    // Caché de datos entre visitas (el IIFE persiste aunque mount() se re-ejecute
    // y su estado interno se pierda) y clave de persistencia de filtros.
    // Mismo patrón que la vista depurado: TTL de 5 min + botón ⟳ para forzar.
    var DATA_TTL_MS = 5 * 60 * 1000;
    var _dataCache = { defectos: null, ingreso: null, loadedAt: 0 };
    var FILTERS_STORE_KEY = 'segundas-terceras.filters';

    function mount(root) {
        root.innerHTML = TEMPLATE;
        // Botón Inicio: ícono de casa en blanco (SVG, mismo estilo del resto de la app).
        var _homeBtn = root.querySelector('.back-btn');
        if (_homeBtn) _homeBtn.innerHTML = "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor'><path d='M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z'/></svg>";
        // Filtros como en depurado: añadir selector de Año (antes de Periodo) y mover el
        // bloque a su propia fila para que Año+Periodo+Semana/Mes+Tipo+Cliente quepan en
        // una sola línea (el título largo + botones no dejan espacio junto al h1).
        var _filtersBox = root.querySelector('#filters');
        if (_filtersBox && !root.querySelector('#filterYear')) {
            var _yearLf = document.createElement('div');
            _yearLf.className = 'labelframe';
            _yearLf.innerHTML = "<span class='labelframe-title'>Año:</span><div class='labelframe-content'><select id='filterYear' class='small-select' style='font-family: Calibri, Arial, sans-serif; font-size:9pt; padding:2px 6px;'></select></div>";
            _filtersBox.insertBefore(_yearLf, _filtersBox.firstElementChild);
        }
        // Filtros en la MISMA línea del título (a la izquierda de los botones). Con los
        // botones ahora circulares (compactos) y sin subtítulo, todo entra en una fila.
        if (_filtersBox) {
            _filtersBox.style.flexWrap = 'nowrap';
            _filtersBox.style.marginLeft = '12px';
        }
        // Quitar el subtítulo "Distribución de defectos por cliente y tipo".
        var _sub = root.querySelector('#subtitle');
        if (_sub) _sub.remove();
        // Pareto / Gráficos / OP: botones circulares con ícono blanco (el title da el
        // tooltip). Pareto conserva color naranja para destacar; Gráficos y OP en verde.
        function _iconBtn(sel, svg, bg, bgHover) {
            var b = root.querySelector(sel);
            if (!b) return;
            b.innerHTML = svg;
            b.style.width = '40px'; b.style.height = '40px'; b.style.minHeight = '40px';
            b.style.padding = '0'; b.style.borderRadius = '50%'; b.style.gap = '0';
            b.style.display = 'inline-flex'; b.style.alignItems = 'center'; b.style.justifyContent = 'center';
            b.style.border = 'none'; b.style.boxShadow = '0 2px 8px rgba(47,59,47,.22)';
            b.style.background = bg;
            b.addEventListener('mouseenter', function () { b.style.background = bgHover; });
            b.addEventListener('mouseleave', function () { b.style.background = bg; });
        }
        var _svgBars = "<svg width='20' height='20' viewBox='0 0 24 24' fill='#fff'><rect x='3' y='4' width='4' height='16' rx='1'/><rect x='10' y='9' width='4' height='11' rx='1'/><rect x='17' y='13' width='4' height='7' rx='1'/></svg>";
        var _svgLine = "<svg width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='#fff' stroke-width='2.2' stroke-linecap='round' stroke-linejoin='round'><path d='M4 16l5-5 3 3 7-8'/></svg>";
        var _svgSearch = "<svg width='20' height='20' viewBox='0 0 24 24' fill='#fff'><path d='M15.5 14h-.79l-.28-.27a6.5 6.5 0 10-.7.7l.27.28v.79l5 5 1.5-1.5-5-5zm-6 0A4.5 4.5 0 1114 9.5 4.5 4.5 0 019.5 14z'/></svg>";
        _iconBtn('#paretoBtn', _svgBars, '#f97316', '#ea580c');
        _iconBtn('#graficosBtn', _svgLine, 'var(--btn-chart-bg, #29b6f6)', 'var(--btn-chart-bg-hover, #0d47a1)');
        _iconBtn('#opBtn', _svgSearch, 'var(--sc8-primary)', 'var(--sc8-primary-dark)');
        // Botón ⟳: fuerza la recarga de datos saltándose el caché de 5 minutos.
        var _actions = root.querySelector('.top-actions');
        if (_actions && !root.querySelector('#refreshBtn')) {
            var _rb = document.createElement('button');
            _rb.id = 'refreshBtn';
            _rb.className = 'btn-graficos';
            _rb.title = 'Actualizar datos desde Google Sheets';
            _actions.insertBefore(_rb, root.querySelector('.back-btn'));
        }
        var _svgRefresh = "<svg width='20' height='20' viewBox='0 0 24 24' fill='#fff'><path d='M17.65 6.35A7.95 7.95 0 0012 4a8 8 0 108 8h-2a6 6 0 11-1.76-4.24L13 11h7V4l-2.35 2.35z'/></svg>";
        _iconBtn('#refreshBtn', _svgRefresh, 'var(--sc8-primary)', 'var(--sc8-primary-dark)');
        // loadData está declarada más abajo dentro de mount (hoisting).
        var _refreshBtnEl = root.querySelector('#refreshBtn');
        if (_refreshBtnEl) _refreshBtnEl.addEventListener('click', function () { loadData(true); });
        var __ready = function (fn) { if (typeof fn === 'function') fn(); };

        // ===== Script original del panel (relocado a mount) =====
    /*************************************************************
     * CONFIGURACIÓN
     *************************************************************/
    const SHEET_ID = "1CicFN8Csk9D8rebBJMzshvqMaCCmcb7GmcNrhqUL4yc";
    const DEFECTOS_SHEET = "Defectos";
    const INGRESO_SHEET = "ingreso a linea";

    // Nombre fallback si no se detecta automáticamente la columna de cantidad en "ingreso a linea"
    const INGRESO_QTY_FALLBACK_COL = "TOTAL";

    // Definición de cada defecto (según tu Excel "REPORTE")
    const DEFECT_DEFS = [
        { area: "HILANDERIA",   defecto: "CONTAMINADO",                               codigo: "01", col: "CONTAMINADO" },
        { area: "HILANDERIA",   defecto: "HILO Irregular",                            codigo: "02", col: "HILO Irregular" },
        { area: "HILANDERIA",   defecto: "MOTAS",                                      codigo: "03", col: "MOTAS" },

        { area: "TEJEDURIA",    defecto: "ANILLADOS",                                  codigo: "04", col: "ANILLADOS" },
        { area: "TEJEDURIA",    defecto: "FALLA DE LYCRA",                             codigo: "05", col: "FALLA DE LYCRA" },
        { area: "TEJEDURIA",    defecto: "FALLA DE AGUJA",                             codigo: "06", col: "FALLA DE AGUJA" },

        { area: "TINTORERIA",   defecto: "MALA IGUALACION",                            codigo: "07", col: "MALA IGUALACION" },
        { area: "TINTORERIA",   defecto: "MANCHAS COLORNTS O AUX",         codigo: "08", col: "MANCHAS DE COLORANTES O AUXILIARES" },
        { area: "TINTORERIA",   defecto: "QUEBRADURAS",                                codigo: "09", col: "QUEBRADURAS" },
        { area: "TINTORERIA",   defecto: "TRANSPARENCIA",                              codigo: "10", col: "TRANSPARENCIA" },

        { area: "VARIOS",       defecto: "HUECO POR PRUEBA",                           codigo: "11", col: "HUECO POR PRUEBA" },
        { area: "VARIOS",       defecto: "JALADURAS",                                  codigo: "12", col: "JALADURAS" },
        { area: "VARIOS",       defecto: "REVIRADO",                                   codigo: "13", col: "REVIRADO" },

        { area: "COSTURA",      defecto: "HUECOS - DESC",                              codigo: "14", col: "HUECOS - DESC" },
        { area: "COSTURA",      defecto: "MANCHAS DIFICILES",                          codigo: "15", col: "MANCHAS DIFICILES" },
        { area: "COSTURA",      defecto: "MEDIDAS",                                    codigo: "16", col: "MEDIDAS" },
        { area: "COSTURA",      defecto: "PICADOS POR AGUJA",                          codigo: "17", col: "PICADOS POR AGUJA" },

        { area: "OTROS PROCESOS", defecto: "BORDADO",                                  codigo: "18", col: "BORDADO" },
        { area: "OTROS PROCESOS", defecto: "ESTAMPADO",                                codigo: "19", col: "ESTAMPADO" },
        { area: "OTROS PROCESOS", defecto: "MANCHA DE ESTAMPADO",                      codigo: "20", col: "MANCHA DE ESTAMPADO" },
        { area: "OTROS PROCESOS", defecto: "PIGMENTO / LAVADO",                        codigo: "21", col: "PIGMENTO / LAVADO" },
        { area: "OTROS PROCESOS", defecto: "TRANSFER",                                 codigo: "22", col: "TRANSFER" }
    ];

    /*************************************************************
     * UTILIDADES GVIZ (similar a tu index.html)
     *************************************************************/
    // Descarga de datos GViz: la lógica vive en js/lib/sheets.js (App.lib.sheets).
    // Se conservan estos wrappers (mismo nombre) para no tocar el resto del panel.
    function gvizToObjects(resp) {
        return App.lib.sheets.gvizToObjects(resp);
    }

    function loadSheetJSONP(sheetId, sheetName) {
        return App.lib.sheets.loadSheetJSONP(sheetId, sheetName);
    }

    /*************************************************************
     * LÓGICA DEL REPORTE
     *************************************************************/
    const statusBadge   = document.getElementById("statusBadge");
    const tableContainer = document.getElementById("tableContainer");
    const tablaReporte   = document.getElementById("tablaReporte");
    const resumenGlobal  = document.getElementById("resumenGlobal");
    const noData         = document.getElementById("noData");
    const errorBanner    = document.getElementById("errorBanner");
    // Tipo activo para filtrar la vista: null | 'SEGUNDA' | 'TERCERA'
    let activeTipoFilter = null;

    function setStatus(text, type = "loading") {
        // Por defecto usar texto simple
        statusBadge.className = "badge";
        if (type === "loading") {
            statusBadge.classList.add("badge-loading");
            statusBadge.textContent = text;
        } else if (type === "ok") {
            statusBadge.classList.add("badge-ok");
            // Mostrar texto corto y un check verde
            // Usamos innerHTML para incluir el símbolo check
            statusBadge.innerHTML = 'Datos <span class="check">✓</span>';
        } else if (type === "error") {
            statusBadge.classList.add("badge-error");
            statusBadge.textContent = text;
        }
    }

    function showError(msg) {
        errorBanner.textContent = msg;
        errorBanner.style.display = "block";
    }

    function toUpperTrim(value) {
        if (value === null || value === undefined) return "";
        return String(value).trim().toUpperCase();
    }

    // Parser numérico latino y formato es-PE: lógica compartida en js/lib/format.js.
    // Se conservan estos wrappers (mismo nombre) para no tocar el resto del panel.
    function toNumber(value) { return App.lib.format.toNumberLocale(value); }

    function formatNumber(n) { return App.lib.format.formatInt(n); }

    function formatPercent(p, decimals = 2) { return App.lib.format.formatPercentLocale(p, decimals); }

    // Obtiene lista de clientes (CLIENTE) a partir de la hoja Defectos
    function getClientes(defectosRows) {
        const set = new Set();
        defectosRows.forEach(row => {
            const cliente = toUpperTrim(row["CLIENTE"]);
            if (cliente) set.add(cliente);
        });
        return Array.from(set).sort();
    }

    // Agrega por tipo de TIPO (SEGUNDA / TERCERA)
    function aggregateByTipo(defectosRows, tipo, clientes) {
        const rowsTipo = defectosRows.filter(r => toUpperTrim(r["TIPO"]) === tipo);

        const result = {};
        DEFECT_DEFS.forEach(def => {
            result[def.col] = {
                area: def.area,
                defecto: def.defecto,
                codigo: def.codigo,
                porCliente: {},       // { cliente: cantidad }
                subtotal: 0
            };
            clientes.forEach(c => result[def.col].porCliente[c] = 0);
        });

        rowsTipo.forEach(r => {
            const cliente = toUpperTrim(r["CLIENTE"]);
            if (!cliente) return;

            DEFECT_DEFS.forEach(def => {
                const val = toNumber(r[def.col]);
                if (!val) return;

                const entry = result[def.col];
                if (entry.porCliente[cliente] === undefined) {
                    entry.porCliente[cliente] = 0; // por si aparece algún cliente nuevo
                }
                entry.porCliente[cliente] += val;
                entry.subtotal += val;
            });
        });

        return result;
    }

    // Suma total de defectos en todas las filas
    function totalDefectosFromAggregates(aggSegunda, aggTercera) {
        let total = 0;
        DEFECT_DEFS.forEach(def => {
            const dSeg = aggSegunda[def.col] ? aggSegunda[def.col].subtotal : 0;
            const dTer = aggTercera[def.col] ? aggTercera[def.col].subtotal : 0;
            total += dSeg + dTer;
        });
        return total;
    }

    // Detecta automáticamente la columna de cantidad en "ingreso a linea"

    // Detecta la columna "INGRESO A LINEA" en la hoja de ingreso
    function detectarColumnaIngreso(ingresoRows) {
        if (!ingresoRows.length) return "INGRESO A LINEA";
        const headers = Object.keys(ingresoRows[0]);
        const byIngreso = headers.find(h => toUpperTrim(h) === "INGRESO A LINEA");
        return byIngreso || "INGRESO A LINEA";
    }

    function totalIngresoLinea(ingresoRows) {
        if (!ingresoRows.length) return 0;
        const col = detectarColumnaIngreso(ingresoRows);
        let total = 0;
        ingresoRows.forEach(r => {
            total += toNumber(r[col]);
        });
        return total;
    }

    // Construye la tabla HTML principal
    function buildTable(defectosRows, ingresoRows) {
        if (!defectosRows.length) {
            tableContainer.classList.add("hidden");
            noData.classList.remove("hidden");
            return;
        }

        const clientes = getClientes(defectosRows);
        if (!clientes.length) {
            tableContainer.classList.add("hidden");
            noData.classList.remove("hidden");
            return;
        }

        const aggSegunda = aggregateByTipo(defectosRows, "SEGUNDA", clientes);
        const aggTercera = aggregateByTipo(defectosRows, "TERCERA", clientes);
        const totalIngreso = totalIngresoLinea(ingresoRows);

        // total visible depende del filtro activo (SEGUNDA / TERCERA / null)
        let totalDefectos = 0;
        if (activeTipoFilter === 'SEGUNDA') {
            DEFECT_DEFS.forEach(def => { totalDefectos += (aggSegunda[def.col] ? aggSegunda[def.col].subtotal : 0); });
        } else if (activeTipoFilter === 'TERCERA') {
            DEFECT_DEFS.forEach(def => { totalDefectos += (aggTercera[def.col] ? aggTercera[def.col].subtotal : 0); });
        } else {
            DEFECT_DEFS.forEach(def => { totalDefectos += ((aggSegunda[def.col] ? aggSegunda[def.col].subtotal : 0) + (aggTercera[def.col] ? aggTercera[def.col].subtotal : 0)); });
        }

        tableContainer.classList.remove("hidden");
        noData.classList.add("hidden");
        tablaReporte.innerHTML = "";

        const thead = document.createElement("thead");
        const tbody = document.createElement("tbody");

        /*********** ENCABEZADOS ***********/
        const tr1 = document.createElement("tr");
        const tr2 = document.createElement("tr");

        // 1a fila: AREA, DEFECTOS, CODIGO
        const thArea1 = document.createElement("th");
        thArea1.rowSpan = 2;
        thArea1.textContent = "AREA";
        thArea1.classList.add("col-area");
        tr1.appendChild(thArea1);

        const thDef1 = document.createElement("th");
        thDef1.rowSpan = 2;
        thDef1.textContent = "DEFECTOS";
        thDef1.classList.add("col-defecto");
        tr1.appendChild(thDef1);

        const thCod1 = document.createElement("th");
        thCod1.rowSpan = 2;
        thCod1.textContent = "CODIGO";
        thCod1.classList.add("col-codigo");
        tr1.appendChild(thCod1);

        // Bloque SEGUNDA (solo si no estamos mostrando exclusivamente TERCERA)
        if (activeTipoFilter !== 'TERCERA') {
            const thSeg = document.createElement("th");
            thSeg.colSpan = clientes.length + 1; // clientes + SUB-TOTAL
            thSeg.textContent = "SEGUNDA";
            thSeg.classList.add('group-seg');
            tr1.appendChild(thSeg);
        }

        // Bloque TERCERA (solo si no estamos mostrando exclusivamente SEGUNDA)
        if (activeTipoFilter !== 'SEGUNDA') {
            const thTer = document.createElement("th");
            thTer.colSpan = clientes.length + 1;
            thTer.textContent = "TERCERA";
            thTer.classList.add('group-ter');
            tr1.appendChild(thTer);
        }

        // Bloque final (DEFECTOS + %)
        const thRest = document.createElement("th");
        thRest.colSpan = 3;
        thRest.textContent = "";
        tr1.appendChild(thRest);

        // 2a fila encabezados: clientes + SUB-TOTAL
        // Encabezados de clientes para SEGUNDA (si aplica)
        if (activeTipoFilter !== 'TERCERA') {
            clientes.forEach(c => {
                const th = document.createElement("th");
                th.textContent = c;
                th.classList.add('col-seg');
                tr2.appendChild(th);
            });
            const thSubSeg = document.createElement("th");
            thSubSeg.textContent = "SUB-TOTAL";
            thSubSeg.classList.add('col-seg');
            tr2.appendChild(thSubSeg);
        }

        // Encabezados de clientes para TERCERA (si aplica)
        if (activeTipoFilter !== 'SEGUNDA') {
            clientes.forEach(c => {
                const th = document.createElement("th");
                th.textContent = c;
                th.classList.add('col-ter');
                tr2.appendChild(th);
            });
            const thSubTer = document.createElement("th");
            thSubTer.textContent = "SUB-TOTAL";
            thSubTer.classList.add('col-ter');
            tr2.appendChild(thSubTer);
        }

        const thDefectos = document.createElement("th");
        thDefectos.textContent = "DEFECTOS";
        tr2.appendChild(thDefectos);

        const thDefLote = document.createElement("th");
        thDefLote.textContent = "Defectos en lote";
        tr2.appendChild(thDefLote);

        const thDistrib = document.createElement("th");
        thDistrib.textContent = "Dist Def.";
        tr2.appendChild(thDistrib);

        thead.appendChild(tr1);
        thead.appendChild(tr2);

        /*********** CUERPO ***********/
        // Totales por cliente (SEG y TER)
        const totSegPorCliente = {};
        const totTerPorCliente = {};
        clientes.forEach(c => {
            totSegPorCliente[c] = 0;
            totTerPorCliente[c] = 0;
        });

        DEFECT_DEFS.forEach((def, idx) => {
            const segEntry = aggSegunda[def.col] || {
                porCliente: {},
                subtotal: 0
            };
            const terEntry = aggTercera[def.col] || {
                porCliente: {},
                subtotal: 0
            };
            // total por defecto visible según el filtro
            // (usado más abajo para % y para columna DEFECTOS si no hay filtro)
            const totalDefectoAll = segEntry.subtotal + terEntry.subtotal;

            const tr = document.createElement("tr");

            // Aplicar sombreado selectivo según el área
            try {
                const areaUpper = toUpperTrim(def.area || '');
                const _shaded = new Set(['TEJEDURIA', 'VARIOS', 'OTROS PROCESOS']);
                if (_shaded.has(areaUpper)) {
                    tr.classList.add('area-shaded');
                }
            } catch (e) {
                // si por alguna razón falla la comprobación, no interrumpir la construcción de la tabla
            }

            // No fijar ninguna fila

            // Área, defecto, código
            const tdArea = document.createElement("td");
            tdArea.textContent = def.area;
            tdArea.classList.add("col-area");
            tr.appendChild(tdArea);

            const tdDef = document.createElement("td");
            tdDef.textContent = def.defecto;
            tdDef.classList.add("col-defecto");
            tr.appendChild(tdDef);

            const tdCod = document.createElement("td");
            tdCod.textContent = def.codigo;
            tdCod.classList.add("col-codigo");
            tr.appendChild(tdCod);

            let subtotalSeg = 0;
            if (activeTipoFilter !== 'TERCERA') {
                clientes.forEach(c => {
                    const val = segEntry.porCliente ? segEntry.porCliente[c] || 0 : 0;
                    subtotalSeg += val;
                    totSegPorCliente[c] += val;

                    const td = document.createElement("td");
                    td.textContent = val ? formatNumber(val) : "";
                    // datos para el modal
                    td.classList.add('cliente-cell', 'col-seg');
                    td.setAttribute('data-tipo', 'SEGUNDA');
                    td.setAttribute('data-cliente', c);
                    td.setAttribute('data-defcol', def.col);
                    td.setAttribute('data-defecto', def.defecto);
                    if (val) td.setAttribute('data-cantidad', String(val));
                    tr.appendChild(td);
                });

                const tdSubSeg = document.createElement("td");
                tdSubSeg.textContent = subtotalSeg ? formatNumber(subtotalSeg) : "";
                // marcar como subtotal para evitar abrir modal al hacer click
                tdSubSeg.classList.add('subtotal-cell', 'col-seg');
                tr.appendChild(tdSubSeg);
            }

            let subtotalTer = 0;
            if (activeTipoFilter !== 'SEGUNDA') {
                clientes.forEach(c => {
                    const val = terEntry.porCliente ? terEntry.porCliente[c] || 0 : 0;
                    subtotalTer += val;
                    totTerPorCliente[c] += val;

                    const td = document.createElement("td");
                    td.textContent = val ? formatNumber(val) : "";
                    // datos para el modal
                    td.classList.add('cliente-cell', 'col-ter');
                    td.setAttribute('data-tipo', 'TERCERA');
                    td.setAttribute('data-cliente', c);
                    td.setAttribute('data-defcol', def.col);
                    td.setAttribute('data-defecto', def.defecto);
                    if (val) td.setAttribute('data-cantidad', String(val));
                    tr.appendChild(td);
                });

                const tdSubTer = document.createElement("td");
                tdSubTer.textContent = subtotalTer ? formatNumber(subtotalTer) : "";
                // marcar como subtotal para evitar abrir modal al hacer click
                tdSubTer.classList.add('subtotal-cell', 'col-ter');
                tr.appendChild(tdSubTer);
            }

            // DEFECTOS (visibles según filtro)
            const visibleTotalPorDefecto = (activeTipoFilter === 'SEGUNDA') ? subtotalSeg : ((activeTipoFilter === 'TERCERA') ? subtotalTer : (subtotalSeg + subtotalTer));
            const tdDefectos = document.createElement("td");
            tdDefectos.textContent = visibleTotalPorDefecto ? formatNumber(visibleTotalPorDefecto) : "";
            tr.appendChild(tdDefectos);

            // Defectos en lote = visibleTotalPorDefecto / totalIngreso
            const tdDefLote = document.createElement("td");
            if (totalIngreso > 0 && visibleTotalPorDefecto > 0) {
                tdDefLote.textContent = formatPercent((visibleTotalPorDefecto / totalIngreso) * 100);
            } else {
                tdDefLote.textContent = "-";
            }
            tr.appendChild(tdDefLote);

            // Distribución de defectos = visibleTotalPorDefecto / totalDefectos (visible)
            const tdDistrib = document.createElement("td");
            if (totalDefectos > 0 && visibleTotalPorDefecto > 0) {
                tdDistrib.textContent = formatPercent((visibleTotalPorDefecto / totalDefectos) * 100);
            } else {
                tdDistrib.textContent = "-";
            }
            tr.appendChild(tdDistrib);

            tbody.appendChild(tr);
        });

        /*********** FILA TOTAL DEFECTOS ***********/
        const trTotal = document.createElement("tr");
        trTotal.classList.add("row-total");

        const tdTArea = document.createElement("td");
        tdTArea.textContent = "";
        tdTArea.classList.add("col-area");
        trTotal.appendChild(tdTArea);

        const tdTDef = document.createElement("td");
    tdTDef.textContent = "TOTAL DEFECTOS";
        tdTDef.classList.add("col-defecto");
        trTotal.appendChild(tdTDef);

        const tdTCod = document.createElement("td");
        tdTCod.textContent = "";
        tdTCod.classList.add("col-codigo");
        trTotal.appendChild(tdTCod);
        // Totales SEGUNDA (si muestra SEGUNDA)
        let totalSeg = 0;
        if (activeTipoFilter !== 'TERCERA') {
            clientes.forEach(c => {
                const v = totSegPorCliente[c] || 0;
                totalSeg += v;
                const td = document.createElement("td");
                td.textContent = v ? formatNumber(v) : "";
                trTotal.appendChild(td);
            });

            const tdSubSegTot = document.createElement("td");
            tdSubSegTot.textContent = totalSeg ? formatNumber(totalSeg) : "";
            // marcar como subtotal en la fila total (no debe abrir modal)
            tdSubSegTot.classList.add('subtotal-cell', 'col-seg');
            trTotal.appendChild(tdSubSegTot);
        }

        // Totales TERCERA (si muestra TERCERA)
        let totalTer = 0;
        if (activeTipoFilter !== 'SEGUNDA') {
            clientes.forEach(c => {
                const v = totTerPorCliente[c] || 0;
                totalTer += v;
                const td = document.createElement("td");
                td.textContent = v ? formatNumber(v) : "";
                trTotal.appendChild(td);
            });

            const tdSubTerTot = document.createElement("td");
            tdSubTerTot.textContent = totalTer ? formatNumber(totalTer) : "";
            // marcar como subtotal en la fila total (no debe abrir modal)
            tdSubTerTot.classList.add('subtotal-cell', 'col-ter');
            trTotal.appendChild(tdSubTerTot);
        }

        // Columna TOTAL DEFECTOS (visibles)
        const tdDefTot = document.createElement("td");
        tdDefTot.textContent = totalDefectos ? formatNumber(totalDefectos) : "";
        trTotal.appendChild(tdDefTot);

        // Defectos en lote total
        const tdDefLoteTot = document.createElement("td");
        if (totalIngreso > 0 && totalDefectos > 0) {
            tdDefLoteTot.textContent = formatPercent((totalDefectos / totalIngreso) * 100);
        } else {
            tdDefLoteTot.textContent = "-";
        }
        trTotal.appendChild(tdDefLoteTot);

        const tdDistribTot = document.createElement("td");
        tdDistribTot.textContent = "100.00%";
        trTotal.appendChild(tdDistribTot);

        tbody.appendChild(trTotal);



        tablaReporte.appendChild(thead);
        tablaReporte.appendChild(tbody);

        /*********** RESUMEN GLOBAL (debajo del estado y fuente) ***********/
        resumenGlobal.classList.remove("hidden");
        resumenGlobal.innerHTML = "";
    const spanDef = document.createElement("span");
    // Poner en negrita y añadir ' pds' al valor
    spanDef.innerHTML = `<strong>TOTAL DEFECTOS: ${formatNumber(totalDefectos)} pds</strong>`;

    const spanIng = document.createElement("span");
    spanIng.innerHTML = `<strong>TOTAL INGRESO A EMBALAJE: ${formatNumber(totalIngreso)} pds</strong>`;

    const spanRate = document.createElement("span");
    const rate = (totalIngreso > 0) ? (totalDefectos / totalIngreso) * 100 : 0;
    // Poner en negrita el texto completo (sin 'pds' para el porcentaje)
    spanRate.innerHTML = `<strong>% DEFECTOS vs INGRESO: ${formatPercent(rate)}</strong>`;

    resumenGlobal.appendChild(spanDef);
    resumenGlobal.appendChild(spanIng);
    resumenGlobal.appendChild(spanRate);
    }

    /* ------------------ LÓGICA MODAL OP / RESUMEN POR OP ------------------ */
    // Abrir / cerrar modal OP
    const opBtn = document.getElementById('opBtn');
    const opModalOverlay = document.getElementById('opModalOverlay');
    const opModalClose = document.getElementById('opModalClose');
    const opSearchInput = document.getElementById('opSearchInput');
    const opColorSelect = document.getElementById('opColorSelect');
    const opResumenBtn = document.getElementById('opResumenBtn');
    const opExcelBtn = document.getElementById('opExcelBtn');
    const opResumenTableContainer = document.getElementById('opResumenTableContainer');

    function openOpModal() {
        if (!opModalOverlay) return;
        opModalOverlay.classList.add('open');
        opModalOverlay.setAttribute('aria-hidden', 'false');
        setTimeout(() => { if (opSearchInput) opSearchInput.focus(); }, 50);
    }

    function closeOpModal() {
        if (!opModalOverlay) return;
        opModalOverlay.classList.remove('open');
        opModalOverlay.setAttribute('aria-hidden', 'true');
        // limpiar contenido
        // opResumenTableContainer.innerHTML = '';
    }

    if (opBtn) opBtn.addEventListener('click', openOpModal);
    if (opModalClose) opModalClose.addEventListener('click', closeOpModal);
    // cerrar con overlay click
    if (opModalOverlay) opModalOverlay.addEventListener('click', (ev) => { if (ev.target === opModalOverlay) closeOpModal(); });

    // Normaliza cadena a solo dígitos
    function normalizeDigits(s) {
        if (s === null || s === undefined) return '';
        return String(s).replace(/\D/g, '');
    }

    // Llena el select de colores para la OP indicada. El usuario ingresará los 5 dígitos finales,
    // por lo que comparamos los últimos 5 dígitos de la OP en la hoja.
    function populateOPColors(opValue) {
        opColorSelect.innerHTML = '';
        const optAll = document.createElement('option');
        optAll.value = '(todos)';
        optAll.textContent = '(todos)';
        opColorSelect.appendChild(optAll);

        if (!opValue) return;
        const searchDigitsRaw = normalizeDigits(opValue);
        const searchDigits = searchDigitsRaw.length > 5 ? searchDigitsRaw.slice(-5) : searchDigitsRaw;
        if (!searchDigits) return;

        const set = new Set();
        _originalDefectos.forEach(r => {
            const rop = r['OP'] !== undefined ? String(r['OP']).trim() : '';
            const ropDigits = normalizeDigits(rop);
            if (ropDigits.endsWith(searchDigits)) {
                const color = r['COLOR'] !== undefined ? String(r['COLOR']).trim() : '';
                if (color) set.add(color);
            }
        });
        Array.from(set).sort().forEach(c => {
            const o = document.createElement('option');
            o.value = c; o.textContent = c;
            opColorSelect.appendChild(o);
        });
    }

    // Genera el resumen por OP y lo muestra en el modal
    function generarResumenOP() {
        const opVal = opSearchInput ? String(opSearchInput.value).trim() : '';
        const colorVal = opColorSelect ? String(opColorSelect.value) : '(todos)';
        if (!opVal) {
            opResumenTableContainer.innerHTML = '<div class="no-data">Ingrese una OP válida.</div>';
            return;
        }

        // columnas de defectos (usar DEFECT_DEFS para corresponder a H..AC)
        const defectCols = DEFECT_DEFS.map(d => d.col);

        // filtrar filas por OP (comparando últimos 5 dígitos) y color
        const searchDigitsRaw = normalizeDigits(opVal);
        const searchDigits = searchDigitsRaw.length > 5 ? searchDigitsRaw.slice(-5) : searchDigitsRaw;

        const rows = _originalDefectos.filter(r => {
            const rop = r['OP'] !== undefined ? String(r['OP']).trim() : '';
            const ropDigits = normalizeDigits(rop);
            if (!ropDigits.endsWith(searchDigits)) return false;
            if (colorVal && colorVal !== '(todos)') {
                const rcol = r['COLOR'] !== undefined ? String(r['COLOR']).trim() : '';
                return rcol === colorVal;
            }
            return true;
        }).map(r => {
            // calcular total de defectos en la fila
            let total = 0;
            const defects = {};
            defectCols.forEach(c => {
                const v = toNumber(r[c]);
                defects[c] = v;
                total += v;
            });
            return { raw: r, defects, total };
        }).filter(x => x.total > 0); // mostrar solo filas con al menos un defecto

        if (!rows.length) {
            opResumenTableContainer.innerHTML = '<div class="no-data">No se encontraron registros con defectos para la OP/Color indicados.</div>';
            return;
        }

        // determinar qué columnas de defecto tienen datos (sum > 0)
        const defectSums = {};
        defectCols.forEach(c => defectSums[c] = 0);
        rows.forEach(r => {
            defectCols.forEach(c => defectSums[c] += (r.defects[c] || 0));
        });
        const visibleDefCols = defectCols.filter(c => defectSums[c] > 0);

        // construir tabla
        const tbl = document.createElement('table');
        tbl.className = 'modal-table';
        const thead = document.createElement('thead');
        const thr = document.createElement('tr');
        ['CLIENTE','OP','COLOR'].forEach(h => { const th = document.createElement('th'); th.textContent = h; thr.appendChild(th); });
        visibleDefCols.forEach(c => { const th = document.createElement('th'); th.textContent = c; thr.appendChild(th); });
        const thTotal = document.createElement('th'); thTotal.textContent = 'TOTAL'; thr.appendChild(thTotal);
        thead.appendChild(thr);

        const tbody = document.createElement('tbody');
        rows.forEach(r => {
            const tr = document.createElement('tr');
            const cliente = r.raw['CLIENTE'] !== undefined ? String(r.raw['CLIENTE']).trim() : '';
            const opRaw = r.raw['OP'] !== undefined ? String(r.raw['OP']).trim() : '';
            const opDigits = normalizeDigits(opRaw);
            const opDisplayDigits = opDigits.length > 5 ? opDigits.slice(-5) : opDigits;
            // mostrar como número (sin separadores)
            const opDisplay = opDisplayDigits ? String(parseInt(opDisplayDigits, 10)) : '';
            const color = r.raw['COLOR'] !== undefined ? String(r.raw['COLOR']).trim() : '';
            [cliente, opDisplay, color].forEach(v => { const td = document.createElement('td'); td.textContent = v; tr.appendChild(td); });
            visibleDefCols.forEach(c => { const td = document.createElement('td'); td.textContent = r.defects[c] ? formatNumber(r.defects[c]) : ''; tr.appendChild(td); });
            const tdTot = document.createElement('td'); tdTot.textContent = formatNumber(r.total); tr.appendChild(tdTot);
            tbody.appendChild(tr);
        });

        // fila TOTAL: sumar columnas visibles de defectos y el TOTAL
        const trSum = document.createElement('tr');
        trSum.classList.add('row-total');
        const tdLabel = document.createElement('td');
        tdLabel.textContent = 'TOTAL';
        tdLabel.colSpan = 3; // CLIENTE, OP, COLOR
        trSum.appendChild(tdLabel);

        // usar defectSums calculado arriba (suma por columna)
        let grandTotal = 0;
        visibleDefCols.forEach(c => {
            const s = defectSums[c] || 0;
            grandTotal += s;
            const td = document.createElement('td');
            td.textContent = s ? formatNumber(s) : '';
            trSum.appendChild(td);
        });
        const tdGrand = document.createElement('td');
        tdGrand.textContent = grandTotal ? formatNumber(grandTotal) : '';
        trSum.appendChild(tdGrand);
        tbody.appendChild(trSum);

        tbl.appendChild(thead);
        tbl.appendChild(tbody);
        opResumenTableContainer.innerHTML = '';
        opResumenTableContainer.appendChild(tbl);

        // attach export function to Excel button (use .xlsx)
        opExcelBtn.onclick = function() {
            const fname = `resumen_OP_${opVal}${colorVal && colorVal!=='(todos)'?('_'+colorVal):''}.xlsx`;
            exportTableToExcel(fname, tbl);
        };
    }

    // export simple CSV from table element
    function exportTableToCSV(filename, tableEl) {
        const rows = Array.from(tableEl.querySelectorAll('tr'));
        const csv = rows.map(r => {
            const cols = Array.from(r.querySelectorAll('th,td')).map(c => '"' + (c.textContent || '').replace(/"/g, '""') + '"');
            return cols.join(',');
        }).join('\n');
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', filename);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }

    // Export table DOM to real Excel (.xlsx) using SheetJS. Falls back to CSV if SheetJS missing.
    function exportTableToExcel(filename, tableEl) {
        if (typeof XLSX !== 'undefined') {
            try {
                // Convert DOM table to workbook
                const wb = XLSX.utils.table_to_book(tableEl, { sheet: 'Resumen' });
                const wsName = wb.SheetNames[0];
                const ws = wb.Sheets[wsName];

                // If worksheet has a range, style header row and total row
                if (ws && ws['!ref']) {
                    const range = XLSX.utils.decode_range(ws['!ref']);
                    const startRow = range.s.r; // usually 0
                    const endRow = range.e.r;   // last row index
                    const startCol = range.s.c;
                    const endCol = range.e.c;

                    // Header: row = startRow
                    for (let c = startCol; c <= endCol; c++) {
                        const addr = XLSX.utils.encode_cell({ c: c, r: startRow });
                        if (!ws[addr]) continue;
                        ws[addr].s = ws[addr].s || {};
                        // Header background RGB(54,96,146) => FF366092 (ARGB)
                        ws[addr].s.fill = { patternType: 'solid', fgColor: { rgb: 'FF366092' } };
                        ws[addr].s.font = ws[addr].s.font || {};
                        ws[addr].s.font.bold = true;
                        ws[addr].s.font.color = { rgb: 'FFFFFFFF' };
                        // defect headers font size 9: defects start at col index startCol+3
                        if (c >= startCol + 3 && c < endCol) {
                            ws[addr].s.font.sz = 9;
                        }
                        ws[addr].s.alignment = { horizontal: 'center', vertical: 'center' };
                    }

                    // TOTAL row: assume we added it as the last row (endRow)
                    for (let c = startCol; c <= endCol; c++) {
                        const addr = XLSX.utils.encode_cell({ c: c, r: endRow });
                        if (!ws[addr]) continue;
                        ws[addr].s = ws[addr].s || {};
                        // TOTAL background RGB(191,191,191) => FFBFBFBF (ARGB)
                        ws[addr].s.fill = { patternType: 'solid', fgColor: { rgb: 'FFBFBFBF' } };
                        ws[addr].s.font = ws[addr].s.font || {};
                        ws[addr].s.font.bold = true;
                        ws[addr].s.font.color = { rgb: 'FF000000' };
                        ws[addr].s.alignment = { horizontal: 'center', vertical: 'center' };
                    }

                    // Optionally set column widths similar to modal (approx characters)
                    const cols = [];
                    // CLIENTE, OP, COLOR
                    cols[startCol] = { wch: 15 };
                    cols[startCol + 1] = { wch: 8 };
                    cols[startCol + 2] = { wch: 18 };
                    // defect columns (from startCol+3 to endCol-1)
                    for (let c = startCol + 3; c < endCol; c++) cols[c] = { wch: 9 };
                    // TOTAL column
                    cols[endCol] = { wch: 12 };
                    ws['!cols'] = cols;
                }

                // Write file with cellStyles enabled
                XLSX.writeFile(wb, filename, { bookType: 'xlsx', cellStyles: true });
                return;
            } catch (e) {
                console.error('Error creating XLSX:', e);
            }
        }
        // fallback: CSV
        const csvName = filename.replace(/\.xlsx$/i, '.csv');
        exportTableToCSV(csvName, tableEl);
    }

    // eventos
    if (opSearchInput) {
        opSearchInput.addEventListener('input', () => populateOPColors(opSearchInput.value));
        opSearchInput.addEventListener('keydown', (ev) => { if (ev.key === 'Enter') generarResumenOP(); });
    }
    if (opResumenBtn) opResumenBtn.addEventListener('click', generarResumenOP);

    /* ------------------ FILTRADO POR AÑO / SEMANA ------------------ */

    /* ------------------ FILTRADO POR AÑO / SEMANA ------------------ */
    let _originalDefectos = [];
    let _originalIngreso = [];

    function tryParseDate(v) {
        if (v === null || v === undefined || v === "") return null;
        // Si ya es Date
        if (Object.prototype.toString.call(v) === '[object Date]') {
            return isNaN(v.getTime()) ? null : v;
        }
        // Manejar strings del tipo "Date(2025,6,8)" que a veces devuelve la API GViz
        if (typeof v === 'string') {
            const sraw = v.trim();
            const dateMatch = sraw.match(/^Date\((\d{4}),\s*(\d{1,2}),\s*(\d{1,2})(?:,\s*(\d{1,2}),\s*(\d{1,2}),\s*(\d{1,2}))?\)$/);
            if (dateMatch) {
                const year = parseInt(dateMatch[1], 10);
                const month = parseInt(dateMatch[2], 10);
                const day = parseInt(dateMatch[3], 10);
                const dd = new Date(year, month, day);
                if (!isNaN(dd.getTime())) return dd;
            }
        }
        // Si es número (serial de sheets) tratar como fecha JS aproximada
        if (typeof v === 'number') {
            // Excel/Sheets serial -> convert to JS Date (days since 1899-12-30)
            const jsDate = new Date((v - 25569) * 86400000);
            return isNaN(jsDate.getTime()) ? null : jsDate;
        }
        // Intentar parse con Date
        const s = String(v).trim();
        // Priorizar formato inglés MM/DD/YYYY o MM-DD-YYYY (Sheets en inglés)
        const mUS = s.match(/^(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{2,4})$/);
        if (mUS) {
            const month = parseInt(mUS[1], 10) - 1;
            const day = parseInt(mUS[2], 10);
            let year = parseInt(mUS[3], 10);
            if (year < 100) year += 2000;
            const dd = new Date(year, month, day);
            if (!isNaN(dd.getTime())) return dd;
        }
        // Aceptar formato con puntos dd.mm.yyyy o dd.mm.yy (ej: 13.12.2025)
        const mDot = s.match(/^(\d{1,2})\.(\d{1,2})\.(\d{2,4})(?:\s+\d{1,2}:\d{2}(?::\d{2})?)?$/);
        if (mDot) {
            const day = parseInt(mDot[1], 10);
            const month = parseInt(mDot[2], 10) - 1;
            let year = parseInt(mDot[3], 10);
            if (year < 100) year += 2000;
            const dd = new Date(year, month, day);
            return isNaN(dd.getTime()) ? null : dd;
        }
        // Fallback: intentar con Date parser
        let d = new Date(s);
        if (!isNaN(d.getTime())) return d;
        // Intentar dd/mm/yyyy o dd-mm-yyyy como último recurso
        const mEU = s.match(/^(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{2,4})$/);
        if (mEU) {
            const day = parseInt(mEU[1], 10);
            const month = parseInt(mEU[2], 10) - 1;
            let year = parseInt(mEU[3], 10);
            if (year < 100) year += 2000;
            const dd = new Date(year, month, day);
            return isNaN(dd.getTime()) ? null : dd;
        }
        return null;
    }

    // ISO week number
    function getISOWeek(d) {
        const date = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
        const dayNum = date.getUTCDay() || 7;
        date.setUTCDate(date.getUTCDate() + 4 - dayNum);
        const yearStart = new Date(Date.UTC(date.getUTCFullYear(),0,1));
        const weekNo = Math.ceil((((date - yearStart) / 86400000) + 1)/7);
        return weekNo;
    }
    
    // Convertir año/semana ISO a fecha (primer día de la semana)
    function getDateFromWeek(year, week) {
        try {
            const simple = new Date(year, 0, 1 + (week - 1) * 7);
            const dayOfWeek = simple.getDay();
            const ISOweekStart = simple;
            if (dayOfWeek <= 4) {
                ISOweekStart.setDate(simple.getDate() - simple.getDay() + 1);
            } else {
                ISOweekStart.setDate(simple.getDate() + 8 - simple.getDay());
            }
            return ISOweekStart;
        } catch(e) {
            return null;
        }
    }

    function detectFechaKey(rows) {
        if (!rows || !rows.length) return null;
        const keys = Object.keys(rows[0] || {});
        const match = keys.find(k => toUpperTrim(k) === 'FECHA DE TIMBRADO');
        if (match) return match;
        const includesMatch = keys.find(k => toUpperTrim(k).includes('FECHA') && toUpperTrim(k).includes('TIMBRADO'));
        if (includesMatch) return includesMatch;
        // fallback: try any key that contains 'FECHA'
        const fechaOnly = keys.find(k => toUpperTrim(k).includes('FECHA'));
        return fechaOnly || null;
    }

    function getYearsFromRows(rows, fechaKey) {
        const s = new Set();
        if (!fechaKey) return [];
        rows.forEach(r => {
            const d = tryParseDate(r[fechaKey]);
            if (d) s.add(d.getFullYear());
        });
        return Array.from(s).sort((a,b) => a-b);
    }

    function getWeeksForYear(rows, year, fechaKey) {
        const s = new Set();
        if (!fechaKey) return [];
        rows.forEach(r => {
            const d = tryParseDate(r[fechaKey]);
            if (d && d.getFullYear() === Number(year)) s.add(getISOWeek(d));
        });
        return Array.from(s).sort((a,b) => a-b);
    }

    function populateFilters(rows) {
        const groupSel = document.getElementById('filterGroupBy');
        const periodSel = document.getElementById('filterPeriodSelect');
        if (!groupSel || !periodSel) return;
        periodSel.innerHTML = '';

        const fechaKey = detectFechaKey(rows);
        // Si no tenemos fecha, dejar una sola opción 'Todas'
        if (!fechaKey) {
            const opt = document.createElement('option'); opt.value = ''; opt.textContent = 'Todas'; periodSel.appendChild(opt);
            return;
        }

        // Año: poblar con los años disponibles (mismo patrón que depurado).
        const yearSel = document.getElementById('filterYear');
        if (yearSel) {
            const years = getYearsFromRows(rows, fechaKey);
            yearSel.innerHTML = '';
            const optAllY = document.createElement('option'); optAllY.value = ''; optAllY.textContent = 'Todos'; yearSel.appendChild(optAllY);
            years.forEach(y => { const o = document.createElement('option'); o.value = String(y); o.textContent = String(y); yearSel.appendChild(o); });
            if (years.length) yearSel.value = String(years[years.length - 1]); // por defecto, el último año
        }

        // Semana/Mes: solo los periodos del AÑO seleccionado; el texto va sin año
        // (el año ya se elige aparte), pero el VALUE sigue siendo "AAAA|SS" para no
        // tocar filterByPeriod.
        function populatePeriodOptions() {
            periodSel.innerHTML = '';
            const selYear = yearSel ? (yearSel.value || '') : '';
            const group = (groupSel.value || 'SEMANA');
            // Leer siempre los datos actuales (no el parámetro `rows`): tras un
            // refresh con ⟳ este closure debe ver las filas recién descargadas.
            const dataRows = _originalDefectos || [];
            const fk = detectFechaKey(dataRows);
            if (group === 'SEMANA') {
                const set = new Set();
                dataRows.forEach(r => { const d = tryParseDate(r[fk]); if (!d) return; const y = d.getFullYear(); if (selYear && String(y) !== String(selYear)) return; const w = getISOWeek(d); set.add(`${y}|${String(w).padStart(2,'0')}`); });
                const arr = Array.from(set).sort();
                const optAll = document.createElement('option'); optAll.value = ''; optAll.textContent = 'Todas'; periodSel.appendChild(optAll);
                arr.forEach(k => { const [y,w] = k.split('|'); const o = document.createElement('option'); o.value = k; o.textContent = `SEM${Number(w)}`; periodSel.appendChild(o); });
                if (arr.length) periodSel.value = arr[arr.length - 1];
            } else {
                const set = new Set();
                const monthsNames = ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'];
                dataRows.forEach(r => { const d = tryParseDate(r[fk]); if (!d) return; const y = d.getFullYear(); if (selYear && String(y) !== String(selYear)) return; const m = String(d.getMonth()+1).padStart(2,'0'); set.add(`${y}|${m}`); });
                const arr = Array.from(set).sort();
                const optAll = document.createElement('option'); optAll.value = ''; optAll.textContent = 'Todos'; periodSel.appendChild(optAll);
                arr.forEach(k => { const [y,m] = k.split('|'); const o = document.createElement('option'); o.value = k; o.textContent = `${monthsNames[Number(m)-1]}`; periodSel.appendChild(o); });
                if (arr.length) periodSel.value = arr[arr.length - 1];
            }
        }

        // Bind único por elemento (dataset.bound): populateFilters puede volver a
        // ejecutarse tras un refresh con ⟳ sin duplicar listeners.
        if (yearSel && !yearSel.dataset.bound) {
            yearSel.dataset.bound = '1';
            yearSel.addEventListener('change', () => { populatePeriodOptions(); applyFiltersAndBuild(); });
        }
        if (!groupSel.dataset.bound) {
            groupSel.dataset.bound = '1';
            groupSel.addEventListener('change', () => { populatePeriodOptions(); applyFiltersAndBuild(); });
        }
        if (!periodSel.dataset.bound) {
            periodSel.dataset.bound = '1';
            periodSel.addEventListener('change', () => { applyFiltersAndBuild(); });
        }

        // POBLAR SELECT CLIENTE
        const clientSel = document.getElementById('filterCliente');
        if (clientSel) {
            clientSel.innerHTML = '';
            const optAll = document.createElement('option'); optAll.value = ''; optAll.textContent = 'Todos'; clientSel.appendChild(optAll);
            // obtener lista única de clientes desde rows
            const clientsSet = new Set();
            (rows || []).forEach(r => { const c = toUpperTrim(r['CLIENTE']); if (c) clientsSet.add(c); });
            const clientsArr = Array.from(clientsSet).sort();
            clientsArr.forEach(c => { const o = document.createElement('option'); o.value = c; o.textContent = c; clientSel.appendChild(o); });
            if (!clientSel.dataset.bound) {
                clientSel.dataset.bound = '1';
                clientSel.addEventListener('change', () => { applyFiltersAndBuild(); });
            }
        }

        // inicializar opciones
        populatePeriodOptions();
    }

    /* ------------------ MODAL DE DETALLES ------------------ */
    const detailModalOverlay = document.getElementById('detailModalOverlay');
    const detailModalTitle = document.getElementById('detailModalTitle');
    const detailModalBody = document.getElementById('detailModalBody');
    const detailModalClose = document.getElementById('detailModalClose');

    function detectKey(rows, candidates) {
        if (!rows || !rows.length) return null;
        const keys = Object.keys(rows[0]);
        const up = keys.map(k => k.toUpperCase());
        for (const cand of candidates) {
            const idx = up.findIndex(k => k === cand.toUpperCase() || k.includes(cand.toUpperCase()));
            if (idx !== -1) return keys[idx];
        }
        return null;
    }

    // Normalizar valor OP: quitar prefijo '10' inicial si existe, eliminar no-dígitos,
    // y convertir a número para quitar ceros a la izquierda.
    function normalizeOp(v) {
        if (v === null || v === undefined) return '';
        let s = String(v).trim();
        if (s === '') return '';
        // Eliminar espacios y caracteres no numéricos excepto dígitos
        s = s.replace(/\s+/g, '');
        // Si comienza con '10', quitar ese prefijo
        if (s.startsWith('10')) s = s.slice(2);
        // Extraer solo dígitos restantes
        const digits = s.replace(/\D/g, '');
        if (digits === '') return '';
        // Convertir a número para eliminar ceros a la izquierda
        return String(Number(digits));
    }

    function openDetailModal(tipo, cliente, defCol, defectoNombre) {
    // Título en 2 líneas: 1) TIPO - CLIENTE  2) Defecto
    detailModalTitle.innerHTML = `<div style="font-weight:700">${tipo} - ${cliente}</div><div style="font-size:13px;color:#444;margin-top:4px">${defectoNombre}</div>`;
        // detectar claves útiles
        const temporadaKey = detectKey(_originalDefectos, ['TEMPORADA', 'TEMP', 'SEASON']);
        const estiloKey = detectKey(_originalDefectos, ['ESTILO', 'STYLE']);
        const colorKey = detectKey(_originalDefectos, ['COLOR', 'COLOUR', 'COLOR DEL PRODUCTO']);
        const opKey = detectKey(_originalDefectos, ['OP', 'ORDEN', 'ORDER']);

        // leer filtros actuales (Periodo/Seleccionar)
        const group = document.getElementById('filterGroupBy') ? document.getElementById('filterGroupBy').value : 'SEMANA';
        const period = document.getElementById('filterPeriodSelect') ? document.getElementById('filterPeriodSelect').value : '';
        const fechaKey = detectFechaKey(_originalDefectos);

        // filtrar filas relevantes teniendo en cuenta el periodo seleccionado
        const rows = (_originalDefectos || []).filter(r => {
            if (toUpperTrim(r['TIPO']) !== tipo) return false;
            if (toUpperTrim(r['CLIENTE']) !== toUpperTrim(cliente)) return false;
            const cantidad = toNumber(r[defCol]);
            if (cantidad <= 0) return false;

            // Si hay fechaKey y se aplicó algún filtro, validar según el tipo de periodo
            if (fechaKey && period) {
                const d = tryParseDate(r[fechaKey]);
                if (!d) return false;
                if (group === 'SEMANA') {
                    const [y,w] = period.split('|');
                    if (y && String(d.getFullYear()) !== String(y)) return false;
                    if (w && String(getISOWeek(d)) !== String(Number(w))) return false;
                } else {
                    const [y,m] = period.split('|');
                    if (y && String(d.getFullYear()) !== String(y)) return false;
                    const mm = String(d.getMonth()+1).padStart(2,'0');
                    if (m && mm !== String(m)) return false;
                }
            }

            return true;
        });

        if (!rows.length) {
            detailModalBody.innerHTML = `<div class="no-data">No hay detalles para este cliente/defecto en el periodo seleccionado.</div>`;
            detailModalOverlay.classList.add('open');
            detailModalOverlay.setAttribute('aria-hidden', 'false');
            return;
        }

        // Ordenar las filas por la cantidad del defecto (defCol) de mayor a menor
        rows.sort((a, b) => {
            return toNumber(b[defCol]) - toNumber(a[defCol]);
        });

        // construir tabla
        const tbl = document.createElement('table');
        const thead = document.createElement('thead');
        const trh = document.createElement('tr');
    const h1 = document.createElement('th'); h1.textContent = 'TEMP'; trh.appendChild(h1);
        const h2 = document.createElement('th'); h2.textContent = estiloKey ? estiloKey : 'ESTILO'; trh.appendChild(h2);
        // insertar columna COLOR si existe
        if (colorKey) {
            const hc = document.createElement('th'); hc.textContent = colorKey; trh.appendChild(hc);
        }
        const h3 = document.createElement('th'); h3.textContent = opKey ? opKey : 'OP'; trh.appendChild(h3);
        const h4 = document.createElement('th'); h4.textContent = defectoNombre; trh.appendChild(h4);
        thead.appendChild(trh);
        tbl.appendChild(thead);

        const tb = document.createElement('tbody');
        rows.forEach(r => {
            const tr = document.createElement('tr');
            const td1 = document.createElement('td'); td1.textContent = temporadaKey ? (r[temporadaKey] || '') : (r['TEMPORADA'] || r['Temporada'] || ''); tr.appendChild(td1);
            const td2 = document.createElement('td'); td2.textContent = estiloKey ? (r[estiloKey] || '') : (r['ESTILO'] || r['Estilo'] || ''); tr.appendChild(td2);
            // columna COLOR si existe
            if (colorKey) {
                const tdColor = document.createElement('td'); tdColor.textContent = r[colorKey] || r['COLOR'] || ''; tr.appendChild(tdColor);
            }
            const td3 = document.createElement('td');
            const rawOp = opKey ? (r[opKey] || '') : (r['OP'] || '');
            td3.textContent = normalizeOp(rawOp);
            tr.appendChild(td3);
            const td4 = document.createElement('td'); td4.textContent = formatNumber(toNumber(r[defCol])) || ''; tr.appendChild(td4);
            tb.appendChild(tr);
        });
        tbl.appendChild(tb);
        detailModalBody.innerHTML = '';
        detailModalBody.appendChild(tbl);
        detailModalOverlay.classList.add('open');
        detailModalOverlay.setAttribute('aria-hidden', 'false');
    }

    function closeDetailModal() {
        detailModalOverlay.classList.remove('open');
        detailModalOverlay.setAttribute('aria-hidden', 'true');
        detailModalBody.innerHTML = '';
    }

    detailModalClose.addEventListener('click', closeDetailModal);
    detailModalOverlay.addEventListener('click', (ev) => {
        if (ev.target === detailModalOverlay) closeDetailModal();
    });

    // Delegation: manejar CLICK en celdas cliente (abrir modal con un solo click)
    // Excluir celdas marcadas como 'subtotal-cell' y la fila de totales.
    // El handler se guarda en App para quitar el del montaje anterior: antes se
    // acumulaba un listener sobre document por cada visita a la vista (leak).
    if (App._segTerCellClick) document.removeEventListener('click', App._segTerCellClick);
    App._segTerCellClick = function (ev) {
        const td = ev.target.closest && ev.target.closest('td.cliente-cell');
        if (!td) return;
        // Si la celda está marcada como subtotal, no abrir modal
        if (td.classList.contains('subtotal-cell')) return;
        const tr = td.closest && td.closest('tr');
        if (tr && tr.classList.contains('row-total')) return; // ignorar fila total

        const tipo = td.getAttribute('data-tipo');
        const cliente = td.getAttribute('data-cliente');
        const defcol = td.getAttribute('data-defcol');
        const defectoNombre = td.getAttribute('data-defecto') || defcol;
        openDetailModal(tipo, cliente, defcol, defectoNombre);
    };
    document.addEventListener('click', App._segTerCellClick);

    function filterByPeriod(rows, group, period) {
        const fechaKey = detectFechaKey(rows);
        if (!period || period === '') return rows.slice();
        if (!fechaKey) return rows.slice();
        if (group === 'SEMANA') {
            const parts = period.split('|');
            const y = parts[0];
            const w = parts[1] ? String(Number(parts[1])) : '';
            return rows.filter(r => {
                const d = fechaKey ? tryParseDate(r[fechaKey]) : null;
                if (!d) return false;
                if (y && String(d.getFullYear()) !== String(y)) return false;
                if (w && String(getISOWeek(d)) !== String(w)) return false;
                return true;
            });
        } else {
            // MES: period format YYYY|MM
            const parts = period.split('|');
            const y = parts[0];
            const m = parts[1] ? String(parts[1]).padStart(2,'0') : '';
            return rows.filter(r => {
                const d = fechaKey ? tryParseDate(r[fechaKey]) : null;
                if (!d) return false;
                if (y && String(d.getFullYear()) !== String(y)) return false;
                const mm = String(d.getMonth() + 1).padStart(2,'0');
                if (m && mm !== String(m)) return false;
                return true;
            });
        }
    }

    // Filtra las filas de la hoja `ingreso a linea` según periodo (semana o mes).
    function filterIngresoRowsByPeriod(rows, group, period) {
        if (!rows || !rows.length) return [];
        // buscar claves año/semana (insensible a mayúsculas y tildes)
        const keys = Object.keys(rows[0] || {});
        const keyAno = keys.find(k => toUpperTrim(k).replace(/\s+/g,'') === 'AÑO' || toUpperTrim(k).replace(/\s+/g,'') === 'ANO' || toUpperTrim(k) === 'AÑO');
        const keySemana = keys.find(k => toUpperTrim(k).includes('SEMANA'));
        const fechaKey = detectFechaKey(rows);

        if (!period || period === '') {
            // sin filtro -> devolver todo
            return rows.slice();
        }

        if (group === 'SEMANA') {
            const parts = period.split('|');
            const y = parts[0];
            const w = parts[1] ? String(Number(parts[1])) : '';
            if (keyAno && keySemana) {
                return rows.filter(r => {
                    const rv = r[keyAno];
                    const sv = r[keySemana];
                    const rvn = rv === null || rv === undefined || rv === '' ? null : Number(String(rv).toString().replace(/\s+/g, ''));
                    const svn = sv === null || sv === undefined || sv === '' ? null : Number(String(sv).toString().replace(/\s+/g, ''));
                    if (y && String(rvn) !== String(y)) return false;
                    if (w && String(svn) !== String(w)) return false;
                    return true;
                });
            }
            // fallback: filtrar por fecha
            return filterByPeriod(rows, 'SEMANA', period);
        } else {
            // MES
            const parts = period.split('|');
            const y = parts[0];
            const m = parts[1] ? String(parts[1]).padStart(2,'0') : '';
            // si existe columna de fecha en ingreso, usarla
            if (fechaKey) {
                return rows.filter(r => {
                    const d = tryParseDate(r[fechaKey]);
                    if (!d) return false;
                    if (y && String(d.getFullYear()) !== String(y)) return false;
                    const mm = String(d.getMonth() + 1).padStart(2,'0');
                    if (m && mm !== String(m)) return false;
                    return true;
                });
            }
            // sin fecha, no podemos filtrar por mes -> devolver vacío
            return [];
        }
    }

    function applyFiltersAndBuild() {
        const group = document.getElementById('filterGroupBy') ? document.getElementById('filterGroupBy').value : 'SEMANA';
        const period = document.getElementById('filterPeriodSelect') ? document.getElementById('filterPeriodSelect').value : '';
        const clientSel = document.getElementById('filterCliente');
        const clientVal = clientSel ? (clientSel.value || '') : '';
        persistFilters(group, period, clientVal);
        const filteredDefectos = filterByPeriod(_originalDefectos, group, period);
        const filteredDefectosByClient = clientVal ? filteredDefectos.filter(r => toUpperTrim(r['CLIENTE']) === String(clientVal)) : filteredDefectos;
        const filteredIngreso = filterIngresoRowsByPeriod(_originalIngreso, group, period);
        buildTable(filteredDefectosByClient, filteredIngreso);
    }

    // Guarda los filtros activos (sessionStorage) y los refleja en la URL para
    // poder compartirla o recargar con F5 sin perder la selección. replaceState
    // no dispara hashchange, así que el router no vuelve a montar la vista.
    function persistFilters(group, period, clientVal) {
        const yearSel = document.getElementById('filterYear');
        const segSw = document.getElementById('switchSeg');
        const terSw = document.getElementById('switchTer');
        const state = {
            year: yearSel ? (yearSel.value || '') : '',
            groupBy: group,
            period: period,
            tipo: (segSw && segSw.checked) ? 'SEGUNDA' : ((terSw && terSw.checked) ? 'TERCERA' : ''),
            cliente: clientVal
        };
        try { sessionStorage.setItem(FILTERS_STORE_KEY, JSON.stringify(state)); } catch (e) {}
        if (location.hash.indexOf('#/segundas-terceras') !== 0) return;
        const params = new URLSearchParams();
        if (state.year) params.set('year', state.year);
        params.set('g', state.groupBy);
        if (state.period) params.set('p', state.period);
        if (state.tipo) params.set('t', state.tipo);
        if (state.cliente) params.set('c', state.cliente);
        try { history.replaceState(null, '', '#/segundas-terceras?' + params.toString()); } catch (e) {}
    }

    // Última selección: primero los parámetros de la URL (compartible), luego
    // lo guardado en la sesión.
    function readSavedFilters() {
        const qIdx = location.hash.indexOf('?');
        if (qIdx > -1 && location.hash.indexOf('#/segundas-terceras') === 0) {
            const params = new URLSearchParams(location.hash.slice(qIdx + 1));
            if (params.get('year') || params.get('g') || params.get('p') || params.get('t') || params.get('c')) {
                return {
                    year: params.get('year') || '',
                    groupBy: params.get('g') === 'MES' ? 'MES' : 'SEMANA',
                    period: params.get('p') || '',
                    tipo: params.get('t') || '',
                    cliente: params.get('c') || ''
                };
            }
        }
        try {
            const raw = sessionStorage.getItem(FILTERS_STORE_KEY);
            if (raw) return JSON.parse(raw);
        } catch (e) {}
        return null;
    }

    function hasOption(sel, value) {
        if (!sel) return false;
        for (let i = 0; i < sel.options.length; i++) {
            if (sel.options[i].value === String(value)) return true;
        }
        return false;
    }

    // Restaura la última selección de filtros; false si no había nada guardado.
    // Se apoya en los listeners ya conectados: cambiar el año repuebla los
    // periodos, y el evento del switch recalcula el tipo y reconstruye la tabla.
    function restoreSavedFilters() {
        const saved = readSavedFilters();
        if (!saved) return false;
        const yearSel = document.getElementById('filterYear');
        const groupSel = document.getElementById('filterGroupBy');
        const periodSel = document.getElementById('filterPeriodSelect');
        const clientSel = document.getElementById('filterCliente');
        const segSw = document.getElementById('switchSeg');
        const terSw = document.getElementById('switchTer');

        if (groupSel && saved.groupBy) groupSel.value = saved.groupBy;
        if (yearSel && hasOption(yearSel, saved.year || '')) yearSel.value = saved.year || '';
        // Repoblar los periodos con el año/tipo de periodo restaurados
        if (yearSel) yearSel.dispatchEvent(new Event('change'));
        else if (groupSel) groupSel.dispatchEvent(new Event('change'));
        // El periodo guardado, si sigue existiendo ('' = Todas); si no, queda el último
        if (periodSel && (saved.period === '' || hasOption(periodSel, saved.period))) {
            periodSel.value = saved.period || '';
        }
        if (clientSel && (!saved.cliente || hasOption(clientSel, saved.cliente))) {
            clientSel.value = saved.cliente || '';
        }
        if (segSw) segSw.checked = (saved.tipo === 'SEGUNDA');
        if (terSw) terSw.checked = (saved.tipo === 'TERCERA');
        // Un único evento final recalcula activeTipoFilter y reconstruye la tabla
        if (segSw) segSw.dispatchEvent(new Event('change'));
        else applyFiltersAndBuild();
        return true;
    }

    // Switches SEGUNDA / TERCERA: comportamiento y exclusividad
    (function setupTipoSwitches(){
        const elSegSwitch = document.getElementById('switchSeg');
        const elTerSwitch = document.getElementById('switchTer');
        function updateTipoFromSwitches(){
            const segOn = elSegSwitch && elSegSwitch.checked;
            const terOn = elTerSwitch && elTerSwitch.checked;
            // Hacerlos mutuamente excluyentes: si uno se activa, desactivar el otro
            if (segOn && elTerSwitch) elTerSwitch.checked = false;
            if (terOn && elSegSwitch) elSegSwitch.checked = false;
            activeTipoFilter = segOn ? 'SEGUNDA' : (terOn ? 'TERCERA' : null);
            applyFiltersAndBuild();
        }
        if (elSegSwitch) elSegSwitch.addEventListener('change', updateTipoFromSwitches);
        if (elTerSwitch) elTerSwitch.addEventListener('change', updateTipoFromSwitches);
    })();

    /* ------------------ PARETO: Distribución de defectos (barras + linea acumulada) ------------------ */
    (function setupPareto(){
        const paretoBtn = document.getElementById('paretoBtn');
        const paretoModalOverlay = document.getElementById('paretoModalOverlay');
        const paretoModalClose = document.getElementById('paretoModalClose');
        const paretoSwitchSeg = document.getElementById('paretoSwitchSeg');
        const paretoSwitchTer = document.getElementById('paretoSwitchTer');
        const paretoGroupBy = document.getElementById('paretoGroupBy');
        const paretoPeriodSelect = document.getElementById('paretoPeriodSelect');
        const paretoCanvas = document.getElementById('paretoCanvas');
        let paretoChart = null;
        // Ensure chartjs-plugin-datalabels is registered (some CDN builds require manual registration)
        try {
            if (window && window.Chart && window.ChartDataLabels) {
                try { Chart.register(window.ChartDataLabels); } catch(e) { /* ignore if already registered */ }
            }
        } catch(e) { /* ignore */ }

        function openParetoModal(){
            populateParetoPeriodOptions();
            paretoModalOverlay.classList.add('open');
            paretoModalOverlay.setAttribute('aria-hidden','false');
            requestAnimationFrame(()=>{
                if (paretoChart) { try { paretoChart.resize(); paretoChart.update(); } catch(e){} }
                renderParetoFromControls();
            });
        }

        function closeParetoModal(){
            paretoModalOverlay.classList.remove('open');
            paretoModalOverlay.setAttribute('aria-hidden','true');
        }

        function populateParetoPeriodOptions(){
            paretoPeriodSelect.innerHTML = '';
            const group = paretoGroupBy.value || 'SEMANA';
            const fechaKey = detectFechaKey(_originalDefectos);
            if (!fechaKey) {
                const opt = document.createElement('option'); opt.value = ''; opt.textContent = 'Todas'; paretoPeriodSelect.appendChild(opt); return;
            }
            if (group === 'SEMANA'){
                const set = new Set();
                (_originalDefectos||[]).forEach(r=>{
                    const d = tryParseDate(r[fechaKey]); if (!d) return; const y=d.getFullYear(); const w=getISOWeek(d); set.add(`${y}|${String(w).padStart(2,'0')}`);
                });
                const arr = Array.from(set).sort();
                const optAll = document.createElement('option'); optAll.value=''; optAll.textContent='Todas'; paretoPeriodSelect.appendChild(optAll);
                arr.forEach(k=>{ const [y,w]=k.split('|'); const o=document.createElement('option'); o.value=k; o.textContent=`${y}-SEM${Number(w)}`; paretoPeriodSelect.appendChild(o); });
                // seleccionar la última por defecto
                if (arr.length) paretoPeriodSelect.value = arr[arr.length-1];
            } else {
                // MES: formato YYYY|MM
                const set = new Set();
                const monthsNames = ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'];
                (_originalDefectos||[]).forEach(r=>{
                    const d = tryParseDate(r[fechaKey]); if (!d) return; const y=d.getFullYear(); const m=String(d.getMonth()+1).padStart(2,'0'); set.add(`${y}|${m}`);
                });
                const arr = Array.from(set).sort();
                const optAll = document.createElement('option'); optAll.value=''; optAll.textContent='Todas'; paretoPeriodSelect.appendChild(optAll);
                arr.forEach(k=>{ const [y,m]=k.split('|'); const o=document.createElement('option'); o.value=k; o.textContent=`${monthsNames[Number(m)-1]} ${y}`; paretoPeriodSelect.appendChild(o); });
                if (arr.length) paretoPeriodSelect.value = arr[arr.length-1];
            }
        }

        function parseParetoControls(){
            let tipo = 'AMBOS';
            if (paretoSwitchSeg && paretoSwitchSeg.checked) tipo = 'SEGUNDA';
            else if (paretoSwitchTer && paretoSwitchTer.checked) tipo = 'TERCERA';
            const group = paretoGroupBy.value || 'SEMANA';
            const period = paretoPeriodSelect.value || '';
            return { tipo, group, period };
        }

        function computeParetoData(){
            const opts = parseParetoControls();
            const rows = (_originalDefectos||[]).filter(r=>{
                if (opts.tipo !== 'AMBOS' && toUpperTrim(r['TIPO']) !== opts.tipo) return false;
                if (!opts.period) return true; // Todas
                const fechaKey = detectFechaKey(_originalDefectos);
                const d = tryParseDate(r[fechaKey]); if (!d) return false;
                if (opts.group === 'SEMANA'){
                    const [y,w] = opts.period.split('|'); if (String(d.getFullYear()) !== String(y)) return false; if (String(getISOWeek(d)).padStart(2,'0') !== String(w)) return false; return true;
                } else {
                    const [y,m] = opts.period.split('|'); const mm = String(d.getMonth()+1).padStart(2,'0'); if (String(d.getFullYear()) !== String(y)) return false; if (mm !== String(m)) return false; return true;
                }
            });

            const counts = {};
            DEFECT_DEFS.forEach(def => counts[def.col] = 0);
            rows.forEach(r=>{
                DEFECT_DEFS.forEach(def => { counts[def.col] += toNumber(r[def.col]); });
            });

            const arr = DEFECT_DEFS.map(def => {
                let label = def.defecto;
                if (toUpperTrim(def.col) === 'MANCHAS DE COLORANTES O AUXILIARES') label = 'MANCHAS TINTO';
                return { codigo: def.codigo, label: label, col: def.col, value: counts[def.col] || 0 };
            });
            const total = arr.reduce((s,a)=>s + (a.value||0), 0);
            arr.sort((a,b)=>b.value - a.value);
            let running = 0;
            const labels = [];
            const values = [];
            const cumPerc = [];
            arr.forEach(item => {
                labels.push(item.label);
                values.push(item.value);
                running += item.value;
                const pct = total > 0 ? (running / total) * 100 : 0;
                cumPerc.push(Number(pct.toFixed(2)));
            });
            return { labels, values, cumPerc, total };
        }

        function drawPareto(){
            const data = computeParetoData();
            if (paretoChart) { try { paretoChart.destroy(); } catch(e){} paretoChart = null; }
            const ctx = paretoCanvas.getContext('2d');

            // Local plugin to draw base labels for bars (Pareto) - avoids relying on chartjs-plugin-datalabels for bars
            const paretoBarLabeler = {
                id: 'paretoBarLabeler',
                afterDatasetsDraw: function(chart) {
                    if (!chart || !chart.ctx) return;
                    // only run for paretoCanvas
                    if (!chart.canvas || chart.canvas.id !== 'paretoCanvas') return;
                    const ctx2 = chart.ctx;
                    const meta = chart.getDatasetMeta(0);
                    if (!meta || !meta.data) return;
                    ctx2.save();
                    ctx2.fillStyle = '#0b5394';
                    ctx2.font = '700 14px Calibri, Arial, sans-serif';
                    ctx2.textAlign = 'center';
                    ctx2.textBaseline = 'bottom';
                    meta.data.forEach((bar, i) => {
                        try {
                            const val = chart.data.datasets[0].data[i];
                            if (val === null || val === undefined) return;
                            const txt = Number(val) ? Number(val).toLocaleString() : '0';
                            const baseY = (bar.base !== undefined) ? bar.base : (chart.chartArea ? chart.chartArea.bottom : (bar.y || 0));
                            const x = (bar.x !== undefined) ? bar.x : (bar.getCenterPoint ? bar.getCenterPoint().x : 0);
                            ctx2.fillText(txt, x, baseY - 4);
                        } catch (e) { /* ignore per-bar errors */ }
                    });
                    // Draw line labels to the right of points when value <= 83
                    try {
                        const lineMeta = chart.getDatasetMeta(1);
                        if (lineMeta && lineMeta.data) {
                            ctx2.save();
                            ctx2.fillStyle = 'rgba(220,53,69,1)';
                            ctx2.font = '400 12px Calibri, Arial, sans-serif';
                            ctx2.textAlign = 'left';
                            ctx2.textBaseline = 'middle';
                            lineMeta.data.forEach((pt, i) => {
                                try {
                                    const v = chart.data.datasets[1].data[i];
                                    if (v === null || v === undefined) return;
                                    // only show labels when value <= 83
                                    if (typeof v === 'number' && v <= 83) {
                                        const xpt = (pt.x !== undefined) ? pt.x : (pt.getCenterPoint ? pt.getCenterPoint().x : 0);
                                        const ypt = (pt.y !== undefined) ? pt.y : (pt.getCenterPoint ? pt.getCenterPoint().y : 0);
                                        const labelTxt = Number(v).toFixed(2) + '%';
                                        ctx2.fillText(labelTxt, xpt + 8, ypt);
                                    }
                                } catch (e) { /* ignore per-point errors */ }
                            });
                            ctx2.restore();
                        }
                    } catch(e) { /* ignore */ }
                    ctx2.restore();
                }
            };

            // build plugins array: include paretoBarLabeler and chartjs-plugin-datalabels if available
            const _paretoPlugins = [paretoBarLabeler];
            if (window && window.ChartDataLabels) _paretoPlugins.push(window.ChartDataLabels);
            try { console.debug && console.debug('pareto: plugins count', _paretoPlugins.length, 'ChartDataLabels present:', !!(window && window.ChartDataLabels)); } catch(e) {}

            paretoChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: data.labels,
                    datasets: [
                        { type: 'bar', label: 'DEFECTOS', data: data.values, backgroundColor: 'rgba(54,162,235,0.7)', yAxisID: 'y1' },
                        { type: 'line', label: 'Distribución de defectos', data: data.cumPerc, borderColor: 'rgba(220,53,69,0.9)', backgroundColor: 'rgba(220,53,69,0.2)', tension: 0.2, pointRadius:4, yAxisID: 'y',
                            datalabels: {
                                display: function(ctx){ return (typeof ctx.raw === 'number') ? (ctx.raw <= 83) : false; },
                                align: 'right',
                                anchor: 'start',
                                color: 'rgba(220,53,69,1)',
                                font: { family: 'Calibri, Arial, sans-serif', size: 12, weight: 'normal' },
                                formatter: function(value) { return Number(value).toFixed(2) + '%'; }
                            }
                        }
                    ]
                },
                plugins: _paretoPlugins,
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    interaction: { mode: 'index', intersect: false },
                    plugins: { legend: { position: 'bottom' }, tooltip: { callbacks: { label: function(ctx){ const ds = ctx.dataset; const val = ctx.raw; if (ds.type === 'bar') return ds.label + ': ' + (Number(val) ? Number(val).toLocaleString() : '0'); else return ds.label + ': ' + (Number(val) ? Number(val).toFixed(2) + '%' : '0.00%'); } } }, datalabels: { display: false, clamp: true, clip: false } },
                    scales: {
                        x: { ticks: { maxRotation: 90, minRotation: 90, font: { family: 'Calibri, Arial, sans-serif', size: 14, weight: 'normal' } } },
                        y: { type: 'linear', position: 'left', beginAtZero: true, suggestedMax: 100, ticks: { callback: function(v){ return v + '%'; } }, title: { display: true, text: 'Distribución acumulada (%)' } },
                        y1: { type: 'linear', position: 'right', beginAtZero: true, grid: { drawOnChartArea: false }, ticks: { callback: function(v){ return Math.round(v).toLocaleString(); } }, title: { display: true, text: 'DEFECTOS (cantidad)' } }
                    }
                }
            });
        }

        function renderParetoFromControls(){ drawPareto(); }

        // Events
        paretoBtn && paretoBtn.addEventListener('click', openParetoModal);
        paretoModalClose && paretoModalClose.addEventListener('click', closeParetoModal);
        paretoModalOverlay && paretoModalOverlay.addEventListener('click', (ev)=>{ if (ev.target === paretoModalOverlay) closeParetoModal(); });
        paretoGroupBy && paretoGroupBy.addEventListener('change', ()=>{ populateParetoPeriodOptions(); renderParetoFromControls(); });
        paretoPeriodSelect && paretoPeriodSelect.addEventListener('change', ()=>{ renderParetoFromControls(); });
        if (paretoSwitchSeg && paretoSwitchTer){
            paretoSwitchSeg.addEventListener('change', ()=>{ if (paretoSwitchSeg.checked) paretoSwitchTer.checked = false; renderParetoFromControls(); });
            paretoSwitchTer.addEventListener('change', ()=>{ if (paretoSwitchTer.checked) paretoSwitchSeg.checked = false; renderParetoFromControls(); });
        }
    })();

    /* ------------------ GRÁFICOS: % DEFECTOS vs INGRESO (últimas 10 semanas) ------------------ */
    (function setupCharts(){
        const graficosBtn = document.getElementById('graficosBtn');
        const chartsModalOverlay = document.getElementById('chartsModalOverlay');
        const chartsModalClose = document.getElementById('chartsModalClose');
    const chartSwitchSeg = document.getElementById('chartSwitchSeg');
    const chartSwitchTer = document.getElementById('chartSwitchTer');
    const chartPeriodo = document.getElementById('chartPeriodo');
    const chartDesdeYear = document.getElementById('chartDesdeYear');
    const chartDesdeWeek = document.getElementById('chartDesdeWeek');
    const chartHastaYear = document.getElementById('chartHastaYear');
    const chartHastaWeek = document.getElementById('chartHastaWeek');
    const chartDesdeMonth = document.getElementById('chartDesdeMonth');
    const chartHastaMonth = document.getElementById('chartHastaMonth');
        const chartsCanvas = document.getElementById('chartsCanvas');
        let chartInstance = null;

        function openChartsModal(){
            populateChartSelectors();
            togglePeriodoControls();
            chartsModalOverlay.classList.add('open');
            chartsModalOverlay.setAttribute('aria-hidden', 'false');
            // Ensure the modal's layout is fully applied before drawing the chart.
            // Use double requestAnimationFrame and a forced reflow to make this robust across browsers.
            const modalEl = chartsModalOverlay.querySelector('.modal.modal-large');
            // first rAF to let the browser apply the 'open' class, then force reflow and a second rAF
            requestAnimationFrame(() => {
                // force a synchronous reflow
                if (modalEl) void modalEl.offsetWidth;
                requestAnimationFrame(() => {
                    renderChartFromControls();
                    // If Chart.js instance exists, force a resize/update to ensure correct dimensions
                    if (chartInstance && typeof chartInstance.resize === 'function') {
                        try { chartInstance.resize(); chartInstance.update(); } catch(e) { /* ignore */ }
                    }
                });
            });
        }

        function closeChartsModal(){
            chartsModalOverlay.classList.remove('open');
            chartsModalOverlay.setAttribute('aria-hidden', 'true');
        }

        graficosBtn && graficosBtn.addEventListener('click', openChartsModal);
        chartsModalClose && chartsModalClose.addEventListener('click', closeChartsModal);
        chartsModalOverlay && chartsModalOverlay.addEventListener('click', (ev)=>{ if (ev.target === chartsModalOverlay) closeChartsModal(); });

        function getWeekKey(year, week){ return `${year}|${String(week).padStart(2,'0')}`; }
        function getMonthKey(year, month){ return `${year}|${String(month).padStart(2,'0')}`; }
        
        function togglePeriodoControls(){
            const periodo = chartPeriodo.value;
            const isWeekly = periodo === 'SEMANA';
            // Mostrar/ocultar controles semanales (solo semanas)
            document.getElementById('lblDesdeWeek').style.display = isWeekly ? '' : 'none';
            document.getElementById('lblHastaWeek').style.display = isWeekly ? '' : 'none';
            // Mostrar/ocultar controles mensuales (solo meses)
            document.getElementById('lblDesdeMonth').style.display = isWeekly ? 'none' : '';
            document.getElementById('lblHastaMonth').style.display = isWeekly ? 'none' : '';
        }

        function lastNWeeks(n){
            const out = [];
            const now = new Date();
            for (let i = n-1; i >= 0; i--) {
                const d = new Date(now.getFullYear(), now.getMonth(), now.getDate() - (i*7));
                const w = getISOWeek(d);
                const y = d.getFullYear();
                const key = getWeekKey(y,w);
                if (!out.find(o=>o.key===key)) out.push({year:y, week:w, key});
            }
            return out;
        }
        
        function lastNMonths(n){
            const out = [];
            const now = new Date();
            for (let i = n-1; i >= 0; i--) {
                const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
                const y = d.getFullYear();
                const m = d.getMonth() + 1; // 1-12
                const key = getMonthKey(y, m);
                if (!out.find(o=>o.key===key)) out.push({year:y, month:m, key});
            }
            return out;
        }

        function populateChartSelectors(){
            const periodo = chartPeriodo.value;
            if (periodo === 'SEMANA') {
                populateChartYearWeekSelectors();
            } else {
                populateChartMonthSelectors();
            }
        }
        
        function populateChartYearWeekSelectors(){
            // reuse detectFechaKey/getYearsFromRows/getWeeksForYear
            chartDesdeYear.innerHTML = '';
            chartDesdeWeek.innerHTML = '';
            chartHastaYear.innerHTML = '';
            chartHastaWeek.innerHTML = '';

            // Preferir años extraídos de la hoja de ingreso (si existen), sino usar defectos
            const fechaKeyDef = detectFechaKey(_originalDefectos);
            const fechaKeyIng = detectFechaKey(_originalIngreso);
            const yearsFromIngreso = getYearsFromRows(_originalIngreso, fechaKeyIng);
            const yearsFromDef = getYearsFromRows(_originalDefectos, fechaKeyDef);
            const years = (yearsFromIngreso && yearsFromIngreso.length) ? yearsFromIngreso : yearsFromDef;

            const optAllY = document.createElement('option'); optAllY.value=''; optAllY.textContent='Todas';
            chartDesdeYear.appendChild(optAllY.cloneNode(true));
            chartHastaYear.appendChild(optAllY.cloneNode(true));
            years.forEach(y => {
                const o = document.createElement('option'); o.value = String(y); o.textContent = String(y);
                chartDesdeYear.appendChild(o);
                chartHastaYear.appendChild(o.cloneNode(true));
            });

            // semanas: inicialmente añadir opción 'Todas'
            const allOpt = document.createElement('option'); allOpt.value=''; allOpt.textContent='Todas';
            chartDesdeWeek.appendChild(allOpt.cloneNode(true));
            chartHastaWeek.appendChild(allOpt.cloneNode(true));

            // Asegurar que los últimos 10 weeks aparecen como opciones y seleccionarlos por defecto
            const last = lastNWeeks(10);
            if (last && last.length) {
                // añadir opciones de semana (sin importar el año) y años faltantes
                last.forEach(item => {
                    const y = item.year; const w = item.week;
                    if (![...chartDesdeYear.options].some(opt => opt.value === String(y))) {
                        const o = document.createElement('option'); o.value = String(y); o.textContent = String(y);
                        chartDesdeYear.appendChild(o);
                        chartHastaYear.appendChild(o.cloneNode(true));
                    }
                    if (![...chartDesdeWeek.options].some(opt => opt.value === String(w))) {
                        const ow = document.createElement('option'); ow.value = String(w); ow.textContent = 'SEM' + String(w);
                        chartDesdeWeek.appendChild(ow);
                        chartHastaWeek.appendChild(ow.cloneNode(true));
                    }
                });

                // seleccionar rango: Desde = primera semana del array, Hasta = última
                const first = last[0]; const lastIt = last[last.length - 1];
                chartDesdeYear.value = String(first.year);
                chartDesdeWeek.value = String(first.week);
                chartHastaYear.value = String(lastIt.year);
                chartHastaWeek.value = String(lastIt.week);
            }
        }
        
        function populateChartMonthSelectors(){
            chartDesdeMonth.innerHTML = '';
            chartHastaMonth.innerHTML = '';
            chartDesdeYear.innerHTML = '';
            chartHastaYear.innerHTML = '';
            
            const monthNames = ['ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN', 'JUL', 'AGO', 'SET', 'OCT', 'NOV', 'DIC'];
            
            // Obtener los últimos 10 meses
            const last = lastNMonths(10);
            if (last && last.length) {
                // Extraer años únicos
                const yearsSet = new Set(last.map(item => item.year));
                const years = Array.from(yearsSet).sort();
                
                // Poblar selectores de año
                years.forEach(y => {
                    const optDesde = document.createElement('option');
                    optDesde.value = String(y);
                    optDesde.textContent = String(y);
                    chartDesdeYear.appendChild(optDesde);
                    
                    const optHasta = document.createElement('option');
                    optHasta.value = String(y);
                    optHasta.textContent = String(y);
                    chartHastaYear.appendChild(optHasta);
                });
                
                // Poblar selectores de mes
                last.forEach(item => {
                    const m = item.month;
                    const label = monthNames[m-1];
                    const value = String(m);
                    
                    const optDesde = document.createElement('option');
                    optDesde.value = value;
                    optDesde.textContent = label;
                    chartDesdeMonth.appendChild(optDesde);
                    
                    const optHasta = document.createElement('option');
                    optHasta.value = value;
                    optHasta.textContent = label;
                    chartHastaMonth.appendChild(optHasta);
                });
                
                // Seleccionar por defecto: primer mes (hace 9 meses) hasta último mes (actual)
                const first = last[0]; const lastIt = last[last.length - 1];
                chartDesdeYear.value = String(first.year);
                chartDesdeMonth.value = String(first.month);
                chartHastaYear.value = String(lastIt.year);
                chartHastaMonth.value = String(lastIt.month);
            }
        }

        function parseControlRange(){
            // determine tipo from switches: SEGUNDA / TERCERA / AMBOS
            let tipo = 'AMBOS';
            try {
                if (chartSwitchSeg && chartSwitchSeg.checked) tipo = 'SEGUNDA';
                else if (chartSwitchTer && chartSwitchTer.checked) tipo = 'TERCERA';
            } catch(e) { tipo = 'AMBOS'; }
            
            const periodo = chartPeriodo.value;
            
            if (periodo === 'SEMANA') {
                const desdeY = chartDesdeYear.value || '';
                const desdeW = chartDesdeWeek.value || '';
                const hastaY = chartHastaYear.value || '';
                const hastaW = chartHastaWeek.value || '';
                // Si el usuario no seleccionó ningún Desde/Hasta usar las últimas 10 semanas
                const useLast = !(desdeY || desdeW || hastaY || hastaW);
                return { periodo, useLast, tipo, desdeY, desdeW, hastaY, hastaW };
            } else {
                const desdeY = chartDesdeYear.value || '';
                const desdeM = chartDesdeMonth.value || '';
                const hastaY = chartHastaYear.value || '';
                const hastaM = chartHastaMonth.value || '';
                const useLast = !(desdeY || desdeM || hastaY || hastaM);
                return { periodo, useLast, tipo, desdeY: desdeY, desdeM: desdeM, hastaY: hastaY, hastaM: hastaM };
            }
        }

        function aggregateMonthlyData(opts){
            const fechaKeyDef = detectFechaKey(_originalDefectos);
            const defectsMap = new Map();
            const ingresoMap = new Map();
            
            // Acumular defectos por mes desde FECHA DE TIMBRADO
            (_originalDefectos||[]).forEach(r => {
                const d = tryParseDate(r[fechaKeyDef]);
                if (!d) return;
                const y = d.getFullYear();
                const m = d.getMonth() + 1; // 1-12
                const key = getMonthKey(y, m);
                const tipoRow = toUpperTrim(r['TIPO']);
                if (opts.tipo !== 'AMBOS' && tipoRow !== opts.tipo) return;
                let sum = 0;
                DEFECT_DEFS.forEach(def => { sum += toNumber(r[def.col]); });
                if (!sum) sum = 0;
                defectsMap.set(key, (defectsMap.get(key) || 0) + sum);
            });
            
            // Acumular ingreso por mes - la hoja ingreso tiene AÑO y SEMANA, necesitamos convertir semanas a meses
            const ingresoCol = detectarColumnaIngreso(_originalIngreso);
            const ingresoKeys = _originalIngreso && _originalIngreso.length ? Object.keys(_originalIngreso[0]) : [];
            const keyAno = ingresoKeys.find(k => toUpperTrim(k).replace(/\s+/g,'') === 'AÑO' || toUpperTrim(k).replace(/\s+/g,'') === 'ANO' || toUpperTrim(k) === 'AÑO');
            const keySemana = ingresoKeys.find(k => toUpperTrim(k).includes('SEMANA'));
            
            if (keyAno && keySemana) {
                // La hoja de ingreso tiene columnas AÑO y SEMANA, convertir a mes
                (_originalIngreso||[]).forEach(r => {
                    const rv = r[keyAno];
                    const sv = r[keySemana];
                    const y = rv === null || rv === undefined || rv === '' ? null : Number(String(rv).toString().replace(/\s+/g, ''));
                    const w = sv === null || sv === undefined || sv === '' ? null : Number(String(sv).toString().replace(/\D+/g, ''));
                    if (!y || !w) return;
                    
                    // Convertir año/semana a fecha para obtener el mes
                    const dateFromWeek = getDateFromWeek(y, w);
                    if (!dateFromWeek) return;
                    const m = dateFromWeek.getMonth() + 1; // 1-12
                    const key = getMonthKey(y, m);
                    const val = toNumber(r[ingresoCol]);
                    ingresoMap.set(key, (ingresoMap.get(key) || 0) + val);
                });
            } else {
                // Fallback: intentar usar fecha directa si existe
                const fechaKeyIng = detectFechaKey(_originalIngreso);
                (_originalIngreso||[]).forEach(r => {
                    const d = tryParseDate(r[fechaKeyIng]);
                    if (!d) return;
                    const y = d.getFullYear();
                    const m = d.getMonth() + 1;
                    const key = getMonthKey(y, m);
                    const val = toNumber(r[ingresoCol]);
                    ingresoMap.set(key, (ingresoMap.get(key) || 0) + val);
                });
            }
            
            // Construir array de meses
            let keys = [];
            if (ingresoMap.size > 0) keys = Array.from(ingresoMap.keys());
            else keys = Array.from(new Set([...defectsMap.keys(), ...ingresoMap.keys()]));
            
            let arr = keys.map(k => {
                const [y, m] = k.split('|');
                return { key: k, year: Number(y), month: Number(m), defects: defectsMap.get(k) || 0, ingreso: ingresoMap.get(k) || 0 };
            });
            arr.sort((a,b) => (a.year*100 + a.month) - (b.year*100 + b.month));
            
            if (opts.useLast) {
                const last = lastNMonths(10);
                const order = last.map(x => x.key);
                arr = order.map(k => {
                    const found = arr.find(a => a.key === k);
                    if (found) return found;
                    const [y, m] = k.split('|');
                    return { key: k, year: Number(y), month: Number(m), defects: 0, ingreso: 0 };
                }).filter(Boolean);
            } else if (opts.desdeY || opts.desdeM || opts.hastaY || opts.hastaM) {
                // Filtrar por rango de año/mes
                const desdeNum = (opts.desdeY && opts.desdeM) ? (Number(opts.desdeY)*100 + Number(opts.desdeM)) : null;
                const hastaNum = (opts.hastaY && opts.hastaM) ? (Number(opts.hastaY)*100 + Number(opts.hastaM)) : null;
                arr = arr.filter(a => {
                    const v = a.year*100 + a.month;
                    if (desdeNum !== null && v < desdeNum) return false;
                    if (hastaNum !== null && v > hastaNum) return false;
                    return true;
                });
            }
            
            const monthNames = ['ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN', 'JUL', 'AGO', 'SET', 'OCT', 'NOV', 'DIC'];
            const yearsSet = new Set(arr.map(a => a.year));
            const includeYear = yearsSet.size > 1;
            const labels = arr.map(a => includeYear ? `${monthNames[a.month-1]}-${a.year}` : monthNames[a.month-1]);
            const defects = arr.map(a => a.defects);
            const ingresos = arr.map(a => a.ingreso);
            const percent = arr.map(a => (a.ingreso && a.ingreso > 0) ? (a.defects / a.ingreso) * 100 : 0);
            return { labels, defects, ingresos, percent };
        }
        
        function aggregateWeeklyData(opts){
            const fechaKeyDef = detectFechaKey(_originalDefectos);
            const fechaKeyIng = detectFechaKey(_originalIngreso);
            const defectsMap = new Map();
            const ingresoMap = new Map();

            // Acumular defectos por semana (filtrando por tipo si aplica)
            (_originalDefectos||[]).forEach(r => {
                const d = tryParseDate(r[fechaKeyDef]);
                if (!d) return;
                const y = d.getFullYear(); const w = getISOWeek(d); const key = getWeekKey(y,w);
                const tipoRow = toUpperTrim(r['TIPO']);
                if (opts.tipo !== 'AMBOS' && tipoRow !== opts.tipo) return;
                let sum = 0;
                DEFECT_DEFS.forEach(def => { sum += toNumber(r[def.col]); });
                if (!sum) sum = 0;
                defectsMap.set(key, (defectsMap.get(key) || 0) + sum);
            });

            // Acumular ingreso por semana.
            // Primero intentar usar columnas explicitias AÑO / SEMANA en la hoja de ingreso (más fiable).
            const ingresoCol = detectarColumnaIngreso(_originalIngreso);
            const ingresoKeys = _originalIngreso && _originalIngreso.length ? Object.keys(_originalIngreso[0]) : [];
            const keyAno = ingresoKeys.find(k => toUpperTrim(k).replace(/\s+/g,'') === 'AÑO' || toUpperTrim(k).replace(/\s+/g,'') === 'ANO' || toUpperTrim(k) === 'AÑO');
            const keySemana = ingresoKeys.find(k => toUpperTrim(k).includes('SEMANA'));
            if (keyAno && keySemana) {
                (_originalIngreso||[]).forEach(r => {
                    const rv = r[keyAno];
                    const sv = r[keySemana];
                    const y = rv === null || rv === undefined || rv === '' ? null : Number(String(rv).toString().replace(/\s+/g, ''));
                    const w = sv === null || sv === undefined || sv === '' ? null : Number(String(sv).toString().replace(/\D+/g, ''));
                    if (!y || !w) return;
                    const key = getWeekKey(y, w);
                    const val = toNumber(r[ingresoCol]);
                    ingresoMap.set(key, (ingresoMap.get(key) || 0) + val);
                });
            } else {
                // fallback: intentar por fecha (si existe una columna de fecha en ingresoRows)
                (_originalIngreso||[]).forEach(r => {
                    const d = tryParseDate(r[fechaKeyIng]);
                    if (!d) return;
                    const y = d.getFullYear(); const w = getISOWeek(d); const key = getWeekKey(y,w);
                    const val = toNumber(r[ingresoCol]);
                    ingresoMap.set(key, (ingresoMap.get(key) || 0) + val);
                });
            }

            // Preferir las semanas presentes en ingresoMap (para alinear las barras)
            let keys = [];
            if (ingresoMap.size > 0) keys = Array.from(ingresoMap.keys());
            else keys = Array.from(new Set([...defectsMap.keys(), ...ingresoMap.keys()]));

            let arr = keys.map(k => {
                const [y,s] = k.split('|');
                return { key: k, year: Number(y), week: Number(s), defects: defectsMap.get(k) || 0, ingreso: ingresoMap.get(k) || 0 };
            });
            arr.sort((a,b) => (a.year*100 + a.week) - (b.year*100 + b.week));

            if (opts.useLast) {
                const last = lastNWeeks(10);
                const order = last.map(x => x.key);
                // construir arr siguiendo el orden de las últimas semanas
                arr = order.map(k => {
                    const found = arr.find(a => a.key === k);
                    if (found) return found;
                    const [y,s] = k.split('|');
                    return { key: k, year: Number(y), week: Number(s), defects: 0, ingreso: 0 };
                }).filter(Boolean);
            } else if (opts.desdeY || opts.desdeW || opts.hastaY || opts.hastaW) {
                const desdeNum = (opts.desdeY && opts.desdeW) ? (Number(opts.desdeY)*100 + Number(opts.desdeW)) : null;
                const hastaNum = (opts.hastaY && opts.hastaW) ? (Number(opts.hastaY)*100 + Number(opts.hastaW)) : null;
                arr = arr.filter(a => {
                    const v = a.year*100 + a.week;
                    if (desdeNum !== null && v < desdeNum) return false;
                    if (hastaNum !== null && v > hastaNum) return false;
                    return true;
                });
            }

            const yearsSet = new Set(arr.map(a => a.year));
            const includeYear = yearsSet.size > 1;
            const labels = arr.map(a => includeYear ? `${a.year}-SEM${a.week}` : `SEM${a.week}`);
            const defects = arr.map(a => a.defects);
            const ingresos = arr.map(a => a.ingreso);
            const percent = arr.map(a => (a.ingreso && a.ingreso > 0) ? (a.defects / a.ingreso) * 100 : 0);
            return { labels, defects, ingresos, percent };
        }

        function drawChart(data){
            if (chartInstance) { chartInstance.destroy(); chartInstance = null; }
            const ctx = chartsCanvas.getContext('2d');
            const maxPercent = data.percent && data.percent.length ? Math.max(...data.percent) : 0;
            const suggestedMax = maxPercent > 0 ? Math.ceil(maxPercent * 1.2 * 100) / 100 : 1;

            // add a small custom plugin to draw the labels exactly as requested
            const CustomDataLabelPlugin = {
                id: 'customDataLabels',
                afterDatasetsDraw: function(chart) {
                    const { ctx, data } = chart;
                    // debug: indicate plugin ran
                    try { console.debug && console.debug('customDataLabels: drawing', chart.id); } catch (e) {}
                    ctx.save();
                    // Bars: dataset index 0 -> TOTAL INGRESO A EMBALAJE (blue, Calibri 16 bold) at base of column
                    const barMeta = chart.getDatasetMeta(0);
                    if (barMeta && barMeta.data) {
                        // usar azul oscuro para las etiquetas de las columnas
                        ctx.fillStyle = '#0b5394';
                        ctx.font = '700 16px Calibri, Arial, sans-serif';
                        ctx.textAlign = 'center';
                        ctx.textBaseline = 'bottom';
                        barMeta.data.forEach((bar, i) => {
                            try {
                                const val = data.datasets[0].data[i];
                                if (val === null || val === undefined) return;
                                const txt = Number(val) ? Number(val).toLocaleString() : '0';
                                // for vertical bar, use bar.base as bottom coordinate (if available)
                                const baseY = (bar.base !== undefined) ? bar.base : (chart.chartArea ? chart.chartArea.bottom : (bar.y || 0));
                                const x = bar.x !== undefined ? bar.x : (bar.getCenterPoint ? bar.getCenterPoint().x : 0);
                                // draw slightly above the base (inside the bar). If you prefer outside, change offset.
                                ctx.fillText(txt, x, baseY - 4);
                            } catch (e) { /* ignore per-bar errors */ }
                        });
                    }

                    // Line: dataset index 1 -> % DEFECTOS (red, Calibri 16) above each point
                    // Only draw these line labels for the main chartsCanvas plugin consumer to avoid duplicating
                    // with chartjs-plugin-datalabels (used by Pareto). If chart is the general charts canvas, draw.
                    const lineMeta = chart.getDatasetMeta(1);
                    if (chart && chart.canvas && chart.canvas.id === 'chartsCanvas') {
                        if (lineMeta && lineMeta.data) {
                            ctx.fillStyle = 'rgb(220,53,69)';
                            ctx.font = '400 16px Calibri, Arial, sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'bottom';
                            lineMeta.data.forEach((pt, i) => {
                                try {
                                    const val = data.datasets[1].data[i];
                                    if (val === null || val === undefined) return;
                                    const txt = Number(val) ? Number(val).toFixed(2) + '%' : '0.00%';
                                    const x = pt.x !== undefined ? pt.x : (pt.getCenterPoint ? pt.getCenterPoint().x : 0);
                                    const y = pt.y !== undefined ? pt.y : (pt.getCenterPoint ? pt.getCenterPoint().y : 0);
                                    ctx.fillText(txt, x, y - 10);
                                } catch (e) { /* ignore */ }
                            });
                        }
                    }

                    ctx.restore();
                }
            };
            // register plugin (safe no-op if already registered)
            try { Chart.register(CustomDataLabelPlugin); } catch (e) { /* ignore */ }

            chartInstance = new Chart(ctx, {
                data: {
                    labels: data.labels,
                    datasets: [
                        {
                            type: 'bar',
                            label: 'TOTAL INGRESO A EMBALAJE',
                            data: data.ingresos,
                            backgroundColor: 'rgba(54,162,235,0.6)',
                            borderColor: 'rgba(54,162,235,0.9)',
                            borderWidth: 1,
                            yAxisID: 'y1'
                        },
                        {
                            type: 'line',
                            label: '% DEFECTOS vs INGRESO',
                            data: data.percent,
                            borderColor: 'rgba(220,53,69,0.9)',
                            backgroundColor: 'rgba(220,53,69,0.2)',
                            tension: 0.2,
                            fill: false,
                            pointRadius: 4,
                            yAxisID: 'y'
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    interaction: { mode: 'index', intersect: false },
                    plugins: {
                        // Disable chartjs-plugin-datalabels for this chart to avoid duplicate labels.
                        datalabels: { display: false, clamp: true, clip: false },
                        legend: { position: 'bottom' },
                        tooltip: {
                            callbacks: {
                                label: function(ctx) {
                                    const ds = ctx.dataset;
                                    const val = ctx.raw;
                                    if (ds.type === 'bar') {
                                        return ds.label + ': ' + (Number(val) ? Number(val).toLocaleString() : '0');
                                    } else {
                                        return ds.label + ': ' + (Number(val) ? Number(val).toFixed(2) + '%' : '0.00%');
                                    }
                                }
                            }
                        }
                    },
                    scales: {
                        y: {
                            type: 'linear',
                            position: 'left',
                            ticks: { callback: function(v){ return Number(v).toFixed(2) + '%'; } },
                            title: { display: true, text: '% DEFECTOS vs INGRESO' },
                            suggestedMax: suggestedMax,
                            beginAtZero: true
                        },
                        y1: {
                            type: 'linear',
                            position: 'right',
                            grid: { drawOnChartArea: false },
                            title: { display: true, text: 'TOTAL INGRESO A EMBALAJE' },
                            ticks: { callback: function(v){ return Math.round(v).toLocaleString(); } },
                            beginAtZero: true
                        }
                    }
                }
            });
            // expose for debugging in DevTools
            try { window._lastChart = chartInstance; } catch(e) {}
        }

        function renderChartFromControls(){
            const opts = parseControlRange();
            let data;
            if (opts.periodo === 'SEMANA') {
                data = aggregateWeeklyData(opts);
            } else {
                data = aggregateMonthlyData(opts);
            }
            // if no labels, show empty message in canvas by drawing blank chart
            drawChart(data);
        }

        // Re-render chart automatically when any selector changes
        [chartDesdeYear, chartDesdeWeek, chartHastaYear, chartHastaWeek, chartDesdeMonth, chartHastaMonth].forEach(el => {
            if (el) el.addEventListener('change', () => { renderChartFromControls(); });
        });
        
        // Evento para cambio de periodo
        if (chartPeriodo) {
            chartPeriodo.addEventListener('change', () => {
                populateChartSelectors();
                togglePeriodoControls();
                renderChartFromControls();
            });
        }
        
        // Setup switches behavior for charts (mutually exclusive, redraw)
        if (chartSwitchSeg && chartSwitchTer) {
            chartSwitchSeg.addEventListener('change', () => {
                if (chartSwitchSeg.checked) chartSwitchTer.checked = false;
                renderChartFromControls();
            });
            chartSwitchTer.addEventListener('change', () => {
                if (chartSwitchTer.checked) chartSwitchSeg.checked = false;
                renderChartFromControls();
            });
        }

    })();

    /*************************************************************
     * INICIO
     *************************************************************/
    // Carga datos (o reutiliza el caché de 5 min), puebla filtros y restaura la
    // última selección. `forceReload` (botón ⟳) salta el caché.
    function loadData(forceReload) {
        const cacheValido = !forceReload && _dataCache.defectos && (Date.now() - _dataCache.loadedAt) < DATA_TTL_MS;
        if (cacheValido) {
            _originalDefectos = _dataCache.defectos;
            _originalIngreso = _dataCache.ingreso;
            setStatus("Datos cargados correctamente", "ok");
            populateFilters(_originalDefectos);
            if (!restoreSavedFilters()) applyFiltersAndBuild();
            return;
        }

        setStatus("Cargando datos desde Google Sheets…", "loading");

        Promise.all([
            loadSheetJSONP(SHEET_ID, DEFECTOS_SHEET),
            loadSheetJSONP(SHEET_ID, INGRESO_SHEET)
        ])
        .then(([defectosRows, ingresoRows]) => {
            setStatus("Datos cargados correctamente", "ok");
            // Guardar originales para filtrado (y en el caché del módulo)
            _originalDefectos = defectosRows || [];
            _originalIngreso = ingresoRows || [];
            _dataCache = { defectos: _originalDefectos, ingreso: _originalIngreso, loadedAt: Date.now() };
            // Poblar selects basados en FECHA DE TIMBRADO
            populateFilters(_originalDefectos);
            // Restaurar la última selección; si no hay, construir con los defaults
            if (!restoreSavedFilters()) applyFiltersAndBuild();
        })
        .catch(err => {
            console.error(err);
            setStatus("Error al cargar datos", "error");
            showError(err.message || "Ocurrió un error al cargar los datos.");
        });
    }
    loadData(false);

        // ===== Fin del script original =====

        // Exponer en window las funciones usadas por handlers inline (si las hay)
        [].forEach(function (__n) { try { window[__n] = eval(__n); } catch (__e) {} });
    }

    App.registerView('segundas-terceras', { title: 'Segundas y Terceras', mount: mount });
})();