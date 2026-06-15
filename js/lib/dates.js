/* ============================================================
   lib/dates.js — utilidades de fechas y semana ISO compartidas
   - getWeekNumber:   semana ISO de un Date (idéntica en todos los paneles)
   - parseDateFlexible: parseo robusto de fechas (GViz, Excel, dd/mm, etc.)
   - getWeekFromRow:  extrae la semana de una fila (SEM##, número o fecha)
   NOTA: algunos paneles tienen variantes propias de parseDateFlexible
   (p. ej. con preferencia DMY/MDY). Esta es la versión general.
   ============================================================ */

window.App = window.App || {};
App.lib = App.lib || {};

App.lib.dates = (function () {
    function getWeekNumber(date) {
        const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
        const dayNum = d.getUTCDay() || 7;
        d.setUTCDate(d.getUTCDate() + 4 - dayNum);
        const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
        return Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
    }

    function parseDateFlexible(input) {
        if (!input && input !== 0) return null;
        if (input instanceof Date) return isNaN(input) ? null : input;
        if (typeof input === 'object' && input.v instanceof Date) return isNaN(input.v) ? null : input.v;
        if (typeof input === 'object' && input.f) {
            const parsed = parseDateFlexible(String(input.f).trim());
            if (parsed) return parsed;
        }
        if (typeof input === 'number') {
            if (input > 0 && input < 100000) {
                const excelEpoch = new Date(1899, 11, 30);
                const d = new Date(excelEpoch.getTime() + input * 86400000);
                if (!isNaN(d)) return d;
            }
            const d2 = new Date(input);
            if (!isNaN(d2)) return d2;
        }
        const s = String(input).trim();
        if (!s) return null;
        const dateMatch = s.match(/^Date\((\d+),(\d+),(\d+)\)$/);
        if (dateMatch) {
            const year = parseInt(dateMatch[1], 10);
            const month = parseInt(dateMatch[2], 10);
            const day = parseInt(dateMatch[3], 10);
            const d = new Date(year, month, day);
            if (!isNaN(d)) return d;
        }
        let d = new Date(s);
        if (!isNaN(d) && d.getFullYear() > 1900) return d;
        const m1 = s.match(/^(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})$/);
        if (m1) {
            const p1 = parseInt(m1[1], 10), p2 = parseInt(m1[2], 10), year = parseInt(m1[3], 10);
            function tryDMY() { return new Date(year, p2 - 1, p1); }
            function tryMDY() { return new Date(year, p1 - 1, p2); }
            let res = tryMDY(); if (!isNaN(res)) return res;
            res = tryDMY(); if (!isNaN(res)) return res;
        }
        const m2 = s.match(/^(\d{4})[\/\-](\d{1,2})[\/\-](\d{1,2})/);
        if (m2) {
            const year = parseInt(m2[1], 10);
            const month = parseInt(m2[2], 10) - 1;
            const day = parseInt(m2[3], 10);
            d = new Date(year, month, day);
            if (!isNaN(d)) return d;
        }
        return null;
    }

    function getWeekFromRow(r) {
        if (!r) return 0;
        if (r._week) return App.lib.format.toNum(r._week);
        if (r.SEM && typeof r.SEM === 'number') return App.lib.format.toNum(r.SEM);
        const s = (r.SEM || r.sem || r['SEM'] || '').toString().toUpperCase().trim();
        const m = s.match(/(\d{1,3})$/);
        if (m) return App.lib.format.toNum(m[1]);
        const m2 = s.match(/SEM\s*(\d{1,3})/i);
        if (m2) return App.lib.format.toNum(m2[1]);
        const dateCandidates = ['FECHA DE TIMBRADO', 'FECHA_DE_TIMBRADO', 'FECHA', 'Fecha', 'FECHA_CORTE', 'FECHA CORTE'];
        for (const key of dateCandidates) {
            const v = r[key];
            const d = parseDateFlexible(v);
            if (d) return getWeekNumber(d);
        }
        return 0;
    }

    return { getWeekNumber, parseDateFlexible, getWeekFromRow };
})();
