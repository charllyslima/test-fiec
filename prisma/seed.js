// prisma/seed.ts

import {PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const dataVariables = [
        {sidraId: 630, name: 'Número de empresas (Unidades)'},
        {
            sidraId: 808,
            name: 'Número de empresas - percentual do total geral (%)',
            minDecimalPlaces: 0,
            maxDecimalPlaces: 5
        },
        {sidraId: 810, name: 'Valor bruto da produção industrial (Mil Reais)'},
        {
            sidraId: 811,
            name: 'Valor bruto da produção industrial - percentual do total geral (%)',
            minDecimalPlaces: 0,
            maxDecimalPlaces: 5
        },
        {sidraId: 824, name: 'Total da receita líquida de vendas (Mil Reais)'},
        {
            sidraId: 825,
            name: 'Total da receita líquida de vendas - percentual do total geral (%)',
            minDecimalPlaces: 0,
            maxDecimalPlaces: 5
        },
        {sidraId: 826, name: 'Receita líquida de vendas de produtos e serviços industriais (Mil Reais)'},
        {
            sidraId: 827,
            name: 'Receita líquida de vendas de produtos e serviços industriais - percentual do total geral (%)',
            minDecimalPlaces: 0,
            maxDecimalPlaces: 5
        },
        {sidraId: 828, name: 'Estoques de produtos acabados e em elaboração em 31/12 do ano anterior (Mil Reais)'},
        {
            sidraId: 829,
            name: 'Estoques de produtos acabados e em elaboração em 31/12 do ano anterior - percentual do total geral (%)',
            minDecimalPlaces: 0,
            maxDecimalPlaces: 5
        },
        {sidraId: 830, name: 'Estoques de produtos acabados e em elaboração em 31/12 do ano de referência (Mil Reais)'},
        {
            sidraId: 831,
            name: 'Estoques de produtos acabados e em elaboração em 31/12 do ano de referência - percentual do total geral (%)',
            minDecimalPlaces: 0,
            maxDecimalPlaces: 5
        },
        {sidraId: 832, name: 'Custos das operações industriais (Mil Reais)'},
        {
            sidraId: 833,
            name: 'Custos das operações industriais - percentual do total geral (%)',
            minDecimalPlaces: 0,
            maxDecimalPlaces: 5
        },
        {sidraId: 1000630, name: 'Compras de matérias-primas, materiais auxiliares e componentes (Mil Reais)'},
        {
            sidraId: 1000808,
            name: 'Compras de matérias-primas, materiais auxiliares e componentes - percentual do total geral (%)',
            minDecimalPlaces: 0,
            maxDecimalPlaces: 5
        },
        {
            sidraId: 1000810,
            name: 'Estoques de matérias-primas, materiais auxiliares e componentes em 31/12 do ano anterior (Mil Reais)'
        },
        {
            sidraId: 1000811,
            name: 'Estoques de matérias-primas, materiais auxiliares e componentes em 31/12 do ano anterior - percentual do total geral (%)',
            minDecimalPlaces: 0,
            maxDecimalPlaces: 5
        },
        {
            sidraId: 1000824,
            name: 'Estoques de matérias-primas, materiais auxiliares e componentes em 31/12 do ano de referência (Mil Reais)'
        },
        {
            sidraId: 1000825,
            name: 'Estoques de matérias-primas, materiais auxiliares e componentes em 31/12 do ano de referência - percentual do total geral (%)',
            minDecimalPlaces: 0,
            maxDecimalPlaces: 5
        },
        {sidraId: 1000826, name: 'Compras de energia elétrica e consumo de combustíveis (Mil Reais)'},
        {
            sidraId: 1000827,
            name: 'Compras de energia elétrica e consumo de combustíveis - percentual do total geral (%)',
            minDecimalPlaces: 0,
            maxDecimalPlaces: 5
        },
        {sidraId: 1000828, name: 'Consumo de peças, acessórios pequenas ferramentas (Mil Reais)'},
        {
            sidraId: 1000829,
            name: 'Consumo de peças, acessórios pequenas ferramentas - percentual do total geral (%)',
            minDecimalPlaces: 0,
            maxDecimalPlaces: 5
        },
        {sidraId: 1000830, name: 'Serviços industriais prestados por terceiros e de manutenção (Mil Reais)'},
        {
            sidraId: 1000831,
            name: 'Serviços industriais prestados por terceiros e de manutenção - percentual do total geral (%)',
            minDecimalPlaces: 0,
            maxDecimalPlaces: 5
        },
        {sidraId: 1000832, name: 'Valor da transformação industrial (Mil Reais)'},
        {
            sidraId: 1000833,
            name: 'Valor da transformação industrial - percentual do total geral (%)',
            minDecimalPlaces: 0,
            maxDecimalPlaces: 5
        }
    ];

    const dataCnaes = [
        {sidraId: 117897, name: "Total"},
        {sidraId: 116880, name: "B Indústrias extrativas"},
        {sidraId: 116881, name: "05 Extração de carvão mineral"},
        {sidraId: 116882, name: "05.0 Extração de carvão mineral"},
        {sidraId: 116884, name: "06 Extração de petróleo e gás natural"},
        {sidraId: 116885, name: "06.0 Extração de petróleo e gás natural"},
        {sidraId: 116887, name: "07 Extração de minerais metálicos"},
        {sidraId: 116888, name: "07.1 Extração de minério de ferro"},
        {sidraId: 116890, name: "07.2 Extração de minerais metálicos não-ferrosos"},
        {sidraId: 116897, name: "08 Extração de minerais não-metálicos"},
        {sidraId: 116898, name: "08.1 Extração de pedra, areia e argila"},
        {sidraId: 116900, name: "08.9 Extração de outros minerais não-metálicos"},
        {sidraId: 116905, name: "09 Atividades de apoio à extração de minerais"},
        {sidraId: 116906, name: "09.1 Atividades de apoio à extração de petróleo e gás natural"},
        {sidraId: 116908, name: "09.9 Atividades de apoio à extração de minerais, exceto petróleo e gás natural"},
        {sidraId: 116910, name: "C Indústrias de transformação"},
        {sidraId: 116911, name: "10 Fabricação de produtos alimentícios"},
        {sidraId: 116912, name: "10.1 Abate e fabricação de produtos de carne"},
        {sidraId: 116916, name: "10.2 Preservação do pescado e fabricação de produtos do pescado"},
        {sidraId: 116918, name: "10.3 Fabricação de conservas de frutas, legumes e outros vegetais"},
        {sidraId: 116922, name: "10.4 Fabricação de óleos e gorduras vegetais e animais"},
        {sidraId: 116926, name: "10.5 Laticínios"},
        {sidraId: 116930, name: "10.6 Moagem, fabricação de produtos amiláceos e de alimentos para animais"},
        {sidraId: 116938, name: "10.7 Fabricação e refino de açúcar"},
        {sidraId: 116941, name: "10.8 Torrefação e moagem de café"},
        {sidraId: 116944, name: "10.9 Fabricação de outros produtos alimentícios"},
        {sidraId: 116952, name: "11 Fabricação de bebidas"},
        {sidraId: 116953, name: "11.1 Fabricação de bebidas alcoólicas"},
        {sidraId: 116957, name: "11.2 Fabricação de bebidas não-alcoólicas"},
        {sidraId: 116960, name: "12 Fabricação de produtos do fumo"},
        {sidraId: 116961, name: "12.1 Processamento industrial do fumo"},
        {sidraId: 116963, name: "12.2 Fabricação de produtos do fumo"},
        {sidraId: 116965, name: "13 Fabricação de produtos têxteis"},
        {sidraId: 116966, name: "13.1 Preparação e fiação de fibras têxteis"},
        {sidraId: 116971, name: "13.2 Tecelagem, exceto malha"},
        {sidraId: 116975, name: "13.3 Fabricação de tecidos de malha"},
        {sidraId: 116977, name: "13.4 Acabamentos em fios, tecidos e artefatos têxteis"},
        {sidraId: 116979, name: "13.5 Fabricação de artefatos têxteis, exceto vestuário"},
        {sidraId: 116985, name: "14 Confecção de artigos do vestuário e acessórios"},
        {sidraId: 116986, name: "14.1 Confecção de artigos do vestuário e acessórios"},
        {sidraId: 116991, name: "14.2 Fabricação de artigos de malharia e tricotagem"},
        {
            sidraId: 116994,
            name: "15 Preparação de couros e fabricação de artefatos de couro, artigos para viagem e calçados"
        },
        {sidraId: 116995, name: "15.1 Curtimento e outras preparações de couro"},
        {sidraId: 116997, name: "15.2 Fabricação de artigos para viagem e de artefatos diversos de couro"},
        {sidraId: 117000, name: "15.3 Fabricação de calçados"},
        {sidraId: 117005, name: "15.4 Fabricação de partes para calçados, de qualquer material"},
        {sidraId: 117007, name: "16 Fabricação de produtos de madeira"},
        {sidraId: 117008, name: "16.1 Desdobramento de madeira"},
        {sidraId: 117010, name: "16.2 Fabricação de produtos de madeira, cortiça e material trançado, exceto móveis"},
        {sidraId: 117015, name: "17 Fabricação de celulose, papel e produtos de papel"},
        {sidraId: 117016, name: "17.1 Fabricação de celulose e outras pastas para a fabricação de papel"},
        {sidraId: 117018, name: "17.2 Fabricação de papel, cartolina e papel-cartão"},
        {sidraId: 117021, name: "17.3 Fabricação de embalagens de papel, cartolina, papel-cartão e papelão ondulado"},
        {
            sidraId: 117025,
            name: "17.4 Fabricação de produtos diversos de papel, cartolina, papel-cartão e papelão ondulado"
        },
        {sidraId: 117029, name: "18 Impressão e reprodução de gravações"},
        {sidraId: 117030, name: "18.1 Atividade de impressão"},
        {sidraId: 117034, name: "18.2 Serviços de pré-impressão e acabamentos gráficos"},
        {sidraId: 117037, name: "18.3 Reprodução de materiais gravados em qualquer suporte"},
        {sidraId: 117039, name: "19 Fabricação de coque, de produtos derivados do petróleo e de biocombustíveis"},
        {sidraId: 117040, name: "19.1 Coquerias"},
        {sidraId: 117042, name: "19.2 Fabricação de produtos derivados do petróleo"},
        {sidraId: 117045, name: "19.3 Fabricação de biocombustíveis"},
        {sidraId: 117048, name: "20 Fabricação de produtos químicos"},
        {sidraId: 117049, name: "20.1 Fabricação de produtos químicos inorgânicos"},
        {sidraId: 117055, name: "20.2 Fabricação de produtos químicos orgânicos"},
        {sidraId: 117059, name: "20.3 Fabricação de resinas e elastômeros"},
        {sidraId: 117063, name: "20.4 Fabricação de fibras artificiais e sintéticas"},
        {sidraId: 117065, name: "20.5 Fabricação de defensivos agrícolas e desinfestantes domissanitários"},
        {
            sidraId: 117068,
            name: "20.6 Fabricação de sabões, detergentes, produtos de limpeza, cosméticos, produtos de perfumaria e de higiene pessoal"
        },
        {sidraId: 117072, name: "20.7 Fabricação de tintas, vernizes, esmaltes, lacas e produtos afins"},
        {sidraId: 117076, name: "20.9 Fabricação de produtos e preparados químicos diversos"},
        {sidraId: 117082, name: "21 Fabricação de produtos farmoquímicos e farmacêuticos"},
        {sidraId: 117083, name: "21.1 Fabricação de produtos farmoquímicos"},
        {sidraId: 117085, name: "21.2 Fabricação de produtos farmacêuticos"},
        {sidraId: 117089, name: "22 Fabricação de produtos de borracha e de material plástico"},
        {sidraId: 117090, name: "22.1 Fabricação de produtos de borracha"},
        {sidraId: 117094, name: "22.2 Fabricação de produtos de material plástico"},
        {sidraId: 117099, name: "23 Fabricação de produtos de minerais não-metálicos"},
        {sidraId: 117100, name: "23.1 Fabricação de vidro e de produtos do vidro"},
        {sidraId: 117104, name: "23.2 Fabricação de cimento"},
        {
            sidraId: 117106,
            name: "23.3 Fabricação de artefatos de concreto, cimento, fibrocimento, gesso e materiais semelhantes"
        },
        {sidraId: 117108, name: "23.4 Fabricação de produtos cerâmicos"},
        {
            sidraId: 117112,
            name: "23.9 Aparelhamento de pedras e fabricação de outros produtos de minerais não-metálicos"
        },
        {sidraId: 117116, name: "24 Metalurgia"},
        {sidraId: 117117, name: "24.1 Produção de ferro-gusa e de ferroligas"},
        {sidraId: 117120, name: "24.2 Siderurgia"},
        {sidraId: 117125, name: "24.3 Produção de tubos de aço, exceto tubos sem costura"},
        {sidraId: 117128, name: "24.4 Metalurgia dos metais não-ferrosos"},
        {sidraId: 117133, name: "24.5 Fundição"},
        {sidraId: 117136, name: "25 Fabricação de produtos de metal, exceto máquinas e equipamentos"},
        {sidraId: 117137, name: "25.1 Fabricação de estruturas metálicas e obras de caldeiraria pesada"},
        {sidraId: 117141, name: "25.2 Fabricação de tanques, reservatórios metálicos e caldeiras"},
        {sidraId: 117144, name: "25.3 Forjaria, estamparia, metalurgia do pó e serviços de tratamento de metais"},
        {sidraId: 117148, name: "25.4 Fabricação de artigos de cutelaria, de serralheria e ferramentas"},
        {sidraId: 117152, name: "25.5 Fabricação de equipamento bélico pesado, armas de fogo e munições"},
        {sidraId: 117154, name: "25.9 Fabricação de produtos de metal não especificados anteriormente"},
        {sidraId: 117159, name: "26 Fabricação de equipamentos de informática, produtos eletrônicos e ópticos"},
        {sidraId: 117160, name: "26.1 Fabricação de componentes eletrônicos"},
        {sidraId: 117162, name: "26.2 Fabricação de equipamentos de informática e periféricos"},
        {sidraId: 117165, name: "26.3 Fabricação de equipamentos de comunicação"},
        {
            sidraId: 117168,
            name: "26.4 Fabricação de aparelhos de recepção, reprodução, gravação e amplificação de áudio e vídeo"
        },
        {
            sidraId: 117170,
            name: "26.5 Fabricação de aparelhos e instrumentos de medida, teste e controle; cronômetros e relógios"
        },
        {
            sidraId: 117173,
            name: "26.6 Fabricação de aparelhos eletromédicos e eletroterapêuticos e equipamentos de irradiação"
        },
        {
            sidraId: 117175,
            name: "26.7 Fabricação de equipamentos e instrumentos ópticos, fotográficos e cinematográficos"
        },
        {sidraId: 117177, name: "26.8 Fabricação de mídias virgens, magnéticas e ópticas"},
        {sidraId: 117179, name: "27 Fabricação de máquinas, aparelhos e materiais elétricos"},
        {sidraId: 117180, name: "27.1 Fabricação de geradores, transformadores e motores elétricos"},
        {sidraId: 117182, name: "27.2 Fabricação de pilhas, baterias e acumuladores elétricos"},
        {sidraId: 117185, name: "27.3 Fabricação de equipamentos para distribuição e controle de energia elétrica"},
        {sidraId: 117189, name: "27.4 Fabricação de lâmpadas e outros equipamentos de iluminação"},
        {sidraId: 117191, name: "27.5 Fabricação de eletrodomésticos"},
        {
            sidraId: 117194,
            name: "27.9 Fabricação de equipamentos e aparelhos elétricos não especificados anteriormente"
        },
        {sidraId: 117196, name: "28 Fabricação de máquinas e equipamentos"},
        {sidraId: 117197, name: "28.1 Fabricação de motores, bombas, compressores e equipamentos de transmissão"},
        {sidraId: 117203, name: "28.2 Fabricação de máquinas e equipamentos de uso geral"},
        {
            sidraId: 117210,
            name: "28.3 Fabricação de tratores e de máquinas e equipamentos para a agricultura e pecuária"
        },
        {sidraId: 117214, name: "28.4 Fabricação de máquinas-ferramenta"},
        {
            sidraId: 117216,
            name: "28.5 Fabricação de máquinas e equipamentos de uso na extração mineral e na construção"
        },
        {sidraId: 117221, name: "28.6 Fabricação de máquinas e equipamentos de uso industrial específico"},
        {sidraId: 117229, name: "29 Fabricação de veículos automotores, reboques e carrocerias"},
        {sidraId: 117230, name: "29.1 Fabricação de automóveis, camionetas e utilitários"},
        {sidraId: 117232, name: "29.2 Fabricação de caminhões e ônibus"},
        {sidraId: 117234, name: "29.3 Fabricação de cabines, carrocerias e reboques para veículos automotores"},
        {sidraId: 117236, name: "29.4 Fabricação de peças e acessórios para veículos automotores"},
        {sidraId: 117243, name: "29.5 Recondicionamento e recuperação de motores para veículos automotores"},
        {sidraId: 117245, name: "30 Fabricação de outros equipamentos de transporte, exceto veículos automotores"},
        {sidraId: 117246, name: "30.1 Construção de embarcações"},
        {sidraId: 117249, name: "30.3 Fabricação de veículos ferroviários"},
        {sidraId: 117252, name: "30.4 Fabricação de aeronaves"},
        {sidraId: 117255, name: "30.5 Fabricação de veículos militares de combate"},
        {sidraId: 117257, name: "30.9 Fabricação de equipamentos de transporte não especificados anteriormente"},
        {sidraId: 117261, name: "31 Fabricação de móveis"},
        {sidraId: 117262, name: "31.0 Fabricação de móveis"},
        {sidraId: 117267, name: "32 Fabricação de produtos diversos"},
        {sidraId: 117268, name: "32.1 Fabricação de artigos de joalheria, bijuteria e semelhantes"},
        {sidraId: 117271, name: "32.2 Fabricação de instrumentos musicais"},
        {sidraId: 117273, name: "32.3 Fabricação de artefatos para pesca e esporte"},
        {sidraId: 117275, name: "32.4 Fabricação de brinquedos e jogos recreativos"},
        {
            sidraId: 117277,
            name: "32.5 Fabricação de instrumentos e materiais para uso médico e odontológico e de artigos ópticos"
        },
        {sidraId: 117279, name: "32.9 Fabricação de produtos diversos"},
        {sidraId: 117283, name: "33 Manutenção, reparação e instalação de máquinas e equipamentos"},
        {sidraId: 117284, name: "33.1 Manutenção e reparação de máquinas e equipamentos"},
        {sidraId: 117293, name: "33.2 Instalação de máquinas e equipamentos"}
    ];

    const dataYear = [
        {sidraId: 2020, name: '2020'},
        {sidraId: 2019, name: '2019'},
        {sidraId: 2018, name: '2018'},
        {sidraId: 2017, name: '2017'},
        {sidraId: 2016, name: '2016'},
        {sidraId: 2015, name: '2015'},
        {sidraId: 2014, name: '2014'},
        {sidraId: 2013, name: '2013'},
        {sidraId: 2012, name: '2012'},
        {sidraId: 2011, name: '2011'},
        {sidraId: 2010, name: '2010'},
        {sidraId: 2009, name: '2009'},
        {sidraId: 2008, name: '2008'},
        {sidraId: 2007, name: '2007'},
    ]

    // Inserindo os dados no banco
    for (const item of dataVariables) {
        await prisma.variable_filter.create({
            data: item,
        });
    }
    for (const item2 of dataCnaes) {
        await prisma.cnae_filter.create({
            data: item2,
        });
    }

    for (const item3 of dataYear) {
        await prisma.year_filter.create({
            data: item3,
        });
    }

    console.log('Seeder executado com sucesso!');
}

// Executa o seeding
main()
    .catch(e => {
        console.error(e);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
