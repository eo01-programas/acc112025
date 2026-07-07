/* ============================================================
   views/empaque.js - Vista "Resultado Auditoria Empaque" (SPA)
   Migrado desde RESULTADO AUDITORIA EMPAQUE.html. Logica y marcado originales: el <script> se
   ejecuta dentro de mount() (tras inyectar el template) para que el
   DOM exista, igual que cuando el <script> estaba al final del body.
   Arranques diferidos (DOMContentLoaded / ready) -> ejecucion inmediata.
   ============================================================ */
(function () {
    var TEMPLATE = "\r\n  \u003cdiv class=\"header-container\"\u003e\r\n    \u003ch1\u003eREPORTE DE AUDITORIAS DE EMPAQUE\u003c/h1\u003e\r\n    \u003ca href=\"#/\" class=\"btn-volver\" title=\"Inicio\"\u003e🏠\u003c/a\u003e\r\n  \u003c/div\u003e\r\n\r\n  \u003cdiv class=\"filter-section\"\u003e\r\n    \u003cdiv class=\"labelframe\" id=\"weekFieldset\"\u003e\r\n      \u003cspan class=\"labelframe-title\"\u003eFilter:\u003c/span\u003e\r\n      \u003cdiv class=\"labelframe-content\" style=\"display: flex; gap: 2px; align-items: flex-end; flex-wrap: wrap;\"\u003e\r\n        \u003cdiv class=\"control-group\" style=\"flex: 0 1 22%; min-width: 80px;\"\u003e\r\n          \u003clabel style=\"font-size: 11px; display:none;\"\u003eYear\u003c/label\u003e\r\n          \u003cselect id=\"yearSelect\" style=\"width: 100%; padding: 6px 8px; font-size: 11px;\"\u003e\r\n            \u003coption value=\"\"\u003eCargando...\u003c/option\u003e\r\n          \u003c/select\u003e\r\n        \u003c/div\u003e\r\n        \u003cdiv class=\"control-group\" style=\"flex: 0 1 21%; min-width: 80px;\"\u003e\r\n          \u003clabel style=\"font-size: 11px; display:none;\"\u003eSem/Mes\u003c/label\u003e\r\n          \u003cselect id=\"periodSelect\" style=\"width: 100%; padding: 6px 8px; font-size: 11px;\"\u003e\r\n            \u003coption value=\"\"\u003eCargando...\u003c/option\u003e\r\n          \u003c/select\u003e\r\n        \u003c/div\u003e\r\n        \u003cdiv class=\"control-group\" style=\"flex: 0 1 18%; min-width: 70px;\"\u003e\r\n          \u003clabel style=\"font-size: 11px; display:none;\"\u003eWeek\u003c/label\u003e\r\n          \u003cselect id=\"weekSelect\" disabled style=\"width: 100%; padding: 6px 8px; font-size: 11px;\"\u003e\r\n            \u003coption value=\"\"\u003eCargando...\u003c/option\u003e\r\n          \u003c/select\u003e\r\n        \u003c/div\u003e\r\n        \u003cdiv class=\"switch-group\" style=\"flex: 0 1 auto; align-items: center; gap: 2px;\"\u003e\r\n          \u003clabel class=\"switch\" style=\"transform: scale(0.85); margin: 0;\"\u003e\r\n            \u003cinput type=\"checkbox\" id=\"lastWeekSwitch\"\u003e\r\n            \u003cspan class=\"slider\"\u003e\u003c/span\u003e\r\n          \u003c/label\u003e\r\n          \u003cspan class=\"switch-label\" id=\"switchLabel\" style=\"font-size: 11px; white-space: nowrap;\"\u003eLast Week\u003c/span\u003e\r\n        \u003c/div\u003e\r\n      \u003c/div\u003e\r\n    \u003c/div\u003e\r\n\r\n    \u003cdiv class=\"labelframe\"\u003e\r\n      \u003cspan class=\"labelframe-title\"\u003eFactory Filters:\u003c/span\u003e\r\n      \u003cdiv class=\"labelframe-content\"\u003e\r\n        \u003cdiv class=\"switch-group\"\u003e\r\n          \u003clabel class=\"switch\"\u003e\r\n            \u003cinput type=\"checkbox\" id=\"filterCofaco\"\u003e\r\n            \u003cspan class=\"slider\"\u003e\u003c/span\u003e\r\n          \u003c/label\u003e\r\n          \u003cspan class=\"switch-label\"\u003eCofaco\u003c/span\u003e\r\n        \u003c/div\u003e\r\n        \u003cdiv class=\"switch-group\"\u003e\r\n          \u003clabel class=\"switch\"\u003e\r\n            \u003cinput type=\"checkbox\" id=\"filterCititex1\"\u003e\r\n            \u003cspan class=\"slider\"\u003e\u003c/span\u003e\r\n          \u003c/label\u003e\r\n          \u003cspan class=\"switch-label\"\u003eCititex 1\u003c/span\u003e\r\n        \u003c/div\u003e\r\n        \u003cdiv class=\"switch-group\"\u003e\r\n          \u003clabel class=\"switch\"\u003e\r\n            \u003cinput type=\"checkbox\" id=\"filterCititex2\"\u003e\r\n            \u003cspan class=\"slider\"\u003e\u003c/span\u003e\r\n          \u003c/label\u003e\r\n          \u003cspan class=\"switch-label\"\u003eCititex 2\u003c/span\u003e\r\n        \u003c/div\u003e\r\n        \u003cdiv class=\"switch-group\"\u003e\r\n          \u003clabel class=\"switch\"\u003e\r\n            \u003cinput type=\"checkbox\" id=\"filterCititexEstanos\"\u003e\r\n            \u003cspan class=\"slider\"\u003e\u003c/span\u003e\r\n          \u003c/label\u003e\r\n          \u003cspan class=\"switch-label\"\u003eCititex-Estaños\u003c/span\u003e\r\n        \u003c/div\u003e\r\n      \u003c/div\u003e\r\n    \u003c/div\u003e\r\n\r\n    \u003cdiv class=\"labelframe\"\u003e\r\n      \u003cspan class=\"labelframe-title\"\u003eCustomer Filter:\u003c/span\u003e\r\n      \u003cdiv class=\"labelframe-content\"\u003e\r\n        \u003cdiv class=\"customer-filter-wrapper\"\u003e\r\n          \u003cbutton class=\"customer-filter-button\" id=\"customerFilterBtn\" type=\"button\"\u003e\r\n            \u003cspan id=\"customerFilterLabel\"\u003eTodos\u003c/span\u003e\r\n            \u003cspan\u003e▼\u003c/span\u003e\r\n          \u003c/button\u003e\r\n          \u003cdiv class=\"customer-dropdown\" id=\"customerDropdown\"\u003e\r\n            \u003c!-- Opciones se llenarán dinámicamente --\u003e\r\n          \u003c/div\u003e\r\n        \u003c/div\u003e\r\n      \u003c/div\u003e\r\n    \u003c/div\u003e\r\n\r\n    \u003cdiv class=\"right-controls\"\u003e\r\n      \u003cbutton id=\"btnExport\" disabled\u003eDescargar Excel\u003c/button\u003e\r\n      \u003cbutton id=\"btnChart\" class=\"btn-chart\" disabled style=\"margin-left:8px\"\u003e📊 Gráficos\u003c/button\u003e\r\n      \u003cspan id=\"status\" class=\"badge loading\" style=\"margin-left:12px\"\u003eCargando datos desde Google Sheets…\u003c/span\u003e\r\n    \u003c/div\u003e\r\n  \u003c/div\u003e\r\n\r\n  \u003cdiv class=\"content-container\"\u003e\r\n    \u003cdiv class=\"wrap\"\u003e\r\n      \u003cdiv class=\"table-scroll\"\u003e\r\n        \u003ctable id=\"summaryTable\"\u003e\r\n          \u003cthead\u003e\r\n            \u003ctr\u003e\r\n              \u003cth style=\"width:12%\"\u003eFactory Code\u003c/th\u003e\r\n              \u003cth style=\"width:10%\"\u003eCustomer\u003c/th\u003e\r\n              \u003cth style=\"width:5%\"\u003eLot Box\u003c/th\u003e\r\n              \u003cth style=\"width:5%\"\u003eTotal Cajas\u003c/th\u003e\r\n              \u003cth style=\"width:8%\"\u003eCtd Incorrecta\u003c/th\u003e\r\n              \u003cth style=\"width:6%\"\u003exAvios\u003c/th\u003e\r\n              \u003cth style=\"width:6%\"\u003exRotulo\u003c/th\u003e\r\n              \u003cth style=\"width:6%\"\u003exTalla\u003c/th\u003e\r\n              \u003cth style=\"width:6%\"\u003es/sticker bolsa\u003c/th\u003e\r\n              \u003cth style=\"width:6%\"\u003ePeso exc.\u003c/th\u003e\r\n              \u003cth style=\"width:7%\"\u003eObjetos extraños\u003c/th\u003e\r\n              \u003cth style=\"width:5%\"\u003eTot. Def.\u003c/th\u003e\r\n              \u003cth style=\"width:5.5%\"\u003e%Def.\u003c/th\u003e\r\n              \u003cth style=\"width:2.5%\"\u003eA1\u003c/th\u003e\r\n              \u003cth style=\"width:2.5%\"\u003eA2\u003c/th\u003e\r\n              \u003cth style=\"width:2.5%\"\u003eA3\u003c/th\u003e\r\n              \u003cth style=\"width:2.5%\"\u003eA4\u003c/th\u003e\r\n              \u003cth style=\"width:2.5%\"\u003eTT\u003c/th\u003e\r\n            \u003c/tr\u003e\r\n          \u003c/thead\u003e\r\n          \u003ctbody id=\"tbody\"\u003e\r\n            \u003ctr\u003e\u003ctd colspan=\"18\" style=\"padding:16px;text-align:center;color:#777\"\u003eSin datos\u003c/td\u003e\u003c/tr\u003e\r\n          \u003c/tbody\u003e\r\n        \u003c/table\u003e\r\n      \u003c/div\u003e\r\n    \u003c/div\u003e\r\n\r\n    \u003c!-- Charts removed per request --\u003e\r\n    \u003c!-- Modal para Gráficos --\u003e\r\n    \u003cdiv id=\"chartModal\" class=\"modal\" aria-hidden=\"true\"\u003e\r\n      \u003cdiv class=\"modal-content\"\u003e\r\n        \u003cspan class=\"close\" id=\"closeChartModal\"\u003e\u0026times;\u003c/span\u003e\r\n        \u003ch2 style=\"text-align:center; margin-top:0;\"\u003ePerformance Auditorias Empaque\u003c/h2\u003e\r\n        \u003cdiv class=\"modal-filters\" role=\"region\" aria-label=\"Filtros del gráfico\"\u003e\r\n            \u003cdiv class=\"filter-item row\" style=\"min-width:200px;\"\u003e\r\n              \u003clabel for=\"chartCustomerBtn\"\u003eCustomer:\u003c/label\u003e\r\n              \u003cdiv class=\"customer-filter-wrapper\"\u003e\r\n                \u003cbutton class=\"customer-filter-button\" id=\"chartCustomerBtn\" type=\"button\"\u003e\r\n                  \u003cspan id=\"chartCustomerLabel\"\u003eTodos\u003c/span\u003e\r\n                  \u003cspan\u003e▼\u003c/span\u003e\r\n                \u003c/button\u003e\r\n                \u003cdiv class=\"customer-dropdown\" id=\"chartCustomerDropdown\"\u003e\u003c/div\u003e\r\n              \u003c/div\u003e\r\n            \u003c/div\u003e\r\n\r\n          \u003cdiv class=\"filter-item row\" style=\"min-width:140px;\"\u003e\r\n            \u003clabel for=\"chartFactoryFilter\"\u003eFactory Code:\u003c/label\u003e\r\n            \u003cselect id=\"chartFactoryFilter\" class=\"short-select\"\u003e\u003coption value=\"all\"\u003eTodos los Factory Codes\u003c/option\u003e\u003c/select\u003e\r\n          \u003c/div\u003e\r\n\r\n          \u003cdiv class=\"filter-item row\" style=\"min-width:120px;\"\u003e\r\n            \u003clabel for=\"weekFromFilter\"\u003eDesde:\u003c/label\u003e\r\n            \u003cselect id=\"weekFromFilter\" class=\"short-select\"\u003e\r\n              \u003coption value=\"46\"\u003eSEM46\u003c/option\u003e\r\n              \u003coption value=\"47\"\u003eSEM47\u003c/option\u003e\r\n              \u003coption value=\"48\"\u003eSEM48\u003c/option\u003e\r\n              \u003coption value=\"49\"\u003eSEM49\u003c/option\u003e\r\n              \u003coption value=\"50\"\u003eSEM50\u003c/option\u003e\r\n              \u003coption value=\"51\" selected\u003eSEM51\u003c/option\u003e\r\n            \u003c/select\u003e\r\n          \u003c/div\u003e\r\n\r\n          \u003cdiv class=\"filter-item row\" style=\"min-width:120px;\"\u003e\r\n            \u003clabel for=\"weekToFilter\"\u003eHasta:\u003c/label\u003e\r\n            \u003cselect id=\"weekToFilter\" class=\"short-select\"\u003e\r\n              \u003coption value=\"46\"\u003eSEM46\u003c/option\u003e\r\n              \u003coption value=\"47\"\u003eSEM47\u003c/option\u003e\r\n              \u003coption value=\"48\"\u003eSEM48\u003c/option\u003e\r\n              \u003coption value=\"49\"\u003eSEM49\u003c/option\u003e\r\n              \u003coption value=\"50\"\u003eSEM50\u003c/option\u003e\r\n              \u003coption value=\"51\" selected\u003eSEM51\u003c/option\u003e\r\n            \u003c/select\u003e\r\n          \u003c/div\u003e\r\n        \u003c/div\u003e\r\n        \u003cdiv class=\"chart-container\"\u003e\r\n          \u003ccanvas id=\"trendsChart\"\u003e\u003c/canvas\u003e\r\n        \u003c/div\u003e\r\n      \u003c/div\u003e\r\n    \u003c/div\u003e\r\n  \u003c/div\u003e\r\n\r\n  \r\n\r\n";

    // Caché de datos entre visitas (el IIFE persiste aunque mount() se re-ejecute
    // y su estado interno se pierda) y clave de persistencia de filtros.
    // Mismo patrón que el resto de paneles: TTL 5 min + botón ⟳.
    var DATA_TTL_MS = 5 * 60 * 1000;
    var _dataCache = { rows: null, loadedAt: 0 };
    var FILTERS_STORE_KEY = 'empaque.filters';

    function mount(root) {
        root.innerHTML = TEMPLATE;
        // Botón Inicio: ícono de casa en blanco (SVG, mismo estilo del resto de la app).
        var _homeBtn = root.querySelector('.btn-volver');
        if (_homeBtn) _homeBtn.innerHTML = "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor'><path d='M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z'/></svg>";
        // Empaque: llevar TODO al header en una sola línea (a solicitud). Excel/Gráficos
        // pasan a circulares (a la izquierda de Inicio) y se mueven los filtros al
        // header-container. Si no cabe, el header envuelve (evita scroll horizontal).
        function _iconBtn(sel, svg, bg, bgHover, title) {
            var b = root.querySelector(sel);
            if (!b) return;
            b.innerHTML = svg;
            if (title) b.title = title;
            b.style.width = '40px'; b.style.height = '40px'; b.style.minWidth = '40px';
            b.style.padding = '0'; b.style.borderRadius = '50%'; b.style.marginLeft = '0';
            b.style.display = 'inline-flex'; b.style.alignItems = 'center'; b.style.justifyContent = 'center';
            b.style.border = 'none'; b.style.boxShadow = '0 2px 8px rgba(47,59,47,.22)'; b.style.background = bg;
            b.addEventListener('mouseenter', function () { if (!b.disabled) b.style.background = bgHover; });
            b.addEventListener('mouseleave', function () { b.style.background = bg; });
        }
        var _svgDown = "<svg width='20' height='20' viewBox='0 0 24 24' fill='#fff'><path d='M5 20h14v-2H5v2zM19 9h-4V3H9v6H5l7 7 7-7z'/></svg>";
        var _svgBars2 = "<svg width='20' height='20' viewBox='0 0 24 24' fill='#fff'><rect x='3' y='11' width='4' height='9' rx='1'/><rect x='10' y='6' width='4' height='14' rx='1'/><rect x='17' y='3' width='4' height='17' rx='1'/></svg>";
        _iconBtn('#btnExport', _svgDown, 'var(--btn-excel-bg, #f78e6d)', 'var(--btn-excel-bg-hover, #d1603e)', 'Descargar Excel');
        _iconBtn('#btnChart', _svgBars2, 'var(--btn-chart-bg, #29b6f6)', 'var(--btn-chart-bg-hover, #0d47a1)', 'Gráficos');
        var _hdr = root.querySelector('.header-container');
        var _fs = root.querySelector('.filter-section');
        if (_hdr && _fs && _homeBtn) {
            while (_fs.firstElementChild) { _hdr.insertBefore(_fs.firstElementChild, _homeBtn); }
            _fs.remove();
            // UNA sola fila: título + filtros + botones (sin envolver). El título
            // se compacta a 22px (ya va en 2 líneas de texto) para que quepa a ~1366px.
            _hdr.style.flexWrap = 'nowrap';
            _hdr.style.gap = '4px 8px';
            _hdr.style.justifyContent = 'flex-start';
            var _h1e = _hdr.querySelector('h1');
            if (_h1e) {
                _h1e.innerHTML = 'REPORTE DE<br>AUDITORIAS DE EMPAQUE';
                _h1e.style.fontSize = '22px'; _h1e.style.whiteSpace = 'normal';
                _h1e.style.lineHeight = '1.1'; _h1e.style.letterSpacing = '0.03em';
                _h1e.style.flexShrink = '0';
            }
            // Agrupar Excel + Gráficos + ⟳ + Inicio para que no se separen.
            var _rc = _hdr.querySelector('.right-controls');
            if (_rc) {
                _rc.style.display = 'flex'; _rc.style.alignItems = 'center';
                _rc.style.flexWrap = 'nowrap'; _rc.style.flexShrink = '0'; _rc.style.gap = '6px';
                // Botón ⟳ (#btnRefresh): el script del panel ya lo cablea a init()
                // si existe (const btnRefresh + addEventListener); basta crearlo
                // aquí, ANTES de que ese script corra. Fuerza recarga (salta caché).
                if (!root.querySelector('#btnRefresh')) {
                    var _rb = document.createElement('button');
                    _rb.id = 'btnRefresh';
                    _rb.type = 'button';
                    var _statusEl = _rc.querySelector('#status');
                    _rc.insertBefore(_rb, _statusEl || null);
                }
                _rc.appendChild(_homeBtn);
            }
        }
        _iconBtn('#btnRefresh', "<svg width='20' height='20' viewBox='0 0 24 24' fill='#fff'><path d='M17.65 6.35A7.95 7.95 0 0012 4a8 8 0 108 8h-2a6 6 0 11-1.76-4.24L13 11h7V4l-2.35 2.35z'/></svg>", 'var(--sc8-primary)', 'var(--sc8-primary-dark)', 'Actualizar datos desde Google Sheets');
        var _rbCursor = root.querySelector('#btnRefresh');
        if (_rbCursor) _rbCursor.style.cursor = 'pointer';
        // Botones a 36px (los 4) para asegurar la fila única a ~1366px de ancho.
        ['#btnExport', '#btnChart', '#btnRefresh', '.btn-volver'].forEach(function (s) {
            var b = root.querySelector(s);
            if (b) { b.style.width = '36px'; b.style.height = '36px'; b.style.minWidth = '36px'; b.style.minHeight = '36px'; }
        });
        // "Last Week"/"Last Month" (id switchLabel, lo reescribe el panel según el modo)
        // en 2 líneas por ancho máximo, para que sobreviva a los cambios de texto.
        var _lw = root.querySelector('#switchLabel');
        if (_lw) {
            _lw.style.whiteSpace = 'normal'; _lw.style.lineHeight = '1.05'; _lw.style.textAlign = 'center';
            _lw.style.display = 'inline-block'; _lw.style.maxWidth = '34px'; _lw.style.marginRight = '0';
        }
        // "Cititex-Estaños" en 2 líneas (su etiqueta no la reescribe el panel).
        Array.prototype.forEach.call(root.querySelectorAll('.switch-label'), function (el) {
            if (/cititex\s*-?\s*esta/i.test((el.textContent || '').trim())) {
                el.innerHTML = 'Cititex-<br>Estaños';
                el.style.whiteSpace = 'normal'; el.style.lineHeight = '1.05'; el.style.textAlign = 'center';
            }
        });
        // Reducir el ancho de los selects del bloque Filter (Year / Sem-Mes / Week).
        Array.prototype.forEach.call(root.querySelectorAll('#yearSelect, #periodSelect, #weekSelect'), function (s) {
            s.style.width = 'auto'; s.style.maxWidth = '74px'; s.style.padding = '4px 4px'; s.style.fontSize = '11px';
            if (s.parentElement) { s.parentElement.style.flex = '0 0 auto'; s.parentElement.style.minWidth = '0'; }
        });
        // Menos padding/gap en el bloque "Filter:" para que sea más angosto.
        var _wf = root.querySelector('#weekFieldset');
        if (_wf) { _wf.style.paddingLeft = '6px'; _wf.style.paddingRight = '6px'; }
        var _wfc = _wf ? _wf.querySelector('.labelframe-content') : null;
        if (_wfc) { _wfc.style.gap = '3px'; }
        // Factory Filters: switches ~10% más pequeños (scale 0.9 + margen negativo para
        // reclamar el espacio) y menos padding/gap, para acortar el ancho del bloque.
        Array.prototype.forEach.call(root.querySelectorAll('.labelframe'), function (lf) {
            var t = lf.querySelector('.labelframe-title');
            if (!t || !/factory\s*filters/i.test(t.textContent || '')) return;
            Array.prototype.forEach.call(lf.querySelectorAll('.switch'), function (sw) {
                sw.style.transform = 'scale(0.9)'; sw.style.transformOrigin = 'center'; sw.style.margin = '0 -2px';
            });
            var c = lf.querySelector('.labelframe-content');
            if (c) c.style.gap = '4px';
            lf.style.paddingLeft = '6px'; lf.style.paddingRight = '6px';
        });
        // Customer Filter: botón más angosto (menos min-width, padding y fuente; el texto
        // largo se recorta con "…").
        var _cf = root.querySelector('.customer-filter-button');
        if (_cf) {
            _cf.style.minWidth = '104px'; _cf.style.maxWidth = '150px';
            _cf.style.padding = '5px 8px'; _cf.style.fontSize = '11px'; _cf.style.gap = '4px';
        }
        var _cfl = root.querySelector('#customerFilterLabel');
        if (_cfl) { _cfl.style.overflow = 'hidden'; _cfl.style.textOverflow = 'ellipsis'; _cfl.style.whiteSpace = 'nowrap'; }
        var __ready = function (fn) { if (typeof fn === 'function') fn(); };

        // ===== Script original del panel (relocado a mount) =====
  // =========================================================
  // CONFIG
  // =========================================================
  const SHEET_ID = "1RB48rgEm2anTARE_54XXcxeSs6G8Kt6N";  // tu sheet
  const SHEET_NAME = "GRID";

  // Helper para parsear fecha de Audit Date
  function parseAuditDate(s) {
    const t = String(s || "").trim();
    if (!t) return null;
    // Soportar formatos: "12/15/2024", "2024-12-15", etc.
    const d = new Date(t);
    return !isNaN(d.getTime()) ? d : null;
  }

  // Normalize display labels for defect columns
  function normalizeKeyForMatch(s){
    if(!s) return '';
    // remove accents, convert to lower, collapse spaces
    try{
      return String(s).normalize('NFD').replace(/\p{Diacritic}/gu,'').toLowerCase().replace(/\s+/g,' ').trim();
    }catch(e){
      return String(s).toLowerCase().replace(/\s+/g,' ').trim();
    }
  }

  function displayLabelForHeader(orig){
    const key = normalizeKeyForMatch(orig);
    const map = {
      'sin htag': 'S/htg',
      'sin htag ': 'S/htg',
      'sin sticker de bolsa': 's/sticker bolsa',
      'sin sticker de la bolsa': 's/sticker bolsa',
      'talla equivocada': 'xTalla',
      'mismatch htg-estilo': 'xHtg-estilo',
      'mismatch htg estilo': 'xHtg-estilo',
      'rotulo incorrecto': 'xRotulo',
      'rotulo roto': 'xRotulo',
      'cubicaje incorrecto': 'xCubicaje',
      'caja deteriorada': 'xCaja',
      'peso excedido': 'Peso exc.',
      'objetos extranos': 'Objetos extraños',
      'objetos extraños': 'Objetos extraños',
      'cantidad incorrecta': 'Ctd incorrecta',
      'avios incorrectos': 'xAvios'
    };
    return map[key] || orig;
  }

  function getWeekNumber(d) {
    const first = new Date(d.getFullYear(), 0, 1);
    const passed = d - first;
    const oneweek = 1000 * 60 * 60 * 24 * 7;
    return Math.floor(passed / oneweek) + 1;
  }

  function getMonthES(m) {
    const meses = ["", "Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
    return meses[m] || "";
  }

  // Poblar Year Select basado en datos
  function populateYearSelect() {
    const years = new Set();
    for (const r of grid) {
      const w = asText(r.Week);
      if (w) years.add(new Date().getFullYear()); // usar año actual por ahora
    }
    const yearArray = Array.from(years).sort((a, b) => b - a);
    const currentYear = new Date().getFullYear();
    
    document.getElementById('yearSelect').innerHTML = `<option value="">Cargando...</option>`;
    if (yearArray.length === 0) {
      yearArray.push(currentYear);
    }
    
    yearArray.forEach(y => {
      const opt = document.createElement("option");
      opt.value = y;
      opt.textContent = y;
      document.getElementById('yearSelect').appendChild(opt);
    });
    
    if (!document.getElementById('yearSelect').value && yearArray.length > 0) {
      document.getElementById('yearSelect').value = yearArray[0];
    }
  }

  function populatePeriodSelect() {
    const periods = [
      { value: "sem", label: "Sem" },
      { value: "mes", label: "Mes" }
    ];
    
    const periodSelect = document.getElementById('periodSelect');
    periodSelect.innerHTML = '';
    
    periods.forEach(p => {
      const opt = document.createElement("option");
      opt.value = p.value;
      opt.textContent = p.label;
      periodSelect.appendChild(opt);
    });
    
    periodSelect.value = "sem";
  }

  function populateWeekSelectByPeriod() {
    const periodSelect = document.getElementById('periodSelect');
    const yearSelect = document.getElementById('yearSelect');
    const weekSelect = document.getElementById('weekSelect');
    
    const selectedYear = parseInt(yearSelect.value, 10);
    const selectedPeriod = periodSelect.value;
    
    weekSelect.innerHTML = `<option value="">Seleccione...</option>`;
    
    if (selectedPeriod === "sem") {
      // Mostrar solo semanas que tienen datos
      const weeksWithData = new Set();
      for (const r of grid) {
        const weekNum = parseInt(asWeek(r.Week), 10);
        if (!isNaN(weekNum) && weekNum >= 1 && weekNum <= 52) {
          weeksWithData.add(weekNum);
        }
      }
      
      // Ordenar y mostrar semanas con datos
      const sortedWeeks = Array.from(weeksWithData).sort((a, b) => a - b);
      sortedWeeks.forEach(w => {
        const opt = document.createElement("option");
        opt.value = w;
        opt.textContent = "Sem " + w;
        weekSelect.appendChild(opt);
      });
      
      // Auto-seleccionar semana actual si existe, sino la primera disponible
      const currentWeek = getCurrentWeek();
      if (weeksWithData.has(currentWeek)) {
        weekSelect.value = currentWeek;
      } else if (sortedWeeks.length > 0) {
        weekSelect.value = sortedWeeks[sortedWeeks.length - 1]; // última semana disponible
      }
    } else if (selectedPeriod === "mes") {
      // Mostrar solo meses que tienen datos
      const monthsWithData = new Set();
      for (const r of grid) {
        const weekNum = parseInt(asWeek(r.Week), 10);
        if (!isNaN(weekNum)) {
          // Mapeo proporcional: distribuir 52 semanas en 12 meses
          const estimatedMonth = Math.ceil((weekNum * 12) / 52);
          if (estimatedMonth >= 1 && estimatedMonth <= 12) {
            monthsWithData.add(estimatedMonth);
          }
        }
      }
      
      // Mostrar solo los meses que tienen datos
      const meses = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
      const sortedMonths = Array.from(monthsWithData).sort((a, b) => a - b);
      
      sortedMonths.forEach(monthNum => {
        const opt = document.createElement("option");
        opt.value = monthNum;
        opt.textContent = meses[monthNum - 1];
        weekSelect.appendChild(opt);
      });
      
      // Auto-seleccionar mes actual si existe, sino el último disponible
      const currentMonth = getCurrentMonth();
      if (monthsWithData.has(currentMonth)) {
        weekSelect.value = currentMonth;
      } else if (sortedMonths.length > 0) {
        weekSelect.value = sortedMonths[sortedMonths.length - 1]; // último mes disponible
      }
    }
    
    weekSelect.disabled = false;
  }

  // =========================================================
  // ORDEN PERSONALIZADO PARA FACTORY CODES
  // =========================================================
  const FACTORY_ORDER = ["Cofaco", "Cititex 1", "Cititex 2", "Cititex-Estaños"];
  
  function getFactoryOrder(factoryCode){
    const fc = String(factoryCode || "").trim();
    const idx = FACTORY_ORDER.findIndex(f => fc.toLowerCase().includes(f.toLowerCase()));
    return idx >= 0 ? idx : 999; // Los no encontrados van al final
  }
  
  function sortFactories(factories){
    return Array.from(factories.entries())
      .sort((a, b) => getFactoryOrder(a[0]) - getFactoryOrder(b[0]));
  }

  // =========================================================
  // GVIZ JSONP loader (mismo patrón que tu ejemplo) :contentReference[oaicite:3]{index=3}
  // =========================================================
  // Descarga de datos GViz: la lógica vive en js/lib/sheets.js (App.lib.sheets).
  // Se conservan estos wrappers (mismo nombre) para no tocar el resto del panel.
  function gvizToObjects(resp){
    return App.lib.sheets.gvizToObjects(resp);
  }

  function loadSheetJSONP(sheetId, sheetName){
    return App.lib.sheets.loadSheetJSONP(sheetId, sheetName);
  }

  // =========================================================
  // Helpers: lectura robusta de columnas (aliases)
  // =========================================================
  function normKey(s){
    return String(s || "")
      .toLowerCase()
      .replace(/\s+/g,"")
      .replace(/[°º#\.\-_/]/g,"")
      .replace(/ñ/g,"n");
  }

  function getField(row, candidates){
    // candidates: ["Factory Code", "FactoryCode", ...]
    const map = {};
    for(const k of Object.keys(row)){
      map[normKey(k)] = k;
    }
    for(const cand of candidates){
      const hit = map[normKey(cand)];
      if(hit !== undefined) return row[hit];
    }
    return "";
  }

  function asText(v){
    if(v === null || v === undefined) return "";
    return String(v).trim();
  }

  function asWeek(v){
    // Week puede venir como número o texto
    const t = asText(v);
    if(t === "") return "";
    // Si es 49.0 -> 49
    const n = Number(t);
    if(!Number.isNaN(n) && Number.isFinite(n)) return String(parseInt(n,10));
    return t;
  }

  function parseAttempt(v){
    const t = asText(v);
    if(!t) return null;
    // soporta "1" o "A1"
    if(/^a\d+$/i.test(t)) return parseInt(t.slice(1),10);
    const n = parseInt(t,10);
    if(Number.isNaN(n)) return null;
    return n;
  }

  // Funciones para manejar períodos (Semana / Mes)
  function getCurrentMonth() {
    return new Date().getMonth() + 1; // 1-12
  }

  function getCurrentWeek() {
    const d = new Date();
    const first = new Date(d.getFullYear(), 0, 1);
    const passed = d - first;
    const oneweek = 1000 * 60 * 60 * 24 * 7;
    return Math.floor(passed / oneweek) + 1;
  }

  function getMonthNumber(monthName) {
    const meses = { "ene": 1, "feb": 2, "mar": 3, "abr": 4, "may": 5, "jun": 6, "jul": 7, "ago": 8, "sep": 9, "oct": 10, "nov": 11, "dic": 12 };
    return meses[String(monthName).toLowerCase().slice(0, 3)] || null;
  }

  function getPeriodType() {
    return document.getElementById('periodSelect').value;
  }

  function updateSwitchLabel() {
    const periodType = getPeriodType();
    const switchLabel = document.getElementById('switchLabel');
    const lastWeekSwitch = document.getElementById('lastWeekSwitch');
    if (periodType === "mes") {
      switchLabel.textContent = "Last Month";
    } else {
      switchLabel.textContent = "Last Week";
    }

    // Reset el checkbox
    lastWeekSwitch.checked = false;
  }

  // =========================================================
  // UI
  // =========================================================
  const weekSelect  = document.getElementById("weekSelect");
  const btnRefresh  = document.getElementById("btnRefresh");
  const btnExport   = document.getElementById("btnExport");
  const statusEl    = document.getElementById("status");
  const tbody       = document.getElementById("tbody");
  const btnChart    = document.getElementById("btnChart");
  const chartModal  = document.getElementById('chartModal');
  const closeChartModal = document.getElementById('closeChartModal');
  const chartFactoryFilter = document.getElementById('chartFactoryFilter');
  // modal customer dropdown elements (custom dropdown, mirror main page)
  const chartCustomerBtn = document.getElementById('chartCustomerBtn');
  const chartCustomerDropdown = document.getElementById('chartCustomerDropdown');
  const chartCustomerLabel = document.getElementById('chartCustomerLabel');
  let modalSelectedCustomers = new Set();

  const yearSelect = document.getElementById("yearSelect");
  const periodSelect = document.getElementById("periodSelect");
  const lastWeekSwitch = document.getElementById("lastWeekSwitch");
  const filterCofaco = document.getElementById("filterCofaco");
  const filterCititex1 = document.getElementById("filterCititex1");
  const filterCititex2 = document.getElementById("filterCititex2");
  const filterCititexEstanos = document.getElementById("filterCititexEstanos");

  const customerFilterBtn = document.getElementById("customerFilterBtn");
  const customerDropdown = document.getElementById("customerDropdown");
  const customerFilterLabel = document.getElementById("customerFilterLabel");
  
  let selectedCustomers = new Set(); // Almacena los customers seleccionados

  function formatCellNumber(n){
    const num = Number(n) || 0;
    return num === 0 ? `<span class="zero">${num}</span>` : String(num);
  }

  function getActiveFactories(){
    const active = [];
    if(filterCofaco.checked) active.push("Cofaco");
    if(filterCititex1.checked) active.push("Cititex 1");
    if(filterCititex2.checked) active.push("Cititex 2");
    if(filterCititexEstanos.checked) active.push("Cititex-Estaños");
    return active;
  }

  function getActiveCustomers(){
    return Array.from(selectedCustomers);
  }

  function matchesCustomer(customer, activeCustomers){
    if(activeCustomers.length === 0) return true;
    const cust = String(customer || "").trim();
    return activeCustomers.includes(cust);
  }

  function matchesFactory(factoryCode, activeFactories){
    if(activeFactories.length === 0) return true;
    const fc = String(factoryCode || "").toLowerCase().trim();
    for(const af of activeFactories){
      if(fc.includes(af.toLowerCase())) return true;
    }
    return false;
  }

  let grid = [];
  let currentRowsForExport = []; // array de objetos ya resumidos

  function setStatus(text, cls){
    statusEl.textContent = text;
    statusEl.className = "badge " + cls;
  }

  function fillWeekSelect(weeks){
    weekSelect.innerHTML = `<option value="">Seleccione...</option>`;
    weeks.forEach(w=>{
      const opt = document.createElement("option");
      opt.value = w;
      opt.textContent = w;
      weekSelect.appendChild(opt);
    });
    weekSelect.disabled = false;
  }

  // =========================================================
  // Core: construir resumen
  // (Inspirado en tu ejemplo: filtrar por Week y usar Intento) :contentReference[oaicite:4]{index=4} :contentReference[oaicite:5]{index=5}
  // =========================================================
  function buildSummary(selectedWeek){
    const groups = new Map();
    const activeFactories = getActiveFactories();
    const activeCustomers = getActiveCustomers();

    for(const r of grid){
      if(r.Week !== selectedWeek) continue;

      const factory = r.FactoryCode || "Sin código";
      
      // Aplicar filtro de factory
      if(!matchesFactory(factory, activeFactories)) continue;
      const customer = r.Customer || "Sin cliente";
      
      // Aplicar filtro de customer
      if(!matchesCustomer(customer, activeCustomers)) continue;
      const key = factory + "|||" + customer;

      if(!groups.has(key)){
        const base = {
          FactoryCode: factory,
          Customer: customer,
          Reports: new Set(),
          LotBoxes: new Set(),
          TotalCajas: 0,
          A1: 0, A2: 0, A3: 0, A4: 0
        };
        // inicializar dinámicamente columnas de defectos si existen
        const defKeys = (window.__DEFECT_KEYS || []);
        defKeys.forEach(k => { base[k] = 0; });
        groups.set(key, base);
      }
      const g = groups.get(key);

      if(r.Report) g.Reports.add(r.Report);
      if(r.LotBox) g.LotBoxes.add(r.LotBox);
      
      g.TotalCajas += r.TotalCajas;
      // agregar dinámicamente los defectos
      const defKeys2 = (window.__DEFECT_KEYS || []);
      defKeys2.forEach(k => { g[k] = (g[k] || 0) + (r[k] || 0); });

      const att = parseAttempt(r.Intento);
      if(att === 1) g.A1++;
      else if(att === 2) g.A2++;
      else if(att === 3) g.A3++;
      else if(att === 4) g.A4++;
    }

    // pasar a array
    const out = Array.from(groups.values()).map(g=>{
      const totalReports = g.Reports.size;     // Cuenta de Nº Report (únicos)
      const TT = g.A1 + g.A2 + g.A3 + g.A4;    // total intentos
      const lotBoxCount = g.LotBoxes.size;
      // TotDef = suma de todas las columnas de defectos detectadas
      const defKeys3 = (window.__DEFECT_KEYS || []);
      const TotDef = defKeys3.reduce((acc,k)=> acc + (g[k] || 0), 0);
      const PctDef = g.TotalCajas > 0 ? Math.round((TotDef / g.TotalCajas) * 100) : 0;
      const baseOut = {
        FactoryCode: g.FactoryCode,
        Customer: g.Customer,
        LotBox: lotBoxCount,
        TotalCajas: g.TotalCajas,
        TotDef: TotDef,
        PctDef: PctDef,
        TotalReports: totalReports,
        A1: g.A1, A2: g.A2, A3: g.A3, A4: g.A4,
        TT
      };
      // agregar dinámicamente las columnas de defectos al objeto de salida
      const defKeysOut = (window.__DEFECT_KEYS || []);
      defKeysOut.forEach(k => { baseOut[k] = g[k] || 0; });
      return baseOut;
    });

    // ordenar como Excel: Factory -> Customer
    out.sort((a,b)=>{
      const fa = a.FactoryCode.localeCompare(b.FactoryCode);
      if(fa !== 0) return fa;
      return a.Customer.localeCompare(b.Customer);
    });

    return out;
  }

  function renderSummary(rows){
    // reconstruir encabezado dinámico según columnas detectadas
    const defColsForHeader = (window.__DEFECT_COLUMNS || ["Avios incorrectos","Rotulo incorrecto","Talla equivocada","Sin sticker de bolsa","Peso excedido","Objetos extraños"]);
    const theadEl = document.querySelector('#summaryTable thead');
    if(theadEl){
      // construir una sola fila de encabezado que incluirá todas las columnas
      const headCols = [];
      headCols.push('<tr>');
      headCols.push('<th style="width:12%">Factory Code</th>');
      headCols.push('<th style="width:10%">Customer</th>');
      headCols.push('<th style="width:5%">Lot Box</th>');
      headCols.push('<th style="width:5%">Total Cajas</th>');
      defColsForHeader.forEach(orig => {
        const label = displayLabelForHeader(orig);
        headCols.push('<th style="width:6%">' + String(label).replace(/</g,'&lt;') + '</th>');
      });
      headCols.push('<th style="width:5%">Tot. Def.</th>');
      headCols.push('<th style="width:5.5%">%Def.</th>');
      headCols.push('<th style="width:2.5%">A1</th>');
      headCols.push('<th style="width:2.5%">A2</th>');
      headCols.push('<th style="width:2.5%">A3</th>');
      headCols.push('<th style="width:2.5%">A4</th>');
      headCols.push('<th style="width:2.5%">TT</th>');
      headCols.push('</tr>');
      theadEl.innerHTML = headCols.join('\n');
    }

    tbody.innerHTML = "";
    currentRowsForExport = rows.slice();

    if(rows.length === 0){
      const tr = document.createElement("tr");
      tr.innerHTML = `<td colspan="18" style="padding:16px;text-align:center;color:#777">No hay datos para esa Week</td>`;
      tbody.appendChild(tr);
      btnExport.disabled = true;
      return;
    }

    // subtotales por factory
    const factories = new Map();
    rows.forEach(r=>{
      if(!factories.has(r.FactoryCode)){
        factories.set(r.FactoryCode, []);
      }
      factories.get(r.FactoryCode).push(r);
    });

    // crear objeto de totales que incluya dinámicamente defectos
    let grand = { LotBox:0, TotalCajas:0, TotDef:0, A1:0, A2:0, A3:0, A4:0, TT:0 };
    const defKeysGlobal = (window.__DEFECT_KEYS || []);
    defKeysGlobal.forEach(k => { grand[k] = 0; });

    // Ordenar factories según orden personalizado
    const sortedFactories = sortFactories(factories);

    for(const [factory, list] of sortedFactories){
      // crear subtotal con campos dinámicos
      let sub = { LotBox:0, TotalCajas:0, TotDef:0, A1:0, A2:0, A3:0, A4:0, TT:0 };
      defKeysGlobal.forEach(k => { sub[k] = 0; });

      list.forEach(r=>{
        const tr = document.createElement("tr");
        // construir columnas dinámicamente: fijas primero
        let cols = [];
        cols.push(`<td class="left">${escapeHtml(r.FactoryCode)}</td>`);
        cols.push(`<td class="left">${escapeHtml(r.Customer)}</td>`);
        cols.push(`<td>${formatCellNumber(r.LotBox)}</td>`);
        cols.push(`<td>${formatCellNumber(r.TotalCajas)}</td>`);
        // insertar todas las columnas de defectos detectadas
        defKeysGlobal.forEach(k => {
          cols.push(`<td>${formatCellNumber(r[k])}</td>`);
        });
        cols.push(`<td>${formatCellNumber(r.TotDef)}</td>`);
        cols.push(`<td>${r.PctDef}%</td>`);
        cols.push(`<td>${formatCellNumber(r.A1)}</td>`);
        cols.push(`<td>${formatCellNumber(r.A2)}</td>`);
        cols.push(`<td>${formatCellNumber(r.A3)}</td>`);
        cols.push(`<td>${formatCellNumber(r.A4)}</td>`);
        cols.push(`<td>${r.TT}</td>`);
        tr.innerHTML = cols.join('\n');
        tbody.appendChild(tr);

        sub.LotBox += r.LotBox;
        sub.TotalCajas += r.TotalCajas;
        // sumar dinámicamente defectos (acumular solo en el subtotal aquí)
        defKeysGlobal.forEach(k => { sub[k] += (r[k] || 0); sub.TotDef += (r[k] || 0); });
        sub.A1 += r.A1; sub.A2 += r.A2; sub.A3 += r.A3; sub.A4 += r.A4;
        sub.TT += r.TT;
      });

      // subtotal row
      const trSub = document.createElement("tr");
      trSub.className = "subtotal";
      const subPctDef = sub.TotalCajas > 0 ? Math.round((sub.TotDef / sub.TotalCajas) * 100) : 0;
      // construir fila subtotal dinamicamente
      let subCols = [];
      subCols.push(`<td class="left">Total ${escapeHtml(factory)}</td>`);
      subCols.push(`<td></td>`);
      subCols.push(`<td>${sub.LotBox}</td>`);
      subCols.push(`<td>${sub.TotalCajas}</td>`);
      defKeysGlobal.forEach(k => { subCols.push(`<td>${sub[k]}</td>`); });
      subCols.push(`<td>${sub.TotDef}</td>`);
      subCols.push(`<td>${subPctDef}%</td>`);
      subCols.push(`<td>${sub.A1}</td>`);
      subCols.push(`<td>${sub.A2}</td>`);
      subCols.push(`<td>${sub.A3}</td>`);
      subCols.push(`<td>${sub.A4}</td>`);
      subCols.push(`<td>${sub.TT}</td>`);
      trSub.innerHTML = subCols.join('\n');
      tbody.appendChild(trSub);

      grand.LotBox += sub.LotBox;
      grand.TotalCajas += sub.TotalCajas;
      // sumar dinámicamente todas las columnas de defectos desde el subtotal
      defKeysGlobal.forEach(k => { grand[k] = (grand[k] || 0) + (sub[k] || 0); });
      grand.TotDef += sub.TotDef;
      grand.A1 += sub.A1; grand.A2 += sub.A2; grand.A3 += sub.A3; grand.A4 += sub.A4;
      grand.TT += sub.TT;
    }

    // grand total
    const trG = document.createElement("tr");
    trG.className = "grandtotal";
    const grandPctDef = grand.TotalCajas > 0 ? Math.round((grand.TotDef / grand.TotalCajas) * 100) : 0;
    // construir fila grand total dinámicamente
    const grandCols = [];
    grandCols.push('<td class="left">Total general</td>');
    grandCols.push('<td></td>');
    grandCols.push(`<td>${grand.LotBox}</td>`);
    grandCols.push(`<td>${grand.TotalCajas}</td>`);
    defKeysGlobal.forEach(k => { grandCols.push(`<td>${grand[k] || 0}</td>`); });
    grandCols.push(`<td>${grand.TotDef}</td>`);
    grandCols.push(`<td>${grandPctDef}%</td>`);
    grandCols.push(`<td>${grand.A1}</td>`);
    grandCols.push(`<td>${grand.A2}</td>`);
    grandCols.push(`<td>${grand.A3}</td>`);
    grandCols.push(`<td>${grand.A4}</td>`);
    grandCols.push(`<td>${grand.TT}</td>`);
    trG.innerHTML = grandCols.join('\n');
    tbody.appendChild(trG);

    // fila DEFECTUOSO: combinar primeras 4 celdas y mostrar porcentajes relativos a Lot Box (0 decimales)
    (function(){
      const denom = grand.TotDef || 0;
      const pct = (n)=> {
        if(!denom) return '0.0%';
        const val = (Number(n || 0) / denom) * 100;
        if(!Number.isFinite(val)) return '0.0%';
        return (Math.round(val * 10) / 10).toFixed(1) + '%';
      };

      const trDef = document.createElement('tr');
      trDef.className = 'defectRow';
      // construir fila de porcentajes por cada columna de defecto detectada (relative a TotDef)
      const defPctCols2 = [];
      defPctCols2.push('<td class="left" colspan="4">DEFECTUOSO</td>');
      defKeysGlobal.forEach(k => { defPctCols2.push(`<td>${pct(grand[k] || 0)}</td>`); });
      defPctCols2.push(`<td>${pct(grand.TotDef)}</td>`);
      defPctCols2.push('<td>BAP</td>');
      // porcentaje de A1 relativo a TT (1 decimal)
      const pctA1Val = (grand.TT && Number.isFinite(grand.TT) && grand.TT > 0)
        ? ((Math.round(((grand.A1 || 0) / grand.TT) * 1000) / 10).toFixed(1) + '%')
        : '0.0%';
      defPctCols2.push(`<td>${pctA1Val}</td>`);
      defPctCols2.push('<td></td>');
      defPctCols2.push('<td></td>');
      defPctCols2.push('<td></td>');
      trDef.innerHTML = defPctCols2.join('\n');
      tbody.appendChild(trDef);
    })();

    btnExport.disabled = false;
  }

  // Charts removed per request

  function escapeHtml(s){
    return String(s ?? "")
      .replaceAll("&","&amp;")
      .replaceAll("<","&lt;")
      .replaceAll(">","&gt;")
      .replaceAll('"',"&quot;")
      .replaceAll("'","&#039;");
  }

  // Guarda los filtros activos (sessionStorage) y los refleja en la URL para
  // poder compartirla o recargar con F5 sin perder la selección. replaceState
  // no dispara hashchange, así que el router no vuelve a montar la vista.
  // El filtro de Customer no se persiste (se reinicia a "todos los visibles"
  // en cada repoblado por diseño del panel).
  function persistFilters(){
    const state = {
      year: yearSelect ? (yearSelect.value || '') : '',
      period: periodSelect ? (periodSelect.value || 'sem') : 'sem',
      week: weekSelect ? (weekSelect.value || '') : '',
      cofaco: !!(filterCofaco && filterCofaco.checked),
      c1: !!(filterCititex1 && filterCititex1.checked),
      c2: !!(filterCititex2 && filterCititex2.checked),
      est: !!(filterCititexEstanos && filterCititexEstanos.checked)
    };
    try{ sessionStorage.setItem(FILTERS_STORE_KEY, JSON.stringify(state)); }catch(e){}
    if(location.hash.indexOf('#/empaque') !== 0) return;
    const params = new URLSearchParams();
    if(state.year) params.set('year', state.year);
    params.set('per', state.period);
    if(state.week) params.set('w', state.week);
    if(state.cofaco) params.set('cofaco', '1');
    if(state.c1) params.set('c1', '1');
    if(state.c2) params.set('c2', '1');
    if(state.est) params.set('est', '1');
    try{ history.replaceState(null, '', '#/empaque?' + params.toString()); }catch(e){}
  }

  // Última selección: primero los parámetros de la URL (compartible), luego
  // lo guardado en la sesión.
  function readSavedFilters(){
    const qIdx = location.hash.indexOf('?');
    if(qIdx > -1 && location.hash.indexOf('#/empaque') === 0){
      const params = new URLSearchParams(location.hash.slice(qIdx + 1));
      if(params.get('year') || params.get('per') || params.get('w')){
        return {
          year: params.get('year') || '',
          period: params.get('per') === 'mes' ? 'mes' : 'sem',
          week: params.get('w') || '',
          cofaco: params.get('cofaco') === '1',
          c1: params.get('c1') === '1',
          c2: params.get('c2') === '1',
          est: params.get('est') === '1'
        };
      }
    }
    try{
      const raw = sessionStorage.getItem(FILTERS_STORE_KEY);
      if(raw) return JSON.parse(raw);
    }catch(e){}
    return null;
  }

  function hasOption(sel, value){
    if(!sel) return false;
    return Array.prototype.some.call(sel.options, o => o.value === String(value));
  }

  // Restaura la última selección de filtros; false si no había nada guardado.
  function restoreSavedFilters(){
    const saved = readSavedFilters();
    if(!saved) return false;
    try{
      if(saved.year && hasOption(yearSelect, saved.year)) yearSelect.value = saved.year;
      if(saved.period === 'sem' || saved.period === 'mes') periodSelect.value = saved.period;
      populateWeekSelectByPeriod();
      updateSwitchLabel(); // también resetea el switch Last Week/Month
      if(saved.week && hasOption(weekSelect, saved.week)) weekSelect.value = saved.week;
      filterCofaco.checked = !!saved.cofaco;
      filterCititex1.checked = !!saved.c1;
      filterCititex2.checked = !!saved.c2;
      filterCititexEstanos.checked = !!saved.est;
      populateCustomerFilter();
      onWeekChange();
    }catch(e){
      return false;
    }
    return true;
  }

  function onWeekChange(){
    persistFilters();
    const w = weekSelect.value;
    const periodType = getPeriodType();
    
    if(!w){
      renderSummary([]);
      return;
    }
    
    let rows;
    if (periodType === "mes") {
      // Filtrar por mes: buscar todos los datos que correspondan al mes seleccionado
      rows = buildSummaryByMonth(parseInt(w, 10));
    } else {
      // Filtrar por semana (comportamiento original)
      rows = buildSummary(w);
    }
    renderSummary(rows);
  }

  function buildSummaryByMonth(selectedMonth) {
    // Para filtrar por mes, mapeamos las semanas (1-52) a meses (1-12)
    // Distribución realista: 52 semanas / 12 meses ≈ 4.33 semanas por mes
    // Fórmula: estimatedMonth = Math.ceil((weekNum * 12) / 52)
    
    const groups = new Map();
    const activeFactories = getActiveFactories();
    const activeCustomers = getActiveCustomers();

    for(const r of grid){
      // Convertir Week a mes con mapeo más realista
      const weekNum = parseInt(asWeek(r.Week), 10);
      if(isNaN(weekNum)) continue;
      
      // Mapeo proporcional: distribuir 52 semanas en 12 meses
      const estimatedMonth = Math.ceil((weekNum * 12) / 52);
      if(estimatedMonth !== selectedMonth) continue;

      const factory = r.FactoryCode || "Sin código";
      
      // Aplicar filtro de factory
      if(!matchesFactory(factory, activeFactories)) continue;
      const customer = r.Customer || "Sin cliente";
      
      // Aplicar filtro de customer
      if(!matchesCustomer(customer, activeCustomers)) continue;
      const key = factory + "|||" + customer;

      if(!groups.has(key)){
        const base = {
          FactoryCode: factory,
          Customer: customer,
          Reports: new Set(),
          LotBoxes: new Set(),
          TotalCajas: 0,
          A1: 0, A2: 0, A3: 0, A4: 0
        };
        const defKeysLocal = (window.__DEFECT_KEYS || []);
        defKeysLocal.forEach(k => { base[k] = 0; });
        groups.set(key, base);
      }
      const g = groups.get(key);

      if(r.Report) g.Reports.add(r.Report);
      if(r.LotBox) g.LotBoxes.add(r.LotBox);
      
      g.TotalCajas += r.TotalCajas;
      const defKeysLocal2 = (window.__DEFECT_KEYS || []);
      defKeysLocal2.forEach(k => { g[k] = (g[k] || 0) + (r[k] || 0); });

      const att = parseAttempt(r.Intento);
      if(att === 1) g.A1++;
      else if(att === 2) g.A2++;
      else if(att === 3) g.A3++;
      else if(att === 4) g.A4++;
    }

    // pasar a array
    const out = Array.from(groups.values()).map(g=>{
      const totalReports = g.Reports.size;
      const TT = g.A1 + g.A2 + g.A3 + g.A4;
      const lotBoxCount = g.LotBoxes.size;
      const defKeysLocal3 = (window.__DEFECT_KEYS || []);
      const TotDef = defKeysLocal3.reduce((acc,k)=> acc + (g[k] || 0), 0);
      const PctDef = g.TotalCajas > 0 ? Math.round((TotDef / g.TotalCajas) * 100) : 0;
      const baseOut = {
        FactoryCode: g.FactoryCode,
        Customer: g.Customer,
        LotBox: lotBoxCount,
        TotalCajas: g.TotalCajas,
        TotDef: TotDef,
        PctDef: PctDef,
        TotalReports: totalReports,
        A1: g.A1, A2: g.A2, A3: g.A3, A4: g.A4,
        TT
      };
      defKeysLocal3.forEach(k=> { baseOut[k] = g[k] || 0; });
      return baseOut;
    });

    // ordenar como Excel: Factory -> Customer
    out.sort((a,b)=>{
      const fa = a.FactoryCode.localeCompare(b.FactoryCode);
      if(fa !== 0) return fa;
      return a.Customer.localeCompare(b.Customer);
    });

    return out;
  }

  // =========================================================
  // Export Excel (opcional)
  // =========================================================
  function exportExcel(){
    if(!currentRowsForExport || currentRowsForExport.length === 0) return;

    const w = weekSelect.value || "NA";
    // construir encabezado dinámico incluyendo defect columns si están detectadas
    const defColsExp = (window.__DEFECT_COLUMNS || ["Avios incorrectos","Rotulo incorrecto","Talla equivocada","Sin sticker de bolsa","Peso excedido","Objetos extraños"]);
    // usar etiquetas normalizadas para el encabezado del Excel también
    const defColsExpLabels = defColsExp.map(c => displayLabelForHeader(c));
    const aoa = [
      ["Week", w],
      [],
      ["Factory Code","Customer","Lot Box","Total Cajas", ...defColsExpLabels, "Tot. Def.","%Def.","A1","A2","A3","A4","TT"],
    ];

    // reconstruir con subtotales + total general
    const rows = currentRowsForExport.slice();
    const factories = new Map();
    rows.forEach(r=>{
      if(!factories.has(r.FactoryCode)) factories.set(r.FactoryCode, []);
      factories.get(r.FactoryCode).push(r);
    });

    // grand totals dinámicos (incluye columnas de defectos detectadas)
    let grand = { LotBox:0, TotalCajas:0, TotDef:0, A1:0, A2:0, A3:0, A4:0, TT:0 };
    const defKeysExpInit = (window.__DEFECT_KEYS || []);
    defKeysExpInit.forEach(k=> { grand[k] = 0; });

    for(const [factory, list] of factories.entries()){
      let sub = { LotBox:0, TotalCajas:0, TotDef:0, A1:0, A2:0, A3:0, A4:0, TT:0 };
      defKeysExpInit.forEach(k => { sub[k] = 0; });

      list.forEach(r=>{
        // construir fila con defect columns dinámicos
        const defKeysExp = (window.__DEFECT_KEYS || []);
        const defValues = defKeysExp.map(k => r[k] || 0);
        aoa.push([r.FactoryCode, r.Customer, r.LotBox, r.TotalCajas, ...defValues, r.TotDef, r.PctDef+"%", r.A1, r.A2, r.A3, r.A4, r.TT]);
        sub.LotBox+=r.LotBox; sub.TotalCajas+=r.TotalCajas; sub.TotDef+=r.TotDef;
        defKeysExp.forEach(k => { sub[k] += (r[k] || 0); });
        sub.A1+=r.A1; sub.A2+=r.A2; sub.A3+=r.A3; sub.A4+=r.A4;
        sub.TT+=r.TT;
      });
      const subPctDef = sub.TotalCajas > 0 ? Math.round((sub.TotDef / sub.TotalCajas) * 100) : 0;
      const defKeysExp2 = (window.__DEFECT_KEYS || []);
      const defRowValues = defKeysExp2.map(k => sub[k] || 0);
      aoa.push([`Total ${factory}`,"", sub.LotBox, sub.TotalCajas, ...defRowValues, sub.TotDef, subPctDef+"%", sub.A1, sub.A2, sub.A3, sub.A4, sub.TT]);

      grand.LotBox+=sub.LotBox; grand.TotalCajas+=sub.TotalCajas; grand.TotDef+=sub.TotDef;
      defKeysExpInit.forEach(k => { grand[k] += (sub[k] || 0); });
      grand.A1+=sub.A1; grand.A2+=sub.A2; grand.A3+=sub.A3; grand.A4+=sub.A4;
      grand.TT+=sub.TT;
    }
    const grandPctDef = grand.TotalCajas > 0 ? Math.round((grand.TotDef / grand.TotalCajas) * 100) : 0;
    const defKeysExp3 = (window.__DEFECT_KEYS || []);
    const grandDefVals = defKeysExp3.map(k => grand[k] || 0);
    aoa.push(["Total general","", grand.LotBox, grand.TotalCajas, ...grandDefVals, grand.TotDef, grandPctDef+"%", grand.A1, grand.A2, grand.A3, grand.A4, grand.TT]);

    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet(aoa);

    // anchos (parecido a tu formato)
    // ajustar ancho de columnas para incluir dinámicamente columnas de defectos
    const defCount = (window.__DEFECT_COLUMNS || []).length;
    const baseCols = [ {wch:16},{wch:22},{wch:12},{wch:6} ];
    for(let i=0;i<defCount;i++) baseCols.push({wch:8});
    baseCols.push({wch:8},{wch:6},{wch:3},{wch:3},{wch:3},{wch:3},{wch:3});
    ws["!cols"] = baseCols;

    XLSX.utils.book_append_sheet(wb, ws, "tabla resultado");
    XLSX.writeFile(wb, `Cuadro_resumen_week_${w}.xlsx`);
  }

  // =========================================================
  // Chart modal: funciones simples para mostrar tendencias
  // =========================================================
  let trendsChartRef = null;

  function getLastWeeksTotals(limit = 6, factory = 'all', selectedCustomers = [], weeksList = null){
    // Determine weeks to use: if weeksList provided use it, otherwise derive last `limit` weeks from `grid` data
    let weeksToUse = [];
    if(Array.isArray(weeksList) && weeksList.length){
      weeksToUse = weeksList.slice();
    } else {
      const weeks = Array.from(new Set((grid || []).map(r => asWeek(r.Week)).filter(Boolean)));
      weeks.sort((a,b)=>{ const na=parseInt(a,10), nb=parseInt(b,10); if(!Number.isNaN(na) && !Number.isNaN(nb)) return na-nb; return String(a).localeCompare(String(b)); });
      if(weeks.length === 0){
        // fallback static if no data
        weeksToUse = ['46','47','48','49','50','51'].slice(-limit);
      } else {
        weeksToUse = weeks.slice(Math.max(0, weeks.length - limit));
      }
    }

    const defectKeys = window.__DEFECT_KEYS || [];
    const out = [];

    weeksToUse.forEach(weekNum => {
      let totDef = 0;
      let totalCajas = 0;
      let intentoOnes = 0;
      let intentoAny = 0;

      for(const r of grid){
        const w = asWeek(r.Week);
        if(String(w) !== String(weekNum)) continue;
        // aplicar factory filter
        if(factory && factory !== 'all'){
          if(!String(r.FactoryCode || '').toLowerCase().includes(String(factory).toLowerCase())) continue;
        }
        // aplicar customer filter si hay seleccionado
        if(Array.isArray(selectedCustomers) && selectedCustomers.length){
          if(!selectedCustomers.includes(String(r.Customer || ''))) continue;
        }

        defectKeys.forEach(k => { totDef += Number(r[k] || 0); });
        totalCajas += Number(r.TotalCajas || 0);

        const att = parseAttempt(r.Intento);
        if(att !== null && att !== undefined){ intentoAny++; }
        if(att === 1) intentoOnes++;
      }

      const bap = intentoAny > 0 ? Math.round((intentoOnes / intentoAny) * 100) : 0; // entero
      const pctDef = totalCajas > 0 ? Math.round((totDef / totalCajas) * 10000) / 100 : 0; // 2 decimales

      out.push({ week: weekNum, bap: bap, pctDef: pctDef, totDef, totalCajas });
    });

    return out;
  }

  function createTrendsChart(data){
    const ctx = document.getElementById('trendsChart').getContext('2d');
    if(trendsChartRef){ try{ trendsChartRef.destroy(); }catch(e){} }

    // Preparar arrays
    const labels = data.map(d => 'SEM' + d.week);
    const bapValues = data.map(d => d.bap);
    const defectValues = data.map(d => d.pctDef);

    // Calcular máximo para eje de defectos (izquierdo)
    const maxDefectValue = defectValues.length ? Math.max(...defectValues) : 0;
    const yAxisMax = Math.ceil(maxDefectValue * 1.2);

    // Registrar plugin de datalabels si está disponible
    try{ if(window.Chart && window.ChartDataLabels){ Chart.register(ChartDataLabels); } }catch(e){}

    trendsChartRef = new Chart(ctx, {
      type: 'bar',
      plugins: (window.Chart && window.ChartDataLabels) ? [ChartDataLabels] : [],
      data: {
        labels: labels,
        datasets: [
          {
            label: '% Defectuosos',
            data: defectValues,
            borderColor: '#FF6B6B',
            backgroundColor: 'rgba(255, 107, 107, 0.1)',
            borderWidth: 3,
            fill: false,
            tension: 0.1,
            pointBackgroundColor: '#FF6B6B',
            pointBorderColor: '#FF6B6B',
            pointBorderWidth: 2,
            pointRadius: 6,
            pointHoverRadius: 8,
            type: 'line',
            yAxisID: 'y',
            order: 1
          },
          {
            label: 'BAP (%)',
            data: bapValues,
            backgroundColor: 'rgba(74, 144, 226, 0.8)',
            borderColor: '#4A90E2',
            borderWidth: 2,
            type: 'bar',
            yAxisID: 'y1',
            order: 2
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: true, position: 'bottom' },
          tooltip: {
            mode: 'index',
            intersect: false,
            callbacks: {
              label: function(context){
                if(context.datasetIndex === 0){
                  return `${context.dataset.label}: ${context.parsed.y.toFixed(2)}%`;
                } else {
                  return `${context.dataset.label}: ${context.parsed.y}%`;
                }
              }
            }
          },
          datalabels: {
            display: true,
            color: function(context){ return context.datasetIndex === 0 ? '#000000' : '#003d82'; },
            font: { family: 'Calibri', size: 16, weight: 'bold' },
            formatter: function(value, context){
              if(context.datasetIndex === 0) return value.toFixed(2) + '%';
              return value + '%';
            },
            anchor: function(context){ return 'end'; },
            align: function(context){ return context.datasetIndex === 0 ? 'bottom' : 'top'; },
            offset: 8
          }
        },
        scales: {
          x: {
            title: { display: true, text: 'Semanas', font: { size: 14, weight: 'bold' } },
            grid: { display: true, color: 'rgba(0,0,0,0.1)' }
          },
          y: {
            type: 'linear', display: true, position: 'left',
            title: { display: true, text: '% Defectuosos', font: { size: 14, weight: 'bold' } },
            beginAtZero: true, max: yAxisMax,
            grid: { display: true, color: 'rgba(0,0,0,0.1)' },
            ticks: { callback: function(value){ return value.toFixed(2) + '%'; } }
          },
          y1: {
            type: 'linear', display: true, position: 'right',
            title: { display: true, text: 'BAP (%)', font: { size: 14, weight: 'bold' } },
            beginAtZero: true, max: 110,
            grid: { drawOnChartArea: false },
            ticks: { callback: function(value){ return value + '%'; } }
          }
        },
        interaction: { mode: 'nearest', axis: 'x', intersect: false },
        elements: { point: { hoverRadius: 10 } }
      }
    });
  }

  function populateChartFilters(){
    // poblar factory select con factories únicos
    const factories = Array.from(new Set(grid.map(r=> r.FactoryCode).filter(Boolean))).sort();
    chartFactoryFilter.innerHTML = '<option value="all">Todos</option>' + factories.map(f=> `<option value="${escapeHtml(f)}">${escapeHtml(f)}</option>`).join('');
    // poblar customers en modal usando el mismo estilo del dropdown principal
    const customers = Array.from(new Set(grid.map(r=> r.Customer).filter(Boolean))).sort();
    modalSelectedCustomers = new Set(customers); // seleccionar todos por defecto
    if(chartCustomerDropdown){
      chartCustomerDropdown.innerHTML = '';
      customers.forEach(customer => {
        const option = document.createElement('div');
        option.className = 'customer-option';

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = `chart_customer_${customer.replace(/\s+/g, '_')}`;
        checkbox.checked = true;
        checkbox.dataset.customer = customer;

        const label = document.createElement('label');
        label.textContent = customer;
        label.htmlFor = checkbox.id;

        checkbox.addEventListener('change', function(){
          if(this.checked) modalSelectedCustomers.add(customer);
          else modalSelectedCustomers.delete(customer);
          updateChartCustomerLabel();
          updateChartFromModal();
        });

        option.appendChild(checkbox);
        option.appendChild(label);
        chartCustomerDropdown.appendChild(option);
      });
    }

    // populate modal week selects (Desde/Hasta)
    try{ populateModalWeekFilters(); }catch(e){}
    // update modal customer label and wire button
    try{ updateChartCustomerLabel(); }catch(e){}
    if(chartCustomerBtn){
      chartCustomerBtn.addEventListener('click', function(ev){ ev.stopPropagation(); chartCustomerDropdown.classList.toggle('show'); });
    }
    // click outside to close modal dropdown
    // Handler en App para no acumular un listener de document por montaje (leak).
    if (App._empChartDropClose) document.removeEventListener('click', App._empChartDropClose);
    App._empChartDropClose = function(e){ if(chartCustomerDropdown && !chartCustomerBtn.contains(e.target) && !chartCustomerDropdown.contains(e.target)) chartCustomerDropdown.classList.remove('show'); };
    document.addEventListener('click', App._empChartDropClose);
  }

  function updateChartCustomerLabel(){
    if(!chartCustomerDropdown || !chartCustomerLabel) return;
    const total = chartCustomerDropdown.querySelectorAll('input[type="checkbox"]').length;
    const selected = modalSelectedCustomers.size;
    if(selected === 0) chartCustomerLabel.textContent = 'Ninguno seleccionado';
    else if(selected === total) chartCustomerLabel.textContent = 'Todos los Customers';
    else chartCustomerLabel.textContent = `${selected} de ${total} Customers`;
  }

  function populateModalWeekFilters(){
    const weeks = Array.from(new Set((grid || []).map(r=> asWeek(r.Week)).filter(Boolean)));
    weeks.sort((a,b)=>{ const na=parseInt(a,10), nb=parseInt(b,10); if(!Number.isNaN(na) && !Number.isNaN(nb)) return na-nb; return String(a).localeCompare(String(b)); });

    const fromSel = document.getElementById('weekFromFilter');
    const toSel = document.getElementById('weekToFilter');
    if(!fromSel || !toSel) return;

    fromSel.innerHTML = '';
    toSel.innerHTML = '';

    weeks.forEach(w => {
      const opt1 = document.createElement('option'); opt1.value = w; opt1.textContent = 'SEM' + w; fromSel.appendChild(opt1);
      const opt2 = document.createElement('option'); opt2.value = w; opt2.textContent = 'SEM' + w; toSel.appendChild(opt2);
    });

    // Default: last `limit` weeks (5 previous + current = 6)
    const limit = 6;
    if(weeks.length){
      const lastIdx = weeks.length - 1;
      const fromIdx = Math.max(0, weeks.length - limit);
      fromSel.value = weeks[fromIdx];
      toSel.value = weeks[lastIdx];
    }

    // wire change handlers to update chart
    fromSel.addEventListener('change', updateChartFromModal);
    toSel.addEventListener('change', updateChartFromModal);
  }

  function showChartModal(){
    populateChartFilters();
    // Determine initial weeks from modal controls if present
    const fromEl = document.getElementById('weekFromFilter');
    const toEl = document.getElementById('weekToFilter');
    let weeksList = null;
    if(fromEl && toEl && fromEl.value && toEl.value){
      const opts = Array.from(fromEl.parentElement.querySelectorAll('#' + fromEl.id + ' option')).map(o=>o.value);
      const si = opts.indexOf(fromEl.value), ei = opts.indexOf(toEl.value);
      if(si >= 0 && ei >= 0){ const s = Math.min(si, ei), e = Math.max(si, ei); weeksList = opts.slice(s, e+1); }
    }
    const selectedCustomersList = Array.from(modalSelectedCustomers || []);
    const data = getLastWeeksTotals(6, 'all', selectedCustomersList, weeksList);
    if(!data || data.length === 0){
      // mostrar mensaje simple si no hay datos
      const ctx = document.getElementById('trendsChart').getContext('2d');
      if(trendsChartRef){ try{ trendsChartRef.destroy(); }catch(e){} }
      ctx.clearRect(0,0,ctx.canvas.width, ctx.canvas.height);
      chartModal.style.display = 'block';
      return;
    }
    createTrendsChart(data);
    chartModal.style.display = 'block';
  }

  function hideChartModal(){
    chartModal.style.display = 'none';
  }

  if(btnChart){
    btnChart.addEventListener('click', function(){ showChartModal(); });
  }
  if(closeChartModal){ closeChartModal.addEventListener('click', hideChartModal); }
  // click fuera del modal para cerrar
  // Cerrar modal al clicar fuera. Handler guardado en App para quitar el del
  // montaje anterior (antes se acumulaba un listener de window por visita).
  if (App._empModalWinClick) window.removeEventListener('click', App._empModalWinClick);
  App._empModalWinClick = function(e){ if(e.target === chartModal) hideChartModal(); };
  window.addEventListener('click', App._empModalWinClick);

  // actualizar gráfica cuando cambian filtros dentro del modal
  function updateChartFromModal(){
    const factory = chartFactoryFilter ? chartFactoryFilter.value || 'all' : 'all';
    const selectedCustomers = Array.from(modalSelectedCustomers || []);
    // Respect Desde/Hasta in modal if present
    const fromEl = document.getElementById('weekFromFilter');
    const toEl = document.getElementById('weekToFilter');
    let weeksList = null;
    if(fromEl && toEl && fromEl.value && toEl.value){
      // build inclusive list from 'from' to 'to' based on available options order
      const options = Array.from(fromEl.parentElement.querySelectorAll('#' + fromEl.id + ' option')).map(o=>o.value);
      const start = options.indexOf(fromEl.value);
      const end = options.indexOf(toEl.value);
      if(start >= 0 && end >= 0){
        const s = Math.min(start, end), e = Math.max(start, end);
        weeksList = options.slice(s, e+1);
      }
    }

    const limit = 6;
    const data = getLastWeeksTotals(limit, factory, selectedCustomers, weeksList);
    createTrendsChart(data);
  }

  if(chartFactoryFilter) chartFactoryFilter.addEventListener('change', updateChartFromModal);

  // =========================================================
  // INIT: cargar datos
  // =========================================================
  // `forceReload`: el click del botón ⟳ pasa el Event (truthy) y fuerza la
  // recarga; la carga inicial (__ready) llama sin argumentos y usa el caché.
  async function init(forceReload){
    const cacheValido = !forceReload && _dataCache.rows && (Date.now() - _dataCache.loadedAt) < DATA_TTL_MS;

    setStatus("Cargando datos desde Google Sheets…", "loading");
    weekSelect.disabled = true;
    if(btnRefresh) btnRefresh.disabled = true;
    btnExport.disabled = true;

    try{
      const raw = cacheValido ? _dataCache.rows : await loadSheetJSONP(SHEET_ID, SHEET_NAME);
      if(!cacheValido) _dataCache = { rows: raw, loadedAt: Date.now() };

      // Detectar dinámicamente columnas de defectos entre "Total Cajas" y "Tot. Def." en la hoja
      const headers = raw && raw.length ? Object.keys(raw[0]) : [];
      const idxTotalCajas = headers.findIndex(h => /total\s*cajas|totalboxes|total boxes/i.test(String(h)));
      const idxTotDef = headers.findIndex(h => /tot\.?\s*def|totdef|total\s*defect/i.test(String(h)));
      let defectColumns = [];
      if (idxTotalCajas >= 0 && idxTotDef > idxTotalCajas) {
        defectColumns = headers.slice(idxTotalCajas + 1, idxTotDef).map(h => String(h).trim()).filter(Boolean);
        // Excluir columnas que no son defectos reales: encabezados que empiezan con '%' (ej. %Auditoria)
        // y columnas relacionadas con muestreo/cajas muestreadas.
        defectColumns = defectColumns.filter(h => {
          if (!h) return false;
          const s = String(h).trim().toLowerCase();
          // excluir cualquier columna que empiece con '%' (p. ej. '%Auditoria')
          if (s.startsWith('%')) return false;
          // excluir columnas que indiquen 'muestra'/'muestreo' relacionadas con caja
          if ((s.includes('muestr') || s.includes('muest')) && (s.includes('caja') || s.includes('cja'))) return false;
          return true;
        });
      } else {
        // fallback a las columnas más comunes si no se detecta el rango
        defectColumns = ["Avios incorrectos","Rotulo incorrecto","Talla equivocada","Sin sticker de bolsa","Peso excedido","Objetos extraños"];
      }

      // normalizar nombres a propiedades seguras
      const defectKeys = defectColumns.map(h => h.replace(/\s+/g,'_').replace(/[^\w]/g,''));

      // Mapear fila y agregar dinámicamente columnas de defectos
      grid = raw.map(row=>{
        const Week = asWeek(getField(row, ["Week","WEEK","Semana"]));
        const FactoryCode = asText(getField(row, ["Factory Code","FactoryCode","Factory"]));
        const Customer = asText(getField(row, ["Customer","CUSTOMER","Cliente"]));
        const Result = asText(getField(row, ["Result","RESULT","Resultado"]));
        const Intento = asText(getField(row, ["Intento","Intent","Attempt","AttemptNo","Attempt #"]));
        const Report = asText(getField(row, ["Nº Report","N° Report","No Report","Report","Report No","N Report"]));
        const LotBox = asText(getField(row, ["Lot Box","LotBox","Lote"]));
        const TotalCajas = parseFloat(getField(row, ["Total Cajas","TotalCajas","Total Boxes"])) || 0;

        const out = { Week, FactoryCode, Customer, Result, Intento, Report, LotBox, TotalCajas };

        // extraer dinámicamente cada columna de defecto
        defectColumns.forEach((colName, i) => {
          const key = defectKeys[i] || colName.replace(/\s+/g,'_').replace(/[^\w]/g,'');
          out[key] = parseFloat(getField(row, [colName])) || 0;
        });

        return out;
      });

      // Guardar en scope global para usar al renderizar
      window.__DEFECT_COLUMNS = defectColumns;
      window.__DEFECT_KEYS = defectKeys;

      const weeks = Array.from(new Set(grid.map(r=>r.Week).filter(Boolean)));
      weeks.sort((a,b)=>{
        const na = parseInt(a,10), nb = parseInt(b,10);
        if(!Number.isNaN(na) && !Number.isNaN(nb)) return na - nb;
        return a.localeCompare(b);
      });

      // Inicializar los nuevos filtros
      populateYearSelect();
      populatePeriodSelect();
      updateSwitchLabel();
      populateWeekSelectByPeriod(); // ya selecciona la semana actual (o última disponible ≤52)

      if(weeks.length){
        // Restaurar la última selección de filtros; si no hay o ya no es
        // válida, se queda el default recién aplicado (semana actual/última).
        if(!restoreSavedFilters()){
          populateCustomerFilter();
          onWeekChange();
        }
      }else{
        renderSummary([]);
      }

      setStatus("Datos ✓", "success");
      if(btnRefresh) btnRefresh.disabled = false;
      if(btnChart) {
        btnChart.disabled = false;
        try{ populateChartFilters(); }catch(e){}
      }

    }catch(err){
      console.error(err);
      setStatus("Error: " + err.message, "error");
      tbody.innerHTML = `<tr><td colspan="18" style="padding:16px;text-align:center;color:#b00020">
        No se pudo cargar el GRID. Verifica: (1) Sheet público, (2) hoja se llama "GRID".
      </td></tr>`;
    }
  }

  // Last Week/Month switch handler
  lastWeekSwitch.addEventListener("change", function(){
    const periodType = getPeriodType();
    const weeks = Array.from(weekSelect.options).map(o => o.value).filter(Boolean);
    
    if(this.checked){
      if (periodType === "mes") {
        // Seleccionar mes anterior
        const currentMonth = parseInt(weekSelect.value, 10);
        const prevMonth = currentMonth > 1 ? currentMonth - 1 : 12;
        weekSelect.value = prevMonth;
      } else {
        // Seleccionar semana anterior
        if(weeks.length > 1){
          weekSelect.value = weeks[weeks.length - 2];
        }
      }
    } else {
      if (periodType === "mes") {
        // Seleccionar mes actual
        const currentMonth = getCurrentMonth();
        weekSelect.value = currentMonth;
      } else {
        // Seleccionar semana actual
        if(weeks.length){
          weekSelect.value = weeks[weeks.length - 1];
        }
      }
    }
    populateCustomerFilter();
    onWeekChange();
  });

  // Year y Period Select handlers
  yearSelect.addEventListener("change", function(){
    populateWeekSelectByPeriod();
    updateSwitchLabel();
    populateCustomerFilter();
    onWeekChange();
  });

  periodSelect.addEventListener("change", function(){
    populateWeekSelectByPeriod();
    updateSwitchLabel();
    populateCustomerFilter();
    onWeekChange();
  });

  weekSelect.addEventListener("change", function(){
    lastWeekSwitch.checked = false; // reset switch al cambiar manual
    populateCustomerFilter();
    onWeekChange();
  });

  // Factory filters handlers
  filterCofaco.addEventListener("change", function(){
    populateCustomerFilter();
    onWeekChange();
  });
  filterCititex1.addEventListener("change", function(){
    populateCustomerFilter();
    onWeekChange();
  });
  filterCititex2.addEventListener("change", function(){
    populateCustomerFilter();
    onWeekChange();
  });
  filterCititexEstanos.addEventListener("change", function(){
    populateCustomerFilter();
    onWeekChange();
  });

  // Customer filter handlers
  function populateCustomerFilter(){
    const selectedWeek = weekSelect.value;
    const activeFactories = getActiveFactories();
    const periodType = getPeriodType();

    // Filtrar solo los customers que están en los datos visibles
    const visibleCustomers = new Set();
    for(const r of grid){
      // Si hay un filtro de semana/mes seleccionado, aplicarlo correctamente
      if(selectedWeek){
        if(periodType === 'mes'){
          const weekNum = parseInt(asWeek(r.Week), 10);
          if(isNaN(weekNum)) continue;
          const estimatedMonth = Math.ceil((weekNum * 12) / 52);
          if(estimatedMonth !== parseInt(selectedWeek, 10)) continue;
        } else {
          // periodo por semana (comportamiento original)
          if(r.Week !== selectedWeek) continue;
        }
      }

      if(!matchesFactory(r.FactoryCode, activeFactories)) continue;
      if(r.Customer) visibleCustomers.add(r.Customer);
    }

    const customers = Array.from(visibleCustomers);
    customers.sort();

    // Mantener solo los customers que aún están visibles (seleccionar por defecto los nuevos)
    const newSelectedCustomers = new Set();
    customers.forEach(c => {
      newSelectedCustomers.add(c);
    });
    selectedCustomers = newSelectedCustomers;

    customerDropdown.innerHTML = '';
    customers.forEach(customer => {
      const option = document.createElement('div');
      option.className = 'customer-option';

      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.id = `customer_${customer.replace(/\s+/g, '_')}`;
      checkbox.checked = selectedCustomers.has(customer);
      checkbox.dataset.customer = customer;

      const label = document.createElement('label');
      label.textContent = customer;
      label.htmlFor = checkbox.id;

      checkbox.addEventListener('change', function(){
        if(this.checked){
          selectedCustomers.add(customer);
        } else {
          selectedCustomers.delete(customer);
        }
        updateCustomerFilterLabel();
        onWeekChange();
      });

      option.appendChild(checkbox);
      option.appendChild(label);
      customerDropdown.appendChild(option);
    });

    updateCustomerFilterLabel();
  }

  function updateCustomerFilterLabel(){
    const total = customerDropdown.querySelectorAll('input[type="checkbox"]').length;
    const selected = selectedCustomers.size;
    
    if(selected === 0){
      customerFilterLabel.textContent = 'Ninguno seleccionado';
    } else if(selected === total){
      customerFilterLabel.textContent = 'Todos los Customers';
    } else {
      customerFilterLabel.textContent = `${selected} de ${total} Customers`;
    }
  }

  if(customerFilterBtn){
    customerFilterBtn.addEventListener('click', function(e){
      e.stopPropagation();
      customerDropdown.classList.toggle('show');
    });
  }

  // Backup handler: ensure chart modal customer button also has a safe click toggle
  if(typeof chartCustomerBtn !== 'undefined' && chartCustomerBtn){
    chartCustomerBtn.addEventListener('click', function(e){
      e.stopPropagation();
      if(chartCustomerDropdown) chartCustomerDropdown.classList.toggle('show');
    });
  }

  // Cerrar dropdown al hacer click fuera. Handler guardado en App para quitar
  // el del montaje anterior (antes se acumulaba uno por visita).
  if (App._empCustDropClose) document.removeEventListener('click', App._empCustDropClose);
  App._empCustDropClose = function(e){
    if(!customerFilterBtn.contains(e.target) && !customerDropdown.contains(e.target)){
      customerDropdown.classList.remove('show');
    }
  };
  document.addEventListener('click', App._empCustDropClose);

  // (listener de weekSelect duplicado eliminado: ya está conectado más arriba;
  // ejecutaba populateCustomerFilter + onWeekChange dos veces por cambio)

  if(btnRefresh) btnRefresh.addEventListener("click", init);
  btnExport.addEventListener("click", exportExcel);

  __ready(init);

        // ===== Fin del script original =====

        // Exponer en window las funciones usadas por handlers inline (si las hay)
        [].forEach(function (__n) { try { window[__n] = eval(__n); } catch (__e) {} });
    }

    App.registerView('empaque', { title: 'Resultado Auditoria Empaque', mount: mount });
})();
