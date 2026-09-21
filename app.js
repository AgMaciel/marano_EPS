// Current Active System State
        let currentSystem = 'eps'; // 'eps' or 'trad'
        let currentStageId = 1;

        const profileTargets = {
            business: 'profileBusiness',
            size: 'profileSize',
            employees: 'profileEmployees',
            years: 'profileYears',
            positioning: 'profilePositioning'
        };

        function escapeHtml(value) {
            return String(value)
                .replaceAll('&', '&amp;')
                .replaceAll('<', '&lt;')
                .replaceAll('>', '&gt;')
                .replaceAll('"', '&quot;');
        }

        function renderStageEditor(systemKey, stage) {
            const systemClass = systemKey === 'eps' ? 'border-cyan-800' : 'border-orange-800';
            const arrayValue = value => value.join('\n');
            return `
                <details class="stage-editor ${systemClass}" open>
                    <summary>Etapa ${stage.id}: ${escapeHtml(stage.title.replace(/^\d+\.\s*/, ''))}</summary>
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3">
                        <label class="space-y-1"><span class="text-[10px] text-slate-400">Título da etapa</span><input required data-editor="title" data-system="${systemKey}" data-stage="${stage.id}" value="${escapeHtml(stage.title)}" class="input-control"></label>
                        <label class="space-y-1"><span class="text-[10px] text-slate-400">Duração estimada</span><input required data-editor="duration" data-system="${systemKey}" data-stage="${stage.id}" value="${escapeHtml(stage.duration)}" class="input-control"></label>
                        <label class="space-y-1"><span class="text-[10px] text-slate-400">Inputs da etapa</span><textarea required data-editor="input" data-system="${systemKey}" data-stage="${stage.id}" class="input-control" rows="2">${escapeHtml(stage.input)}</textarea></label>
                        <label class="space-y-1"><span class="text-[10px] text-slate-400">Outputs da etapa</span><textarea required data-editor="output" data-system="${systemKey}" data-stage="${stage.id}" class="input-control" rows="2">${escapeHtml(stage.output)}</textarea></label>
                        <label class="space-y-1 sm:col-span-2"><span class="text-[10px] text-slate-400">Descrição operacional</span><textarea required data-editor="description" data-system="${systemKey}" data-stage="${stage.id}" class="input-control" rows="2">${escapeHtml(stage.description)}</textarea></label>
                        <label class="space-y-1"><span class="text-[10px] text-slate-400">Equipamentos (um por linha)</span><textarea required data-editor="equipment" data-system="${systemKey}" data-stage="${stage.id}" class="input-control" rows="3">${escapeHtml(arrayValue(stage.equipment))}</textarea></label>
                        <label class="space-y-1"><span class="text-[10px] text-slate-400">Insumos (um por linha)</span><textarea required data-editor="inputsList" data-system="${systemKey}" data-stage="${stage.id}" class="input-control" rows="3">${escapeHtml(arrayValue(stage.inputsList))}</textarea></label>
                        <label class="space-y-1 sm:col-span-2"><span class="text-[10px] text-slate-400">Tratamento e mitigação ambiental</span><textarea required data-editor="mitigation" data-system="${systemKey}" data-stage="${stage.id}" class="input-control" rows="2">${escapeHtml(stage.mitigation)}</textarea></label>
                        <label class="space-y-1"><span class="text-[10px] text-slate-400">Nível de resíduos</span><input required data-editor="wasteLevel" data-system="${systemKey}" data-stage="${stage.id}" value="${escapeHtml(stage.wasteLevel)}" class="input-control"></label>
                        <label class="space-y-1"><span class="text-[10px] text-slate-400">Classificação ambiental</span><input required data-editor="wasteTag" data-system="${systemKey}" data-stage="${stage.id}" value="${escapeHtml(stage.wasteTag)}" class="input-control"></label>
                    </div>
                </details>`;
        }

        function renderInputWorkspace() {
            Object.entries(profileTargets).forEach(([key, targetId]) => {
                const input = document.querySelector(`[data-profile="${key}"]`);
                if (input) input.value = defaultStudyProfile[key];
                const target = document.getElementById(targetId);
                if (target) target.innerText = defaultStudyProfile[key];
            });
            document.getElementById('epsEditor').innerHTML = epsData.stages.map(stage => renderStageEditor('eps', stage)).join('');
            document.getElementById('tradEditor').innerHTML = tradData.stages.map(stage => renderStageEditor('trad', stage)).join('');
        }

        function collectStageValue(systemKey, stage) {
            const getValue = field => document.querySelector(`[data-editor="${field}"][data-system="${systemKey}"][data-stage="${stage.id}"]`).value.trim();
            const getList = field => getValue(field).split('\n').map(item => item.trim()).filter(Boolean);
            return {
                ...stage,
                title: getValue('title'),
                duration: getValue('duration'),
                input: getValue('input'),
                output: getValue('output'),
                description: getValue('description'),
                equipment: getList('equipment'),
                inputsList: getList('inputsList'),
                mitigation: getValue('mitigation'),
                wasteLevel: getValue('wasteLevel'),
                wasteTag: getValue('wasteTag')
            };
        }

        function applyStudyInputs(event) {
            event.preventDefault();
            Object.keys(profileTargets).forEach(key => {
                defaultStudyProfile[key] = document.querySelector(`[data-profile="${key}"]`).value.trim();
                document.getElementById(profileTargets[key]).innerText = defaultStudyProfile[key];
            });
            epsData.stages = epsData.stages.map(stage => collectStageValue('eps', stage));
            tradData.stages = tradData.stages.map(stage => collectStageValue('trad', stage));
            switchSystem(currentSystem);
            document.getElementById('formStatus').innerText = `Estudo atualizado em ${new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}.`;
            document.getElementById('inputWorkspace').scrollIntoView({ behavior: 'smooth', block: 'start' });
        }

        
        function renderFlowchart() {
            const data = currentSystem === 'eps' ? epsData : tradData;
            
            const inputsRow = document.getElementById('inputsRow');
            const stagesRow = document.getElementById('stagesRow');
            const outputsRow = document.getElementById('outputsRow');

            // Clear previous HTML
            inputsRow.innerHTML = '';
            stagesRow.innerHTML = '';
            outputsRow.innerHTML = '';

            data.stages.forEach(stage => {
                const isSelected = stage.id === currentStageId;
                
                // 1. TOP INPUT CARD
                const inputCard = document.createElement('div');
                inputCard.className = `p-3 rounded-xl border text-xs shadow-sm transition-all duration-200 ${
                    currentSystem === 'eps' 
                    ? 'bg-emerald-50/80 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800 text-emerald-950 dark:text-emerald-200'
                    : 'bg-orange-50/80 dark:bg-orange-950/40 border-orange-300 dark:border-orange-800 text-orange-950 dark:text-orange-200'
                }`;
                inputCard.innerHTML = `
                    <div class="flex items-center gap-1 font-bold text-[11px] mb-1 uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                        <i data-lucide="log-in" class="w-3.5 h-3.5"></i> Inputs (Entradas)
                    </div>
                    <p class="text-[11px] font-medium leading-snug">${stage.input}</p>
                `;
                inputsRow.appendChild(inputCard);

                // 2. MIDDLE TIMELINE STAGE BUTTON
                const stageBtn = document.createElement('button');
                stageBtn.onclick = () => selectStage(stage.id);
                
                let btnStyle = "bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700";
                if (isSelected) {
                    btnStyle = currentSystem === 'eps' 
                        ? "bg-gradient-to-r from-brand-600 to-eps-600 text-white font-bold border-brand-400 glow-active scale-105" 
                        : "bg-gradient-to-r from-orange-600 to-amber-600 text-white font-bold border-orange-400 glow-active-trad scale-105";
                }

                stageBtn.className = `p-3 rounded-xl border flex flex-col justify-between text-left transition-all duration-200 cursor-pointer h-full ${btnStyle}`;
                stageBtn.innerHTML = `
                    <div class="flex items-center justify-between mb-1">
                        <span class="text-[10px] font-extrabold px-1.5 py-0.5 rounded ${isSelected ? 'bg-white/20 text-white' : 'bg-slate-700 text-slate-300'}">
                            E${stage.id}
                        </span>
                        <i data-lucide="${isSelected ? 'check-circle' : 'circle'}" class="w-4 h-4"></i>
                    </div>
                    <span class="text-xs font-bold leading-tight block mb-1">${stage.title}</span>
                    <span class="text-[10px] opacity-80 block">${stage.duration}</span>
                `;
                stagesRow.appendChild(stageBtn);

                // 3. BOTTOM OUTPUT CARD
                const outputCard = document.createElement('div');
                outputCard.className = `p-3 rounded-xl border text-xs shadow-sm transition-all duration-200 ${
                    currentSystem === 'eps'
                    ? 'bg-slate-100 dark:bg-slate-800/80 border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200'
                    : 'bg-red-50/80 dark:bg-red-950/40 border-red-300 dark:border-red-800 text-red-950 dark:text-red-200'
                }`;
                outputCard.innerHTML = `
                    <div class="flex items-center gap-1 font-bold text-[11px] mb-1 uppercase tracking-wider text-red-600 dark:text-red-400">
                        <i data-lucide="log-out" class="w-3.5 h-3.5"></i> Outputs (Saídas)
                    </div>
                    <p class="text-[11px] font-medium leading-snug">${stage.output}</p>
                `;
                outputsRow.appendChild(outputCard);
            });

            // Re-initialize icons for newly created DOM elements
            if (window.lucide) {
                lucide.createIcons();
            }
        }

        function updateStageDetail() {
            const data = currentSystem === 'eps' ? epsData : tradData;
            const stage = data.stages.find(s => s.id === currentStageId) || data.stages[0];

            document.getElementById('detailStageNumber').innerText = stage.id;
            document.getElementById('detailStageTitle').innerText = stage.title;
            document.getElementById('detailDuration').innerText = stage.duration;
            document.getElementById('detailDescription').innerText = stage.description;
            document.getElementById('detailMitigation').innerText = stage.mitigation;
            document.getElementById('detailWasteLevel').innerText = stage.wasteLevel;
            document.getElementById('detailWasteTag').innerText = stage.wasteTag;

            const badge = document.getElementById('detailSystemBadge');
            badge.innerText = data.name;
            badge.className = `text-[10px] font-bold px-2 py-0.5 rounded uppercase ${data.badgeClass}`;

            // Equipment List
            const equipList = document.getElementById('detailEquipment');
            equipList.innerHTML = stage.equipment.map(item => `<li>${item}</li>`).join('');

            // Inputs List
            const inputsList = document.getElementById('detailInputs');
            inputsList.innerHTML = stage.inputsList.map(item => `<li>${item}</li>`).join('');
        }

        function selectStage(id) {
            currentStageId = id;
            renderFlowchart();
            updateStageDetail();
        }

        function switchSystem(sys) {
            currentSystem = sys;
            
            const btnEps = document.getElementById('btnEps');
            const btnTrad = document.getElementById('btnTrad');
            const banner = document.getElementById('systemBanner');

            if (sys === 'eps') {
                btnEps.className = "flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-sm transition-all duration-200 bg-white dark:bg-slate-900 text-cyan-600 dark:text-cyan-400 shadow-md";
                btnTrad.className = "flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-sm transition-all duration-200 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white";
                
                banner.className = "p-5 rounded-xl bg-cyan-50/70 dark:bg-cyan-950/40 border border-cyan-200 dark:border-cyan-800/60 transition-all";
                document.getElementById('bannerBadge').innerText = "SISTEMA INDUSTRIALIZADO";
                document.getElementById('bannerBadge').className = "inline-block px-2.5 py-0.5 rounded text-xs font-bold bg-cyan-200 text-cyan-900 dark:bg-cyan-900 dark:text-cyan-200";
                document.getElementById('bannerTitle').innerText = epsData.bannerTitle;
                document.getElementById('bannerDesc').innerText = epsData.bannerDesc;
                document.getElementById('bannerMetric1').innerText = epsData.metricWaste;
                document.getElementById('bannerMetric2').innerText = epsData.metricSpeed;
            } else {
                btnTrad.className = "flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-sm transition-all duration-200 bg-white dark:bg-slate-900 text-orange-600 dark:text-orange-400 shadow-md";
                btnEps.className = "flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-sm transition-all duration-200 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white";
                
                banner.className = "p-5 rounded-xl bg-orange-50/70 dark:bg-orange-950/40 border border-orange-200 dark:border-orange-800/60 transition-all";
                document.getElementById('bannerBadge').innerText = "MÉTODO CONVENCIONAL";
                document.getElementById('bannerBadge').className = "inline-block px-2.5 py-0.5 rounded text-xs font-bold bg-orange-200 text-orange-900 dark:bg-orange-900 dark:text-orange-200";
                document.getElementById('bannerTitle').innerText = tradData.bannerTitle;
                document.getElementById('bannerDesc').innerText = tradData.bannerDesc;
                document.getElementById('bannerMetric1').innerText = tradData.metricWaste;
                document.getElementById('bannerMetric2').innerText = tradData.metricSpeed;
            }

            renderFlowchart();
            updateStageDetail();
        }

        let wasteChartInstance = null;
        let carbonChartInstance = null;

        function initCharts() {
            const isDark = document.documentElement.classList.contains('dark');
            const textColor = isDark ? '#cbd5e1' : '#475569';
            const gridColor = isDark ? '#334155' : '#e2e8f0';

            // 1. Waste Chart
            const ctxWaste = document.getElementById('wasteChart').getContext('2d');
            wasteChartInstance = new Chart(ctxWaste, {
                type: 'bar',
                data: {
                    labels: ['Fundação', 'Estrutura/Parede', 'Tubulações/Rasgos', 'Revestimento', 'Acabamentos'],
                    datasets: [
                        {
                            label: 'EPS Monolítico (kg/m²)',
                            data: [1.0, 0.3, 0.1, 2.5, 1.2],
                            backgroundColor: '#06b6d4',
                            borderRadius: 6
                        },
                        {
                            label: 'Alvenaria Tradicional (kg/m²)',
                            data: [12.0, 18.0, 25.0, 15.0, 6.0],
                            backgroundColor: '#f97316',
                            borderRadius: 6
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: { labels: { color: textColor, font: { family: 'Inter', size: 11 } } },
                        tooltip: { mode: 'index', intersect: false }
                    },
                    scales: {
                        x: { ticks: { color: textColor, font: { family: 'Inter', size: 10 } }, grid: { color: gridColor } },
                        y: { 
                            ticks: { color: textColor, font: { family: 'Inter', size: 10 } }, 
                            grid: { color: gridColor },
                            title: { display: true, text: 'kg de entulho por m²', color: textColor, font: { size: 10 } }
                        }
                    }
                }
            });

            // 2. Carbon Footprint Chart (30 year lifecycle)
            const ctxCarbon = document.getElementById('carbonChart').getContext('2d');
            carbonChartInstance = new Chart(ctxCarbon, {
                type: 'line',
                data: {
                    labels: ['Ano 0 (Construção)', '5 Anos', '10 Anos', '15 Anos', '20 Anos', '30 Anos'],
                    datasets: [
                        {
                            label: 'EPS Monolítico (Ton CO₂ Eq / Casa 500m²)',
                            data: [65, 80, 95, 110, 125, 150],
                            borderColor: '#10b981',
                            backgroundColor: 'rgba(16, 185, 129, 0.1)',
                            fill: true,
                            tension: 0.3
                        },
                        {
                            label: 'Alvenaria Tradicional (Ton CO₂ Eq / Casa 500m²)',
                            data: [95, 130, 165, 200, 235, 305],
                            borderColor: '#ef4444',
                            backgroundColor: 'rgba(239, 68, 68, 0.05)',
                            fill: true,
                            tension: 0.3
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: { labels: { color: textColor, font: { family: 'Inter', size: 11 } } },
                        tooltip: { mode: 'index', intersect: false }
                    },
                    scales: {
                        x: { ticks: { color: textColor, font: { family: 'Inter', size: 10 } }, grid: { color: gridColor } },
                        y: { 
                            ticks: { color: textColor, font: { family: 'Inter', size: 10 } }, 
                            grid: { color: gridColor },
                            title: { display: true, text: 'Toneladas de CO₂ Acumuladas', color: textColor, font: { size: 10 } }
                        }
                    }
                }
            });
        }

        // Dark Mode Toggle Logic
        const themeToggleBtn = document.getElementById('themeToggle');
        themeToggleBtn.addEventListener('click', () => {
            document.documentElement.classList.toggle('dark');
            if (wasteChartInstance && carbonChartInstance) {
                wasteChartInstance.destroy();
                carbonChartInstance.destroy();
                initCharts();
            }
        });

        // Initialize App on Window Load
        window.onload = function() {
            renderInputWorkspace();
            document.getElementById('studyForm').addEventListener('submit', applyStudyInputs);
            document.getElementById('resetStudy').addEventListener('click', () => window.location.reload());
            renderFlowchart();
            updateStageDetail();
            initCharts();
            if (window.lucide) {
                lucide.createIcons();
            }
        };