/* ============================================================
   lib/charts.js — helpers compartidos de Chart.js
   Registra el plugin de datalabels una sola vez para toda la app.
   ============================================================ */

window.App = window.App || {};
App.lib = App.lib || {};

App.lib.charts = (function () {
    let registered = false;

    // Registra los plugins globales de Chart.js (idempotente).
    function registerPlugins() {
        if (registered) return;
        if (window.Chart && window.ChartDataLabels) {
            Chart.register(ChartDataLabels);
            registered = true;
        }
    }

    // Intentar registrar al cargar y, como Chart.js va con `defer` en el shell
    // (aún no se ejecutó cuando corre este archivo), reintentar en
    // DOMContentLoaded: ese evento se dispara DESPUÉS de los scripts diferidos.
    registerPlugins();
    if (!registered) document.addEventListener('DOMContentLoaded', registerPlugins);

    return { registerPlugins };
})();
