/* ============================================================
   lib/format.js — utilidades de formato/normalización compartidas
   - toNum: convierte a número (vacío/no numérico => 0)
   - toTitleCase: "HOLA MUNDO" => "Hola Mundo"
   - normalizeDefectLabel: normaliza etiquetas de defectos conocidas
   ============================================================ */

window.App = window.App || {};
App.lib = App.lib || {};

App.lib.format = (function () {
    function toNum(val) {
        if (val === '' || val === null || val === undefined) return 0;
        const num = parseFloat(val);
        return isNaN(num) ? 0 : num;
    }

    function toTitleCase(s) {
        if (!s && s !== 0) return '';
        const str = String(s).trim().toLowerCase();
        return str.split(/\s+/).map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    }

    function normalizeDefectLabel(raw) {
        if (!raw && raw !== 0) return '';
        const key = String(raw).trim().toUpperCase();
        const map = {
            'HUECO POR PRUEBA': 'Hueco Prueba',
            'HUECO POR PROCESO': 'Hueco Proceso',
            'MANCHAS DE TINTORERIA': 'Mnch Tinto',
            'MANCHAS DE TINTORERÍA': 'Mnch Tinto'
        };
        if (map[key]) return map[key];
        return toTitleCase(raw);
    }

    // Parsea números con separadores latinos (miles '.', decimal ',') y otros
    // formatos que llegan de Sheets. Heurística: si tras un único tipo de separador
    // el último grupo tiene 3 dígitos, se interpreta como separador de MILES.
    // (Distinto de toNum: este sí entiende "1.234,56" y "1,234" => 1234.)
    function toNumberLocale(value) {
        if (value === null || value === undefined || value === '') return 0;
        let s = String(value).trim();
        if (s === '') return 0;
        s = s.replace(/\s+/g, '');
        if (s.indexOf('.') > -1 && s.indexOf(',') > -1) {
            s = s.replace(/\./g, '').replace(/,/g, '.');
        } else if (s.indexOf(',') > -1) {
            const parts = s.split(',');
            if (parts[parts.length - 1].length === 3) {
                s = parts.join('');
            } else {
                s = s.replace(/,/g, '.');
            }
        } else if (s.indexOf('.') > -1) {
            const parts = s.split('.');
            if (parts[parts.length - 1].length === 3) {
                s = parts.join('');
            }
        }
        const n = parseFloat(s);
        return isNaN(n) ? 0 : n;
    }

    // Formato es-PE: enteros sin decimales y porcentajes con N decimales.
    function formatInt(n) {
        return n.toLocaleString('es-PE', { maximumFractionDigits: 0 });
    }

    function formatPercentLocale(p, decimals = 2) {
        if (!isFinite(p)) return '0.00%';
        return p.toLocaleString('es-PE', {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals
        }) + '%';
    }

    return { toNum, toTitleCase, normalizeDefectLabel, toNumberLocale, formatInt, formatPercentLocale };
})();
