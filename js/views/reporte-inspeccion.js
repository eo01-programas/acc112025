/* ============================================================
   views/reporte-inspeccion.js - Vista "Reporte Inspeccion" (SPA)
   Migrado desde REPORTE INSPECCION.html. Logica y marcado originales: el <script> se
   ejecuta dentro de mount() (tras inyectar el template) para que el
   DOM exista, igual que cuando el <script> estaba al final del body.
   Arranques diferidos (DOMContentLoaded / ready) -> ejecucion inmediata.
   ============================================================ */
(function () {
    var TEMPLATE = "\u003cdiv class=\"container\"\u003e\r\n\r\n    \u003cdiv style=\"display: flex; align-items: center; justify-content: space-between; margin-bottom: 2px; gap: 16px;\"\u003e\r\n        \u003cdiv style=\"display: flex; flex-direction: column; align-items: stretch; gap: 6px;\"\u003e\r\n            \u003cdiv style=\"display: flex; align-items: center; gap: 8px; flex-wrap:nowrap;\"\u003e\r\n                \u003ch1 style=\"text-align: left; margin: 0; font-size: 26px; letter-spacing: 0.03em; white-space:nowrap;\"\u003eREPORTE INSPECCION\u003c/h1\u003e\r\n\r\n                \u003cdiv id=\"filters\" style=\"display: flex; align-items: center; gap: 8px; margin-left: 12px; flex-wrap: wrap;\"\u003e\r\n                    \u003cdiv class=\"labelframe\"\u003e\r\n                        \u003cspan class=\"labelframe-title\"\u003eAño:\u003c/span\u003e\r\n                        \u003cdiv class=\"labelframe-content\"\u003e\r\n                            \u003cselect id=\"filterYear\" style=\"min-width: 70px;\"\u003e\u003c/select\u003e\r\n                        \u003c/div\u003e\r\n                    \u003c/div\u003e\r\n                    \u003cdiv class=\"labelframe\"\u003e\r\n                        \u003cspan class=\"labelframe-title\"\u003ePeriodo:\u003c/span\u003e\r\n                        \u003cdiv class=\"labelframe-content\" style=\"gap: 4px; flex-wrap: nowrap;\"\u003e\r\n                            \u003cselect id=\"filterGroupBy\" style=\"min-width: 80px;\"\u003e\r\n                                \u003coption value=\"SEMANA\"\u003eSEM\u003c/option\u003e\r\n                                \u003coption value=\"MES\"\u003eMES\u003c/option\u003e\r\n                            \u003c/select\u003e\r\n                            \u003cselect id=\"filterPeriodSelect\" style=\"min-width: 90px;\"\u003e\u003c/select\u003e\r\n                        \u003c/div\u003e\r\n                    \u003c/div\u003e\r\n                    \u003cdiv class=\"labelframe\"\u003e\r\n                        \u003cspan class=\"labelframe-title\"\u003eLínea:\u003c/span\u003e\r\n                        \u003cdiv class=\"labelframe-content\"\u003e\r\n                            \u003cselect id=\"filterLinea\" style=\"min-width: 90px;\"\u003e\r\n                                \u003coption value=\"\"\u003e(todas)\u003c/option\u003e\r\n                            \u003c/select\u003e\r\n                        \u003c/div\u003e\r\n                    \u003c/div\u003e\r\n                \u003c/div\u003e\r\n            \u003c/div\u003e\r\n        \u003c/div\u003e\r\n        \u003cdiv class=\"top-actions\" style=\"display:flex; align-items:center; gap:10px;\"\u003e\r\n            \u003cbutton id=\"btnDefectosCircle\" class=\"btn-chart-circle\" title=\"Defectos Principales\"\u003e\r\n                \u003csvg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"currentColor\"\u003e\r\n                    \u003cpath d=\"M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z\"/\u003e\r\n                \u003c/svg\u003e\r\n            \u003c/button\u003e\r\n            \u003cbutton id=\"btnChartCircle\" class=\"btn-chart-circle\" title=\"Gráficos\"\u003e\r\n                \u003csvg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"currentColor\"\u003e\r\n                    \u003cpath d=\"M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z\"/\u003e\r\n                \u003c/svg\u003e\r\n            \u003c/button\u003e\r\n            \u003ca href=\"#/\" class=\"back-btn\" title=\"Inicio\"\u003e🏠\u003c/a\u003e\r\n            \u003cspan id=\"statusBadge\" class=\"badge badge-loading\"\u003eCargando datos desde Google Sheets…\u003c/span\u003e\r\n        \u003c/div\u003e\r\n    \u003c/div\u003e\r\n\r\n    \u003cdiv id=\"errorBanner\" class=\"error-banner\"\u003e\u003c/div\u003e\r\n\r\n    \u003cdiv id=\"resumenGlobal\" class=\"footer-summary hidden\"\u003e\r\n        \u003cdiv id=\"resumenGlobalLeft\" style=\"display:flex;gap:8px;align-items:center;\"\u003e\u003c/div\u003e\r\n    \u003c/div\u003e\r\n\r\n    \u003cdiv id=\"tableContainer\" class=\"table-wrapper hidden\"\u003e\r\n        \u003ctable id=\"tablaReporte\"\u003e\u003c/table\u003e\r\n    \u003c/div\u003e\r\n\r\n    \u003cdiv id=\"noData\" class=\"footer-summary hidden\"\u003e\r\n        \u003cspan\u003eNo se encontraron datos en la hoja bdcof.\u003c/span\u003e\r\n    \u003c/div\u003e\r\n\r\n    \u003c!-- Modal de Gráficos --\u003e\r\n    \u003cdiv id=\"chartsModalOverlay\" class=\"modal-overlay\"\u003e\r\n        \u003cdiv class=\"modal\"\u003e\r\n            \u003cheader\u003e\r\n                \u003ch3\u003e% DEFECTOS vs INGRESO A EMBALAJE\u003c/h3\u003e\r\n                \u003cbutton id=\"chartsModalClose\" class=\"close-btn\"\u003eCerrar\u003c/button\u003e\r\n            \u003c/header\u003e\r\n            \u003cdiv class=\"modal-body\"\u003e\r\n                \u003cdiv class=\"charts-controls\"\u003e\r\n                    \u003clabel\u003e\r\n                        Periodo:\r\n                        \u003cselect id=\"chartPeriodo\"\u003e\r\n                            \u003coption value=\"Semanal\"\u003eSemanal\u003c/option\u003e\r\n                            \u003coption value=\"Mensual\"\u003eMensual\u003c/option\u003e\r\n                        \u003c/select\u003e\r\n                    \u003c/label\u003e\r\n                    \u003clabel id=\"chartDesdeYearLabel\"\u003e\r\n                        Desde Año:\r\n                        \u003cselect id=\"chartDesdeYear\"\u003e\u003c/select\u003e\r\n                    \u003c/label\u003e\r\n                    \u003clabel id=\"chartDesdeWeekLabel\"\u003e\r\n                        Desde Semana:\r\n                        \u003cselect id=\"chartDesdeWeek\"\u003e\u003c/select\u003e\r\n                    \u003c/label\u003e\r\n                    \u003clabel id=\"chartHastaYearLabel\"\u003e\r\n                        Hasta Año:\r\n                        \u003cselect id=\"chartHastaYear\"\u003e\u003c/select\u003e\r\n                    \u003c/label\u003e\r\n                    \u003clabel id=\"chartHastaWeekLabel\"\u003e\r\n                        Hasta Semana:\r\n                        \u003cselect id=\"chartHastaWeek\"\u003e\u003c/select\u003e\r\n                    \u003c/label\u003e\r\n                    \u003clabel id=\"chartDesdeMonthLabel\" style=\"display:none;\"\u003e\r\n                        Desde Mes:\r\n                        \u003cselect id=\"chartDesdeMonth\"\u003e\u003c/select\u003e\r\n                    \u003c/label\u003e\r\n                    \u003clabel id=\"chartHastaMonthLabel\" style=\"display:none;\"\u003e\r\n                        Hasta Mes:\r\n                        \u003cselect id=\"chartHastaMonth\"\u003e\u003c/select\u003e\r\n                    \u003c/label\u003e\r\n                \u003c/div\u003e\r\n                \u003c!-- resumen numérico eliminado a petición --\u003e\r\n                \u003ccanvas id=\"chartsCanvas\"\u003e\u003c/canvas\u003e\r\n            \u003c/div\u003e\r\n        \u003c/div\u003e\r\n    \u003c/div\u003e\r\n\r\n    \u003c!-- Modal de Defectos Principales --\u003e\r\n    \u003cdiv id=\"defectosModalOverlay\" class=\"modal-overlay\"\u003e\r\n        \u003cdiv class=\"modal\"\u003e\r\n            \u003cheader\u003e\r\n                \u003ch3\u003ePRINCIPALES DEFECTOS - EVOLUCIÓN\u003c/h3\u003e\r\n                \u003cbutton id=\"defectosModalClose\" class=\"close-btn\"\u003eCerrar\u003c/button\u003e\r\n            \u003c/header\u003e\r\n            \u003cdiv class=\"modal-body\"\u003e\r\n                \u003cdiv class=\"charts-controls\"\u003e\r\n                    \u003clabel\u003e\r\n                        Periodo:\r\n                        \u003cselect id=\"defectosPeriodo\"\u003e\r\n                            \u003coption value=\"Semanal\"\u003eSemanal\u003c/option\u003e\r\n                            \u003coption value=\"Mensual\"\u003eMensual\u003c/option\u003e\r\n                        \u003c/select\u003e\r\n                    \u003c/label\u003e\r\n                    \u003clabel id=\"defectosDesdeYearLabel\"\u003e\r\n                        Desde Año:\r\n                        \u003cselect id=\"defectosDesdeYear\"\u003e\u003c/select\u003e\r\n                    \u003c/label\u003e\r\n                    \u003clabel id=\"defectosDesdeWeekLabel\"\u003e\r\n                        Desde Semana:\r\n                        \u003cselect id=\"defectosDesdeWeek\"\u003e\u003c/select\u003e\r\n                    \u003c/label\u003e\r\n                    \u003clabel id=\"defectosHastaYearLabel\"\u003e\r\n                        Hasta Año:\r\n                        \u003cselect id=\"defectosHastaYear\"\u003e\u003c/select\u003e\r\n                    \u003c/label\u003e\r\n                    \u003clabel id=\"defectosHastaWeekLabel\"\u003e\r\n                        Hasta Semana:\r\n                        \u003cselect id=\"defectosHastaWeek\"\u003e\u003c/select\u003e\r\n                    \u003c/label\u003e\r\n                    \u003clabel id=\"defectosDesdeMonthLabel\" style=\"display:none;\"\u003e\r\n                        Desde Mes:\r\n                        \u003cselect id=\"defectosDesdeMonth\"\u003e\u003c/select\u003e\r\n                    \u003c/label\u003e\r\n                    \u003clabel id=\"defectosHastaMonthLabel\" style=\"display:none;\"\u003e\r\n                        Hasta Mes:\r\n                        \u003cselect id=\"defectosHastaMonth\"\u003e\u003c/select\u003e\r\n                    \u003c/label\u003e\r\n                \u003c/div\u003e\r\n                \u003ccanvas id=\"defectosCanvas\"\u003e\u003c/canvas\u003e\r\n            \u003c/div\u003e\r\n        \u003c/div\u003e\r\n    \u003c/div\u003e\r\n\r\n\u003c/div\u003e\r\n";

    function mount(root) {
        root.innerHTML = TEMPLATE;
        // Botón Inicio: ícono de casa en blanco (mismo estilo SVG que los otros 2 botones).
        var _homeBtn = root.querySelector('.back-btn');
        if (_homeBtn) _homeBtn.innerHTML = "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor'><path d='M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z'/></svg>";
        // Filtros pegados a la izquierda de los botones: se mueve #filters al inicio de
        // .top-actions (así el hueco queda entre el título y el grupo filtros+botones).
        var _fltRI = root.querySelector('#filters');
        var _actRI = root.querySelector('.top-actions');
        if (_fltRI && _actRI) {
            _fltRI.style.marginLeft = '0';
            _actRI.insertBefore(_fltRI, _actRI.firstChild);
        }
        var __ready = function (fn) { if (typeof fn === 'function') fn(); };

        // ===== Script original del panel (relocado a mount) =====
    /*************************************************************
     * CONFIGURACIÓN
     *************************************************************/
    const SHEET_ID = "1NywhboH-QcezeVyBgnd3U8kG6fL1I3CqN0kFkOE6h1M";
    const BDCOF_SHEET = "bdcof";
    const INGEMBCOF_SHEET = "ingembcof";
    const BDCOFPROD_SHEET = "bdcofprod";

    // Definición de cada defecto
    const DEFECT_DEFS = [
        { defecto: "PUNTADA CORTADA", col: "PUNTADA CORTADA" },
        { defecto: "PUNTADA SALTADA", col: "PUNTADA SALTADA" },
        { defecto: "MANCHA DE ACEITE", col: "MANCHA DE ACEITE" },
        { defecto: "MANCHA DE SUCIEDAD", col: "MANCHA DE SUCIEDAD" },
        { defecto: "COSTURA TORCIDA", col: "COSTURA TORCIDA" },
        { defecto: "COSTURA OLEADA", col: "COSTURA OLEADA" },
        { defecto: "COSTURA RECOGIDA", col: "COSTURA RECOGIDA" },
        { defecto: "HILO LARGO/SUELTO", col: "HILO LARGO/SUELTO" },
        { defecto: "COSTURA TENSIONADA", col: "COSTURA TENSIONADA" },
        { defecto: "ASIMETRIA", col: "ASIMETRIA" },
        { defecto: "HUECO/PICADO", col: "HUECO/PICADO" },
        { defecto: "PICADO DE AGUJA", col: "PICADO DE AGUJA" },
        { defecto: "MAL PLANCHADO/BRILLO", col: "MAL PLANCHADO/BRILLO" },
        { defecto: "BORDE CRUDO DESIGUAL", col: "BORDE CRUDO DESIGUAL" },
        { defecto: "STICKER EXTRAÑO", col: "STICKER EXTRAÑO" },
        { defecto: "JALADURA", col: "JALADURA" },
        { defecto: "OPERACIÓN FALTANTE", col: "OPERACIÓN FALTANTE" },
        { defecto: "BORDADO/ESTAMPADO DEFECTUOSO", col: "BORDADO/ESTAMPADO DEFECTUOSO" },
        { defecto: "FUERA DE MEDIDA REQUERIDA", col: "FUERA DE MEDIDA REQUERIDA" },
        { defecto: "TONO ENTRE PIEZAS", col: "TONO ENTRE PIEZAS" },
        { defecto: "LYCRA ROTA", col: "LYCRA ROTA" },
        { defecto: "MOTA/ ANILLADO", col: "MOTA/ ANILLADO" },
        { defecto: "QUEBRADURA", col: "QUEBRADURA" },
        { defecto: "CONTAMINADO", col: "CONTAMINADO" }
    ];

    /*************************************************************
     * UTILIDADES GVIZ
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

    let _originalBdcof = [];
    let _originalIngembcof = [];
    let _originalBdcofprod = [];

    function setStatus(text, type = "loading") {
        statusBadge.className = "badge";
        if (type === "loading") {
            statusBadge.classList.add("badge-loading");
            statusBadge.textContent = text;
        } else if (type === "ok") {
            statusBadge.classList.add("badge-ok");
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

    function tryParseDate(v) {
        if (v === null || v === undefined || v === "") return null;
        if (Object.prototype.toString.call(v) === '[object Date]') {
            return isNaN(v.getTime()) ? null : v;
        }
        if (typeof v === 'string') {
            const m = v.match(/^Date\((\d+),(\d+),(\d+)\)$/);
            if (m) {
                return new Date(parseInt(m[1]), parseInt(m[2]), parseInt(m[3]));
            }
        }
        if (typeof v === 'number') {
            const d = new Date((v - 25569) * 86400 * 1000);
            return isNaN(d.getTime()) ? null : d;
        }
        const s = String(v).trim();
        const mUS = s.match(/^(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{2,4})$/);
        if (mUS) {
            // mUS could be MM/DD/YYYY or DD/MM/YYYY. Heuristic:
            // - if first part > 12 => DD/MM (day cannot be >12 as month)
            // - if second part > 12 => MM/DD
            // - if both parts <= 12 (ambiguous) => prefer DD/MM (local format)
            const part1 = parseInt(mUS[1], 10);
            const part2 = parseInt(mUS[2], 10);
            let year = parseInt(mUS[3], 10);
            if (year < 100) year += 2000;
            if (part1 > 12 && part2 <= 12) {
                // interpret as DD/MM/YYYY
                const d = new Date(year, part2 - 1, part1);
                if (!isNaN(d.getTime())) return d;
            } else if (part2 > 12 && part1 <= 12) {
                // interpret as MM/DD/YYYY
                const d = new Date(year, part1 - 1, part2);
                if (!isNaN(d.getTime())) return d;
            } else {
                // ambiguous (both <=12): prefer DD/MM/YYYY by default
                const d = new Date(year, part2 - 1, part1);
                if (!isNaN(d.getTime())) return d;
            }
        }
        const mDot = s.match(/^(\d{1,2})\.(\d{1,2})\.(\d{2,4})(?:\s+\d{1,2}:\d{2}(?::\d{2})?)?$/);
        if (mDot) {
            let year = parseInt(mDot[3]);
            if (year < 100) year += 2000;
            const d = new Date(year, parseInt(mDot[2]) - 1, parseInt(mDot[1]));
            if (!isNaN(d.getTime())) return d;
        }
        let d = new Date(s);
        if (!isNaN(d.getTime())) return d;
        const mEU = s.match(/^(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{2,4})$/);
        if (mEU) {
            let year = parseInt(mEU[3]);
            if (year < 100) year += 2000;
            d = new Date(year, parseInt(mEU[2]) - 1, parseInt(mEU[1]));
            if (!isNaN(d.getTime())) return d;
        }
        return null;
    }

    function getISOWeek(d) {
        const date = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
        const dayNum = date.getUTCDay() || 7;
        date.setUTCDate(date.getUTCDate() + 4 - dayNum);
        const yearStart = new Date(Date.UTC(date.getUTCFullYear(),0,1));
        const weekNo = Math.ceil((((date - yearStart) / 86400000) + 1)/7);
        return weekNo;
    }

    function detectFechaKey(rows) {
        if (!rows || !rows.length) return null;
        const keys = Object.keys(rows[0] || {});
        const match = keys.find(k => toUpperTrim(k) === 'FECHA DE TIMBRADO');
        if (match) return match;
        const includesMatch = keys.find(k => toUpperTrim(k).includes('FECHA') && toUpperTrim(k).includes('TIMBRADO'));
        if (includesMatch) return includesMatch;
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

    function getMonthsForYear(rows, year, fechaKey) {
        const s = new Set();
        if (!fechaKey) return [];
        rows.forEach(r => {
            const d = tryParseDate(r[fechaKey]);
            if (d && d.getFullYear() === Number(year)) s.add(d.getMonth() + 1);
        });
        return Array.from(s).sort((a,b) => a-b);
    }

    function getLineas(bdcofRows) {
        const set = new Set();
        bdcofRows.forEach(row => {
            const linea = toUpperTrim(row["LINEA"]);
            if (linea) set.add(linea);
        });
        const arr = Array.from(set);
        function parseNum(s){
            if (s === null || s === undefined) return null;
            const ss = String(s).replace(/\s+/g,'');
            if (ss === '') return null;
            const n = Number(ss);
            return isNaN(n) ? null : n;
        }
        arr.sort((a,b)=>{
            const na = parseNum(a);
            const nb = parseNum(b);
            if (na !== null && nb !== null) return na - nb; // numérico asc
            if (na !== null) return -1; // números antes de textos
            if (nb !== null) return 1;
            return String(a).localeCompare(String(b), 'es', {numeric:true});
        });
        return arr;
    }

    function aggregateByLinea(bdcofRows, lineas) {
        const result = {};
        DEFECT_DEFS.forEach(def => {
            result[def.col] = {
                defecto: def.defecto,
                porLinea: {},
                subtotal: 0
            };
            lineas.forEach(l => result[def.col].porLinea[l] = 0);
        });

        bdcofRows.forEach(r => {
            const linea = toUpperTrim(r["LINEA"]);
            if (!linea) return;

            DEFECT_DEFS.forEach(def => {
                const val = toNumber(r[def.col]);
                const entry = result[def.col];
                if (entry.porLinea[linea] !== undefined) {
                    entry.porLinea[linea] += val;
                }
                entry.subtotal += val;
            });
        });

        return result;
    }

    function totalDefectosFromAggregate(agg) {
        let total = 0;
        DEFECT_DEFS.forEach(def => {
            total += agg[def.col] ? agg[def.col].subtotal : 0;
        });
        return total;
    }

    function detectarColumnaIngreso(ingresoRows) {
        if (!ingresoRows.length) return "INGRESO A EMBALAJE";
        const headers = Object.keys(ingresoRows[0]);
        const byIngreso = headers.find(h => toUpperTrim(h) === "INGRESO A EMBALAJE");
        return byIngreso || "INGRESO A EMBALAJE";
    }

    function totalIngresoEmbalaje(bdcofprodRows) {
        if (!bdcofprodRows.length) return 0;
        const col = detectarColumnaIngreso(bdcofprodRows);
        let total = 0;
        bdcofprodRows.forEach(r => {
            total += toNumber(r[col]);
        });
        return total;
    }

    function getProduccionPorLinea(bdcofprodRows, lineas) {
        // Retorna un objeto con producción por línea
        // Las columnas van de "1" a "39" (D a AM en Google Sheets)
        const result = {};
        lineas.forEach(l => {
            result[l] = 0;
        });

        if (!bdcofprodRows.length) return result;

        bdcofprodRows.forEach(row => {
            lineas.forEach(linea => {
                // Buscar la columna que corresponde a esta línea (columnas "1" a "39")
                const val = toNumber(row[linea]);
                if (val > 0) {
                    result[linea] += val;
                }
            });
        });

        return result;
    }

    function buildTable(bdcofRows, bdcofprodRows) {
        if (!bdcofRows.length) {
            tableContainer.classList.add("hidden");
            noData.classList.remove("hidden");
            return;
        }

        const lineas = getLineas(bdcofRows);
        if (!lineas.length) {
            tableContainer.classList.add("hidden");
            noData.classList.remove("hidden");
            return;
        }

        const agg = aggregateByLinea(bdcofRows, lineas);
        const totalIngreso = totalIngresoEmbalaje(bdcofprodRows);
        const totalDefectos = totalDefectosFromAggregate(agg);

        tableContainer.classList.remove("hidden");
        noData.classList.add("hidden");
        tablaReporte.innerHTML = "";

        const thead = document.createElement("thead");
        const tbody = document.createElement("tbody");

        /*********** ENCABEZADOS ***********/
        const tr = document.createElement("tr");

        const thDefecto = document.createElement("th");
        thDefecto.textContent = "DEFECTO  /  Linea";
        thDefecto.classList.add("col-defecto");
        tr.appendChild(thDefecto);

        lineas.forEach(l => {
            const th = document.createElement("th");
            th.textContent = l;
            tr.appendChild(th);
        });

        const thTotal = document.createElement("th");
        thTotal.textContent = "TOTAL";
        tr.appendChild(thTotal);

        const thDefLote = document.createElement("th");
        thDefLote.textContent = "%Def.";
        tr.appendChild(thDefLote);

        const thDistrib = document.createElement("th");
        thDistrib.textContent = "%Part";
        tr.appendChild(thDistrib);

        thead.appendChild(tr);

        /*********** FILA PRODUCCION (después de encabezados) ***********/
        const produccionPorLinea = getProduccionPorLinea(bdcofprodRows, lineas);
        const trProduccion = document.createElement("tr");
        trProduccion.style.backgroundColor = "#fff9c4"; // Amarillo claro para destacar
        trProduccion.style.fontWeight = "600";

        const tdProdLabel = document.createElement("td");
        tdProdLabel.textContent = "PRODUCCION";
        tdProdLabel.classList.add("col-defecto");
        trProduccion.appendChild(tdProdLabel);

        let totalProduccion = 0;
        lineas.forEach(l => {
            const val = produccionPorLinea[l] || 0;
            totalProduccion += val;
            const td = document.createElement("td");
            td.textContent = val ? formatNumber(val) : "";
            trProduccion.appendChild(td);
        });

        const tdProdTotal = document.createElement("td");
        tdProdTotal.textContent = totalProduccion ? formatNumber(totalProduccion) : "";
        trProduccion.appendChild(tdProdTotal);

        // Columnas vacías para "% Def. en lote" y "%Part" (no aplica para PRODUCCION)
        const tdEmpty1 = document.createElement("td");
        tdEmpty1.textContent = "";
        trProduccion.appendChild(tdEmpty1);

        const tdEmpty2 = document.createElement("td");
        tdEmpty2.textContent = "";
        trProduccion.appendChild(tdEmpty2);

        tbody.appendChild(trProduccion);

        /*********** CUERPO ***********/
        const totPorLinea = {};
        lineas.forEach(l => {
            totPorLinea[l] = 0;
        });

        // Construir lista de defectos ordenada por total descendente
        const defsList = DEFECT_DEFS.map(def => {
            const entry = agg[def.col] || { defecto: def.defecto, porLinea: {}, subtotal: 0 };
            return {
                col: def.col,
                defecto: def.defecto,
                porLinea: entry.porLinea || {},
                subtotal: entry.subtotal || 0
            };
        }).filter(d => d.subtotal > 0).sort((a,b) => b.subtotal - a.subtotal);
        // Resaltar con fondo rojo transparente las filas de defectos
        // cuya suma acumulada de %Part sea menor a 80% (Pareto style)
        let acumuladoDistrib = 0;
        defsList.forEach(def => {
            const tr = document.createElement("tr");
            const rowCells = [];

            const tdDef = document.createElement("td");
            tdDef.textContent = def.defecto;
            tdDef.classList.add("col-defecto");
            tr.appendChild(tdDef);
            rowCells.push(tdDef);

            lineas.forEach(l => {
                const val = def.porLinea[l] || 0;
                totPorLinea[l] += val;
                const td = document.createElement("td");
                td.textContent = val ? formatNumber(val) : "";
                tr.appendChild(td);
                rowCells.push(td);
            });

            const tdTotal = document.createElement("td");
            tdTotal.textContent = def.subtotal ? formatNumber(def.subtotal) : "";
            tr.appendChild(tdTotal);
            rowCells.push(tdTotal);

            const tdDefLote = document.createElement("td");
            if (totalIngreso > 0 && def.subtotal > 0) {
                tdDefLote.textContent = formatPercent((def.subtotal / totalIngreso) * 100);
            } else {
                tdDefLote.textContent = "";
            }
            tr.appendChild(tdDefLote);
            rowCells.push(tdDefLote);

            const tdDistrib = document.createElement("td");
            let distribPercent = 0;
            if (totalDefectos > 0 && def.subtotal > 0) {
                distribPercent = (def.subtotal / totalDefectos) * 100;
                tdDistrib.textContent = formatPercent(distribPercent);
            } else {
                tdDistrib.textContent = "";
            }
            tr.appendChild(tdDistrib);
            rowCells.push(tdDistrib);

            // Actualizar acumulado y aplicar estilo si la suma acumulada es menor a 80%
            acumuladoDistrib += distribPercent;
            if (acumuladoDistrib < 80) {
                rowCells.forEach(cell => {
                    cell.style.backgroundColor = 'rgba(239,68,68,0.12)';
                });
            }

            tbody.appendChild(tr);
        });

        /*********** FILA TOTAL ***********/
        const trTotal = document.createElement("tr");
        trTotal.classList.add("row-total");

        const tdTDef = document.createElement("td");
        tdTDef.textContent = "TOTAL DEFECTOS";
        tdTDef.classList.add("col-defecto");
        trTotal.appendChild(tdTDef);

        lineas.forEach(l => {
            const td = document.createElement("td");
            td.textContent = totPorLinea[l] ? formatNumber(totPorLinea[l]) : "";
            trTotal.appendChild(td);
        });

        const tdDefTot = document.createElement("td");
        tdDefTot.textContent = totalDefectos ? formatNumber(totalDefectos) : "";
        trTotal.appendChild(tdDefTot);

        const tdDefLoteTot = document.createElement("td");
        if (totalIngreso > 0 && totalDefectos > 0) {
            tdDefLoteTot.textContent = formatPercent((totalDefectos / totalIngreso) * 100);
        } else {
            tdDefLoteTot.textContent = "";
        }
        trTotal.appendChild(tdDefLoteTot);

        const tdDistribTot = document.createElement("td");
        tdDistribTot.textContent = "100.00%";
        trTotal.appendChild(tdDistribTot);

        tbody.appendChild(trTotal);

        tablaReporte.appendChild(thead);
        tablaReporte.appendChild(tbody);

        /*********** RESUMEN GLOBAL ***********/
        resumenGlobal.classList.remove("hidden");
        resumenGlobal.innerHTML = "";
        
        const spanDef = document.createElement("span");
        spanDef.innerHTML = `<strong>TOTAL DEFECTOS: ${formatNumber(totalDefectos)} pds</strong>`;

        const spanIng = document.createElement("span");
        spanIng.innerHTML = `<strong>INGRESO A EMBALAJE: ${formatNumber(totalIngreso)} pds</strong>`;

        const spanRate = document.createElement("span");
        const rate = (totalIngreso > 0) ? (totalDefectos / totalIngreso) * 100 : 0;
        spanRate.innerHTML = `<strong>%DEFECTOS: ${formatPercent(rate)}</strong>`;

        resumenGlobal.appendChild(spanDef);
        resumenGlobal.appendChild(spanIng);
        resumenGlobal.appendChild(spanRate);
    }

    function populateFilters(rows) {
        const yearSel = document.getElementById('filterYear');
        const groupSel = document.getElementById('filterGroupBy');
        const periodSel = document.getElementById('filterPeriodSelect');
        const lineaSel = document.getElementById('filterLinea');
        
        if (!groupSel || !periodSel || !yearSel) return;
        
        const fechaKey = detectFechaKey(rows);
        if (!fechaKey) {
            yearSel.innerHTML = '<option value="">Todas</option>';
            periodSel.innerHTML = '<option value="">Todas</option>';
            return;
        }

        // Poblar años
        const years = getYearsFromRows(rows, fechaKey);
        yearSel.innerHTML = '';
        years.forEach(y => {
            const opt = document.createElement('option');
            opt.value = y;
            opt.textContent = y;
            yearSel.appendChild(opt);
        });
        
        // Seleccionar el año más reciente por defecto
        if (years.length > 0) {
            yearSel.value = years[years.length - 1];
        }

        function populatePeriodOptions() {
            const year = yearSel.value;
            const group = groupSel.value;
            periodSel.innerHTML = '';

            if (!year) {
                const opt = document.createElement('option');
                opt.value = '';
                opt.textContent = 'Todas';
                periodSel.appendChild(opt);
                return;
            }

            if (group === 'SEMANA') {
                const weeks = getWeeksForYear(rows, year, fechaKey);
                weeks.forEach(w => {
                    const opt = document.createElement('option');
                    opt.value = `${year}|${String(w).padStart(2,'0')}`;
                    opt.textContent = `Sem${w}`;
                    periodSel.appendChild(opt);
                });
                // Seleccionar la última semana por defecto
                if (weeks.length > 0) {
                    periodSel.value = `${year}|${String(weeks[weeks.length - 1]).padStart(2,'0')}`;
                }
            } else {
                const months = getMonthsForYear(rows, year, fechaKey);
                const monthNames = ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'];
                months.forEach(m => {
                    const opt = document.createElement('option');
                    opt.value = `${year}|${String(m).padStart(2,'0')}`;
                    opt.textContent = monthNames[m-1] || `Mes ${m}`;
                    periodSel.appendChild(opt);
                });
                // Seleccionar el último mes por defecto
                if (months.length > 0) {
                    periodSel.value = `${year}|${String(months[months.length - 1]).padStart(2,'0')}`;
                }
            }
        }

        yearSel.addEventListener('change', () => { populatePeriodOptions(); applyFiltersAndBuild(); });
        groupSel.addEventListener('change', () => { populatePeriodOptions(); applyFiltersAndBuild(); });
        periodSel.addEventListener('change', () => { applyFiltersAndBuild(); });

        // Poblar filtro de líneas
        if (lineaSel) {
            const lineas = getLineas(rows);
            lineaSel.innerHTML = '<option value="">(todas)</option>';
            lineas.forEach(l => {
                const opt = document.createElement('option');
                opt.value = l;
                opt.textContent = l;
                lineaSel.appendChild(opt);
            });
            lineaSel.addEventListener('change', () => { applyFiltersAndBuild(); });
        }

        populatePeriodOptions();
    }

    function filterByPeriod(rows, group, period) {
        const fechaKey = detectFechaKey(rows);
        if (!period || period === '') return rows.slice();
        if (!fechaKey) return rows.slice();
        
        if (group === 'SEMANA') {
            const [year, week] = period.split('|').map(Number);
            return rows.filter(r => {
                const d = tryParseDate(r[fechaKey]);
                if (!d) return false;
                return d.getFullYear() === year && getISOWeek(d) === week;
            });
        } else {
            const [year, month] = period.split('|').map(Number);
            return rows.filter(r => {
                const d = tryParseDate(r[fechaKey]);
                if (!d) return false;
                return d.getFullYear() === year && (d.getMonth() + 1) === month;
            });
        }
    }

    function filterIngresoRowsByPeriod(rows, group, period) {
        if (!rows || !rows.length) return [];
        const keys = Object.keys(rows[0] || {});
        
        // Búsqueda más flexible de columnas
        const keyAno = keys.find(k => {
            const upper = toUpperTrim(k);
            return upper === 'AÑO' || upper === 'ANO' || upper === 'AÑO ' || upper === 'ANO ' || upper.replace(/\s+/g,'') === 'AÑO' || upper.replace(/\s+/g,'') === 'ANO';
        });
        const keySemana = keys.find(k => toUpperTrim(k).includes('SEMANA'));
        const keyMes = keys.find(k => toUpperTrim(k).includes('MES') && !toUpperTrim(k).includes('SEMANA'));
        
        console.log('[filterIngresoRowsByPeriod] Columnas detectadas:', {
            keyAno, keySemana, keyMes, 
            availableKeys: keys,
            group, period,
            firstRow: rows[0]
        });

        if (!period || period === '') {
            return rows.slice();
        }

        if (group === 'SEMANA') {
            const [year, week] = period.split('|').map(Number);
            if (keyAno && keySemana) {
                const filtered = rows.filter(r => {
                    const ano = toNumber(r[keyAno]);
                    const sem = toNumber(r[keySemana]);
                    console.log(`Comparando: año=${ano} vs ${year}, semana=${sem} vs ${week}`);
                    return ano === year && sem === week;
                });
                console.log(`[SEMANA] Filtrado: ${filtered.length} de ${rows.length} filas`);
                return filtered;
            }
            const fallback = filterByPeriod(rows, 'SEMANA', period);
            console.log(`[SEMANA fallback] Filtrado: ${fallback.length} de ${rows.length} filas`);
            return fallback;
        } else {
            const [year, month] = period.split('|').map(Number);
            if (keyAno && keyMes) {
                const filtered = rows.filter(r => {
                    const ano = toNumber(r[keyAno]);
                    const mes = toNumber(r[keyMes]);
                    return ano === year && mes === month;
                });
                console.log(`[MES] Filtrado: ${filtered.length} de ${rows.length} filas`);
                return filtered;
            }
            // Si no hay columna MES, intentar mapear semanas a mes
            if (keyAno && keySemana) {
                const filtered = rows.filter(r => {
                    const ano = toNumber(r[keyAno]);
                    const sem = toNumber(r[keySemana]);
                    if (ano !== year) return false;
                    const estimatedMonth = Math.ceil(sem / 4.33);
                    return estimatedMonth === month;
                });
                console.log(`[MES via semanas] Filtrado: ${filtered.length} de ${rows.length} filas`);
                return filtered;
            }
            const fallback = filterByPeriod(rows, 'MES', period);
            console.log(`[MES fallback] Filtrado: ${fallback.length} de ${rows.length} filas`);
            return fallback;
        }
    }
    

    function filterBdcofprodByPeriod(rows, group, period) {
        if (!rows || !rows.length) return [];
        const keys = Object.keys(rows[0] || {});
        const keyAno = keys.find(k => toUpperTrim(k) === 'AÑO' || toUpperTrim(k) === 'ANO');
        const keySemana = keys.find(k => toUpperTrim(k) === 'SEMANA');

        if (!period || period === '') {
            return rows.slice();
        }

        if (group === 'SEMANA') {
            const [year, week] = period.split('|').map(Number);
            if (keyAno && keySemana) {
                return rows.filter(r => {
                    const ano = toNumber(r[keyAno]);
                    const sem = toNumber(r[keySemana]);
                    return ano === year && sem === week;
                });
            }
            return rows.slice();
        } else {
            // MES: asociar semanas al mes correspondiente
            const [year, month] = period.split('|').map(Number);
            if (keyAno && keySemana) {
                return rows.filter(r => {
                    const ano = toNumber(r[keyAno]);
                    const sem = toNumber(r[keySemana]);
                    if (ano !== year) return false;
                    // Convertir semana ISO a mes aproximado
                    // Semana 1-4 = Enero, 5-8 = Febrero, etc.
                    const estimatedMonth = Math.ceil(sem / 4.33);
                    return estimatedMonth === month;
                });
            }
            return rows.slice();
        }
    }

    // Devuelve la última semana (ISO) encontrada en `rows` usando la columna de fecha detectada
    function getLastWeekFromRows(rows) {
        if (!rows || !rows.length) return null;
        const fechaKey = detectFechaKey(rows);
        if (!fechaKey) return null;
        let lastDate = null;
        rows.forEach(r => {
            const d = tryParseDate(r[fechaKey]);
            if (d && (!lastDate || d.getTime() > lastDate.getTime())) lastDate = d;
        });
        if (!lastDate) return null;
        return { year: lastDate.getFullYear(), week: getISOWeek(lastDate) };
    }

    // Devuelve el último periodo (año/semana) de bdcofprod según la última fila que tenga dato en 'INGRESO A EMBALAJE'
    function getLastPeriodFromBdcofprod(rows) {
        if (!rows || !rows.length) return null;
        const ingresoKey = detectarColumnaIngreso(rows);
        const keys = Object.keys(rows[0] || {});
        const keyAno = keys.find(k => {
            const upper = toUpperTrim(k);
            return upper === 'AÑO' || upper === 'ANO' || upper.replace(/\s+/g,'') === 'AÑO' || upper.replace(/\s+/g,'') === 'ANO';
        });
        const keySemana = keys.find(k => toUpperTrim(k).includes('SEMANA'));

        for (let i = rows.length - 1; i >= 0; i--) {
            const r = rows[i];
            const val = r[ingresoKey];
            if (val !== null && val !== undefined && String(val).trim() !== '') {
                if (keyAno && keySemana) {
                    const ano = toNumber(r[keyAno]);
                    const sem = toNumber(r[keySemana]);
                    if (ano > 0 && sem > 0) return { year: ano, week: sem };
                }
                // Fallback: intentar buscar alguna columna de fecha en la fila
                const keysRow = Object.keys(r || {});
                for (const k of keysRow) {
                    const d = tryParseDate(r[k]);
                    if (d) return { year: d.getFullYear(), week: getISOWeek(d) };
                }
            }
        }
        return null;
    }

    function earlierPeriod(a, b) {
        if (!a) return b;
        if (!b) return a;
        if (a.year < b.year) return a;
        if (a.year > b.year) return b;
        return (a.week <= b.week) ? a : b;
    }

    function applyFiltersAndBuild() {
        const group = document.getElementById('filterGroupBy') ? document.getElementById('filterGroupBy').value : 'SEMANA';
        const period = document.getElementById('filterPeriodSelect') ? document.getElementById('filterPeriodSelect').value : '';
        const lineaSel = document.getElementById('filterLinea');
        const lineaVal = lineaSel ? (lineaSel.value || '') : '';
        
        const filteredBdcof = filterByPeriod(_originalBdcof, group, period);
        const filteredBdcofByLinea = lineaVal ? filteredBdcof.filter(r => toUpperTrim(r['LINEA']) === lineaVal) : filteredBdcof;
        const filteredBdcofprod = filterIngresoRowsByPeriod(_originalBdcofprod, group, period);
        
        buildTable(filteredBdcofByLinea, filteredBdcofprod);
    }

    /*************************************************************
     * INICIO
     *************************************************************/
    (function init() {
        setStatus("Cargando datos desde Google Sheets…", "loading");

        Promise.all([
            loadSheetJSONP(SHEET_ID, BDCOF_SHEET),
            loadSheetJSONP(SHEET_ID, INGEMBCOF_SHEET),
            loadSheetJSONP(SHEET_ID, BDCOFPROD_SHEET)
        ])
        .then(([bdcofRows, ingembcofRows, bdcofprodRows]) => {
                _originalBdcof = bdcofRows || [];
                _originalIngembcof = ingembcofRows || [];
                _originalBdcofprod = bdcofprodRows || [];
                setStatus("Datos cargados", "ok");
                populateFilters(_originalBdcof);

                // Establecer filtros por defecto basados en la última fecha de `bdcof` y `bdcofprod`.
                try {
                    const yearSel = document.getElementById('filterYear');
                    const groupSel = document.getElementById('filterGroupBy');
                    const periodSel = document.getElementById('filterPeriodSelect');

                    const lastBdcof = getLastWeekFromRows(_originalBdcof);
                    const lastBdcofprod = getLastPeriodFromBdcofprod(_originalBdcofprod);

                    const chosen = earlierPeriod(lastBdcof, lastBdcofprod);

                    if (chosen) {
                        const desiredYear = String(chosen.year);
                        const desiredGroup = 'SEMANA';
                        const desiredWeek = String(chosen.week);

                        if (yearSel) {
                            if (!Array.from(yearSel.options).some(o => String(o.value) === desiredYear)) {
                                const opt = document.createElement('option');
                                opt.value = desiredYear;
                                opt.textContent = desiredYear;
                                yearSel.appendChild(opt);
                            }
                            yearSel.value = desiredYear;
                            yearSel.dispatchEvent(new Event('change'));
                        }

                        if (groupSel) {
                            groupSel.value = desiredGroup;
                            groupSel.dispatchEvent(new Event('change'));
                        }

                        // Esperar a que se hayan poblado las opciones de periodo, luego forzar la semana elegida
                        setTimeout(() => {
                            if (periodSel) {
                                const optVal = `${desiredYear}|${String(desiredWeek).padStart(2,'0')}`;
                                if (!Array.from(periodSel.options).some(o => o.value === optVal)) {
                                    const o = document.createElement('option');
                                    o.value = optVal;
                                    o.textContent = `Sem${desiredWeek}`;
                                    periodSel.appendChild(o);
                                }
                                periodSel.value = optVal;
                            }
                            applyFiltersAndBuild();
                        }, 120);
                    } else {
                        applyFiltersAndBuild();
                    }
                } catch (e) {
                    applyFiltersAndBuild();
                }
        })
        .catch(err => {
            setStatus("Error al cargar", "error");
            showError(err.message || "Ocurrió un error al cargar los datos.");
        });
    })();

    /*************************************************************
     * MODAL DE GRÁFICOS
     *************************************************************/
    (function setupCharts() {
        const btnChartCircle = document.getElementById('btnChartCircle');
        const chartsModalOverlay = document.getElementById('chartsModalOverlay');
        const chartsModalClose = document.getElementById('chartsModalClose');
        const chartPeriodo = document.getElementById('chartPeriodo');
        const chartDesdeYear = document.getElementById('chartDesdeYear');
        const chartDesdeWeek = document.getElementById('chartDesdeWeek');
        const chartHastaYear = document.getElementById('chartHastaYear');
        const chartHastaWeek = document.getElementById('chartHastaWeek');
        const chartDesdeMonth = document.getElementById('chartDesdeMonth');
        const chartHastaMonth = document.getElementById('chartHastaMonth');
        const chartsCanvas = document.getElementById('chartsCanvas');

        let chartInstance = null;

        function openChartsModal() {
            chartsModalOverlay.classList.add('open');
            populateChartFilters();
            applyDefaultChartRange();
            renderChart();
        }

        function closeChartsModal() {
            chartsModalOverlay.classList.remove('open');
            if (chartInstance) {
                chartInstance.destroy();
                chartInstance = null;
            }
        }

        function getAvailableChartPeriods(periodo, defectRows, fechaKey) {
            if (!defectRows.length || !fechaKey) return [];

            const rawPeriods = [];
            defectRows.forEach(r => {
                const d = tryParseDate(r[fechaKey]);
                if (!d) return;

                const year = d.getFullYear();
                const week = getISOWeek(d);
                const month = d.getMonth() + 1;
                const key = periodo === 'Semanal'
                    ? `${year}|${String(week).padStart(2, '0')}`
                    : `${year}|${String(month).padStart(2, '0')}`;

                rawPeriods.push({ year, week, month, key, date: d });
            });

            rawPeriods.sort((a, b) => a.date - b.date);

            const seen = new Set();
            const periods = [];
            rawPeriods.forEach(p => {
                if (seen.has(p.key)) return;
                seen.add(p.key);
                periods.push(p);
            });

            return periods;
        }

        function applyDefaultChartRange() {
            try {
                const defectRows = findDefectRows();
                if (!defectRows.length) return;

                const periodo = chartPeriodo.value;
                const fechaKey = detectFechaKey(defectRows);
                const periods = getAvailableChartPeriods(periodo, defectRows, fechaKey);
                if (!periods.length) return;

                const recent = periods.slice(-7);
                const first = recent[0];
                const last = recent[recent.length - 1];

                chartDesdeYear.value = String(first.year);
                chartHastaYear.value = String(last.year);

                updatePeriodSelects();

                if (periodo === 'Semanal') {
                    chartDesdeWeek.value = String(first.week);
                    chartHastaWeek.value = String(last.week);
                } else {
                    chartDesdeMonth.value = String(first.month);
                    chartHastaMonth.value = String(last.month);
                }
            } catch (err) {
                console.error('[charts] Error en applyDefaultChartRange:', err);
            }
        }

        function populateChartFilters() {
            const defectRows = findDefectRows();
            const fechaKey = detectFechaKey(defectRows);
            console.log('[charts] === DIAGNÓSTICO ===');
            console.log('[charts] bdcof rows:', (_originalBdcof||[]).length);
            console.log('[charts] ingembcof rows:', (_originalIngembcof||[]).length);
            console.log('[charts] bdcofprod rows:', (_originalBdcofprod||[]).length);
            console.log('[charts] defectRows detectados:', defectRows.length, 'fechaKey:', fechaKey);
            if (defectRows.length > 0) {
                console.log('[charts] Columnas en defectRows:', Object.keys(defectRows[0]).slice(0, 15));
            }
            if ((_originalBdcofprod||[]).length > 0) {
                console.log('[charts] Columnas en bdcofprod:', Object.keys(_originalBdcofprod[0]).slice(0, 15));
            }
            let years = getYearsFromRows(defectRows, fechaKey);

            // fallback: usar año actual si no hay años detectados
            if (!years || years.length === 0) {
                years = [String((new Date()).getFullYear())];
            }

            // Poblar años
            chartDesdeYear.innerHTML = '';
            chartHastaYear.innerHTML = '';
            years.forEach(y => {
                const opt1 = document.createElement('option');
                opt1.value = y;
                opt1.textContent = y;
                chartDesdeYear.appendChild(opt1);
                
                const opt2 = document.createElement('option');
                opt2.value = y;
                opt2.textContent = y;
                chartHastaYear.appendChild(opt2);
            });

            if (years.length > 0) {
                chartDesdeYear.value = years[0];
                chartHastaYear.value = years[years.length - 1];
            }

            try { updatePeriodSelects(); } catch (e) { console.error('[charts] updatePeriodSelects failed', e); }
        }

        function updatePeriodSelects() {
            const periodo = chartPeriodo.value;
            const defectRows = findDefectRows();
            const fechaKey = detectFechaKey(defectRows);

            if (periodo === 'Semanal') {
                // Mostrar controles de semana, ocultar controles de mes
                document.getElementById('chartDesdeYearLabel').style.display = '';
                document.getElementById('chartDesdeWeekLabel').style.display = '';
                document.getElementById('chartHastaYearLabel').style.display = '';
                document.getElementById('chartHastaWeekLabel').style.display = '';
                document.getElementById('chartDesdeMonthLabel').style.display = 'none';
                document.getElementById('chartHastaMonthLabel').style.display = 'none';

                // Poblar semanas
                const yearDesde = chartDesdeYear.value;
                const yearHasta = chartHastaYear.value;
                const prevDesdeWeek = chartDesdeWeek.value;
                const prevHastaWeek = chartHastaWeek.value;
                
                chartDesdeWeek.innerHTML = '';
                chartHastaWeek.innerHTML = '';
                
                if (yearDesde) {
                    let weeksDesde = getWeeksForYear(defectRows, yearDesde, fechaKey);
                    if (!weeksDesde || weeksDesde.length === 0) {
                        weeksDesde = Array.from({length:52}, (_,i) => i+1);
                    }
                    weeksDesde.forEach(w => {
                        const opt = document.createElement('option');
                        opt.value = w;
                        opt.textContent = `Sem${w}`;
                        chartDesdeWeek.appendChild(opt);
                    });
                    if (prevDesdeWeek && weeksDesde.includes(parseInt(prevDesdeWeek, 10))) {
                        chartDesdeWeek.value = prevDesdeWeek;
                    } else if (weeksDesde.length > 0) {
                        chartDesdeWeek.value = String(weeksDesde[0]);
                    }
                }
                
                if (yearHasta) {
                    let weeksHasta = getWeeksForYear(defectRows, yearHasta, fechaKey);
                    if (!weeksHasta || weeksHasta.length === 0) {
                        weeksHasta = Array.from({length:52}, (_,i) => i+1);
                    }
                    weeksHasta.forEach(w => {
                        const opt = document.createElement('option');
                        opt.value = w;
                        opt.textContent = `Sem${w}`;
                        chartHastaWeek.appendChild(opt);
                    });
                    if (prevHastaWeek && weeksHasta.includes(parseInt(prevHastaWeek, 10))) {
                        chartHastaWeek.value = prevHastaWeek;
                    } else if (weeksHasta.length > 0) {
                        chartHastaWeek.value = String(weeksHasta[weeksHasta.length - 1]);
                    }
                }
            } else {
                // Mostrar controles de año+mes, ocultar controles de semana
                document.getElementById('chartDesdeYearLabel').style.display = '';
                document.getElementById('chartDesdeWeekLabel').style.display = 'none';
                document.getElementById('chartHastaYearLabel').style.display = '';
                document.getElementById('chartHastaWeekLabel').style.display = 'none';
                document.getElementById('chartDesdeMonthLabel').style.display = '';
                document.getElementById('chartHastaMonthLabel').style.display = '';

                // Poblar meses
                const monthNames = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
                const prevDesdeMonth = chartDesdeMonth.value;
                const prevHastaMonth = chartHastaMonth.value;
                chartDesdeMonth.innerHTML = '';
                chartHastaMonth.innerHTML = '';
                
                for (let i = 1; i <= 12; i++) {
                    const opt1 = document.createElement('option');
                    opt1.value = i;
                    opt1.textContent = monthNames[i - 1];
                    chartDesdeMonth.appendChild(opt1);
                    
                    const opt2 = document.createElement('option');
                    opt2.value = i;
                    opt2.textContent = monthNames[i - 1];
                    chartHastaMonth.appendChild(opt2);
                }
                if (prevDesdeMonth) {
                    chartDesdeMonth.value = prevDesdeMonth;
                } else {
                    chartDesdeMonth.value = '1';
                }
                if (prevHastaMonth) {
                    chartHastaMonth.value = prevHastaMonth;
                } else {
                    chartHastaMonth.value = '12';
                }
            }
        }

        function getMonthsForYear(rows, year, fechaKey) {
            const set = new Set();
            rows.forEach(r => {
                const d = tryParseDate(r[fechaKey]);
                if (d && d.getFullYear() === parseInt(year)) {
                    set.add(d.getMonth() + 1);
                }
            });
            return Array.from(set).sort((a, b) => a - b);
        }

        function findDefectRows() {
            const candidates = [_originalBdcof, _originalIngembcof, _originalBdcofprod];
            for (let i = 0; i < candidates.length; i++) {
                const rows = candidates[i] || [];
                if (!rows.length) continue;
                const keys = Object.keys(rows[0] || {}).map(k => toUpperTrim(k));
                for (const def of DEFECT_DEFS) {
                    if (!def.col) continue;
                    const target = toUpperTrim(def.col);
                    if (keys.includes(target)) return rows;
                }
            }
            return _originalBdcof || [];
        }

        function renderChart() {
            const periodo = chartPeriodo.value;
            const defectRows = findDefectRows();
            const fechaKey = detectFechaKey(defectRows);

            let dataPoints = [];
            try {

            if (periodo === 'Semanal') {
                const weekLabel = (week) => `SEM${String(week).padStart(2, '0')}`;
                const yearDesde = parseInt(chartDesdeYear.value);
                const weekDesde = parseInt(chartDesdeWeek.value);
                const yearHasta = parseInt(chartHastaYear.value);
                const weekHasta = parseInt(chartHastaWeek.value);

                // Generar todas las semanas en el rango
                const allWeeks = [];
                for (let y = yearDesde; y <= yearHasta; y++) {
                    const weeks = getWeeksForYear(defectRows, y.toString(), fechaKey);
                    weeks.forEach(w => {
                        const inRange = (yearDesde === yearHasta)
                            ? (y === yearDesde && w >= weekDesde && w <= weekHasta)
                            : ((y === yearDesde && w >= weekDesde) ||
                               (y === yearHasta && w <= weekHasta) ||
                               (y > yearDesde && y < yearHasta));
                        if (inRange) {
                            allWeeks.push({ year: y, week: w });
                        }
                    });
                }

                // Calcular datos para cada semana
                dataPoints = allWeeks.map(({ year, week }) => {
                    const bdcofFiltered = filterByPeriod(defectRows, 'SEMANA', `${year}|${String(week).padStart(2, '0')}`);
                    // Usar la hoja 'bdcofprod' como fuente de "Ingreso a embalaje"
                    // Para filas de ingreso usar la función especializada que detecta columnas de año/semana/mes
                    const bdcofprodFiltered = filterIngresoRowsByPeriod(_originalBdcofprod, 'SEMANA', `${year}|${String(week).padStart(2, '0')}`);

                    console.log(`[charts] ${year}-SEM${week}: defectRows filtradas=${bdcofFiltered.length}, bdcofprodRows filtradas=${bdcofprodFiltered.length}`);
                    const totalDefectos = sumTotalDefectos(bdcofFiltered);
                    const totalIngreso = sumTotalIngreso(bdcofprodFiltered);
                    const percentage = totalIngreso > 0 ? (totalDefectos / totalIngreso) * 100 : 0;
                    console.log(`[charts] ${year}-SEM${week}: defectos=${totalDefectos}, ingreso=${totalIngreso}, %=${percentage.toFixed(2)}%`);

                    return {
                        label: weekLabel(week),
                        fullLabel: `${year}-SEM${String(week).padStart(2, '0')}`,
                        totalDefectos,
                        totalIngreso,
                        percentage
                    };
                });
            } else {
                // Mensual - Similar logic pero con meses
                const monthDesde = parseInt(chartDesdeMonth.value);
                const monthHasta = parseInt(chartHastaMonth.value);
                const monthNames = ['ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN', 'JUL', 'AGO', 'SEP', 'OCT', 'NOV', 'DIC'];

                const yearDesde = parseInt(chartDesdeYear.value);
                const yearHasta = parseInt(chartHastaYear.value);
                const allMonths = [];
                for (let y = yearDesde; y <= yearHasta; y++) {
                    const startM = (y === yearDesde) ? monthDesde : 1;
                    const endM = (y === yearHasta) ? monthHasta : 12;
                    for (let m = startM; m <= endM; m++) allMonths.push({ year: y, month: m });
                }

                allMonths.forEach(({ year, month }) => {
                    const bdcofFiltered = defectRows.filter(r => {
                        const d = tryParseDate(r[fechaKey]);
                        return d && d.getFullYear() === year && (d.getMonth() + 1) === month;
                    });
                    const bdcofprodFiltered = filterIngresoRowsByPeriod(_originalBdcofprod, 'MES', `${year}|${String(month).padStart(2,'0')}`);

                    console.log(`[charts] ${year}-MES${String(month).padStart(2,'0')}: defectRows filtradas=${bdcofFiltered.length}, bdcofprodRows filtradas=${bdcofprodFiltered.length}`);
                    const totalDefectos = sumTotalDefectos(bdcofFiltered);
                    const totalIngreso = sumTotalIngreso(bdcofprodFiltered);
                    const percentage = totalIngreso > 0 ? (totalDefectos / totalIngreso) * 100 : 0;
                    console.log(`[charts] ${year}-MES${String(month).padStart(2,'0')}: defectos=${totalDefectos}, ingreso=${totalIngreso}, %=${percentage.toFixed(2)}%`);

                    dataPoints.push({
                        label: `${year}-${monthNames[month - 1]}`,
                        fullLabel: `${year}-MES${String(month).padStart(2,'0')}`,
                        totalDefectos,
                        totalIngreso,
                        percentage
                    });
                });
            }

            } catch (err) { console.error('[charts] renderChart error', err); }
            console.log('[charts] dataPoints sample', dataPoints.slice(0,5));
                // Destruir gráfico anterior si existe
            if (chartInstance) {
                chartInstance.destroy();
            }

            // Crear nuevo gráfico
            const ctx = chartsCanvas.getContext('2d');

            // Calcular máximo del % (eje secundario) para dejar margen visible
            let maxPercent = 0;
            (dataPoints || []).forEach(dp => {
                if (isFinite(dp.percentage) && dp.percentage > maxPercent) maxPercent = dp.percentage;
            });
            if (!isFinite(maxPercent) || maxPercent <= 0) maxPercent = 1;
            // margen del 15% para que las etiquetas no queden cortadas
            const y1Max = Math.ceil((maxPercent * 1.15) * 100) / 100;

            chartInstance = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: dataPoints.map(d => d.label),
                    datasets: [
                        {
                            label: 'TOTAL INGRESO A EMBALAJE',
                            data: dataPoints.map(d => d.totalIngreso),
                            backgroundColor: 'rgba(59, 130, 246, 0.7)',
                            borderColor: 'rgba(59, 130, 246, 1)',
                            borderWidth: 1,
                            yAxisID: 'y',
                            order: 2
                        },
                        {
                            label: '% DEFECTOS vs INGRESO',
                            data: dataPoints.map(d => d.percentage),
                            type: 'line',
                            borderColor: 'rgba(239, 68, 68, 1)',
                            backgroundColor: 'rgba(239, 68, 68, 0.1)',
                            borderWidth: 3,
                            pointRadius: 5,
                            pointBackgroundColor: 'rgba(239, 68, 68, 1)',
                            yAxisID: 'y1',
                            order: 1,
                            datalabels: {
                                align: 'top',
                                anchor: 'end',
                                color: '#ef4444',
                                font: { weight: 'bold', size: 11 },
                                formatter: (val) => val.toFixed(2) + '%'
                            }
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: true,
                    aspectRatio: 2.5,
                    interaction: {
                        mode: 'index',
                        intersect: false
                    },
                    plugins: {
                        legend: {
                            display: true,
                            position: 'bottom'
                        },
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    const datasetLabel = context.dataset.label || '';
                                    const value = context.parsed.y;
                                    if (context.datasetIndex === 1) {
                                        return datasetLabel + ': ' + value.toFixed(2) + '%';
                                    }
                                    return datasetLabel + ': ' + formatNumber(value);
                                }
                            }
                        },
                        datalabels: {
                            display: function(context) {
                                return context.datasetIndex === 1;
                            }
                        }
                    },
                    scales: {
                        y: {
                            type: 'linear',
                            display: true,
                            position: 'left',
                            title: {
                                display: true,
                                text: 'TOTAL INGRESO A EMBALAJE'
                            },
                            ticks: {
                                callback: function(value) {
                                    return formatNumber(value);
                                }
                            }
                        },
                        y1: {
                            type: 'linear',
                            display: true,
                            position: 'right',
                            suggestedMax: y1Max,
                            title: {
                                display: true,
                                text: '% DEFECTOS vs INGRESO'
                            },
                            ticks: {
                                callback: function(value) {
                                    return value.toFixed(2) + '%';
                                }
                            },
                            grid: {
                                drawOnChartArea: false
                            }
                        }
                    }
                },
                plugins: [ChartDataLabels]
            });

            // summary removed per user request
        }

        function sumTotalDefectos(rows) {
            let total = 0;
            if (!rows || rows.length === 0) {
                console.log('[charts] sumTotalDefectos: no rows');
                return 0;
            }
            const sampleRow = rows[0];
            const availableKeys = Object.keys(sampleRow);
            let foundCols = 0;
            rows.forEach(r => {
                DEFECT_DEFS.forEach(def => {
                    const val = toNumber(r[def.col]);
                    if (val > 0) foundCols++;
                    total += val;
                });
            });
            console.log('[charts] sumTotalDefectos:', total, 'from', rows.length, 'rows, foundCols:', foundCols, 'sample keys:', availableKeys.slice(0,10));
            return total;
        }

        function sumTotalIngreso(rows) {
            let total = 0;
            if (!rows || rows.length === 0) {
                console.log('[charts] sumTotalIngreso: no rows');
                return 0;
            }
            const ingresoKey = detectarColumnaIngreso(rows);
            rows.forEach(r => {
                const val = toNumber(r[ingresoKey]);
                total += val;
            });
            console.log('[charts] sumTotalIngreso:', total, 'from', rows.length, 'rows using key:', ingresoKey);
            return total;
        }

        function detectarColumnaIngreso(rows) {
            if (!rows.length) return "INGRESO A EMBALAJE";
            const headers = Object.keys(rows[0]);
            // Buscar la columna que contenga "INGRESO" y "EMBALAJE"
            let byIngreso = headers.find(h => {
                const upper = toUpperTrim(h);
                return upper.includes('INGRESO') && upper.includes('EMBALAJE');
            });
            // Fallback: buscar solo "INGRESO"
            if (!byIngreso) {
                byIngreso = headers.find(h => toUpperTrim(h).includes('INGRESO'));
            }
            console.log('[charts] detectarColumnaIngreso:', byIngreso, 'from headers:', headers.slice(0,10));
            return byIngreso || "INGRESO A EMBALAJE";
        }

        // Event listeners
        if (btnChartCircle) btnChartCircle.addEventListener('click', openChartsModal);
        if (chartsModalClose) chartsModalClose.addEventListener('click', closeChartsModal);
        if (chartsModalOverlay) chartsModalOverlay.addEventListener('click', (e) => {
            if (e.target === chartsModalOverlay) closeChartsModal();
        });
        if (chartPeriodo) chartPeriodo.addEventListener('change', () => {
            updatePeriodSelects();
            applyDefaultChartRange();
            renderChart();
        });
        if (chartDesdeYear) chartDesdeYear.addEventListener('change', () => {
            updatePeriodSelects();
            renderChart();
        });
        if (chartDesdeWeek) chartDesdeWeek.addEventListener('change', renderChart);
        if (chartHastaYear) chartHastaYear.addEventListener('change', () => {
            updatePeriodSelects();
            renderChart();
        });
        if (chartHastaWeek) chartHastaWeek.addEventListener('change', renderChart);
        if (chartDesdeMonth) chartDesdeMonth.addEventListener('change', renderChart);
        if (chartHastaMonth) chartHastaMonth.addEventListener('change', renderChart);
    })();

    /*************************************************************
     * MODAL DE DEFECTOS PRINCIPALES
     *************************************************************/
    (function setupDefectosChart() {
        const btnDefectosCircle = document.getElementById('btnDefectosCircle');
        const defectosModalOverlay = document.getElementById('defectosModalOverlay');
        const defectosModalClose = document.getElementById('defectosModalClose');
        const defectosPeriodo = document.getElementById('defectosPeriodo');
        const defectosDesdeYear = document.getElementById('defectosDesdeYear');
        const defectosDesdeWeek = document.getElementById('defectosDesdeWeek');
        const defectosHastaYear = document.getElementById('defectosHastaYear');
        const defectosHastaWeek = document.getElementById('defectosHastaWeek');
        const defectosDesdeMonth = document.getElementById('defectosDesdeMonth');
        const defectosHastaMonth = document.getElementById('defectosHastaMonth');
        const defectosCanvas = document.getElementById('defectosCanvas');

        let defectosChartInstance = null;

        function openDefectosModal() {
            defectosModalOverlay.classList.add('open');
            populateDefectosFilters();
            applyDefaultDefectosRange();
            renderDefectosChart();
        }

        function closeDefectosModal() {
            defectosModalOverlay.classList.remove('open');
            if (defectosChartInstance) {
                defectosChartInstance.destroy();
                defectosChartInstance = null;
            }
        }

        function getAvailableDefectosPeriods(periodo, defectRows, fechaKey) {
            if (!defectRows.length || !fechaKey) return [];

            const rawPeriods = [];
            defectRows.forEach(r => {
                const d = tryParseDate(r[fechaKey]);
                if (!d) return;

                const year = d.getFullYear();
                const week = getISOWeek(d);
                const month = d.getMonth() + 1;
                const key = periodo === 'Semanal'
                    ? `${year}|${String(week).padStart(2, '0')}`
                    : `${year}|${String(month).padStart(2, '0')}`;

                rawPeriods.push({ year, week, month, key, date: d });
            });

            rawPeriods.sort((a, b) => a.date - b.date);

            const seen = new Set();
            const periods = [];
            rawPeriods.forEach(p => {
                if (seen.has(p.key)) return;
                seen.add(p.key);
                periods.push(p);
            });

            return periods;
        }

        function applyDefaultDefectosRange() {
            try {
                const defectRows = _originalBdcof || [];
                if (!defectRows.length) return;

                const periodo = defectosPeriodo.value;
                const fechaKey = detectFechaKey(defectRows);
                const periods = getAvailableDefectosPeriods(periodo, defectRows, fechaKey);
                if (!periods.length) return;

                const recent = periods.slice(-7);
                const first = recent[0];
                const last = recent[recent.length - 1];

                defectosDesdeYear.value = String(first.year);
                defectosHastaYear.value = String(last.year);

                updateDefectosPeriodSelects();

                if (periodo === 'Semanal') {
                    defectosDesdeWeek.value = String(first.week);
                    defectosHastaWeek.value = String(last.week);
                } else {
                    defectosDesdeMonth.value = String(first.month);
                    defectosHastaMonth.value = String(last.month);
                }
            } catch (err) {
                console.error('[defectos] Error en applyDefaultDefectosRange:', err);
            }
        }

        function populateDefectosFilters() {
            try {
                // Usar _originalBdcof directamente que ya está cargado
                const defectRows = _originalBdcof || [];
                if (!defectRows.length) {
                    console.error('[defectos] No hay datos disponibles');
                    return;
                }
                
                const fechaKey = detectFechaKey(defectRows);
                console.log('[defectos] fechaKey:', fechaKey, 'rows:', defectRows.length);
                
                let years = getYearsFromRows(defectRows, fechaKey);

                if (!years || years.length === 0) {
                    years = [String((new Date()).getFullYear())];
                }

                defectosDesdeYear.innerHTML = '';
                defectosHastaYear.innerHTML = '';
                years.forEach(y => {
                    const opt1 = document.createElement('option');
                    opt1.value = y;
                    opt1.textContent = y;
                    defectosDesdeYear.appendChild(opt1);
                    
                    const opt2 = document.createElement('option');
                    opt2.value = y;
                    opt2.textContent = y;
                    defectosHastaYear.appendChild(opt2);
                });

                if (years.length > 0) {
                    defectosDesdeYear.value = years[0];
                    defectosHastaYear.value = years[years.length - 1];
                }

                updateDefectosPeriodSelects();
            } catch (err) {
                console.error('[defectos] Error en populateDefectosFilters:', err);
            }
        }

        function updateDefectosPeriodSelects() {
            try {
                const periodo = defectosPeriodo.value;
                const defectRows = _originalBdcof || [];
                if (!defectRows.length) return;
                const fechaKey = detectFechaKey(defectRows);

            if (periodo === 'Semanal') {
                document.getElementById('defectosDesdeYearLabel').style.display = '';
                document.getElementById('defectosDesdeWeekLabel').style.display = '';
                document.getElementById('defectosHastaYearLabel').style.display = '';
                document.getElementById('defectosHastaWeekLabel').style.display = '';
                document.getElementById('defectosDesdeMonthLabel').style.display = 'none';
                document.getElementById('defectosHastaMonthLabel').style.display = 'none';

                const yearDesde = defectosDesdeYear.value;
                const yearHasta = defectosHastaYear.value;
                const prevDesdeWeek = defectosDesdeWeek.value;
                const prevHastaWeek = defectosHastaWeek.value;
                
                defectosDesdeWeek.innerHTML = '';
                defectosHastaWeek.innerHTML = '';
                
                if (yearDesde) {
                    let weeksDesde = getWeeksForYear(defectRows, yearDesde, fechaKey);
                    if (!weeksDesde || weeksDesde.length === 0) {
                        weeksDesde = Array.from({length:52}, (_,i) => i+1);
                    }
                    weeksDesde.forEach(w => {
                        const opt = document.createElement('option');
                        opt.value = w;
                        opt.textContent = `Sem${w}`;
                        defectosDesdeWeek.appendChild(opt);
                    });
                    if (prevDesdeWeek && weeksDesde.includes(parseInt(prevDesdeWeek, 10))) {
                        defectosDesdeWeek.value = prevDesdeWeek;
                    } else if (weeksDesde.length > 0) {
                        defectosDesdeWeek.value = String(weeksDesde[0]);
                    }
                }
                
                if (yearHasta) {
                    let weeksHasta = getWeeksForYear(defectRows, yearHasta, fechaKey);
                    if (!weeksHasta || weeksHasta.length === 0) {
                        weeksHasta = Array.from({length:52}, (_,i) => i+1);
                    }
                    weeksHasta.forEach(w => {
                        const opt = document.createElement('option');
                        opt.value = w;
                        opt.textContent = `Sem${w}`;
                        defectosHastaWeek.appendChild(opt);
                    });
                    if (prevHastaWeek && weeksHasta.includes(parseInt(prevHastaWeek, 10))) {
                        defectosHastaWeek.value = prevHastaWeek;
                    } else if (weeksHasta.length > 0) {
                        defectosHastaWeek.value = String(weeksHasta[weeksHasta.length - 1]);
                    }
                }
            } else {
                document.getElementById('defectosDesdeYearLabel').style.display = '';
                document.getElementById('defectosDesdeWeekLabel').style.display = 'none';
                document.getElementById('defectosHastaYearLabel').style.display = '';
                document.getElementById('defectosHastaWeekLabel').style.display = 'none';
                document.getElementById('defectosDesdeMonthLabel').style.display = '';
                document.getElementById('defectosHastaMonthLabel').style.display = '';

                const monthNames = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
                const prevDesdeMonth = defectosDesdeMonth.value;
                const prevHastaMonth = defectosHastaMonth.value;
                defectosDesdeMonth.innerHTML = '';
                defectosHastaMonth.innerHTML = '';
                
                for (let i = 1; i <= 12; i++) {
                    const opt1 = document.createElement('option');
                    opt1.value = i;
                    opt1.textContent = monthNames[i - 1];
                    defectosDesdeMonth.appendChild(opt1);
                    
                    const opt2 = document.createElement('option');
                    opt2.value = i;
                    opt2.textContent = monthNames[i - 1];
                    defectosHastaMonth.appendChild(opt2);
                }
                if (prevDesdeMonth) {
                    defectosDesdeMonth.value = prevDesdeMonth;
                } else {
                    defectosDesdeMonth.value = '1';
                }
                if (prevHastaMonth) {
                    defectosHastaMonth.value = prevHastaMonth;
                } else {
                    defectosHastaMonth.value = '12';
                }
            }
            } catch (err) {
                console.error('[defectos] Error en updateDefectosPeriodSelects:', err);
            }
        }

        function getTop6Defectos() {
            const defectRows = _originalBdcof || [];
            if (!defectRows.length) return [];
            const defectosTotales = {};

            DEFECT_DEFS.forEach(def => {
                let total = 0;
                defectRows.forEach(r => {
                    total += toNumber(r[def.col]);
                });
                if (total > 0) {
                    defectosTotales[def.defecto] = { col: def.col, total };
                }
            });

            const sorted = Object.entries(defectosTotales)
                .sort((a, b) => b[1].total - a[1].total)
                .slice(0, 6);

            return sorted.map(([defecto, data]) => ({ defecto, col: data.col }));
        }

        function sumTotalIngresoDefectos(rows) {
            let total = 0;
            if (!rows || rows.length === 0) {
                console.log('[defectos] sumTotalIngresoDefectos: no rows');
                return 0;
            }
            const ingresoKey = detectarColumnaIngreso(rows);
            rows.forEach(r => {
                const val = toNumber(r[ingresoKey]);
                total += val;
            });
            console.log('[defectos] sumTotalIngresoDefectos:', total, 'from', rows.length, 'rows using key:', ingresoKey);
            return total;
        }

        function renderDefectosChart() {
            try {
                const periodo = defectosPeriodo.value;
                const defectRows = _originalBdcof || [];
                if (!defectRows.length) {
                    console.error('[defectos] No hay datos de defectos disponibles');
                    return;
                }
                const fechaKey = detectFechaKey(defectRows);
                const top6 = getTop6Defectos();

                console.log('[defectos] Top 6 defectos:', top6);

                let dataPoints = [];

            if (periodo === 'Semanal') {
                const weekLabel = (week) => `SEM${String(week).padStart(2, '0')}`;
                const yearDesde = parseInt(defectosDesdeYear.value);
                const weekDesde = parseInt(defectosDesdeWeek.value);
                const yearHasta = parseInt(defectosHastaYear.value);
                const weekHasta = parseInt(defectosHastaWeek.value);

                const allWeeks = [];
                for (let y = yearDesde; y <= yearHasta; y++) {
                    const weeks = getWeeksForYear(defectRows, y.toString(), fechaKey);
                    weeks.forEach(w => {
                        const inRange = (yearDesde === yearHasta)
                            ? (y === yearDesde && w >= weekDesde && w <= weekHasta)
                            : ((y === yearDesde && w >= weekDesde) ||
                               (y === yearHasta && w <= weekHasta) ||
                               (y > yearDesde && y < yearHasta));
                        if (inRange) {
                            allWeeks.push({ year: y, week: w });
                        }
                    });
                }

                dataPoints = allWeeks.map(({ year, week }) => {
                    const filtered = filterByPeriod(defectRows, 'SEMANA', `${year}|${String(week).padStart(2, '0')}`);
                    const bdcofprodFiltered = filterIngresoRowsByPeriod(_originalBdcofprod, 'SEMANA', `${year}|${String(week).padStart(2,'0')}`);
                    const totalIngreso = sumTotalIngresoDefectos(bdcofprodFiltered);
                    
                    const defectosData = {};
                    top6.forEach(({ defecto, col }) => {
                        let total = 0;
                        filtered.forEach(r => {
                            total += toNumber(r[col]);
                        });
                        // Calcular %Def = (Total Defecto / Ingreso a Embalaje) * 100
                        const porcentaje = totalIngreso > 0 ? (total / totalIngreso) * 100 : 0;
                        defectosData[defecto] = porcentaje;
                    });

                    return {
                        label: weekLabel(week),
                        fullLabel: `${year}-${weekLabel(week)}`,
                        ...defectosData
                    };
                });
            } else {
                const monthDesde = parseInt(defectosDesdeMonth.value);
                const monthHasta = parseInt(defectosHastaMonth.value);
                const monthNames = ['ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN', 'JUL', 'AGO', 'SEP', 'OCT', 'NOV', 'DIC'];
                const yearDesde = parseInt(defectosDesdeYear.value);
                const yearHasta = parseInt(defectosHastaYear.value);

                const allMonths = [];
                for (let y = yearDesde; y <= yearHasta; y++) {
                    const startM = (y === yearDesde) ? monthDesde : 1;
                    const endM = (y === yearHasta) ? monthHasta : 12;
                    for (let m = startM; m <= endM; m++) allMonths.push({ year: y, month: m });
                }

                    allMonths.forEach(({ year, month }) => {
                        const filtered = defectRows.filter(r => {
                            const d = tryParseDate(r[fechaKey]);
                            return d && d.getFullYear() === year && (d.getMonth() + 1) === month;
                        });
                    const bdcofprodFiltered = filterIngresoRowsByPeriod(_originalBdcofprod, 'MES', `${year}|${String(month).padStart(2,'0')}`);
                    const totalIngreso = sumTotalIngresoDefectos(bdcofprodFiltered);

                    const defectosData = {};
                    top6.forEach(({ defecto, col }) => {
                        let total = 0;
                        filtered.forEach(r => {
                            total += toNumber(r[col]);
                        });
                        // Calcular %Def = (Total Defecto / Ingreso a Embalaje) * 100
                        const porcentaje = totalIngreso > 0 ? (total / totalIngreso) * 100 : 0;
                        defectosData[defecto] = porcentaje;
                    });

                    dataPoints.push({
                        label: `${year}-${monthNames[month - 1]}`,
                        fullLabel: `${year}-${monthNames[month - 1]}`,
                        ...defectosData
                    });
                });
            }

                console.log('[defectos] dataPoints sample:', dataPoints.slice(0, 3));

                if (defectosChartInstance) {
                    defectosChartInstance.destroy();
                }

            // Colores para las líneas
            const colors = [
                { border: 'rgba(239, 68, 68, 1)', bg: 'rgba(239, 68, 68, 0.1)' },    // rojo
                { border: 'rgba(59, 130, 246, 1)', bg: 'rgba(59, 130, 246, 0.1)' },  // azul
                { border: 'rgba(245, 158, 11, 1)', bg: 'rgba(245, 158, 11, 0.1)' },  // naranja
                { border: 'rgba(16, 185, 129, 1)', bg: 'rgba(16, 185, 129, 0.1)' },  // verde
                { border: 'rgba(139, 92, 246, 1)', bg: 'rgba(139, 92, 246, 0.1)' },  // morado
                { border: 'rgba(236, 72, 153, 1)', bg: 'rgba(236, 72, 153, 0.1)' }   // rosa
            ];

            const datasets = top6.map(({ defecto }, idx) => {
                const color = colors[idx % colors.length];
                return {
                    label: defecto,
                    data: dataPoints.map(d => d[defecto] || 0),
                    borderColor: color.border,
                    backgroundColor: color.bg,
                    borderWidth: 2,
                    pointRadius: 4,
                    pointBackgroundColor: color.border,
                    tension: 0.3,
                    fill: false
                };
            });

            const ctx = defectosCanvas.getContext('2d');

            // Calcular máximo Y en base a los datos para dejar margen visible
            let maxVal = 0;
            datasets.forEach(ds => {
                (ds.data || []).forEach(v => { if (v > maxVal) maxVal = v; });
            });
            if (!isFinite(maxVal) || maxVal <= 0) maxVal = 1;
            const yMax = Math.ceil((maxVal * 1.12) * 100) / 100;

            defectosChartInstance = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: dataPoints.map(d => d.label),
                    datasets: datasets
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: true,
                    aspectRatio: 2.5,
                    interaction: {
                        mode: 'index',
                        intersect: false
                    },
                    plugins: {
                        legend: {
                            display: true,
                            position: 'bottom',
                            labels: {
                                usePointStyle: true,
                                pointStyle: 'circle',
                                padding: 15
                            },
                            onClick: function(e, legendItem, legend) {
                                const chart = legend.chart;
                                const clickedIndex = legendItem.datasetIndex;

                                // Contar visibles actualmente
                                const visibleCount = chart.data.datasets.reduce((acc, d, i) => acc + (!chart.getDatasetMeta(i).hidden ? 1 : 0), 0);
                                const clickedVisible = !chart.getDatasetMeta(clickedIndex).hidden;

                                if (visibleCount === 1 && clickedVisible) {
                                    // Si solo estaba visible la serie clickeada -> restaurar todas visibles
                                    chart.data.datasets.forEach((d, i) => {
                                        chart.getDatasetMeta(i).hidden = false;
                                    });
                                } else {
                                    // Mostrar únicamente la serie clickeada, ocultar las demás
                                    chart.data.datasets.forEach((d, i) => {
                                        chart.getDatasetMeta(i).hidden = (i !== clickedIndex);
                                    });
                                }

                                chart.update();
                            }
                        },
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    return context.dataset.label + ': ' + context.parsed.y.toFixed(2) + '%';
                                }
                            }
                        },
                        datalabels: {
                            display: function(ctx) {
                                const chart = ctx.chart;
                                const visibleCount = chart.data.datasets.reduce((acc, d, i) => acc + (!chart.getDatasetMeta(i).hidden ? 1 : 0), 0);
                                return visibleCount === 1 && !chart.getDatasetMeta(ctx.datasetIndex).hidden;
                            },
                            align: 'top',
                            anchor: 'end',
                            color: '#111',
                            font: function(ctx) {
                                return { weight: 'bold', size: 12 };
                            },
                            formatter: function(val) { return Number(val).toFixed(2) + '%'; }
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            suggestedMax: yMax,
                            title: {
                                display: true,
                                text: '% Defectos (% Def.)'
                            },
                            ticks: {
                                callback: function(value) {
                                    return value.toFixed(2) + '%';
                                }
                            }
                        },
                        x: {
                            title: {
                                display: false
                            }
                        }
                    }
                },
                plugins: [ChartDataLabels]
            });
            } catch (err) {
                console.error('[defectos] Error en renderDefectosChart:', err);
            }
        }

        if (btnDefectosCircle) btnDefectosCircle.addEventListener('click', openDefectosModal);
        if (defectosModalClose) defectosModalClose.addEventListener('click', closeDefectosModal);
        if (defectosModalOverlay) defectosModalOverlay.addEventListener('click', (e) => {
            if (e.target === defectosModalOverlay) closeDefectosModal();
        });
        if (defectosPeriodo) defectosPeriodo.addEventListener('change', () => {
            updateDefectosPeriodSelects();
            applyDefaultDefectosRange();
            renderDefectosChart();
        });
        if (defectosDesdeYear) defectosDesdeYear.addEventListener('change', () => {
            updateDefectosPeriodSelects();
            renderDefectosChart();
        });
        if (defectosDesdeWeek) defectosDesdeWeek.addEventListener('change', renderDefectosChart);
        if (defectosHastaYear) defectosHastaYear.addEventListener('change', () => {
            updateDefectosPeriodSelects();
            renderDefectosChart();
        });
        if (defectosHastaWeek) defectosHastaWeek.addEventListener('change', renderDefectosChart);
        if (defectosDesdeMonth) defectosDesdeMonth.addEventListener('change', renderDefectosChart);
        if (defectosHastaMonth) defectosHastaMonth.addEventListener('change', renderDefectosChart);
    })();

    

        // ===== Fin del script original =====

        // Exponer en window las funciones usadas por handlers inline (si las hay)
        [].forEach(function (__n) { try { window[__n] = eval(__n); } catch (__e) {} });
    }

    App.registerView('reporte-inspeccion', { title: 'Reporte Inspeccion', mount: mount });
})();
