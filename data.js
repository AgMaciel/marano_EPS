const defaultStudyProfile = {
    business: "Construção de Luxo",
    size: "Médio / Grande",
    employees: "~120 Colaboradores",
    years: "15 Anos de Tradição",
    positioning: "Casas de Alto Padrão"
};

// Data for EPS Monolítico System
        const epsData = {
            name: "Sistema Monolítico EPS Tipo F",
            badgeClass: "bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-200",
            bannerTitle: "Painéis Monolíticos em EPS Tipo F + Concreto Projetado",
            bannerDesc: "Estrutura tridimensional industrializada com núcleo térmico de Poliestireno Expandido (Tipo F autoextinguível), malhas de aço e micro-concreto jateado. Obra limpa, sem entulho de quebra e alta velocidade.",
            metricWaste: "-88%",
            metricSpeed: "+50%",
            stages: [
                {
                    id: 1,
                    title: "1. Fundação & Arranques",
                    duration: "8 a 12 dias",
                    input: "Aço CA-50, Concreto C30, Lona Plástica",
                    output: "Resíduo Mínimo de Fôrmas, Água de Lavagem",
                    description: "Execução de Radier ou Viga Baldrame otimizada. A leveza do sistema EPS reduz as cargas nas fundações em até 30%, exigindo menor escavação e menor volume de concreto usinado.",
                    equipment: ["Escavadeira Compacta", "Nível Laser", "Vibrador de Concreto"],
                    inputsList: ["Aço Estrutural CA-50/60", "Concreto Usinado C30", "Manta Impermeabilizante"],
                    mitigation: "A água de lavagem dos caminhões de concreto passa por caixa de decantação alcalina antes da neutralização.",
                    wasteLevel: "Muito Baixo (~1.0 kg/m²)",
                    wasteTag: "Eco-Eficiente"
                },
                {
                    id: 2,
                    title: "2. Montagem dos Painéis EPS",
                    duration: "10 a 15 dias",
                    input: "Painéis EPS Tipo F, Malha Eletrosoldada, Grampos",
                    output: "Retalhos Limpos de EPS (100% Recicláveis)",
                    description: "Posicionamento e amarração dos painéis industriais de EPS reticulado. Os painéis vêm cortados de fábrica na medida exata do projeto executivo.",
                    equipment: ["Alicate Pneumático", "Nível de Prumo", "Guindaste Leve / Escadas"],
                    inputsList: ["Painéis EPS Tipo F (Autoextinguível)", "Telas de Aço Galvanizado", "Conectores de Precisão"],
                    mitigation: "Todos os recortes de EPS são ensacados imediatamente e encaminhados para a fabricante para logística reversa e derretimento/reuso.",
                    wasteLevel: "Praticamente Zero (~0.3 kg/m²)",
                    wasteTag: "Reciclagem Total"
                },
                {
                    id: 3,
                    title: "3. Instalações Embutidas",
                    duration: "5 a 8 dias",
                    input: "Eletrodutos Flexíveis, Tubos PEX/PPR, Soprador Térmico",
                    output: "Sem entulho de quebra! Apenas sobras plásticas",
                    description: "Abertura de canaletas no EPS utilizando soprador térmico (ar quente). O EPS derrete localmente sem gerar poeira, ruído ou entulho sólido, permitindo o embutimento rápido das tubulações.",
                    equipment: ["Soprador Térmico Industrial", "Pistola de Fixação", "Ferramental Manual"],
                    inputsList: ["Tubulações PEX / PPR", "Eletrodutos Corrugados PEAD", "Caixas de Passagem"],
                    mitigation: "A ausência de marretamento elimina a emissão de poeira e o ruído excessivo, protegendo a saúde ocupacional do canteiro.",
                    wasteLevel: "Zero Entulho Cerâmico",
                    wasteTag: "Obra Silenciosa & Limpa"
                },
                {
                    id: 4,
                    title: "4. Projeção de Concreto",
                    duration: "12 a 18 dias",
                    input: "Cimento, Areia Médio/Fina, Aditivos, Água",
                    output: "Respingo Recuado de Argamassa, Efluente Hídrico",
                    description: "Aplicação de duas camadas de micro-concreto/argamassa estrutural jateada via bomba pneumática sobre os dois lados do painel EPS, cobrindo totalmente o aço.",
                    equipment: ["Projetora Pneu/Bomba de Concreto", "MCompressor de Ar", "Régua Alinhadora"],
                    inputsList: ["Cimento CP-II / CP-V", "Agregado Miúdo Selecionado", "Aditivo Plastificante e Fibras"],
                    mitigation: "Utilização de telas de contenção para retenção de respingos e reaproveitamento imediato da massa antes da pega no piso.",
                    wasteLevel: "Baixo (~2.5 kg/m²)",
                    wasteTag: "Controle de Respingo"
                },
                {
                    id: 5,
                    title: "5. Acabamento & Entrega",
                    duration: "20 a 30 dias",
                    input: "Massa Fina, Tintas Ecomateriais, Revestimentos",
                    output: "Embalagens Recicláveis, Latas de Tinta",
                    description: "Como as superfícies projetadas já saem perfeitamente aprumadas e niveladas, o consumo de massa de acabamento e tintas cai pela metade em relação à alvenaria tradicional.",
                    equipment: ["Lixadeiras com Aspirador Integrado", "Desempenadeiras", "Pistola Airless"],
                    inputsList: ["Argamassa Cimento Queimado/Pintura", "Gesso Apropriado", "Impermeabilizante"],
                    mitigation: "Separação de latas e sacaria limpa enviadas para cooperativas locais parceiras da certificação ISO 14001.",
                    wasteLevel: "Mínimo (~1.2 kg/m²)",
                    wasteTag: "Pronto para Uso"
                }
            ]
        };

        // Data for Traditional Masonry System
        const tradData = {
            name: "Sistema Tradicional (Alvenaria Cerâmica)",
            badgeClass: "bg-orange-100 text-orange-800 dark:bg-orange-950 dark:text-orange-200",
            bannerTitle: "Estrutura Convencional de Concreto Armado + Tijolos Cerâmicos / Bloco",
            bannerDesc: "Método artesanal contínuo com pilares, vigas, assentamento de tijolos, rasgos com ponteira para tubulações e reboco espesso. Elevada geração de entulho e maior pegada de carbono.",
            metricWaste: "+450% Entulho",
            metricSpeed: "Processo Lento",
            stages: [
                {
                    id: 1,
                    title: "1. Fundação & Fôrmas Madeira",
                    duration: "15 a 22 dias",
                    input: "Aço, Concreto, Muita Madeira para Fôrmas, Pregos",
                    output: "Madeira Usada/Descarte, Sobras de Concreto",
                    description: "Escavação profunda para sapatas/estacas e montagem de caixarias de madeira para vigas baldrames devido ao alto peso total da estrutura de alvenaria.",
                    equipment: ["Escavadeira", "Serra Circular de Bancada", "Vibrador de Imersão"],
                    inputsList: ["Madeira de Pinus/Tábua", "Aço CA-50", "Concreto C25/C30"],
                    mitigation: "Reutilização parcial de tábuas de fôrma até o limite do desgaste; descarte em caçambas de entulho da construção civil.",
                    wasteLevel: "Elevado (~12 kg/m²)",
                    wasteTag: "Alto Desperdício Madeira"
                },
                {
                    id: 2,
                    title: "2. Elevação de Alvenaria",
                    duration: "25 a 35 dias",
                    input: "Tijolos Cerâmicos, Argamassa de Assentamento, Areia",
                    output: "Tijolos Quebrados, Perda de Massa no Piso",
                    description: "Assentamento manual tijolo por tijolo. Requer moldagem prévia de pilares e vigas de concreto armado (pilaral). Grande perda por transporte e quebras.",
                    equipment: ["Betoneira 400L", "Colher de Pedreiro", "Prumo e Linha"],
                    inputsList: ["Tijolos Cerâmicos 8 ou 9 Furos", "Cimento e Cal Hidratada", "Areia Média"],
                    mitigation: "Acúmulo de cacos de tijolo no chão para varrição periódica e destinação via caçambas RCD.",
                    wasteLevel: "Alto (~18 kg/m²)",
                    wasteTag: "Perda por Perdas/Quebras"
                },
                {
                    id: 3,
                    title: "3. Rasgo para Tubulações",
                    duration: "15 a 20 dias",
                    input: "Marteletes, Discos de Corte, Tubos PVC/PPR",
                    output: "Volume Crítico de Entulho Cerâmico e Poeira",
                    description: "Após erguer a parede, as alvenarias são cortadas e quebradas com ponteiro/martelete para rasgar os caminhos de eletrodutos e canos de água.",
                    equipment: ["Martelete Rompedor", "Lixadeira/Cortadora de Parede", "Talhadeiras"],
                    inputsList: ["Tubulações PVC Esgoto/Água", "Eletrodutos Rígidos", "Argamassa de Chumbamento"],
                    mitigation: "Uso obrigatório de máscaras PFF2 pelos operários; volume maciço de pó de tijolo e caçambas cheias de entulho.",
                    wasteLevel: "Crítico (~25 kg/m²)",
                    wasteTag: "Quebra e Entulho Massivo"
                },
                {
                    id: 4,
                    title: "4. Chapisco & Reboco Espesso",
                    duration: "25 a 35 dias",
                    input: "Argamassa de Reboco, Cal, Cimento, Água",
                    output: "Massa Caída no Chão, Efluente com Areia/Cal",
                    description: "Aplicação de camada espessa de reboco (2 a 4 cm) para corrigir falhas de prumo e desalinhamento dos tijolos assentados manualmente.",
                    equipment: ["Betoneira", "Colher/Desempenadeira", "Andaimes Tubulares"],
                    inputsList: ["Cimento", "Cal", "Areia Fina Selecionada", "Aditivos Vedantes"],
                    mitigation: "Raspagem do piso ao final do expediente para remoção de argamassa curada caída.",
                    wasteLevel: "Alto (~15 kg/m²)",
                    wasteTag: "Desperdício por Revestimento"
                },
                {
                    id: 5,
                    title: "5. Acabamentos & Correções",
                    duration: "30 a 45 dias",
                    input: "Massa Corrida (Muitas Demãos), Tintas, Lixas",
                    output: "Pó de Lixamento, Sobras de Revestimentos",
                    description: "Correções extensas de imperfeições no reboco com massa corrida e gesso. Processo demorado devido aos tempos de cura da umidade retida nas paredes.",
                    equipment: ["Lixadeiras", "Andaimes", "Rolo de Pintura"],
                    inputsList: ["Massa Corrida PVA/Acrílica", "Tintas Látex", "Selador Acrílico"],
                    mitigation: "Varrição contínua e transporte do pó residual para aterros sanitários licenciados.",
                    wasteLevel: "Moderado (~6 kg/m²)",
                    wasteTag: "Ajustes de Imperfeição"
                }
            ]
        };