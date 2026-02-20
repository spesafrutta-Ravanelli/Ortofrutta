/**
 * Store Pinia per la gestione di Categorie e Prodotti
 * Struttura: Stagionalità + Prodotti Tutto l'Anno
 */

import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useProductsStore = defineStore('products', () => {
  // ========== PRODOTTI STAGIONALI ==========
  const stagioni = ref([
    {
      id: 'inverno',
      nome: 'Inverno',
      icon: '❄️',
      mesi: 'Dicembre - Febbraio',
      sottocategorie: [
        {
          id: 'frutta-inverno',
          nome: 'Frutta Invernale',
          icon: '🍊',
          prodotti: [
            { 
              id: 1, 
              name: 'Melinda Golden Delicious', 
              origin: 'Trentino', 
              price: '2.40', 
              unit: 'kg', 
              available: true,
              image: '/images/products/melinda-golden.jpg',
              description:'Mela Golden Delicious Melinda dal Trentino: eccellenza certificata e qualità garantita. La sua buccia giallo dorata racchiude una polpa croccante, succosa e naturalmente dolce, dal sapore equilibrato e delicato. Coltivata nelle valli alpine con metodi sostenibili, è perfetta sia fresca che in cucina, per dolci, torte e preparazioni salate. Ricca di vitamine e antiossidanti, è la scelta ideale per tutta la famiglia.'
            },
            { 
              id: 2, 
              name: 'Golden Delicious', 
              origin: 'Italia', 
              price: '2.40', 
              unit: 'kg', 
              available: true,
              image: '/images/products/golden-amelia.jpg',
              description: 'Golden Delicious: dolcezza, croccantezza e qualità certificata in ogni morso. Coltivata con cura nelle valli italiane, si distingue per la polpa succosa, fragrante e naturalmente dolce, racchiusa in una buccia dal caratteristico giallo dorato. Ideale da gustare fresca o in cucina, per dolci, torte, macedonie o dessert al forno. Ricca di vitamine e antiossidanti, porta tradizione e genuinità direttamente sulla tua tavola.'
            },
            { 
              id: 3, 
              name: 'Renetta', 
              origin: 'Italia', 
              price: '2.20', 
              unit: 'kg', 
              available: true,
              image: '/images/products/renetta.jpg',
              description: 'Mela Renetta: un classico della tradizione italiana dal sapore equilibrato tra dolce e acidulo e dalla polpa compatta e profumata. La buccia sottile e leggermente rugosa racchiude un frutto versatile, ideale sia da gustare fresco che per preparazioni in cucina, come dolci, torte e composte, dove mantiene consistenza e aroma. Ricca di nutrienti e antiossidanti naturali, unisce gusto, genuinità e tradizione.'
            },
            { 
              id: 4, 
              name: 'Ambrosia', 
              origin: 'Italia', 
              price: '2.60', 
              unit: 'kg', 
              available: true,
              image: '/images/products/ambrosia.jpg',
              description:'Mela Ambrosia: dolcezza e succosità in ogni morso. La polpa croccante, morbida e aromatica conquista al primo assaggio, mentre la buccia rosata sfumata di giallo la rende immediatamente riconoscibile. Coltivata con attenzione in terreni selezionati, unisce gusto e qualità, perfetta da gustare fresca o in insalate, dessert e preparazioni creative. Ricca di vitamine e antiossidanti, è la scelta ideale per chi cerca un frutto sano e naturalmente dolce.'
            },
            { 
              id: 5, 
              name: 'Fuji', 
              origin: 'Italia', 
              price: '2.50', 
              unit: 'kg', 
              available: true,
              image: '/images/products/fuji.jpg',
              description: 'Mela Fuji: dolcezza intensa e croccantezza in ogni morso. Con la polpa soda, succosa e aromaticamente zuccherina, la Fuji è una delle mele più amate per il gusto deciso e persistente. La buccia liscia dai toni rosso sfumato con giallo nasconde un frutto versatile, ideale sia fresco che in insalate, dolci, dessert o preparazioni al forno. Ricca di vitamine e antiossidanti naturali, è perfetta per tutta la famiglia.'
            },
            { 
              id: 6, 
              name: 'Red Delicious', 
              origin: 'Italia', 
              price: '2.30', 
              unit: 'kg', 
              available: true,
              image: '/images/products/red-delicious.jpg',
              description:  'Red Delicious: la mela dal gusto dolce e delicato, con buccia rosso intenso e brillante. La polpa croccante e succosa la rende perfetta da gustare fresca, in spuntini o macedonie, portando colore e dolcezza naturale sulla tua tavola. Grazie al sapore equilibrato e alla consistenza soda, è ideale anche per piatti leggeri e dessert, rappresentando la scelta sana e genuina per tutta la famiglia.'
            },
            { 
              id: 7, 
              name: 'Granny Smith', 
              origin: 'Italia', 
              price: '2.40', 
              unit: 'kg', 
              available: true,
              image: '/images/products/granny-smith.jpg',
              description: 'Granny Smith: la mela dal gusto fresco, acidulo e vivace, dal caratteristico colore verde brillante. La sua polpa croccante e succosa offre un equilibrio perfetto tra acidità e dolcezza naturale, rendendola ideale da gustare fresca, in insalate, dessert o preparazioni al forno. Ricca di vitamine e antiossidanti, la Granny Smith è perfetta per chi cerca un frutto sano, rinfrescante e dal sapore deciso, capace di dare carattere a ogni piatto. Granny Smith: freschezza, croccantezza e gusto inconfondibile in ogni morso.'
            },
            { 
              id: 8, 
              name: 'Annurca', 
              origin: 'Italia', 
              price: '2.40', 
              unit: 'kg', 
              available: true,
              image: '/images/products/annurca.jpg',
              description: 'La Mela Annurca è un frutto tipico italiano, di piccole dimensioni, con buccia rosso brillante e polpa croccante e dolce-acidula. Perfetta da gustare fresca, in macedonie o dessert, è apprezzata per il suo sapore unico e aromatico. Ricca di vitamine e fibre, la mela Annurca fresca e di stagione garantisce qualità e genuinità direttamente dal produttore al tuo banco.'
            },
            { 
              id: 9, 
              name: 'Kissabel', 
              origin: 'Italia', 
              price: '4.50', 
              unit: 'kg', 
              available: true,
              image: '/images/products/kissabel.jpg',
              description: 'La mela Kissabel è un frutto tipico italiano, di piccole dimensioni, con buccia rosso brillante e polpa croccante e dolce-acidula. Perfetta da gustare fresca, in macedonie o dessert, è apprezzata per il suo sapore unico e aromatico. Ricca di vitamine e fibre, la mela Kissabel fresca e di stagione garantisce qualità e genuinità direttamente dal produttore al tuo banco.'
            },
            { 
              id: 10, 
              name: 'Abate Fetel', 
              origin: 'Italia', 
              price: '2.80', 
              unit: 'kg', 
              available: true,
              image: '/images/products/abate-fetel.jpg',
              description: 'Pera Abate Fetel: dolcezza elegante e polpa succosa in ogni morso. Dalla forma allungata e slanciata, con buccia liscia e color giallo dorato, la Abate Fetel è famosa per il suo aroma delicato e il sapore naturalmente zuccherino. Perfetta da gustare fresca, in macedonie o dessert, mantiene anche consistenza e gusto nelle preparazioni al forno. Ricca di vitamine e fibre naturali, è una scelta sana e genuina per tutta la famiglia. Abate Fetel: dolcezza, morbidezza e profumo inconfondibile, un classico della frutta italiana.'
            },
            { 
              id: 11, 
              name: 'Kaiser', 
              origin: 'Italia', 
              price: '2.60', 
              unit: 'kg', 
              available: true,
              image: '/images/products/pera-kaiser.jpg',
              description: 'Pera Kaiser: dolcezza delicata e polpa croccante in ogni morso. La sua buccia liscia, dal verde chiaro leggermente sfumato di rosso, nasconde un frutto versatile e saporito, ideale da gustare fresco o in preparazioni al forno, dolci e macedonie. Ricca di vitamine e antiossidanti naturali, la Kaiser unisce gusto e qualità, rendendola perfetta per chi cerca un frutto sano, genuino e dal sapore equilibrato. Kaiser: croccantezza, dolcezza e freschezza in ogni morso.'
            },
            { 
              id: 12, 
              name: 'Decana', 
              origin: 'Italia', 
              price: '2.50', 
              unit: 'kg', 
              available: true,
              image: '/images/products/decana.jpg',
              description: 'Pera Decana: dolcezza intensa e polpa succosa in ogni morso. La sua forma rotonda e compatta, con buccia liscia dal colore giallo-verde, racchiude un frutto dal sapore equilibrato e aromatico. Perfetta da gustare fresca, in macedonie o dessert, mantiene consistenza e gusto anche nelle preparazioni al forno. Ricca di vitamine, fibre e antiossidanti naturali, la Decana è un frutto sano, genuino e versatile, ideale per tutta la famiglia. Decana: dolcezza, morbidezza e aroma inconfondibile, un classico della frutta italiana.'
            },
            { 
              id: 13, 
              name: 'Kiwi Giallo Zespri', 
              origin: 'Italia', 
              price: '4.20', 
              unit: 'kg', 
              available: true,
              image: '/images/products/kiwi-giallo.jpg',
              description: 'Kiwi Giallo: dolcezza esotica e polpa morbida in ogni morso. Con il suo colore dorato brillante e il sapore naturalmente zuccherino, il kiwi giallo è perfetto da gustare fresco, in macedonie, smoothie o dessert. Ricco di vitamine, in particolare vitamina C, minerali e antiossidanti naturali, è un frutto sano, nutriente e ideale per chi cerca freschezza e energia in ogni momento della giornata. Kiwi Giallo: gusto dolce, polpa succosa e vitalità naturale, direttamente dalla natura alla tua tavola.'
            },
            {
              id: 179,
              name: 'Kiwi Rosso',
              origin: 'Italia',
              price: '4.20',
              unit: 'kg',
              available: true,
              image: '/images/products/kiwi-rosso.jpeg',
              description: 'Kiwi Rosso: dolcezza esotica e polpa morbida in ogni morso. Con il suo colore rosso brillante e il sapore naturalmente zuccherino, il kiwi rosso è perfetto da gustare fresco, in macedonie, smoothie o dessert. Ricco di vitamine, in particolare vitamina C, minerali e antiossidanti naturali, è un frutto sano, nutriente e ideale per chi cerca freschezza e energia in ogni momento della giornata. Kiwi Rosso: gusto dolce, polpa succosa e vitalità naturale, direttamente dalla natura alla tua tavola.'
            },
            { 
              id: 14, 
              name: 'Kiwi Verde Zespri', 
              origin: 'Italia', 
              price: '3.20', 
              unit: 'kg', 
              available: true,
              image: '/images/products/kiwi-verde.jpg',
              description: 'Kiwi Verde: freschezza e sapore inconfondibili in ogni morso. Con la sua polpa verde brillante, succosa e leggermente acidula, il kiwi verde è perfetto da gustare fresco, in macedonie, smoothie o dessert. Ricco di vitamina C, fibre e antiossidanti naturali, è un frutto sano e nutriente, ideale per chi cerca energia e vitalità in modo naturale. Kiwi Verde: gusto deciso, freschezza e benessere direttamente dalla natura alla tua tavola.'
            },
            { 
              id: 15, 
              name: 'Melograno', 
              origin: 'Italia', 
              price: '3.80', 
              unit: 'kg', 
              available: true,
              image: '/images/products/melograno.jpg',
              description: 'Melograno: colore intenso, freschezza e gusto unico in ogni chicco. Il melograno racchiude una polpa succosa e dolce-acidula, ricca di antiossidanti naturali e vitamine, ideale da gustare fresco, in macedonie, smoothie o come ingrediente originale in piatti creativi. Frutto simbolo di salute e vitalità, il melograno è perfetto per chi cerca un\'alimentazione sana, naturale e gustosa, portando sulla tavola un tocco di colore e benessere. Melograno: dolcezza, freschezza e vitalità naturale in ogni chicco.'
            },
            { 
              id: 16, 
              name: 'Cachi', 
              origin: 'Italia', 
              price: '3.50', 
              unit: 'kg', 
              available: true,
              image: '/images/products/cachi.jpg',
              description: 'Cachi: i cachi sono frutti dal colore arancione intenso e dalla polpa morbida e dolce. Ideali da consumare maturi al cucchiaio o come ingrediente per dolci e dessert, sono apprezzati per il loro gusto zuccherino e avvolgente. Ricchi di vitamine e sali minerali, i cachi freschi e di stagione garantiscono qualità e genuinità direttamente dal produttore al tuo banco.'
            },
            { 
              id: 17, 
              name: 'Cachi Mela', 
              origin: 'Italia', 
              price: '3.50', 
              unit: 'kg', 
              available: true,
              image: '/images/products/cachi-mela.jpg',
              description: 'Cachi Mela: dolcezza croccante e polpa soda in ogni morso. Il cachi mela, con la sua forma tondeggiante e il colore arancio intenso, unisce il gusto delicato del cachi alla consistenza più compatta, simile a quella di una mela. Perfetto da gustare fresco, in spuntini, macedonie o dessert, è un frutto sano e nutriente, ricco di vitamine, fibre e antiossidanti naturali. Cachi Mela: freschezza, dolcezza e croccantezza naturale, direttamente dalla natura alla tua tavola.'
            },
            { 
              id: 18, 
              name: 'Tarocco', 
              origin: 'Sicilia', 
              price: '2.20', 
              unit: 'kg', 
              available: true,
              image: '/images/products/tarocco.jpg',
              description: 'Arancia Tarocco: dolcezza equilibrata e colore intenso in ogni fetta. L\'arancia Tarocco, con la sua polpa succosa, rossa e aromatica, è famosa per il gusto dolce, leggermente acidulo e il profumo inconfondibile. Perfetta da gustare fresca, spremuta o in macedonie, smoothie e dolci, è ricca di vitamina C e antiossidanti naturali, ideale per chi cerca salute, energia e gusto in un frutto genuino. Tarocco: dolcezza, colore e freschezza naturale direttamente sulla tua tavola.'
            },
            { 
              id: 19, 
              name: 'Arancia Navel', 
              origin: 'Sicilia', 
              price: '2.00', 
              unit: 'kg', 
              available: true,
              image: '/images/products/navel.jpg',
              description: 'Arancia Navel: dolcezza, freschezza e succosità in ogni fetta. L\'arancia Navel, con la sua polpa succosa, di colore arancio brillante e senza semi, è perfetta da gustare fresca, in macedonie, dessert o spremute naturali. Dal gusto naturalmente dolce e aromatico, è ricca di vitamina C e antiossidanti, ideale per chi cerca un frutto genuino, sano e ricco di energia. Navel: colore intenso, dolcezza equilibrata e freschezza naturale direttamente sulla tua tavola.'
            },
            { 
              id: 20, 
              name: 'Tarocco da Spremuta', 
              origin: 'Sicilia', 
              price: '1.80', 
              unit: 'kg', 
              available: true,
              image: '/images/products/tarocco-spremuta.jpg',
              description: 'Arancia Tarocco da Spremuta: il massimo della dolcezza e del succo in ogni frutto. L\'arancia Tarocco da spremuta, con la sua polpa rossa, succosa e aromatica, è perfetta per ottenere spremute naturali, fresche e ricche di vitamina C. Dal gusto equilibrato, leggermente dolce con un tocco acidulo, è ideale per iniziare la giornata con energia o per arricchire smoothie e bevande salutari. Ricca di antiossidanti naturali, l\'arancia Tarocco da spremuta porta benessere e freschezza direttamente sulla tua tavola. Tarocco da Spremuta: gusto intenso, succosità naturale e vitalità in ogni spremuta.'
            },
            { 
              id: 21, 
              name: 'Mandarino', 
              origin: 'Calabria', 
              price: '2.80', 
              unit: 'kg', 
              available: true,
              image: '/images/products/mandarino.jpg',
              description: 'Mandarino: dolcezza e freschezza in ogni spicchio. Il mandarino, con la sua buccia sottile e facile da sbucciare, racchiude una polpa succosa, aromatica e naturalmente dolce, ideale da gustare fresco, in macedonie, dolci o spremute. Ricco di vitamina C e antiossidanti naturali, è un frutto sano, leggero e nutriente, perfetto per chi cerca gusto e vitalità in ogni momento della giornata. Mandarino: praticità, dolcezza e freschezza naturale direttamente sulla tua tavola.'
            },
            { 
              id: 22, 
              name: 'Mandarancio', 
              origin: 'Italia', 
              price: '2.90', 
              unit: 'kg', 
              available: true,
              image: '/images/products/mandarancio.jpg',
              description: 'Mandarancio: il perfetto equilibrio tra dolcezza e acidità in ogni spicchio. Il mandarancio, frutto dalla buccia sottile e profumata, combina il gusto intenso del mandarino con la freschezza dell\'arancia, regalando una polpa succosa e aromatica, ideale da gustare fresca, in macedonie, dolci o spremute naturali. Ricco di vitamina C, fibre e antiossidanti naturali, è un frutto sano, nutriente e versatile, perfetto per chi cerca gusto, energia e benessere in ogni momento della giornata. Mandarancio: freschezza, dolcezza e vitalità naturale direttamente sulla tua tavola.'
            },
            { 
              id: 23, 
              name: 'Pompelmo Rosa', 
              origin: 'Italia', 
              price: '2.50', 
              unit: 'kg', 
              available: true,
              image: '/images/products/pompelmo-rosa.jpg',
              description: 'Pompelmo Rosa: freschezza e gusto inconfondibili in ogni fetta. Il pompelmo rosa, con la sua polpa succosa e leggermente acidula, regala un equilibrio unico tra dolcezza e note acidule, ideale da gustare fresco, in macedonie, spremute o smoothie salutari. Ricco di vitamina C, fibre e antiossidanti naturali, è un frutto sano e leggero, perfetto per chi cerca benessere, vitalità e un tocco di freschezza naturale in ogni momento della giornata. Pompelmo Rosa: gusto deciso, colore intenso e freschezza naturale direttamente sulla tua tavola.'
            },
            { 
              id: 24, 
              name: 'Bergamotto', 
              origin: 'Calabria', 
              price: '4.50', 
              unit: 'kg', 
              available: true,
              image: '/images/products/bergamotto.jpg',
              description: 'Bergamotti: il profumo e l\'aroma della tradizione italiana in ogni frutto. Il bergamotto, con la sua buccia aromaticamente intensa e leggermente amara, è perfetto per spremute, aromatizzare piatti, dolci, bevande o per creare oli essenziali dal caratteristico profumo. Ricco di vitamine e composti naturali benefici, è un frutto sano, versatile e unico nel suo genere, capace di donare freschezza e gusto in cucina e benessere a chi lo utilizza. Bergamotto: aroma intenso, freschezza naturale e gusto autentico della Calabria direttamente sulla tua tavola.'
            },
            { 
              id: 25, 
              name: 'Limoni', 
              origin: 'Italia', 
              price: '2.80', 
              unit: 'kg', 
              available: true,
              image: '/images/products/limoni.jpeg',
              description: 'Pera: dolcezza e freschezza in ogni morso. Con la sua polpa succosa, aromatica e naturalmente zuccherina, la pera è un frutto versatile, ideale da gustare fresco, in macedonie, dolci o spremute naturali. Ricca di vitamine e antiossidanti naturali, è un frutto sano e nutriente, perfetto per chi cerca gusto e vitalità in ogni momento della giornata. Pera: dolcezza, freschezza e benessere naturale direttamente sulla tua tavola.'
            },
            { 
              id: 26, 
              name: 'Limoni a Buccia Edibile', 
              origin: 'Italia', 
              price: '2.80', 
              unit: 'kg', 
              available: true,
              image: '/images/products/limoni-edibili.jpg',
              description: 'Limoni a buccia edibile: freschezza, aroma e versatilità in un solo frutto. Con la loro buccia sottile e commestibile, i limoni a buccia edibile offrono un gusto intenso e profumato, ideale per spremute, insalate, dolci, piatti gourmet e decorazioni. Ricchi di vitamina C e antiossidanti naturali, sono un frutto sano, genuino e pratico, perfetto per chi ama sapore e benessere in cucina senza sprechi. Limoni a buccia edibile: aroma intenso, freschezza naturale e gusto versatile direttamente sulla tua tavola.'
            }
          ]
        },
        {
          id: 'verdura-inverno',
          nome: 'Verdura Invernale',
          icon: '🥬',
          prodotti: [
            { 
              id: 27, 
              name: 'Cavolo Nero', 
              origin: 'Toscana', 
              price: '2.80', 
              unit: 'kg', 
              available: true,
              image: '/images/products/cavolo-nero.jpg',
              description: 'Cavolo Nero: gusto deciso e proprietà nutritive d\'eccellenza. Dalle foglie lunghe e scure, il cavolo nero è un ortaggio tipico della tradizione italiana, apprezzato per il suo sapore intenso e leggermente amarognolo. Ideale per zuppe, minestre, contorni, vellutate e piatti rustici, è ricco di vitamine, sali minerali, fibre e antiossidanti naturali, perfetto per un\'alimentazione sana ed equilibrata. Cavolo Nero: tradizione, gusto e benessere direttamente dall\'orto alla tua tavola.'
            },
            { 
              id: 28, 
              name: 'Cavolo Verza', 
              origin: 'Italia', 
              price: '1.80', 
              unit: 'kg', 
              available: true,
              image: '/images/products/verza.jpg',
              description: 'Cavolo Verza: gusto delicato e grande versatilità in cucina. Con le sue foglie grandi, arricciate e dal colore verde intenso, il cavolo verza è un ortaggio tipico della stagione invernale, apprezzato per il sapore dolce e leggermente aromatico. Perfetto per zuppe, minestre, involtini, risotti e contorni, è ricco di vitamine, fibre e sali minerali, ideale per un\'alimentazione sana ed equilibrata. Cavolo Verza: tradizione, morbidezza e genuinità direttamente dall\'orto alla tua tavola.'
            },
            { 
              id: 29, 
              name: 'Broccoli', 
              origin: 'Italia', 
              price: '2.50', 
              unit: 'pz', 
              available: true,
              image: '/images/products/broccoli.jpg',
              description: 'Broccoli: gusto deciso e benessere naturale in ogni piatto. Con il loro colore verde intenso e la consistenza compatta, i broccoli sono un ortaggio ricco di proprietà nutritive, apprezzato per il sapore leggermente amarognolo e la grande versatilità in cucina. Ideali per contorni, primi piatti, vellutate e ricette salutari, sono ricchi di vitamine, fibre, sali minerali e antiossidanti naturali, perfetti per un\'alimentazione equilibrata. Broccoli: freschezza, qualità e salute direttamente dall\'orto alla tua tavola.'
            },
            { 
              id: 30, 
              name: 'Cavolfiore Bianco', 
              origin: 'Italia', 
              price: '2.20', 
              unit: 'kg', 
              available: true,
              image: '/images/products/cavolfiore.jpg',
              description: 'Cavolfiore: gusto delicato e versatilità in cucina. Con la sua infiorescenza compatta e il colore chiaro, il cavolfiore è un ortaggio invernale apprezzato per il sapore morbido e leggermente dolce. Perfetto per contorni, vellutate, gratin, primi piatti e preparazioni al forno, è ricco di vitamine, fibre e sali minerali, ideale per un\'alimentazione sana ed equilibrata. Cavolfiore: semplicità, genuinità e benessere direttamente dall\'orto alla tua tavola.'
            },
            { 
              id: 31, 
              name: 'Cavolfiore Verde', 
              origin: 'Italia', 
              price: '2.20', 
              unit: 'kg', 
              available: true,
              image: '/images/products/cavolfiore-verde.jpeg',
              description: 'Cavolfiore Nero: gusto delicato e versatilità in cucina. Con la sua infiorescenza compatta e il colore chiaro, il cavolfiore è un ortaggio invernale apprezzato per il sapore morbido e leggermente dolce. Perfetto per contorni, vellutate, gratin, primi piatti e preparazioni al forno, è ricco di vitamine, fibre e sali minerali, ideale per un\'alimentazione sana ed equilibrata. Cavolfiore: semplicità, genuinità e benessere direttamente dall\'orto alla tua tavola.'
            },
            {
              id: 32, 
              name: 'Cavolfiore viola', 
              origin: 'Italia', 
              price: '1.60', 
              unit: 'kg', 
              available: true,
              image: '/images/products/cavolfiore-viola.jpg',
              description: 'Cavolfiore Viola: gusto delicato e versatilità in cucina. Con la sua infiorescenza compatta e il colore viola, il cavolfiore è un ortaggio invernale apprezzato per il sapore morbido e leggermente dolce. Perfetto per contorni, vellutate, gratin, primi piatti e preparazioni al forno, è ricco di vitamine, fibre e sali minerali, ideale per un\'alimentazione sana ed equilibrata. Cavolfiore: semplicità, genuinità e benessere direttamente dall\'orto alla tua tavola.'
            },
            {
              id: 33,
              name: 'Cavolo Romano',
              origin: 'Italia',
              price: '2.20',
              unit: 'kg',
              available: true,
              image: '/images/products/cavolo-romano.jpg',
              description: 'Cavolo Romano: gusto delicato e versatilità in cucina. Con la sua infiorescenza compatta e il colore verde intenso, il cavolo romano è un ortaggio invernale apprezzato per il sapore morbido e leggermente dolce. Perfetto per contorni, vellutate, gratin, primi piatti e preparazioni al forno, è ricco di vitamine, fibre e sali minerali, ideale per un\'alimentazione sana ed equilibrata. Cavolo Romano: semplicità, genuinità e benessere direttamente dall\'orto alla tua tavola.'
            },
            { 
              id: 34, 
              name: 'Cavolini di Bruxelles', 
              origin: 'Italia', 
              price: '2.20', 
              unit: 'kg', 
              available: true,
              image: '/images/products/cavolini di bruxelles1.jpg',
              description: 'Cavolini di Bruxelles: cavolini di Bruxelles sono piccoli ortaggi dal colore verde brillante e dalla consistenza compatta, dal sapore delicato con una leggera nota amarognola. Ottimi saltati in padella, al forno o lessati, sono ideali come contorno o ingrediente per piatti invernali. Ricchi di fibre, vitamine e sali minerali, i cavolini di Bruxelles freschi e di stagione garantiscono qualità e genuinità direttamente dal campo al tuo banco.'
            },
            { 
              id: 35, 
              name: 'Cime di Rapa', 
              origin: 'Puglia', 
              price: '2.90', 
              unit: 'kg', 
              available: true,
              image: '/images/products/cime-di-rapa.jpeg',
              description: 'Cime di Rapa: gusto intenso e tradizione mediterranea. Con le loro foglie verdi, le infiorescenze tenere e il sapore leggermente amarognolo, le cime di rapa sono un ortaggio tipico della cucina del Sud Italia. Ideali per primi piatti, contorni e ricette tradizionali come orecchiette e zuppe, sono ricche di vitamine, fibre e sali minerali, perfette per un\'alimentazione sana e ricca di sapore. Cime di Rapa: carattere deciso, freschezza e genuinità direttamente dall\'orto alla tua tavola.'
            },
            { 
              id: 36, 
              name: 'Cavolo Cappuccio', 
              origin: 'Italia', 
              price: '1.60', 
              unit: 'kg', 
              available: true,
              image: '/images/products/cavolo-cappuccio.jpg',
              description: 'Il cavolo cappuccio è un ortaggio fresco di stagione, riconoscibile per la sua forma compatta e le foglie croccanti. Dal sapore delicato e leggermente dolce, è ideale sia per il consumo a crudo in insalata sia per la cottura in zuppe, contorni e piatti tradizionali. Ricco di fibre e naturalmente povero di calorie, è molto apprezzato per la sua versatilità in cucina e la buona conservabilità. Prodotto genuino, adatto all\'uso domestico e professionale.'
            },
            { 
              id: 37, 
              name: 'Finocchi', 
              origin: 'Italia', 
              price: '2.40', 
              unit: 'kg', 
              available: true,
              image: '/images/products/finocchi.jpg',
              description: 'Il finocchio è un ortaggio fresco e profumato, caratterizzato da un grumolo bianco e croccante e da un sapore delicato e aromatico. Ottimo da consumare crudo in insalata o pinzimonio, è ideale anche cotto in gratin, contorni e piatti leggeri. Ricco di fibre e naturalmente digeribile, il finocchio fresco e di stagione garantisce qualità e genuinità direttamente dal campo al tuo banco.'
            },
            { 
              id: 38, 
              name: 'Spinaci', 
              origin: 'Italia', 
              price: '2.40', 
              unit: 'kg', 
              available: true,
              image: '/images/products/spinaci.jpg',
              description: 'Gli spinaci sono verdure a foglia verde scuro, fresche e tenere, dal sapore delicato e leggermente erbaceo. Ideali sia crudi in insalata che cotti in zuppe, frittate o contorni, sono ricchi di vitamine, ferro e fibre, perfetti per una dieta sana ed equilibrata. Freschi e di stagione, gli spinaci del nostro banco garantiscono qualità e genuinità direttamente dalla terra alla tua tavola.'
            },
            { 
              id: 39, 
              name: 'Erbette', 
              origin: 'Italia', 
              price: '2.30', 
              unit: 'kg', 
              available: true,
              image: '/images/products/erbette.jpg',
              description: 'Le erbette sono verdure a foglia verde tenera, dal sapore delicato e leggermente dolce. Molto versatili in cucina, sono ideali per contorni, zuppe, ripieni, frittate e torte salate. Ricche di fibre, vitamine e sali minerali, le erbette fresche e di stagione garantiscono qualità e genuinità direttamente dal campo al tuo banco.'
            },
            { 
              id: 40, 
              name: 'Catalogna', 
              origin: 'Italia', 
              price: '2.50', 
              unit: 'kg', 
              available: true,
              image: '/images/products/catalogna.jpg',
              description: 'La catalogna è una verdura a foglia verde dal gusto deciso e leggermente amarognolo. Apprezzata sia cruda in insalata, soprattutto i germogli, sia cotta in contorni, zuppe e piatti tradizionali, è molto versatile in cucina. Ricca di fibre e sali minerali, la catalogna fresca e di stagione garantisce qualità e genuinità direttamente dal campo al tuo banco.'
            },
            { 
              id: 41, 
              name: 'Coste', 
              origin: 'Italia', 
              price: '2.20', 
              unit: 'kg', 
              available: true,
              image: '/images/products/coste.jpg',
              description: 'Le bietole sono coste a foglia verde dal gusto delicato e leggermente dolce, apprezzate sia crude in insalata sia cotte in zuppe, torte salate o contorni. Ricche di fibre, vitamine e sali minerali, le coste sono un alleato naturale per una dieta sana ed equilibrata. Fresche e di stagione, garantiscono qualità e genuinità direttamente dal campo alla tua tavola.'
            },
            { 
              id: 42, 
              name: 'Radicchio', 
              origin: 'Veneto', 
              price: '3.20', 
              unit: 'kg', 
              available: true,
              image: '/images/products/radicchio.jpg',
              description: 'Il radicchio è una verdura dal colore rosso intenso e dalle foglie croccanti, dal gusto leggermente amarognolo e aromatico. Perfetto da gustare crudo in insalate o grigliato, saltato in padella o nelle ricette tipiche della cucina italiana, aggiunge colore e sapore a ogni piatto. Ricco di fibre e antiossidanti, il radicchio fresco e di stagione è sinonimo di qualità e genuinità direttamente dal produttore al tuo banco.'
            },
            {
              id: 43, 
              name: 'Trevisana',
              origin: 'Italia',
              price: '2.50',
              unit: 'kg',
              available: true,
              image: '/images/products/trevisana.jpg',
              description: 'Trevisana: radicchio pregiato con colore rosso intenso e venature bianche, dal gusto leggermente amarognolo e aromatico. Croccante e saporita, ideale da consumare cruda in insalata oppure cotta alla griglia, in padella o nei risotti. Ricca di fibre e antiossidanti, la Trevisana fresca e di stagione garantisce qualità e genuinità direttamente dal campo al tuo banco. '
            },
            { 
              id: 44, 
              name: 'Lattuga Iceberg', 
              origin: 'Italia', 
              price: '1.80', 
              unit: 'kg', 
              available: true,
              image: '/images/products/iceberg.jpg',
              description: 'La lattuga iceberg è caratterizzata da una testa compatta e foglie croccanti di colore verde chiaro, dal sapore fresco e delicato. Perfetta per insalate croccanti, panini e piatti veloci, aggiunge leggerezza e freschezza a ogni preparazione. Ricca di acqua e fibre, è ideale per chi cerca un ortaggio sano, fresco e di stagione.'
            },
            { 
              id: 45, 
              name: 'Lattuga Romana', 
              origin: 'Italia', 
              price: '2.00', 
              unit: 'kg', 
              available: true,
              image: '/images/products/lattuga-romana.jpg',
              description: 'La lattuga romana è caratterizzata da foglie lunghe e croccanti, di colore verde brillante e dal sapore fresco e delicato. Ideale per insalate classiche, contorni leggeri e piatti freschi, è molto apprezzata per la sua consistenza e versatilità. Ricca di acqua e fibre, la lattuga romana fresca e di stagione garantisce qualità e genuinità direttamente dal campo al tuo banco.'
            },
            { 
              id: 46, 
              name: 'Lattuga Gentilina', 
              origin: 'Italia', 
              price: '1.90', 
              unit: 'kg', 
              available: true,
              image: '/images/products/lattuga-gentilina.jpg',
              description: 'La lattuga gentilina è una varietà dal colore verde intenso e dalle foglie morbide e leggermente croccanti. Dal sapore delicato e fresco, è perfetta per insalate, panini e contorni leggeri. Ricca di acqua e fibre, è ideale per chi cerca un ortaggio sano, fresco e di stagione, pronto da gustare in ogni occasione.'
            },
            { 
              id: 47, 
              name: 'Scarola', 
              origin: 'Italia', 
              price: '2.10', 
              unit: 'kg', 
              available: true,
              image: '/images/products/scarola.jpg',
              description: 'La scarola è un\'insalata a foglia larga e croccante, dal sapore delicato con una leggera nota amarognola. Ottima sia cruda in insalata sia cotta in contorni, zuppe e ricette tradizionali, è molto apprezzata per la sua versatilità in cucina. Ricca di fibre e acqua, la scarola fresca e di stagione garantisce qualità e genuinità direttamente dal campo al tuo banco.'
            },
            { 
              id: 48, 
              name: 'Barbabietole', 
              origin: 'Italia', 
              price: '2.99', 
              unit: 'kg', 
              available: true,
              image: '/images/products/barbabietole.jpg',
              description: 'Le barbabietole sono ortaggi dalla polpa dolce e dal colore rosso intenso, con radice tondeggiante e foglie verdi nutrienti. Perfette cotte, al forno, in zuppe o insalate, aggiungono colore e gusto a ogni piatto. Ricche di vitamine, sali minerali e fibre, le barbabietole fresche e di stagione garantiscono qualità e genuinità direttamente dal campo al tuo banco.'
            },
            {
              id: 49, 
              name: 'Zucca',
              origin: 'Italia',
              price: '2.20',
              unit: 'kg',
              available: true,
              image: '/images/products/zucca.jpeg',
              description: 'La zucca è un ortaggio dal colore arancione intenso e dalla polpa dolce e carnosa. Versatile in cucina, è ideale per zuppe, vellutate, torte salate, dolci e contorni, donando sapore e colore a ogni piatto. Ricca di vitamine, fibre e antiossidanti, la zucca fresca e di stagione garantisce qualità e genuinità direttamente dal produttore al tuo banco.'
            },  
            { 
              id: 50, 
              name: 'Carote', 
              origin: 'Italia', 
              price: '2.20', 
              unit: 'kg', 
              available: true,
              image: '/images/products/carote.jpg',
              description: 'Le carote sono ortaggi croccanti e dolci, dal caratteristico colore arancione brillante. Perfette da consumare crude in insalata, frullati o snack, e ottime cotte in zuppe, contorni e ricette tradizionali. Ricche di vitamine, in particolare vitamina A, e fibre, le carote fresche e di stagione garantiscono gusto, salute e genuinità direttamente dal campo al tuo banco.'
            },
            { 
              id: 51, 
              name: 'Carote Pacchetto', 
              origin: 'Italia', 
              price: '2.20', 
              unit: 'pz', 
              available: true,
              image: '/images/products/carote pacchetto.jpg',
              description: 'Carote Pacchetto: carote fresche e croccanti, dal caratteristico colore arancione brillante. Perfette da consumare crude in insalata, frullati o snack, e ottime cotte in zuppe, contorni e ricette tradizionali. Ricche di vitamine, in particolare vitamina A, e fibre, le carote fresche e di stagione garantiscono gusto, salute e genuinità direttamente dal campo al tuo banco.'
            },
            { 
              id: 52, 
              name: 'Carote Sfuse', 
              origin: 'Italia', 
              price: '2.20', 
              unit: 'kg', 
              available: true,
              image: '/images/products/Carote sfuse.jpg',
              description: 'Carote Sfuse: carote fresche e croccanti, dal caratteristico colore arancione brillante. Perfette da consumare crude in insalata, frullati o snack, e ottime cotte in zuppe, contorni e ricette tradizionali. Ricche di vitamine, in particolare vitamina A, e fibre, le carote fresche e di stagione garantiscono gusto, salute e genuinità direttamente dal campo al tuo banco.'
            },
            { 
              id: 53, 
              name: 'Patate Rosse', 
              origin: 'Italia', 
              price: '1.80', 
              unit: 'kg', 
              available: true,
              image: '/images/products/patate-rosse.jpg',
              description: 'Le patate rosse sono ortaggi dalla buccia sottile e dal colore rosso intenso, con polpa compatta e dal sapore delicato. Ideali per arrosti, bolliti, gratinati o fritte, mantengono bene la forma in cottura e regalano un gusto dolce e uniforme ai piatti. Ricche di fibre e nutrienti, le patate rosse fresche e di stagione sono sinonimo di qualità e genuinità direttamente dal produttore al tuo banco.'
            },
            {
              id: 54,
              name: 'Patate Bianche',
              origin: 'Italia',
              price: '2.20',
              unit: 'kg',
              available: true,
              image: '/images/products/patata-bianca.jpg',
              description: 'Patate Bianche: patate fresche e croccanti, dal caratteristico colore arancione brillante. Perfette da consumare crude in insalata, frullati o snack, e ottime cotte in zuppe, contorni e ricette tradizionali. Ricche di vitamine, in particolare vitamina A, e fibre, le patate fresche e di stagione garantiscono gusto, salute e genuinità direttamente dal campo al tuo banco.'
            },
            { 
              id: 55, 
              name: 'Patate Gialle', 
              origin: 'Italia', 
              price: '1.60', 
              unit: 'kg', 
              available: true,
              image: '/images/products/patate-gialle.jpg',
              description: 'Le patate gialle hanno una buccia sottile e una polpa dal colore dorato, dal gusto dolce e leggermente burroso. Perfette per arrosti, purè, gratin e cotture al forno, si prestano a molte preparazioni grazie alla loro consistenza cremosa. Ricche di fibre e nutrienti, le patate gialle fresche e di stagione garantiscono qualità e genuinità direttamente dal campo al tuo banco.'
            },
            {
              id: 56,
              name: 'Patate Sacchetto',
              origin: 'Italia',
              price: '2.20',
              unit: 'kg',
              available: true,
              image: '/images/products/patate-sacchetto.jpeg',
              description: 'Patate Sacchetto: patate fresche e croccanti, dal caratteristico colore arancione brillante. Perfette da consumare crude in insalata, frullati o snack, e ottime cotte in zuppe, contorni e ricette tradizionali. Ricche di vitamine, in particolare vitamina A, e fibre, le patate fresche e di stagione garantiscono gusto, salute e genuinità direttamente dal campo al tuo banco.'
            },
            { 
              id: 57, 
              name: 'Porri', 
              origin: 'Italia', 
              price: '2.60', 
              unit: 'kg', 
              available: true,
              image: '/images/products/porri.jpg',
              description: 'I porri sono ortaggi dal gambo lungo e bianco e dalle foglie verdi tenere, dal sapore delicato e leggermente dolce. Ideali per zuppe, minestre, frittate e contorni, conferiscono aroma e leggerezza a ogni preparazione. Ricchi di vitamine e minerali, i porri freschi e di stagione sono sinonimo di qualità e genuinità direttamente dal campo al tuo banco.'
            },
            { 
              id: 58, 
              name: 'Aglio', 
              origin: 'Italia', 
              price: '6.00', 
              unit: 'kg', 
              available: true,
              image: '/images/products/aglio.jpg',
              description: 'L\'aglio è un bulbo aromatico, essenziale in cucina per insaporire ogni piatto con il suo gusto deciso e inconfondibile. Fresco e profumato, può essere utilizzato crudo, tritato o cotto, aggiungendo aroma a sughi, salse, zuppe e contorni. Ricco di proprietà benefiche per l\'organismo, l\'aglio fresco e di stagione garantisce qualità e genuinità direttamente dal produttore al tuo banco.'
            },
            { 
              id: 59, 
              name: 'Sedano', 
              origin: 'Italia', 
              price: '2.00', 
              unit: 'kg', 
              available: true,
              image: '/images/products/sedano.jpg',
              description: 'Il sedano è un ortaggio fresco e croccante, dal sapore aromatico e leggermente salato. Ideale da consumare crudo in pinzimonio o insalata, è perfetto anche come base per soffritti, zuppe e brodi. Ricco di acqua, fibre e sali minerali, il sedano fresco e di stagione garantisce qualità e genuinità direttamente dal campo al tuo banco.'
            },
            {
              id: 60, 
              name: 'Carciofi Sardi',
              origin: 'Italia',
              price: '0.75',
              unit: 'pz',
              available: true,
              image: '/images/products/carciofi sardi ritratto.jpeg',
              description: 'Carciofi Sardi: carciofi dal colore verde intenso e dalle foglie croccanti, dal gusto delicato e leggermente amarognolo. Ottima per insalate, panini e contorni leggeri, aggiunge leggerezza e freschezza a ogni preparazione. Ricca di fibre e acqua, la carciofi sardi fresca e di stagione garantisce qualità e genuinità direttamente dal campo al tuo banco.'
            },
            {
              id: 61, 
              name: 'Mammole',
              origin: 'Italia',
              price: '2.20',
              unit: 'kg',
              available: true,
              image: '/images/products/mammole.jpg',
              description: 'Le mammole sono carciofi dalla forma tondeggiante, privi di spine, con foglie tenere e sapore delicato. Ideali da consumare sia crude in insalata sia cotte in padella, al forno o nelle ricette tradizionali, sono molto apprezzate per la loro versatilità e morbidezza. Ricche di fibre e sali minerali, le mammole fresche e di stagione garantiscono qualità e genuinità direttamente dal campo al tuo banco.'
            }
          ]
        }
      ]
    },
    {
      id: 'primavera',
      nome: 'Primavera',
      icon: '🌸',
      mesi: 'Marzo - Maggio',
      sottocategorie: [
        {
          id: 'frutta-primavera',
          nome: 'Frutta Primaverile',
          icon: '🍓',
          prodotti: [
            { 
              id: 1, 
              name: 'Melinda Golden Delicious', 
              origin: 'Trentino', 
              price: '2.40', 
              unit: 'kg', 
              available: true,
              image: '/images/products/melinda-golden.jpg',
              description: 'Melinda Golden Delicious è la mela che conquista per la sua dolcezza equilibrata e la sua inconfondibile croccantezza. Coltivata nel cuore delle valli del Trentino, cresce in un ambiente naturale unico che le conferisce qualità superiori e un gusto delicato ma ricco. La buccia giallo dorata racchiude una polpa succosa, fragrante e naturalmente dolce, perfetta da gustare fresca in ogni momento della giornata. Versatile in cucina, è ideale anche per dolci, dessert, macedonie e preparazioni al forno, grazie alla sua capacità di mantenere consistenza e sapore. Sana, genuina e certificata, Melinda Golden Delicious è una mela che unisce tradizione, territorio e qualità, portando sulla tua tavola il meglio della natura.'
            },
            { 
              id: 3, 
              name: 'Renetta', 
              origin: 'Italia', 
              price: '2.20', 
              unit: 'kg', 
              available: true,
              image: '/images/products/renetta.jpg',
              description: 'Mela Renetta: un classico della tradizione italiana, dal sapore equilibrato tra dolce e acidulo e dalla polpa compatta e profumata. La buccia sottile e leggermente dorata racchiude un frutto versatile, ideale sia da gustare fresco che per preparazioni in cucina, come dolci, torte e composte, dove mantiene consistenza e aroma. Ricca di nutrienti e antiossidanti naturali, la Renetta unisce gusto, genuinità e tradizione, portando sulla tua tavola un frutto autentico e di alta qualità. Renetta: sapore classico, polpa soda e aroma inconfondibile, perfetta in ogni occasione.'
            },
            { 
              id: 5, 
              name: 'Fuji', 
              origin: 'Italia', 
              price: '2.50', 
              unit: 'kg', 
              available: true,
              image: '/images/products/fuji.jpg',
              description: 'Mela Fuji: dolcezza intensa e croccantezza in ogni morso. Con la sua polpa soda, succosa e aromaticamente zuccherina, la Fuji è una delle mele più amate per il gusto deciso e persistente. La buccia, liscia e dai toni rosso sfumato con giallo, nasconde un frutto versatile, ideale sia da consumare fresco che in insalate, dolci, dessert o preparazioni al forno. Ricca di vitamine e antiossidanti naturali, la Fuji è perfetta per chi cerca un frutto sano, gustoso e adatto a tutta la famiglia. Fuji: croccante, dolce e irresistibile, la mela che rende ogni momento speciale.'
            },
            { 
              id: 7, 
              name: 'Granny Smith', 
              origin: 'Italia', 
              price: '2.40', 
              unit: 'kg', 
              available: true,
              image: '/images/products/granny-smith.jpg',
              description: 'Granny Smith: la mela dal gusto fresco, acidulo e vivace, dal caratteristico colore verde brillante. La sua polpa croccante e succosa offre un equilibrio perfetto tra acidità e dolcezza naturale, rendendola ideale da gustare fresca, in insalate, dessert o preparazioni al forno. Ricca di vitamine e antiossidanti, la Granny Smith è perfetta per chi cerca un frutto sano, rinfrescante e dal sapore deciso, capace di dare carattere a ogni piatto. Granny Smith: freschezza, croccantezza e gusto inconfondibile in ogni morso.'
            },
            { 
              id: 11, 
              name: 'Kaiser', 
              origin: 'Italia', 
              price: '2.60', 
              unit: 'kg', 
              available: true,
              image: '/images/products/pera-kaiser.jpg',
              description: 'Pera Kaiser: dolcezza delicata e polpa croccante in ogni morso. La sua buccia liscia, dal verde chiaro leggermente sfumato di rosso, nasconde un frutto versatile e saporito, ideale da gustare fresco o in preparazioni al forno, dolci e macedonie. Ricca di vitamine e antiossidanti naturali, la Kaiser unisce gusto e qualità, rendendola perfetta per chi cerca un frutto sano, genuino e dal sapore equilibrato. Kaiser: croccantezza, dolcezza e freschezza in ogni morso.'
            },
            { 
              id: 12, 
              name: 'Decana', 
              origin: 'Italia', 
              price: '2.50', 
              unit: 'kg', 
              available: true,
              image: '/images/products/decana.jpg',
              description: 'Pera Decana: dolcezza intensa e polpa succosa in ogni morso. La sua forma rotonda e compatta, con buccia liscia dal colore giallo-verde, racchiude un frutto dal sapore equilibrato e aromatico. Perfetta da gustare fresca, in macedonie o dessert, mantiene consistenza e gusto anche nelle preparazioni al forno. Ricca di vitamine, fibre e antiossidanti naturali, la Decana è un frutto sano, genuino e versatile, ideale per tutta la famiglia. Decana: dolcezza, morbidezza e aroma inconfondibile, un classico della frutta italiana.'
            },
            { 
              id: 13, 
              name: 'Kiwi Giallo', 
              origin: 'Italia', 
              price: '4.20', 
              unit: 'kg', 
              available: true,
              image: '/images/products/kiwi-giallo.jpg',
              description: 'Kiwi Giallo: dolcezza esotica e polpa morbida in ogni morso. Con il suo colore dorato brillante e il sapore naturalmente zuccherino, il kiwi giallo è perfetto da gustare fresco, in macedonie, smoothie o dessert. Ricco di vitamine, in particolare vitamina C, minerali e antiossidanti naturali, è un frutto sano, nutriente e ideale per chi cerca freschezza e energia in ogni momento della giornata. Kiwi Giallo: gusto dolce, polpa succosa e vitalità naturale, direttamente dalla natura alla tua tavola.'
            },
            { 
              id: 14, 
              name: 'Kiwi Verde', 
              origin: 'Italia', 
              price: '3.20', 
              unit: 'kg', 
              available: true,
              image: '/images/products/kiwi-verde.jpg',
              description: 'Kiwi Verde: freschezza e sapore inconfondibili in ogni morso. Con la sua polpa verde brillante, succosa e leggermente acidula, il kiwi verde è perfetto da gustare fresco, in macedonie, smoothie o dessert. Ricco di vitamina C, fibre e antiossidanti naturali, è un frutto sano e nutriente, ideale per chi cerca energia e vitalità in modo naturale. Kiwi Verde: gusto deciso, freschezza e benessere direttamente dalla natura alla tua tavola.'
            },

              { 
              id: 62, 
              name: 'Fragole', 
              origin: 'Italia', 
              price: '3.50', 
              unit: 'pz', 
              available: true,
              image: '/images/products/Fragole.jpg',
              description: 'Fragole italiane profumate e dolcissime, coltivate con cura. Il loro colore rosso brillante e il profumo intenso le rendono irresistibili. Perfette da gustare al naturale, con panna, o per preparare dolci e macedonie. Ricche di vitamina C e antiossidanti, sono un concentrato di benessere e gusto.'
            },
            { 
              id: 63, 
              name: 'Ciliegie', 
              origin: 'Puglia', 
              price: '6.50', 
              unit: 'kg', 
              available: true,
              image: '/images/products/ciliegie.jpg',
              description: 'Ciliegie pugliesi dolci e carnose, dal colore rosso intenso. La polpa succosa e il sapore dolce le rendono perfette per uno spuntino goloso. Ottime anche per preparare marmellate o conserve.'
            },
            { 
              id: 64, 
              name: 'Nespole', 
              origin: 'Sicilia', 
              price: '3.20', 
              unit: 'kg', 
              available: true,
              image: '/images/products/nespole.jpg',
              description: 'Nespole siciliane dal sapore dolce e delicato. La polpa arancione e succosa è ricca di vitamine e minerali. Perfette da gustare fresche, sono un frutto primaverile unico e genuino.'
            },
            { 
              id: 65, 
              name: 'Albicocche', 
              origin: 'Campania', 
              price: '3.80', 
              unit: 'kg', 
              available: true,
              image: '/images/products/albicocche.jpg',
              description: 'Albicocche campane profumate e vellutate. La buccia arancione nasconde una polpa dolce e succosa, perfetta per marmellate, dolci o da gustare fresca. Ricche di betacarotene, sono un toccasana per la pelle e la vista.'
            },
            { id: 66, 
              name: 'Pesche', 
              origin: 'Emilia Romagna', 
              price: '2.80', 
              unit: 'kg', 
              available: true,
              image: '/images/products/pesche.jpg',
              description: 'Pesche: pesche sono un ortaggio di stagione, dal sapore deciso e profumato. Ideale da consumare crudo in spuntini o insalate, è perfetto anche come base per dolci e dessert. Ricche di fibre e sali minerali, i pesche freschi e di stagione garantisce qualità e genuinità direttamente dal campo al tuo banco.'
            },
            { id: 67, 
              name: 'Pesche Noce',
               origin: 'Emilia Romagna', 
               price: '3.20', 
               unit: 'kg', 
               available: true,
               image: '/images/products/pesca-noce.jpg',
               description: 'Pesca Noce: pesca noce sono un ortaggio di stagione, dal sapore deciso e profumato. Ideale da consumare crudo in spuntini o insalate, è perfetto anche come base per dolci e dessert. Ricche di fibre e sali minerali, i pesca noce freschi e di stagione garantisce qualità e genuinità direttamente dal campo al tuo banco.'
            },
          ]
        },
        {
          id: 'verdura-primavera',
          nome: 'Verdura Primaverile',
          icon: '🌱',
          prodotti: [

            { id: 68, 
              name: 'Asparagi', 
              origin: 'Italia',
              price: '5.50', 
              unit: 'kg', 
              available: true,
              image: '/images/products/asparagi.jpg',
              description: 'Asparagi: asparagi sono un ortaggio di stagione, dal sapore deciso e profumato. Ideale da consumare crudo in spuntini o insalate, è perfetto anche come base per dolci e dessert. Ricche di fibre e sali minerali, i asparagi freschi e di stagione garantisce qualità e genuinità direttamente dal campo al tuo banco.'
            },
           { id: 69, 
            name: 'Lattuga Trocadero', 
            origin: 'Locale', 
            price: '1.50', 
            unit: 'pz', 
            available: true,
            image: '/images/products/lattuga-trocadero.jpg',
            description: 'Lattuga: lattuga sono un ortaggio di stagione, dal sapore deciso e profumato. Ideale da consumare crudo in spuntini o insalate, è perfetto anche come base per dolci e dessert. Ricche di fibre e sali minerali, i lattuga freschi e di stagione garantisce qualità e genuinità direttamente dal campo al tuo banco.'
          },
          { 
            id: 38, 
            name: 'Spinaci', 
            origin: 'Italia', 
            price: '2.40', 
            unit: 'kg', 
            available: true,
            image: '/images/products/spinaci.jpg',
            description: 'Gli spinaci sono verdure a foglia verde scuro, fresche e tenere, dal sapore delicato e leggermente erbaceo. Ideali sia crudi in insalata che cotti in zuppe, frittate o contorni, sono ricchi di vitamine, ferro e fibre, perfetti per una dieta sana ed equilibrata. Freschi e di stagione, gli spinaci del nostro banco garantiscono qualità e genuinità direttamente dalla terra alla tua tavola.'
          },
            { id: 70, 
              name: 'Ravanelli', 
              origin: 'Italia', 
              price: '2.20', 
              unit: 'kg', 
              available: true,
              image: '/images/products/ravanelli.jpg',
              description: 'Ravanelli: ravanelli sono un ortaggio di stagione, dal sapore deciso e profumato. Ideale da consumare crudo in spuntini o insalate, è perfetto anche come base per dolci e dessert. Ricche di fibre e sali minerali, i ravanelli freschi e di stagione garantisce qualità e genuinità direttamente dal campo al tuo banco.'
            },
            { 
              id: 29, 
              name: 'Broccoli', 
              origin: 'Italia', 
              price: '2.50', 
              unit: 'pz', 
              available: true,
              image: '/images/products/broccoli.jpg',
              description: 'Broccoli: gusto deciso e benessere naturale in ogni piatto. Con il loro colore verde intenso e la consistenza compatta, i broccoli sono un ortaggio ricco di proprietà nutritive, apprezzato per il sapore leggermente amarognolo e la grande versatilità in cucina. Ideali per contorni, primi piatti, vellutate e ricette salutari, sono ricchi di vitamine, fibre, sali minerali e antiossidanti naturali, perfetti per un\'alimentazione equilibrata. Broccoli: freschezza, qualità e salute direttamente dall\'orto alla tua tavola.'
            },
            { 
              id: 30, 
              name: 'Cavolfiore Bianco', 
              origin: 'Italia', 
              price: '2.20', 
              unit: 'kg', 
              available: true,
              image: '/images/products/cavolfiore.jpg',
              description: 'Cavolfiore: gusto delicato e versatilità in cucina. Con la sua infiorescenza compatta e il colore chiaro, il cavolfiore è un ortaggio invernale apprezzato per il sapore morbido e leggermente dolce. Perfetto per contorni, vellutate, gratin, primi piatti e preparazioni al forno, è ricco di vitamine, fibre e sali minerali, ideale per un\'alimentazione sana ed equilibrata. Cavolfiore: semplicità, genuinità e benessere direttamente dall\'orto alla tua tavola.'
            },
            { 
              id: 34, 
              name: 'Cavolini di Bruxelles', 
              origin: 'Italia', 
              price: '2.20', 
              unit: 'kg', 
              available: true,
              image: '/images/products/cavolini di bruxelles1.jpg',
              description: 'Cavolini di Bruxelles: cavolini di Bruxelles sono piccoli ortaggi dal colore verde brillante e dalla consistenza compatta, dal sapore delicato con una leggera nota amarognola. Ottimi saltati in padella, al forno o lessati, sono ideali come contorno o ingrediente per piatti invernali. Ricchi di fibre, vitamine e sali minerali, i cavolini di Bruxelles freschi e di stagione garantiscono qualità e genuinità direttamente dal campo al tuo banco.'
            },
            {
              id: 72,
              name: 'Rucola',
              origin: 'Italia',
              price: '2.20',
              unit: 'kg',
              available: true,
              image: '/images/products/rucola.jpg',
              description: 'Rucola: rucola sono un ortaggio di stagione, dal sapore deciso e profumato. Ideale da consumare crudo in spuntini o insalate, è perfetto anche come base per dolci e dessert. Ricche di fibre e sali minerali, i rucola freschi e di stagione garantisce qualità e genuinità direttamente dal campo al tuo banco.'
            },
            {
              id: 73,
              name: 'Cipollotti',
              origin: 'Italia',
              price: '2.20',
              unit: 'kg',
              available: true,
              image: '/images/products/cipollotto.jpg',
              description: 'Cipollotti: cipollotti sono un ortaggio di stagione, dal sapore deciso e profumato. Ideale da consumare crudo in spuntini o insalate, è perfetto anche come base per dolci e dessert. Ricche di fibre e sali minerali, i cipollotti freschi e di stagione garantisce qualità e genuinità direttamente dal campo al tuo banco.'
            },
            {
              id: 74,
              name: 'Piselli',
              origin: 'Italia',
              price: '2.20',
              unit: 'kg',
              available: true,
              image: '/images/products/piselli.jpg',
              description: 'Piselli: piselli sono un ortaggio di stagione, dal sapore deciso e profumato. Ideale da consumare crudo in spuntini o insalate, è perfetto anche come base per dolci e dessert. Ricche di fibre e sali minerali, i piselli freschi e di stagione garantisce qualità e genuinità direttamente dal campo al tuo banco.'
            },
            {
              id: 75,
              name: 'Fave',
              origin: 'Italia',
              price: '2.20',
              unit: 'kg',
              available: true,
              image: '/images/products/fave.jpg',
              description: 'Fave: fave sono un ortaggio di stagione, dal sapore deciso e profumato. Ideale da consumare crudo in spuntini o insalate, è perfetto anche come base per dolci e dessert. Ricche di fibre e sali minerali, i fave freschi e di stagione garantisce qualità e genuinità direttamente dal campo al tuo banco.'
            },
            { id: 94, 
              name: 'Fagiolini', 
              origin: 'Italia', 
              price: '3.50', 
              unit: 'kg', 
              available: true,
              image: '/images/products/cornetti.jpg',
              description: 'Fagiolini: fagiolini è un ortaggio di stagione, dal sapore deciso e profumato. Ideale da consumare crudo in spuntini o insalate, è perfetto anche come base per dolci e dessert. Ricche di fibre e sali minerali, i fagiolini freschi e di stagione garantisce qualità e genuinità direttamente dal campo al tuo banco.'
            },
            {id: 178 ,
              name: 'Piattoni',
              origin: 'Italia',
              price: '2.20',
              unit: 'kg',
              available: true,
              image: '/images/products/piattoni.jpg',
              description: 'Piattoni: piattoni è un ortaggio di stagione, dal sapore deciso e profumato. Ideale da consumare crudo in spuntini o insalate, è perfetto anche come base per dolci e dessert. Ricche di fibre e sali minerali, i piattoni freschi e di stagione garantisce qualità e genuinità direttamente dal campo al tuo banco.'
            },
            {
              id: 61, 
              name: 'Mammole',
              origin: 'Italia',
              price: '2.20',
              unit: 'kg',
              available: true,
              image: '/images/products/mammole.jpg',
              description: 'Le mammole sono carciofi dalla forma tondeggiante, privi di spine, con foglie tenere e sapore delicato. Ideali da consumare sia crude in insalata sia cotte in padella, al forno o nelle ricette tradizionali, sono molto apprezzate per la loro versatilità e morbidezza. Ricche di fibre e sali minerali, le mammole fresche e di stagione garantiscono qualità e genuinità direttamente dal campo al tuo banco.'
            },
            { 
              id: 50, 
              name: 'Carote', 
              origin: 'Italia', 
              price: '2.20', 
              unit: 'kg', 
              available: true,
              image: '/images/products/carote.jpg',
              description: 'Le carote sono ortaggi croccanti e dolci, dal caratteristico colore arancione brillante. Perfette da consumare crude in insalata, frullati o snack, e ottime cotte in zuppe, contorni e ricette tradizionali. Ricche di vitamine, in particolare vitamina A, e fibre, le carote fresche e di stagione garantiscono gusto, salute e genuinità direttamente dal campo al tuo banco.'
            },
            { 
              id: 51, 
              name: 'Carote Pacchetto', 
              origin: 'Italia', 
              price: '2.20', 
              unit: 'pz', 
              available: true,
              image: '/images/products/carote pacchetto.jpg',
              description: 'Carote Pacchetto: carote fresche e croccanti, dal caratteristico colore arancione brillante. Perfette da consumare crude in insalata, frullati o snack, e ottime cotte in zuppe, contorni e ricette tradizionali. Ricche di vitamine, in particolare vitamina A, e fibre, le carote fresche e di stagione garantiscono gusto, salute e genuinità direttamente dal campo al tuo banco.'
            },
            { 
              id: 52, 
              name: 'Carote Sfuse', 
              origin: 'Italia', 
              price: '2.20', 
              unit: 'kg', 
              available: true,
              image: '/images/products/Carote sfuse.jpg',
              description: 'Carote Sfuse: carote fresche e croccanti, dal caratteristico colore arancione brillante. Perfette da consumare crude in insalata, frullati o snack, e ottime cotte in zuppe, contorni e ricette tradizionali. Ricche di vitamine, in particolare vitamina A, e fibre, le carote fresche e di stagione garantiscono gusto, salute e genuinità direttamente dal campo al tuo banco.'
            },
{ 
              id: 53, 
              name: 'Patate Rosse', 
              origin: 'Italia', 
              price: '1.80', 
              unit: 'kg', 
              available: true,
              image: '/images/products/patate-rosse.jpg',
              description: 'Le patate rosse sono ortaggi dalla buccia sottile e dal colore rosso intenso, con polpa compatta e dal sapore delicato. Ideali per arrosti, bolliti, gratinati o fritte, mantengono bene la forma in cottura e regalano un gusto dolce e uniforme ai piatti. Ricche di fibre e nutrienti, le patate rosse fresche e di stagione sono sinonimo di qualità e genuinità direttamente dal produttore al tuo banco.'
            },
            {
              id: 54,
              name: 'Patate Bianche',
              origin: 'Italia',
              price: '2.20',
              unit: 'kg',
              available: true,
              image: '/images/products/patata-bianca.jpg',
              description: 'Patate Bianche: patate fresche e croccanti, dal caratteristico colore arancione brillante. Perfette da consumare crude in insalata, frullati o snack, e ottime cotte in zuppe, contorni e ricette tradizionali. Ricche di vitamine, in particolare vitamina A, e fibre, le patate fresche e di stagione garantiscono gusto, salute e genuinità direttamente dal campo al tuo banco.'
            },
            { 
              id: 55, 
              name: 'Patate Gialle', 
              origin: 'Italia', 
              price: '1.60', 
              unit: 'kg', 
              available: true,
              image: '/images/products/patate-gialle.jpg',
              description: 'Le patate gialle hanno una buccia sottile e una polpa dal colore dorato, dal gusto dolce e leggermente burroso. Perfette per arrosti, purè, gratin e cotture al forno, si prestano a molte preparazioni grazie alla loro consistenza cremosa. Ricche di fibre e nutrienti, le patate gialle fresche e di stagione garantiscono qualità e genuinità direttamente dal campo al tuo banco.'
            },
            {
              id: 56,
              name: 'Patate Sacchetto',
              origin: 'Italia',
              price: '2.20',
              unit: 'kg',
              available: true,
              image: '/images/products/patate-sacchetto.jpeg',
              description: 'Patate Sacchetto: patate fresche e croccanti, dal caratteristico colore arancione brillante. Perfette da consumare crude in insalata, frullati o snack, e ottime cotte in zuppe, contorni e ricette tradizionali. Ricche di vitamine, in particolare vitamina A, e fibre, le patate fresche e di stagione garantiscono gusto, salute e genuinità direttamente dal campo al tuo banco.'
            },
          ]
        }
      ]
    },
    {
      id: 'estate',
      nome: 'Estate',
      icon: '☀️',
      mesi: 'Giugno - Agosto',
      sottocategorie: [
        {
          id: 'frutta-estate',
          nome: 'Frutta Estiva',
          icon: '🍉',
          prodotti: [
            { 
              id: 76, 
              name: 'Williams', 
              origin: 'Italia', 
              price: '2.70', 
              unit: 'kg', 
              available: true,
              image: '/images/products/williams.jpg',
              description: 'Pera Williams: il simbolo della dolcezza e della succosità. Con la sua polpa morbida, succosa e profumata e la buccia sottile di colore verde-giallo, talvolta sfumata di rosso, la Williams è perfetta da gustare fresca, in macedonie, dolci o preparazioni al forno. Ricca di vitamine, fibre e antiossidanti naturali, è un frutto sano, genuino e versatile, ideale per tutta la famiglia. Williams: dolcezza naturale e profumo intenso in ogni morso.'
            },
            { 
              id: 181, 
              name: 'Coscia', 
              origin: 'Italia', 
              price: '2.70', 
              unit: 'kg', 
              available: true,
              image: '/images/products/Coscia.jpg',
              description: 'Coscia: coscia è un frutto di stagione, dal sapore deciso e profumato. Ideale da consumare crudo in spuntini o insalate, è perfetto anche come base per dolci e dessert. Ricche di fibre e sali minerali, i coscia freschi e di stagione garantisce qualità e genuinità direttamente dal campo al tuo banco.'
            },
            { id:77, 
              name: 'Anguria', 
              origin: 'Italia',
              price: '1.20', 
              unit: 'kg', 
              available: true,
              image: '/images/products/anguria.jpg',
              description: 'Angurie: angurie sono un ortaggio di stagione, dal sapore deciso e profumato. Ideale da consumare crudo in spuntini o insalate, è perfetto anche come base per dolci e dessert. Ricche di fibre e sali minerali, i angurie freschi e di stagione garantisce qualità e genuinità direttamente dal campo al tuo banco.'
            },
            { id: 78, 
              name: 'Melone Liscio', 
              origin: 'Italia', 
              price: '1.80', 
              unit: 'kg', 
              available: true,
              image: '/images/products/melone-liscio.jpg',
              description: 'Melone Lisci: melone lisci sono un melone di stagione, dal sapore deciso e profumato. Ideale da consumare crudo in spuntini o insalate, è perfetto anche come base per dolci e dessert. Ricche di fibre e sali minerali, i melone lisci freschi e di stagione garantisce qualità e genuinità direttamente dal campo al tuo banco.'
            },
            {id:79,
              name: 'Melone Retato',
              origin: 'Italia',
              price: '1.80',
              unit: 'kg',
              available: true,
              image: '/images/products/melone retato.jpg',
              description: 'Melone Retato: melone retato sono un melone di stagione, dal sapore deciso e profumato. Ideale da consumare crudo in spuntini o insalate, è perfetto anche come base per dolci e dessert. Ricche di fibre e sali minerali, i melone retato freschi e di stagione garantisce qualità e genuinità direttamente dal campo al tuo banco.'
            },
            {
              id: 63,
              name: 'Ciliegie',
              origin: 'Emilia Romagna',
              price: '3.20',
              unit: 'kg',
              available: true,
              image: '/images/products/ciliegie.jpg',
              description: 'Ciliegie: ciliegie sono un frutto di stagione, dal sapore deciso e profumato. Ideale da consumare crudo in spuntini o insalate, è perfetto anche come base per dolci e dessert. Ricche di fibre e sali minerali, i ciliegie freschi e di stagione garantisce qualità e genuinità direttamente dal campo al tuo banco.'
            },
            {
              id: 80,
              name: 'Mirtilli',
              origin: 'Emilia Romagna',
              price: '3.20',
              unit: 'kg',
              available: true,
              image: '/images/products/mirtilli.jpg',
              description: 'Mirtilli: mirtilli sono un frutto di stagione, dal sapore deciso e profumato. Ideale da consumare crudo in spuntini o insalate, è perfetto anche come base per dolci e dessert. Ricche di fibre e sali minerali, i mirtilli freschi e di stagione garantisce qualità e genuinità direttamente dal campo al tuo banco.'
            },
            {
              id: 81,
              name: 'More',
              origin: 'Emilia Romagna',
              price: '3.20',
              unit: 'kg',
              available: true,
              image: '/images/products/more.jpg',
              description: 'More: more sono un frutto di stagione, dal sapore deciso e profumato. Ideale da consumare crudo in spuntini o insalate, è perfetto anche come base per dolci e dessert. Ricche di fibre e sali minerali, i more freschi e di stagione garantisce qualità e genuinità direttamente dal campo al tuo banco.'
            },
            {
              id: 82,
              name: 'Lamponi',
              origin: 'Emilia Romagna',
              price: '3.20',
              unit: 'kg',
              available: true,
              image: '/images/products/lamponi.jpg',
              description: 'Lamponi: lamponi sono un frutto di stagione, dal sapore deciso e profumato. Ideale da consumare crudo in spuntini o insalate, è perfetto anche come base per dolci e dessert. Ricche di fibre e sali minerali, i lamponi freschi e di stagione garantisce qualità e genuinità direttamente dal campo al tuo banco.'
            },
            { id: 66, 
              name: 'Pesche', 
              origin: 'Emilia Romagna', 
              price: '2.80', 
              unit: 'kg', 
              available: true,
              image: '/images/products/pesche.jpg',
              description: 'Pesche: pesche sono un ortaggio di stagione, dal sapore deciso e profumato. Ideale da consumare crudo in spuntini o insalate, è perfetto anche come base per dolci e dessert. Ricche di fibre e sali minerali, i pesche freschi e di stagione garantisce qualità e genuinità direttamente dal campo al tuo banco.'
            },
            { id: 67, 
              name: 'Pesche Noce',
               origin: 'Emilia Romagna', 
               price: '3.20', 
               unit: 'kg', 
               available: true,
               image: '/images/products/pesca-noce.jpg',
               description: 'Pesca Noce: pesca noce sono un ortaggio di stagione, dal sapore deciso e profumato. Ideale da consumare crudo in spuntini o insalate, è perfetto anche come base per dolci e dessert. Ricche di fibre e sali minerali, i pesca noce freschi e di stagione garantisce qualità e genuinità direttamente dal campo al tuo banco.'
            },
            { id: 83,
              name: 'Pesca Noce Bianca',
              origin: 'Emilia Romagna',
              price: '3.20',
              unit: 'kg',
              available: true,
              image: '/images/products/pesca-noce-bianca.jpg',
              description: 'Pesca Noce Bianca: pesca noce bianca sono un ortaggio di stagione, dal sapore deciso e profumato. Ideale da consumare crudo in spuntini o insalate, è perfetto anche come base per dolci e dessert. Ricche di fibre e sali minerali, i pesca noce bianca freschi e di stagione garantisce qualità e genuinità direttamente dal campo al tuo banco.'
            },
            { id: 182,
              name: 'Tabacchiera',
              origin: 'Emilia Romagna',
              price: '3.20',
              unit: 'kg',
              available: true,
              image: '/images/products/tabacchiera.jpg',
              description: 'Pesca Noce Bianca: pesca noce bianca sono un ortaggio di stagione, dal sapore deciso e profumato. Ideale da consumare crudo in spuntini o insalate, è perfetto anche come base per dolci e dessert. Ricche di fibre e sali minerali, i pesca noce bianca freschi e di stagione garantisce qualità e genuinità direttamente dal campo al tuo banco.'
            },
            { id: 65, 
              name: 'Albicocche', 
              origin: 'Campania', 
              price: '3.50', 
              unit: 'kg', 
              available: true,
              image: '/images/products/albicocche.jpg',
              description: 'Albicocche: albicocche sono un ortaggio di stagione, dal sapore deciso e profumato. Ideale da consumare crudo in spuntini o insalate, è perfetto anche come base per dolci e dessert. Ricche di fibre e sali minerali, i albicocche freschi e di stagione garantisce qualità e genuinità direttamente dal campo al tuo banco.'
            },
            {
              id: 84,
              name: 'Uva Senza Semi Bianca',
              origin: 'Puglia',
              price: '3.50', 
              unit: 'kg', 
              available: true,
              image: '/images/products/uva-bianca-senza-semi.jpg',
              description: 'Uva Senza Semi Bianca: uva è un frutto di stagione, dal sapore deciso e profumato. Ideale da consumare crudo in spuntini o insalate, è perfetto anche come base per dolci e dessert. Ricche di fibre e sali minerali, i uva freschi e di stagione garantisce qualità e genuinità direttamente dal campo al tuo banco.'
             },
            {id: 85,
              name: 'Fico',
              origin: 'Italia',
              price: '3.50',
              unit: 'kg', 
              available: true,
              image: '/images/products/fico.jpg',
              description: 'Fico: fico è un frutto di stagione, dal sapore deciso e profumato. Ideale da consumare crudo in spuntini o insalate, è perfetto anche come base per dolci e dessert. Ricche di fibre e sali minerali, i fico freschi e di stagione garantisce qualità e genuinità direttamente dal campo al tuo banco.'
            },
            {id: 86,
              name: 'Susina',
              origin: 'Italia',
              price: '3.50',
              unit: 'kg',
              available: true,
              image: '/images/products/susina.jpg',
              description: 'Susine: susine è un frutto di stagione, dal sapore deciso e profumato. Ideale da consumare crudo in spuntini o insalate, è perfetto anche come base per dolci e dessert. Ricche di fibre e sali minerali, i susine freschi e di stagione garantisce qualità e genuinità direttamente dal campo al tuo banco.'
            },
          ]
        },
        {
          id: 'verdura-estate',
          nome: 'Verdura Estiva',
          icon: '🍅',
          prodotti: [
            { id: 87, 
              name: 'Pomodoro ramato',
               origin: 'Sicilia', 
               price: '2.50', 
               unit: 'kg', 
               available: true,
               image: '/images/products/pomodoro ramato.jpg',
               description: 'Pomodoro ramato: pomodoro ramato è un pomodoro di stagione, dal sapore deciso e profumato. Ideale da consumare crudo in spuntini o insalate, è perfetto anche come base per dolci e dessert. Ricche di fibre e sali minerali, i pomodori freschi e di stagione garantisce qualità e genuinità direttamente dal campo al tuo banco.'
            },
            { id: 118, 
              name: 'Cuore Di Bue',
               origin: 'Sicilia', 
               price: '2.50', 
               unit: 'kg', 
               available: true,
               image: '/images/products/cuore di bue.jpeg',
               description: 'Cuore Di Bue: cuore di bue è un pomodoro di stagione, dal sapore deciso e profumato. Ideale da consumare crudo in spuntini o insalate, è perfetto anche come base per dolci e dessert. Ricche di fibre e sali minerali, i pomodori freschi e di stagione garantisce qualità e genuinità direttamente dal campo al tuo banco.'
            },
            { id: 183, 
              name: 'Pomodoro Perino',
               origin: 'Sicilia', 
               price: '2.50', 
               unit: 'kg', 
               available: true,
               image: '/images/products/perino.jpg',
               description: 'Pomodoro Perino: pomodoro perino è un pomodoro di stagione, dal sapore deciso e profumato. Ideale da consumare crudo in spuntini o insalate, è perfetto anche come base per dolci e dessert. Ricche di fibre e sali minerali, i pomodori freschi e di stagione garantisce qualità e genuinità direttamente dal campo al tuo banco.'
            },
            { id: 88, 
              name: 'Pomodorino Datterino',
               origin: 'Sicilia', 
               price: '2.50', 
               unit: 'kg', 
               available: true,
               image: '/images/products/pomodorini.jpg',
               description: 'Pomodoro ramato: pomodoro ramato è un pomodoro di stagione, dal sapore deciso e profumato. Ideale da consumare crudo in spuntini o insalate, è perfetto anche come base per dolci e dessert. Ricche di fibre e sali minerali, i pomodori freschi e di stagione garantisce qualità e genuinità direttamente dal campo al tuo banco.'
            },
            { id: 89, name: 'Zucchine',
               origin: 'Italia', 
               price: '1.80',
               unit: 'kg', 
               available: true,
               image: '/images/products/zucchine.jpg',
               description: 'Zucchine: zucchine è un ortaggio di stagione, dal sapore deciso e profumato. Ideale da consumare crudo in spuntini o insalate, è perfetto anche come base per dolci e dessert. Ricche di fibre e sali minerali, i zucchine freschi e di stagione garantisce qualità e genuinità direttamente dal campo al tuo banco.'
            },
            { id: 90, 
              name: 'Melanzane', 
              origin: 'Sicilia', 
              price: '2.20', 
              unit: 'kg', 
              available: true,
              image: '/images/products/melanzane.jpeg',
              description: 'Melanzane: melanzane è un ortaggio di stagione, dal sapore deciso e profumato. Ideale da consumare crudo in spuntini o insalate, è perfetto anche come base per dolci e dessert. Ricche di fibre e sali minerali, i melanzane freschi e di stagione garantisce qualità e genuinità direttamente dal campo al tuo banco.'
            },
            { id: 91, 
              name: 'Peperoni gialli', 
              origin: 'Italia', 
              price: '2.80', 
              unit: 'kg', 
              available: true,
              image: '/images/products/peperone-giallo.jpeg',
              description: 'Peperoni gialli: peperoni gialli è un ortaggio di stagione, dal sapore deciso e profumato. Ideale da consumare crudo in spuntini o insalate, è perfetto anche come base per dolci e dessert. Ricche di fibre e sali minerali, i peperoni gialli freschi e di stagione garantisce qualità e genuinità direttamente dal campo al tuo banco.'
            },
            { id: 92, 
              name: 'Peperoni rossi', 
              origin: 'Italia', 
              price: '2.80', 
              unit: 'kg', 
              available: true,
              image: '/images/products/peperone-rosso.jpeg',
              description: 'Peperoni rossi: peperoni rossi è un ortaggio di stagione, dal sapore deciso e profumato. Ideale da consumare crudo in spuntini o insalate, è perfetto anche come base per dolci e dessert. Ricche di fibre e sali minerali, i peperoni rossi freschi e di stagione garantisce qualità e genuinità direttamente dal campo al tuo banco.'
            },
            { id: 93, 
              name: 'Cetrioli', 
              origin: 'Italia', 
              price: '1.50', 
              unit: 'kg', 
              available: true,
              image: '/images/products/cetrioli.jpg',
              description: 'Cetrioli: cetrioli è un ortaggio di stagione, dal sapore deciso e profumato. Ideale da consumare crudo in spuntini o insalate, è perfetto anche come base per dolci e dessert. Ricche di fibre e sali minerali, i cetrioli freschi e di stagione garantisce qualità e genuinità direttamente dal campo al tuo banco.'
            },
            { id: 94, 
              name: 'Fagiolini', 
              origin: 'Italia', 
              price: '3.50', 
              unit: 'kg', 
              available: true,
              image: '/images/products/cornetti.jpg',
              description: 'Fagiolini: fagiolini è un ortaggio di stagione, dal sapore deciso e profumato. Ideale da consumare crudo in spuntini o insalate, è perfetto anche come base per dolci e dessert. Ricche di fibre e sali minerali, i fagiolini freschi e di stagione garantisce qualità e genuinità direttamente dal campo al tuo banco.'
            },
            {id: 178 ,
              name: 'Piattoni',
              origin: 'Italia',
              price: '2.20',
              unit: 'kg',
              available: true,
              image: '/images/products/piattoni.jpg',
              description: 'Piattoni: piattoni è un ortaggio di stagione, dal sapore deciso e profumato. Ideale da consumare crudo in spuntini o insalate, è perfetto anche come base per dolci e dessert. Ricche di fibre e sali minerali, i piattoni freschi e di stagione garantisce qualità e genuinità direttamente dal campo al tuo banco.'
            },
            { id: 69, 
              name: 'Lattuga Trocadero', 
              origin: 'Locale', 
              price: '1.50', 
              unit: 'pz', 
              available: true,
              image: '/images/products/lattuga-trocadero.jpg',
              description: 'Lattuga: lattuga sono un ortaggio di stagione, dal sapore deciso e profumato. Ideale da consumare crudo in spuntini o insalate, è perfetto anche come base per dolci e dessert. Ricche di fibre e sali minerali, i lattuga freschi e di stagione garantisce qualità e genuinità direttamente dal campo al tuo banco.'
            },
            { 
              id: 50, 
              name: 'Carote', 
              origin: 'Italia', 
              price: '2.20', 
              unit: 'kg', 
              available: true,
              image: '/images/products/carote.jpg',
              description: 'Le carote sono ortaggi croccanti e dolci, dal caratteristico colore arancione brillante. Perfette da consumare crude in insalata, frullati o snack, e ottime cotte in zuppe, contorni e ricette tradizionali. Ricche di vitamine, in particolare vitamina A, e fibre, le carote fresche e di stagione garantiscono gusto, salute e genuinità direttamente dal campo al tuo banco.'
            },
            { 
              id: 51, 
              name: 'Carote Pacchetto', 
              origin: 'Italia', 
              price: '2.20', 
              unit: 'pz', 
              available: true,
              image: '/images/products/carote pacchetto.jpg',
              description: 'Carote Pacchetto: carote fresche e croccanti, dal caratteristico colore arancione brillante. Perfette da consumare crude in insalata, frullati o snack, e ottime cotte in zuppe, contorni e ricette tradizionali. Ricche di vitamine, in particolare vitamina A, e fibre, le carote fresche e di stagione garantiscono gusto, salute e genuinità direttamente dal campo al tuo banco.'
            },
            { 
              id: 52, 
              name: 'Carote Sfuse', 
              origin: 'Italia', 
              price: '2.20', 
              unit: 'kg', 
              available: true,
              image: '/images/products/Carote sfuse.jpg',
              description: 'Carote Sfuse: carote fresche e croccanti, dal caratteristico colore arancione brillante. Perfette da consumare crude in insalata, frullati o snack, e ottime cotte in zuppe, contorni e ricette tradizionali. Ricche di vitamine, in particolare vitamina A, e fibre, le carote fresche e di stagione garantiscono gusto, salute e genuinità direttamente dal campo al tuo banco.'
            },
          ]
        }
      ]
    },
    {
      id: 'autunno',
      nome: 'Autunno',
      icon: '🍂',
      mesi: 'Settembre - Novembre',
      sottocategorie: [
        {
          id: 'frutta-autunno',
          nome: 'Frutta Autunnale',
          icon: '🍇',
          prodotti: [
            { 
              id: 1, 
              name: 'Melinda Golden Delicious', 
              origin: 'Trentino', 
              price: '2.40', 
              unit: 'kg', 
              available: true,
              image: '/images/products/melinda-golden.jpg',
              description: 'Melinda Golden Delicious è la mela che conquista per la sua dolcezza equilibrata e la sua inconfondibile croccantezza. Coltivata nel cuore delle valli del Trentino, cresce in un ambiente naturale unico che le conferisce qualità superiori e un gusto delicato ma ricco. La buccia giallo dorata racchiude una polpa succosa, fragrante e naturalmente dolce, perfetta da gustare fresca in ogni momento della giornata. Versatile in cucina, è ideale anche per dolci, dessert, macedonie e preparazioni al forno, grazie alla sua capacità di mantenere consistenza e sapore. Sana, genuina e certificata, Melinda Golden Delicious è una mela che unisce tradizione, territorio e qualità, portando sulla tua tavola il meglio della natura.'
            },
            { 
              id: 2, 
              name: 'Golden Delicious', 
              origin: 'Italia', 
              price: '2.40', 
              unit: 'kg', 
              available: true,
              image: '/images/products/golden-amelia.jpg',
              description: 'Golden Delicious: la mela che unisce dolcezza, croccantezza e qualità certificata. Coltivata con cura nelle valli italiane, la Golden Delicious Amelia si distingue per la sua polpa succosa, fragrante e naturalmente dolce, racchiusa in una buccia dal caratteristico giallo dorato. Ideale da gustare fresca, è perfetta anche per dolci, torte, macedonie o dessert al forno, grazie alla sua capacità di mantenere sapore e consistenza in ogni preparazione. Ricca di vitamine e antiossidanti, è la scelta sana e genuina per tutta la famiglia. Golden Delicious Amelia: tradizione, territorio e bontà direttamente sulla tua tavola.'
            },
            { 
              id: 3, 
              name: 'Renetta', 
              origin: 'Italia', 
              price: '2.20', 
              unit: 'kg', 
              available: true,
              image: '/images/products/renetta.jpg',
              description: 'Mela Renetta: un classico della tradizione italiana, dal sapore equilibrato tra dolce e acidulo e dalla polpa compatta e profumata. La buccia sottile e leggermente dorata racchiude un frutto versatile, ideale sia da gustare fresco che per preparazioni in cucina, come dolci, torte e composte, dove mantiene consistenza e aroma. Ricca di nutrienti e antiossidanti naturali, la Renetta unisce gusto, genuinità e tradizione, portando sulla tua tavola un frutto autentico e di alta qualità. Renetta: sapore classico, polpa soda e aroma inconfondibile, perfetta in ogni occasione.'
            },
            { 
              id: 5, 
              name: 'Fuji', 
              origin: 'Italia', 
              price: '2.50', 
              unit: 'kg', 
              available: true,
              image: '/images/products/fuji.jpg',
              description: 'Mela Fuji: dolcezza intensa e croccantezza in ogni morso. Con la sua polpa soda, succosa e aromaticamente zuccherina, la Fuji è una delle mele più amate per il gusto deciso e persistente. La buccia, liscia e dai toni rosso sfumato con giallo, nasconde un frutto versatile, ideale sia da consumare fresco che in insalate, dolci, dessert o preparazioni al forno. Ricca di vitamine e antiossidanti naturali, la Fuji è perfetta per chi cerca un frutto sano, gustoso e adatto a tutta la famiglia. Fuji: croccante, dolce e irresistibile, la mela che rende ogni momento speciale.'
            },
            { 
              id: 6, 
              name: 'Red Delicious', 
              origin: 'Italia', 
              price: '2.30', 
              unit: 'kg', 
              available: true,
              image: '/images/products/red-delicious.jpg',
              description: 'Red Delicious: la mela dal gusto dolce e delicato, dall\'inconfondibile buccia rosso intenso e brillante. La sua polpa croccante e succosa la rende perfetta da gustare fresca, in spuntini o macedonie, portando un tocco di colore e dolcezza naturale sulla tua tavola. Grazie al suo sapore equilibrato e alla consistenza soda, la Red Delicious è ideale anche per piatti leggeri e dessert, rappresentando la scelta sana e genuina per tutta la famiglia. Red Delicious: dolcezza, croccantezza e bellezza in ogni morso.'
            },
            { 
              id: 7, 
              name: 'Granny Smith', 
              origin: 'Italia', 
              price: '2.40', 
              unit: 'kg', 
              available: true,
              image: '/images/products/granny-smith.jpg',
              description: 'Granny Smith: la mela dal gusto fresco, acidulo e vivace, dal caratteristico colore verde brillante. La sua polpa croccante e succosa offre un equilibrio perfetto tra acidità e dolcezza naturale, rendendola ideale da gustare fresca, in insalate, dessert o preparazioni al forno. Ricca di vitamine e antiossidanti, la Granny Smith è perfetta per chi cerca un frutto sano, rinfrescante e dal sapore deciso, capace di dare carattere a ogni piatto. Granny Smith: freschezza, croccantezza e gusto inconfondibile in ogni morso.'
            },           
            { 
              id: 11, 
              name: 'Kaiser', 
              origin: 'Italia', 
              price: '2.60', 
              unit: 'kg', 
              available: true,
              image: '/images/products/pera-kaiser.jpg',
              description: 'Pera Kaiser: dolcezza delicata e polpa croccante in ogni morso. La sua buccia liscia, dal verde chiaro leggermente sfumato di rosso, nasconde un frutto versatile e saporito, ideale da gustare fresco o in preparazioni al forno, dolci e macedonie. Ricca di vitamine e antiossidanti naturali, la Kaiser unisce gusto e qualità, rendendola perfetta per chi cerca un frutto sano, genuino e dal sapore equilibrato. Kaiser: croccantezza, dolcezza e freschezza in ogni morso.'
            },
            { 
              id: 10, 
              name: 'Abate Fetel', 
              origin: 'Italia', 
              price: '2.80', 
              unit: 'kg', 
              available: true,
              image: '/images/products/abate-fetel.jpg',
              description: 'Pera Abate Fetel: dolcezza elegante e polpa succosa in ogni morso. Dalla forma allungata e slanciata, con buccia liscia e color giallo dorato, la Abate Fetel è famosa per il suo aroma delicato e il sapore naturalmente zuccherino. Perfetta da gustare fresca, in macedonie o dessert, mantiene anche consistenza e gusto nelle preparazioni al forno. Ricca di vitamine e fibre naturali, è una scelta sana e genuina per tutta la famiglia. Abate Fetel: dolcezza, morbidezza e profumo inconfondibile, un classico della frutta italiana.'
            },
            { 
              id: 76, 
              name: 'Williams', 
              origin: 'Italia', 
              price: '2.70', 
              unit: 'kg', 
              available: true,
              image: '/images/products/williams.jpg',
              description: 'Pera Williams: il simbolo della dolcezza e della succosità. Con la sua polpa morbida, succosa e profumata e la buccia sottile di colore verde-giallo, talvolta sfumata di rosso, la Williams è perfetta da gustare fresca, in macedonie, dolci o preparazioni al forno. Ricca di vitamine, fibre e antiossidanti naturali, è un frutto sano, genuino e versatile, ideale per tutta la famiglia. Williams: dolcezza naturale e profumo intenso in ogni morso.'
            },
            { 
              id: 12, 
              name: 'Decana', 
              origin: 'Italia', 
              price: '2.50', 
              unit: 'kg', 
              available: true,
              image: '/images/products/decana.jpg',
              description: 'Pera Decana: dolcezza intensa e polpa succosa in ogni morso. La sua forma rotonda e compatta, con buccia liscia dal colore giallo-verde, racchiude un frutto dal sapore equilibrato e aromatico. Perfetta da gustare fresca, in macedonie o dessert, mantiene consistenza e gusto anche nelle preparazioni al forno. Ricca di vitamine, fibre e antiossidanti naturali, la Decana è un frutto sano, genuino e versatile, ideale per tutta la famiglia. Decana: dolcezza, morbidezza e aroma inconfondibile, un classico della frutta italiana.'
            },
            { 
              id: 13, 
              name: 'Kiwi Giallo', 
              origin: 'Italia', 
              price: '4.20', 
              unit: 'kg', 
              available: true,
              image: '/images/products/kiwi-giallo.jpg',
              description: 'Kiwi Giallo: dolcezza esotica e polpa morbida in ogni morso. Con il suo colore dorato brillante e il sapore naturalmente zuccherino, il kiwi giallo è perfetto da gustare fresco, in macedonie, smoothie o dessert. Ricco di vitamine, in particolare vitamina C, minerali e antiossidanti naturali, è un frutto sano, nutriente e ideale per chi cerca freschezza e energia in ogni momento della giornata. Kiwi Giallo: gusto dolce, polpa succosa e vitalità naturale, direttamente dalla natura alla tua tavola.'
            },
            { 
              id: 14, 
              name: 'Kiwi Verde', 
              origin: 'Italia', 
              price: '3.20', 
              unit: 'kg', 
              available: true,
              image: '/images/products/kiwi-verde.jpg',
              description: 'Kiwi Verde: freschezza e sapore inconfondibili in ogni morso. Con la sua polpa verde brillante, succosa e leggermente acidula, il kiwi verde è perfetto da gustare fresco, in macedonie, smoothie o dessert. Ricco di vitamina C, fibre e antiossidanti naturali, è un frutto sano e nutriente, ideale per chi cerca energia e vitalità in modo naturale. Kiwi Verde: gusto deciso, freschezza e benessere direttamente dalla natura alla tua tavola.'
            },
            { 
              id: 19, 
              name: 'Arancia Navel', 
              origin: 'Sicilia', 
              price: '2.00', 
              unit: 'kg', 
              available: true,
              image: '/images/products/navel.jpg',
              description: 'Arancia Navel: dolcezza, freschezza e succosità in ogni fetta. L\'arancia Navel, con la sua polpa succosa, di colore arancio brillante e senza semi, è perfetta da gustare fresca, in macedonie, dessert o spremute naturali. Dal gusto naturalmente dolce e aromatico, è ricca di vitamina C e antiossidanti, ideale per chi cerca un frutto genuino, sano e ricco di energia. Navel: colore intenso, dolcezza equilibrata e freschezza naturale direttamente sulla tua tavola.'
            },
            { 
              id: 22, 
              name: 'Mandarancio', 
              origin: 'Italia', 
              price: '2.90', 
              unit: 'kg', 
              available: true,
              image: '/images/products/mandarancio.jpg',
              description: 'Mandarancio: il perfetto equilibrio tra dolcezza e acidità in ogni spicchio. Il mandarancio, frutto dalla buccia sottile e profumata, combina il gusto intenso del mandarino con la freschezza dell\'arancia, regalando una polpa succosa e aromatica, ideale da gustare fresca, in macedonie, dolci o spremute naturali. Ricco di vitamina C, fibre e antiossidanti naturali, è un frutto sano, nutriente e versatile, perfetto per chi cerca gusto, energia e benessere in ogni momento della giornata. Mandarancio: freschezza, dolcezza e vitalità naturale direttamente sulla tua tavola.'
            },
            {
              id: 96,
              name: 'Melone Giallo',
              origin: 'Italia',
              price: '3.50',
              unit: 'kg',
              available: true,
              image: '/images/products/melone-giallo.jpg',
              description: 'Melone Giallo: melone è un frutto di stagione, dal sapore deciso e profumato. Ideale da consumare crudo in spuntini o insalate, è perfetto anche come base per dolci e dessert. Ricche di fibre e sali minerali, i melone freschi e di stagione garantisce qualità e genuinità direttamente dal campo al tuo banco.'
            },
            { id: 97, 
              name: 'Uva Italia', 
              origin: 'Puglia',
              price: '3.50', 
              unit: 'kg', 
              available: true,
              image: '/images/products/uva-italia.jpg',
              description: 'Uva Italia: uva è un frutto di stagione, dal sapore deciso e profumato. Ideale da consumare crudo in spuntini o insalate, è perfetto anche come base per dolci e dessert. Ricche di fibre e sali minerali, i uva freschi e di stagione garantisce qualità e genuinità direttamente dal campo al tuo banco.'
             },
             {
              id: 98,
              name: 'Uva Moscato',
              origin: 'Puglia',
              price: '3.50', 
              unit: 'kg', 
              available: true,
              image: '/images/products/uva-moscato.jpg',
              description: 'Uva Moscato: uva è un frutto di stagione, dal sapore deciso e profumato. Ideale da consumare crudo in spuntini o insalate, è perfetto anche come base per dolci e dessert. Ricche di fibre e sali minerali, i uva freschi e di stagione garantisce qualità e genuinità direttamente dal campo al tuo banco.'
             },
             {
              id: 99,
              name: 'Uva Pizzutella',
              origin: 'Puglia',
              price: '3.50', 
              unit: 'kg', 
              available: true,
              image: '/images/products/uva-pizzuttella.jpg',
              description: 'Uva Passito: uva è un frutto di stagione, dal sapore deciso e profumato. Ideale da consumare crudo in spuntini o insalate, è perfetto anche come base per dolci e dessert. Ricche di fibre e sali minerali, i uva freschi e di stagione garantisce qualità e genuinità direttamente dal campo al tuo banco.'
             },
             {
              id: 84,
              name: 'Uva Senza Semi Bianca',
              origin: 'Puglia',
              price: '3.50', 
              unit: 'kg', 
              available: true,
              image: '/images/products/uva-bianca-senza-semi.jpg',
              description: 'Uva Senza Semi Bianca: uva è un frutto di stagione, dal sapore deciso e profumato. Ideale da consumare crudo in spuntini o insalate, è perfetto anche come base per dolci e dessert. Ricche di fibre e sali minerali, i uva freschi e di stagione garantisce qualità e genuinità direttamente dal campo al tuo banco.'
             },
             {
              id: 100,
              name: 'Uva Senza Semi Rosata',
              origin: 'Puglia',
              price: '3.50', 
              unit: 'kg', 
              available: true,
              image: '/images/products/uva-rosata-senza-semi.jpg',
              description: 'Uva Rosata Senza Semi: uva è un frutto di stagione, dal sapore deciso e profumato. Ideale da consumare crudo in spuntini o insalate, è perfetto anche come base per dolci e dessert. Ricche di fibre e sali minerali, i uva freschi e di stagione garantisce qualità e genuinità direttamente dal campo al tuo banco.'
             },
             { 
              id: 15, 
              name: 'Melograno', 
              origin: 'Italia', 
              price: '3.80', 
              unit: 'kg', 
              available: true,
              image: '/images/products/melograno.jpg',
              description: 'Melograno: colore intenso, freschezza e gusto unico in ogni chicco. Il melograno racchiude una polpa succosa e dolce-acidula, ricca di antiossidanti naturali e vitamine, ideale da gustare fresco, in macedonie, smoothie o come ingrediente originale in piatti creativi. Frutto simbolo di salute e vitalità, il melograno è perfetto per chi cerca un\'alimentazione sana, naturale e gustosa, portando sulla tavola un tocco di colore e benessere. Melograno: dolcezza, freschezza e vitalità naturale in ogni chicco.'
            },
            { 
              id: 16, 
              name: 'Cachi', 
              origin: 'Italia', 
              price: '3.50', 
              unit: 'kg', 
              available: true,
              image: '/images/products/cachi.jpg',
              description: 'Cachi: i cachi sono frutti dal colore arancione intenso e dalla polpa morbida e dolce. Ideali da consumare maturi al cucchiaio o come ingrediente per dolci e dessert, sono apprezzati per il loro gusto zuccherino e avvolgente. Ricchi di vitamine e sali minerali, i cachi freschi e di stagione garantiscono qualità e genuinità direttamente dal produttore al tuo banco.'
            },
            { 
              id: 17, 
              name: 'Cachi Mela', 
              origin: 'Italia', 
              price: '3.50', 
              unit: 'kg', 
              available: true,
              image: '/images/products/cachi-mela.jpg',
              description: 'Cachi Mela: dolcezza croccante e polpa soda in ogni morso. Il cachi mela, con la sua forma tondeggiante e il colore arancio intenso, unisce il gusto delicato del cachi alla consistenza più compatta, simile a quella di una mela. Perfetto da gustare fresco, in spuntini, macedonie o dessert, è un frutto sano e nutriente, ricco di vitamine, fibre e antiossidanti naturali. Cachi Mela: freschezza, dolcezza e croccantezza naturale, direttamente dalla natura alla tua tavola.'
            },
            {
              id: 85,
              name: 'fico',
              origin: 'Italia',
              price: '3.50',
              unit: 'kg',
              available: true,
              image: '/images/products/fico.jpg',
              description: 'Fico: fico è un frutto di stagione, dal sapore deciso e profumato. Ideale da consumare crudo in spuntini o insalate, è perfetto anche come base per dolci e dessert. Ricche di fibre e sali minerali, i fico freschi e di stagione garantisce qualità e genuinità direttamente dal campo al tuo banco.'
            },
            {
              id: 101,
              name: 'Fico D\'India',
              origin: 'Italia',
              price: '3.50',
              unit: 'kg',
              available: true,
              image: '/images/products/fico-d\'india.jpg',
              description: "Fico D'india: fico è un frutto di stagione, dal sapore deciso e profumato. Ideale da consumare crudo in spuntini o insalate, è perfetto anche come base per dolci e dessert. Ricche di fibre e sali minerali, i fico freschi e di stagione garantisce qualità e genuinità direttamente dal campo al tuo banco."
            },
            {
              id: 86,
              name: 'Susine',
              origin: 'Italia',
              price: '3.50',
              unit: 'kg',
              available: true,
              image: '/images/products/susina.jpg',
              description: 'Susine: susine è un frutto di stagione, dal sapore deciso e profumato. Ideale da consumare crudo in spuntini o insalate, è perfetto anche come base per dolci e dessert. Ricche di fibre e sali minerali, i susine freschi e di stagione garantisce qualità e genuinità direttamente dal campo al tuo banco.'
            },
            {
              id: 102,
              name: 'Prugna Goccia D\'oro',
              origin: 'Italia',
              price: '3.50',
              unit: 'kg',
              available: true,
              image: '/images/products/Goccia-d\'oro.jpg',
              description: 'Susine Goccia D\'oro: susine è un frutto di stagione, dal sapore deciso e profumato. Ideale da consumare crudo in spuntini o insalate, è perfetto anche come base per dolci e dessert. Ricche di fibre e sali minerali, i susine freschi e di stagione garantisce qualità e genuinità direttamente dal campo al tuo banco.'
            },
            {
              id: 103,
              name: 'Prugna Santarosa',
              origin: 'Italia',
              price: '3.50',
              unit: 'kg',
              available: true,
              image: '/images/products/santarosa.jpg',
              description: 'Susine Santa Rosa: susine è un frutto di stagione, dal sapore deciso e profumato. Ideale da consumare crudo in spuntini o insalate, è perfetto anche come base per dolci e dessert. Ricche di fibre e sali minerali, i susine freschi e di stagione garantisce qualità e genuinità direttamente dal campo al tuo banco.'
            },
            {
              id: 104,
              name: 'Prugna Sangue Di Drago',
              origin: 'Italia',
              price: '3.50',
              unit: 'kg',
              available: true,
              image: '/images/products/sangue-di-drago.jpg',
              description: 'Susine Santa Rosa: susine è un frutto di stagione, dal sapore deciso e profumato. Ideale da consumare crudo in spuntini o insalate, è perfetto anche come base per dolci e dessert. Ricche di fibre e sali minerali, i susine freschi e di stagione garantisce qualità e genuinità direttamente dal campo al tuo banco.'
            },
            {
              id: 105,
              name: 'Prugna Regina Claudia',
              origin: 'Italia',
              price: '3.50',
              unit: 'kg',
              available: true,
              image: '/images/products/regina-claudia.jpg',
              description: 'Prugna Regina Claudia: prugna è un frutto di stagione, dal sapore deciso e profumato. Ideale da consumare crudo in spuntini o insalate, è perfetto anche come base per dolci e dessert. Ricche di fibre e sali minerali, i prugne freschi e di stagione garantisce qualità e genuinità direttamente dal campo al tuo banco.'
            },
            {id: 106,
              name: 'Castagne',
              origin: 'Italia',
              price: '3.50',
              unit: 'kg',
              available: true,
              image: '/images/products/castagne.jpg',
              description: 'Castagne: castagne è un frutto di stagione, dal sapore deciso e profumato. Ideale da consumare crudo in spuntini o insalate, è perfetto anche come base per dolci e dessert. Ricche di fibre e sali minerali, i castagne freschi e di stagione garantisce qualità e genuinità direttamente dal campo al tuo banco.'
            },
            {id: 107,
              name: 'Marroni',
              origin: 'Italia',
              price: '3.50',
              unit: 'kg',
              available: true,
              image: '/images/products/marroni.jpg',
              description: 'Marroni: marroni è un frutto di stagione, dal sapore deciso e profumato. Ideale da consumare crudo in spuntini o insalate, è perfetto anche come base per dolci e dessert. Ricche di fibre e sali minerali, i marroni freschi e di stagione garantisce qualità e genuinità direttamente dal campo al tuo banco.'
            },
          ]
        },
        {
          id: 'verdura-autunno',
          nome: 'Verdura Autunnale',
          icon: '🎃',
          prodotti: [
            { 
              id: 29, 
              name: 'Broccoli', 
              origin: 'Italia', 
              price: '2.50', 
              unit: 'pz', 
              available: true,
              image: '/images/products/broccoli.jpg',
              description: 'Broccoli: gusto deciso e benessere naturale in ogni piatto. Con il loro colore verde intenso e la consistenza compatta, i broccoli sono un ortaggio ricco di proprietà nutritive, apprezzato per il sapore leggermente amarognolo e la grande versatilità in cucina. Ideali per contorni, primi piatti, vellutate e ricette salutari, sono ricchi di vitamine, fibre, sali minerali e antiossidanti naturali, perfetti per un\'alimentazione equilibrata. Broccoli: freschezza, qualità e salute direttamente dall\'orto alla tua tavola.'
            },
            { 
              id: 27, 
              name: 'Cavolo Nero', 
              origin: 'Toscana', 
              price: '2.80', 
              unit: 'kg', 
              available: true,
              image: '/images/products/cavolo-nero.jpg',
              description: 'Cavolo Nero: gusto deciso e proprietà nutritive d\'eccellenza. Dalle foglie lunghe e scure, il cavolo nero è un ortaggio tipico della tradizione italiana, apprezzato per il suo sapore intenso e leggermente amarognolo. Ideale per zuppe, minestre, contorni, vellutate e piatti rustici, è ricco di vitamine, sali minerali, fibre e antiossidanti naturali, perfetto per un\'alimentazione sana ed equilibrata. Cavolo Nero: tradizione, gusto e benessere direttamente dall\'orto alla tua tavola.'
            },
            { 
              id: 30, 
              name: 'Cavolfiore', 
              origin: 'Italia', 
              price: '2.20', 
              unit: 'kg', 
              available: true,
              image: '/images/products/cavolfiore.jpg',
              description: 'Cavolfiore: gusto delicato e versatilità in cucina. Con la sua infiorescenza compatta e il colore chiaro, il cavolfiore è un ortaggio invernale apprezzato per il sapore morbido e leggermente dolce. Perfetto per contorni, vellutate, gratin, primi piatti e preparazioni al forno, è ricco di vitamine, fibre e sali minerali, ideale per un\'alimentazione sana ed equilibrata. Cavolfiore: semplicità, genuinità e benessere direttamente dall\'orto alla tua tavola.'
            },
            { 
              id: 31, 
              name: 'Cavolfiore Verde', 
              origin: 'Italia', 
              price: '2.20', 
              unit: 'kg', 
              available: true,
              image: '/images/products/cavolfiore-verde.jpeg',
              description: 'Cavolfiore Nero: gusto delicato e versatilità in cucina. Con la sua infiorescenza compatta e il colore chiaro, il cavolfiore è un ortaggio invernale apprezzato per il sapore morbido e leggermente dolce. Perfetto per contorni, vellutate, gratin, primi piatti e preparazioni al forno, è ricco di vitamine, fibre e sali minerali, ideale per un\'alimentazione sana ed equilibrata. Cavolfiore: semplicità, genuinità e benessere direttamente dall\'orto alla tua tavola.'
            },
            {
              id: 32, 
              name: 'Cavolfiore viola', 
              origin: 'Italia', 
              price: '1.60', 
              unit: 'kg', 
              available: true,
              image: '/images/products/cavolfiore-viola.jpg',
              description: 'Cavolfiore Viola: gusto delicato e versatilità in cucina. Con la sua infiorescenza compatta e il colore viola, il cavolfiore è un ortaggio invernale apprezzato per il sapore morbido e leggermente dolce. Perfetto per contorni, vellutate, gratin, primi piatti e preparazioni al forno, è ricco di vitamine, fibre e sali minerali, ideale per un\'alimentazione sana ed equilibrata. Cavolfiore: semplicità, genuinità e benessere direttamente dall\'orto alla tua tavola.'
            },
            {
              id: 33,
              name: 'Cavolo Romano',
              origin: 'Italia',
              price: '2.20',
              unit: 'kg',
              available: true,
              image: '/images/products/cavolo-romano.jpg',
              description: 'Cavolo Romano: gusto delicato e versatilità in cucina. Con la sua infiorescenza compatta e il colore verde intenso, il cavolo romano è un ortaggio invernale apprezzato per il sapore morbido e leggermente dolce. Perfetto per contorni, vellutate, gratin, primi piatti e preparazioni al forno, è ricco di vitamine, fibre e sali minerali, ideale per un\'alimentazione sana ed equilibrata. Cavolo Romano: semplicità, genuinità e benessere direttamente dall\'orto alla tua tavola.'
            },
            { 
              id: 37, 
              name: 'Finocchi', 
              origin: 'Italia', 
              price: '2.40', 
              unit: 'kg', 
              available: true,
              image: '/images/products/finocchi.jpg',
              description: 'Il finocchio è un ortaggio fresco e profumato, caratterizzato da un grumolo bianco e croccante e da un sapore delicato e aromatico. Ottimo da consumare crudo in insalata o pinzimonio, è ideale anche cotto in gratin, contorni e piatti leggeri. Ricco di fibre e naturalmente digeribile, il finocchio fresco e di stagione garantisce qualità e genuinità direttamente dal campo al tuo banco.'
            }, 
            { 
              id: 48, 
              name: 'Barbabietole', 
              origin: 'Italia', 
              price: '2.99', 
              unit: 'kg', 
              available: true,
              image: '/images/products/barbabietole.jpg',
              description: 'Le barbabietole sono ortaggi dalla polpa dolce e dal colore rosso intenso, con radice tondeggiante e foglie verdi nutrienti. Perfette cotte, al forno, in zuppe o insalate, aggiungono colore e gusto a ogni piatto. Ricche di vitamine, sali minerali e fibre, le barbabietole fresche e di stagione garantiscono qualità e genuinità direttamente dal campo al tuo banco.'
            }, 
            {
              id: 49, 
              name: 'Zucca',
              origin: 'Italia',
              price: '2.20',
              unit: 'kg',
              available: true,
              image: '/images/products/zucca.jpeg',
              description: 'La zucca è un ortaggio dal colore arancione intenso e dalla polpa dolce e carnosa. Versatile in cucina, è ideale per zuppe, vellutate, torte salate, dolci e contorni, donando sapore e colore a ogni piatto. Ricca di vitamine, fibre e antiossidanti, la zucca fresca e di stagione garantisce qualità e genuinità direttamente dal produttore al tuo banco.'
            },  
            { 
              id: 50, 
              name: 'Carote', 
              origin: 'Italia', 
              price: '2.20', 
              unit: 'kg', 
              available: true,
              image: '/images/products/carote.jpg',
              description: 'Le carote sono ortaggi croccanti e dolci, dal caratteristico colore arancione brillante. Perfette da consumare crude in insalata, frullati o snack, e ottime cotte in zuppe, contorni e ricette tradizionali. Ricche di vitamine, in particolare vitamina A, e fibre, le carote fresche e di stagione garantiscono gusto, salute e genuinità direttamente dal campo al tuo banco.'
            },
            { 
              id: 51, 
              name: 'Carote Pacchetto', 
              origin: 'Italia', 
              price: '2.20', 
              unit: 'pz', 
              available: true,
              image: '/images/products/carote pacchetto.jpg',
              description: 'Carote Pacchetto: carote fresche e croccanti, dal caratteristico colore arancione brillante. Perfette da consumare crude in insalata, frullati o snack, e ottime cotte in zuppe, contorni e ricette tradizionali. Ricche di vitamine, in particolare vitamina A, e fibre, le carote fresche e di stagione garantiscono gusto, salute e genuinità direttamente dal campo al tuo banco.'
            },
            { 
              id: 52, 
              name: 'Carote Sfuse', 
              origin: 'Italia', 
              price: '2.20', 
              unit: 'kg', 
              available: true,
              image: '/images/products/Carote sfuse.jpg',
              description: 'Carote Sfuse: carote fresche e croccanti, dal caratteristico colore arancione brillante. Perfette da consumare crude in insalata, frullati o snack, e ottime cotte in zuppe, contorni e ricette tradizionali. Ricche di vitamine, in particolare vitamina A, e fibre, le carote fresche e di stagione garantiscono gusto, salute e genuinità direttamente dal campo al tuo banco.'
            }, 
            {
              id: 108,
              name: 'Funghi Porcini',
              origin: 'Italia',
              price: '2.20',
              unit: 'kg',
              available: true,
              image: '/images/products/Funghi-porcini.jpg',
              description: 'Funghi Porcini: funghi porcini sono un fungo di stagione, dal sapore deciso e profumato. Ideale da consumare crudo in spuntini o insalate, è perfetto anche come base per dolci e dessert. Ricche di fibre e sali minerali, i funghi porcini freschi e di stagione garantisce qualità e genuinità direttamente dal campo al tuo banco.'
            },
            { 
              id: 57, 
              name: 'Porri', 
              origin: 'Italia', 
              price: '2.60', 
              unit: 'kg', 
              available: true,
              image: '/images/products/porri.jpg',
              description: 'I porri sono ortaggi dal gambo lungo e bianco e dalle foglie verdi tenere, dal sapore delicato e leggermente dolce. Ideali per zuppe, minestre, frittate e contorni, conferiscono aroma e leggerezza a ogni preparazione. Ricchi di vitamine e minerali, i porri freschi e di stagione sono sinonimo di qualità e genuinità direttamente dal campo al tuo banco.'
            },
            { id: 36, 
              name: 'Cavolo cappuccio', 
              origin: 'Italia', 
              price: '1.50', 
              unit: 'kg', 
              available: true,
              image: '/images/products/cavolo-cappuccio.jpg',
              description: 'Cavolo Cappuccio: cavolo cappuccio è un ortaggio di stagione, dal sapore deciso e profumato. Ideale da consumare crudo in spuntini o insalate, è perfetto anche come base per dolci e dessert. Ricche di fibre e sali minerali, i cavolo cappuccio freschi e di stagione garantisce qualità e genuinità direttamente dal campo al tuo banco.'
            },
            { 
              id: 42, 
              name: 'Radicchio', 
              origin: 'Veneto', 
              price: '3.20', 
              unit: 'kg', 
              available: true,
              image: '/images/products/radicchio.jpg',
              description: 'Il radicchio è una verdura dal colore rosso intenso e dalle foglie croccanti, dal gusto leggermente amarognolo e aromatico. Perfetto da gustare crudo in insalate o grigliato, saltato in padella o nelle ricette tipiche della cucina italiana, aggiunge colore e sapore a ogni piatto. Ricco di fibre e antiossidanti, il radicchio fresco e di stagione è sinonimo di qualità e genuinità direttamente dal produttore al tuo banco.'
            },
            { id: 38, 
              name: 'Spinaci', 
              origin: 'Italia', 
              price: '2.80', 
              unit: 'kg', 
              available: true,
              image: '/images/products/spinaci.jpg',
              description: 'Spinaci: spinaci è un ortaggio di stagione, dal sapore deciso e profumato. Ideale da consumare crudo in spuntini o insalate, è perfetto anche come base per dolci e dessert. Ricche di fibre e sali minerali, i spinaci freschi e di stagione garantisce qualità e genuinità direttamente dal campo al tuo banco.'
            },
            { id: 41, 
              name: 'Coste', 
              origin: 'Italia', 
              price: '2.20', 
              unit: 'kg', 
              available: true,
              image: '/images/products/coste.jpg',
              description: 'Coste: coste è un ortaggio di stagione, dal sapore deciso e profumato. Ideale da consumare crudo in spuntini o insalate, è perfetto anche come base per dolci e dessert. Ricche di fibre e sali minerali, i coste freschi e di stagione garantisce qualità e genuinità direttamente dal campo al tuo banco.'
            },
            { 
              id: 40, 
              name: 'Catalogna', 
              origin: 'Italia', 
              price: '2.50', 
              unit: 'kg', 
              available: true,
              image: '/images/products/catalogna.jpg',
              description: 'La catalogna è una verdura a foglia verde dal gusto deciso e leggermente amarognolo. Apprezzata sia cruda in insalata, soprattutto i germogli, sia cotta in contorni, zuppe e piatti tradizionali, è molto versatile in cucina. Ricca di fibre e sali minerali, la catalogna fresca e di stagione garantisce qualità e genuinità direttamente dal campo al tuo banco.'
            },
          ]
        }
      ]
    }
  ])

  // ========== PRODOTTI TUTTO L'ANNO ==========
  const categorieTuttoAnno = ref([
    {
      id: 'frutta',
      nome: 'Frutta',
      slug: 'frutta',
      descrizione: 'Frutta fuori stagione disponibile tutto l\'anno',
      icon: '🍎',
      products: [
       
        { 
          id: 1, 
          name: 'Melinda Golden Delicious', 
          origin: 'Trentino', 
          price: '2.40', 
          unit: 'kg', 
          available: true,
          image: '/images/products/melinda-golden.jpg',
          description: 'Melinda Golden Delicious è la mela che conquista per la sua dolcezza equilibrata e la sua inconfondibile croccantezza. Coltivata nel cuore delle valli del Trentino, cresce in un ambiente naturale unico che le conferisce qualità superiori e un gusto delicato ma ricco. La buccia giallo dorata racchiude una polpa succosa, fragrante e naturalmente dolce, perfetta da gustare fresca in ogni momento della giornata. Versatile in cucina, è ideale anche per dolci, dessert, macedonie e preparazioni al forno, grazie alla sua capacità di mantenere consistenza e sapore. Sana, genuina e certificata, Melinda Golden Delicious è una mela che unisce tradizione, territorio e qualità, portando sulla tua tavola il meglio della natura.'
        },
        { 
          id: 2, 
          name: 'Golden Delicious', 
          origin: 'Italia', 
          price: '2.40', 
          unit: 'kg', 
          available: true,
          image: '/images/products/golden-amelia.jpg',
          description: 'Golden Delicious: la mela che unisce dolcezza, croccantezza e qualità certificata. Coltivata con cura nelle valli italiane, la Golden Delicious Amelia si distingue per la sua polpa succosa, fragrante e naturalmente dolce, racchiusa in una buccia dal caratteristico giallo dorato. Ideale da gustare fresca, è perfetta anche per dolci, torte, macedonie o dessert al forno, grazie alla sua capacità di mantenere sapore e consistenza in ogni preparazione. Ricca di vitamine e antiossidanti, è la scelta sana e genuina per tutta la famiglia. Golden Delicious Amelia: tradizione, territorio e bontà direttamente sulla tua tavola.'
        },
        { 
          id: 3, 
          name: 'Renetta', 
          origin: 'Italia', 
          price: '2.20', 
          unit: 'kg', 
          available: true,
          image: '/images/products/renetta.jpg',
          description: 'Mela Renetta: un classico della tradizione italiana, dal sapore equilibrato tra dolce e acidulo e dalla polpa compatta e profumata. La buccia sottile e leggermente dorata racchiude un frutto versatile, ideale sia da gustare fresco che per preparazioni in cucina, come dolci, torte e composte, dove mantiene consistenza e aroma. Ricca di nutrienti e antiossidanti naturali, la Renetta unisce gusto, genuinità e tradizione, portando sulla tua tavola un frutto autentico e di alta qualità. Renetta: sapore classico, polpa soda e aroma inconfondibile, perfetta in ogni occasione.'
        },
        { 
          id: 4, 
          name: 'Ambrosia', 
          origin: 'Italia', 
          price: '2.60', 
          unit: 'kg', 
          available: true,
          image: '/images/products/ambrosia.jpg',
          description: 'Mela Ambrosia: dolcezza e succosità in ogni morso. La sua polpa croccante, morbida e aromatica conquista al primo assaggio, mentre la buccia rosata e leggermente sfumata di giallo la rende immediatamente riconoscibile. Coltivata con attenzione in terreni selezionati, la Ambrosia unisce gusto e qualità, ed è perfetta da gustare fresca o in insalate, dessert e preparazioni creative in cucina. Ricca di vitamine e antiossidanti, è la scelta ideale per chi cerca un frutto sano, genuino e naturalmente dolce. Ambrosia: un\'esperienza di dolcezza e croccantezza che porta il meglio della natura sulla tua tavola.'
        },
        { 
          id: 5, 
          name: 'Fuji', 
          origin: 'Italia', 
          price: '2.50', 
          unit: 'kg', 
          available: true,
          image: '/images/products/fuji.jpg',
          description: 'Mela Fuji: dolcezza intensa e croccantezza in ogni morso. Con la sua polpa soda, succosa e aromaticamente zuccherina, la Fuji è una delle mele più amate per il gusto deciso e persistente. La buccia, liscia e dai toni rosso sfumato con giallo, nasconde un frutto versatile, ideale sia da consumare fresco che in insalate, dolci, dessert o preparazioni al forno. Ricca di vitamine e antiossidanti naturali, la Fuji è perfetta per chi cerca un frutto sano, gustoso e adatto a tutta la famiglia. Fuji: croccante, dolce e irresistibile, la mela che rende ogni momento speciale.'
        },
        { 
          id: 6, 
          name: 'Red Delicious', 
          origin: 'Italia', 
          price: '2.30', 
          unit: 'kg', 
          available: true,
          image: '/images/products/red-delicious.jpg',
          description: 'Red Delicious: la mela dal gusto dolce e delicato, dall\'inconfondibile buccia rosso intenso e brillante. La sua polpa croccante e succosa la rende perfetta da gustare fresca, in spuntini o macedonie, portando un tocco di colore e dolcezza naturale sulla tua tavola. Grazie al suo sapore equilibrato e alla consistenza soda, la Red Delicious è ideale anche per piatti leggeri e dessert, rappresentando la scelta sana e genuina per tutta la famiglia. Red Delicious: dolcezza, croccantezza e bellezza in ogni morso.'
        },
        { 
          id: 7, 
          name: 'Granny Smith', 
          origin: 'Italia', 
          price: '2.40', 
          unit: 'kg', 
          available: true,
          image: '/images/products/granny-smith.jpg',
          description: 'Granny Smith: la mela dal gusto fresco, acidulo e vivace, dal caratteristico colore verde brillante. La sua polpa croccante e succosa offre un equilibrio perfetto tra acidità e dolcezza naturale, rendendola ideale da gustare fresca, in insalate, dessert o preparazioni al forno. Ricca di vitamine e antiossidanti, la Granny Smith è perfetta per chi cerca un frutto sano, rinfrescante e dal sapore deciso, capace di dare carattere a ogni piatto. Granny Smith: freschezza, croccantezza e gusto inconfondibile in ogni morso.'
        },
        { 
          id: 8, 
          name: 'Annurca', 
          origin: 'Italia', 
          price: '2.40', 
          unit: 'kg', 
          available: true,
          image: '/images/products/annurca.jpg',
          description: 'La Mela Annurca è un frutto tipico italiano, di piccole dimensioni, con buccia rosso brillante e polpa croccante e dolce-acidula. Perfetta da gustare fresca, in macedonie o dessert, è apprezzata per il suo sapore unico e aromatico. Ricca di vitamine e fibre, la mela Annurca fresca e di stagione garantisce qualità e genuinità direttamente dal produttore al tuo banco.'
        },
        { 
          id: 9, 
          name: 'Kissabel', 
          origin: 'Italia', 
          price: '4.50', 
          unit: 'kg', 
          available: true,
          image: '/images/products/kissabel.jpg',
          description: 'La mela Kissabel è un frutto tipico italiano, di piccole dimensioni, con buccia rosso brillante e polpa croccante e dolce-acidula. Perfetta da gustare fresca, in macedonie o dessert, è apprezzata per il suo sapore unico e aromatico. Ricca di vitamine e fibre, la mela Kissabel fresca e di stagione garantisce qualità e genuinità direttamente dal produttore al tuo banco.'
        },
        { 
          id: 76, 
          name: 'Williams', 
          origin: 'Italia', 
          price: '2.70', 
          unit: 'kg', 
          available: true,
          image: '/images/products/williams.jpg',
          description: 'Pera Williams: il simbolo della dolcezza e della succosità. Con la sua polpa morbida, succosa e profumata e la buccia sottile di colore verde-giallo, talvolta sfumata di rosso, la Williams è perfetta da gustare fresca, in macedonie, dolci o preparazioni al forno. Ricca di vitamine, fibre e antiossidanti naturali, è un frutto sano, genuino e versatile, ideale per tutta la famiglia. Williams: dolcezza naturale e profumo intenso in ogni morso.'
        },
        { 
          id: 10, 
          name: 'Abate Fetel', 
          origin: 'Italia', 
          price: '2.80', 
          unit: 'kg', 
          available: true,
          image: '/images/products/abate-fetel.jpg',
          description: 'Pera Abate Fetel: dolcezza elegante e polpa succosa in ogni morso. Dalla forma allungata e slanciata, con buccia liscia e color giallo dorato, la Abate Fetel è famosa per il suo aroma delicato e il sapore naturalmente zuccherino. Perfetta da gustare fresca, in macedonie o dessert, mantiene anche consistenza e gusto nelle preparazioni al forno. Ricca di vitamine e fibre naturali, è una scelta sana e genuina per tutta la famiglia. Abate Fetel: dolcezza, morbidezza e profumo inconfondibile, un classico della frutta italiana.'
        },
        { 
          id: 11, 
          name: 'Kaiser', 
          origin: 'Italia', 
          price: '2.60', 
          unit: 'kg', 
          available: true,
          image: '/images/products/pera-kaiser.jpg',
          description: 'Pera Kaiser: dolcezza delicata e polpa croccante in ogni morso. La sua buccia liscia, dal verde chiaro leggermente sfumato di rosso, nasconde un frutto versatile e saporito, ideale da gustare fresco o in preparazioni al forno, dolci e macedonie. Ricca di vitamine e antiossidanti naturali, la Kaiser unisce gusto e qualità, rendendola perfetta per chi cerca un frutto sano, genuino e dal sapore equilibrato. Kaiser: croccantezza, dolcezza e freschezza in ogni morso.'
        },
        { 
          id: 12, 
          name: 'Decana', 
          origin: 'Italia', 
          price: '2.50', 
          unit: 'kg', 
          available: true,
          image: '/images/products/decana.jpg',
          description: 'Pera Decana: dolcezza intensa e polpa succosa in ogni morso. La sua forma rotonda e compatta, con buccia liscia dal colore giallo-verde, racchiude un frutto dal sapore equilibrato e aromatico. Perfetta da gustare fresca, in macedonie o dessert, mantiene consistenza e gusto anche nelle preparazioni al forno. Ricca di vitamine, fibre e antiossidanti naturali, la Decana è un frutto sano, genuino e versatile, ideale per tutta la famiglia. Decana: dolcezza, morbidezza e aroma inconfondibile, un classico della frutta italiana.'
        },
        { 
          id: 13, 
          name: 'Kiwi Giallo', 
          origin: 'Italia', 
          price: '4.20', 
          unit: 'kg', 
          available: true,
          image: '/images/products/kiwi-giallo.jpg',
          description: 'Kiwi Giallo: dolcezza esotica e polpa morbida in ogni morso. Con il suo colore dorato brillante e il sapore naturalmente zuccherino, il kiwi giallo è perfetto da gustare fresco, in macedonie, smoothie o dessert. Ricco di vitamine, in particolare vitamina C, minerali e antiossidanti naturali, è un frutto sano, nutriente e ideale per chi cerca freschezza e energia in ogni momento della giornata. Kiwi Giallo: gusto dolce, polpa succosa e vitalità naturale, direttamente dalla natura alla tua tavola.'
        },
        { 
          id: 14, 
          name: 'Kiwi Verde', 
          origin: 'Italia', 
          price: '3.20', 
          unit: 'kg', 
          available: true,
          image: '/images/products/kiwi-verde.jpg',
          description: 'Kiwi Verde: freschezza e sapore inconfondibili in ogni morso. Con la sua polpa verde brillante, succosa e leggermente acidula, il kiwi verde è perfetto da gustare fresco, in macedonie, smoothie o dessert. Ricco di vitamina C, fibre e antiossidanti naturali, è un frutto sano e nutriente, ideale per chi cerca energia e vitalità in modo naturale. Kiwi Verde: gusto deciso, freschezza e benessere direttamente dalla natura alla tua tavola.'
        },
        { 
          id: 62, 
          name: 'Fragole', 
          origin: 'Italia', 
          price: '3.50', 
          unit: 'pz', 
          available: true,
          image: '/images/products/Fragole.jpg',
          description: 'Fragole italiane profumate e dolcissime, coltivate con cura. Il loro colore rosso brillante e il profumo intenso le rendono irresistibili. Perfette da gustare al naturale, con panna, o per preparare dolci e macedonie. Ricche di vitamina C e antiossidanti, sono un concentrato di benessere e gusto.'
        },
        {
          id: 80,
          name: 'Mirtilli',
          origin: 'Emilia Romagna',
          price: '3.20',
          unit: 'kg',
          available: true,
          image: '/images/products/mirtilli.jpg',
          description: 'Mirtilli: mirtilli sono un frutto di stagione, dal sapore deciso e profumato. Ideale da consumare crudo in spuntini o insalate, è perfetto anche come base per dolci e dessert. Ricche di fibre e sali minerali, i mirtilli freschi e di stagione garantisce qualità e genuinità direttamente dal campo al tuo banco.'
        },
        {
          id: 81,
          name: 'More',
          origin: 'Emilia Romagna',
          price: '3.20',
          unit: 'kg',
          available: true,
          image: '/images/products/more.jpg',
          description: 'More: more sono un frutto di stagione, dal sapore deciso e profumato. Ideale da consumare crudo in spuntini o insalate, è perfetto anche come base per dolci e dessert. Ricche di fibre e sali minerali, i more freschi e di stagione garantisce qualità e genuinità direttamente dal campo al tuo banco.'
        },
        {
          id: 82,
          name: 'Lamponi',
          origin: 'Emilia Romagna',
          price: '3.20',
          unit: 'kg',
          available: true,
          image: '/images/products/lamponi.jpg',
          description: 'Lamponi: lamponi sono un frutto di stagione, dal sapore deciso e profumato. Ideale da consumare crudo in spuntini o insalate, è perfetto anche come base per dolci e dessert. Ricche di fibre e sali minerali, i lamponi freschi e di stagione garantisce qualità e genuinità direttamente dal campo al tuo banco.'
        },
        { 
          id: 19, 
          name: 'Arancia Navel', 
          origin: 'Sicilia', 
          price: '2.00', 
          unit: 'kg', 
          available: true,
          image: '/images/products/navel.jpg',
          description: 'Arancia Navel: dolcezza, freschezza e succosità in ogni fetta. L\'arancia Navel, con la sua polpa succosa, di colore arancio brillante e senza semi, è perfetta da gustare fresca, in macedonie, dessert o spremute naturali. Dal gusto naturalmente dolce e aromatico, è ricca di vitamina C e antiossidanti, ideale per chi cerca un frutto genuino, sano e ricco di energia. Navel: colore intenso, dolcezza equilibrata e freschezza naturale direttamente sulla tua tavola.'
        },
        { 
          id: 21, 
          name: 'Mandarino', 
          origin: 'Calabria', 
          price: '2.80', 
          unit: 'kg', 
          available: true,
          image: '/images/products/mandarino.jpg',
          description: 'Mandarino: dolcezza e freschezza in ogni spicchio. Il mandarino, con la sua buccia sottile e facile da sbucciare, racchiude una polpa succosa, aromatica e naturalmente dolce, ideale da gustare fresco, in macedonie, dolci o spremute. Ricco di vitamina C e antiossidanti naturali, è un frutto sano, leggero e nutriente, perfetto per chi cerca gusto e vitalità in ogni momento della giornata. Mandarino: praticità, dolcezza e freschezza naturale direttamente sulla tua tavola.'
        },
        { 
          id: 25, 
          name: 'Limoni', 
          origin: 'Italia', 
          price: '2.80', 
          unit: 'kg', 
          available: true,
          image: '/images/products/limoni.jpeg',
          description: 'Pera: dolcezza e freschezza in ogni morso. Con la sua polpa succosa, aromatica e naturalmente zuccherina, la pera è un frutto versatile, ideale da gustare fresco, in macedonie, dolci o spremute naturali. Ricca di vitamine e antiossidanti naturali, è un frutto sano e nutriente, perfetto per chi cerca gusto e vitalità in ogni momento della giornata. Pera: dolcezza, freschezza e benessere naturale direttamente sulla tua tavola.'
        },
        { 
          id: 26, 
          name: 'Limoni a Buccia Edibile', 
          origin: 'Italia', 
          price: '2.80', 
          unit: 'kg', 
          available: true,
          image: '/images/products/limoni-edibili.jpg',
          description: 'Limoni a buccia edibile: freschezza, aroma e versatilità in un solo frutto. Con la loro buccia sottile e commestibile, i limoni a buccia edibile offrono un gusto intenso e profumato, ideale per spremute, insalate, dolci, piatti gourmet e decorazioni. Ricchi di vitamina C e antiossidanti naturali, sono un frutto sano, genuino e pratico, perfetto per chi ama sapore e benessere in cucina senza sprechi. Limoni a buccia edibile: aroma intenso, freschezza naturale e gusto versatile direttamente sulla tua tavola.'
        },
        {
          id: 84,
          name: 'Uva Senza Semi Bianca',
          origin: 'Puglia',
          price: '3.50', 
          unit: 'kg', 
          available: true,
          image: '/images/products/uva-bianca-senza-semi.jpg',
          description: 'Uva Senza Semi Bianca: uva è un frutto di stagione, dal sapore deciso e profumato. Ideale da consumare crudo in spuntini o insalate, è perfetto anche come base per dolci e dessert. Ricche di fibre e sali minerali, i uva freschi e di stagione garantisce qualità e genuinità direttamente dal campo al tuo banco.'
         },
      ]
    },  
    {
      id: 'Frutta-Esotica',
      nome: 'Frutta Esotica',
      slug: 'frutta-esotica',
      descrizione: 'Frutta esotica',
      icon: '🍍',
      products: [
        { id: 109, 
          name: 'Banane', 
          origin: 'Ecuador', 
          price: '1.90', 
          unit: 'kg', 
          available: true,
          image: '/images/products/banane.jpg',
          description: 'Banana: banana è un frutto di stagione, dal sapore deciso e profumato. Ideale da consumare crudo in spuntini o insalate, è perfetto anche come base per dolci e dessert. Ricche di fibre e sali minerali, i banane freschi e di stagione garantisce qualità e genuinità direttamente dal campo al tuo banco.'
        },
        { 
          id: 110, 
          name: 'Ananas', 
          origin: 'Italia', 
          price: '18.90', 
          unit: 'kg', 
          available: true,
          image: '/images/products/Ananas.png',
          description: 'Ananas: ananas tropicale e succoso, dal sapore deciso e leggermente amarognolo. Ideale da consumare crudo in spuntini o insalate, è perfetto anche come base per dolci e dessert. Ricche di fibre e sali minerali, le ananas fresche e di stagione garantisce qualità e genuinità direttamente dal campo al tuo banco.'
        },
      
        {
        id: 111,
        name:'Mango',
        origin: 'Malesia',
        price: '18.90',
        unit: 'kg',
        available: true,
        image: '/images/products/mango.jpg',
        description: 'Mango: mango tropicale e succoso, dal sapore deciso e leggermente amarognolo. Ideale da consumare crudo in spuntini o insalate, è perfetto anche come base per dolci e dessert. Ricche di fibre e sali minerali, le mango fresche e di stagione garantiscono qualità e genuinità direttamente dal campo al tuo banco.'
      },
      {
        id: 112,
        name:'Frutto della passione',
        origin: 'Italia',
        price: '18.90',
        unit: 'kg',
        available: true,
        image: '/images/products/frutto-della-passione.jpg',
        description: 'Frutto della passione: frutto della passione tropicale e succoso, dal sapore deciso e leggermente amarognolo. Ideale da consumare crudo in spuntini o insalate, è perfetto anche come base per dolci e dessert. Ricche di fibre e sali minerali, le frutto della passione fresche e di stagione garantisce qualità e genuinità direttamente dal campo al tuo banco.'
      },
      {
        id: 113,
        name:'Avocado',
        origin: 'Messico',
        price: '2.50',
        unit: 'pz',
        available: true,
        image: '/images/products/avocado.jpg',
        description: 'I nostri avocado sono selezionati con cura per offrire un prodotto fresco, sano e dal gusto autentico. Coltivati in aree vocate e raccolti al giusto grado di maturazione, garantiscono polpa cremosa, sapore delicato e valori nutrizionali eccellenti. Ricchi di grassi buoni, vitamine e minerali, gli avocado sono ideali per una cucina sana e moderna: perfetti per insalate, smoothie, guacamole o piatti gourmet. Ogni frutto viene controllato attentamente per assicurare qualità, freschezza e conservazione ottimale dal campo alla tavola. Il nostro ortofrutticolo si impegna ogni giorno a offrire prodotti affidabili, rispettando la stagionalità e privilegiando fornitori che adottano pratiche sostenibili. Scegliere i nostri avocado significa portare in tavola benessere, gusto e naturalezza.'
      },
      {
        id: 114,
        name:'Cocco',
        origin: 'Italia',
        price: '1.90',
        unit: 'kg',
        available: true,
        image: '/images/products/cocco.jpg',
        description: 'Cocco Fresco e Naturale Il nostro cocco viene selezionato con attenzione per garantire freschezza, qualità e gusto autentico. Proveniente da coltivazioni controllate, è apprezzato per la sua polpa bianca e compatta, dal sapore delicato e naturalmente dolce, e per l’acqua di cocco fresca e dissetante. Ricco di sali minerali e nutrienti, il cocco è ideale per un’alimentazione equilibrata ed è perfetto sia per il consumo fresco che per l’utilizzo in cucina, in ricette dolci e salate. Ogni frutto viene accuratamente controllato per assicurare integrità, conservazione ottimale e standard elevati di qualità.'
      },
      {
        id: 115,
        name:'Pitaya Frutto del drago',
        origin: 'Messico',
        price: '2.50',
        unit: 'pz',
        available: true,
        image: '/images/products/frutto-del-drago.jpg',
        description: 'Pitaya Frutto del drago: pitaya tropicale e succoso, dal sapore deciso e leggermente amarognolo. Ideale da consumare crudo in spuntini o insalate, è perfetto anche come base per dolci e dessert. Ricche di fibre e sali minerali, le pitaya fresche e di stagione garantisce qualità e genuinità direttamente dal campo al tuo banco.'
      },
      {
        id: 116,
        name:'Litchi',
        origin: 'Cina',
        price: '2.50',
        unit: 'kg',
        available: true,
        image: '/images/products/litchi.jpg',
        description: 'Litchi: litchi tropicale e succoso, dal sapore deciso e leggermente amarognolo. Ideale da consumare crudo in spuntini o insalate, è perfetto anche come base per dolci e dessert. Ricche di fibre e sali minerali, le litchi fresche e di stagione garantisce qualità e genuinità direttamente dal campo al tuo banco.'
      },
      {
        id: 117,
        name:'Papaya',
        origin: 'Guatemala',
        price: '2.50',
        unit: 'pz',
        available: true,
        image: '/images/products/Papaya.jpg',
        description: 'Papaya: papaya tropicale e succoso, dal sapore deciso e leggermente amarognolo. Ideale da consumare crudo in spuntini o insalate, è perfetto anche come base per dolci e dessert. Ricche di fibre e sali minerali, le papaya fresche e di stagione garantisce qualità e genuinità direttamente dal campo al tuo banco.'
      },
      ]
    },
    {
      id: 'verdura',
      nome: 'Verdura',
      slug: 'verdura',
      descrizione: 'Verdura fuori stagione disponibile tutto l\'anno',
      icon: '🥬',
      products: [
          { 
          id: 29, 
          name: 'Broccoli', 
          origin: 'Italia', 
          price: '2.50', 
          unit: 'pz', 
          available: true,
          image: '/images/products/broccoli.jpg',
          description: 'Broccoli: gusto deciso e benessere naturale in ogni piatto. Con il loro colore verde intenso e la consistenza compatta, i broccoli sono un ortaggio ricco di proprietà nutritive, apprezzato per il sapore leggermente amarognolo e la grande versatilità in cucina. Ideali per contorni, primi piatti, vellutate e ricette salutari, sono ricchi di vitamine, fibre, sali minerali e antiossidanti naturali, perfetti per un\'alimentazione equilibrata. Broccoli: freschezza, qualità e salute direttamente dall\'orto alla tua tavola.'
        },
        { 
          id: 30, 
          name: 'Cavolfiore', 
          origin: 'Italia', 
          price: '2.20', 
          unit: 'kg', 
          available: true,
          image: '/images/products/cavolfiore.jpg',
          description: 'Cavolfiore: gusto delicato e versatilità in cucina. Con la sua infiorescenza compatta e il colore chiaro, il cavolfiore è un ortaggio invernale apprezzato per il sapore morbido e leggermente dolce. Perfetto per contorni, vellutate, gratin, primi piatti e preparazioni al forno, è ricco di vitamine, fibre e sali minerali, ideale per un\'alimentazione sana ed equilibrata. Cavolfiore: semplicità, genuinità e benessere direttamente dall\'orto alla tua tavola.'
        },
        {
          id: 33,
          name: 'Cavolo Romano',
          origin: 'Italia',
          price: '2.20',
          unit: 'kg',
          available: true,
          image: '/images/products/cavolo-romano.jpg',
          description: 'Cavolo Romano: gusto delicato e versatilità in cucina. Con la sua infiorescenza compatta e il colore verde intenso, il cavolo romano è un ortaggio invernale apprezzato per il sapore morbido e leggermente dolce. Perfetto per contorni, vellutate, gratin, primi piatti e preparazioni al forno, è ricco di vitamine, fibre e sali minerali, ideale per un\'alimentazione sana ed equilibrata. Cavolo Romano: semplicità, genuinità e benessere direttamente dall\'orto alla tua tavola.'
        },
        { 
          id: 34, 
          name: 'Cavolini di Bruxelles', 
          origin: 'Italia', 
          price: '2.20', 
          unit: 'kg', 
          available: true,
          image: '/images/products/cavolini di bruxelles1.jpg',
          description: 'Cavolini di Bruxelles: cavolini di Bruxelles sono piccoli ortaggi dal colore verde brillante e dalla consistenza compatta, dal sapore delicato con una leggera nota amarognola. Ottimi saltati in padella, al forno o lessati, sono ideali come contorno o ingrediente per piatti invernali. Ricchi di fibre, vitamine e sali minerali, i cavolini di Bruxelles freschi e di stagione garantiscono qualità e genuinità direttamente dal campo al tuo banco.'
        },
        { 
          id: 36, 
          name: 'Cavolo Cappuccio', 
          origin: 'Italia', 
          price: '1.60', 
          unit: 'kg', 
          available: true,
          image: '/images/products/cavolo-cappuccio.jpg',
          description: 'Il cavolo cappuccio è un ortaggio fresco di stagione, riconoscibile per la sua forma compatta e le foglie croccanti. Dal sapore delicato e leggermente dolce, è ideale sia per il consumo a crudo in insalata sia per la cottura in zuppe, contorni e piatti tradizionali. Ricco di fibre e naturalmente povero di calorie, è molto apprezzato per la sua versatilità in cucina e la buona conservabilità. Prodotto genuino, adatto all\'uso domestico e professionale.'
        },
        { 
          id: 37, 
          name: 'Finocchi', 
          origin: 'Italia', 
          price: '2.40', 
          unit: 'kg', 
          available: true,
          image: '/images/products/finocchi.jpg',
          description: 'Il finocchio è un ortaggio fresco e profumato, caratterizzato da un grumolo bianco e croccante e da un sapore delicato e aromatico. Ottimo da consumare crudo in insalata o pinzimonio, è ideale anche cotto in gratin, contorni e piatti leggeri. Ricco di fibre e naturalmente digeribile, il finocchio fresco e di stagione garantisce qualità e genuinità direttamente dal campo al tuo banco.'
        },
        { 
          id: 38, 
          name: 'Spinaci', 
          origin: 'Italia', 
          price: '2.40', 
          unit: 'kg', 
          available: true,
          image: '/images/products/spinaci.jpg',
          description: 'Gli spinaci sono verdure a foglia verde scuro, fresche e tenere, dal sapore delicato e leggermente erbaceo. Ideali sia crudi in insalata che cotti in zuppe, frittate o contorni, sono ricchi di vitamine, ferro e fibre, perfetti per una dieta sana ed equilibrata. Freschi e di stagione, gli spinaci del nostro banco garantiscono qualità e genuinità direttamente dalla terra alla tua tavola.'
        },
        { 
          id: 39, 
          name: 'Erbette', 
          origin: 'Italia', 
          price: '2.30', 
          unit: 'kg', 
          available: true,
          image: '/images/products/erbette.jpg',
          description: 'Le erbette sono verdure a foglia verde tenera, dal sapore delicato e leggermente dolce. Molto versatili in cucina, sono ideali per contorni, zuppe, ripieni, frittate e torte salate. Ricche di fibre, vitamine e sali minerali, le erbette fresche e di stagione garantiscono qualità e genuinità direttamente dal campo al tuo banco.'
        },
        { 
          id: 40, 
          name: 'Catalogna', 
          origin: 'Italia', 
          price: '2.50', 
          unit: 'kg', 
          available: true,
          image: '/images/products/catalogna.jpg',
          description: 'La catalogna è una verdura a foglia verde dal gusto deciso e leggermente amarognolo. Apprezzata sia cruda in insalata, soprattutto i germogli, sia cotta in contorni, zuppe e piatti tradizionali, è molto versatile in cucina. Ricca di fibre e sali minerali, la catalogna fresca e di stagione garantisce qualità e genuinità direttamente dal campo al tuo banco.'
        },
        { 
          id: 41, 
          name: 'Coste', 
          origin: 'Italia', 
          price: '2.20', 
          unit: 'kg', 
          available: true,
          image: '/images/products/coste.jpg',
          description: 'Le bietole sono coste a foglia verde dal gusto delicato e leggermente dolce, apprezzate sia crude in insalata sia cotte in zuppe, torte salate o contorni. Ricche di fibre, vitamine e sali minerali, le coste sono un alleato naturale per una dieta sana ed equilibrata. Fresche e di stagione, garantiscono qualità e genuinità direttamente dal campo alla tua tavola.'
        },
        { 
          id: 42, 
          name: 'Radicchio', 
          origin: 'Veneto', 
          price: '3.20', 
          unit: 'kg', 
          available: true,
          image: '/images/products/radicchio.jpg',
          description: 'Il radicchio è una verdura dal colore rosso intenso e dalle foglie croccanti, dal gusto leggermente amarognolo e aromatico. Perfetto da gustare crudo in insalate o grigliato, saltato in padella o nelle ricette tipiche della cucina italiana, aggiunge colore e sapore a ogni piatto. Ricco di fibre e antiossidanti, il radicchio fresco e di stagione è sinonimo di qualità e genuinità direttamente dal produttore al tuo banco.'
        },
        {
          id: 43, 
          name: 'Trevisana',
          origin: 'Italia',
          price: '2.50',
          unit: 'kg',
          available: true,
          image: '/images/products/trevisana.jpg',
          description: 'Trevisana: radicchio pregiato con colore rosso intenso e venature bianche, dal gusto leggermente amarognolo e aromatico. Croccante e saporita, ideale da consumare cruda in insalata oppure cotta alla griglia, in padella o nei risotti. Ricca di fibre e antiossidanti, la Trevisana fresca e di stagione garantisce qualità e genuinità direttamente dal campo al tuo banco. '
        },
        { id: 69, 
          name: 'Lattuga Trocadero', 
          origin: 'Locale', 
          price: '1.50', 
          unit: 'pz', 
          available: true,
          image: '/images/products/lattuga-trocadero.jpg',
          description: 'Lattuga: lattuga sono un ortaggio di stagione, dal sapore deciso e profumato. Ideale da consumare crudo in spuntini o insalate, è perfetto anche come base per dolci e dessert. Ricche di fibre e sali minerali, i lattuga freschi e di stagione garantisce qualità e genuinità direttamente dal campo al tuo banco.'
        },
        { 
          id: 44, 
          name: 'Lattuga Iceberg', 
          origin: 'Italia', 
          price: '1.80', 
          unit: 'kg', 
          available: true,
          image: '/images/products/iceberg.jpg',
          description: 'La lattuga iceberg è caratterizzata da una testa compatta e foglie croccanti di colore verde chiaro, dal sapore fresco e delicato. Perfetta per insalate croccanti, panini e piatti veloci, aggiunge leggerezza e freschezza a ogni preparazione. Ricca di acqua e fibre, è ideale per chi cerca un ortaggio sano, fresco e di stagione.'
        },
        { 
          id: 45, 
          name: 'Lattuga Romana', 
          origin: 'Italia', 
          price: '2.00', 
          unit: 'kg', 
          available: true,
          image: '/images/products/lattuga-romana.jpg',
          description: 'La lattuga romana è caratterizzata da foglie lunghe e croccanti, di colore verde brillante e dal sapore fresco e delicato. Ideale per insalate classiche, contorni leggeri e piatti freschi, è molto apprezzata per la sua consistenza e versatilità. Ricca di acqua e fibre, la lattuga romana fresca e di stagione garantisce qualità e genuinità direttamente dal campo al tuo banco.'
        },
        { 
          id: 46, 
          name: 'Lattuga Gentilina', 
          origin: 'Italia', 
          price: '1.90', 
          unit: 'kg', 
          available: true,
          image: '/images/products/lattuga-gentilina.jpg',
          description: 'La lattuga gentilina è una varietà dal colore verde intenso e dalle foglie morbide e leggermente croccanti. Dal sapore delicato e fresco, è perfetta per insalate, panini e contorni leggeri. Ricca di acqua e fibre, è ideale per chi cerca un ortaggio sano, fresco e di stagione, pronto da gustare in ogni occasione.'
        },
        { 
          id: 47, 
          name: 'Scarola', 
          origin: 'Italia', 
          price: '2.10', 
          unit: 'kg', 
          available: true,
          image: '/images/products/scarola.jpg',
          description: 'La scarola è un\'insalata a foglia larga e croccante, dal sapore delicato con una leggera nota amarognola. Ottima sia cruda in insalata sia cotta in contorni, zuppe e ricette tradizionali, è molto apprezzata per la sua versatilità in cucina. Ricca di fibre e acqua, la scarola fresca e di stagione garantisce qualità e genuinità direttamente dal campo al tuo banco.'
        },
        { id: 87,
          name: 'Pomodoro ramato',
          origin: 'Sicilia', 
          price: '2.50', 
          unit: 'kg', 
          available: true,
          image: '/images/products/pomodoro ramato.jpg',
          description: 'Pomodoro ramato: pomodoro ramato è un pomodoro di stagione, dal sapore deciso e profumato. Ideale da consumare crudo in spuntini o insalate, è perfetto anche come base per dolci e dessert. Ricche di fibre e sali minerali, i pomodori freschi e di stagione garantisce qualità e genuinità direttamente dal campo al tuo banco.'
       },
       {
        id: 118,
        name: 'Cuore di Bue',
        origin: 'Italia',
        price: '1.40',
        unit: 'pz',
        available: true,
        image: '/images/products/cuore-di-bue.jpeg',
        description: 'Cuore di Bue: cuore di bue sono un prodotto di stagione, dal sapore deciso e profumato. Ideale da consumare crudo in spuntini o insalate, è perfetto anche come base per dolci e dessert. Ricche di fibre e sali minerali, le cuore di bue fresche e di stagione garantisce qualità e genuinità direttamente dal campo al tuo banco.'
       },
       {
        id: 119,
        name: 'Pomodoro Marinda',
        origin: 'Italia',
        price: '1.40',
        unit: 'pz',
        available: true,
        image: '/images/products/pomodoro marinda.jpg',
        description: 'Pomodoro Marinda: pomodoro marinda sono un prodotto di stagione, dal sapore deciso e profumato. Ideale da consumare crudo in spuntini o insalate, è perfetto anche come base per dolci e dessert. Ricche di fibre e sali minerali, le pomodoro marinda fresche e di stagione garantisce qualità e genuinità direttamente dal campo al tuo banco.'
       },
       { id: 88, 
        name: 'Pomodorino Datterino',
        origin: 'Sicilia', 
        price: '2.50', 
        unit: 'kg', 
        available: true,
        image: '/images/products/pomodorini.jpg',
        description: 'Pomodoro ramato: pomodoro ramato è un pomodoro di stagione, dal sapore deciso e profumato. Ideale da consumare crudo in spuntini o insalate, è perfetto anche come base per dolci e dessert. Ricche di fibre e sali minerali, i pomodori freschi e di stagione garantisce qualità e genuinità direttamente dal campo al tuo banco.'
       },
        { id: 70, 
          name: 'Ravanelli', 
          origin: 'Italia', 
          price: '2.20', 
          unit: 'kg', 
          available: true,
          image: '/images/products/ravanelli.jpg',
          description: 'Ravanelli: ravanelli sono un ortaggio di stagione, dal sapore deciso e profumato. Ideale da consumare crudo in spuntini o insalate, è perfetto anche come base per dolci e dessert. Ricche di fibre e sali minerali, i ravanelli freschi e di stagione garantisce qualità e genuinità direttamente dal campo al tuo banco.'
        },
        { 
          id: 48, 
          name: 'Barbabietole', 
          origin: 'Italia', 
          price: '2.99', 
          unit: 'kg', 
          available: true,
          image: '/images/products/barbabietole.jpg',
          description: 'Le barbabietole sono ortaggi dalla polpa dolce e dal colore rosso intenso, con radice tondeggiante e foglie verdi nutrienti. Perfette cotte, al forno, in zuppe o insalate, aggiungono colore e gusto a ogni piatto. Ricche di vitamine, sali minerali e fibre, le barbabietole fresche e di stagione garantiscono qualità e genuinità direttamente dal campo al tuo banco.'
        },
        {
          id: 49, 
          name: 'Zucca',
          origin: 'Italia',
          price: '2.20',
          unit: 'kg',
          available: true,
          image: '/images/products/zucca.jpeg',
          description: 'La zucca è un ortaggio dal colore arancione intenso e dalla polpa dolce e carnosa. Versatile in cucina, è ideale per zuppe, vellutate, torte salate, dolci e contorni, donando sapore e colore a ogni piatto. Ricca di vitamine, fibre e antiossidanti, la zucca fresca e di stagione garantisce qualità e genuinità direttamente dal produttore al tuo banco.'
        }, 
        { id: 89, 
          name: 'Zucchine',
          origin: 'Italia', 
          price: '1.80',
          unit: 'kg', 
          available: true,
          image: '/images/products/zucchine.jpg',
          description: 'Zucchine: zucchine è un ortaggio di stagione, dal sapore deciso e profumato. Ideale da consumare crudo in spuntini o insalate, è perfetto anche come base per dolci e dessert. Ricche di fibre e sali minerali, i zucchine freschi e di stagione garantisce qualità e genuinità direttamente dal campo al tuo banco.'
       },
       { id: 90, 
         name: 'Melanzane', 
         origin: 'Sicilia', 
         price: '2.20', 
         unit: 'kg', 
         available: true,
         image: '/images/products/melanzane.jpeg',
         description: 'Melanzane: melanzane è un ortaggio di stagione, dal sapore deciso e profumato. Ideale da consumare crudo in spuntini o insalate, è perfetto anche come base per dolci e dessert. Ricche di fibre e sali minerali, i melanzane freschi e di stagione garantisce qualità e genuinità direttamente dal campo al tuo banco.'
       },
       { id: 91, 
         name: 'Peperoni gialli', 
         origin: 'Italia', 
         price: '2.80', 
         unit: 'kg', 
         available: true,
         image: '/images/products/peperone-giallo.jpeg',
         description: 'Peperoni gialli: peperoni gialli è un ortaggio di stagione, dal sapore deciso e profumato. Ideale da consumare crudo in spuntini o insalate, è perfetto anche come base per dolci e dessert. Ricche di fibre e sali minerali, i peperoni gialli freschi e di stagione garantisce qualità e genuinità direttamente dal campo al tuo banco.'
       },
       { id: 92, 
         name: 'Peperoni rossi', 
         origin: 'Italia', 
         price: '2.80', 
         unit: 'kg', 
         available: true,
         image: '/images/products/peperone-rosso.jpeg',
         description: 'Peperoni rossi: peperoni rossi è un ortaggio di stagione, dal sapore deciso e profumato. Ideale da consumare crudo in spuntini o insalate, è perfetto anche come base per dolci e dessert. Ricche di fibre e sali minerali, i peperoni rossi freschi e di stagione garantisce qualità e genuinità direttamente dal campo al tuo banco.'
       },
       { id: 93, 
         name: 'Cetrioli', 
         origin: 'Italia', 
         price: '1.50', 
         unit: 'kg', 
         available: true,
         image: '/images/products/cetrioli.jpg',
         description: 'Cetrioli: cetrioli è un ortaggio di stagione, dal sapore deciso e profumato. Ideale da consumare crudo in spuntini o insalate, è perfetto anche come base per dolci e dessert. Ricche di fibre e sali minerali, i cetrioli freschi e di stagione garantisce qualità e genuinità direttamente dal campo al tuo banco.'
       },
       { id: 94, 
         name: 'Fagiolini', 
         origin: 'Italia', 
         price: '3.50', 
         unit: 'kg', 
         available: true,
         image: '/images/products/cornetti.jpg',
         description: 'Fagiolini: fagiolini è un ortaggio di stagione, dal sapore deciso e profumato. Ideale da consumare crudo in spuntini o insalate, è perfetto anche come base per dolci e dessert. Ricche di fibre e sali minerali, i fagiolini freschi e di stagione garantisce qualità e genuinità direttamente dal campo al tuo banco.'
       },
        { 
          id: 50, 
          name: 'Carote', 
          origin: 'Italia', 
          price: '2.20', 
          unit: 'kg', 
          available: true,
          image: '/images/products/carote.jpg',
          description: 'Le carote sono ortaggi croccanti e dolci, dal caratteristico colore arancione brillante. Perfette da consumare crude in insalata, frullati o snack, e ottime cotte in zuppe, contorni e ricette tradizionali. Ricche di vitamine, in particolare vitamina A, e fibre, le carote fresche e di stagione garantiscono gusto, salute e genuinità direttamente dal campo al tuo banco.'
        },
        { 
          id: 51, 
          name: 'Carote Pacchetto', 
          origin: 'Italia', 
          price: '2.20', 
          unit: 'pz', 
          available: true,
          image: '/images/products/carote pacchetto.jpg',
          description: 'Carote Pacchetto: carote fresche e croccanti, dal caratteristico colore arancione brillante. Perfette da consumare crude in insalata, frullati o snack, e ottime cotte in zuppe, contorni e ricette tradizionali. Ricche di vitamine, in particolare vitamina A, e fibre, le carote fresche e di stagione garantiscono gusto, salute e genuinità direttamente dal campo al tuo banco.'
        },
        { 
          id: 52, 
          name: 'Carote Sfuse', 
          origin: 'Italia', 
          price: '2.20', 
          unit: 'kg', 
          available: true,
          image: '/images/products/Carote sfuse.jpg',
          description: 'Carote Sfuse: carote fresche e croccanti, dal caratteristico colore arancione brillante. Perfette da consumare crude in insalata, frullati o snack, e ottime cotte in zuppe, contorni e ricette tradizionali. Ricche di vitamine, in particolare vitamina A, e fibre, le carote fresche e di stagione garantiscono gusto, salute e genuinità direttamente dal campo al tuo banco.'
        },
        { 
          id: 53, 
          name: 'Patate Rosse', 
          origin: 'Italia', 
          price: '1.80', 
          unit: 'kg', 
          available: true,
          image: '/images/products/patate-rosse.jpg',
          description: 'Le patate rosse sono ortaggi dalla buccia sottile e dal colore rosso intenso, con polpa compatta e dal sapore delicato. Ideali per arrosti, bolliti, gratinati o fritte, mantengono bene la forma in cottura e regalano un gusto dolce e uniforme ai piatti. Ricche di fibre e nutrienti, le patate rosse fresche e di stagione sono sinonimo di qualità e genuinità direttamente dal produttore al tuo banco.'
        },
        {
          id: 54,
          name: 'Patate Bianche',
          origin: 'Italia',
          price: '2.20',
          unit: 'kg',
          available: true,
          image: '/images/products/patata-bianca.jpg',
          description: 'Patate Bianche: patate fresche e croccanti, dal caratteristico colore arancione brillante. Perfette da consumare crude in insalata, frullati o snack, e ottime cotte in zuppe, contorni e ricette tradizionali. Ricche di vitamine, in particolare vitamina A, e fibre, le patate fresche e di stagione garantiscono gusto, salute e genuinità direttamente dal campo al tuo banco.'
        },
        { 
          id: 55, 
          name: 'Patate Gialle', 
          origin: 'Italia', 
          price: '1.60', 
          unit: 'kg', 
          available: true,
          image: '/images/products/patate-gialle.jpg',
          description: 'Le patate gialle hanno una buccia sottile e una polpa dal colore dorato, dal gusto dolce e leggermente burroso. Perfette per arrosti, purè, gratin e cotture al forno, si prestano a molte preparazioni grazie alla loro consistenza cremosa. Ricche di fibre e nutrienti, le patate gialle fresche e di stagione garantiscono qualità e genuinità direttamente dal campo al tuo banco.'
        },
        {
          id: 56,
          name: 'Patate Sacchetto',
          origin: 'Italia',
          price: '2.20',
          unit: 'kg',
          available: true,
          image: '/images/products/patate-sacchetto.jpeg',
          description: 'Patate Sacchetto: patate fresche e croccanti, dal caratteristico colore arancione brillante. Perfette da consumare crude in insalata, frullati o snack, e ottime cotte in zuppe, contorni e ricette tradizionali. Ricche di vitamine, in particolare vitamina A, e fibre, le patate fresche e di stagione garantiscono gusto, salute e genuinità direttamente dal campo al tuo banco.'
        },
        {
          id: 120,
          name: 'Patate Dolce',
          origin: 'Italia',
          price: '2.20',
          unit: 'kg',
          available: true,
          image: '/images/products/patata-dolce.jpg',
          description: 'Patate Dolce: patate dolce fresche e croccanti, dal caratteristico colore arancione brillante. Perfette da consumare crude in insalata, frullati o snack, e ottime cotte in zuppe, contorni e ricette tradizionali. Ricche di vitamine, in particolare vitamina A, e fibre, le patate dolce fresche e di stagione garantiscono gusto, salute e genuinità direttamente dal campo al tuo banco.'
        },
        {
          id: 121,
          name:'Zenzero',
          origin: 'Italia',
          price: '2.40',
          unit: 'Kg',
          available: true,
          image: '/images/products/zenzero.jpeg',
          description: 'Zenzero: zenzero sono un prodotto di stagione, dal sapore deciso e profumato. Ideale da consumare crudo in spuntini o insalate, è perfetto anche come base per dolci e dessert. Ricche di fibre e sali minerali, le zenzero fresche e di stagione garantisce qualità e genuinità direttamente dal campo al tuo banco.'
        },
        { 
          id: 57, 
          name: 'Porri', 
          origin: 'Italia', 
          price: '2.60', 
          unit: 'kg', 
          available: true,
          image: '/images/products/porri.jpg',
          description: 'I porri sono ortaggi dal gambo lungo e bianco e dalle foglie verdi tenere, dal sapore delicato e leggermente dolce. Ideali per zuppe, minestre, frittate e contorni, conferiscono aroma e leggerezza a ogni preparazione. Ricchi di vitamine e minerali, i porri freschi e di stagione sono sinonimo di qualità e genuinità direttamente dal campo al tuo banco.'
        },
        {
          id: 122,
          name:'Cipolla Bianca',
          origin: 'Italia',
          price: '2.60',
          unit: 'kg',
          available: true,
          image: '/images/products/cipolla bianca.jpg',
        description: 'Cipolla Bianca: cipolla bianca fresca e succosa, dal sapore deciso e leggermente amarognolo. Ideale da consumare crudo in spuntini o insalate, è perfetto anche come base per dolci e dessert. Ricche di fibre e sali minerali, le cipolla bianca fresche e di stagione garantisce qualità e genuinità direttamente dal campo al tuo banco.'
        },
        {
          id: 123,
          name:'Cipolla Rossa',
          origin: 'Italia',
          price: '2.60',
          unit: 'kg',
          available: true,
          image: '/images/products/cipolla-rossa.jpg',
          description: 'Cipolla Rossa: cipolla rossa fresca e succosa, dal sapore deciso e leggermente amarognolo. Ideale da consumare crudo in spuntini o insalate, è perfetto anche come base per dolci e dessert. Ricche di fibre e sali minerali, le cipolla rossa fresche e di stagione garantisce qualità e genuinità direttamente dal campo al tuo banco.'
        },
        {
          id: 124,
          name:'Cipolla Dorata',
          origin: 'Italia',
          price: '2.60',
          unit: 'kg',
          available: true,
          image: '/images/products/cipolla dorata.jpg',
          description: 'Cipolla Dorata: cipolla dorata fresca e succosa, dal sapore deciso e leggermente amarognolo. Ideale da consumare crudo in spuntini o insalate, è perfetto anche come base per dolci e dessert. Ricche di fibre e sali minerali, le cipolla dorata fresche e di stagione garantisce qualità e genuinità direttamente dal campo al tuo banco.'
        },
        {
          id: 125,
          name:'Cipolla Tropea',
          origin: 'Italia',
          price: '2.60',
          unit: 'kg',
          available: true,
          image: '/images/products/cipolla-tropea.jpg',
          description: 'Cipolla Tropea: cipolla tropea fresca e succosa, dal sapore deciso e leggermente amarognolo. Ideale da consumare crudo in spuntini o insalate, è perfetto anche come base per dolci e dessert. Ricche di fibre e sali minerali, le cipolla tropea fresche e di stagione garantisce qualità e genuinità direttamente dal campo al tuo banco.'
        },
        {
          id: 126,
          name:'Scalogno',
          origin: 'Italia',
          price: '2.60',
          unit: 'kg',
          available: true,
          image: '/images/products/scalogno.jpg',
          description: 'Scalogno: scalogno fresca e succosa, dal sapore deciso e leggermente amarognolo. Ideale da consumare crudo in spuntini o insalate, è perfetto anche come base per dolci e dessert. Ricche di fibre e sali minerali, le scalogno fresche e di stagione garantisce qualità e genuinità direttamente dal campo al tuo banco.'
        },
        { 
          id: 58, 
          name: 'Aglio', 
          origin: 'Italia', 
          price: '6.00', 
          unit: 'kg', 
          available: true,
          image: '/images/products/aglio.jpg',
          description: 'L\'aglio è un bulbo aromatico, essenziale in cucina per insaporire ogni piatto con il suo gusto deciso e inconfondibile. Fresco e profumato, può essere utilizzato crudo, tritato o cotto, aggiungendo aroma a sughi, salse, zuppe e contorni. Ricco di proprietà benefiche per l\'organismo, l\'aglio fresco e di stagione garantisce qualità e genuinità direttamente dal produttore al tuo banco.'
        },
        { 
          id: 59, 
          name: 'Sedano', 
          origin: 'Italia', 
          price: '2.00', 
          unit: 'kg', 
          available: true,
          image: '/images/products/sedano.jpg',
          description: 'Il sedano è un ortaggio fresco e croccante, dal sapore aromatico e leggermente salato. Ideale da consumare crudo in pinzimonio o insalata, è perfetto anche come base per soffritti, zuppe e brodi. Ricco di acqua, fibre e sali minerali, il sedano fresco e di stagione garantisce qualità e genuinità direttamente dal campo al tuo banco.'
        },
        {
          id: 72,
          name: 'Rucola',
          origin: 'Italia',
          price: '2.20',
          unit: 'kg',
          available: true,
          image: '/images/products/rucola.jpg',
          description: 'Rucola: rucola sono un ortaggio di stagione, dal sapore deciso e profumato. Ideale da consumare crudo in spuntini o insalate, è perfetto anche come base per dolci e dessert. Ricche di fibre e sali minerali, i rucola freschi e di stagione garantisce qualità e genuinità direttamente dal campo al tuo banco.'
        },
        {
          id: 127,
          name: 'Fantasia Fine',
          origin: 'Italia',
          price: '1.40',
          unit: 'pz',
          available: true,
          image: '/images/products/fantasia fine.jpg',
          description: 'Fantasia Fine: fantasia fine sono un prodotto di stagione, dal sapore deciso e profumato. Ideale da consumare crudo in spuntini o insalate, è perfetto anche come base per dolci e dessert. Ricche di fibre e sali minerali, le fantasia fine fresche e di stagione garantisce qualità e genuinità direttamente dal campo al tuo banco.'
        },
        {
          id: 128,
          name: 'Fantasia Grossa',
          origin: 'Italia',
          price: '1.40',
          unit: 'pz',
          available: true,
          image: '/images/products/fantasia-grossa.jpg',
          description: 'Fantasia Grossa: fantasia grossa sono un prodotto di stagione, dal sapore deciso e profumato. Ideale da consumare crudo in spuntini o insalate, è perfetto anche come base per dolci e dessert. Ricche di fibre e sali minerali, le fantasia grossa fresche e di stagione garantisce qualità e genuinità direttamente dal campo al tuo banco.'
        },
        {
          id: 129,
          name: 'Mix di Insalate',
          origin: 'Italia',
          price: '1.40',
          unit: 'pz',
          available: true,
          image: '/images/products/bs mix di insalate.jpg',
          description: 'Mix di Insalate: mix di insalate sono un prodotto di stagione, dal sapore deciso e profumato. Ideale da consumare crudo in spuntini o insalate, è perfetto anche come base per dolci e dessert. Ricche di fibre e sali minerali, le mix di insalate fresche e di stagione garantisce qualità e genuinità direttamente dal campo al tuo banco.'
        },
        {
          id: 130,
          name: 'Novella',
          origin: 'Italia',
          price: '1.40',
          unit: 'pz',
          available: true,
          image: '/images/products/bs novella.jpg',
          description: 'Novella: novella sono un prodotto di stagione, dal sapore deciso e profumato. Ideale da consumare crudo in spuntini o insalate, è perfetto anche come base per dolci e dessert. Ricche di fibre e sali minerali, le novella fresche e di stagione garantisce qualità e genuinità direttamente dal campo al tuo banco.'
        },
        {
          id: 131,
          name: 'Valeriana',
          origin: 'Italia',
          price: '1.40',
          unit: 'pz',
          available: true,
          image: '/images/products/Valeriana.jpg',
          description: 'Valeriana: valeriana sono un prodotto di stagione, dal sapore deciso e profumato. Ideale da consumare crudo in spuntini o insalate, è perfetto anche come base per dolci e dessert. Ricche di fibre e sali minerali, le valeriana fresche e di stagione garantisce qualità e genuinità direttamente dal campo al tuo banco.'
        },
        {
          id: '38',
          name: 'Spinaci',
          origin: 'Italia',
          price: '1.40',
          unit: 'pz',
          available: true,
          image: '/images/products/spinaci.jpg',
          description: 'Spinaci: spinaci sono un prodotto di stagione, dal sapore deciso e profumato. Ideale da consumare crudo in spuntini o insalate, è perfetto anche come base per dolci e dessert. Ricche di fibre e sali minerali, le spinaci fresche e di stagione garantisce qualità e genuinità direttamente dal campo al tuo banco.'
        },
        {
          id: 132,
          name: 'Cicorino Misto',
          origin: 'Italia',
          price: '1.40',
          unit: 'pz',
          available: true,
          image: '/images/products/cicorino-misto.jpg',
          description: 'Cicorino Misto: cicorino misto sono un prodotto di stagione, dal sapore deciso e profumato. Ideale da consumare crudo in spuntini o insalate, è perfetto anche come base per dolci e dessert. Ricche di fibre e sali minerali, le cicorino misto fresche e di stagione garantisce qualità e genuinità direttamente dal campo al tuo banco.'
        },
        {
          id: 133,
          name: 'Cicoria Verde Fine',
          origin: 'Italia',
          price: '1.40',
          unit: 'pz',
          available: true,
          image: '/images/products/cicoria-verde-fine.jpg',
          description: 'Cicoria Verde Fine: cicoria verde fine sono un prodotto di stagione, dal sapore deciso e profumato. Ideale da consumare crudo in spuntini o insalate, è perfetto anche come base per dolci e dessert. Ricche di fibre e sali minerali, le cicoria verde fine fresche e di stagione garantisce qualità e genuinità direttamente dal campo al tuo banco.'
        },
        {
          id: 134,
          name: 'Minestrone',
          origin: 'Italia',
          price: '1.40',
          unit: 'pz',
          available: true,
          image: '/images/products/minestrone.jpg',
          description: 'Cicoria Verde Grossa: cicoria verde grossa sono un prodotto di stagione, dal sapore deciso e profumato. Ideale da consumare crudo in spuntini o insalate, è perfetto anche come base per dolci e dessert. Ricche di fibre e sali minerali, le cicoria verde grossa fresche e di stagione garantisce qualità e genuinità direttamente dal campo al tuo banco.'
        },
      ]
    },
    {
      id: 'frutta-secca',
      nome: 'Frutta Secca',
      slug: 'frutta-secca',
      descrizione: 'Frutta secca e semi di qualità',
      icon: '🌰',
      products: [
        { 
          id: 135, 
          name: 'Noci Naturali', 
          origin: 'Italia', 
          price: '1.90', 
          unit: 'kg', 
          available: true,
          image: '/images/products/Noci.jpg',
          description: 'Noci: noci croccanti e aromatiche, dal sapore deciso e leggermente amarognolo. Ideale da consumare crudo in spuntini o insalate, è perfetto anche come base per dolci e dessert. Ricche di fibre e sali minerali, le noci fresche e di stagione garantisce qualità e genuinità direttamente dal campo al tuo banco.'
        },
        { 
          id: 136, 
          name: 'Mandorle', 
          origin: 'Italia', 
          price: '1.90', 
          unit: 'kg', 
          available: true,
          image: '/images/products/Mandorle sgusciate.jpg',
          description: 'Mandorle sgusciate: mandorle croccanti e aromatiche, dal sapore deciso e leggermente amarognolo. Ideale da consumare crudo in spuntini o insalate, è perfetto anche come base per dolci e dessert. Ricche di fibre e sali minerali, le mandorle fresche e di stagione garantisce qualità e genuinità direttamente dal campo al tuo banco.'
        },
        { 
          id: 137, 
          name: 'Nocciole', 
          origin: 'Italia', 
          price: '1.90', 
          unit: 'kg', 
          available: true,
          image: '/images/products/nocciole.jpg',
          description: 'Nocciole: nocciole croccanti e aromatiche, dal sapore deciso e leggermente amarognolo. Ideale da consumare crudo in spuntini o insalate, è perfetto anche come base per dolci e dessert. Ricche di fibre e sali minerali, le nocciole fresche e di stagione garantisce qualità e genuinità direttamente dal campo al tuo banco.'
        },
        { 
          id: 138, 
          name: 'Pistacchi', 
          origin: 'Italia', 
          price: '1.90', 
          unit: 'kg', 
          available: true,
          image: '/images/products/pistacchi.jpg',
          description: 'Pistacchi: pistacchi croccanti e aromatiche, dal sapore deciso e leggermente amarognolo. Ideale da consumare crudo in spuntini o insalate, è perfetto anche come base per dolci e dessert. Ricche di fibre e sali minerali, le pistacchi fresche e di stagione garantisce qualità e genuinità direttamente dal campo al tuo banco.'
        },
        { 
          id: 139, 
          name: 'Castagne Secche', 
          origin: 'Italia', 
          price: '1.90', 
          unit: 'kg', 
          available: true,
          image: '/images/products/castagne secca.jpg',
          description: 'Castagne Secche: castagne secche sono frutti autunnali essiccati, dal sapore dolce e intenso e dalla polpa compatta. Perfette per essere reidratate e utilizzate in zuppe, dolci, creme o come snack salutare, conservano tutto il gusto e le proprietà nutritive delle castagne fresche. Ricche di fibre, vitamine e minerali, le castagne secche di qualità garantiscono genuinità direttamente dal produttore al tuo banco.'
        },
        {id: 140,
          name:'Noci Macadamia',
          origin: 'Australia',
          price: '1.90',
          unit: 'kg',
          available: true,
          image: '/images/products/Noci-Macadamia.jpg',
          description: 'Noci Macadamia: noci macadamia sono frutti autunnali essiccati, dal sapore dolce e intenso e dalla polpa compatta. Perfette per essere reidratate e utilizzate in zuppe, dolci, creme o come snack salutare, conservano tutto il gusto e le proprietà nutritive delle noci macadamia fresche. Ricche di fibre, vitamine e minerali, le noci macadamia di qualità garantisce genuinità direttamente dal produttore al tuo banco.'
        },
        {id: 141,
          name:'Arachidi',
          origin: 'Italia',
          price: '1.90',
          unit: 'kg',
          available: true,
          image: '/images/products/Arachidi1.jpg',
          description: 'Arachidi: arachidi sono frutti autunnali essiccati, dal sapore dolce e intenso e dalla polpa compatta. Perfette per essere reidratate e utilizzate in zuppe, dolci, creme o come snack salutare, conservano tutto il gusto e le proprietà nutritive delle arachidi fresche. Ricche di fibre, vitamine e minerali, le arachidi di qualità garantisce genuinità direttamente dal produttore al tuo banco.'
        },
        {
          id: 142,
          name:'Datteri',
          origin: 'Italia',
          price: '1.90',
          unit: 'kg',
          available: true,
          image: '/images/products/datteri.jpg',
          description: 'Datteri: datteri sono frutti autunnali essiccati, dal sapore dolce e intenso e dalla polpa compatta. Perfette per essere reidratate e utilizzate in zuppe, dolci, creme o come snack salutare, conservano tutto il gusto e le proprietà nutritive delle datteri fresche. Ricche di fibre, vitamine e minerali, le datteri di qualità garantisce genuinità direttamente dal produttore al tuo banco.'
        },
      ]
    },
    {
      id: 'prodotti-forno',
      nome: 'Prodotti da Forno',
      slug: 'prodotti-forno',
      descrizione: 'Pane e prodotti da forno artigianali',
      icon: '🥖',
      products: [
        { id: 143, 
          name: 'Grissini Artigianali Classici', 
          origin: 'Locale', 
          price: '3.50', 
          unit: 'Pz', 
          available: true,
          image: '/images/products/grissini-artigianali-classici.jpeg',
          description: 'Grissini Artigianali Classici: grissini artigianali classici sono un prodotto da forno artigianale, dal sapore deciso e profumato. Ideale da consumare crudo in spuntini o insalate, è perfetto anche come base per dolci e dessert. Ricche di fibre e sali minerali, i grissini artigianali classici freschi e di stagione garantisce qualità e genuinità direttamente dal campo al tuo banco.'
        },
        { id: 144,
          name: 'Grissini Artigianali Integrali', 
          origin: 'Locale', 
          price: '4.00', 
          unit: 'Pz', 
          available: true,
          image: '/images/products/grissini-artigianali-integrali.jpeg',
          description: 'Grissini Artigianali Integrali: grissini artigianali integral sono un prodotto da forno artigianale, dal sapore deciso e profumato. Ideale da consumare crudo in spuntini o insalate, è perfetto anche come base per dolci e dessert. Ricche di fibre e sali minerali, i grissini artigianali integral freschi e di stagione garantisce qualità e genuinità direttamente dal campo al tuo banco.'
        },
        { id: 145, 
          name: 'Crostini', 
          origin: 'Locale', 
          price: '4.00', 
          unit: 'Pz', 
          available: true,
          image: '/images/products/crostini.jpeg',
          description: 'Crostini: crostini sono un prodotto da forno artigianale, dal sapore deciso e profumato. Ideale da consumare crudo in spuntini o insalate, è perfetto anche come base per dolci e dessert. Ricche di fibre e sali minerali, i crostini freschi e di stagione garantisce qualità e genuinità direttamente dal campo al tuo banco.'
        },
        { id: 146, 
          name: 'Cereal Cracker', 
          origin: 'Locale', 
          price: '4.00', 
          unit: 'Pz', 
          available: true,
          image: '/images/products/cereal-cracker.jpeg',
          description: 'Cereal Cracker: cereal cracker sono un prodotto da forno artigianale, dal sapore deciso e profumato. Ideale da consumare crudo in spuntini o insalate, è perfetto anche come base per dolci e dessert. Ricche di fibre e sali minerali, i cereal cracker freschi e di stagione garantisce qualità e genuinità direttamente dal campo al tuo banco.'
        },
        {
          id: 147, 
          name: 'Focaccelle al Mais', 
          origin: 'Locale', 
          price: '4.00', 
          unit: 'Pz', 
          available: true,
          image: '/images/products/focaccella-al-mais.jpeg',
          description: 'Focaccelle al Mais: focaccelle al mais sono un prodotto da forno artigianale, dal sapore deciso e profumato. Ideale da consumare crudo in spuntini o insalate, è perfetto anche come base per dolci e dessert. Ricche di fibre e sali minerali, i focaccelle al mais freschi e di stagione garantisce qualità e genuinità direttamente dal campo al tuo banco.'
        },
        {
          id: 148, 
          name: 'Focaccine Mantovane', 
          origin: 'Locale', 
          price: '4.00', 
          unit: 'Pz', 
          available: true,
          image: '/images/products/focaccine-mantovane.jpeg',
          description: 'Focaccine Mantovane: focaccine mantovane sono un prodotto da forno artigianale, dal sapore deciso e profumato. Ideale da consumare crudo in spuntini o insalate, è perfetto anche come base per dolci e dessert. Ricche di fibre e sali minerali, i focaccine mantovane freschi e di stagione garantisce qualità e genuinità direttamente dal campo al tuo banco.'
        },
        {
          id: 149, 
          name: 'Taralli', 
          origin: 'Locale', 
          price: '4.00', 
          unit: 'Pz', 
          available: true,
          image: '/images/products/taralli.jpeg',
          description: 'Taralli: taralli sono un prodotto da forno artigianale, dal sapore deciso e profumato. Ideale da consumare crudo in spuntini o insalate, è perfetto anche come base per dolci e dessert. Ricche di fibre e sali minerali, i taralli freschi e di stagione garantisce qualità e genuinità direttamente dal campo al tuo banco.'
        },
        {
          id: 150, 
          name: 'Gallette di Mais', 
          origin: 'Locale', 
          price: '4.00', 
          unit: 'Pz', 
          available: true,
          image: '/images/products/gallette-di-mais.jpeg',
          description: 'Gallette di Mais: gallette di mais sono un prodotto da forno artigianale, dal sapore deciso e profumato. Ideale da consumare crudo in spuntini o insalate, è perfetto anche come base per dolci e dessert. Ricche di fibre e sali minerali, i gallette di mais freschi e di stagione garantisce qualità e genuinità direttamente dal campo al tuo banco.'
        },
        {
          id: 151, 
          name: 'Biscotti Aurora', 
          origin: 'Locale', 
          price: '4.00', 
          unit: 'Pz', 
          available: true,
          image: '/images/products/aurore.jpeg',
          description: 'Biscotti Aurora: biscotti aurora sono un prodotto da forno artigianale, dal sapore deciso e profumato. Ideale da consumare crudo in spuntini o insalate, è perfetto anche come base per dolci e dessert. Ricche di fibre e sali minerali, i biscotti aurora freschi e di stagione garantisce qualità e genuinità direttamente dal campo al tuo banco.'
        },
        {
          id: 152, 
          name: 'Treccia Pesca e Amaretto', 
          origin: 'Locale', 
          price: '4.00', 
          unit: 'Pz', 
          available: true,
          image: '/images/products/treccia-pesca-e-amaretto.jpeg',
          description: 'Treccia Pesca e Amaretto: treccia pesca e amaretto sono un prodotto da forno artigianale, dal sapore deciso e profumato. Ideale da consumare crudo in spuntini o insalate, è perfetto anche come base per dolci e dessert. Ricche di fibre e sali minerali, i treccia pesca e amaretto freschi e di stagione garantisce qualità e genuinità direttamente dal campo al tuo banco.'
        },
        {
          id: 153, 
          name: 'Fiocchi di sfoglia Frutti di bosco', 
          origin: 'Locale', 
          price: '4.00', 
          unit: 'Pz', 
          available: true,
          image: '/images/products/fiocchi-di-sfoglia-frutti-di-bosco.jpeg',
          description: 'Fiocchi di sfoglia Frutti di bosco: fiocchi di sfoglia frutti di bosco sono un prodotto da forno artigianale, dal sapore deciso e profumato. Ideale da consumare crudo in spuntini o insalate, è perfetto anche come base per dolci e dessert. Ricche di fibre e sali minerali, i fiocchi di sfoglia frutti di bosco freschi e di stagione garantisce qualità e genuinità direttamente dal campo al tuo banco.'
        },
        {
          id: 154, 
          name: 'Fiocchi di sfoglia Fragola', 
          origin: 'Locale', 
          price: '4.00', 
          unit: 'Pz', 
          available: true,
          image: '/images/products/fiocchi-di-sfoglia-fragola.jpeg',
          description: 'Fiocchi di sfoglia Fragola: fiocchi di sfoglia fragola sono un prodotto da forno artigianale, dal sapore deciso e profumato. Ideale da consumare crudo in spuntini o insalate, è perfetto anche come base per dolci e dessert. Ricche di fibre e sali minerali, i fiocchi di sfoglia fragola freschi e di stagione garantisce qualità e genuinità direttamente dal campo al tuo banco.'
        },
        {
          id: 155, 
          name: 'Frollino al Limone', 
          origin: 'Locale', 
          price: '4.00', 
          unit: 'Pz', 
          available: true,
          image: '/images/products/frollino-al-limone.jpeg',
          description: 'Frollino al Limone: frollino al limone sono un prodotto da forno artigianale, dal sapore deciso e profumato. Ideale da consumare crudo in spuntini o insalate, è perfetto anche come base per dolci e dessert. Ricche di fibre e sali minerali, i frollino al limone freschi e di stagione garantisce qualità e genuinità direttamente dal campo al tuo banco.'
        },
        {
          id: 156, 
          name: 'Farina Bramata di Mais', 
          origin: 'Locale', 
          price: '4.00', 
          unit: 'Pz', 
          available: true,
          image: '/images/products/farina-di-mais-bramata.jpeg',
          description: 'Farina Bramata di Mais: farina bramata di mais sono un prodotto da forno artigianale, dal sapore deciso e profumato. Ideale da consumare crudo in spuntini o insalate, è perfetto anche come base per dolci e dessert. Ricche di fibre e sali minerali, i farina bramata di mais freschi e di stagione garantisce qualità e genuinità direttamente dal campo al tuo banco.'
        },
      ]
    },
    {
      id: 'salami',
      nome: 'Salami',
      slug: 'salami',
      descrizione: 'Salumi e affettati selezionati',
      icon: '🥓',
      products: [
      
        { 
          id: 157, 
          name: 'Salame Nostrano', 
          origin: 'Italia', 
          price: '18.90', 
          unit: 'kg', 
          available: true,
          image: '/images/products/Salame Nostrano.jpg',
          description: 'Salame Nostrano: prodotto con carni scelte di suino italiano insaccato in budello naturale legato a mano in 2 pezzature. Pezzatura: 600 / 800  gr. -  900 / 1200 gr. Stagionatura: 90 gg. circa'
        },
      
        {
        id: 158,
        name:'Cacciatore',
        origin: 'Italia',
        price: '18.90',
        unit: 'kg',
        available: true,
        image: '/images/products/Salame Cacciatore.jpg',
        description: 'Cacciatore: prodotto con carni scelte di suino italiano insaccato in budello naturale legato a mano in 2 pezzature. Pezzatura: 210 / 230 gr - Stagionatura: 20-30 gg. circa'
      },
      ]
    },
    {
      id: 'formaggi',
      nome: 'Formaggi',
      slug: 'formaggi',
      descrizione: 'Formaggi freschi e stagionati',
      icon: '🧀',
      products: [
        {
          id: 159,
          name:'Mozzarella di Bufala',
          origin: 'Italia',
          price: '4.90',
          unit: 'pz',
          available: true,
          image: '/images/products/mozzarella di bufala.jpg',
          description: 'Mozzarella di Bufala: mozzarella di bufala fresca e succosa, dal sapore deciso e leggermente amarognolo. Ideale da consumare crudo in spuntini o insalate, è perfetto anche come base per dolci e dessert. Ricche di fibre e sali minerali, le mozzarella di bufala fresche e di stagione garantisce qualità e genuinità direttamente dal campo al tuo banco.'
        },
        {
          id: 160,
          name:'Mozzarella di Bufala - Bocconcini',
          origin: 'Italia',
          price: '4.90',
          unit: 'pz',
          available: true,
          image: '/images/products/bocconcini mozzarella di bufala.jpg',
          description: 'Mozzarella di Bufala - Bocconcini: mozzarella di bufala fresca e succosa, dal sapore deciso e leggermente amarognolo. Ideale da consumare crudo in spuntini o insalate, è perfetto anche come base per dolci e dessert. Ricche di fibre e sali minerali, le mozzarella di bufala fresche e di stagione garantisce qualità e genuinità direttamente dal campo al tuo banco.'
        },
        {
          id: 161,
          name:'Burrata',
          origin: 'Italia',
          price: '4.90',
          unit: 'pz',
          available: true,
          image: '/images/products/burrata.jpeg',
          description: 'Burrata: burrata fresca e succosa, dal sapore deciso e leggermente amarognolo. Ideale da consumare crudo in spuntini o insalate, è perfetto anche come base per dolci e dessert. Ricche di fibre e sali minerali, le burrata fresche e di stagione garantisce qualità e genuinità direttamente dal campo al tuo banco.'
        },
        {
          id: 162,
          name:'Formaggella di Malga',
          origin: 'Italia',
          price: '4.90',
          unit: 'pz',
          available: true,
          image: '/images/products/Formaggella di Malga.jpg',
          description: 'Formaggella di Malga: formaggella di malga fresca e succosa, dal sapore deciso e leggermente amarognolo. Ideale da consumare crudo in spuntini o insalate, è perfetto anche come base per dolci e dessert. Ricche di fibre e sali minerali, le formaggella di malga fresche e di stagione garantisce qualità e genuinità direttamente dal campo al tuo banco.'
        },
        
        {
          id: 163,
          name:'Formaggio Branzi',
          origin: 'Italia',
          price: '4.90',
          unit: 'kg',
          available: true,
          image: '/images/products/formaggio branzi.jpg',
          description: 'Formaggio Branzi: formaggio branzi fresco e succoso, dal sapore deciso e leggermente amarognolo. Ideale da consumare crudo in spuntini o insalate, è perfetto anche come base per dolci e dessert. Ricche di fibre e sali minerali, le formaggio branzi fresche e di stagione garantisce qualità e genuinità direttamente dal campo al tuo banco.'
        },
        {
            id: 164,
          name:'Taleggio',
          origin: 'Lombardia',
          price: '11.00',
          unit: 'kg',
          available: true,
          image: '/images/products/Taleggio.jpg',
          description: 'Taleggio: taleggio fresco e succoso, dal sapore deciso e leggermente amarognolo. Ideale da consumare crudo in spuntini o insalate, è perfetto anche come base per dolci e dessert. Ricche di fibre e sali minerali, le taleggio fresche e di stagione garantisce qualità e genuinità direttamente dal campo al tuo banco.'
        },
        {
          id: 165,
          name:'Stracchino Nostrano',
          origin: 'Italia',
          price: '4.90',
          unit: 'kg',
          available: true,
          image: '/images/products/Stracchino-nostrano-monte-bronzone.jpg',
          description: 'Stracchino Nostrano: stracchino nostrano fresco e succoso, dal sapore deciso e leggermente amarognolo. Ideale da consumare crudo in spuntini o insalate, è perfetto anche come base per dolci e dessert. Ricche di fibre e sali minerali, le stracchino nostrano fresche e di stagione garantisce qualità e genuinità direttamente dal campo al tuo banco.'
        },
        {
          id: 166,
          name:'Gorgonzola',
          origin: 'Italia',
          price: '4.90',
          unit: 'kg',
          available: true,
          image: '/images/products/gorgonzola.jpeg',
          description: 'Gorgonzola: gorgonzola fresco e succoso, dal sapore deciso e leggermente amarognolo. Ideale da consumare crudo in spuntini o insalate, è perfetto anche come base per dolci e dessert. Ricche di fibre e sali minerali, le gorgonzola fresche e di stagione garantisce qualità e genuinità direttamente dal campo al tuo banco.'
        },
        {
          id: 167,
          name:'Robiola Fresca',
          origin: 'Italia',
          price: '4.90',
          unit: 'kg',
          available: true,
          image: '/images/products/Robiola-fresca.jpg',
          description: 'Robiola Fresca: robiola fresca e succosa, dal sapore deciso e leggermente amarognolo. Ideale da consumare crudo in spuntini o insalate, è perfetto anche come base per dolci e dessert. Ricche di fibre e sali minerali, le robiola fresche e di stagione garantisce qualità e genuinità direttamente dal campo al tuo banco.'
        },
        {
          id: 168,
          name:'Camembert di Capra',
          origin: 'Italia',
          price: '4.90',
          unit: 'kg',
          available: true,
          image: '/images/products/Camembert-di-capra.jpg',
          description: 'Camembert di Capra: camembert di capra fresca e succosa, dal sapore deciso e leggermente amarognolo. Ideale da consumare crudo in spuntini o insalate, è perfetto anche come base per dolci e dessert. Ricche di fibre e sali minerali, le camembert di capra fresche e di stagione garantisce qualità e genuinità direttamente dal campo al tuo banco.'
        },
        {
          id: 169,
          name:'Formaggella di Capra',
          price: '4.90',
          unit: 'kg',
          available: true,
          image: '/images/products/Formaggella di capra.jpg',
          description: 'Formaggella di Capra: formaggella di capra fresca e succosa, dal sapore deciso e leggermente amarognolo. Ideale da consumare crudo in spuntini o insalate, è perfetto anche come base per dolci e dessert. Ricche di fibre e sali minerali, le formaggella di capra fresche e di stagione garantisce qualità e genuinità direttamente dal campo al tuo banco.'
        },
        {
          id: 170,
          name:'Formaggio di Capra',
          origin: 'Italia',
          price: '4.90',
          unit: 'kg',
          available: true,
          image: '/images/products/formaggio-di-capra.jpg',
          description: 'Formaggio di Capra: formaggio di capra fresca e succosa, dal sapore deciso e leggermente amarognolo. Ideale da consumare crudo in spuntini o insalate, è perfetto anche come base per dolci e dessert. Ricche di fibre e sali minerali, le formaggio di capra fresche e di stagione garantisce qualità e genuinità direttamente dal campo al tuo banco.'
        },
        {
          id: 171,
          name:'Toma',
          origin: 'Italia',
          price: '4.90',
          unit: 'kg',
          available: true,
          image: '/images/products/Toma.jpg',
          description: 'Toma: toma fresca e succosa, dal sapore deciso e leggermente amarognolo. Ideale da consumare crudo in spuntini o insalate, è perfetto anche come base per dolci e dessert. Ricche di fibre e sali minerali, le toma fresche e di stagione garantisce qualità e genuinità direttamente dal campo al tuo banco.'
        },
        {
          id: 172,
          name:'Blu di Capra',
          origin: 'Italia',
          price: '4.90',
          unit: 'kg',
          available: true,
          image: '/images/products/blu-di-capra.jpeg',
          description: 'Blu di Capra: blu di capra fresca e succosa, dal sapore deciso e leggermente amarognolo. Ideale da consumare crudo in spuntini o insalate, è perfetto anche come base per dolci e dessert. Ricche di fibre e sali minerali, le blu di capra fresche e di stagione garantisce qualità e genuinità direttamente dal campo al tuo banco.'
        },
        {
          id: 173,
          name:'Casera',
          origin: 'Italia',
          price: '4.90',
          unit: 'kg',
          available: true,
          image: '/images/products/Casera.jpeg',
          description: 'Casera: casera fresca e succosa, dal sapore deciso e leggermente amarognolo. Ideale da consumare crudo in spuntini o insalate, è perfetto anche come base per dolci e dessert. Ricche di fibre e sali minerali, le casera fresche e di stagione garantisce qualità e genuinità direttamente dal campo al tuo banco.'
        },
        {
          id: 174,
          name:'Camembert di Bufala',
          origin: 'Italia',
          price: '4.90',
          unit: 'kg',
          available: true,
          image: '/images/products/Camembert-di-bufala.jpg',
          description: 'Camembert di Bufala: camembert di bufala fresca e succosa, dal sapore deciso e leggermente amarognolo. Ideale da consumare crudo in spuntini o insalate, è perfetto anche come base per dolci e dessert. Ricche di fibre e sali minerali, le camembert di bufala fresche e di stagione garantisce qualità e genuinità direttamente dal campo al tuo banco.'
        },
        {
          id: 175,
          name:'Burro',
          origin: 'Italia',
          price: '4.90',
          unit: 'kg',
          available: true,
          image: '/images/products/Burro.jpg',
          description: 'Burro: Burro pastorizzato. Ottenuto dalle migliori panne di affioramento italiane. Dal punto di vista compositivo il burro deve avere un tenore minimo di grassi lattieri dell’80% ma inferiore al 90% e tenori massimi di acqua del 16% ed estratto secco no grasso lattiero del 2%.'
        }
      ]
    },
    {
      id: 'uova',
      nome: 'Uova',
      slug: 'uova',
      descrizione: 'Uova fresche da allevamenti selezionati',
      icon: '🥚',
      products: [
        { id: 176, 
          name: 'Uova (6pz)', 
          origin: 'Italia', 
          price: '2.50', 
          unit: 'conf', 
          available: true,
          image: '/images/products/uova-6pz.jpeg',
          description: 'Uova: uova fresche da allevamenti selezionati, dal sapore deciso e leggermente amarognolo. Ideale da consumare crudo in spuntini o insalate, è perfetto anche come base per dolci e dessert. Ricche di fibre e sali minerali, le uova fresche e di stagione garantisce qualità e genuinità direttamente dal campo al tuo banco.'
        },
        { id: 177, 
          name: 'Uova (4pz)', 
          origin: 'Italia', 
          price: '2.50', 
          unit: 'conf', 
          available: true,
          image: '/images/products/uova-4pz.jpeg',
          description: 'Uova: uova fresche da allevamenti selezionati, dal sapore deciso e leggermente amarognolo. Ideale da consumare crudo in spuntini o insalate, è perfetto anche come base per dolci e dessert. Ricche di fibre e sali minerali, le uova fresche e di stagione garantisce qualità e genuinità direttamente dal campo al tuo banco.'
        },
        ]
    }
  ])

  // Manteniamo la vecchia struttura categories per retrocompatibilità
  const categories = ref(categorieTuttoAnno.value)

  // Computed - Statistiche
  const productStats = computed(() => {
    // Conta prodotti stagionali
    let stagionaliCount = 0
    stagioni.value.forEach(stagione => {
      stagione.sottocategorie.forEach(cat => {
        stagionaliCount += cat.prodotti.length
      })
    })

    // Conta prodotti tutto l'anno
    let tuttoAnnoCount = 0
    categorieTuttoAnno.value.forEach(cat => {
      tuttoAnnoCount += cat.products.length
    })

    return {
      categories: categorieTuttoAnno.value.length + 4, // 4 stagioni
      total: stagionaliCount + tuttoAnnoCount,
      available: stagionaliCount + tuttoAnnoCount, // Assumiamo tutti disponibili per ora
      seasonal: stagionaliCount,
      yearRound: tuttoAnnoCount
    }
  })

  // Getters
  const getCategoryBySlug = (slug) => {
    return categories.value.find(cat => cat.slug === slug)
  }

  const getSeasonById = (seasonId) => {
    return stagioni.value.find(s => s.id === seasonId)
  }

  // Metodo per aggiornare i prodotti dal Listino
  const updateProductsFromListino = (updatedProducts) => {
    // Aggiorna prodotti stagionali
    stagioni.value.forEach(stagione => {
      stagione.sottocategorie.forEach(sottoCat => {
        // Rimuovi prodotti che non sono più nella lista aggiornata
        const existingIds = updatedProducts
          .filter(p => p.categoryId === sottoCat.id)
          .map(p => p.id)
        sottoCat.prodotti = sottoCat.prodotti.filter(prod => existingIds.includes(prod.id))
        
        // Aggiorna o aggiungi prodotti
        updatedProducts.forEach(updated => {
          if (updated.categoryId === sottoCat.id) {
            const existingIndex = sottoCat.prodotti.findIndex(p => p.id === updated.id)
            if (existingIndex !== -1) {
              // Aggiorna prodotto esistente
              const prod = sottoCat.prodotti[existingIndex]
              prod.name = updated.name
              prod.origin = updated.origin
              prod.price = String(updated.price) // Converti in stringa
              prod.unit = updated.unit
              prod.available = updated.available
              if (updated.image) prod.image = updated.image
              if (updated.description) prod.description = updated.description
            } else {
              // Aggiungi nuovo prodotto
              sottoCat.prodotti.push({
                id: updated.id,
                name: updated.name,
                origin: updated.origin,
                price: String(updated.price),
                unit: updated.unit,
                available: updated.available,
                image: updated.image || '/images/placeholder-product.jpg',
                description: updated.description || ''
              })
            }
          }
        })
      })
    })

    // Aggiorna prodotti tutto l'anno
    categorieTuttoAnno.value.forEach(cat => {
      // Rimuovi prodotti che non sono più nella lista aggiornata
      const existingIds = updatedProducts
        .filter(p => p.categoryId === cat.id)
        .map(p => p.id)
      cat.products = cat.products.filter(prod => existingIds.includes(prod.id))
      
      // Aggiorna o aggiungi prodotti
      updatedProducts.forEach(updated => {
        if (updated.categoryId === cat.id) {
          const existingIndex = cat.products.findIndex(p => p.id === updated.id)
          if (existingIndex !== -1) {
            // Aggiorna prodotto esistente
            const prod = cat.products[existingIndex]
            prod.name = updated.name
            prod.origin = updated.origin
            prod.price = String(updated.price) // Converti in stringa
            prod.unit = updated.unit
            prod.available = updated.available
            if (updated.image) prod.image = updated.image
            if (updated.description) prod.description = updated.description
          } else {
            // Aggiungi nuovo prodotto
            cat.products.push({
              id: updated.id,
              name: updated.name,
              origin: updated.origin,
              price: String(updated.price),
              unit: updated.unit,
              available: updated.available,
              image: updated.image || '/images/placeholder-product.jpg',
              description: updated.description || ''
            })
          }
        }
      })
    })

    // Salva anche in localStorage per persistenza
    localStorage.setItem('productsData', JSON.stringify({
      stagioni: stagioni.value,
      categorieTuttoAnno: categorieTuttoAnno.value
    }))
    
    console.log('✅ Prodotti aggiornati e salvati!')
  }

  // Carica dati salvati all'avvio
  const loadSavedData = () => {
    const savedData = localStorage.getItem('productsData')
    if (savedData) {
      const parsed = JSON.parse(savedData)
      if (parsed.stagioni) stagioni.value = parsed.stagioni
      if (parsed.categorieTuttoAnno) categorieTuttoAnno.value = parsed.categorieTuttoAnno
    }
  }

  // Carica dati all'inizializzazione
  loadSavedData()

  return {
    // State
    categories,
    stagioni,
    categorieTuttoAnno,
    
    // Computed
    productStats,
    
    // Getters
    getCategoryBySlug,
    getSeasonById,
    
    // Actions
    updateProductsFromListino,
    loadSavedData
  }
})
