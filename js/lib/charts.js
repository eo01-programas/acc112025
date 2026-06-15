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

    // Intentar registrar al cargar (Chart.js ya está en el <head> del shell)
    registerPlugins();

    return { registerPlugins };
})();
