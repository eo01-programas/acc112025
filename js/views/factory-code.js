/* ============================================================
   views/factory-code.js - Vista "Resumen de Auditoria por Factory Code" (SPA)
   Migrado desde RESUMEN DE AUDITOR�A POR FACTORY CODE.html. Logica y marcado originales: el <script> se
   ejecuta dentro de mount() (tras inyectar el template) para que el
   DOM exista, igual que cuando el <script> estaba al final del body.
   Arranques diferidos (DOMContentLoaded / ready) -> ejecucion inmediata.
   ============================================================ */
(function () {
    var TEMPLATE = "    \u003cdiv id=\"error-banner\" role=\"alert\" aria-live=\"assertive\"\u003e\u003c/div\u003e\r\n    \r\n    \u003cdiv class=\"container\"\u003e\r\n        \u003cdiv class=\"header\"\u003e\r\n            \u003ch1\u003eRESUMEN DE AUDITOR�A POR FACTORY CODE\u003c/h1\u003e\r\n            \u003ca href=\"#/\" class=\"back-btn-h1\" title=\"Inicio\"\u003e??\u003c/a\u003e\r\n        \u003c/div\u003e\r\n\r\n        \u003cdiv class=\"controls\"\u003e\r\n            \u003cdiv class=\"controls-left\"\u003e\r\n                \u003c!-- Estado de carga: trasladado al lado derecho (junto a Gr�ficos) para mostrar como badge --\u003e\r\n                \r\n                \u003cdiv class=\"labelframe\" id=\"weekFieldset\"\u003e\r\n                    \u003cspan class=\"labelframe-title\"\u003eWeek:\u003c/span\u003e\r\n                    \u003cdiv class=\"labelframe-content\"\u003e\r\n                        \u003cselect id=\"yearSelect\" disabled\u003e\r\n                            \u003coption value=\"\"\u003eA�o\u003c/option\u003e\r\n                        \u003c/select\u003e\r\n                        \u003cselect id=\"periodSelect\"\u003e\r\n                            \u003coption value=\"Sem\"\u003eSem\u003c/option\u003e\r\n                            \u003coption value=\"Mes\"\u003eMes\u003c/option\u003e\r\n                        \u003c/select\u003e\r\n                        \u003cselect id=\"weekSelect\" disabled\u003e\r\n                            \u003coption value=\"\"\u003eSeleccione...\u003c/option\u003e\r\n                        \u003c/select\u003e\r\n                        \u003cdiv class=\"switch-container\"\u003e\r\n                            \u003clabel class=\"switch\"\u003e\r\n                                \u003cinput type=\"checkbox\" id=\"lastWeekToggle\"\u003e\r\n                                \u003cspan class=\"slider\"\u003e\u003c/span\u003e\r\n                            \u003c/label\u003e\r\n                            \u003cspan class=\"switch-label\"\u003eLast Week\u003c/span\u003e\r\n                        \u003c/div\u003e\r\n                    \u003c/div\u003e\r\n                \u003c/div\u003e\r\n\r\n                \u003cdiv class=\"labelframe\"\u003e\r\n                    \u003cspan class=\"labelframe-title\"\u003eFactory Filters:\u003c/span\u003e\r\n                    \u003cdiv class=\"labelframe-content\"\u003e\r\n                        \u003cdiv class=\"switch-container\"\u003e\r\n                            \u003clabel class=\"switch\"\u003e\r\n                                \u003cinput type=\"checkbox\" id=\"cofacoToggle\"\u003e\r\n                                \u003cspan class=\"slider\"\u003e\u003c/span\u003e\r\n                            \u003c/label\u003e\r\n                            \u003cspan class=\"switch-label\"\u003eCofaco\u003c/span\u003e\r\n                        \u003c/div\u003e\r\n                        \u003cdiv class=\"switch-container\"\u003e\r\n                            \u003clabel class=\"switch\"\u003e\r\n                                \u003cinput type=\"checkbox\" id=\"cititex1Toggle\"\u003e\r\n                                \u003cspan class=\"slider\"\u003e\u003c/span\u003e\r\n                            \u003c/label\u003e\r\n                            \u003cspan class=\"switch-label\"\u003eCititex 1\u003c/span\u003e\r\n                        \u003c/div\u003e\r\n                        \u003cdiv class=\"switch-container\"\u003e\r\n                            \u003clabel class=\"switch\"\u003e\r\n                                \u003cinput type=\"checkbox\" id=\"cititex2Toggle\"\u003e\r\n                                \u003cspan class=\"slider\"\u003e\u003c/span\u003e\r\n                            \u003c/label\u003e\r\n                            \u003cspan class=\"switch-label\"\u003eCititex 2\u003c/span\u003e\r\n                        \u003c/div\u003e\r\n                    \u003c/div\u003e\r\n                \u003c/div\u003e\r\n\r\n                \u003cdiv class=\"labelframe\"\u003e\r\n                    \u003cspan class=\"labelframe-title\"\u003eCustomer Filter:\u003c/span\u003e\r\n                    \u003cdiv class=\"labelframe-content\"\u003e\r\n                        \u003cselect id=\"customerFilter\" disabled\u003e\r\n                            \u003coption value=\"\"\u003eTodos los Customers\u003c/option\u003e\r\n                        \u003c/select\u003e\r\n                    \u003c/div\u003e\r\n                \u003c/div\u003e\r\n            \u003c/div\u003e\r\n            \r\n                \u003cdiv class=\"buttons-container\"\u003e\r\n                \u003cbutton id=\"btnDownload\" class=\"btn-download\" disabled\u003eDescargar Excel\u003c/button\u003e\r\n                \u003cbutton id=\"btnChart\" class=\"btn-chart\" disabled\u003e?? Gr�ficos\u003c/button\u003e\r\n                \u003cspan id=\"loadingStatus\" class=\"badge loading\" style=\"margin-left:12px\"\u003eCargando datos desde Google Sheets...\u003c/span\u003e\r\n            \u003c/div\u003e\r\n        \u003c/div\u003e\r\n\r\n        \u003c!-- Modal para la gr�fica --\u003e\r\n        \u003cdiv id=\"chartModal\" class=\"modal\"\u003e\r\n            \u003cdiv class=\"modal-content\"\u003e\r\n                \u003cspan class=\"close\" id=\"closeModal\"\u003e\u0026times;\u003c/span\u003e\r\n                \u003ch2\u003ePerformance Auditorias Producto Terminado Internas\u003c/h2\u003e\r\n                \r\n                \u003c!-- L�nea separadora --\u003e\r\n                \u003chr style=\"margin: 15px 0; border: none; border-top: 2px solid #ddd; width: 100%;\"\u003e\r\n                \r\n                \u003c!-- Controles de filtrado con marco verde --\u003e\r\n                \u003cdiv style=\"background-color: #e8f5e8; border: 2px solid #90c695; border-radius: 8px; padding: 8px; margin-bottom: 10px;\"\u003e\r\n                    \u003cdiv style=\"text-align: center; display: flex; gap: 15px; justify-content: center; align-items: center; flex-wrap: nowrap;\"\u003e\r\n                        \u003cdiv\u003e\r\n                            \u003clabel for=\"chartCustomerFilter\" style=\"font-weight: bold; margin-right: 8px;\"\u003eCustomer:\u003c/label\u003e\r\n                            \u003cselect id=\"chartCustomerFilter\" style=\"padding: 6px 8px; border: 2px solid #ddd; border-radius: 6px; font-size: 12px; width: 220px;\"\u003e\r\n                                \u003coption value=\"\"\u003eTodos los Customers\u003c/option\u003e\r\n                            \u003c/select\u003e\r\n                        \u003c/div\u003e\r\n\r\n                        \u003cdiv\u003e\r\n                            \u003clabel for=\"factoryFilter\" style=\"font-weight: bold; margin-right: 8px;\"\u003eFactory Code:\u003c/label\u003e\r\n                            \u003cselect id=\"factoryFilter\" style=\"padding: 8px 12px; border: 2px solid #ddd; border-radius: 6px; font-size: 14px; min-width: 180px;\"\u003e\r\n                                \u003coption value=\"all\"\u003eTodos los Factory Codes\u003c/option\u003e\r\n                            \u003c/select\u003e\r\n                        \u003c/div\u003e\r\n                        \r\n                        \u003cdiv\u003e\r\n                            \u003clabel for=\"weekFromFilter\" style=\"font-weight: bold; margin-right: 8px;\"\u003eDesde:\u003c/label\u003e\r\n                            \u003cselect id=\"weekFromFilter\" style=\"padding: 8px 12px; border: 2px solid #ddd; border-radius: 6px; font-size: 14px; min-width: 100px;\"\u003e\r\n                            \u003c/select\u003e\r\n                        \u003c/div\u003e\r\n                        \r\n                        \u003cdiv\u003e\r\n                            \u003clabel for=\"weekToFilter\" style=\"font-weight: bold; margin-right: 8px;\"\u003eHasta:\u003c/label\u003e\r\n                            \u003cselect id=\"weekToFilter\" style=\"padding: 8px 12px; border: 2px solid #ddd; border-radius: 6px; font-size: 14px; min-width: 100px;\"\u003e\r\n                            \u003c/select\u003e\r\n                        \u003c/div\u003e\r\n                    \u003c/div\u003e\r\n                \u003c/div\u003e\r\n                \r\n                \u003cdiv class=\"chart-container\"\u003e\r\n                    \u003ccanvas id=\"trendsChart\"\u003e\u003c/canvas\u003e\r\n                \u003c/div\u003e\r\n            \u003c/div\u003e\r\n        \u003c/div\u003e\r\n\r\n        \u003cdiv id=\"tablesContainer\" class=\"hidden\"\u003e\r\n            \u003cdiv class=\"table-section\"\u003e\r\n                \u003ch2\u003eINTERNA\u003c/h2\u003e\r\n                \u003cdiv class=\"table-wrapper scaled-wrapper\"\u003e\r\n                    \u003ctable id=\"internaTable\"\u003e\r\n                        \u003ccolgroup\u003e\u003c/colgroup\u003e\r\n                        \u003cthead\u003e\r\n                            \u003ctr\u003e\r\n                                \u003cth\u003eFactory Code\u003c/th\u003e\r\n                                \u003cth\u003eCustomer\u003c/th\u003e\r\n                                \u003cth\u003eLot Size\u003c/th\u003e\r\n                                \u003cth\u003eSample Size\u003c/th\u003e\r\n                                \u003cth\u003eTot. Def.\u003c/th\u003e\r\n                                \u003cth\u003eFabric\u003c/th\u003e\r\n                                \u003cth\u003eUntrimmed threads End\u003c/th\u003e\r\n                                \u003cth\u003eEmbellisment\u003c/th\u003e\r\n                                \u003cth\u003eHole\u003c/th\u003e\r\n                                \u003cth\u003eBroken/skip stitches\u003c/th\u003e\r\n                                \u003cth\u003eColor Shading\u003c/th\u003e\r\n                                \u003cth\u003ePuckering/Excessive Fullness\u003c/th\u003e\r\n                                \u003cth\u003eCleaness\u003c/th\u003e\r\n                                \u003cth\u003eAsymmetrical\u003c/th\u003e\r\n                                \u003cth\u003ePin\u003c/th\u003e\r\n                                \u003cth\u003eWrong Hangtas\u003c/th\u003e\r\n                                \u003cth\u003eAssorment\u003c/th\u003e\r\n                                \u003cth\u003eShipping Marks\u003c/th\u003e\r\n                                \u003cth\u003eOthers\u003c/th\u003e\r\n                                \u003cth\u003eMeas.\u003c/th\u003e\r\n                                \u003cth\u003eCuenta de N� Report\u003c/th\u003e\r\n                                \u003cth\u003eA1\u003c/th\u003e\r\n                                \u003cth\u003eA2\u003c/th\u003e\r\n                                \u003cth\u003eA3\u003c/th\u003e\r\n                                \u003cth\u003eA4\u003c/th\u003e\r\n                            \u003c/tr\u003e\r\n                        \u003c/thead\u003e\r\n                        \u003ctbody id=\"internaBody\"\u003e\r\n                        \u003c/tbody\u003e\r\n                    \u003c/table\u003e\r\n                \u003c/div\u003e\r\n            \u003c/div\u003e\r\n\r\n            \u003cdiv class=\"table-section\"\u003e\r\n                \u003ch2\u003eCLIENTE\u003c/h2\u003e\r\n                \u003cdiv class=\"table-wrapper scaled-wrapper\"\u003e\r\n                    \u003ctable id=\"clienteTable\"\u003e\r\n                        \u003ccolgroup\u003e\u003c/colgroup\u003e\r\n                        \u003cthead\u003e\r\n                            \u003ctr\u003e\r\n                                \u003cth\u003eFactory Code\u003c/th\u003e\r\n                                \u003cth\u003eCustomer\u003c/th\u003e\r\n                                \u003cth\u003eLot Size\u003c/th\u003e\r\n                                \u003cth\u003eSample Size\u003c/th\u003e\r\n                                \u003cth\u003eTot. Def.\u003c/th\u003e\r\n                                \u003cth\u003eFabric\u003c/th\u003e\r\n                                \u003cth\u003eUntrimmed threads End\u003c/th\u003e\r\n                                \u003cth\u003eEmbellisment\u003c/th\u003e\r\n                                \u003cth\u003eHole\u003c/th\u003e\r\n                                \u003cth\u003eBroken/skip stitches\u003c/th\u003e\r\n                                \u003cth\u003eColor Shading\u003c/th\u003e\r\n                                \u003cth\u003ePuckering/Excessive Fullness\u003c/th\u003e\r\n                                \u003cth\u003eCleaness\u003c/th\u003e\r\n                                \u003cth\u003eAsymmetrical\u003c/th\u003e\r\n                                \u003cth\u003ePin\u003c/th\u003e\r\n                                \u003cth\u003eWrong Hangtas\u003c/th\u003e\r\n                                \u003cth\u003eAssorment\u003c/th\u003e\r\n                                \u003cth\u003eShipping Marks\u003c/th\u003e\r\n                                \u003cth\u003eOthers\u003c/th\u003e\r\n                                \u003cth\u003eMeas.\u003c/th\u003e\r\n                                \u003cth\u003eCuenta de N� Report\u003c/th\u003e\r\n                            \u003c/tr\u003e\r\n                        \u003c/thead\u003e\r\n                        \u003ctbody id=\"clienteBody\"\u003e\r\n                        \u003c/tbody\u003e\r\n                    \u003c/table\u003e\r\n                \u003c/div\u003e\r\n            \u003c/div\u003e\r\n        \u003c/div\u003e\r\n\r\n        \u003cdiv id=\"noDataMessage\" class=\"no-data hidden\"\u003e\r\n            No hay datos para esta Week\r\n        \u003c/div\u003e\r\n    \u003c/div\u003e\r\n";

    // Single source of truth for report column widths.
    // Percentages preserve the current proportions and baseWidthPx keeps the
    // original overall footprint so the table still looks like the current design.
    var FACTORY_CODE_TABLE_LAYOUTS = {
        interna: {
            baseWidthPx: 1660,
            columns: [
                { label: 'Factory Code', widthPct: 6 },
                { label: 'Customer', widthPct: 7 },
                { label: 'Lot Size', widthPct: 5 },
                { label: 'Sample Size', widthPct: 6 },
                { label: 'Tot. Def.', widthPct: 5 },
                { label: 'Fabric', widthPct: 5 },
                { label: 'Untrimmed threads End', widthPct: 5 },
                { label: 'Embellisment', widthPct: 5 },
                { label: 'Hole', widthPct: 5 },
                { label: 'Broken/skip stitches', widthPct: 5 },
                { label: 'Color Shading', widthPct: 5 },
                { label: 'Puckering/Excessive Fullness', widthPct: 5 },
                { label: 'Cleaness', widthPct: 5 },
                { label: 'Asymmetrical', widthPct: 5 },
                { label: 'Pin', widthPct: 5 },
                { label: 'Wrong Hangtas', widthPct: 5 },
                { label: 'Assorment', widthPct: 5 },
                { label: 'Shipping Marks', widthPct: 5 },
                { label: 'Others', widthPct: 5 },
                { label: 'Meas.', widthPct: 5 },
                { label: 'Cuenta de N Report', widthPct: 5 },
                { label: 'A1', widthPct: 3 },
                { label: 'A2', widthPct: 3 },
                { label: 'A3', widthPct: 3 },
                { label: 'A4', widthPct: 3 }
            ]
        },
        cliente: {
            baseWidthPx: 1520,
            columns: [
                { label: 'Factory Code', widthPct: 6 },
                { label: 'Customer', widthPct: 7 },
                { label: 'Lot Size', widthPct: 5 },
                { label: 'Sample Size', widthPct: 6 },
                { label: 'Tot. Def.', widthPct: 5 },
                { label: 'Fabric', widthPct: 5 },
                { label: 'Untrimmed threads End', widthPct: 5 },
                { label: 'Embellisment', widthPct: 5 },
                { label: 'Hole', widthPct: 5 },
                { label: 'Broken/skip stitches', widthPct: 5 },
                { label: 'Color Shading', widthPct: 5 },
                { label: 'Puckering/Excessive Fullness', widthPct: 5 },
                { label: 'Cleaness', widthPct: 5 },
                { label: 'Asymmetrical', widthPct: 5 },
                { label: 'Pin', widthPct: 5 },
                { label: 'Wrong Hangtas', widthPct: 5 },
                { label: 'Assorment', widthPct: 5 },
                { label: 'Shipping Marks', widthPct: 5 },
                { label: 'Others', widthPct: 5 },
                { label: 'Meas.', widthPct: 5 },
                { label: 'Cuenta de N Report', widthPct: 5 }
            ]
        }
    };

    function buildFactoryCodeColgroup(columns) {
        var colgroup = document.createElement('colgroup');
        columns.forEach(function (column) {
            var col = document.createElement('col');
            col.style.width = column.widthPct + '%';
            col.setAttribute('data-column-name', column.label);
            col.setAttribute('data-width-pct', String(column.widthPct));
            colgroup.appendChild(col);
        });
        return colgroup;
    }

    function applyFactoryCodeTableLayout(root, tableId, layoutKey) {
        var table = root.querySelector('#' + tableId);
        var layout = FACTORY_CODE_TABLE_LAYOUTS[layoutKey];
        if (!table || !layout) return;

        var existingColgroup = table.querySelector('colgroup');
        if (existingColgroup) existingColgroup.remove();
        table.insertBefore(buildFactoryCodeColgroup(layout.columns), table.firstChild);

        table.style.width = layout.baseWidthPx + 'px';
        table.style.minWidth = layout.baseWidthPx + 'px';
        table.style.maxWidth = 'none';
        table.setAttribute('data-column-layout', layoutKey);
    }

    function applyFactoryCodeTableLayouts(root) {
        applyFactoryCodeTableLayout(root, 'internaTable', 'interna');
        applyFactoryCodeTableLayout(root, 'clienteTable', 'cliente');
    }

    function normalizeFactoryCodeTemplateText(root) {
        var heading = root.querySelector('.header h1');
        if (heading) heading.textContent = 'AUDITORIAS POR FACTORY';

        Array.prototype.forEach.call(root.querySelectorAll('.labelframe-title'), function (title) {
            if (/factory\s*filters/i.test(title.textContent || '')) {
                title.textContent = 'Factory:';
            }
            if (/customer\s*filter/i.test(title.textContent || '')) {
                title.textContent = 'Customer:';
            }
        });

        var yearPlaceholder = root.querySelector('#yearSelect option[value=""]');
        if (yearPlaceholder) yearPlaceholder.textContent = 'Año';

        Array.prototype.forEach.call(
            root.querySelectorAll('#internaTable th, #clienteTable th'),
            function (cell) {
                if (/Cuenta de N/i.test(cell.textContent || '')) {
                    cell.textContent = 'Cuenta de Nº Report';
                }
            }
        );
    }

    function mount(root) {
        root.innerHTML = TEMPLATE;
        normalizeFactoryCodeTemplateText(root);
        applyFactoryCodeTableLayouts(root);
        // Bot�n Inicio: �cono de casa en blanco (SVG, mismo estilo del resto de la app).
        var _homeBtn = root.querySelector('.back-btn-h1');
        if (_homeBtn) _homeBtn.innerHTML = "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor'><path d='M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z'/></svg>";
        // Factory Code: llevar filtros y botones al header (igual que Empaque). Excel y
        // Gr�ficos pasan a circulares a la izquierda de Inicio; t�tulo en dos l�neas.
        function _iconBtnFC(sel, svg, bg, bgHover, title) {
            var b = root.querySelector(sel);
            if (!b) return;
            b.innerHTML = svg;
            if (title) b.title = title;
            b.style.width = '40px'; b.style.height = '40px'; b.style.minWidth = '40px';
            b.style.padding = '0'; b.style.borderRadius = '50%'; b.style.margin = '0';
            b.style.display = 'inline-flex'; b.style.alignItems = 'center'; b.style.justifyContent = 'center';
            b.style.border = 'none'; b.style.boxShadow = '0 2px 8px rgba(47,59,47,.22)'; b.style.background = bg;
            b.addEventListener('mouseenter', function () { if (!b.disabled) b.style.background = bgHover; });
            b.addEventListener('mouseleave', function () { b.style.background = bg; });
        }
        var _svgDownFC = "<svg width='20' height='20' viewBox='0 0 24 24' fill='#fff'><path d='M5 20h14v-2H5v2zM19 9h-4V3H9v6H5l7 7 7-7z'/></svg>";
        var _svgBarsFC = "<svg width='20' height='20' viewBox='0 0 24 24' fill='#fff'><rect x='3' y='11' width='4' height='9' rx='1'/><rect x='10' y='6' width='4' height='14' rx='1'/><rect x='17' y='3' width='4' height='17' rx='1'/></svg>";
        _iconBtnFC('#btnDownload', _svgDownFC, 'var(--btn-excel-bg, #f78e6d)', 'var(--btn-excel-bg-hover, #d1603e)', 'Descargar Excel');
        _iconBtnFC('#btnChart', _svgBarsFC, 'var(--btn-chart-bg, #29b6f6)', 'var(--btn-chart-bg-hover, #0d47a1)', 'Gr�ficos');
        var _hdrFC = root.querySelector('.header');
        var _ctrlFC = root.querySelector('.controls');
        if (_hdrFC && _ctrlFC && _homeBtn) {
            while (_ctrlFC.firstElementChild) { _hdrFC.insertBefore(_ctrlFC.firstElementChild, _homeBtn); }
            _ctrlFC.remove();
            _hdrFC.style.display = 'flex'; _hdrFC.style.alignItems = 'center';
            _hdrFC.style.flexWrap = 'wrap'; _hdrFC.style.gap = '6px 10px';
            var _h1FC = _hdrFC.querySelector('h1');
            if (_h1FC) {
                _h1FC.textContent = 'AUDITORIAS POR FACTORY';
                _h1FC.style.fontSize = '26px'; _h1FC.style.whiteSpace = 'nowrap';
                _h1FC.style.lineHeight = '1.1'; _h1FC.style.letterSpacing = '0.03em'; _h1FC.style.margin = '0';
            }
        }
        // Bloque "Week:" m�s angosto: "Last Week"/"Last Month" en 2 l�neas (por ancho, as�
        // sobrevive a cambios de texto) y selects m�s peque�os. Ayuda a que los 3 botones
        // entren en la misma l�nea.
        var _wfFC = root.querySelector('#weekFieldset');
        if (_wfFC) {
            Array.prototype.forEach.call(_wfFC.querySelectorAll('.switch-label'), function (el) {
                if (/last\s*(week|month)/i.test((el.textContent || '').trim())) {
                    el.style.whiteSpace = 'normal'; el.style.lineHeight = '1.05';
                    el.style.textAlign = 'center'; el.style.display = 'inline-block'; el.style.maxWidth = '34px';
                }
            });
            Array.prototype.forEach.call(_wfFC.querySelectorAll('select'), function (s) {
                s.style.width = 'auto'; s.style.maxWidth = '74px'; s.style.padding = '4px 4px'; s.style.fontSize = '11px';
            });
        }
        // Reducir m�s para que los 3 botones entren en la misma l�nea.
        if (_hdrFC) { _hdrFC.style.gap = '4px 8px'; }
        Array.prototype.forEach.call(root.querySelectorAll('.labelframe'), function (lf) {
            var t = lf.querySelector('.labelframe-title');
            if (!t || !/factory/i.test(t.textContent || '')) return;
            Array.prototype.forEach.call(lf.querySelectorAll('.switch'), function (sw) {
                sw.style.transform = 'scale(0.9)'; sw.style.transformOrigin = 'center'; sw.style.margin = '0 -2px';
            });
            var c = lf.querySelector('.labelframe-content');
            if (c) c.style.gap = '3px';
            lf.style.paddingLeft = '6px'; lf.style.paddingRight = '6px';
        });
        // Agrupar Excel + Gr�ficos + Inicio para que se mantengan juntos (sin separarse).
        var _bcFC = root.querySelector('.buttons-container');
        if (_bcFC && _homeBtn) { _bcFC.style.flexWrap = 'nowrap'; _bcFC.appendChild(_homeBtn); }
        // Customer Filter: dropdown estilo Excel (bot�n compacto + popup con checkboxes).
        // Reemplaza Select2; ancho fijo que no crece al cargar opciones.
        (function () {
            var _sel = root.querySelector('#customerFilter');
            if (!_sel) return;
            _sel.style.display = 'none';
            _sel.setAttribute('multiple', 'multiple');

            var _wrap = document.createElement('div');
            _wrap.id = 'custFilterWrap';
            _wrap.style.cssText = 'position:relative;display:inline-block;vertical-align:middle;';

            var _btn = document.createElement('button');
            _btn.type = 'button';
            _btn.id = 'custFilterBtn';
            _btn.style.cssText = 'width:96px;height:28px;padding:0 6px;font-size:11px;border:1px solid #bbb;border-radius:4px;background:#fff;cursor:pointer;display:flex;align-items:center;justify-content:space-between;gap:4px;outline:none;box-sizing:border-box;';

            var _txt = document.createElement('span');
            _txt.style.cssText = 'overflow:hidden;text-overflow:ellipsis;white-space:nowrap;flex:1;text-align:left;color:#999;';
            _txt.textContent = 'Seleccione';

            var _arr = document.createElement('span');
            _arr.style.cssText = 'font-size:8px;color:#888;flex-shrink:0;';
            _arr.textContent = '?';

            _btn.appendChild(_txt); _btn.appendChild(_arr);

            var _drop = document.createElement('div');
            _drop.style.cssText = 'display:none;position:absolute;top:calc(100% + 2px);left:0;z-index:9999;background:#fff;border:1px solid #ccc;border-radius:4px;box-shadow:0 4px 16px rgba(0,0,0,.18);min-width:140px;max-height:220px;overflow-y:auto;';

            var _vals = [];

            function _updateBtn() {
                if (_vals.length === 0) { _txt.textContent = 'Seleccione'; _txt.style.color = '#999'; }
                else if (_vals.length === 1) { _txt.textContent = _vals[0]; _txt.style.color = '#222'; }
                else { _txt.textContent = _vals.length + ' selec.'; _txt.style.color = '#222'; }
            }

            function _syncSel() {
                Array.prototype.forEach.call(_sel.options, function (o) { o.selected = _vals.indexOf(o.value) > -1; });
                try { handleFactoryFilterToggle(); } catch (e) {}
            }

            function _mkRow(label, isAll) {
                var lbl = document.createElement('label');
                lbl.style.cssText = 'display:flex;align-items:center;gap:7px;padding:5px 10px;cursor:pointer;font-size:11px;' + (isAll ? 'border-bottom:1px solid #eee;font-weight:600;' : '');
                lbl.addEventListener('mouseenter', function () { lbl.style.background = '#f0f7f0'; });
                lbl.addEventListener('mouseleave', function () { lbl.style.background = ''; });
                var chk = document.createElement('input'); chk.type = 'checkbox';
                chk.style.cssText = 'cursor:pointer;accent-color:var(--sc8-primary,#4caf50);flex-shrink:0;';
                lbl.appendChild(chk); lbl.appendChild(document.createTextNode(label));
                return { lbl: lbl, chk: chk };
            }

            function _buildList() {
                _drop.innerHTML = '';
                var allR = _mkRow('(Todos)', true);
                allR.chk.checked = _vals.length === 0;
                allR.chk.addEventListener('change', function () {
                    _vals = []; _buildList(); _updateBtn(); _syncSel();
                });
                _drop.appendChild(allR.lbl);

                Array.prototype.forEach.call(_sel.options, function (o) {
                    var r = _mkRow(o.textContent, false);
                    r.chk.value = o.value;
                    r.chk.checked = _vals.indexOf(o.value) > -1;
                    r.chk.addEventListener('change', function () {
                        if (r.chk.checked) { if (_vals.indexOf(o.value) === -1) _vals.push(o.value); }
                        else { _vals = _vals.filter(function (v) { return v !== o.value; }); }
                        _buildList(); _updateBtn(); _syncSel();
                    });
                    _drop.appendChild(r.lbl);
                });
            }

            _btn.addEventListener('click', function (e) {
                e.stopPropagation();
                if (_drop.style.display === 'none') { _buildList(); _drop.style.display = 'block'; }
                else { _drop.style.display = 'none'; }
            });
            document.addEventListener('click', function () { _drop.style.display = 'none'; });
            _drop.addEventListener('click', function (e) { e.stopPropagation(); });

            _wrap.appendChild(_btn); _wrap.appendChild(_drop);
            _sel.parentNode.insertBefore(_wrap, _sel);

            // Cuando populateCustomerFilter agrega opciones al <select>, filtrar _vals y actualizar bot�n.
            var _rebTimer = null;
            new MutationObserver(function () {
                clearTimeout(_rebTimer);
                _rebTimer = setTimeout(function () {
                    _vals = _vals.filter(function (v) {
                        return Array.prototype.some.call(_sel.options, function (o) { return o.value === v; });
                    });
                    _updateBtn();
                }, 60);
            }).observe(_sel, { childList: true });
        })();
        var __ready = function (fn) { if (typeof fn === 'function') fn(); };

        // ===== Script original del panel (relocado a mount) =====
        // Google Sheets configuration
        // INSTRUCTIONS:
        // 1. Make sure your Google Sheet is publicly accessible (Share > Anyone with the link can view)
        // 2. Update SHEET_NAME below to match the exact tab name in your Google Sheet
        // 3. Ensure your sheet has the same column structure as the original Excel file
        const SHEET_ID = '1nEvl2vlYNC2SVOYTRXuij-0duWZ_Aw3NqyP-8Zi5raA';
        const SHEET_NAME = 'GRID'; // Change this to match your sheet tab name

        let gridData = [];
        let allWeeks = [];

        const weekSelect = document.getElementById('weekSelect');
        const yearSelect = document.getElementById('yearSelect');
        const periodSelect = document.getElementById('periodSelect');
        const tablesContainer = document.getElementById('tablesContainer');
        const noDataMessage = document.getElementById('noDataMessage');
        const internaBody = document.getElementById('internaBody');
        const clienteBody = document.getElementById('clienteBody');
        const btnDownload = document.getElementById('btnDownload');
        const btnChart = document.getElementById('btnChart');
        const lastWeekToggle = document.getElementById('lastWeekToggle');
        const cititex1Toggle = document.getElementById('cititex1Toggle');
        const cititex2Toggle = document.getElementById('cititex2Toggle');
        const cofacoToggle = document.getElementById('cofacoToggle');
        const customerFilter = document.getElementById('customerFilter');
        const loadingStatus = document.getElementById('loadingStatus');
        const errorBanner = document.getElementById('error-banner');
        const chartModal = document.getElementById('chartModal');
        const closeModal = document.getElementById('closeModal');
        const factoryFilter = document.getElementById('factoryFilter');
        const chartCustomerFilter = document.getElementById('chartCustomerFilter');
        const weekFromFilter = document.getElementById('weekFromFilter');
        const weekToFilter = document.getElementById('weekToFilter');

        let currentInternaData = [];
        let currentClienteData = [];
        let prevWeekSelection = null; // guarda la semana activa antes de activar "Last Week"

        // Helpers para manejar la columna 'Audit Date'
        function parseDateFromString(s) {
            if (!s) return null;
            s = String(s).trim();
            
            // Detectar y parsear formato Google Sheets GVIZ: Date(yyyy,m,d)
            const gvizMatch = s.match(/^Date\((\d{4}),(\d{1,2}),(\d{1,2})\)$/);
            if (gvizMatch) {
                const year = parseInt(gvizMatch[1], 10);
                const month = parseInt(gvizMatch[2], 10); // 0-based (0=Jan) o 1-based?
                const day = parseInt(gvizMatch[3], 10);
                // Asumir que Google Sheets GVIZ usa 0-based month (0=January)
                return new Date(year, month, day);
            }
            
            // Intentar Date.parse (puede resolver ISO strings)
            const d = new Date(s);
            if (!isNaN(d.getTime())) return d;
            
            // Intentar formatos comunes con '/': ASUME mm/dd/yyyy por defecto (Google Sheets US)
            if (s.indexOf('/') !== -1) {
                const parts = s.split('/').map(p => p.trim());
                if (parts.length === 3) {
                    // Asumir mm/dd/yyyy (Google Sheets default US format)
                    let month = parseInt(parts[0], 10);
                    let day = parseInt(parts[1], 10);
                    let year = parseInt(parts[2], 10);
                    
                    // Validar: si mes > 12, intercambiar (era dd/mm/yyyy)
                    if (month > 12 && day <= 12) {
                        const temp = day;
                        day = month;
                        month = temp;
                    } else if (day > 12 && month <= 12) {
                        // day > 12 y month <= 12 => ya es dd/mm/yyyy, mantener como est�
                    } else if (day > 31 || month > 31) {
                        return null;
                    }

                    if (year < 100) year += 2000;
                    return new Date(year, month - 1, day);
                }
            }
            
            // Intentar con '-' (yyyy-mm-dd)
            if (s.indexOf('-') !== -1) {
                const parts = s.split('-').map(p => p.trim());
                if (parts.length === 3) {
                    // Si primer parte tiene 4 d�gitos => yyyy-mm-dd
                    if (parts[0].length === 4) {
                        const y = parseInt(parts[0], 10);
                        const m = parseInt(parts[1], 10);
                        const d2 = parseInt(parts[2], 10);
                        return new Date(y, m - 1, d2);
                    }
                }
            }
            return null;
        }

        function getISOWeek(d) {
            // Copy date so don't modify original
            const date = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
            // Set to nearest Thursday: current date + 4 - current day number
            const dayNum = date.getUTCDay() || 7;
            date.setUTCDate(date.getUTCDate() + 4 - dayNum);
            const yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
            const weekNo = Math.ceil((((date - yearStart) / 86400000) + 1) / 7);
            return weekNo;
        }

        function monthNameES(m) {
            const names = ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'];
            return names[m];
        }

        function populateYearSelect() {
            const years = new Set();
            if (!gridData || gridData.length === 0) {
                if (yearSelect) yearSelect.disabled = true;
                return;
            }
            gridData.forEach(row => {
                const ad = row['Audit Date'];
                const dt = parseDateFromString(ad);
                if (!dt) return;
                years.add(String(dt.getFullYear()));
            });

            const arr = Array.from(years).map(y=>parseInt(y,10)).filter(n=>!isNaN(n)).sort((a,b)=>a-b).map(n=>String(n));
            if (!yearSelect) return;
            yearSelect.innerHTML = '<option value="">A�o</option>';
            arr.forEach(y => {
                const opt = document.createElement('option');
                opt.value = y;
                opt.textContent = y;
                yearSelect.appendChild(opt);
            });
            yearSelect.disabled = (arr.length === 0);
        }

        // Cargar datos de ejemplo localmente para depuraci�n
        function loadSampleData() {
            const today = new Date(2025,11,13); // 13 Dec 2025 (context)
            const isoWeek = getISOWeek(today);
            const sample = [
                { 'Week': String(isoWeek), 'Audit Date': '12/13/2025', 'Customer': 'Banana', 'Lot Size': '1000', 'Sample Size': '50', 'Tot. Def.': '2', 'Intento': '1', 'Validez': 'Interna', 'Factory Code': 'Cititex 1' },
                { 'Week': '49', 'Audit Date': '12/4/2025', 'Customer': 'Lululemon', 'Lot Size': '8020', 'Sample Size': '200', 'Tot. Def.': '16', 'Intento': '2', 'Validez': 'Interna', 'Factory Code': 'Cofaco' },
                { 'Week': '49', 'Audit Date': '12/5/2025', 'Customer': 'Skechers', 'Lot Size': '309', 'Sample Size': '50', 'Tot. Def.': '1', 'Intento': '1', 'Validez': 'Cliente', 'Factory Code': 'Cititex 2' }
            ];
            try {
                processSheetData(sample);
                updateLoadingStatus('Datos de prueba cargados <span class="check">?</span>', 'success');
            } catch (e) {
                console.error('Error al cargar datos de prueba', e);
                showError('No se pudieron cargar los datos de prueba. Ver consola.');
            }
        }

        // Helper: obtener lista de customers seleccionados (compatibilidad Select2 y select m�ltiple nativo)
        function getSelectedCustomers() {
            try {
                if (window.jQuery && $('#customerFilter').data('select2')) {
                    const val = $('#customerFilter').val() || [];
                    return val.filter(v => v !== null && v !== undefined && String(v).trim() !== '');
                }
            } catch (e) {
                // ignore
            }
            return Array.from(customerFilter.selectedOptions || [])
                .map(o => o.value)
                .filter(v => v !== null && v !== undefined && String(v).trim() !== '');
        }

        // Helper para el modal de gr�fica (chartCustomerFilter)
        function getSelectedChartCustomers() {
            const el = document.getElementById('chartCustomerFilter');
            if (!el) return [];
            return Array.from(el.selectedOptions || []).map(o => o.value).filter(v => v !== null && v !== undefined && String(v).trim() !== '');
        }

        // Customer del modal de gr�fica: dropdown estilo Excel (bot�n + popup con
        // checkboxes), igual que #customerFilter en el panel principal.
        (function () {
            var _sel = document.getElementById('chartCustomerFilter');
            if (!_sel) return;
            _sel.style.display = 'none';
            _sel.setAttribute('multiple', 'multiple');

            var _wrap = document.createElement('div');
            _wrap.id = 'chartCustFilterWrap';
            _wrap.style.cssText = 'position:relative;display:inline-block;vertical-align:middle;';

            var _btn = document.createElement('button');
            _btn.type = 'button';
            _btn.id = 'chartCustFilterBtn';
            _btn.style.cssText = 'width:220px;height:32px;padding:0 10px;font-size:12px;border:2px solid #ddd;border-radius:6px;background:#fff;cursor:pointer;display:flex;align-items:center;justify-content:space-between;gap:6px;outline:none;box-sizing:border-box;';

            var _txt = document.createElement('span');
            _txt.style.cssText = 'overflow:hidden;text-overflow:ellipsis;white-space:nowrap;flex:1;text-align:left;color:#999;';
            _txt.textContent = 'Todos los Customers';

            var _arr = document.createElement('span');
            _arr.style.cssText = 'font-size:9px;color:#888;flex-shrink:0;';
            _arr.textContent = '▼';

            _btn.appendChild(_txt); _btn.appendChild(_arr);

            var _drop = document.createElement('div');
            _drop.style.cssText = 'display:none;position:absolute;top:calc(100% + 2px);left:0;z-index:10000;background:#fff;border:1px solid #ccc;border-radius:4px;box-shadow:0 4px 16px rgba(0,0,0,.18);min-width:220px;max-height:260px;overflow-y:auto;text-align:left;';

            var _vals = [];

            function _updateBtn() {
                if (_vals.length === 0) { _txt.textContent = 'Todos los Customers'; _txt.style.color = '#999'; }
                else if (_vals.length === 1) { _txt.textContent = _vals[0]; _txt.style.color = '#222'; }
                else { _txt.textContent = _vals.length + ' seleccionados'; _txt.style.color = '#222'; }
            }

            function _syncSel() {
                Array.prototype.forEach.call(_sel.options, function (o) {
                    o.selected = o.value !== '' && _vals.indexOf(o.value) > -1;
                });
                try { updateChartWithFilter(); } catch (e) {}
            }

            function _mkRow(label, isAll) {
                var lbl = document.createElement('label');
                lbl.style.cssText = 'display:flex;align-items:center;gap:7px;padding:5px 10px;cursor:pointer;font-size:12px;font-weight:normal;margin:0;' + (isAll ? 'border-bottom:1px solid #eee;font-weight:600;' : '');
                lbl.addEventListener('mouseenter', function () { lbl.style.background = '#f0f7f0'; });
                lbl.addEventListener('mouseleave', function () { lbl.style.background = ''; });
                var chk = document.createElement('input'); chk.type = 'checkbox';
                chk.style.cssText = 'cursor:pointer;accent-color:var(--sc8-primary,#4caf50);flex-shrink:0;';
                lbl.appendChild(chk); lbl.appendChild(document.createTextNode(label));
                return { lbl: lbl, chk: chk };
            }

            function _buildList() {
                _drop.innerHTML = '';
                var allR = _mkRow('(Todos)', true);
                allR.chk.checked = _vals.length === 0;
                allR.chk.addEventListener('change', function () {
                    _vals = []; _buildList(); _updateBtn(); _syncSel();
                });
                _drop.appendChild(allR.lbl);

                Array.prototype.forEach.call(_sel.options, function (o) {
                    if (o.value === '') return; // opci�n placeholder "Todos los Customers"
                    var r = _mkRow(o.textContent, false);
                    r.chk.value = o.value;
                    r.chk.checked = _vals.indexOf(o.value) > -1;
                    r.chk.addEventListener('change', function () {
                        if (r.chk.checked) { if (_vals.indexOf(o.value) === -1) _vals.push(o.value); }
                        else { _vals = _vals.filter(function (v) { return v !== o.value; }); }
                        _buildList(); _updateBtn(); _syncSel();
                    });
                    _drop.appendChild(r.lbl);
                });
            }

            _btn.addEventListener('click', function (e) {
                e.stopPropagation();
                if (_drop.style.display === 'none') { _buildList(); _drop.style.display = 'block'; }
                else { _drop.style.display = 'none'; }
            });
            document.addEventListener('click', function () { _drop.style.display = 'none'; });
            _drop.addEventListener('click', function (e) { e.stopPropagation(); });

            _wrap.appendChild(_btn); _wrap.appendChild(_drop);
            _sel.parentNode.insertBefore(_wrap, _sel);

            // Al repoblar las opciones del <select> se pierden los flags selected:
            // depurar _vals, restaurarlos y refrescar el bot�n. Se expone en el
            // elemento para que populateChartCustomerFilter pueda llamarlo en s�ncrono.
            _sel._syncFromVals = function () {
                _vals = _vals.filter(function (v) {
                    return Array.prototype.some.call(_sel.options, function (o) { return o.value === v; });
                });
                Array.prototype.forEach.call(_sel.options, function (o) {
                    o.selected = o.value !== '' && _vals.indexOf(o.value) > -1;
                });
                _updateBtn();
            };

            var _rebTimer = null;
            new MutationObserver(function () {
                clearTimeout(_rebTimer);
                _rebTimer = setTimeout(function () { _sel._syncFromVals(); }, 60);
            }).observe(_sel, { childList: true });
        })();

        weekSelect.addEventListener('change', handleWeekChange);
        if (yearSelect) yearSelect.addEventListener('change', function() { 
            populateWeekSelect();
            // Si populate estableci� una semana/mes, actualizar tablas autom�ticamente
            try { if (weekSelect && weekSelect.value) handleWeekChange(); } catch(e) {}
        });
        if (periodSelect) periodSelect.addEventListener('change', function() { 
            populateWeekSelect();
            // Ajustar y actualizar tablas seg�n la nueva selecci�n de periodo
            try { if (weekSelect && weekSelect.value) handleWeekChange(); } catch(e) {}
        });
        const btnSampleData = document.getElementById('btnSampleData');
        if (btnSampleData) btnSampleData.addEventListener('click', loadSampleData);
        btnDownload.addEventListener('click', downloadExcel);
        btnChart.addEventListener('click', showTrendsChart);
        lastWeekToggle.addEventListener('change', handleLastWeekToggle);
        cititex1Toggle.addEventListener('change', handleFactoryFilterToggle);
        cititex2Toggle.addEventListener('change', handleFactoryFilterToggle);
        cofacoToggle.addEventListener('change', handleFactoryFilterToggle);
        customerFilter.addEventListener('change', handleFactoryFilterToggle);
        closeModal.addEventListener('click', hideModal);
        factoryFilter.addEventListener('change', updateChartWithFilter);
        if (chartCustomerFilter) chartCustomerFilter.addEventListener('change', updateChartWithFilter);
        weekFromFilter.addEventListener('change', updateChartWithFilter);
        weekToFilter.addEventListener('change', updateChartWithFilter);
        
        // Cerrar modal al hacer click fuera de �l
        window.addEventListener('click', function(event) {
            if (event.target === chartModal) {
                hideModal();
            }
        });

        // Google Sheets helper functions
        // Descarga de datos GViz: la l�gica vive en js/lib/sheets.js (App.lib.sheets).
        // Se conservan estos wrappers (mismo nombre) para no tocar el resto del panel.
        function gvizToObjects(resp) {
            return App.lib.sheets.gvizToObjects(resp);
        }

        function loadSheetJSONP(sheetId, sheetName) {
            return App.lib.sheets.loadSheetJSONP(sheetId, sheetName);
        }

        function showError(msg) {
            errorBanner.textContent = msg;
            errorBanner.style.display = 'block';
            setTimeout(() => {
                errorBanner.style.display = 'none';
            }, 10000);
        }

        function updateLoadingStatus(status, className) {
            // Use innerHTML so callers can pass simple HTML (e.g. a check mark span)
            loadingStatus.innerHTML = status;
            // Preserve the 'badge' base class so the pill-style is kept when changing state
            loadingStatus.className = 'badge ' + className;

            if (className === 'success') {
                btnDownload.disabled = false;
                btnChart.disabled = false;
            }
        }

        function formatNumber(n) {
            if (n === '' || n === null || n === undefined) return '';
            const num = Number(n) || 0;
            return num.toLocaleString('es-PE', { maximumFractionDigits: 0 });
        }

        function processSheetData(jsonData) {
            gridData = jsonData.map(row => {
                    // Funci�n helper para obtener valor num�rico
                    const getNum = (key) => {
                        const val = row[key];
                        if (val === '' || val === null || val === undefined) return 0;
                        const num = parseFloat(val);
                        return isNaN(num) ? 0 : num;
                    };

                    // Funci�n helper para obtener valor de texto
                    const getStr = (key) => {
                        const val = row[key];
                        return val ? val.toString().trim() : '';
                    };

                    return {
                        Week: getStr('Week'),
                        'Audit Date': getStr('Audit Date'),
                        Customer: getStr('Customer'),
                        AQL: getStr('AQL'),
                        'N� Report': getStr('N� Report'),
                        OP: getStr('OP'),
                        Style: getStr('Style'),
                        Season: getStr('Season'),
                        'Lot # P.O. #': getStr('Lot # P.O. #'),
                        'Color/ID': getStr('Color/ID'),
                        'Lot Size': getNum('Lot Size'),
                        'Sample Size': getNum('Sample Size'),
                        Acceptance: getStr('Acceptance'),
                        Fabric: getNum('Fabric'),
                        'Untrimmed threads End': getNum('Untrimmed threads End'),
                        Embellisment: getNum('Embellisment'),
                        Hole: getNum('Hole'),
                        'Broken/skip stitches': getNum('Broken/skip stitches'),
                        'Color Shading': getNum('Color Shading'),
                        'Puckering/Excessive Fullness': getNum('Puckering/Excessive Fullness'),
                        Cleaness: getNum('Cleaness'),
                        Asymmetrical: getNum('Asymmetrical'),
                        Pin: getNum('Pin'),
                        'Wrong Hangtas': getNum('Wrong Hangtas'),
                        Assorment: getNum('Assorment'),
                        'Shipping Marks': getNum('Shipping Marks'),
                        Others: getNum('Others'),
                        'Meas.': getNum('Meas.'),
                        'Tot. Def.': getNum('Tot.    Def.'),
                        Result: getStr('Result'),
                        '%Defectuoso': getStr('%Defectuoso'),
                        Intento: getNum('Intento'),
                        Validez: getStr('Validez'),
                        'Factory Code': getStr('Factory Code')
                    };
                    });

                    // Normalizar y parsear la columna 'Audit Date' para cada fila y guardar propiedades auxiliares
                    console.log(`[processSheetData] Processing ${gridData.length} rows to parse Audit Date...`);
                    gridData.forEach((row, idx) => {
                        const raw = row['Audit Date'];
                        let parsed = null;
                        try { parsed = parseDateFromString(raw); } catch(e) { parsed = null; }

                        row._parsedAuditDate = parsed;
                        if (parsed && !isNaN(parsed.getTime())) {
                            try {
                                row._auditYear = parsed.getFullYear();
                                row._auditMonth = parsed.getMonth(); // 0..11
                                row._auditISOWeek = getISOWeek(parsed);
                                if (idx < 5) console.log(`  [${idx}] Parsed: ${raw} => Year=${row._auditYear}, Month=${row._auditMonth}, Week=${row._auditISOWeek}`);
                            } catch(e) {
                                console.error(`Error parsing properties for row ${idx} (${raw}):`, e);
                            }
                        } else {
                            if (idx < 5) console.warn(`  [${idx}] Failed to parse: ${raw}`);
                        }
                    });

            // Primero poblar a�os y periodo por defecto
            console.log('[processSheetData] Populating year and period selects...');
            populateYearSelect();
            // Asegurar periodo por defecto a 'Sem' si no hay valor
            try { 
                if (periodSelect) {
                    periodSelect.value = 'Sem';
                    console.log('[processSheetData] Period set to: Sem');
                }
            } catch(e) { console.error('Error setting period:', e); }
            
            // Intentar seleccionar el a�o actual por defecto si existe en las opciones
            try {
                if (yearSelect) {
                    const currentYear = String(new Date().getFullYear());
                    const hasCurrentYear = Array.from(yearSelect.options).some(o => o.value === currentYear);
                    if (hasCurrentYear) {
                        yearSelect.value = currentYear;
                        console.log('[processSheetData] Year selected: ' + currentYear);
                    } else if (yearSelect.options.length > 1) {
                        // seleccionar el �ltimo a�o disponible
                        yearSelect.selectedIndex = yearSelect.options.length - 1;
                        console.log('[processSheetData] Year selected (fallback): ' + yearSelect.value);
                    }
                }
            } catch(e) { console.error('Error setting year:', e); }

            // Poblar el select dependiente (week/month) despu�s de fijar el a�o/periodo
            populateWeekSelect();
            console.log('[processSheetData] Week/month select populated');

            // Seleccionar por defecto la �ltima semana con registros en el sheet
            try {
                if (periodSelect && periodSelect.value === 'Sem') {
                    // Obtener la �ltima semana disponible (la de mayor n�mero con registros)
                    if (weekSelect.options.length > 1) {
                        // La �ltima opci�n es la semana m�s reciente (ya est�n ordenadas)
                        weekSelect.selectedIndex = weekSelect.options.length - 1;
                        console.log('[processSheetData] Week selected (last with data): ' + weekSelect.value);
                    } else {
                        console.warn('[processSheetData] No week options available');
                    }
                }

                // Disparar el filtrado por la selecci�n por defecto
                if (weekSelect && weekSelect.value) {
                    console.log('[processSheetData] Triggering handleWeekChange for week: ' + weekSelect.value);
                    try { handleWeekChange(); } catch(e) { console.error('Error in handleWeekChange:', e); }
                } else {
                    console.warn('[processSheetData] No week value to filter');
                }
            } catch(e) { console.error('Error in automatic week selection:', e); }

            updateLoadingStatus('Datos <span class="check">?</span>', 'success');
            // Habilitar controles
            try { if (weekSelect) weekSelect.disabled = false; } catch(e) {}
            try { if (yearSelect) yearSelect.disabled = false; } catch(e) {}
            try { if (btnDownload) btnDownload.disabled = !weekSelect.value; } catch(e) {}
            console.log('[processSheetData] Initialization complete');
        }        function getCurrentWeekNumber() {
            const today = new Date();
            const firstDayOfYear = new Date(today.getFullYear(), 0, 1);
            const pastDaysOfYear = (today - firstDayOfYear) / 86400000;
            return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
        }

        function populateWeekSelect() {
            // Poblar el select dependiente seg�n la columna 'Audit Date', el periodo y a�o seleccionados
            const period = (periodSelect && periodSelect.value) ? periodSelect.value : 'Sem';
            const selectedYear = (yearSelect && yearSelect.value) ? String(yearSelect.value) : '';

            console.log(`[populateWeekSelect] period=${period}, selectedYear=${selectedYear}, gridData.length=${gridData.length}`);

            const values = new Set();
            let processedCount = 0;
            gridData.forEach((row, idx) => {
                const dt = row._parsedAuditDate || parseDateFromString(row['Audit Date']);
                if (!dt || isNaN(dt.getTime())) {
                    if (idx < 3) console.log(`[populateWeekSelect] Row ${idx} has invalid date`);
                    return;
                }
                processedCount++;
                if (selectedYear && String(dt.getFullYear()) !== selectedYear) {
                    if (idx < 3) console.log(`[populateWeekSelect] Row ${idx} year mismatch: ${dt.getFullYear()} != ${selectedYear}`);
                    return;
                }
                if (period === 'Sem') {
                    const wk = String(getISOWeek(dt));
                    values.add(wk);
                } else {
                    const m = dt.getMonth();
                    values.add(String(m));
                }
            });
            
            console.log(`[populateWeekSelect] Processed ${processedCount} valid dates, found ${values.size} unique values`);

            let arr = Array.from(values);
            if (period === 'Sem') {
                arr = arr.map(v => parseInt(v, 10)).filter(n => !isNaN(n)).sort((a,b)=>a-b).map(n=>String(n));
                allWeeks = arr.slice();
                weekSelect.innerHTML = '<option value="">Seleccione Week...</option>';
                arr.forEach(week => {
                    const option = document.createElement('option');
                    option.value = week;
                    option.textContent = 'SEM' + week;
                    weekSelect.appendChild(option);
                });
                console.log(`[populateWeekSelect] Populated ${arr.length} week options: ${arr.join(', ')}`);
                // Seleccionar por defecto la semana actual si existe, o mantener la seleccion previa si la hay
                try {
                    const currentWeek = String(getISOWeek(new Date()));
                    const optNow = Array.from(weekSelect.options).find(o => o.value === currentWeek);
                    if (optNow) {
                        weekSelect.value = currentWeek;
                    } else if (weekSelect.options.length > 1 && !weekSelect.value) {
                        // fallback: seleccionar la ultima disponible
                        weekSelect.selectedIndex = weekSelect.options.length - 1;
                    }
                } catch(e) {}
            } else {
                // Meses: orden por n�mero de mes 0..11
                arr = arr.map(v => parseInt(v,10)).filter(n => !isNaN(n)).sort((a,b)=>a-b);
                // Guardar en allWeeks los valores tal y como aparecen en los option (1..12 strings)
                allWeeks = arr.map(m => String(m + 1));
                weekSelect.innerHTML = '<option value="">Seleccione Mes...</option>';
                arr.forEach(m => {
                    const option = document.createElement('option');
                    option.value = String(m+1); // mes 1..12
                    option.textContent = monthNameES(m);
                    weekSelect.appendChild(option);
                });
                console.log(`[populateWeekSelect] Populated ${arr.length} month options`);
            }

            weekSelect.disabled = (arr.length === 0);
            // Ajustar etiqueta del switch dentro del fieldset Week seg�n periodo
            try {
                const weekSwitchLabel = document.querySelector('#weekFieldset .switch-label');
                if (weekSwitchLabel) {
                    weekSwitchLabel.textContent = (period === 'Mes') ? 'Last Month' : 'Last Week';
                }
            } catch(e) {}

            // Si el periodo es Mes, intentar seleccionar autom�ticamente el mes que el usuario est� viendo ahora.
            if (period === 'Mes') {
                // Si hab�a una semana seleccionada previamente, usarla para inferir el mes
                const priorWeekVal = weekSelect.getAttribute('data-previous-week') || '';
                let targetMonth = null;
                // Preferir la semana actualmente seleccionada en el control (si viene de Sem)
                const selectedWeekBefore = (typeof weekSelect !== 'undefined' && weekSelect.value) ? weekSelect.value : null;
                if (selectedWeekBefore) {
                    // Buscar una fila en gridData que coincida con esa semana y determinar su mes
                    for (let i = 0; i < gridData.length; i++) {
                        const r = gridData[i];
                        const dt = r._parsedAuditDate || parseDateFromString(r['Audit Date']);
                        if (!dt) continue;
                        const wk = String(getISOWeek(dt));
                        if (wk === String(selectedWeekBefore)) {
                            targetMonth = String(dt.getMonth() + 1);
                            break;
                        }
                    }
                }
                // Si no encontramos mes basado en la semana seleccionada, usar el mes actual
                if (!targetMonth) {
                    targetMonth = String(new Date().getMonth() + 1);
                }

                // Si la opci�n existe en weekSelect, seleccionarla
                if (targetMonth) {
                    const opt = Array.from(weekSelect.options).find(o => o.value === String(targetMonth));
                    if (opt) {
                        weekSelect.value = String(targetMonth);
                    }
                }
            }
            console.log(`[populateWeekSelect] weekSelect.disabled=${weekSelect.disabled}`);
        }

        function handleLastWeekToggle() {
            if (lastWeekToggle.checked) {
                // Guardar la selecci�n actual para poder restaurarla al desactivar
                prevWeekSelection = weekSelect && weekSelect.value ? String(weekSelect.value) : null;

                // Determinar la semana base (la que el usuario est� viendo ahora)
                const baseWeek = weekSelect && weekSelect.value ? String(weekSelect.value) : String(getCurrentWeekNumber());

                // Buscar el �ndice de la semana base en allWeeks
                const idx = allWeeks.findIndex(w => String(w) === baseWeek);

                if (idx > 0) {
                    // Seleccionar la semana anterior en la lista de semanas disponibles
                    const prev = allWeeks[idx - 1];
                    weekSelect.value = String(prev);
                    handleWeekChange();
                } else if (idx === 0) {
                    // No hay semana anterior en los datos
                    lastWeekToggle.checked = false;
                    alert('No hay datos disponibles para la semana anterior a la seleccionada');
                } else {
                    // Si baseWeek no est� en allWeeks, intentar usar baseWeek-1 num�rico
                    const numericBase = parseInt(baseWeek, 10);
                    if (!isNaN(numericBase)) {
                        const lastWeekNum = numericBase - 1;
                        const lastWeekStr = String(lastWeekNum);
                        const weekExists = allWeeks.find(week => String(week) === lastWeekStr);
                        if (weekExists) {
                            weekSelect.value = lastWeekStr;
                            handleWeekChange();
                        } else {
                            lastWeekToggle.checked = false;
                            alert('No hay datos disponibles para la semana anterior a la seleccionada');
                        }
                    } else {
                        lastWeekToggle.checked = false;
                        alert('No se pudo determinar la semana base para seleccionar la semana anterior');
                    }
                }
            } else {
                // Restaurar la selecci�n previa si existe, si no, intentar seleccionar la semana actual
                if (prevWeekSelection) {
                    const weekExists = allWeeks.find(w => String(w) === String(prevWeekSelection));
                    if (weekExists) {
                        weekSelect.value = String(prevWeekSelection);
                        handleWeekChange();
                    }
                    prevWeekSelection = null;
                } else {
                    const currentWeek = getCurrentWeekNumber();
                    const currentWeekStr = String(currentWeek);
                    const weekExists = allWeeks.find(week => week === currentWeekStr);
                    if (weekExists) {
                        weekSelect.value = currentWeekStr;
                        handleWeekChange();
                    }
                }
            }
        }

        function handleWeekChange() {
            const selectedValue = weekSelect.value;
            if (!selectedValue) {
                tablesContainer.classList.add('hidden');
                noDataMessage.classList.add('hidden');
                return;
            }

            const period = (periodSelect && periodSelect.value) ? periodSelect.value : 'Sem';
            const year = (yearSelect && yearSelect.value) ? String(yearSelect.value) : '';

            const weekData = gridData.filter(row => {
                const dt = row._parsedAuditDate || parseDateFromString(row['Audit Date']);
                if (dt) {
                    if (year && String(dt.getFullYear()) !== year) return false;
                    if (period === 'Sem') {
                        return String(getISOWeek(dt)) === String(selectedValue);
                    } else {
                        // month: selectedValue is 1..12
                        return String(dt.getMonth() + 1) === String(selectedValue);
                    }
                }
                // Fallback: if Audit Date no est� parseable, intentar usar antigua columna Week para periodo Sem
                if (period === 'Sem' && row.Week) {
                    return String(row.Week) === String(selectedValue);
                }
                return false;
            });

            if (weekData.length === 0) {
                tablesContainer.classList.add('hidden');
                noDataMessage.classList.remove('hidden');
                return;
            }

            noDataMessage.classList.add('hidden');
            tablesContainer.classList.remove('hidden');

            const internaData = weekData.filter(row => 
                row.Validez === 'Interna' || row.Validez === 'Interna , Cliente'
            );

            const clienteData = weekData.filter(row => 
                row.Validez === 'Cliente' || row.Validez === 'Interna , Cliente'
            );

            currentInternaData = internaData;
            currentClienteData = clienteData;

            // Poblar el selector de Customer con valores �nicos de ambas tablas
            populateCustomerFilter(internaData, clienteData);

            renderTable(internaBody, internaData, 'INTERNA');
            renderTable(clienteBody, clienteData, 'CLIENTE');
            
            btnDownload.disabled = false;

            // Solo aplicar filtros de Factory Code si hay alg�n switch activo o filtro de customer seleccionado
            const anyCustomerSelected = getSelectedCustomers().length > 0;
            if (cofacoToggle.checked || cititex1Toggle.checked || cititex2Toggle.checked || anyCustomerSelected) {
                applyFactoryFilters();
            }
        }

        function populateCustomerFilter(internaData, clienteData) {
            // Obtener todos los customers �nicos de ambas tablas
            const allCustomers = new Set();
            
            internaData.forEach(row => {
                if (row['Customer']) {
                    allCustomers.add(row['Customer']);
                }
            });
            
            clienteData.forEach(row => {
                if (row['Customer']) {
                    allCustomers.add(row['Customer']);
                }
            });
            
            // Ordenar alfab�ticamente
            const sortedCustomers = Array.from(allCustomers).sort();
            
            // Limpiar opciones existentes
            customerFilter.innerHTML = '';
            
            // Agregar opciones
            sortedCustomers.forEach(customer => {
                const option = document.createElement('option');
                option.value = customer;
                option.textContent = customer;
                customerFilter.appendChild(option);
            });
            
            // Habilitar el selector (y avisar a Select2 si est� activado)
            try {
                if (window.jQuery && $('#customerFilter').data('select2')) {
                    $('#customerFilter').prop('disabled', false);
                    // Forzar a Select2 a refrescar su lista y a actualizar el resumen mostrado
                    $('#customerFilter').trigger('change');
                } else {
                    customerFilter.disabled = false;
                }
            } catch (e) {
                customerFilter.disabled = false;
            }
        }

        // Poblar el filtro de Customers dentro del modal de gr�fica
        function populateChartCustomerFilter() {
            const allCustomers = new Set();
            if (gridData && gridData.length > 0) {
                gridData.forEach(row => {
                    // Preferir filas tipo INTERNA (misma l�gica que la gr�fica)
                    const matchesType = (row.Tipo === 'INTERNA' || !row.Tipo);
                    if (matchesType && row['Customer']) {
                        allCustomers.add(row['Customer']);
                    }
                });
            }

            const sorted = Array.from(allCustomers).sort();
            const sel = document.getElementById('chartCustomerFilter');
            if (!sel) return;
            // Limpiar
            sel.innerHTML = '';
            // Agregar opci�n vac�a (todos)
            const optAll = document.createElement('option');
            optAll.value = '';
            optAll.textContent = 'Todos los Customers';
            sel.appendChild(optAll);

            sorted.forEach(c => {
                const o = document.createElement('option');
                o.value = c;
                o.textContent = c;
                sel.appendChild(o);
            });

            sel.disabled = false;
            // Restaurar la selecci�n previa en las opciones reci�n creadas (dropdown estilo Excel)
            if (typeof sel._syncFromVals === 'function') sel._syncFromVals();
        }

        function handleFactoryFilterToggle() {
            // Re-renderizar las tablas con los filtros actualizados
            if (currentInternaData.length > 0 || currentClienteData.length > 0) {
                applyFactoryFilters();
            }
        }

        function applyFactoryFilters() {
            const activeFactories = [];
            if (cofacoToggle.checked) activeFactories.push('Cofaco');
            if (cititex1Toggle.checked) activeFactories.push('Cititex 1');
            if (cititex2Toggle.checked) activeFactories.push('Cititex 2');
            
            const selectedCustomers = getSelectedCustomers();

            // Si no hay ning�n filtro activo, mostrar todos los datos originales
            if (activeFactories.length === 0 && selectedCustomers.length === 0) {
                renderTable(internaBody, currentInternaData, 'INTERNA');
                renderTable(clienteBody, currentClienteData, 'CLIENTE');
                return;
            }

            // Filtrar datos INTERNA
            let filteredInternaData = currentInternaData;
            
            // Aplicar filtro de Factory Code si hay factories seleccionadas
            if (activeFactories.length > 0) {
                filteredInternaData = filteredInternaData.filter(row => {
                    const factoryCode = row['Factory Code'];
                    return activeFactories.includes(factoryCode);
                });
            }
            
            // Aplicar filtro de Customer si hay uno o varios seleccionados
            if (selectedCustomers.length > 0) {
                filteredInternaData = filteredInternaData.filter(row => {
                    return selectedCustomers.includes(row['Customer']);
                });
            }

            // Filtrar datos CLIENTE
            let filteredClienteData = currentClienteData;
            
            // Aplicar filtro de Factory Code si hay factories seleccionadas
            if (activeFactories.length > 0) {
                filteredClienteData = filteredClienteData.filter(row => {
                    const factoryCode = row['Factory Code'];
                    return activeFactories.includes(factoryCode);
                });
            }
            
            // Aplicar filtro de Customer si hay uno o varios seleccionados
            if (selectedCustomers.length > 0) {
                filteredClienteData = filteredClienteData.filter(row => {
                    return selectedCustomers.includes(row['Customer']);
                });
            }

            // Re-renderizar las tablas
            renderTable(internaBody, filteredInternaData, 'INTERNA');
            renderTable(clienteBody, filteredClienteData, 'CLIENTE');
        }

        function renderTable(tbody, data, tableType) {
            tbody.innerHTML = '';

            if (data.length === 0) {
                const row = tbody.insertRow();
                const cell = row.insertCell();
                cell.colSpan = 25;
                cell.textContent = 'No hay datos';
                cell.style.textAlign = 'center';
                cell.style.padding = '20px';
                return;
            }

            // Agrupar primero por Factory Code, luego por Customer
            const groupedByFactory = {};
            data.forEach(row => {
                const factory = row['Factory Code'] || 'Sin c�digo';
                const customer = row['Customer'] || 'Sin cliente';
                
                if (!groupedByFactory[factory]) {
                    groupedByFactory[factory] = {};
                }
                
                if (!groupedByFactory[factory][customer]) {
                    groupedByFactory[factory][customer] = [];
                }
                
                groupedByFactory[factory][customer].push(row);
            });

            const totals = {
                'Lot Size': 0,
                'Sample Size': 0,
                'Tot. Def.': 0,
                Fabric: 0,
                'Untrimmed threads End': 0,
                Embellisment: 0,
                Hole: 0,
                'Broken/skip stitches': 0,
                'Color Shading': 0,
                'Puckering/Excessive Fullness': 0,
                Cleaness: 0,
                Asymmetrical: 0,
                Pin: 0,
                'Wrong Hangtas': 0,
                Assorment: 0,
                'Shipping Marks': 0,
                Others: 0,
                'Meas.': 0,
                count: 0,
                A1: 0,
                A2: 0,
                A3: 0,
                A4: 0
            };

            // Procesar cada Factory Code
            Object.keys(groupedByFactory).sort().forEach(factory => {
                const customers = groupedByFactory[factory];
                
                // Subtotal por Factory Code
                const factorySubtotal = {
                    'Lot Size': 0,
                    'Sample Size': 0,
                    'Tot. Def.': 0,
                    Fabric: 0,
                    'Untrimmed threads End': 0,
                    Embellisment: 0,
                    Hole: 0,
                    'Broken/skip stitches': 0,
                    'Color Shading': 0,
                    'Puckering/Excessive Fullness': 0,
                    Cleaness: 0,
                    Asymmetrical: 0,
                    Pin: 0,
                    'Wrong Hangtas': 0,
                    Assorment: 0,
                    'Shipping Marks': 0,
                    Others: 0,
                    'Meas.': 0,
                    count: 0,
                    A1: 0,
                    A2: 0,
                    A3: 0,
                    A4: 0
                };

                // Procesar cada Customer dentro del Factory Code
                Object.keys(customers).sort().forEach(customer => {
                    const rows = customers[customer];
                    const row = tbody.insertRow();

                    const lineSum = {
                        'Lot Size': 0,
                        'Sample Size': 0,
                        'Tot. Def.': 0,
                        Fabric: 0,
                        'Untrimmed threads End': 0,
                        Embellisment: 0,
                        Hole: 0,
                        'Broken/skip stitches': 0,
                        'Color Shading': 0,
                        'Puckering/Excessive Fullness': 0,
                        Cleaness: 0,
                        Asymmetrical: 0,
                        Pin: 0,
                        'Wrong Hangtas': 0,
                        Assorment: 0,
                        'Shipping Marks': 0,
                        Others: 0,
                        'Meas.': 0,
                        count: rows.length,
                        A1: 0,
                        A2: 0,
                        A3: 0,
                        A4: 0
                    };

                    rows.forEach(r => {
                        lineSum['Lot Size'] += r['Lot Size'];
                        lineSum['Sample Size'] += r['Sample Size'];
                        lineSum['Tot. Def.'] += r['Tot. Def.'];
                        lineSum.Fabric += r.Fabric;
                        lineSum['Untrimmed threads End'] += r['Untrimmed threads End'];
                        lineSum.Embellisment += r.Embellisment;
                        lineSum.Hole += r.Hole;
                        lineSum['Broken/skip stitches'] += r['Broken/skip stitches'];
                        lineSum['Color Shading'] += r['Color Shading'];
                        lineSum['Puckering/Excessive Fullness'] += r['Puckering/Excessive Fullness'];
                        lineSum.Cleaness += r.Cleaness;
                        lineSum.Asymmetrical += r.Asymmetrical;
                        lineSum.Pin += r.Pin;
                        lineSum['Wrong Hangtas'] += r['Wrong Hangtas'];
                        lineSum.Assorment += r.Assorment;
                        lineSum['Shipping Marks'] += r['Shipping Marks'];
                        lineSum.Others += r.Others;
                        lineSum['Meas.'] += r['Meas.'];

                        if (r.Intento === 1) lineSum.A1++;
                        if (r.Intento === 2) lineSum.A2++;
                        if (r.Intento === 3) lineSum.A3++;
                        if (r.Intento === 4) lineSum.A4++;
                    });

                    row.insertCell().textContent = factory;
                    row.insertCell().textContent = customer;
                    row.insertCell().textContent = formatNumber(lineSum['Lot Size']);
                    row.insertCell().textContent = formatNumber(lineSum['Sample Size']);
                    
                    // Para las siguientes columnas, si es 0, mostrar pero en color blanco
                    let cell;
                    
                    cell = row.insertCell();
                    cell.textContent = lineSum['Tot. Def.'];
                    if (lineSum['Tot. Def.'] === 0) cell.style.color = 'white';
                    
                    cell = row.insertCell();
                    cell.textContent = lineSum.Fabric;
                    if (lineSum.Fabric === 0) cell.style.color = 'white';
                    
                    cell = row.insertCell();
                    cell.textContent = lineSum['Untrimmed threads End'];
                    if (lineSum['Untrimmed threads End'] === 0) cell.style.color = 'white';
                    
                    cell = row.insertCell();
                    cell.textContent = lineSum.Embellisment;
                    if (lineSum.Embellisment === 0) cell.style.color = 'white';
                    
                    cell = row.insertCell();
                    cell.textContent = lineSum.Hole;
                    if (lineSum.Hole === 0) cell.style.color = 'white';
                    
                    cell = row.insertCell();
                    cell.textContent = lineSum['Broken/skip stitches'];
                    if (lineSum['Broken/skip stitches'] === 0) cell.style.color = 'white';
                    
                    cell = row.insertCell();
                    cell.textContent = lineSum['Color Shading'];
                    if (lineSum['Color Shading'] === 0) cell.style.color = 'white';
                    
                    cell = row.insertCell();
                    cell.textContent = lineSum['Puckering/Excessive Fullness'];
                    if (lineSum['Puckering/Excessive Fullness'] === 0) cell.style.color = 'white';
                    
                    cell = row.insertCell();
                    cell.textContent = lineSum.Cleaness;
                    if (lineSum.Cleaness === 0) cell.style.color = 'white';
                    
                    cell = row.insertCell();
                    cell.textContent = lineSum.Asymmetrical;
                    if (lineSum.Asymmetrical === 0) cell.style.color = 'white';
                    
                    cell = row.insertCell();
                    cell.textContent = lineSum.Pin;
                    if (lineSum.Pin === 0) cell.style.color = 'white';
                    
                    cell = row.insertCell();
                    cell.textContent = lineSum['Wrong Hangtas'];
                    if (lineSum['Wrong Hangtas'] === 0) cell.style.color = 'white';
                    
                    cell = row.insertCell();
                    cell.textContent = lineSum.Assorment;
                    if (lineSum.Assorment === 0) cell.style.color = 'white';
                    
                    cell = row.insertCell();
                    cell.textContent = lineSum['Shipping Marks'];
                    if (lineSum['Shipping Marks'] === 0) cell.style.color = 'white';
                    
                    cell = row.insertCell();
                    cell.textContent = lineSum.Others;
                    if (lineSum.Others === 0) cell.style.color = 'white';
                    
                    cell = row.insertCell();
                    cell.textContent = lineSum['Meas.'];
                    if (lineSum['Meas.'] === 0) cell.style.color = 'white';
                    
                    cell = row.insertCell();
                    cell.textContent = lineSum.count;
                    if (lineSum.count === 0) cell.style.color = 'white';
                    
                    // Solo para INTERNA agregar A1-A4
                    if (tableType === 'INTERNA') {
                        cell = row.insertCell();
                        cell.textContent = lineSum.A1;
                        if (lineSum.A1 === 0) cell.style.color = 'white';
                        
                        cell = row.insertCell();
                        cell.textContent = lineSum.A2;
                        if (lineSum.A2 === 0) cell.style.color = 'white';
                        
                        cell = row.insertCell();
                        cell.textContent = lineSum.A3;
                        if (lineSum.A3 === 0) cell.style.color = 'white';
                        
                        cell = row.insertCell();
                        cell.textContent = lineSum.A4;
                        if (lineSum.A4 === 0) cell.style.color = 'white';
                    }

                    // Acumular en el subtotal del Factory Code
                    factorySubtotal['Lot Size'] += lineSum['Lot Size'];
                    factorySubtotal['Sample Size'] += lineSum['Sample Size'];
                    factorySubtotal['Tot. Def.'] += lineSum['Tot. Def.'];
                    factorySubtotal.Fabric += lineSum.Fabric;
                    factorySubtotal['Untrimmed threads End'] += lineSum['Untrimmed threads End'];
                    factorySubtotal.Embellisment += lineSum.Embellisment;
                    factorySubtotal.Hole += lineSum.Hole;
                    factorySubtotal['Broken/skip stitches'] += lineSum['Broken/skip stitches'];
                    factorySubtotal['Color Shading'] += lineSum['Color Shading'];
                    factorySubtotal['Puckering/Excessive Fullness'] += lineSum['Puckering/Excessive Fullness'];
                    factorySubtotal.Cleaness += lineSum.Cleaness;
                    factorySubtotal.Asymmetrical += lineSum.Asymmetrical;
                    factorySubtotal.Pin += lineSum.Pin;
                    factorySubtotal['Wrong Hangtas'] += lineSum['Wrong Hangtas'];
                    factorySubtotal.Assorment += lineSum.Assorment;
                    factorySubtotal['Shipping Marks'] += lineSum['Shipping Marks'];
                    factorySubtotal.Others += lineSum.Others;
                    factorySubtotal['Meas.'] += lineSum['Meas.'];
                    factorySubtotal.count += lineSum.count;
                    factorySubtotal.A1 += lineSum.A1;
                    factorySubtotal.A2 += lineSum.A2;
                    factorySubtotal.A3 += lineSum.A3;
                    factorySubtotal.A4 += lineSum.A4;
                });

                // Agregar fila de subtotal por Factory Code
                const subtotalRow = tbody.insertRow();
                subtotalRow.style.fontWeight = '600';
                subtotalRow.setAttribute('style', 'background-color: #90ee90 !important; font-weight: 600;');

                subtotalRow.insertCell().textContent = 'Total ' + factory;
                subtotalRow.insertCell().textContent = '';
                subtotalRow.insertCell().textContent = formatNumber(factorySubtotal['Lot Size']);
                subtotalRow.insertCell().textContent = formatNumber(factorySubtotal['Sample Size']);
                subtotalRow.insertCell().textContent = factorySubtotal['Tot. Def.'];
                subtotalRow.insertCell().textContent = factorySubtotal.Fabric;
                subtotalRow.insertCell().textContent = factorySubtotal['Untrimmed threads End'];
                subtotalRow.insertCell().textContent = factorySubtotal.Embellisment;
                subtotalRow.insertCell().textContent = factorySubtotal.Hole;
                subtotalRow.insertCell().textContent = factorySubtotal['Broken/skip stitches'];
                subtotalRow.insertCell().textContent = factorySubtotal['Color Shading'];
                subtotalRow.insertCell().textContent = factorySubtotal['Puckering/Excessive Fullness'];
                subtotalRow.insertCell().textContent = factorySubtotal.Cleaness;
                subtotalRow.insertCell().textContent = factorySubtotal.Asymmetrical;
                subtotalRow.insertCell().textContent = factorySubtotal.Pin;
                subtotalRow.insertCell().textContent = factorySubtotal['Wrong Hangtas'];
                subtotalRow.insertCell().textContent = factorySubtotal.Assorment;
                subtotalRow.insertCell().textContent = factorySubtotal['Shipping Marks'];
                subtotalRow.insertCell().textContent = factorySubtotal.Others;
                subtotalRow.insertCell().textContent = factorySubtotal['Meas.'];
                subtotalRow.insertCell().textContent = factorySubtotal.count;
                
                // Solo para INTERNA agregar A1-A4
                if (tableType === 'INTERNA') {
                    subtotalRow.insertCell().textContent = factorySubtotal.A1;
                    subtotalRow.insertCell().textContent = factorySubtotal.A2;
                    subtotalRow.insertCell().textContent = factorySubtotal.A3;
                    subtotalRow.insertCell().textContent = factorySubtotal.A4;
                }

                // Acumular en el total general
                totals['Lot Size'] += factorySubtotal['Lot Size'];
                totals['Sample Size'] += factorySubtotal['Sample Size'];
                totals['Tot. Def.'] += factorySubtotal['Tot. Def.'];
                totals.Fabric += factorySubtotal.Fabric;
                totals['Untrimmed threads End'] += factorySubtotal['Untrimmed threads End'];
                totals.Embellisment += factorySubtotal.Embellisment;
                totals.Hole += factorySubtotal.Hole;
                totals['Broken/skip stitches'] += factorySubtotal['Broken/skip stitches'];
                totals['Color Shading'] += factorySubtotal['Color Shading'];
                totals['Puckering/Excessive Fullness'] += factorySubtotal['Puckering/Excessive Fullness'];
                totals.Cleaness += factorySubtotal.Cleaness;
                totals.Asymmetrical += factorySubtotal.Asymmetrical;
                totals.Pin += factorySubtotal.Pin;
                totals['Wrong Hangtas'] += factorySubtotal['Wrong Hangtas'];
                totals.Assorment += factorySubtotal.Assorment;
                totals['Shipping Marks'] += factorySubtotal['Shipping Marks'];
                totals.Others += factorySubtotal.Others;
                totals['Meas.'] += factorySubtotal['Meas.'];
                totals.count += factorySubtotal.count;
                totals.A1 += factorySubtotal.A1;
                totals.A2 += factorySubtotal.A2;
                totals.A3 += factorySubtotal.A3;
                totals.A4 += factorySubtotal.A4;
            });

            const totalRow = tbody.insertRow();
            totalRow.className = 'total-row';

            const totalDefectRate = totals['Sample Size'] > 0 
                ? (totals['Tot. Def.'] / totals['Sample Size'] * 100).toFixed(2) + '%'
                : '0.00%';

            totalRow.insertCell().textContent = 'Total general';
            totalRow.insertCell().textContent = '';
            totalRow.insertCell().textContent = formatNumber(totals['Lot Size']);
            totalRow.insertCell().textContent = formatNumber(totals['Sample Size']);
            totalRow.insertCell().textContent = totals['Tot. Def.'];
            totalRow.insertCell().textContent = totals.Fabric;
            totalRow.insertCell().textContent = totals['Untrimmed threads End'];
            totalRow.insertCell().textContent = totals.Embellisment;
            totalRow.insertCell().textContent = totals.Hole;
            totalRow.insertCell().textContent = totals['Broken/skip stitches'];
            totalRow.insertCell().textContent = totals['Color Shading'];
            totalRow.insertCell().textContent = totals['Puckering/Excessive Fullness'];
            totalRow.insertCell().textContent = totals.Cleaness;
            totalRow.insertCell().textContent = totals.Asymmetrical;
            totalRow.insertCell().textContent = totals.Pin;
            totalRow.insertCell().textContent = totals['Wrong Hangtas'];
            totalRow.insertCell().textContent = totals.Assorment;
            totalRow.insertCell().textContent = totals['Shipping Marks'];
            totalRow.insertCell().textContent = totals.Others;
            totalRow.insertCell().textContent = totals['Meas.'];
            totalRow.insertCell().textContent = totals.count;
            
            // Solo para INTERNA agregar A1-A4
            if (tableType === 'INTERNA') {
                totalRow.insertCell().textContent = totals.A1;
                
                const cellA2 = totalRow.insertCell();
                cellA2.textContent = totals.A2;
                cellA2.style.backgroundColor = 'white';
                
                const cellA3 = totalRow.insertCell();
                cellA3.textContent = totals.A3;
                cellA3.style.backgroundColor = 'white';
                
                const cellA4 = totalRow.insertCell();
                cellA4.textContent = totals.A4;
                cellA4.style.backgroundColor = 'white';
            }

            // Fila DEFECTUOSO
            const defectuosoRow = tbody.insertRow();
            defectuosoRow.className = 'total-row';
            defectuosoRow.setAttribute('style', 'background-color: #1a4d1a !important; color: white !important;');
            
            const defectuosoLabelCell = defectuosoRow.insertCell();
            defectuosoLabelCell.textContent = 'DEFECTUOSO';
            defectuosoLabelCell.style.fontWeight = '700';
            defectuosoLabelCell.colSpan = 4;
            
            // Columna 5 (Tot. Def.) - Base para divisiones
            const sampleSizeTotal = totals['Sample Size']; // Columna 4
            
            // Columnas 5-20: Porcentajes (cada columna / Sample Size)
            const defectuosoTotDef = sampleSizeTotal > 0 ? (totals['Tot. Def.'] / sampleSizeTotal * 100).toFixed(2) + '%' : '0.00%';
            defectuosoRow.insertCell().textContent = defectuosoTotDef;
            
            const fabricPercent = sampleSizeTotal > 0 ? (totals.Fabric / sampleSizeTotal * 100).toFixed(2) + '%' : '0.00%';
            defectuosoRow.insertCell().textContent = fabricPercent;
            
            const untrimmedPercent = sampleSizeTotal > 0 ? (totals['Untrimmed threads End'] / sampleSizeTotal * 100).toFixed(2) + '%' : '0.00%';
            defectuosoRow.insertCell().textContent = untrimmedPercent;
            
            const embellismentPercent = sampleSizeTotal > 0 ? (totals.Embellisment / sampleSizeTotal * 100).toFixed(2) + '%' : '0.00%';
            defectuosoRow.insertCell().textContent = embellismentPercent;
            
            const holePercent = sampleSizeTotal > 0 ? (totals.Hole / sampleSizeTotal * 100).toFixed(2) + '%' : '0.00%';
            defectuosoRow.insertCell().textContent = holePercent;
            
            const brokenPercent = sampleSizeTotal > 0 ? (totals['Broken/skip stitches'] / sampleSizeTotal * 100).toFixed(2) + '%' : '0.00%';
            defectuosoRow.insertCell().textContent = brokenPercent;
            
            const colorPercent = sampleSizeTotal > 0 ? (totals['Color Shading'] / sampleSizeTotal * 100).toFixed(2) + '%' : '0.00%';
            defectuosoRow.insertCell().textContent = colorPercent;
            
            const puckeringPercent = sampleSizeTotal > 0 ? (totals['Puckering/Excessive Fullness'] / sampleSizeTotal * 100).toFixed(2) + '%' : '0.00%';
            defectuosoRow.insertCell().textContent = puckeringPercent;
            
            const cleanessPercent = sampleSizeTotal > 0 ? (totals.Cleaness / sampleSizeTotal * 100).toFixed(2) + '%' : '0.00%';
            defectuosoRow.insertCell().textContent = cleanessPercent;
            
            const asymmetricalPercent = sampleSizeTotal > 0 ? (totals.Asymmetrical / sampleSizeTotal * 100).toFixed(2) + '%' : '0.00%';
            defectuosoRow.insertCell().textContent = asymmetricalPercent;
            
            const pinPercent = sampleSizeTotal > 0 ? (totals.Pin / sampleSizeTotal * 100).toFixed(2) + '%' : '0.00%';
            defectuosoRow.insertCell().textContent = pinPercent;
            
            const wrongPercent = sampleSizeTotal > 0 ? (totals['Wrong Hangtas'] / sampleSizeTotal * 100).toFixed(2) + '%' : '0.00%';
            defectuosoRow.insertCell().textContent = wrongPercent;
            
            const assormentPercent = sampleSizeTotal > 0 ? (totals.Assorment / sampleSizeTotal * 100).toFixed(2) + '%' : '0.00%';
            defectuosoRow.insertCell().textContent = assormentPercent;
            
            const shippingPercent = sampleSizeTotal > 0 ? (totals['Shipping Marks'] / sampleSizeTotal * 100).toFixed(2) + '%' : '0.00%';
            defectuosoRow.insertCell().textContent = shippingPercent;
            
            const othersPercent = sampleSizeTotal > 0 ? (totals.Others / sampleSizeTotal * 100).toFixed(2) + '%' : '0.00%';
            defectuosoRow.insertCell().textContent = othersPercent;
            
            const measPercent = sampleSizeTotal > 0 ? (totals['Meas.'] / sampleSizeTotal * 100).toFixed(2) + '%' : '0.00%';
            defectuosoRow.insertCell().textContent = measPercent;
            
            // Columnas 21-24: vac�as o con valores especiales para INTERNA
            if (tableType === 'INTERNA') {
                // Columna "Cuenta de N� Report" - PASS
                defectuosoRow.insertCell().textContent = 'PASS';
                
                // Columna A1 - Porcentaje A1 / (A1+A2+A3+A4)
                const totalIntentos = totals.A1 + totals.A2 + totals.A3 + totals.A4;
                const a1Percent = totalIntentos > 0 ? Math.round(totals.A1 / totalIntentos * 100) + '%' : '0%';
                defectuosoRow.insertCell().textContent = a1Percent;
                
                // Columnas A2, A3, A4 vac�as con fondo blanco
                for (let i = 0; i < 3; i++) {
                    const cell = defectuosoRow.insertCell();
                    cell.textContent = '';
                    cell.style.backgroundColor = 'white';
                }
            } else {
                // Para CLIENTE, todas vac�as con fondo blanco
                for (let i = 0; i < 4; i++) {
                    const cell = defectuosoRow.insertCell();
                    cell.textContent = '';
                    cell.style.backgroundColor = 'white';
                }
            }

            // Fila de porcentajes individuales
            const percentRow = tbody.insertRow();
            percentRow.setAttribute('style', 'background-color: #4a4a4a !important; color: white !important;');
            const percentEmptyCell = percentRow.insertCell();
            percentEmptyCell.colSpan = 5;
            percentEmptyCell.textContent = '';

            // Calcular porcentajes individuales (cada columna / Tot. Def.)
            const totDefTotal = totals['Tot. Def.'];
            
            const fabricPercent2 = totDefTotal > 0 ? Math.round(totals.Fabric / totDefTotal * 100) + '%' : '0%';
            const untrimmedPercent2 = totDefTotal > 0 ? Math.round(totals['Untrimmed threads End'] / totDefTotal * 100) + '%' : '0%';
            const embellismentPercent2 = totDefTotal > 0 ? Math.round(totals.Embellisment / totDefTotal * 100) + '%' : '0%';
            const holePercent2 = totDefTotal > 0 ? Math.round(totals.Hole / totDefTotal * 100) + '%' : '0%';
            const brokenPercent2 = totDefTotal > 0 ? Math.round(totals['Broken/skip stitches'] / totDefTotal * 100) + '%' : '0%';
            const colorPercent2 = totDefTotal > 0 ? Math.round(totals['Color Shading'] / totDefTotal * 100) + '%' : '0%';
            const puckeringPercent2 = totDefTotal > 0 ? Math.round(totals['Puckering/Excessive Fullness'] / totDefTotal * 100) + '%' : '0%';
            const cleanessPercent2 = totDefTotal > 0 ? Math.round(totals.Cleaness / totDefTotal * 100) + '%' : '0%';
            const asymmetricalPercent2 = totDefTotal > 0 ? Math.round(totals.Asymmetrical / totDefTotal * 100) + '%' : '0%';
            const pinPercent2 = totDefTotal > 0 ? Math.round(totals.Pin / totDefTotal * 100) + '%' : '0%';
            const wrongPercent2 = totDefTotal > 0 ? Math.round(totals['Wrong Hangtas'] / totDefTotal * 100) + '%' : '0%';
            const assormentPercent2 = totDefTotal > 0 ? Math.round(totals.Assorment / totDefTotal * 100) + '%' : '0%';
            const shippingPercent2 = totDefTotal > 0 ? Math.round(totals['Shipping Marks'] / totDefTotal * 100) + '%' : '0%';
            const othersPercent2 = totDefTotal > 0 ? Math.round(totals.Others / totDefTotal * 100) + '%' : '0%';
            const measPercent2 = totDefTotal > 0 ? Math.round(totals['Meas.'] / totDefTotal * 100) + '%' : '0%';

            percentRow.insertCell().textContent = fabricPercent2;
            percentRow.insertCell().textContent = untrimmedPercent2;
            percentRow.insertCell().textContent = embellismentPercent2;
            percentRow.insertCell().textContent = holePercent2;
            percentRow.insertCell().textContent = brokenPercent2;
            percentRow.insertCell().textContent = colorPercent2;
            percentRow.insertCell().textContent = puckeringPercent2;
            percentRow.insertCell().textContent = cleanessPercent2;
            percentRow.insertCell().textContent = asymmetricalPercent2;
            percentRow.insertCell().textContent = pinPercent2;
            percentRow.insertCell().textContent = wrongPercent2;
            percentRow.insertCell().textContent = assormentPercent2;
            percentRow.insertCell().textContent = shippingPercent2;
            percentRow.insertCell().textContent = othersPercent2;
            percentRow.insertCell().textContent = measPercent2;
            
            // �ltimas columnas: vac�as o con valores especiales para INTERNA
            if (tableType === 'INTERNA') {
                // Columna "Cuenta de N� Report" - FAIL
                percentRow.insertCell().textContent = 'FAIL';
                
                // Columna A1 - 100% - valor de la fila DEFECTUOSO
                const totalIntentos = totals.A1 + totals.A2 + totals.A3 + totals.A4;
                const a1PercentDefectuoso = totalIntentos > 0 ? (totals.A1 / totalIntentos * 100) : 0;
                const a1PercentFinal = Math.round(100 - a1PercentDefectuoso) + '%';
                percentRow.insertCell().textContent = a1PercentFinal;
                
                // Columnas A2, A3, A4 vac�as con fondo blanco
                for (let i = 0; i < 3; i++) {
                    const cell = percentRow.insertCell();
                    cell.textContent = '';
                    cell.style.backgroundColor = 'white';
                }
            } else {
                // Para CLIENTE, todas vac�as con fondo blanco
                for (let i = 0; i < 4; i++) {
                    const cell = percentRow.insertCell();
                    cell.textContent = '';
                    cell.style.backgroundColor = 'white';
                }
            }

            // === Resaltar en amarillo las 3 columnas de defectos con mayor % en la �ltima fila ===
            const defectKeys = ['Fabric', 'Untrimmed threads End', 'Embellisment', 'Hole',
                'Broken/skip stitches', 'Color Shading', 'Puckering/Excessive Fullness',
                'Cleaness', 'Asymmetrical', 'Pin', 'Wrong Hangtas', 'Assorment',
                'Shipping Marks', 'Others', 'Meas.'];

            // Calcular porcentaje num�rico de cada defecto (cada defecto / Tot. Def.)
            const defectPercents = defectKeys.map((key, idx) => ({
                idx: idx,           // posici�n dentro de defectKeys (0-14)
                colIdx: idx + 5,    // �ndice de columna en la tabla (5-19)
                value: totDefTotal > 0 ? (totals[key] / totDefTotal * 100) : 0
            }));

            // Ordenar descendente y tomar las 3 con mayor % (solo si > 0)
            defectPercents.sort((a, b) => b.value - a.value);
            const top3 = defectPercents.slice(0, 3).filter(item => item.value > 0);

            const tableId = tableType === 'INTERNA' ? 'internaTable' : 'clienteTable';
            const tableEl = document.getElementById(tableId);
            const headerRow = tableEl ? tableEl.querySelector('thead tr') : null;

            // Limpiar el resaltado previo del encabezado: el tbody se reconstruye
            // en cada render, pero el thead es estático y conserva los estilos inline
            if (headerRow) {
                Array.from(headerRow.cells).forEach(th => {
                    th.style.removeProperty('background-color');
                });
            }

            if (top3.length > 0 && headerRow) {

                // Helper: obtener la celda que cubre la columna colIdx en una fila con posibles colspans
                function getCellForColumn(row, colIdx) {
                    let currentCol = 0;
                    for (let i = 0; i < row.cells.length; i++) {
                        const span = row.cells[i].colSpan || 1;
                        if (colIdx >= currentCol && colIdx < currentCol + span) {
                            return span === 1 ? row.cells[i] : null; // no pintar celdas con colspan
                        }
                        currentCol += span;
                    }
                    return null;
                }

                top3.forEach(item => {
                    const colIdx = item.colIdx;

                    // Pintar encabezado (th)
                    if (headerRow && headerRow.cells[colIdx]) {
                        headerRow.cells[colIdx].style.setProperty('background-color', 'rgba(255, 255, 0, 0.45)', 'important');
                    }

                    // Pintar todas las filas del body en esa columna
                    Array.from(tbody.rows).forEach(tr => {
                        const cell = getCellForColumn(tr, colIdx);
                        if (cell) {
                            cell.style.setProperty('background-color', 'rgba(255, 255, 0, 0.45)', 'important');
                            cell.style.setProperty('color', '#000', 'important');
                        }
                    });
                });
            }
        }

        // Funci�n para poblar los dropdowns de semanas
        function populateWeekFilters() {
            // Obtener todas las semanas disponibles
            let availableWeeks = [];
            const period = (periodSelect && periodSelect.value) ? periodSelect.value : 'Sem';
            
            if (allWeeks && allWeeks.length > 0) {
                availableWeeks = [...allWeeks].sort((a, b) => parseInt(a) - parseInt(b));
            } else {
                // Usar semanas de ejemplo si no hay datos reales
                availableWeeks = ['41', '43', '44', '45', '46', '47'];
            }
            
            console.log('Available weeks for filters:', availableWeeks);
            
            // Limpiar los dropdowns
            weekFromFilter.innerHTML = '';
            weekToFilter.innerHTML = '';
            
            // Para periodo 'Mes' queremos mostrar los �ltimos 6 meses (mes actual y 5 anteriores).
            if (period === 'Mes') {
                // availableWeeks contiene meses como strings '1'..'12' si existen en datos
                const availableMonths = availableWeeks.map(w => parseInt(w,10)).filter(n => !isNaN(n));

                // Calcular �ltimos 6 meses (1..12)
                const now = new Date();
                const currentMonth = now.getMonth() + 1; // 1..12
                const monthsNeeded = [];
                for (let i = 5; i >= 0; i--) {
                    let m = currentMonth - i;
                    while (m <= 0) m += 12;
                    monthsNeeded.push(m);
                }

                // Unir y ordenar opciones para mostrar (asegurar que monthsNeeded est�n presentes)
                const unionSet = new Set([...availableMonths, ...monthsNeeded]);
                const unionArr = Array.from(unionSet).map(n => parseInt(n,10)).filter(n=>!isNaN(n)).sort((a,b)=>a-b);

                unionArr.forEach(m => {
                    const optionFrom = document.createElement('option');
                    const optionTo = document.createElement('option');
                    optionFrom.value = String(m);
                    optionFrom.textContent = monthNameES(m - 1);
                    optionTo.value = String(m);
                    optionTo.textContent = monthNameES(m - 1);
                    weekFromFilter.appendChild(optionFrom);
                    weekToFilter.appendChild(optionTo);
                });

                // Seleccionar el rango monthsNeeded (primer y �ltimo)
                weekFromFilter.value = String(monthsNeeded[0]);
                weekToFilter.value = String(monthsNeeded[monthsNeeded.length - 1]);
            } else {
                // Poblar ambos dropdowns con las semanas disponibles
                availableWeeks.forEach(w => {
                    const optionFrom = document.createElement('option');
                    const optionTo = document.createElement('option');
                    optionFrom.value = String(w);
                    optionFrom.textContent = `SEM${w}`;
                    optionTo.value = String(w);
                    optionTo.textContent = `SEM${w}`;
                    weekFromFilter.appendChild(optionFrom);
                    weekToFilter.appendChild(optionTo);
                });

                // Establecer valores por defecto (�ltimas 6 semanas si hay suficientes)
                if (availableWeeks.length >= 6) {
                    weekFromFilter.value = availableWeeks[availableWeeks.length - 6];
                    weekToFilter.value = availableWeeks[availableWeeks.length - 1];
                } else if (availableWeeks.length > 0) {
                    weekFromFilter.value = availableWeeks[0];
                    weekToFilter.value = availableWeeks[availableWeeks.length - 1];
                }
            }
            
            console.log('Week filters set: from', weekFromFilter.value, 'to', weekToFilter.value);
        }

        // Funci�n para poblar el dropdown de Factory Codes
        function populateFactoryFilter() {
            // Obtener Factory Codes �nicos de los datos
            let factoryCodes = [];
            
            if (gridData && gridData.length > 0) {
                factoryCodes = [...new Set(gridData
                    .filter(row => row.Tipo === 'INTERNA' && row['Factory Code'])
                    .map(row => row['Factory Code']))].sort();
            }
            
            // Si no hay datos reales, usar Factory Codes de ejemplo
            if (factoryCodes.length === 0) {
                factoryCodes = ['Cititex 1', 'Cititex 2', 'Cofaco'];
            }
            
            console.log('Available Factory Codes:', factoryCodes);
            
            // Limpiar el dropdown y agregar "Todos"
            factoryFilter.innerHTML = '<option value="all">Todos los Factory Codes</option>';
            
            // Agregar cada Factory Code como opci�n
            factoryCodes.forEach(factory => {
                const option = document.createElement('option');
                option.value = factory;
                option.textContent = factory;
                factoryFilter.appendChild(option);
            });
        }

        // Funci�n para actualizar la gr�fica cuando cambia cualquier filtro
        function updateChartWithFilter() {
            const selectedFactory = factoryFilter.value;
            const weekFrom = weekFromFilter.value;
            const weekTo = weekToFilter.value;
            const selectedChartCustomers = getSelectedChartCustomers();
            
            console.log('Filters changed - Factory:', selectedFactory, 'From:', weekFrom, 'To:', weekTo);
            
            // Validar que ambas semanas est�n seleccionadas
            if (!weekFrom || !weekTo) {
                console.log('Week range not fully selected');
                return;
            }
            
            // Validar que el rango sea v�lido
            if (parseInt(weekFrom) > parseInt(weekTo)) {
                alert('La semana "desde" debe ser menor o igual a la semana "hasta"');
                return;
            }
            
            const weekData = getWeeklyTrendsDataByRange(selectedFactory, selectedChartCustomers);
            if (weekData.length === 0) {
                alert('No hay datos para los filtros seleccionados');
                return;
            }
            
            createTrendsChart(weekData);
        }

        // Funci�n para mostrar el modal con la gr�fica
        function showTrendsChart() {
            console.log('Datos disponibles:', allWeeks);
            console.log('GridData sample:', gridData ? gridData.slice(0, 3) : 'No data');
            
            // Poblar los dropdowns
            populateFactoryFilter();
            populateWeekFilters();
            
            const selectedFactory = factoryFilter.value;
            // Poblar el filtro de customers del modal
            populateChartCustomerFilter();
            const selectedChartCustomers = getSelectedChartCustomers();
            const weekData = getWeeklyTrendsDataByRange(selectedFactory, selectedChartCustomers);
            console.log('Week data for chart:', weekData);
            console.log('BAP values:', weekData.map(w => ({ week: w.week, bap: w.bap })));
            
            if (weekData.length === 0) {
                alert('No hay datos suficientes para mostrar la tendencia');
                return;
            }
            
            chartModal.classList.add('open');
            createTrendsChart(weekData);
        }

        // Funci�n para ocultar el modal
        function hideModal() {
            chartModal.classList.remove('open');
            // Destruir la gr�fica existente si existe
            const existingChart = Chart.getChart('trendsChart');
            if (existingChart) {
                existingChart.destroy();
            }
        }

        // Funci�n para obtener datos de tendencias por rango de semanas
        function getWeeklyTrendsDataByRange(selectedFactory = 'all', selectedChartCustomers = []) {
            const weekFrom = parseInt(weekFromFilter.value);
            const weekTo = parseInt(weekToFilter.value);
            const period = (periodSelect && periodSelect.value) ? periodSelect.value : 'Sem';
            
            console.log(`Getting trends data from week ${weekFrom} to ${weekTo} for factory:`, selectedFactory);
            
            // Validar que el rango sea v�lido
            if (!weekFrom || !weekTo || weekFrom > weekTo) {
                console.error('Invalid week range');
                return [];
            }
            
            // Obtener todas las semanas/meses disponibles en el rango
            let available = [];
            if (allWeeks && allWeeks.length > 0) {
                available = allWeeks.filter(v => {
                    const n = parseInt(v,10);
                    return n >= weekFrom && n <= weekTo;
                }).sort((a,b)=>parseInt(a)-parseInt(b));
            } else {
                // Fallback sample
                if (period === 'Mes') {
                    available = ['7','8','9','10','11','12'].filter(v => parseInt(v) >= weekFrom && parseInt(v) <= weekTo);
                } else {
                    const sampleWeeks = ['41','43','44','45','46','47'];
                    available = sampleWeeks.filter(v => parseInt(v) >= weekFrom && parseInt(v) <= weekTo);
                }
            }

            console.log('Range available values:', available);

            const weeksData = [];

            if (period === 'Mes') {
                // available contains month numbers as strings (1..12)
                available.forEach(m => {
                    const monthNum = parseInt(m,10);
                    const label = monthNameES(monthNum - 1);
                    const defects = getTotalDefectsForMonth(monthNum, selectedFactory, selectedChartCustomers);
                    const bap = getBAPForMonth(monthNum, selectedFactory, selectedChartCustomers);
                    weeksData.push({ week: label, defects: defects, bap: bap });
                });
            } else {
                available.forEach(week => {
                    const weekNumber = parseInt(week,10);
                    const weekName = `SEM${week}`;
                    const weekDefects = getTotalDefectsForWeek(weekNumber, selectedFactory, selectedChartCustomers);
                    const weekBAP = getBAPForWeek(weekNumber, selectedFactory, selectedChartCustomers);
                    weeksData.push({ week: weekName, defects: weekDefects, bap: weekBAP });
                });
            }
            
            console.log('Range data for', selectedFactory, ':', weeksData);
            return weeksData;
        }

        // Funci�n para obtener los datos de tendencias de las �ltimas 6 semanas
        function getWeeklyTrendsData(selectedFactory = 'all') {
            console.log('Getting weekly trends data for factory:', selectedFactory);
            console.log('Available weeks:', allWeeks);
            
            // Si no hay semanas disponibles, usar semanas de ejemplo
            if (!allWeeks || allWeeks.length === 0) {
                console.log('No weeks available, using sample weeks');
                const sampleWeeks = ['41', '43', '44', '45', '46', '47'];
                const weeksData = [];
                
                sampleWeeks.forEach(week => {
                    const weekNumber = parseInt(week);
                    const weekName = `SEM${week}`;
                    const weekDefects = getTotalDefectsForWeek(weekNumber, selectedFactory, getSelectedChartCustomers());
                    const weekBAP = getBAPForWeek(weekNumber, selectedFactory, getSelectedChartCustomers());
                    
                    console.log(`Week ${week}: defects=${weekDefects}, BAP=${weekBAP}`);
                    
                    weeksData.push({
                        week: weekName,
                        defects: weekDefects,
                        bap: weekBAP
                    });
                });
                
                console.log('Sample weeks data:', weeksData);
                return weeksData;
            }
            
            // Obtener las �ltimas 6 semanas disponibles en los datos
            const lastSixWeeks = allWeeks.slice(-6);
            const weeksData = [];
            
            lastSixWeeks.forEach(week => {
                const weekNumber = parseInt(week);
                const weekName = `SEM${week}`;
                
                // Buscar datos para esta semana y factory
                const weekDefects = getTotalDefectsForWeek(weekNumber, selectedFactory, getSelectedChartCustomers());
                const weekBAP = getBAPForWeek(weekNumber, selectedFactory, getSelectedChartCustomers());
                
                weeksData.push({
                    week: weekName,
                    defects: weekDefects,
                    bap: weekBAP
                });
            });
            
            console.log('Real weeks data for', selectedFactory, ':', weeksData);
            return weeksData;
        }

        // Funci�n para obtener el n�mero de semana actual
        function getCurrentWeek() {
            const now = new Date();
            const start = new Date(now.getFullYear(), 0, 1);
            const diff = now - start;
            const oneWeek = 1000 * 60 * 60 * 24 * 7;
            return Math.ceil(diff / oneWeek);
        }

        // Funci�n para obtener el porcentaje BAP (A1) de una semana espec�fica
        function getBAPForWeek(weekNumber, selectedFactory = 'all') {
            console.log('=== Getting BAP data for week:', weekNumber, 'factory:', selectedFactory, '===');
            
            // Calcular BAP a partir de la columna 'Intento'
            // Numerador: conteo de filas donde Intento == 1
            // Denominador: conteo de filas donde Intento tiene dato (no vac�o)
            const weekStr = weekNumber.toString();

            // Si no hay datos cargados, usar datos de ejemplo como fallback
            if (!gridData || gridData.length === 0) {
                console.log('No gridData available, using sample BAP data');
                const sampleBAPData = {
                    '41': 0,
                    '43': 77,
                    '44': 78,
                    '45': 85,
                    '46': 84,
                    '47': 89
                };
                const sampleResult = sampleBAPData[weekStr] || 0;
                console.log(`Sample BAP for week ${weekNumber}:`, sampleResult);
                return sampleResult;
            }

            // Filtrar filas por semana, tipo y factory (misma l�gica que getTotalDefectsForWeek)
            const selectedChartCustomers = arguments.length > 2 && Array.isArray(arguments[2]) ? arguments[2] : [];
            const rows = gridData.filter(row => {
                let matchesWeek = false;
                if (row._auditISOWeek !== undefined && row._auditISOWeek !== null) {
                    matchesWeek = String(row._auditISOWeek) === weekStr;
                } else if (row.Week) {
                    matchesWeek = String(row.Week) === weekStr;
                }
                const matchesType = (row.Tipo === 'INTERNA' || !row.Tipo);
                const matchesFactory = selectedFactory === 'all' || row['Factory Code'] === selectedFactory;
                const matchesCustomer = (!selectedChartCustomers || selectedChartCustomers.length === 0) || selectedChartCustomers.includes(row['Customer']);
                return matchesWeek && matchesType && matchesFactory && matchesCustomer;
            });

            console.log(`Week ${weekStr}, Factory ${selectedFactory} filtered rows for BAP:`, rows.length);

            if (rows.length === 0) {
                console.log('No rows for week', weekStr, 'using sample BAP fallback');
                const sampleBAPData = {
                    '41': 0,
                    '43': 77,
                    '44': 78,
                    '45': 85,
                    '46': 84,
                    '47': 89
                };
                return sampleBAPData[weekStr] || 0;
            }

            let intentoOnes = 0;
            let intentoAny = 0;

            rows.forEach(r => {
                const intentoRaw = r['Intento'];
                // Considerar que 'tener dato' significa distinto de '', null o undefined
                if (intentoRaw !== '' && intentoRaw !== null && intentoRaw !== undefined) {
                    intentoAny++;
                    const intentoNum = parseInt(String(intentoRaw).trim());
                    if (!isNaN(intentoNum) && intentoNum === 1) {
                        intentoOnes++;
                    }
                }
            });

            console.log(`Intento counts for week ${weekStr}: ones=${intentoOnes}, any=${intentoAny}`);

            if (intentoAny === 0) return 0;

            const bap = (intentoOnes / intentoAny) * 100;
            // Devolver sin decimales (entero)
            const rounded = Math.round(bap);
            console.log(`Calculated BAP for week ${weekStr}:`, rounded);
            return rounded;
        }

        // Funci�n para obtener el porcentaje de defectuosos de la fila DEFECTUOSO para una semana espec�fica
        function getTotalDefectsForWeek(weekNumber, selectedFactory = 'all') {
            console.log('Getting defects data for week:', weekNumber, 'factory:', selectedFactory);
            
            // Si no hay datos cargados, usar los datos de ejemplo
            if (!gridData || gridData.length === 0) {
                console.log('No gridData available, using sample data');
                // Datos de ejemplo basados en los valores reales que proporcionaste
                const sampleData = {
                    '41': 8.00,
                    '43': 5.28,
                    '44': 3.87,
                    '45': 3.77,
                    '46': 3.00,
                    '47': 3.74
                };
                return sampleData[weekNumber.toString()] || 0;
            }
            
            // Filtrar datos por semana y factory
            const weekStr = weekNumber.toString();
            const selectedChartCustomers = arguments.length > 2 && Array.isArray(arguments[2]) ? arguments[2] : [];
            const weekData = gridData.filter(row => {
                // Asegurarse de que la semana coincida, que sea de tipo INTERNA y del factory seleccionado
                let matchesWeek = false;
                if (row._auditISOWeek !== undefined && row._auditISOWeek !== null) {
                    matchesWeek = String(row._auditISOWeek) === weekStr;
                } else if (row.Week) {
                    matchesWeek = String(row.Week) === weekStr;
                }
                const matchesType = (row.Tipo === 'INTERNA' || !row.Tipo);
                const matchesFactory = selectedFactory === 'all' || row['Factory Code'] === selectedFactory;
                const matchesCustomer = (!selectedChartCustomers || selectedChartCustomers.length === 0) || selectedChartCustomers.includes(row['Customer']);
                return matchesWeek && matchesType && matchesFactory && matchesCustomer;
            });
            
            console.log(`Week ${weekStr}, Factory ${selectedFactory} filtered data:`, weekData.length, 'rows');
            
            if (weekData.length === 0) {
                console.log('No data for week', weekStr, 'using sample data');
                // Fallback a datos de ejemplo si no hay datos reales
                const sampleData = {
                    '41': 8.00,
                    '43': 5.28,
                    '44': 3.87,
                    '45': 3.77,
                    '46': 3.00,
                    '47': 3.74
                };
                return sampleData[weekStr] || 0;
            }
            
            // Calcular el porcentaje DEFECTUOSO para esta semana
            let totalDefects = 0;
            let totalSampleSize = 0;
            
            weekData.forEach(row => {
                // Intentar diferentes nombres de columnas que podr�an existir
                const defects = parseFloat(row['Tot. Def.']) || 
                               parseFloat(row['Tot.    Def.']) || 
                               parseFloat(row['Tot Def']) || 0;
                
                const sampleSize = parseFloat(row['Sample Size']) || 
                                  parseFloat(row['Sample    Size']) || 
                                  parseFloat(row['SampleSize']) || 0;
                
                totalDefects += defects;
                totalSampleSize += sampleSize;
                
                console.log(`Row data: defects=${defects}, sampleSize=${sampleSize}`);
            });
            
            console.log(`Week ${weekStr} totals: defects=${totalDefects}, sampleSize=${totalSampleSize}`);
            
            // Calcular el porcentaje
            const defectivePercentage = totalSampleSize > 0 ? 
                (totalDefects / totalSampleSize * 100) : 0;
            
            console.log(`Week ${weekStr} calculated percentage: ${defectivePercentage.toFixed(2)}%`);
            
            // Retornar el porcentaje con 2 decimales
            return Math.round(defectivePercentage * 100) / 100;
        }

        // Funci�n para obtener datos por mes (mesNumber 1..12)
        function getTotalDefectsForMonth(monthNumber, selectedFactory = 'all') {
            console.log('Getting defects data for month:', monthNumber, 'factory:', selectedFactory);
            const monthIndex = parseInt(monthNumber,10) - 1; // 0..11

            if (!gridData || gridData.length === 0) {
                console.log('No gridData available, using sample month data');
                // Fallback simple sample percentages (placeholder)
                const sample = {7:3.71,8:2.91,9:3.16,10:4.22,11:4.22,12:3.01};
                return sample[monthNumber] || 0;
            }

            const selectedChartCustomers = arguments.length > 2 && Array.isArray(arguments[2]) ? arguments[2] : [];
            const rows = gridData.filter(row => {
                let matchesMonth = false;
                if (row._auditMonth !== undefined && row._auditMonth !== null) {
                    matchesMonth = Number(row._auditMonth) === monthIndex;
                } else if (row['Audit Date']) {
                    const dt = parseDateFromString(row['Audit Date']);
                    if (dt && !isNaN(dt.getTime())) matchesMonth = dt.getMonth() === monthIndex;
                }
                const matchesType = (row.Tipo === 'INTERNA' || !row.Tipo);
                const matchesFactory = selectedFactory === 'all' || row['Factory Code'] === selectedFactory;
                const matchesCustomer = (!selectedChartCustomers || selectedChartCustomers.length === 0) || selectedChartCustomers.includes(row['Customer']);
                return matchesMonth && matchesType && matchesFactory && matchesCustomer;
            });

            if (!rows || rows.length === 0) {
                console.log('No rows for month', monthNumber, 'using sample fallback');
                const sample = {7:3.71,8:2.91,9:3.16,10:4.22,11:4.22,12:3.01};
                return sample[monthNumber] || 0;
            }

            let totalDefects = 0;
            let totalSampleSize = 0;
            rows.forEach(row => {
                const defects = parseFloat(row['Tot. Def.']) || parseFloat(row['Tot.    Def.']) || parseFloat(row['Tot Def']) || 0;
                const sampleSize = parseFloat(row['Sample Size']) || parseFloat(row['Sample    Size']) || parseFloat(row['SampleSize']) || 0;
                totalDefects += defects;
                totalSampleSize += sampleSize;
            });

            const defectivePercentage = totalSampleSize > 0 ? (totalDefects / totalSampleSize * 100) : 0;
            return Math.round(defectivePercentage * 100) / 100;
        }

        // Funci�n para obtener BAP por mes (mesNumber 1..12)
        function getBAPForMonth(monthNumber, selectedFactory = 'all') {
            console.log('Getting BAP data for month:', monthNumber, 'factory:', selectedFactory);
            const monthIndex = parseInt(monthNumber,10) - 1;

            if (!gridData || gridData.length === 0) {
                const sampleBAP = {7:86,8:84,9:89,10:86,11:68,12:80};
                return sampleBAP[monthNumber] || 0;
            }

            const selectedChartCustomers = arguments.length > 2 && Array.isArray(arguments[2]) ? arguments[2] : [];
            const rows = gridData.filter(row => {
                let matchesMonth = false;
                if (row._auditMonth !== undefined && row._auditMonth !== null) {
                    matchesMonth = Number(row._auditMonth) === monthIndex;
                } else if (row['Audit Date']) {
                    const dt = parseDateFromString(row['Audit Date']);
                    if (dt && !isNaN(dt.getTime())) matchesMonth = dt.getMonth() === monthIndex;
                }
                const matchesType = (row.Tipo === 'INTERNA' || !row.Tipo);
                const matchesFactory = selectedFactory === 'all' || row['Factory Code'] === selectedFactory;
                const matchesCustomer = (!selectedChartCustomers || selectedChartCustomers.length === 0) || selectedChartCustomers.includes(row['Customer']);
                return matchesMonth && matchesType && matchesFactory && matchesCustomer;
            });

            if (!rows || rows.length === 0) {
                const sampleBAP = {7:86,8:84,9:89,10:86,11:68,12:80};
                return sampleBAP[monthNumber] || 0;
            }

            let intentoOnes = 0;
            let intentoAny = 0;
            rows.forEach(r => {
                const intentoRaw = r['Intento'];
                if (intentoRaw !== '' && intentoRaw !== null && intentoRaw !== undefined) {
                    intentoAny++;
                    const intentoNum = parseInt(String(intentoRaw).trim());
                    if (!isNaN(intentoNum) && intentoNum === 1) intentoOnes++;
                }
            });
            if (intentoAny === 0) return 0;
            const bap = (intentoOnes / intentoAny) * 100;
            return Math.round(bap);
        }

        // Funci�n para crear la gr�fica de tendencias
        function createTrendsChart(data) {
            console.log('Creating chart with data:', data);
            console.log('BAP data array:', data.map(item => item.bap));
            
            // Usar los valores BAP calculados din�micamente de los datos
            const bapValues = data.map(item => item.bap);
            console.log('Dynamic BAP values:', bapValues);
            
            // Calcular el m�ximo valor de % Defectuosos para ajustar el eje Y
            const defectValues = data.map(item => item.defects);
            const maxDefectValue = Math.max(...defectValues);
            let yAxisMax = Math.ceil(maxDefectValue * 1.2); // Agregar 20% de padding arriba
            if (yAxisMax < 3) yAxisMax = 3; // Asegurar que la META %Def 2% sea visible con espacio
            console.log('Max defect value:', maxDefectValue, 'Y-axis max:', yAxisMax);
            
            const ctx = document.getElementById('trendsChart').getContext('2d');
            
            // Destruir gr�fica existente si existe
            const existingChart = Chart.getChart(ctx);
            if (existingChart) {
                existingChart.destroy();
            }
            
            new Chart(ctx, {
                type: 'bar',
                plugins: [ChartDataLabels],
                data: {
                    labels: data.map(item => item.week),
                    datasets: [{
                        label: '% Defectuosos',
                        data: data.map(item => item.defects),
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
                    }, {
                        label: 'BAP (%)',
                        data: bapValues,
                        backgroundColor: 'rgba(74, 144, 226, 0.8)',
                        borderColor: '#4A90E2',
                        borderWidth: 2,
                        type: 'bar',
                        yAxisID: 'y1',
                        order: 2
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: true,
                            position: 'bottom'
                        },
                        tooltip: {
                            mode: 'index',
                            intersect: false,
                            callbacks: {
                                label: function(context) {
                                    if (context.datasetIndex === 0) {
                                        return `${context.dataset.label}: ${context.parsed.y.toFixed(2)}%`;
                                    } else {
                                        return `${context.dataset.label}: ${context.parsed.y}%`;
                                    }
                                }
                            }
                        },
                        annotation: {
                            annotations: {
                                metaDef: {
                                    type: 'line',
                                    yMin: 2,
                                    yMax: 2,
                                    yScaleID: 'y',
                                    borderColor: 'rgba(255, 0, 0, 0.8)',
                                    borderWidth: 2,
                                    borderDash: [6, 4],
                                    label: {
                                        display: true,
                                        content: 'META %Def 2%',
                                        position: 'start',
                                        backgroundColor: 'transparent',
                                        color: 'red',
                                        font: {
                                            size: 12,
                                            weight: 'bold'
                                        },
                                        yAdjust: 14,
                                        padding: 4
                                    }
                                },
                                metaBap: {
                                    type: 'line',
                                    yMin: 95,
                                    yMax: 95,
                                    yScaleID: 'y1',
                                    borderColor: 'rgba(0, 0, 200, 0.8)',
                                    borderWidth: 2,
                                    borderDash: [6, 4],
                                    label: {
                                        display: true,
                                        content: 'META BAP 95%',
                                        position: 'end',
                                        backgroundColor: 'transparent',
                                        color: 'blue',
                                        font: {
                                            size: 12,
                                            weight: 'bold'
                                        },
                                        yAdjust: -14,
                                        padding: 4
                                    }
                                }
                            }
                        },
                        datalabels: {
                            display: true, // Mostrar etiquetas en ambos datasets
                            color: function(context) {
                                return context.datasetIndex === 0 ? '#000000' : '#003d82'; // Negro para l�nea, azul oscuro para barras
                            },
                            font: {
                                family: 'Calibri',
                                size: 16,
                                weight: 'bold'
                            },
                            formatter: function(value, context) {
                                if (context.datasetIndex === 0) {
                                    return value.toFixed(2) + '%';
                                }
                                return value + '%'; // Para BAP
                            },
                            anchor: function(context) {
                                return context.datasetIndex === 0 ? 'end' : 'end'; // L�nea: end, Barras: end
                            },
                            align: function(context) {
                                return context.datasetIndex === 0 ? 'bottom' : 'top'; // L�nea: debajo, Barras: arriba
                            },
                            offset: 8
                        }
                    },
                    scales: {
                        x: {
                            title: {
                                display: false,
                                text: 'Semanas',
                                font: {
                                    size: 14,
                                    weight: 'bold'
                                }
                            },
                            grid: {
                                display: true,
                                color: 'rgba(0, 0, 0, 0.1)'
                            }
                        },
                        y: {
                            type: 'linear',
                            display: true,
                            position: 'left',
                            title: {
                                display: true,
                                text: '% Defectuosos',
                                font: {
                                    size: 14,
                                    weight: 'bold'
                                }
                            },
                            beginAtZero: true,
                            max: yAxisMax,
                            grid: {
                                display: true,
                                color: 'rgba(0, 0, 0, 0.1)'
                            },
                            ticks: {
                                callback: function(value) {
                                    return value.toFixed(2) + '%';
                                },
                                stepSize: 0.5
                            }
                        },
                        y1: {
                            type: 'linear',
                            display: true,
                            position: 'right',
                            title: {
                                display: true,
                                text: 'BAP (%)',
                                font: {
                                    size: 14,
                                    weight: 'bold'
                                }
                            },
                            min: 0,
                            max: 105,
                            grid: {
                                drawOnChartArea: false,
                            },
                            ticks: {
                                stepSize: 10,
                                callback: function(value) {
                                    return value + '%';
                                }
                            }
                        }
                    },
                    interaction: {
                        mode: 'nearest',
                        axis: 'x',
                        intersect: false
                    },
                    elements: {
                        point: {
                            hoverRadius: 10
                        }
                    }
                }
            });
        }

        function downloadExcel() {
            if (!currentInternaData.length && !currentClienteData.length) {
                alert('No hay datos para descargar');
                return;
            }

            const wb = XLSX.utils.book_new();
            
            // Crear hoja INTERNA con estilos
            createStyledSheet(wb, 'internaTable', 'INTERNA');
            
            // Crear hoja CLIENTE con estilos
            createStyledSheet(wb, 'clienteTable', 'CLIENTE');
            
            // Descargar archivo
            const selectedWeek = weekSelect.value || 'resumen';
            XLSX.writeFile(wb, `Resumen_Auditoria_Week_${selectedWeek}.xlsx`);
        }

        function createStyledSheet(wb, tableId, sheetName) {
            const table = document.getElementById(tableId);
            const ws = XLSX.utils.table_to_sheet(table);
            
            // Obtener el rango de la hoja
            let range = XLSX.utils.decode_range(ws['!ref']);
            
            // Asegurar que el rango incluya todas las columnas necesarias
            // Para INTERNA: hasta columna Y (�ndice 24), para CLIENTE: hasta U (�ndice 20)
            const maxCol = sheetName === 'INTERNA' ? 24 : 20;
            if (range.e.c < maxCol) {
                range.e.c = maxCol;
                ws['!ref'] = XLSX.utils.encode_range(range);
            }
            
            // Estilos base
            const headerStyle = {
                fill: { fgColor: { rgb: "4472C4" } },
                font: { bold: true, color: { rgb: "FFFFFF" }, sz: 11 },
                alignment: { horizontal: "center", vertical: "center", wrapText: true },
                border: {
                    top: { style: "thin", color: { rgb: "000000" } },
                    bottom: { style: "thin", color: { rgb: "000000" } },
                    left: { style: "thin", color: { rgb: "000000" } },
                    right: { style: "thin", color: { rgb: "000000" } }
                }
            };

            const cellStyle = {
                alignment: { horizontal: "center", vertical: "center" },
                border: {
                    top: { style: "thin", color: { rgb: "000000" } },
                    bottom: { style: "thin", color: { rgb: "000000" } },
                    left: { style: "thin", color: { rgb: "000000" } },
                    right: { style: "thin", color: { rgb: "000000" } }
                }
            };

            const subtotalStyle = {
                fill: { fgColor: { rgb: "C6EFCE" } },
                font: { bold: true },
                alignment: { horizontal: "center", vertical: "center" },
                border: {
                    top: { style: "thin", color: { rgb: "000000" } },
                    bottom: { style: "thin", color: { rgb: "000000" } },
                    left: { style: "thin", color: { rgb: "000000" } },
                    right: { style: "thin", color: { rgb: "000000" } }
                }
            };

            const totalStyle = {
                fill: { fgColor: { rgb: "D9D9D9" } },
                font: { bold: true },
                alignment: { horizontal: "center", vertical: "center" },
                border: {
                    top: { style: "thin", color: { rgb: "000000" } },
                    bottom: { style: "thin", color: { rgb: "000000" } },
                    left: { style: "thin", color: { rgb: "000000" } },
                    right: { style: "thin", color: { rgb: "000000" } }
                }
            };
            
            // PRIMERO: Crear todas las celdas del rango con bordes
            for (let R = range.s.r; R <= range.e.r; ++R) {
                for (let C = range.s.c; C <= range.e.c; ++C) {
                    const cellAddress = XLSX.utils.encode_cell({ r: R, c: C });
                    if (!ws[cellAddress]) {
                        ws[cellAddress] = { v: '', t: 's' };
                    }
                    // Aplicar estilo base con bordes a todas las celdas
                    ws[cellAddress].s = JSON.parse(JSON.stringify(cellStyle));
                }
            }

            // Aplicar estilos a las celdas
            for (let R = range.s.r; R <= range.e.r; ++R) {
                for (let C = range.s.c; C <= range.e.c; ++C) {
                    const cellAddress = XLSX.utils.encode_cell({ r: R, c: C });
                    
                    const cellValue = ws[cellAddress].v;
                    
                    // Estilos para encabezados (primera fila)
                    if (R === 0) {
                        ws[cellAddress].s = headerStyle;
                    } else {
                        // Detectar filas especiales
                        if (C === 0 && typeof cellValue === 'string') {
                            if (cellValue.startsWith('Total ')) {
                                // Fila de subtotal
                                for (let col = 0; col <= range.e.c; col++) {
                                    const addr = XLSX.utils.encode_cell({ r: R, c: col });
                                    ws[addr].s = JSON.parse(JSON.stringify(subtotalStyle));
                                }
                            } else if (cellValue === 'Total general') {
                                // Fila Total general
                                for (let col = 0; col <= range.e.c; col++) {
                                    const addr = XLSX.utils.encode_cell({ r: R, c: col });
                                    ws[addr].s = JSON.parse(JSON.stringify(totalStyle));
                                }
                            } else if (cellValue === 'DEFECTUOSO') {
                                // Fila DEFECTUOSO - aplicar formato porcentaje con 2 decimales desde columna E (�ndice 4) hasta T (�ndice 19)
                                for (let col = 0; col <= range.e.c; col++) {
                                    const addr = XLSX.utils.encode_cell({ r: R, c: col });
                                    ws[addr].s = JSON.parse(JSON.stringify(totalStyle));
                                    // Aplicar formato porcentaje con 2 decimales solo desde columna E (4) hasta T (19)
                                    if (col >= 4 && col <= 19) {
                                        let cellVal = ws[addr].v !== undefined ? ws[addr].v : 0;
                                        // Convertir tanto strings como n�meros
                                        if (typeof cellVal === 'string') {
                                            // Si tiene %, quitar el s�mbolo
                                            cellVal = cellVal.replace('%', '').trim();
                                        }
                                        // Convertir a n�mero
                                        let numValue = parseFloat(cellVal);
                                        if (isNaN(numValue)) numValue = 0;
                                        ws[addr].v = numValue;
                                        ws[addr].t = 'n';
                                        ws[addr].s.numFmt = '0.00%';
                                    }
                                    // Para INTERNA: Columna V (�ndice 21) - formato % sin decimales
                                    else if (col === 21 && sheetName === 'INTERNA') {
                                        let cellVal = ws[addr].v !== undefined ? ws[addr].v : 0;
                                        if (typeof cellVal === 'string') {
                                            cellVal = cellVal.replace('%', '').trim();
                                        }
                                        let numValue = parseFloat(cellVal);
                                        if (isNaN(numValue)) numValue = 0;
                                        ws[addr].v = numValue;
                                        ws[addr].t = 'n';
                                        ws[addr].s.numFmt = '0%';
                                    }
                                }
                            }
                        } else if (R > 0) {
                            // Detectar la �ltima fila (siguiente despu�s de DEFECTUOSO)
                            const prevRowFirstCell = XLSX.utils.encode_cell({ r: R - 1, c: 0 });
                            if (ws[prevRowFirstCell] && ws[prevRowFirstCell].v === 'DEFECTUOSO') {
                                // �ltima fila - formato porcentaje sin decimales desde columna D (�ndice 3) hasta T (�ndice 19)
                                for (let col = 0; col <= range.e.c; col++) {
                                    const addr = XLSX.utils.encode_cell({ r: R, c: col });
                                    // Aplicar formato porcentaje sin decimales solo desde columna D (3) hasta T (19)
                                    if (col >= 3 && col <= 19) {
                                        let cellVal = ws[addr].v !== undefined ? ws[addr].v : 0;
                                        // Convertir tanto strings como n�meros
                                        if (typeof cellVal === 'string') {
                                            // Si tiene %, quitar el s�mbolo
                                            cellVal = cellVal.replace('%', '').trim();
                                        }
                                        // Convertir a n�mero
                                        let numValue = parseFloat(cellVal);
                                        if (isNaN(numValue)) numValue = 0;
                                        ws[addr].v = numValue;
                                        ws[addr].t = 'n';
                                        ws[addr].s.numFmt = '0%';
                                    }
                                    // Para INTERNA: Columna V (�ndice 21) - formato % sin decimales
                                    else if (col === 21 && sheetName === 'INTERNA') {
                                        let cellVal = ws[addr].v !== undefined ? ws[addr].v : 0;
                                        if (typeof cellVal === 'string') {
                                            cellVal = cellVal.replace('%', '').trim();
                                        }
                                        let numValue = parseFloat(cellVal);
                                        if (isNaN(numValue)) numValue = 0;
                                        ws[addr].v = numValue;
                                        ws[addr].t = 'n';
                                        ws[addr].s.numFmt = '0%';
                                    }
                                }
                            }
                        }
                        
                        
                        // Hacer que los ceros tengan color blanco en filas de datos normales (no totales, no DEFECTUOSO) columnas E a Y (�ndices 4 a 24)
                        const firstCellAddr = XLSX.utils.encode_cell({ r: R, c: 0 });
                        const firstCellValue = ws[firstCellAddr] ? ws[firstCellAddr].v : '';
                        const isDataRow = firstCellValue && 
                                         typeof firstCellValue === 'string' && 
                                         !firstCellValue.startsWith('Total') && 
                                         firstCellValue !== 'Total general' && 
                                         firstCellValue !== 'DEFECTUOSO';
                        
                        if (isDataRow && C >= 4 && C <= 24) {
                            if (ws[cellAddress].v === 0 || ws[cellAddress].v === '0') {
                                // En lugar de eliminar el contenido, poner el texto en color blanco
                                if (!ws[cellAddress].s.font) {
                                    ws[cellAddress].s.font = {};
                                }
                                ws[cellAddress].s.font.color = { rgb: "FFFFFF" };
                            }
                        }
                    }
                }
            }
            
            // Ajustar anchos de columna
            const colWidths = [];
            // Definir columnas especiales con ancho 7.33: D(3), G(6), J(9), K(10), L(11), M(12), N(13), P(15), R(17), U(20)
            const colsWith733 = [3, 6, 9, 10, 11, 12, 13, 15, 17, 20];
            
            for (let C = 0; C <= range.e.c; ++C) {
                if (C < 2) {
                    colWidths.push({ wch: 15 }); // Factory Code y Customer
                } else if (colsWith733.includes(C)) {
                    colWidths.push({ wch: 7.33 }); // Columnas D, G, J, K, L, M, N, P, R, U
                } else if (C >= 2 && C <= 20) {
                    colWidths.push({ wch: 6 }); // Resto de columnas C a U (�ndices 2 a 20)
                } else if (C >= 21 && C <= 24 && sheetName === 'INTERNA') {
                    colWidths.push({ wch: 4.5 }); // Columnas V, W, X, Y (�ndices 21-24) solo para INTERNA
                } else {
                    colWidths.push({ wch: 12 }); // Resto
                }
            }
            ws['!cols'] = colWidths;
            
            // Para CLIENTE: eliminar columnas V, W, X (�ndices 21, 22, 23)
            if (sheetName === 'CLIENTE') {
                // Eliminar celdas de las columnas V, W, X
                for (let R = range.s.r; R <= range.e.r; ++R) {
                    for (let C = 21; C <= 23; ++C) {
                        const cellAddress = XLSX.utils.encode_cell({ r: R, c: C });
                        delete ws[cellAddress];
                    }
                }
                // Ajustar el rango para terminar en columna U (�ndice 20)
                range.e.c = 20;
                ws['!ref'] = XLSX.utils.encode_range(range);
                // Ajustar anchos de columna
                ws['!cols'] = colWidths.slice(0, 21);
            }
            
            XLSX.utils.book_append_sheet(wb, ws, sheetName);
        }

        // Initialize the application by loading data from Google Sheets
        function initializeApp() {
            updateLoadingStatus('Cargando datos desde Google Sheets...', 'loading');
            btnDownload.disabled = true; // Asegurar que est� deshabilitado durante la carga
            btnChart.disabled = true; // Asegurar que est� deshabilitado durante la carga
            
            loadSheetJSONP(SHEET_ID, SHEET_NAME)
                .then(data => {
                    if (!Array.isArray(data)) {
                        throw new Error('Los datos recibidos no tienen el formato esperado.');
                    }
                    
                    if (data.length === 0) {
                        throw new Error('La hoja de c�lculo est� vac�a o no contiene datos.');
                    }
                    
                    processSheetData(data);
                })
                .catch(error => {
                    console.error('Error al cargar datos:', error);
                    updateLoadingStatus('Error al cargar datos: ' + error.message, 'error');
                    showError('No se pudieron cargar los datos desde Google Sheets. Verifique que la hoja sea p�blica y tenga el nombre correcto.');
                    btnDownload.disabled = true; // Mantener deshabilitado en caso de error
                    btnChart.disabled = true; // Mantener deshabilitado en caso de error
                });
        }

        // Start the application when the page loads
        __ready(initializeApp);

        // ===== Fin del script original =====

        // Exponer en window las funciones usadas por handlers inline (si las hay)
        [].forEach(function (__n) { try { window[__n] = eval(__n); } catch (__e) {} });
    }

    App.registerView('factory-code', { title: 'Resumen de Auditoria por Factory Code', mount: mount });
})();
