/* ============================================================
   views/producto-terminado.js - Vista "Auditorias de Producto Terminado" (SPA)
   Migrado desde RESULTADO DE AUDITORIAS DE PRODUCTO TERMINADO.html. Logica y marcado originales: el <script> se
   ejecuta dentro de mount() (tras inyectar el template) para que el
   DOM exista, igual que cuando el <script> estaba al final del body.
   Arranques diferidos (DOMContentLoaded / ready) -> ejecucion inmediata.
   ============================================================ */
(function () {
    var TEMPLATE = "    \u003cdiv id=\"error-banner\"\u003e\u003c/div\u003e\r\n    \r\n    \u003cdiv class=\"container\"\u003e\r\n        \u003cdiv class=\"header-title\"\u003e\r\n            \u003ch1\u003eRESULTADO DE AUDITORIAS DE PRODUCTO TERMINADO\u003c/h1\u003e\r\n            \u003ca href=\"#/\" class=\"back-btn\" title=\"Inicio\"\u003e🏠\u003c/a\u003e\r\n        \u003c/div\u003e\r\n        \u003cdiv class=\"controls\"\u003e\r\n            \u003cdiv class=\"controls-left\"\u003e\r\n                \u003cdiv class=\"control-group\"\u003e\r\n                    \u003clabel for=\"fileInput\"\u003eCargar archivo Excel:\u003c/label\u003e\r\n                    \u003cinput type=\"file\" id=\"fileInput\" accept=\".xlsx,.xls,.csv\"\u003e\r\n                \u003c/div\u003e\r\n                \r\n                \u003cdiv class=\"control-group\"\u003e\r\n                    \u003clabel for=\"sheetSelect\"\u003eSeleccionar hoja:\u003c/label\u003e\r\n                    \u003cselect id=\"sheetSelect\" disabled\u003e\r\n                        \u003coption value=\"\"\u003eSeleccionar hoja...\u003c/option\u003e\r\n                    \u003c/select\u003e\r\n                \u003c/div\u003e\r\n                \r\n                \u003cdiv id=\"loadingStatus\" class=\"loading\"\u003eCargando datos...\u003c/div\u003e\r\n            \u003c/div\u003e\r\n            \r\n            \u003cdiv class=\"buttons-container\"\u003e\r\n                \u003cdiv class=\"filters-row\"\u003e\r\n                    \u003cdiv class=\"labelframe\"\u003e\r\n                        \u003cspan class=\"labelframe-title\"\u003eFecha:\u003c/span\u003e\r\n                        \u003cdiv class=\"labelframe-content\"\u003e\r\n                            \u003cinput type=\"date\" id=\"dateFromFilter\" title=\"Desde\" /\u003e\r\n                            \u003cinput type=\"date\" id=\"dateToFilter\" title=\"Hasta\" /\u003e\r\n                            \u003cbutton id=\"btnClearFilters\" class=\"btn-clear\" onclick=\"clearDateFilters()\"\u003eLimpiar\u003c/button\u003e\r\n                            \u003cdiv class=\"switch-container\"\u003e\r\n                                \u003clabel class=\"toggle-switch\"\u003e\r\n                                    \u003cinput type=\"checkbox\" id=\"todaySwitch\"\u003e\r\n                                    \u003cspan class=\"toggle-slider\"\u003e\u003c/span\u003e\r\n                                \u003c/label\u003e\r\n                                \u003clabel class=\"switch-label\"\u003eHoy\u003c/label\u003e\r\n                                \u003clabel class=\"toggle-switch\"\u003e\r\n                                    \u003cinput type=\"checkbox\" id=\"yesterdaySwitch\"\u003e\r\n                                    \u003cspan class=\"toggle-slider\"\u003e\u003c/span\u003e\r\n                                \u003c/label\u003e\r\n                                \u003clabel class=\"switch-label\"\u003eAyer\u003c/label\u003e\r\n                            \u003c/div\u003e\r\n                        \u003c/div\u003e\r\n                    \u003c/div\u003e\r\n                    \r\n                    \u003cdiv class=\"labelframe\"\u003e\r\n                        \u003cspan class=\"labelframe-title\"\u003eFactory Filters:\u003c/span\u003e\r\n                        \u003cdiv class=\"labelframe-content\"\u003e\r\n                            \u003cdiv class=\"switch-container\"\u003e\r\n                                \u003clabel class=\"toggle-switch\"\u003e\r\n                                    \u003cinput type=\"checkbox\" id=\"cofacoSwitch\"\u003e\r\n                                    \u003cspan class=\"toggle-slider\"\u003e\u003c/span\u003e\r\n                                \u003c/label\u003e\r\n                                \u003clabel class=\"switch-label\"\u003eCofaco\u003c/label\u003e\r\n                            \u003c/div\u003e\r\n                            \u003cdiv class=\"switch-container\"\u003e\r\n                                \u003clabel class=\"toggle-switch\"\u003e\r\n                                    \u003cinput type=\"checkbox\" id=\"cititex1Switch\"\u003e\r\n                                    \u003cspan class=\"toggle-slider\"\u003e\u003c/span\u003e\r\n                                \u003c/label\u003e\r\n                                \u003clabel class=\"switch-label\"\u003eCititex 1\u003c/label\u003e\r\n                            \u003c/div\u003e\r\n                            \u003cdiv class=\"switch-container\"\u003e\r\n                                \u003clabel class=\"toggle-switch\"\u003e\r\n                                    \u003cinput type=\"checkbox\" id=\"cititex2Switch\"\u003e\r\n                                    \u003cspan class=\"toggle-slider\"\u003e\u003c/span\u003e\r\n                                \u003c/label\u003e\r\n                                \u003clabel class=\"switch-label\"\u003eCititex 2\u003c/label\u003e\r\n                            \u003c/div\u003e\r\n                        \u003c/div\u003e\r\n                    \u003c/div\u003e\r\n                \u003c/div\u003e\r\n                \r\n                \u003cdiv style=\"display: flex; align-items: center;\"\u003e\r\n                    \u003cbutton id=\"btnDownload\" class=\"btn-download\" disabled\u003eDescargar Excel\u003c/button\u003e\r\n                    \u003cbutton id=\"btnCharts\" class=\"btn-charts\" disabled\u003eGráficos\u003c/button\u003e\r\n                \u003c/div\u003e\r\n            \u003c/div\u003e\r\n        \u003c/div\u003e\r\n\r\n        \u003cdiv class=\"table-section\"\u003e\r\n            \u003cdiv class=\"table-wrapper\"\u003e\r\n                \u003ctable id=\"dataTable\"\u003e\r\n                    \u003cthead\u003e\r\n                        \u003ctr\u003e\r\n                            \u003cth\u003eFactory Code\u003c/th\u003e\r\n                            \u003cth\u003eCustomer\u003c/th\u003e\r\n                            \u003cth\u003eAudit Date\u003c/th\u003e\r\n                            \u003cth\u003eOP\u003c/th\u003e\r\n                            \u003cth\u003eColor/ID\u003c/th\u003e\r\n                            \u003cth\u003eLot Size\u003c/th\u003e\r\n                            \u003cth\u003eResult\u003c/th\u003e\r\n                        \u003c/tr\u003e\r\n                    \u003c/thead\u003e\r\n                    \u003ctbody\u003e\r\n                        \u003ctr\u003e\r\n                            \u003ctd colspan=\"7\" class=\"no-data\"\u003eCargando datos...\u003c/td\u003e\r\n                        \u003c/tr\u003e\r\n                    \u003c/tbody\u003e\r\n                \u003c/table\u003e\r\n            \u003c/div\u003e\r\n        \u003c/div\u003e\r\n    \u003c/div\u003e\r\n\r\n    \u003c!-- Modal para Gráficos --\u003e\r\n    \u003cdiv id=\"chartsModal\" class=\"modal\"\u003e\r\n        \u003cdiv class=\"modal-content\"\u003e\r\n            \u003cdiv class=\"modal-header\"\u003e\r\n                \u003ch2 class=\"modal-title\"\u003e#Auditorias/Lot Size\u003c/h2\u003e\r\n                \u003cdiv class=\"modal-filters\"\u003e\r\n                    \u003clabel for=\"factoryFilter\"\u003eFactory Code:\u003c/label\u003e\r\n                    \u003cselect id=\"factoryFilter\"\u003e\r\n                        \u003coption value=\"all\"\u003eTodos los Factory Codes\u003c/option\u003e\r\n                    \u003c/select\u003e\r\n                \u003c/div\u003e\r\n                \u003cspan class=\"close\" id=\"closeModal\"\u003e\u0026times;\u003c/span\u003e\r\n            \u003c/div\u003e\r\n            \u003cdiv class=\"chart-container\"\u003e\r\n                \u003ccanvas id=\"auditChart\"\u003e\u003c/canvas\u003e\r\n            \u003c/div\u003e\r\n        \u003c/div\u003e\r\n    \u003c/div\u003e\r\n\r\n    \u003c!-- Modal para detalles de OP (solo Rejected) --\u003e\r\n    \u003cdiv id=\"opDetailsModal\" class=\"modal\"\u003e\r\n        \u003cdiv class=\"modal-content\"\u003e\r\n            \u003cdiv class=\"modal-header\"\u003e\r\n                \u003cdiv\u003e\r\n                    \u003ch2 id=\"opModalTitleHM\" class=\"modal-title\"\u003eRechazo - HM: -\u003c/h2\u003e\r\n                    \u003cdiv id=\"opModalTitleColor\" style=\"font-size:18px; font-weight:700; margin-top:6px; color:#333;\"\u003eColor: -\u003c/div\u003e\r\n                \u003c/div\u003e\r\n                \u003cspan class=\"close\" id=\"closeOpModal\"\u003e\u0026times;\u003c/span\u003e\r\n            \u003c/div\u003e\r\n\r\n            \u003cdiv style=\"max-height:65vh; overflow:auto; padding:6px 0;\"\u003e\r\n                \u003ctable id=\"opDetailsTable\" style=\"width:100%; border-collapse:collapse; font-size:13px;\"\u003e\r\n                    \u003cthead\u003e\r\n                        \u003ctr\u003e\r\n                            \u003cth style=\"text-align:left; padding:8px; border-bottom:1px solid #e0e0e0;\"\u003eCampo\u003c/th\u003e\r\n                            \u003cth style=\"text-align:left; padding:8px; border-bottom:1px solid #e0e0e0;\"\u003eValor\u003c/th\u003e\r\n                        \u003c/tr\u003e\r\n                    \u003c/thead\u003e\r\n                    \u003ctbody\u003e\r\n                        \u003c!-- Filas generadas dinámicamente --\u003e\r\n                    \u003c/tbody\u003e\r\n                \u003c/table\u003e\r\n            \u003c/div\u003e\r\n        \u003c/div\u003e\r\n    \u003c/div\u003e\r\n";

    function mount(root) {
        root.innerHTML = TEMPLATE;
        var __ready = function (fn) { if (typeof fn === 'function') fn(); };

        // ===== Script original del panel (relocado a mount) =====
        // Google Sheets configuration
        const SHEET_ID = '1nEvl2vlYNC2SVOYTRXuij-0duWZ_Aw3NqyP-8Zi5raA';
        const SHEET_NAME = 'GRID'; // Change this to match your sheet tab name

        let workbook = null;
        let currentData = [];
        let gridData = [];
        let filteredData = []; // Datos actualmente filtrados y mostrados en la tabla

        // DOM elements
        const fileInput = document.getElementById('fileInput');
        const sheetSelect = document.getElementById('sheetSelect');
        const dataTable = document.getElementById('dataTable');
        const btnDownload = document.getElementById('btnDownload');
        const loadingStatus = document.getElementById('loadingStatus');
        const errorBanner = document.getElementById('error-banner');
        const dateFromFilter = document.getElementById('dateFromFilter');
        const dateToFilter = document.getElementById('dateToFilter');
        const todaySwitch = document.getElementById('todaySwitch');
        const yesterdaySwitch = document.getElementById('yesterdaySwitch');
        const cofacoSwitch = document.getElementById('cofacoSwitch');
        const cititex1Switch = document.getElementById('cititex1Switch');
        const cititex2Switch = document.getElementById('cititex2Switch');
        const btnCharts = document.getElementById('btnCharts');
        const chartsModal = document.getElementById('chartsModal');
        const closeModal = document.getElementById('closeModal');
        const factoryFilter = document.getElementById('factoryFilter');

        // Event listeners
        fileInput.addEventListener('change', handleFileSelect);
        sheetSelect.addEventListener('change', handleSheetSelect);
        btnDownload.addEventListener('click', downloadExcel);
        dateFromFilter.addEventListener('change', applyFilters);
        dateToFilter.addEventListener('change', applyFilters);
        todaySwitch.addEventListener('change', handleTodaySwitch);
        yesterdaySwitch.addEventListener('change', handleYesterdaySwitch);
        btnCharts.addEventListener('click', openChartsModal);
        closeModal.addEventListener('click', closeChartsModal);
        
        // Cerrar modal al hacer clic fuera de él
        window.addEventListener('click', function(event) {
            if (event.target === chartsModal) {
                closeChartsModal();
            }
        });
        
        // Event listener para el filtro de factory en el modal
        __ready(function() {
            setTimeout(() => {
                const factoryFilterElement = document.getElementById('factoryFilter');
                if (factoryFilterElement) {
                    factoryFilterElement.addEventListener('change', function() {
                        updateChartWithFactoryFilter();
                    });
                }
            }, 100);
        });
        
        // Verificar que los factory switches existen y agregar listeners
        if (cofacoSwitch) {
            cofacoSwitch.addEventListener('change', function() {
                console.log('🏭 Cofaco switch changed:', cofacoSwitch.checked);
                applyFilters();
            });
            console.log('✅ Cofaco switch encontrado y listener agregado');
        } else {
            console.error('❌ cofacoSwitch no encontrado');
        }
        
        if (cititex1Switch) {
            cititex1Switch.addEventListener('change', function() {
                console.log('🏭 Cititex1 switch changed:', cititex1Switch.checked);
                applyFilters();
            });
            console.log('✅ Cititex1 switch encontrado y listener agregado');
        } else {
            console.error('❌ cititex1Switch no encontrado');
        }
        
        if (cititex2Switch) {
            cititex2Switch.addEventListener('change', function() {
                console.log('🏭 Cititex2 switch changed:', cititex2Switch.checked);
                applyFilters();
            });
            console.log('✅ Cititex2 switch encontrado y listener agregado');
        } else {
            console.error('❌ cititex2Switch no encontrado');
        }

        // Google Sheets helper functions
        function gvizToObjects(resp) {
            if (!resp || !resp.table) return [];
            const cols = (resp.table.cols || []).map(c => String(c.label || c.id || '').trim());
            return (resp.table.rows || []).map(r => {
                const o = {};
                cols.forEach((h, i) => {
                    const cell = r.c && r.c[i] ? r.c[i] : null;
                    o[h] = cell && (cell.v !== null && cell.v !== undefined) ? cell.v : '';
                });
                return o;
            });
        }

        function loadSheetJSONP(sheetId, sheetName) {
            const TIMEOUT_MS = 15000;
            return new Promise((resolve, reject) => {
                const cbName = 'GVIZ_CB_' + Math.random().toString(36).slice(2);
                let script = document.createElement('script');
                let timer = null;

                function cleanup() {
                    if (timer) {
                        clearTimeout(timer);
                        timer = null;
                    }
                    delete window[cbName];
                    if (script && script.parentNode) {
                        script.parentNode.removeChild(script);
                        script = null;
                    }
                }

                timer = setTimeout(() => {
                    cleanup();
                    reject(new Error(`Tiempo de espera agotado al cargar "${sheetName}".`));
                }, TIMEOUT_MS);

                window[cbName] = function (resp) {
                    cleanup();
                    try {
                        resolve(gvizToObjects(resp));
                    } catch (e) {
                        reject(new Error('Error al procesar los datos: ' + e.message));
                    }
                };

                script.onerror = (err) => {
                    cleanup();
                    reject(new Error(`No se pudo cargar la hoja "${sheetName}".`));
                };

                const base = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq`;
                const url = `${base}?sheet=${encodeURIComponent(sheetName)}&headers=1&tq=${encodeURIComponent('select *')}&tqx=out:json;responseHandler:${cbName}&nocache=${Date.now()}`;

                script.src = url;
                document.head.appendChild(script);
            });
        }

        function handleFileSelect(event) {
            const file = event.target.files[0];
            if (!file) return;

            updateLoadingStatus('Cargando archivo...', 'loading');
            
            const reader = new FileReader();
            reader.onload = function(e) {
                try {
                    workbook = XLSX.read(e.target.result, { type: 'binary' });
                    populateSheetSelect();
                    updateLoadingStatus('Archivo cargado. Seleccione una hoja.', 'success');
                } catch (error) {
                    showError('Error al leer el archivo: ' + error.message);
                    updateLoadingStatus('Error al cargar archivo', 'error');
                }
            };
            reader.readAsBinaryString(file);
        }

        function populateSheetSelect() {
            sheetSelect.innerHTML = '<option value="">Seleccionar hoja...</option>';
            
            workbook.SheetNames.forEach(name => {
                const option = document.createElement('option');
                option.value = name;
                option.textContent = name;
                sheetSelect.appendChild(option);
            });
            
            sheetSelect.disabled = false;
        }

        function handleSheetSelect() {
            const sheetName = sheetSelect.value;
            if (!sheetName) return;

            updateLoadingStatus('Procesando datos...', 'loading');
            
            try {
                const worksheet = workbook.Sheets[sheetName];
                const jsonData = XLSX.utils.sheet_to_json(worksheet);
                
                processSheetData(jsonData);
                renderTable();
                updateLoadingStatus('Datos cargados correctamente', 'success');
                btnDownload.disabled = false;
                btnCharts.disabled = false;
            } catch (error) {
                showError('Error al procesar la hoja: ' + error.message);
                updateLoadingStatus('Error al procesar datos', 'error');
            }
        }

        function processSheetData(jsonData) {
            gridData = jsonData;
            
            // Filtrar y mapear datos para la tabla de embalaje
            currentData = jsonData.map((row, _idx) => {
                // Función helper para obtener valor de texto
                const getStr = (key) => {
                    const val = row[key];
                    return val ? val.toString().trim() : '';
                };

                // Función para formatear fecha
                const formatDate = (dateStr) => {
                    if (!dateStr) return '';
                    
                    console.log('=== PROCESANDO FECHA ===');
                    console.log('Fecha original recibida:', dateStr, typeof dateStr);
                    
                    try {
                        let date;
                        
                        // Si es un número de serie de Excel, convertirlo
                        if (typeof dateStr === 'number') {
                            console.log('Procesando como número de Excel');
                            // Convertir número de Excel a fecha
                            date = new Date((dateStr - 25569) * 86400 * 1000);
                        } else if (typeof dateStr === 'string') {
                            // FORMATO AMERICANO: MM/DD/YYYY (MES/DÍA/AÑO)
                            const mmddyyyyMatch = dateStr.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
                            if (mmddyyyyMatch) {
                                const [, month, day, year] = mmddyyyyMatch;
                                console.log(`Detectado formato MM/DD/YYYY: mes=${month}, día=${day}, año=${year}`);
                                
                                // IMPORTANTE: En formato americano, el primer número es el MES
                                date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
                                console.log('Fecha creada:', date);
                                console.log('Mes resultante:', date.getMonth() + 1, 'Día:', date.getDate());
                            }
                            // Manejar formato específico Date(yyyy,m,d)
                            else if (dateStr.includes('Date(')) {
                                console.log('Procesando formato Date()');
                                const dateMatch = dateStr.match(/Date\((\d{4}),(\d{1,2}),(\d{1,2})\)/);
                                if (dateMatch) {
                                    const year = parseInt(dateMatch[1]);
                                    const monthFromDate = parseInt(dateMatch[2]); // Este es el mes tal como viene
                                    const day = parseInt(dateMatch[3]);
                                    
                                    console.log(`Formato Date(): año=${year}, mes=${monthFromDate}, día=${day}`);
                                    
                                    // IMPORTANTE: En Date(2025,10,8), el 10 ya es base-0 de JavaScript
                                    // Significa noviembre (mes 10 = noviembre), no octubre
                                    // Así que NO restamos 1 aquí, el mes ya está en formato JavaScript
                                    date = new Date(year, monthFromDate, day);
                                    
                                    console.log('Fecha creada desde Date():', date);
                                    console.log('Mes real resultante (1-based):', date.getMonth() + 1, 'Día:', date.getDate());
                                }
                            }
                            // Si es una cadena, intentar parsearlo
                            else {
                                console.log('Procesando como cadena genérica');
                                date = new Date(dateStr);
                            }
                        } else {
                            console.log('Formato no reconocido, devolviendo string original');
                            return dateStr.toString();
                        }
                        
                        // Verificar si la fecha es válida
                        if (isNaN(date.getTime())) {
                            console.log('Fecha inválida, devolviendo string original');
                            return dateStr.toString();
                        }
                        
                        // Formatear como dd/mmm
                        const day = String(date.getDate()).padStart(2, '0');
                        const monthAbbr = getMonthAbbr(date.getMonth() + 1);
                        const formatted = `${day}/${monthAbbr}`;
                        
                        console.log(`RESULTADO FINAL: ${dateStr} → ${formatted}`);
                        console.log('=== FIN PROCESAMIENTO ===');
                        
                        return formatted;
                        
                    } catch (e) {
                        console.error('Error formateando fecha:', dateStr, e);
                        return dateStr.toString();
                    }
                };

                return {
                    'Factory Code': getStr('Factory Code'),
                    'Customer': getStr('Customer'),
                    'Audit Date': formatDate(row['Audit Date']),
                    'OP': normalizeOP(getStr('OP')),
                    'Color/ID': getStr('Color/ID') || getStr('Color') || getStr('ID'),
                    'Lot Size': getStr('Lot Size'),
                    'Result': getStr('Result'),
                    '__origIndex': _idx
                };
            }).filter(row => 
                row['Factory Code'] || 
                row['Customer'] || 
                row['OP'] || 
                row['Result']
            );
        }

        function getMonthAbbr(month) {
            const months = ['ene', 'feb', 'mar', 'abr', 'may', 'jun',
                           'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
            return months[month - 1] || month;
        }

        function formatNumber(value) {
            // Función para formatear números con separador de miles (coma)
            if (!value || value === '') return '';
            
            // Convertir a número y verificar si es válido
            const num = parseInt(value);
            if (isNaN(num)) return value;
            
            // Formatear manualmente con coma como separador de miles
            return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        }

        // Normaliza valores de la columna OP:
        // 1) Reemplaza guion bajo '_' por guion normal '-'
        // 2) Elimina espacios en blanco antes y después del guion
        function normalizeOP(s) {
            if (s === null || s === undefined) return '';
            let str = s.toString();
            // Reemplazar todos los '_' por '-'
            str = str.replace(/_/g, '-');
            // Eliminar espacios alrededor del guion (p. ej. '123 - 456' -> '123-456')
            str = str.replace(/\s*-\s*/g, '-');
            return str.trim();
        }

        function populateDateFilters() {
            // Establecer valores por defecto
            setDefaultDateFilters();
            
            // Mostrar información detallada sobre los datos para debugging
            console.log('=== INFORMACIÓN DE DATOS ===');
            console.log('Total de registros cargados:', currentData.length);
            
            // Mostrar las primeras 3 filas completas
            console.log('Primeras 3 filas de datos:', currentData.slice(0, 3));
            
            // Mostrar todas las fechas disponibles
            const availableDates = currentData
                .map(row => row['Audit Date'])
                .filter(date => date && date !== '')
                .filter((date, index, self) => self.indexOf(date) === index) // eliminar duplicados
                .sort();
            
            console.log('Fechas únicas disponibles:', availableDates);
            console.log('Cantidad de fechas únicas:', availableDates.length);
            
            // Verificar si hay filas con fechas vacías
            const emptyDates = currentData.filter(row => !row['Audit Date'] || row['Audit Date'] === '').length;
            if (emptyDates > 0) {
                console.log(`⚠️ ${emptyDates} filas tienen fechas vacías`);
            }
            
            console.log('=== FIN INFORMACIÓN ===');
        }

        function handleFactoryFilterToggle() {
            console.log('🏭 Factory filter toggle activado');
            // Re-aplicar filtros cuando cambie un factory switch
            applyAllFilters();
        }

        function applyFactoryFilters(data) {
            const activeFactories = [];
            if (cofacoSwitch && cofacoSwitch.checked) activeFactories.push('COFACO');
            if (cititex1Switch && cititex1Switch.checked) activeFactories.push('CITITEX 1');
            if (cititex2Switch && cititex2Switch.checked) activeFactories.push('CITITEX 2');

            console.log('🏭 Active factories:', activeFactories);

            // Si no hay ningún filtro activo, retornar todos los datos
            if (activeFactories.length === 0) {
                console.log('🏭 No hay filtros activos - retornando todos los datos');
                return data;
            }

            // Filtrar datos
            const filteredData = data.filter(row => {
                const factoryCode = (row['Factory Code'] || '').toUpperCase().trim();
                console.log('🏭 Evaluando:', factoryCode, 'contra:', activeFactories);
                return activeFactories.includes(factoryCode);
            });

            console.log('🏭 Datos filtrados:', filteredData.length, 'de', data.length);
            return filteredData;
        }

        function setDefaultDateFilters() {
            const today = new Date();
            
            // Calcular el lunes de la semana actual
            const dayOfWeek = today.getDay(); // 0 = domingo, 1 = lunes, etc.
            const mondayOffset = dayOfWeek === 0 ? -6 : -(dayOfWeek - 1); // Si es domingo, retroceder 6 días
            const monday = new Date(today);
            monday.setDate(today.getDate() + mondayOffset);
            
            const mondayFormatted = formatDateForInput(monday);
            const todayFormatted = formatDateForInput(today);
            
            // Establecer valores en los inputs
            dateFromFilter.value = mondayFormatted;
            dateToFilter.value = todayFormatted;
            
            // Limpiar switches
            todaySwitch.checked = false;
            yesterdaySwitch.checked = false;
            
            // Limpiar switches
            todaySwitch.checked = false;
            yesterdaySwitch.checked = false;
            
            console.log('=== FILTROS POR DEFECTO ===');
            console.log('Lunes de esta semana (Desde):', mondayFormatted);
            console.log('Fecha actual (Hasta):', todayFormatted);
            console.log('=== FIN FILTROS DEFECTO ===');
            
            // Aplicar el filtro automáticamente
            applyFilters();
        }

        function clearDateFilters() {
            console.log('Limpiando filtros...');
            dateFromFilter.value = '';
            dateToFilter.value = '';
            todaySwitch.checked = false;
            yesterdaySwitch.checked = false;
            
            // Limpiar también los factory filters
            cofacoSwitch.checked = false;
            cititex1Switch.checked = false;
            cititex2Switch.checked = false;
            
            renderTable(); // Mostrar todos los datos sin filtros
        }

        function handleTodaySwitch() {
            if (todaySwitch.checked) {
                // Desactivar switch de AYER
                yesterdaySwitch.checked = false;
                
                // Establecer fecha de hoy
                const today = new Date();
                const todayFormatted = formatDateForInput(today);
                
                dateFromFilter.value = todayFormatted;
                dateToFilter.value = todayFormatted;
                
                console.log('Filtro HOY activado:', todayFormatted);
                applyFilters();
            } else {
                // Restaurar filtros por defecto
                setDefaultDateFilters();
            }
        }

        function handleYesterdaySwitch() {
            if (yesterdaySwitch.checked) {
                // Desactivar switch de HOY
                todaySwitch.checked = false;
                
                // Establecer fecha de ayer
                const yesterday = new Date();
                yesterday.setDate(yesterday.getDate() - 1);
                const yesterdayFormatted = formatDateForInput(yesterday);
                
                dateFromFilter.value = yesterdayFormatted;
                dateToFilter.value = yesterdayFormatted;
                
                console.log('Filtro AYER activado:', yesterdayFormatted);
                applyFilters();
            } else {
                // Restaurar filtros por defecto
                setDefaultDateFilters();
            }
        }

        function formatDateForInput(date) {
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            return `${year}-${month}-${day}`;
        }

        // Función para mostrar todos los datos (para debugging)
        function showAllData() {
            console.log('=== MOSTRANDO TODOS LOS DATOS ===');
            console.log('currentData completo:', currentData);
            renderTable();
        }

        function applyFilters() {
            console.log('📋 applyFilters() ejecutándose...');
            const fromDate = dateFromFilter.value;
            const toDate = dateToFilter.value;

            console.log('=== INICIANDO FILTRADO ===');
            console.log('Filtros aplicados:', { fromDate, toDate });
            console.log('Total de datos originales:', currentData.length);

            // Usar la variable global filteredData
            filteredData = [...currentData];

            // Primero aplicar filtros de factory
            filteredData = applyFactoryFilters(filteredData);

            // Luego aplicar filtros de fecha
            if (fromDate || toDate) {
                filteredData = filteredData.filter(row => {
                    const auditDateStr = row['Audit Date'];
                    
                    if (!auditDateStr || auditDateStr === '') {
                        return false;
                    }

                    // Convertir fecha dd/mmm a Date object
                    const auditDate = parseAuditDate(auditDateStr);
                    if (!auditDate) {
                        return false;
                    }

                    // Convertir filtros a Date objects
                    const fromDateObj = fromDate ? new Date(fromDate) : null;
                    const toDateObj = toDate ? new Date(toDate) : null;
                    
                    if (toDateObj) {
                        toDateObj.setUTCHours(23, 59, 59, 999);
                    }

                    let passesFilter = true;
                    
                    if (fromDateObj && auditDate < fromDateObj) {
                        passesFilter = false;
                    }
                    
                    if (toDateObj && auditDate > toDateObj) {
                        passesFilter = false;
                    }

                    return passesFilter;
                });
            }

            console.log('Datos después del filtrado:', filteredData.length);
            renderFilteredTable(filteredData);
        }

        function parseAuditDate(dateStr) {
            try {
                const parts = dateStr.trim().split('/');
                if (parts.length !== 2) {
                    return null;
                }
                
                const [day, monthAbbr] = parts;
                const monthNames = ['ene', 'feb', 'mar', 'abr', 'may', 'jun',
                                  'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
                
                const monthIndex = monthNames.indexOf(monthAbbr.toLowerCase());
                if (monthIndex === -1) {
                    return null;
                }
                
                const year = new Date().getFullYear();
                const date = new Date(year, monthIndex, parseInt(day));
                
                if (isNaN(date.getTime())) {
                    return null;
                }
                
                return date;
            } catch (e) {
                return null;
            }
        }

        function renderFilteredTable(data) {
            const tbody = dataTable.querySelector('tbody');
            
            if (data.length === 0) {
                tbody.innerHTML = '<tr><td colspan="7" class="no-data">No hay datos que coincidan con el filtro</td></tr>';
                return;
            }

            tbody.innerHTML = '';
            
            data.forEach(row => {
                const tr = document.createElement('tr');
                
                // Verificar si el resultado es "Rejected" para aplicar estilo a toda la fila
                const resultValue = row['Result'].toLowerCase();
                if (resultValue.includes('rejected') || resultValue.includes('rechazado')) {
                    tr.classList.add('row-rejected');
                }
                
                // Factory Code
                const tdFactoryCode = document.createElement('td');
                tdFactoryCode.textContent = (row['Factory Code'] || '').toString().toUpperCase();
                tr.appendChild(tdFactoryCode);
                if (row['__origIndex'] !== undefined) tr.dataset.origIndex = row['__origIndex'];
                // store original index
                if (row['__origIndex'] !== undefined) tr.dataset.origIndex = row['__origIndex'];
                // store original index
                if (row['__origIndex'] !== undefined) tr.dataset.origIndex = row['__origIndex'];
                
                // Customer
                const tdCustomer = document.createElement('td');
                tdCustomer.textContent = (row['Customer'] || '').toString().toUpperCase();
                tr.appendChild(tdCustomer);
                
                // Audit Date
                const tdAuditDate = document.createElement('td');
                tdAuditDate.textContent = row['Audit Date'] || '';
                tr.appendChild(tdAuditDate);
                
                // OP
                const tdOP = document.createElement('td');
                const opValue = row['OP'] || '';
                
                // Crear icono según el resultado
                let iconHtml = '';
                if (resultValue.includes('approved') || resultValue.includes('aprobado')) {
                    iconHtml = '<span class="status-icon status-approved"></span>';
                } else if (resultValue.includes('rejected') || resultValue.includes('rechazado')) {
                    iconHtml = '<span class="status-icon status-rejected"></span>';
                }
                
                tdOP.innerHTML = iconHtml + opValue;
                tr.appendChild(tdOP);
                // make OP clickable if this row is rejected
                try {
                    const origIdx = tr.dataset.origIndex;
                    if (origIdx !== undefined) {
                        const raw = gridData[origIdx];
                        const rawResult = (raw && (raw['Result'] || raw['result'] || raw.Result) || '').toString().toLowerCase();
                        if (rawResult.includes('rejected') || rawResult.includes('rechazado')) {
                            tdOP.classList.add('op-link');
                            tdOP.addEventListener('click', function(e){ e.stopPropagation(); openOpModalFromRaw(raw); });
                        }
                    }
                } catch (e) { console.warn('op click attach error', e); }
                
                // Color/ID
                const tdColorID = document.createElement('td');
                tdColorID.textContent = (row['Color/ID'] || '').toString().toUpperCase();
                tr.appendChild(tdColorID);
                
                // Lot Size
                const tdLotSize = document.createElement('td');
                tdLotSize.textContent = formatNumber(row['Lot Size']);
                tr.appendChild(tdLotSize);
                
                // Result
                const tdResult = document.createElement('td');
                tdResult.textContent = row['Result'];
                
                // Aplicar estilos según el resultado
                const result = row['Result'].toLowerCase();
                if (result.includes('pass') || result.includes('aprobado') || result.includes('ok')) {
                    tdResult.classList.add('status-pass');
                } else if (result.includes('fail') || result.includes('fallo') || result.includes('rechazado')) {
                    tdResult.classList.add('status-fail');
                } else if (result.includes('partial') || result.includes('parcial')) {
                    tdResult.classList.add('status-partial');
                }
                
                tr.appendChild(tdResult);
                tbody.appendChild(tr);
            });
            // Activar handlers para OP en filas visibles
            enableOpClickHandlers();
        }

        function renderTable() {
            console.log('=== RENDERIZANDO TABLA ===');
            console.log('Datos a renderizar:', currentData);
            console.log('Cantidad de filas a mostrar:', currentData.length);
            
            // Inicializar filteredData con todos los datos al cargar por primera vez
            filteredData = [...currentData];
            
            const tbody = dataTable.querySelector('tbody');
            
            if (currentData.length === 0) {
                console.log('No hay datos para mostrar');
                tbody.innerHTML = '<tr><td colspan="7" class="no-data">No hay datos para mostrar</td></tr>';
                return;
            }

            tbody.innerHTML = '';
            
            currentData.forEach((row, index) => {
                console.log(`Procesando fila ${index + 1}:`, row);
                
                const tr = document.createElement('tr');
                
                // Verificar si el resultado es "Rejected" para aplicar estilo a toda la fila
                const resultValue = row['Result'] ? row['Result'].toLowerCase() : '';
                if (resultValue.includes('rejected') || resultValue.includes('rechazado')) {
                    tr.classList.add('row-rejected');
                }
                
                // Factory Code
                const tdFactoryCode = document.createElement('td');
                tdFactoryCode.textContent = (row['Factory Code'] || '').toString().toUpperCase();
                tr.appendChild(tdFactoryCode);
                
                // Customer
                const tdCustomer = document.createElement('td');
                tdCustomer.textContent = (row['Customer'] || '').toString().toUpperCase();
                tr.appendChild(tdCustomer);
                
                // Audit Date
                const tdAuditDate = document.createElement('td');
                tdAuditDate.textContent = row['Audit Date'] || '';
                tr.appendChild(tdAuditDate);
                
                // OP
                const tdOP = document.createElement('td');
                const opValue = row['OP'] || '';
                
                // Crear icono según el resultado
                let iconHtml = '';
                if (resultValue.includes('approved') || resultValue.includes('aprobado')) {
                    iconHtml = '<span class="status-icon status-approved"></span>';
                } else if (resultValue.includes('rejected') || resultValue.includes('rechazado')) {
                    iconHtml = '<span class="status-icon status-rejected"></span>';
                }
                
                tdOP.innerHTML = iconHtml + opValue;
                tr.appendChild(tdOP);
                
                // Color/ID
                const tdColorID = document.createElement('td');
                tdColorID.textContent = (row['Color/ID'] || '').toString().toUpperCase();
                tr.appendChild(tdColorID);
                
                // Lot Size
                const tdLotSize = document.createElement('td');
                tdLotSize.textContent = formatNumber(row['Lot Size']);
                tr.appendChild(tdLotSize);
                
                // Result
                const tdResult = document.createElement('td');
                tdResult.textContent = row['Result'] || '';
                
                // Aplicar estilos según el resultado
                const result = (row['Result'] || '').toLowerCase();
                if (result.includes('pass') || result.includes('aprobado') || result.includes('ok')) {
                    tdResult.classList.add('status-pass');
                } else if (result.includes('fail') || result.includes('fallo') || result.includes('rechazado')) {
                    tdResult.classList.add('status-fail');
                } else if (result.includes('partial') || result.includes('parcial')) {
                    tdResult.classList.add('status-partial');
                }
                
                tr.appendChild(tdResult);
                tbody.appendChild(tr);
            });
                    
                    // Activar handlers para OP en todas las filas iniciales
                    enableOpClickHandlers();

                    console.log('=== TABLA RENDERIZADA ===');
        }

        function downloadExcel() {
            // Usar filteredData si está disponible, sino currentData
            const dataToDownload = filteredData.length > 0 ? filteredData : currentData;
            
            if (dataToDownload.length === 0) {
                showError('No hay datos para descargar');
                return;
            }

            try {
                // Asegurarnos de que la columna OP esté normalizada en la exportación
                const sanitizedData = dataToDownload.map(r => {
                    // Crear una copia superficial para no mutar el origen
                    const copy = Object.assign({}, r);
                    copy['OP'] = normalizeOP(copy['OP'] || '');
                    return copy;
                });

                const ws = XLSX.utils.json_to_sheet(sanitizedData);
                const wb = XLSX.utils.book_new();
                XLSX.utils.book_append_sheet(wb, ws, 'Resumen Auditorias');
                
                // Aplicar estilos al encabezado
                const headerRange = XLSX.utils.decode_range(ws['!ref']);
                for (let col = headerRange.s.c; col <= headerRange.e.c; col++) {
                    const cellAddress = XLSX.utils.encode_cell({ r: 0, c: col });
                    if (!ws[cellAddress]) continue;
                    
                    ws[cellAddress].s = {
                        fill: { fgColor: { rgb: "E3F2FD" } },
                        font: { bold: true, color: { rgb: "1a1a1a" } },
                        border: {
                            top: { style: "thin", color: { rgb: "B3D9FF" } },
                            bottom: { style: "thin", color: { rgb: "B3D9FF" } },
                            left: { style: "thin", color: { rgb: "B3D9FF" } },
                            right: { style: "thin", color: { rgb: "B3D9FF" } }
                        }
                    };
                }
                
                const fileName = `resumen_auditorias_embalaje_${new Date().toISOString().slice(0, 10)}.xlsx`;
                XLSX.writeFile(wb, fileName);
            } catch (error) {
                showError('Error al generar el archivo Excel: ' + error.message);
            }
        }

        function showError(msg) {
            errorBanner.textContent = msg;
            errorBanner.style.display = 'block';
            setTimeout(() => {
                errorBanner.style.display = 'none';
            }, 10000);
        }

        function updateLoadingStatus(status, className) {
            loadingStatus.textContent = status;
            loadingStatus.className = className;
            
            if (className === 'success') {
                btnDownload.disabled = false;
                btnCharts.disabled = false;
            }
        }

        // Initialize the application by loading data from Google Sheets
        function initializeApp() {
            updateLoadingStatus('Cargando datos...', 'loading');
            console.log('=== INICIANDO CARGA DE DATOS ===');
            
            loadSheetJSONP(SHEET_ID, SHEET_NAME)
                .then(data => {
                    console.log('Datos raw recibidos de Google Sheets:', data);
                    console.log('Cantidad de filas recibidas:', data.length);
                    
                    processSheetData(data);
                    console.log('Datos procesados:', currentData);
                    console.log('Cantidad de datos procesados:', currentData.length);
                    
                    renderTable();
                    populateDateFilters();
                    updateLoadingStatus('Datos cargados exitosamente', 'success');
                })
                .catch(error => {
                    console.error('Error loading data:', error);
                    showError('Error al cargar los datos: ' + error.message);
                    updateLoadingStatus('Error al cargar datos', 'error');
                });
        }

        // Start the application when the page loads
        __ready(initializeApp);

        // Función para poblar el filtro de Factory Code
        function populateFactoryFilter() {
            const factoryFilter = document.getElementById('factoryFilter');
            if (!factoryFilter) return;
            
            // Obtener factory codes únicos
            const factoryCodes = [...new Set(currentData
                .map(row => row['Factory Code'])
                .filter(code => code && code.trim() !== '')
                .map(code => code.toUpperCase())
            )].sort();
            
            // Limpiar opciones existentes
            factoryFilter.innerHTML = '<option value="all">Todos los Factory Codes</option>';
            
            // Agregar opciones de factory codes
            factoryCodes.forEach(code => {
                const option = document.createElement('option');
                option.value = code;
                option.textContent = code;
                factoryFilter.appendChild(option);
            });
        }

        // Función para actualizar el gráfico cuando cambia el filtro de factory
        function updateChartWithFactoryFilter() {
            const selectedFactory = document.getElementById('factoryFilter')?.value || 'all';
            console.log('🏭 Filtrando gráfico por factory:', selectedFactory);
            
            let dataToAnalyze = currentData;
            
            // Filtrar por factory si no es "all"
            if (selectedFactory !== 'all') {
                dataToAnalyze = currentData.filter(row => {
                    const factoryCode = (row['Factory Code'] || '').toUpperCase().trim();
                    return factoryCode === selectedFactory;
                });
            }
            
            console.log('📊 Datos filtrados para gráfico:', dataToAnalyze.length, 'registros');
            
            // Regenerar el gráfico con los datos filtrados
            generateChart(dataToAnalyze);
        }

        // Funciones para Modal y Gráficos
        function openChartsModal() {
            console.log('📊 Abriendo modal de gráficos...');
            
            // Siempre usar todos los datos (currentData), independiente de filtros
            const dataToAnalyze = currentData;
            console.log('📊 Datos a analizar:', dataToAnalyze.length, 'registros (sin filtros)');
            
            if (dataToAnalyze.length === 0) {
                alert('No hay datos disponibles para generar el gráfico');
                return;
            }
            
            // Mostrar el modal primero
            chartsModal.style.display = 'block';
            
            // Poblar el filtro de Factory Code
            populateFactoryFilter();
            
            // Generar el gráfico después de un pequeño delay para asegurar que el modal sea visible
            setTimeout(() => {
                generateChart(dataToAnalyze);
            }, 100);
        }

        function closeChartsModal() {
            chartsModal.style.display = 'none';
            
            // Destruir gráfico al cerrar modal usando Chart.js API
            const existingChart = Chart.getChart('auditChart');
            if (existingChart) {
                existingChart.destroy();
            }
        }

        function generateChart(dataToAnalyze) {
            console.log('📊 Generando gráfico con datos:', dataToAnalyze.length, 'registros');
            
            try {
                const ctx = document.getElementById('auditChart');
                if (!ctx) {
                    console.error('❌ No se encontró el canvas auditChart');
                    return;
                }
                
                const context = ctx.getContext('2d');
                
                // Procesar datos para el gráfico
                const chartData = processChartData(dataToAnalyze);
                console.log('📊 Datos procesados para gráfico:', chartData);
                
                // Calcular el valor máximo para ajustar el eje Y
                const maxApproved = Math.max(...chartData.approved, 0);
                const maxRejected = Math.max(...chartData.rejected, 0);
                const maxValue = Math.max(maxApproved, maxRejected);
                const yAxisMax = Math.ceil(maxValue * 1.2); // Agregar 20% de padding
                console.log('📊 Valores máximos - Aprobadas:', maxApproved, 'Rechazadas:', maxRejected, 'Eje Y máximo:', yAxisMax);
                
                // Verificar si hay datos para mostrar
                if (chartData.dates.length === 0) {
                    // Mostrar mensaje en el canvas si no hay datos
                    context.clearRect(0, 0, ctx.width, ctx.height);
                    context.font = '16px Arial';
                    context.fillStyle = '#666';
                    context.textAlign = 'center';
                    context.fillText('No hay datos de auditorías en los últimos 14 días', ctx.width / 2, ctx.height / 2);
                    return;
                }
                
                // Destruir gráfico anterior si existe
                const existingChart = Chart.getChart('auditChart');
                if (existingChart) {
                    existingChart.destroy();
                }
                
                // Crear nuevo gráfico
                const newChart = new Chart(context, {
                    type: 'bar',
                    plugins: [{
                        id: 'customDataLabels',
                        afterDatasetsDraw: function(chart) {
                            const ctx = chart.ctx;
                            chart.data.datasets.forEach((dataset, datasetIndex) => {
                                const meta = chart.getDatasetMeta(datasetIndex);
                                meta.data.forEach((bar, index) => {
                                    const data = dataset.data[index];
                                    if (data > 0) {
                                        // Etiqueta de cantidad
                                        ctx.fillStyle = datasetIndex === 0 ? '#1976D2' : '#D32F2F';
                                        ctx.font = 'bold 16px Calibri';
                                        ctx.textAlign = 'center';
                                        ctx.fillText(data, bar.x, bar.y - 30);
                                        
                                        // Etiqueta de Total Lot Size
                                        const lotSizeData = datasetIndex === 0 ? chartData.approvedLotSizes : chartData.rejectedLotSizes;
                                        const lotSize = formatNumber(lotSizeData[index]);
                                        ctx.fillStyle = datasetIndex === 0 ? '#1976D2' : '#D32F2F';
                                        ctx.font = '14px Calibri';
                                        ctx.fillText(lotSize, bar.x, bar.y - 10);
                                    }
                                });
                            });
                        }
                    }],
                    data: {
                        labels: chartData.dates,
                        datasets: [{
                            label: 'Aprobadas',
                            data: chartData.approved,
                            backgroundColor: 'rgba(25, 118, 210, 0.8)',
                            borderColor: '#1976D2',
                            borderWidth: 2
                        }, {
                            label: 'Rechazadas',
                            data: chartData.rejected,
                            backgroundColor: 'rgba(211, 47, 47, 0.8)',
                            borderColor: '#D32F2F',
                            borderWidth: 2
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        animation: {
                            duration: 1000,
                            easing: 'easeOutQuart'
                        },
                        scales: {
                            y: {
                                beginAtZero: true,
                                max: yAxisMax > 0 ? yAxisMax : 15,
                                ticks: {
                                    stepSize: Math.max(1, Math.ceil(yAxisMax / 10)),
                                    font: {
                                        size: 12
                                    }
                                },
                                title: {
                                    display: true,
                                    text: 'Cantidad de Auditorías',
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
                            x: {
                                title: {
                                    display: true,
                                    text: 'Fecha de Auditoría',
                                    font: {
                                        size: 14,
                                        weight: 'bold'
                                    }
                                },
                                ticks: {
                                    font: {
                                        size: 12
                                    },
                                    callback: function(value, index, ticks) {
                                        const label = this.getLabelForValue(value);
                                        return label;
                                    },
                                    color: function(context) {
                                        // Obtener la fecha del label
                                        const label = context.chart.data.labels[context.index];
                                        if (!label) return '#666';
                                        
                                        // Convertir dd/mmm a Date para verificar el día de la semana
                                        const auditDate = parseAuditDate(label);
                                        if (!auditDate) return '#666';
                                        
                                        const dayOfWeek = auditDate.getDay();
                                        // 0 = Domingo, 6 = Sábado
                                        if (dayOfWeek === 0 || dayOfWeek === 6) {
                                            return '#B8860B'; // Amarillo oscuro (DarkGoldenRod)
                                        }
                                        return '#666'; // Color normal para días laborales
                                    }
                                },
                                grid: {
                                    display: false
                                }
                            }
                        },
                        plugins: {
                            tooltip: {
                                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                                titleColor: 'white',
                                bodyColor: 'white',
                                borderColor: 'rgba(255, 255, 255, 0.2)',
                                borderWidth: 1,
                                callbacks: {
                                    title: function(context) {
                                        return `Fecha: ${context[0].label}`;
                                    },
                                    label: function(context) {
                                        return `${context.dataset.label}: ${context.parsed.y} auditorías`;
                                    },
                                    afterLabel: function(context) {
                                        const dateIndex = context.dataIndex;
                                        const dataset = context.dataset.label;
                                        
                                        let lotSizeSum = 0;
                                        if (dataset === 'Aprobadas') {
                                            lotSizeSum = chartData.approvedLotSizes[dateIndex];
                                        } else {
                                            lotSizeSum = chartData.rejectedLotSizes[dateIndex];
                                        }
                                        
                                        return `Total Lot Size: ${formatNumber(lotSizeSum)}`;
                                    }
                                }
                            },
                            legend: {
                                display: true,
                                position: 'bottom',
                                labels: {
                                    usePointStyle: true,
                                    padding: 20,
                                    font: {
                                        size: 14
                                    }
                                }
                            }
                        }
                    }
                });
                
                console.log('✅ Gráfico creado exitosamente');
                
            } catch (error) {
                console.error('❌ Error generando gráfico:', error);
                alert('Error al generar el gráfico: ' + error.message);
            }
        }

        function processChartData(data) {
            // Calcular rango de fechas: hoy y 14 días atrás
            const today = new Date();
            const fourteenDaysAgo = new Date();
            fourteenDaysAgo.setDate(today.getDate() - 14);
            
            console.log('📊 Procesando datos para gráfico');
            console.log('📅 Rango de fechas: desde', fourteenDaysAgo.toDateString(), 'hasta', today.toDateString());
            console.log('📊 Total de registros recibidos:', data.length);
            
            const dateStats = {};
            let recordsProcessed = 0;
            let recordsInRange = 0;
            
            // Procesar datos por fecha dentro del rango de 7 días
            data.forEach((row, index) => {
                const date = row['Audit Date'];
                const result = (row['Result'] || '').toLowerCase();
                const lotSize = parseInt(row['Lot Size']) || 0;
                
                recordsProcessed++;
                
                if (!date) {
                    console.log(`⚠️ Fila ${index + 1}: fecha vacía`);
                    return;
                }
                
                // Convertir fecha dd/mmm a Date object para comparar
                const auditDate = parseAuditDate(date);
                if (!auditDate) {
                    console.log(`⚠️ Fila ${index + 1}: no se pudo parsear fecha "${date}"`);
                    return;
                }
                
                // Filtrar solo los últimos 14 días (incluyendo hoy)
                if (auditDate >= fourteenDaysAgo && auditDate <= today) {
                    recordsInRange++;
                    console.log(`✅ Fila ${index + 1}: fecha "${date}" está en rango`);
                    
                    if (!dateStats[date]) {
                        dateStats[date] = {
                            approved: 0,
                            rejected: 0,
                            approvedLotSize: 0,
                            rejectedLotSize: 0
                        };
                    }
                    
                    if (result.includes('approved') || result.includes('aprobado')) {
                        dateStats[date].approved++;
                        dateStats[date].approvedLotSize += lotSize;
                        console.log(`✅ Aprobada: fecha=${date}, lot=${lotSize}`);
                    } else if (result.includes('rejected') || result.includes('rechazado')) {
                        dateStats[date].rejected++;
                        dateStats[date].rejectedLotSize += lotSize;
                        console.log(`❌ Rechazada: fecha=${date}, lot=${lotSize}`);
                    }
                } else {
                    console.log(`⏰ Fila ${index + 1}: fecha "${date}" (${auditDate.toDateString()}) fuera de rango`);
                }
            });
            
            console.log('📊 Resumen procesamiento:');
            console.log(`  - Registros procesados: ${recordsProcessed}`);
            console.log(`  - Registros en rango: ${recordsInRange}`);
            console.log('📊 Fechas con datos en los últimos 14 días:', Object.keys(dateStats));
            console.log('📊 Estadísticas por fecha:', dateStats);
            
            // Ordenar fechas
            const sortedDates = Object.keys(dateStats).sort((a, b) => {
                return parseAuditDate(a) - parseAuditDate(b);
            });
            
            console.log('📊 Fechas ordenadas para gráfico:', sortedDates);
            
            const result = {
                dates: sortedDates,
                approved: sortedDates.map(date => dateStats[date].approved),
                rejected: sortedDates.map(date => dateStats[date].rejected),
                approvedLotSizes: sortedDates.map(date => dateStats[date].approvedLotSize),
                rejectedLotSizes: sortedDates.map(date => dateStats[date].rejectedLotSize)
            };
            
            console.log('📊 Resultado final:', result);
            return result;
        }

        /* --------------------- OP Details Modal Logic --------------------- */
        function normalizeKey(s) {
            return (s || '').toString().trim().toLowerCase().replace(/[^a-z0-9]+/g, '');
        }

        function enableOpClickHandlers() {
            try {
                const thead = dataTable.querySelectorAll('thead th');
                const headers = Array.from(thead).map(h => h.textContent.trim());
                const headerMap = {};
                headers.forEach((h, i) => headerMap[normalizeKey(h)] = i);

                const rows = dataTable.querySelectorAll('tbody tr');
                rows.forEach(row => {
                    const cells = row.querySelectorAll('td');
                    if (!cells || cells.length === 0) return;

                    const opIdx = headerMap['op'];
                    if (opIdx === undefined) return;
                    const opCell = cells[opIdx];
                    if (!opCell) return;

                    // Prefer the raw sheet data referenced by data-origIndex
                    const origIdx = row.dataset.origIndex;
                    if (origIdx === undefined) return;
                    const raw = gridData[origIdx];
                    const rawResult = (raw && (raw['Result'] || raw['result'] || raw.Result) || '').toString().toLowerCase();
                    if (rawResult.includes('rejected') || rawResult.includes('rechazado')) {
                        opCell.classList.add('op-link');
                        if (!opCell.dataset.opListenerSet) {
                            opCell.addEventListener('click', function(e){ e.stopPropagation(); openOpModalFromRaw(raw); });
                            opCell.dataset.opListenerSet = '1';
                        }
                    }
                });
            } catch (e) {
                console.error('Error enableOpClickHandlers:', e);
            }
        }

        function openOpModalFromRow(row, headerMap) {
            // If this row references raw sheet data, prefer opening from raw
            const origIdx = row.dataset.origIndex;
            if (origIdx !== undefined && gridData && gridData[origIdx]) {
                openOpModalFromRaw(gridData[origIdx]);
                return;
            }

            // Fallback: build from visible cells
            const cells = row.querySelectorAll('td');
            const getByHeader = (nameVariants) => {
                for (const name of nameVariants) {
                    const idx = headerMap[normalizeKey(name)];
                    if (idx !== undefined && cells[idx]) {
                        return cells[idx].textContent.trim();
                    }
                }
                return '';
            };

            const factory = getByHeader(['Factory Code','Factory']);
            const customer = getByHeader(['Customer']);
            const op = getByHeader(['OP']);
            const color = getByHeader(['Color/ID','Color','ID']);
            const lotSize = getByHeader(['Lot Size','LotSize']);
            const sampleSize = getByHeader(['Sample Size','SampleSize']);
            const totDef = getByHeader(['Tot. Def.','Tot Def','Total Def','TotDef']);

            document.getElementById('opModalTitleHM').textContent = `Rechazo - HM: ${op}`;
            document.getElementById('opModalTitleColor').textContent = `Color: ${color}`;

            const fields = [
                {k: 'Factory Code', label: 'Factory Code'},
                {k: 'Customer', label: 'Customer'},
                {k: 'OP', label: 'OP'},
                {k: 'Color/ID', label: 'Color/ID'},
                {k: 'Lot Size', label: 'Lot Size'},
                {k: 'Sample Size', label: 'Sample Size'},
                {k: 'Tot. Def.', label: 'Tot. Def.'}
            ];

            const otherFields = ['Fabric','Untrimmed threads End','Embellisment','Hole','Broken/skip stitches','Color Shading','Puckering/Excessive Fullness','Cleaness','Asymmetrical','Pin','Wrong Hangtas','Assorment','Shipping Marks','Others','Meas.','Cuenta de Nº Report','A1','A2','A3','A4'];

            const tbody = document.querySelector('#opDetailsTable tbody');
            tbody.innerHTML = '';

            fields.forEach(fld => {
                const v = getByHeader([fld.k]);
                if (v && v.trim() !== '') {
                    const tr = document.createElement('tr');
                    tr.innerHTML = `<td style="padding:8px; border-bottom:1px solid #f0f0f0;">${fld.label}</td><td style="padding:8px; border-bottom:1px solid #f0f0f0;">${v}</td>`;
                    tbody.appendChild(tr);
                }
            });

            otherFields.forEach(f => {
                const normalized = normalizeKey(f);
                const idx = headerMap[normalized];
                let value = '';
                if (idx !== undefined && cells[idx]) value = cells[idx].textContent.trim();
                if (value && value !== '') {
                    const tr = document.createElement('tr');
                    tr.innerHTML = `<td style="padding:8px; border-bottom:1px solid #f0f0f0;">${f}</td><td style="padding:8px; border-bottom:1px solid #f0f0f0;">${value}</td>`;
                    tbody.appendChild(tr);
                }
            });

            const opModal = document.getElementById('opDetailsModal');
            opModal.style.display = 'block';

            // Close handlers
            const closeBtn = document.getElementById('closeOpModal');
            closeBtn.onclick = () => { opModal.style.display = 'none'; };

            window.addEventListener('keydown', function escListener(e) {
                if (e.key === 'Escape') {
                    opModal.style.display = 'none';
                    window.removeEventListener('keydown', escListener);
                }
            });

            // Click fuera para cerrar
            opModal.onclick = function (ev) {
                if (ev.target === opModal) opModal.style.display = 'none';
            };
        }

        function findRawField(raw, fieldName) {
            if (!raw) return '';
            // direct match
            if (raw[fieldName] !== undefined && raw[fieldName] !== null) return raw[fieldName];
            // try common variants
            const normalizedTarget = normalizeKey(fieldName);
            for (const k in raw) {
                if (!Object.prototype.hasOwnProperty.call(raw, k)) continue;
                if (normalizeKey(k) === normalizedTarget) return raw[k];
            }
            return '';
        }

        function openOpModalFromRaw(raw) {
            try {
                const factory = (findRawField(raw, 'Factory Code') || findRawField(raw, 'Factory') || '').toString().toUpperCase();
                const customer = (findRawField(raw, 'Customer') || '').toString().toUpperCase();
                const op = normalizeOP(findRawField(raw, 'OP') || '');
                const color = (findRawField(raw, 'Color/ID') || findRawField(raw, 'Color') || findRawField(raw, 'ID') || '').toString();
                const lotSize = (findRawField(raw, 'Lot Size') || '').toString();
                const sampleSize = (findRawField(raw, 'Sample Size') || findRawField(raw, 'SampleSize') || '').toString();
                const totDef = (findRawField(raw, 'Tot. Def.') || findRawField(raw, 'Tot Def') || findRawField(raw, 'Total Def') || '').toString();

                    // Two-line title: HM and Color
                    document.getElementById('opModalTitleHM').textContent = `Rechazo - HM: ${op}`;
                    document.getElementById('opModalTitleColor').textContent = `Color: ${color}`;

                // Fields to always show first (if they have data)
                const primaryFields = [
                    {k: 'Factory Code', label: 'Factory Code'},
                    {k: 'Customer', label: 'Customer'},
                    {k: 'OP', label: 'OP'},
                    {k: 'Color/ID', label: 'Color/ID'},
                    {k: 'Lot Size', label: 'Lot Size'},
                    {k: 'Sample Size', label: 'Sample Size'},
                    {k: 'Acceptance', label: 'Acceptance'},
                    {k: 'Tot. Def.', label: 'Tot. Def.'}
                ];

                const otherFields = ['Fabric','Untrimmed threads End','Embellisment','Hole','Broken/skip stitches','Color Shading','Puckering/Excessive Fullness','Cleaness','Asymmetrical','Pin','Wrong Hangtas','Assorment','Shipping Marks','Others','Meas.','Cuenta de Nº Report','A1','A2','A3','A4'];

                const tbody = document.querySelector('#opDetailsTable tbody');
                tbody.innerHTML = '';

                // Prepare set of danger fields (normalized)
                const dangerFields = [
                    'Fabric','Untrimmed threads End','Embellisment','Hole','Broken/skip stitches','Color Shading','Puckering/Excessive Fullness','Cleaness','Asymmetrical','Pin','Wrong Hangtas','Assorment','Shipping Marks','Others','Meas.','Cuenta de Nº Report','A1','A2','A3','A4'
                ].map(s => normalizeKey(s));

                // Add primary fields only if they have data
                primaryFields.forEach(fld => {
                    let v = findRawField(raw, fld.k);
                    if (v === undefined || v === null) v = '';
                    v = String(v).trim();
                    if (v !== '') {
                        const tr = document.createElement('tr');
                        tr.innerHTML = `<td style="padding:8px; border-bottom:1px solid #f0f0f0;">${fld.label}</td><td style="padding:8px; border-bottom:1px solid #f0f0f0;">${v}</td>`;
                        // If this primary field is also in dangerFields, apply danger class
                        if (dangerFields.includes(normalizeKey(fld.label))) tr.classList.add('modal-row-danger');
                        tbody.appendChild(tr);
                    }
                });

                // Add other fields only if they have data
                otherFields.forEach(f => {
                    let v = findRawField(raw, f);
                    if (v === undefined || v === null) v = '';
                    v = String(v).trim();
                    if (v !== '') {
                        const tr = document.createElement('tr');
                        tr.innerHTML = `<td style="padding:8px; border-bottom:1px solid #f0f0f0;">${f}</td><td style="padding:8px; border-bottom:1px solid #f0f0f0;">${v}</td>`;
                        if (dangerFields.includes(normalizeKey(f))) tr.classList.add('modal-row-danger');
                        tbody.appendChild(tr);
                    }
                });

                const opModal = document.getElementById('opDetailsModal');
                opModal.style.display = 'block';

                // Close handlers
                const closeBtn = document.getElementById('closeOpModal');
                closeBtn.onclick = () => { opModal.style.display = 'none'; };

                const escHandler = function escListener(e) {
                    if (e.key === 'Escape') {
                        opModal.style.display = 'none';
                        window.removeEventListener('keydown', escListener);
                    }
                };
                window.addEventListener('keydown', escHandler);

                // Click fuera para cerrar
                opModal.onclick = function (ev) {
                    if (ev.target === opModal) opModal.style.display = 'none';
                };
            } catch (err) {
                console.error('openOpModalFromRaw error', err);
            }
        }

        // ===== Fin del script original =====

        // Exponer en window las funciones usadas por handlers inline (si las hay)
        ['clearDateFilters'].forEach(function (__n) { try { window[__n] = eval(__n); } catch (__e) {} });
    }

    App.registerView('producto-terminado', { title: 'Auditorias de Producto Terminado', mount: mount });
})();