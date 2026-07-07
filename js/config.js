/* ============================================================
   config.js — configuración central del proyecto
   Todos los IDs de Google Sheets y nombres de pestañas en un solo lugar.
   ============================================================ */

window.App = window.App || {};

App.config = {
    // Fuentes de datos por panel (ver README.md §3)
    sheets: {
        // Reporte Depurado en Corte
        depurado: {
            id: '1sFkWMxxLM7DO4erVoQtvHyrUk8ynJ4E1PVf6dIwnuBg',
            base: 'base',
            prodCorte: 'prod_corte',
            acciones: 'acciones'
        },
        // Resumen de Auditoría por Factory Code
        factoryCode: {
            id: '1nEvl2vlYNC2SVOYTRXuij-0duWZ_Aw3NqyP-8Zi5raA',
            name: 'GRID'
        },
        // Auditorías de Producto Terminado (comparte spreadsheet con Factory Code)
        productoTerminado: {
            id: '1nEvl2vlYNC2SVOYTRXuij-0duWZ_Aw3NqyP-8Zi5raA',
            name: 'GRID'
        },
        // Segundas y Terceras
        segundas: {
            id: '1CicFN8Csk9D8rebBJMzshvqMaCCmcb7GmcNrhqUL4yc',
            defectos: 'Defectos',
            ingreso: 'ingreso a linea'
        },
        // Resultado Auditoría Empaque
        empaque: {
            id: '1RB48rgEm2anTARE_54XXcxeSs6G8Kt6N',
            name: 'GRID'
        },
        // Auditoría Lotes de Producción
        auditoriaLotes: {
            id: '1Xu3bN-RVzPYuIqcVyb0ZxvlFTUjl2_MWHnDJik6lZ4s',
            name: 'data'
        },
        // Reporte Inspección
        reporteInspeccion: {
            id: '1NywhboH-QcezeVyBgnd3U8kG6fL1I3CqN0kFkOE6h1M',
            bdcof: 'bdcof',
            ingembcof: 'ingembcof',
            bdcofprod: 'bdcofprod'
        }
    },

    // Metas / umbrales de negocio usados por los paneles
    metas: {
        // Panel depurado: % mínimo de "Eficiencia Global" (100 − %pérdida)
        // para que el KPI muestre "✅ Óptimo" en vez de "⚠️ Mejorar".
        eficienciaGlobalDepurado: 95
    }
};
