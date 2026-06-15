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

    return { toNum, toTitleCase, normalizeDefectLabel };
})();
