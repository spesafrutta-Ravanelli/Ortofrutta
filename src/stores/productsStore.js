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
              description:'La mela Golden Delicious Melinda si distingue per il colore giallo dorato e la buccia sottile. La polpa è croccante, succosa e dal gusto naturalmente dolce e delicato. Coltivata nei frutteti di montagna del Trentino, è ideale sia per il consumo fresco sia per l’utilizzo in cucina, perfetta per dolci e preparazioni salate.'
            },
            { 
              id: 2, 
              name: 'Golden Delicious', 
              origin: 'Italia', 
              price: '2.40', 
              unit: 'kg', 
              available: true,
              image: '/images/products/golden-amelia.jpg',
              description: 'La mela Golden Delicious presenta una buccia giallo dorata e una polpa croccante e succosa. Il gusto è dolce e delicato, molto equilibrato. È una mela versatile, ideale per il consumo fresco e perfetta anche per l’utilizzo in cucina, sia per dolci sia per preparazioni salate.'
            },
            { 
              id: 3, 
              name: 'Renetta', 
              origin: 'Italia', 
              price: '2.20', 
              unit: 'kg', 
              available: true,
              image: '/images/products/renetta.jpg',
              description: 'La mela Renetta è una varietà classica dal gusto aromatico e acidulo, con polpa compatta. Ottima sia da mangiare fresca sia per preparazioni culinarie tradizionali.'
            },
            { 
              id: 4, 
              name: 'Ambrosia', 
              origin: 'Italia', 
              price: '2.60', 
              unit: 'kg', 
              available: true,
              image: '/images/products/ambrosia.jpg',
              description:'La mela Ambrosia si distingue per la buccia bicolore giallo-rossa e l’aspetto elegante. La polpa è molto croccante, succosa e dal gusto intensamente dolce, con leggere note aromatiche. È ideale per il consumo fresco, perfetta come snack e apprezzata anche dai bambini.'
            },
            { 
              id: 5, 
              name: 'Fuji', 
              origin: 'Italia', 
              price: '2.50', 
              unit: 'kg', 
              available: true,
              image: '/images/products/fuji.jpg',
              description: 'La mela Fuji presenta una buccia bicolore con fondo giallo e sovraccolore rosso. La polpa è molto croccante, compatta e succosa. Il gusto è dolce e aromatico, con un equilibrio piacevole. È ideale per il consumo fresco e adatta anche a preparazioni in cucina.'
            },
            { 
              id: 6, 
              name: 'Red Delicious', 
              origin: 'Italia', 
              price: '2.30', 
              unit: 'kg', 
              available: true,
              image: '/images/products/red-delicious.jpg',
              description:  'La mela Red Delicious si riconosce per la buccia rosso intenso e la forma allungata. La polpa è tenera e succosa, dal gusto dolce e delicato. È ideale per il consumo fresco ed è apprezzata per il suo aspetto elegante e il sapore equilibrato.'
            },
            { 
              id: 7, 
              name: 'Granny Smith', 
              origin: 'Italia', 
              price: '2.40', 
              unit: 'kg', 
              available: true,
              image: '/images/products/granny-smith.jpg',
              description: 'La mela Granny Smith si distingue per la buccia verde brillante e la polpa molto croccante e succosa. Il gusto è fresco, deciso e marcatamente acidulo. È ideale per il consumo fresco e particolarmente apprezzata in cucina, soprattutto per dolci e preparazioni salate.'
            },
            { 
              id: 8, 
              name: 'Annurca', 
              origin: 'Italia', 
              price: '2.40', 
              unit: 'kg', 
              available: true,
              image: '/images/products/annurca.jpg',
              description: 'La mela Annurca è una varietà tradizionale italiana, riconoscibile per la buccia rosso intenso con fondo verde. La polpa è compatta e croccante, dal gusto equilibrato, dolce con una piacevole nota acidula. È ideale per il consumo fresco ed è apprezzata per il suo profumo intenso e caratteristico.'
            },
            { 
              id: 9, 
              name: 'Kissabel', 
              origin: 'Italia', 
              price: '4.50', 
              unit: 'kg', 
              available: true,
              image: '/images/products/kissabel.jpg',
              description: 'La mela Kissabel, nota anche come mela fragola, ha una buccia rossa intensa con sfumature rosa e gialle. La polpa è croccante, succosa e dal gusto dolce con un leggero aroma fruttato che ricorda le fragole. È ideale per il consumo fresco e come snack goloso per tutta la famiglia.'
            },
            { 
              id: 10, 
              name: 'Abate Fetel', 
              origin: 'Italia', 
              price: '2.80', 
              unit: 'kg', 
              available: true,
              image: '/images/products/abate-fetel.jpg',
              description: 'La pera Abate Fetel si riconosce per la forma allungata e la buccia verde con sfumature giallo-rugginose. La polpa è bianca, fine, molto succosa e dal gusto dolce e aromatico. È ideale per il consumo fresco ed è apprezzata per l’elevata qualità e la sua eleganza.'
            },
            { 
              id: 11, 
              name: 'Kaiser', 
              origin: 'Italia', 
              price: '2.60', 
              unit: 'kg', 
              available: true,
              image: '/images/products/pera-kaiser.jpg',
              description: 'La pera Kaiser si distingue per la forma allungata, la buccia ruvida di colore marrone-ruggine e la polpa chiara, soda e profumata. Il gusto è dolce e aromatico, ideale per il consumo crudo, cotto, in dolci, macedonie e preparazioni da forno.'
            },
            { 
              id: 12, 
              name: 'Decana', 
              origin: 'Italia', 
              price: '2.50', 
              unit: 'kg', 
              available: true,
              image: '/images/products/decana.jpg',
              description: 'La pera Decana ha una buccia verde-gialla, talvolta con leggere sfumature rossastre. La polpa è soda, succosa e dal gusto dolce e aromatico, molto equilibrato. È ideale per il consumo fresco e ottima anche per dolci e preparazioni culinarie.'
            },
            { 
              id: 13, 
              name: 'Kiwi Giallo Zespri', 
              origin: 'Italia', 
              price: '4.20', 
              unit: 'kg', 
              available: true,
              image: '/images/products/kiwi-giallo.jpg',
              description: 'Il kiwi giallo si distingue per la buccia sottile e liscia di colore marrone chiaro e la polpa interna giallo dorato. La polpa è morbida, succosa e dal gusto dolce, meno acidulo rispetto al kiwi verde, con un aroma intenso e tropicale. È ideale per il consumo fresco, macedonie, smoothie e dolci.'
            },
            {
              id: 179,
              name: 'Kiwi Rosso',
              origin: 'Italia',
              price: '4.20',
              unit: 'kg',
              available: true,
              image: '/images/products/kiwi-rosso.jpeg',
              description: 'Il kiwi verde si caratterizza per la buccia marrone leggermente pelosa e la polpa verde brillante con piccoli semi neri. La polpa è morbida, succosa e dal gusto acidulo equilibrato, con aroma intenso e caratteristico. Ricco di vitamina C e antiossidanti, è ideale per il consumo fresco, macedonie, frullati, dessert e dolci. Nutriente e rinfrescante.'
            },
            { 
              id: 14, 
              name: 'Kiwi Verde Zespri', 
              origin: 'Italia', 
              price: '3.20', 
              unit: 'kg', 
              available: true,
              image: '/images/products/kiwi-verde.jpg',
              description: 'Il kiwi verde si caratterizza per la buccia marrone leggermente pelosa e la polpa verde brillante con piccoli semi neri. La polpa è morbida, succosa e dal gusto acidulo equilibrato, con aroma intenso e caratteristico. Ricco di vitamina C e antiossidanti, è ideale per il consumo fresco, macedonie, frullati, dessert e dolci. Nutriente e rinfrescante.'
            },
            { 
              id: 15, 
              name: 'Melograno', 
              origin: 'Italia', 
              price: '3.80', 
              unit: 'kg', 
              available: true,
              image: '/images/products/melograno.jpg',
              description: 'Il melograno si distingue per il frutto tondeggiante con buccia spessa di colore rosso intenso e i chicchi interni succosi e brillanti. Il gusto è dolce con una leggera nota acidula, ideale per il consumo fresco, in spremute, insalate, macedonie e come ingrediente decorativo.'
            },
            { 
              id: 16, 
              name: 'Cachi', 
              origin: 'Italia', 
              price: '3.50', 
              unit: 'kg', 
              available: true,
              image: '/images/products/cachi.jpg',
              description: 'Il cachi si distingue per la buccia liscia di colore arancione intenso e la polpa morbida e dolce quando maturo. Il gusto è zuccherino, aromatico e molto gradevole. È ideale per il consumo fresco, dolci, macedonie e frullati.'
            },
            { 
              id: 17, 
              name: 'Cachi Mela', 
              origin: 'Italia', 
              price: '3.50', 
              unit: 'kg', 
              available: true,
              image: '/images/products/cachi-mela.jpg',
              description: 'Il Cacomela è un frutto ibrido tra mela e cachi, con buccia liscia che può variare dal giallo-arancio al rosso tenue. La polpa è morbida, succosa e dolce, con un aroma delicato che ricorda entrambe le varietà. È ideale per il consumo fresco, dessert e frullati.'
            },
            { 
              id: 18, 
              name: 'Tarocco', 
              origin: 'Sicilia', 
              price: '2.20', 
              unit: 'kg', 
              available: true,
              image: '/images/products/tarocco.jpg',
              description: 'L\'arancia Tarocco si distingue per la buccia arancione intenso con sfumature rosse e la polpa succosa e dolce, leggermente acidula. Il gusto è aromatico e fresco, molto equilibrato. È ideale per il consumo fresco, spremute, macedonie e dolci.'
            },
            { 
              id: 19, 
              name: 'Arancia Navel', 
              origin: 'Sicilia', 
              price: '2.00', 
              unit: 'kg', 
              available: true,
              image: '/images/products/navel.jpg',
              description: 'Scopri la qualità premium di Arancia Navel. Un prodotto selezionato con cura per offrirti il miglior sapore e la massima freschezza.'
            },
            { 
              id: 20, 
              name: 'Tarocco da Spremuta', 
              origin: 'Sicilia', 
              price: '1.80', 
              unit: 'kg', 
              available: true,
              image: '/images/products/tarocco-spremuta.jpg',
              description: 'L\'arancia Tarocco da spremuta si distingue per la buccia arancione con sfumature rosse e la polpa molto succosa e dolce, leggermente acidula. Il gusto è fresco e aromatico, perfetto per spremute e succhi naturali, ma adatto anche al consumo fresco.'
            },
            { 
              id: 21, 
              name: 'Mandarino', 
              origin: 'Calabria', 
              price: '2.80', 
              unit: 'kg', 
              available: true,
              image: '/images/products/mandarino.jpg',
              description: 'Il mandarino si riconosce per la buccia sottile e facile da sbucciare, di colore arancione brillante, e la polpa succosa e dolce con note aromatiche. È ideale per il consumo fresco, macedonie, spremute e dolci.'
            },
            { 
              id: 22, 
              name: 'Mandarancio', 
              origin: 'Italia', 
              price: '2.90', 
              unit: 'kg', 
              available: true,
              image: '/images/products/mandarancio.jpg',
              description: 'Il mandarancio è un frutto ibrido tra mandarino e arancia, con buccia arancione brillante e polpa succosa, dolce e leggermente acidula. Il gusto è aromatico e equilibrato, ideale per il consumo fresco, spremute e macedonie.'
            },
            { 
              id: 23, 
              name: 'Pompelmo Rosa', 
              origin: 'Italia', 
              price: '2.50', 
              unit: 'kg', 
              available: true,
              image: '/images/products/pompelmo-rosa.jpg',
              description: 'Il pompelmo rosa si distingue per la buccia giallo-rosata e la polpa rosa brillante, succosa e leggermente acidula. Il gusto è fresco, aromatico e rinfrescante, ideale per il consumo fresco, spremute, macedonie e insalate.'
            },
            { 
              id: 24, 
              name: 'Bergamotto', 
              origin: 'Calabria', 
              price: '4.50', 
              unit: 'kg', 
              available: true,
              image: '/images/products/bergamotto.jpg',
              description: 'Il bergamotto è un agrume dalle straordinarie proprietà aromatiche, con una buccia gialla-verde e una polpa succosa e acidula. Il gusto è deciso, leggermente amaro con note floreali affascinanti. Utilizzato principalmente in profumeria e confetteria per l\'eccezionale profumo, è perfetto per aromatizzare tè, dolci e liquori. Tesoro della gastronomia meridionale.'
            },
            { 
              id: 25, 
              name: 'Limoni', 
              origin: 'Italia', 
              price: '2.80', 
              unit: 'kg', 
              available: true,
              image: '/images/products/limoni.jpeg',
              description: 'Il limone si distingue per la buccia gialla, liscia o leggermente rugosa, e la polpa succosa e acidula. Il gusto è fresco, aromatico e deciso, ideale per il consumo fresco, spremuto come succo o utilizzato in cucina per condimenti e preparazioni dolci e salate. Ricco di vitamina C e proprietà benefiche.'
            },
            { 
              id: 26, 
              name: 'Limoni a Buccia Edibile', 
              origin: 'Italia', 
              price: '2.80', 
              unit: 'kg', 
              available: true,
              image: '/images/products/limoni-edibili.jpg',
              description: 'Il limone a buccia edibile si distingue per la buccia sottile e liscia di colore giallo intenso, consumabile insieme alla polpa. La polpa è succosa e acidula, mentre la buccia aggiunge un aroma fresco e intenso. È ideale per il consumo fresco, spremute, cucina, dolci e bevande aromatizzate.'
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
              description: 'Il cavolo nero si distingue per le foglie lunghe, scure e rugose, di colore verde intenso, con un sapore leggermente amarognolo e aromatico. È ricco di vitamine e minerali, ideale per zuppe, minestre, insalate, saltati in padella o frullati verdi.'
            },
            { 
              id: 28, 
              name: 'Cavolo Verza', 
              origin: 'Italia', 
              price: '1.80', 
              unit: 'kg', 
              available: true,
              image: '/images/products/verza.jpg',
              description: 'Il cavolo verza si distingue per le foglie grandi, arricciate e di colore verde chiaro, con polpa compatta e croccante. Il gusto è delicato e leggermente dolce, ideale per zuppe, minestre, stufati, saltati in padella o insalate cotte.'
            },
            { 
              id: 29, 
              name: 'Broccoli', 
              origin: 'Italia', 
              price: '2.50', 
              unit: 'pz', 
              available: true,
              image: '/images/products/broccoli.jpg',
              description: 'I broccoli si distinguono per le cime compatte di colore verde intenso e i gambi croccanti. Il gusto è delicato e leggermente amarognolo, ideale per il consumo al vapore, saltati in padella, gratinati, zuppe o insalate cotte.'
            },
            { 
              id: 30, 
              name: 'Cavolfiore Bianco', 
              origin: 'Italia', 
              price: '2.20', 
              unit: 'kg', 
              available: true,
              image: '/images/products/cavolfiore.jpg',
              description: 'Il cavolfiore bianco si distingue per la testa compatta e tondeggiante di colore bianco e le foglie esterne verdi. Il gusto è delicato e leggermente dolce, ideale per il consumo al vapore, bollito, gratinato, in zuppe o insalate cotte.'
            },
            { 
              id: 31, 
              name: 'Cavolfiore Verde', 
              origin: 'Italia', 
              price: '2.20', 
              unit: 'kg', 
              available: true,
              image: '/images/products/cavolfiore-verde.jpeg',
              description: 'Il cavolfiore verde si distingue per la testa compatta di colore verde brillante e le foglie esterne verdi. Il gusto è delicato e leggermente dolce, ideale per il consumo al vapore, bollito, gratinato, in zuppe o insalate cotte.'
            },
            {
              id: 32, 
              name: 'Cavolfiore viola', 
              origin: 'Italia', 
              price: '1.60', 
              unit: 'kg', 
              available: true,
              image: '/images/products/cavolfiore-viola.jpg',
              description: 'Il cavolfiore viola si distingue per la testa compatta di colore viola intenso e le foglie esterne verdi. Il gusto è delicato e leggermente dolce, ideale per il consumo al vapore, bollito, gratinato, in zuppe o insalate cotte, aggiungendo un tocco di colore ai piatti.'
            },
            {
              id: 33,
              name: 'Cavolo Romano',
              origin: 'Italia',
              price: '2.20',
              unit: 'kg',
              available: true,
              image: '/images/products/cavolo-romano.jpg',
              description: 'Il cavolo romano si distingue per le foglie lunghe, rugose e di colore verde scuro, con un sapore leggermente amarognolo e aromatico. È ricco di vitamine e minerali, ideale per zuppe, minestre, saltati in padella o frullati verdi.'
            },
            { 
              id: 34, 
              name: 'Cavolini di Bruxelles', 
              origin: 'Italia', 
              price: '2.20', 
              unit: 'kg', 
              available: true,
              image: '/images/products/cavolini di bruxelles1.jpg',
              description: 'I cavolini di Bruxelles si distinguono per le piccole teste rotonde e compatte di colore verde, con foglie ben chiuse. Il gusto è leggermente amarognolo e aromatico, ideale per il consumo al vapore, bolliti, saltati in padella, gratinati o in zuppe.'
            },
            { 
              id: 35, 
              name: 'Cime di Rapa', 
              origin: 'Puglia', 
              price: '2.90', 
              unit: 'kg', 
              available: true,
              image: '/images/products/cime-di-rapa.jpeg',
              description: 'Le cime di rapa si distinguono per le foglie verdi, tenere e leggermente arricciate, con piccoli germogli e fiori. Il gusto è amarognolo e aromatico, ideale per il consumo saltate in padella, lessate, in zuppe o come contorno.'
            },
            { 
              id: 36, 
              name: 'Cavolo Cappuccio', 
              origin: 'Italia', 
              price: '1.60', 
              unit: 'kg', 
              available: true,
              image: '/images/products/cavolo-cappuccio.jpg',
              description: 'Il cavolo cappuccio si distingue per la testa compatta e rotonda con foglie lisce e croccanti di colore verde chiaro o violaceo a seconda della varietà. Il gusto è delicato e leggermente dolce, ideale per il consumo crudo in insalata, al vapore, bollito, in zuppe o stufati.'
            },
            { 
              id: 37, 
              name: 'Finocchi', 
              origin: 'Italia', 
              price: '2.40', 
              unit: 'kg', 
              available: true,
              image: '/images/products/finocchi.jpg',
              description: 'I finocchi si distinguono per il bulbo bianco compatto e le fronde verdi e aromatiche. Il gusto è dolce e delicatamente anice, ideale per il consumo crudo in insalata, al vapore, bollito, gratinato o in zuppe.'
            },
            { 
              id: 38, 
              name: 'Spinaci', 
              origin: 'Italia', 
              price: '2.40', 
              unit: 'kg', 
              available: true,
              image: '/images/products/spinaci.jpg',
              description: 'Gli spinaci si distinguono per le foglie verdi, tenere e carnose. Il gusto è delicato e leggermente erbaceo, ideale per il consumo crudo in insalata, al vapore, saltati in padella, frullati o in zuppe.'
            },
            { 
              id: 39, 
              name: 'Erbette', 
              origin: 'Italia', 
              price: '2.30', 
              unit: 'kg', 
              available: true,
              image: '/images/products/erbette.jpg',
              description: 'Le erbette si distinguono per le foglie verdi tenere e i gambi bianchi croccanti. Il gusto è delicato e leggermente dolce, ideale per il consumo al vapore, saltate in padella, in zuppe o frittate.'
            },
            { 
              id: 40, 
              name: 'Catalogna', 
              origin: 'Italia', 
              price: '2.50', 
              unit: 'kg', 
              available: true,
              image: '/images/products/catalogna.jpg',
              description: 'La catalogna si distingue per le foglie lunghe, sottili e frastagliate di colore verde scuro, con un gusto amarognolo e deciso. È ideale per il consumo saltata in padella, lessata, in zuppe o come contorno.'
            },
            { 
              id: 41, 
              name: 'Coste', 
              origin: 'Italia', 
              price: '2.20', 
              unit: 'kg', 
              available: true,
              image: '/images/products/coste.jpg',
              description: 'La catalogna si distingue per le foglie lunghe, sottili e frastagliate di colore verde scuro, con un gusto amarognolo e deciso. È ideale per il consumo saltata in padella, lessata, in zuppe o come contorno.'
            },
            { 
              id: 42, 
              name: 'Radicchio', 
              origin: 'Veneto', 
              price: '3.20', 
              unit: 'kg', 
              available: true,
              image: '/images/products/radicchio.jpg',
              description: 'Il radicchio si distingue per le foglie rosse o violacee con venature bianche, croccanti e leggermente amarognole. Il gusto è deciso e amarognolo, ideale per il consumo crudo in insalata, grigliato, al vapore o saltato in padella.'
            },
            {
              id: 43, 
              name: 'Trevisana',
              origin: 'Italia',
              price: '2.50',
              unit: 'kg',
              available: true,
              image: '/images/products/trevisana.jpg',
              description: 'La trevisana si distingue per le foglie lunghe, croccanti e di colore rosso intenso con venature bianche. Il gusto è amarognolo e deciso, ideale per il consumo crudo in insalata, grigliata, al vapore o saltata in padella.'
            },
            { 
              id: 44, 
              name: 'Lattuga Iceberg', 
              origin: 'Italia', 
              price: '1.80', 
              unit: 'kg', 
              available: true,
              image: '/images/products/iceberg.jpg',
              description: 'La lattuga Iceberg si distingue per la testa compatta e rotonda, con foglie croccanti di colore verde chiaro. Il gusto è delicato e fresco, ideale per il consumo crudo in insalate, panini, sandwich o come base per piatti freddi.'
            },
            { 
              id: 45, 
              name: 'Lattuga Romana', 
              origin: 'Italia', 
              price: '2.00', 
              unit: 'kg', 
              available: true,
              image: '/images/products/lattuga-romana.jpg',
              description: 'La lattuga romana si distingue per le foglie lunghe, croccanti e di colore verde intenso, con un cuore centrale compatto. Il gusto è fresco e leggermente dolce, ideale per il consumo crudo in insalate, panini, wrap o come base per piatti freddi.'
            },
            { 
              id: 46, 
              name: 'Lattuga Gentilina', 
              origin: 'Italia', 
              price: '1.90', 
              unit: 'kg', 
              available: true,
              image: '/images/products/lattuga-gentilina.jpg',
              description: 'La lattuga Gentilina si distingue per le foglie piccole, tenere e croccanti, di colore verde chiaro con sfumature rosate. Il gusto è delicato e dolce, ideale per il consumo crudo in insalate, panini, sandwich o come guarnizione colorata.'
            },
            { 
              id: 47, 
              name: 'Scarola', 
              origin: 'Italia', 
              price: '2.10', 
              unit: 'kg', 
              available: true,
              image: '/images/products/scarola.jpg',
              description: 'La scarola si distingue per le foglie larghe, leggermente ricce e di colore verde chiaro, con un gusto delicatamente amarognolo. È ideale per il consumo crudo in insalata, saltata in padella, in zuppe o come contorno.'
            },
            { 
              id: 48, 
              name: 'Barbabietole', 
              origin: 'Italia', 
              price: '2.99', 
              unit: 'kg', 
              available: true,
              image: '/images/products/barbabietole.jpg',
              description: 'La barbabietola si distingue per il tubero rotondo o allungato di colore rosso intenso e le foglie verdi commestibili. Il gusto è dolce e terroso, ideale per il consumo cotta, al vapore, arrosto, in insalate o frullati.'
            },
            {
              id: 49, 
              name: 'Zucca',
              origin: 'Italia',
              price: '2.20',
              unit: 'kg',
              available: true,
              image: '/images/products/zucca.jpeg',
              description: 'La zucca si distingue per la buccia dura di colore arancione, verde o grigio a seconda della varietà e la polpa interna arancione, dolce e compatta. Il gusto è delicato e leggermente dolce, ideale per il consumo al forno, in zuppe, risotti, puree e dolci.'
            },  
            { 
              id: 50, 
              name: 'Carote', 
              origin: 'Italia', 
              price: '2.20', 
              unit: 'kg', 
              available: true,
              image: '/images/products/carote.jpg',
              description: 'Le carote con il ciuffo si distinguono per la radice allungata di colore arancione brillante e le foglie verdi fresche attaccate. La polpa è croccante e dolce, con gusto delicato e naturale, ideale per il consumo crudo, cotto, in insalate, contorni e frullati.'
            },
            { 
              id: 51, 
              name: 'Carote Pacchetto', 
              origin: 'Italia', 
              price: '2.20', 
              unit: 'pz', 
              available: true,
              image: '/images/products/carote pacchetto.jpg',
              description: 'Le carote si distinguono per la radice allungata di colore arancione brillante e la polpa croccante e dolce. Il gusto è delicato e naturalmente zuccherino, ideale per il consumo crudo, cotto, in insalate, zuppe, contorni e frullati.'
            },
            { 
              id: 52, 
              name: 'Carote Sfuse', 
              origin: 'Italia', 
              price: '2.20', 
              unit: 'kg', 
              available: true,
              image: '/images/products/Carote sfuse.jpg',
              description: 'Le carote si distinguono per la radice allungata di colore arancione brillante e la polpa croccante e dolce. Il gusto è delicato e naturalmente zuccherino, ideale per il consumo crudo, cotto, in insalate, zuppe, contorni e frullati.'
            },
            { 
              id: 53, 
              name: 'Patate Rosse', 
              origin: 'Italia', 
              price: '1.80', 
              unit: 'kg', 
              available: true,
              image: '/images/products/patate-rosse.jpg',
              description: 'Le patate rosse si distinguono per la buccia liscia di colore rosso e la polpa chiara, compatta e soda. Il gusto è delicato e leggermente dolce, ideale per il consumo arrosto, al forno, lessate, in insalate e contorni.'
            },
            {
              id: 54,
              name: 'Patate Bianche',
              origin: 'Italia',
              price: '2.20',
              unit: 'kg',
              available: true,
              image: '/images/products/patata-bianca.jpg',
              description: 'Le patate bianche si distinguono per la buccia chiara e la polpa bianca, farinosa e morbida dopo la cottura. Il gusto è delicato e leggermente dolce, ideale per il consumo lessate, in puree, gnocchi, zuppe e contorni.'
            },
            { 
              id: 55, 
              name: 'Patate Gialle', 
              origin: 'Italia', 
              price: '1.60', 
              unit: 'kg', 
              available: true,
              image: '/images/products/patate-gialle.jpg',
              description: 'Le patate gialle si distinguono per la buccia chiara e la polpa gialla, compatta e soda. Il gusto è delicato e leggermente saporito, ideale per il consumo al forno, arrosto, in padella, lessate e come contorno.'
            },
            {
              id: 56,
              name: 'Patate Sacchetto',
              origin: 'Italia',
              price: '2.20',
              unit: 'kg',
              available: true,
              image: '/images/products/patate-sacchetto.jpeg',
              description: 'Le patate gialle in sacchetto da 2 kg si distinguono per la buccia chiara e la polpa gialla, compatta e soda. Il gusto è delicato e leggermente saporito, ideali per il consumo al forno, arrosto, in padella, lessate e come contorno.'
            },
            { 
              id: 57, 
              name: 'Porri', 
              origin: 'Italia', 
              price: '2.60', 
              unit: 'kg', 
              available: true,
              image: '/images/products/porri.jpg',
              description: 'Il porro si distingue per il fusto lungo e cilindrico di colore bianco nella parte inferiore e verde nella parte superiore. Il gusto è delicato e leggermente dolce, ideale per il consumo in zuppe, risotti, torte salate, saltato in padella o come contorno.'
            },
            { 
              id: 58, 
              name: 'Aglio', 
              origin: 'Italia', 
              price: '6.00', 
              unit: 'kg', 
              available: true,
              image: '/images/products/aglio.jpg',
              description: 'L’aglio si distingue per il bulbo bianco suddiviso in spicchi, con aroma intenso e caratteristico. Il gusto è pungente e aromatico, ideale per il consumo crudo, in soffritti, salse, zuppe, marinate e contorni.'
            },
            { 
              id: 59, 
              name: 'Sedano', 
              origin: 'Italia', 
              price: '2.00', 
              unit: 'kg', 
              available: true,
              image: '/images/products/sedano.jpg',
              description: 'Il sedano si distingue per i gambi croccanti di colore verde chiaro e le foglie aromatiche. Il gusto è fresco e leggermente amarognolo, ideale per il consumo crudo in insalate, centrifugati, zuppe, soffritti e contorni.'
            },
            {
              id: 60, 
              name: 'Carciofi Sardi',
              origin: 'Italia',
              price: '0.75',
              unit: 'pz',
              available: true,
              image: '/images/products/carciofi sardi ritratto.jpeg',
              description: 'I carciofi sardi si distinguono per le teste compatte con foglie carnose di colore verde chiaro, leggermente punteggiate di viola. Il gusto è delicato e leggermente amarognolo, ideale per il consumo al vapore, lessati, gratinati, in padella o sott’olio.'
            },
            {
              id: 61, 
              name: 'Mammole',
              origin: 'Italia',
              price: '2.20',
              unit: 'kg',
              available: true,
              image: '/images/products/mammole.jpg',
              description: 'I carciofi mammole si distinguono per le teste tonde e compatte con foglie carnose di colore verde chiaro. Il gusto è dolce e delicato, ideale per il consumo al vapore, lessati, gratinati, in padella o sott’olio.'
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
              description: 'La mela Golden Delicious Melinda si distingue per il colore giallo dorato e la buccia sottile. La polpa è croccante, succosa e dal gusto naturalmente dolce e delicato. Coltivata nei frutteti di montagna del Trentino, è ideale sia per il consumo fresco sia per l’utilizzo in cucina, perfetta per dolci e preparazioni salate.'
            },
            { 
              id: 3, 
              name: 'Renetta', 
              origin: 'Italia', 
              price: '2.20', 
              unit: 'kg', 
              available: true,
              image: '/images/products/renetta.jpg',
              description: 'La mela Renetta è una varietà classica dal gusto aromatico e acidulo, con polpa compatta. Ottima sia da mangiare fresca sia per preparazioni culinarie tradizionali.'
            },
            { 
              id: 5, 
              name: 'Fuji', 
              origin: 'Italia', 
              price: '2.50', 
              unit: 'kg', 
              available: true,
              image: '/images/products/fuji.jpg',
              description: 'La mela Fuji presenta una buccia bicolore con fondo giallo e sovraccolore rosso. La polpa è molto croccante, compatta e succosa. Il gusto è dolce e aromatico, con un equilibrio piacevole. È ideale per il consumo fresco e adatta anche a preparazioni in cucina.'
            },
            { 
              id: 7, 
              name: 'Granny Smith', 
              origin: 'Italia', 
              price: '2.40', 
              unit: 'kg', 
              available: true,
              image: '/images/products/granny-smith.jpg',
              description: 'La mela Granny Smith si distingue per la buccia verde brillante e la polpa molto croccante e succosa. Il gusto è fresco, deciso e marcatamente acidulo. È ideale per il consumo fresco e particolarmente apprezzata in cucina, soprattutto per dolci e preparazioni salate.'
            },
            { 
              id: 11, 
              name: 'Kaiser', 
              origin: 'Italia', 
              price: '2.60', 
              unit: 'kg', 
              available: true,
              image: '/images/products/pera-kaiser.jpg',
              description: 'La pera Kaiser si distingue per la forma allungata, la buccia ruvida di colore marrone-ruggine e la polpa chiara, soda e profumata. Il gusto è dolce e aromatico, ideale per il consumo crudo, cotto, in dolci, macedonie e preparazioni da forno.'
            },
            { 
              id: 12, 
              name: 'Decana', 
              origin: 'Italia', 
              price: '2.50', 
              unit: 'kg', 
              available: true,
              image: '/images/products/decana.jpg',
              description: 'La pera Decana ha una buccia verde-gialla, talvolta con leggere sfumature rossastre. La polpa è soda, succosa e dal gusto dolce e aromatico, molto equilibrato. È ideale per il consumo fresco e ottima anche per dolci e preparazioni culinarie.'
            },
            { 
              id: 13, 
              name: 'Kiwi Giallo', 
              origin: 'Italia', 
              price: '4.20', 
              unit: 'kg', 
              available: true,
              image: '/images/products/kiwi-giallo.jpg',
              description: 'Il kiwi giallo si distingue per la buccia sottile e liscia di colore marrone chiaro e la polpa interna giallo dorato. La polpa è morbida, succosa e dal gusto dolce, meno acidulo rispetto al kiwi verde, con un aroma intenso e tropicale. È ideale per il consumo fresco, macedonie, smoothie e dolci.'
            },
            { 
              id: 14, 
              name: 'Kiwi Verde', 
              origin: 'Italia', 
              price: '3.20', 
              unit: 'kg', 
              available: true,
              image: '/images/products/kiwi-verde.jpg',
              description: 'Il kiwi verde si caratterizza per la buccia marrone leggermente pelosa e la polpa verde brillante con piccoli semi neri. La polpa è morbida, succosa e dal gusto acidulo equilibrato, con aroma intenso e caratteristico. Ricco di vitamina C e antiossidanti, è ideale per il consumo fresco, macedonie, frullati, dessert e dolci. Nutriente e rinfrescante.'
            },

              { 
              id: 62, 
              name: 'Fragole', 
              origin: 'Italia', 
              price: '3.50', 
              unit: 'pz', 
              available: true,
              image: '/images/products/Fragole.jpg',
              description: 'La fragola si distingue per il colore rosso brillante e la polpa succosa e dolce, con un aroma intenso e caratteristico. È ideale per il consumo fresco, macedonie, dolci, frullati e marmellate.'
            },
            { 
              id: 63, 
              name: 'Ciliegie', 
              origin: 'Puglia', 
              price: '6.50', 
              unit: 'kg', 
              available: true,
              image: '/images/products/ciliegie.jpg',
              description: 'La ciliegia si distingue per il colore rosso brillante o scuro e la polpa succosa e dolce, con un aroma intenso e delicato. È ideale per il consumo fresco, dolci, macedonie, confetture e dessert.'
            },
            { 
              id: 64, 
              name: 'Nespole', 
              origin: 'Sicilia', 
              price: '3.20', 
              unit: 'kg', 
              available: true,
              image: '/images/products/nespole.jpg',
              description: 'La nespola si distingue per la buccia arancione tenue e vellutata e la polpa morbida, dolce e leggermente acidula. Il gusto è aromatico e fresco, ideale per il consumo fresco, dolci, marmellate e frullati.'
            },
            { 
              id: 65, 
              name: 'Albicocche', 
              origin: 'Campania', 
              price: '3.80', 
              unit: 'kg', 
              available: true,
              image: '/images/products/albicocche.jpg',
              description: 'Le albicocche si distinguono per il colore arancio intenso e la buccia leggermente pelosa. La polpa è morbida, succosa e dolce. Il gusto è aromatico e delicato, con leggere note tartare. Ideali per il consumo fresco, macedonie, marmellate, dolci e frullati. Ricche di betacarotene e vitamina A, sono un frutto estivo irrinunciabile.'
            },
            { id: 66, 
              name: 'Pesche', 
              origin: 'Emilia Romagna', 
              price: '2.80', 
              unit: 'kg', 
              available: true,
              image: '/images/products/pesche.jpg',
              description: 'La pesca si distingue per la buccia vellutata di colore arancione con sfumature rosse e la polpa succosa e dolce. Il gusto è aromatico e rinfrescante, ideale per il consumo fresco, dolci, macedonie, frullati e marmellate.'
            },
            { id: 67, 
              name: 'Pesche Noce',
               origin: 'Emilia Romagna', 
               price: '3.20', 
               unit: 'kg', 
               available: true,
               image: '/images/products/pesca-noce.jpg',
               description: 'Le pesche noce si distinguono per l\'assenza della leggera peluria, con una buccia liscia di colore giallo-rosso e una polpa dolce, succosa e profumata. Il gusto è ricco e intenso, con un aroma straordinario. Ideali per il consumo fresco come snack, in macedonie, dolci e frullati. Perfette per chi ama le pesche ma ne preferisce la versione liscia.'
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
              description: 'Gli asparagi si distinguono per i turioni verdi o violetti, sottili o grossi, con punte compatte e tenere. Il gusto è delicato e leggermente dolce, ideale per il consumo al vapore, lessati, gratinati, in padella o in insalate.'
            },
           { id: 69, 
            name: 'Lattuga Trocadero', 
            origin: 'Locale', 
            price: '1.50', 
            unit: 'pz', 
            available: true,
            image: '/images/products/lattuga-trocadero.jpg',
            description: 'La lattuga Trocadero si distingue per le foglie larghe, croccanti e di colore verde chiaro, con un cuore compatto. Il gusto è fresco e delicato, ideale per il consumo crudo in insalate, panini, wrap o come base per piatti freddi.'
          },
          { 
            id: 38, 
            name: 'Spinaci', 
            origin: 'Italia', 
            price: '2.40', 
            unit: 'kg', 
            available: true,
            image: '/images/products/spinaci.jpg',
            description: 'Gli spinaci si distinguono per le foglie verdi, tenere e carnose. Il gusto è delicato e leggermente erbaceo, ideale per il consumo crudo in insalata, al vapore, saltati in padella, frullati o in zuppe.'
          },
            { id: 70, 
              name: 'Ravanelli', 
              origin: 'Italia', 
              price: '2.20', 
              unit: 'kg', 
              available: true,
              image: '/images/products/ravanelli.jpg',
              description: 'I ravanelli si distinguono per le radici tonde o allungate di colore rosso, rosa o bianco e le foglie verdi croccanti. Il gusto è fresco, leggermente piccante e croccante, ideale per il consumo crudo in insalate, come snack o come guarnizione.'
            },
            { 
              id: 29, 
              name: 'Broccoli', 
              origin: 'Italia', 
              price: '2.50', 
              unit: 'pz', 
              available: true,
              image: '/images/products/broccoli.jpg',
              description: 'I broccoli si distinguono per le cime compatte di colore verde intenso e i gambi croccanti. Il gusto è delicato e leggermente amarognolo, ideale per il consumo al vapore, saltati in padella, gratinati, zuppe o insalate cotte.'
            },
            { 
              id: 30, 
              name: 'Cavolfiore Bianco', 
              origin: 'Italia', 
              price: '2.20', 
              unit: 'kg', 
              available: true,
              image: '/images/products/cavolfiore.jpg',
              description: 'Il cavolfiore bianco si distingue per la testa compatta e tondeggiante di colore bianco e le foglie esterne verdi. Il gusto è delicato e leggermente dolce, ideale per il consumo al vapore, bollito, gratinato, in zuppe o insalate cotte.'
            },
            { 
              id: 34, 
              name: 'Cavolini di Bruxelles', 
              origin: 'Italia', 
              price: '2.20', 
              unit: 'kg', 
              available: true,
              image: '/images/products/cavolini di bruxelles1.jpg',
              description: 'I cavolini di Bruxelles si distinguono per le piccole teste rotonde e compatte di colore verde, con foglie ben chiuse. Il gusto è leggermente amarognolo e aromatico, ideale per il consumo al vapore, bolliti, saltati in padella, gratinati o in zuppe.'
            },
            {
              id: 72,
              name: 'Rucola',
              origin: 'Italia',
              price: '2.20',
              unit: 'kg',
              available: true,
              image: '/images/products/rucola.jpg',
              description: 'La rucola si distingue per le foglie verdi, sottili e leggermente frastagliate, dal sapore piccante e aromatico. È ideale per il consumo crudo in insalate, panini, pizze, insaporire piatti di pasta o come guarnizione.'
            },
            {
              id: 73,
              name: 'Cipollotti',
              origin: 'Italia',
              price: '2.20',
              unit: 'kg',
              available: true,
              image: '/images/products/cipollotto.jpg',
              description: 'I cipollotti si distinguono per il bulbo piccolo e allungato di colore bianco e le foglie verdi tenere. Il gusto è delicato e leggermente dolce, ideale per il consumo crudo in insalate, come condimento, in soffritti o grigliati.'
            },
            {
              id: 74,
              name: 'Piselli',
              origin: 'Italia',
              price: '2.20',
              unit: 'kg',
              available: true,
              image: '/images/products/piselli.jpg',
              description: 'I piselli si distinguono per i baccelli verdi contenenti semi tondeggianti di colore verde brillante. Il gusto è dolce e delicato, ideale per il consumo lessati, al vapore, in zuppe, risotti, minestre o come contorno.'
            },
            {
              id: 75,
              name: 'Fave',
              origin: 'Italia',
              price: '2.20',
              unit: 'kg',
              available: true,
              image: '/images/products/fave.jpg',
              description: 'Le fave si distinguono per i baccelli verdi contenenti semi piatti e di colore verde chiaro. Il gusto è dolce e delicato, ideale per il consumo lessate, al vapore, in zuppe, insalate o come contorno.'
            },
            { id: 94, 
              name: 'Fagiolini', 
              origin: 'Italia', 
              price: '3.50', 
              unit: 'kg', 
              available: true,
              image: '/images/products/cornetti.jpg',
              description: 'I fagiolini si distinguono per i baccelli lunghi e sottili di colore verde brillante, con polpa tenera e croccante. Il gusto è delicato e fresco, ideale per il consumo lessati, al vapore, saltati in padella o in insalate.'
            },
            {id: 178 ,
              name: 'Piattoni',
              origin: 'Italia',
              price: '2.20',
              unit: 'kg',
              available: true,
              image: '/images/products/piattoni.jpg',
              description: 'I piattoni sono legumi a baccello piatto, dal gusto dolce e dalla consistenza tenera. Ricchi di fibre e poveri di calorie, sono ottimi per una cucina sana e gustosa.'
            },
            {
              id: 61, 
              name: 'Mammole',
              origin: 'Italia',
              price: '2.20',
              unit: 'kg',
              available: true,
              image: '/images/products/mammole.jpg',
              description: 'I carciofi mammole si distinguono per le teste tonde e compatte con foglie carnose di colore verde chiaro. Il gusto è dolce e delicato, ideale per il consumo al vapore, lessati, gratinati, in padella o sott’olio.'
            },
            { 
              id: 50, 
              name: 'Carote', 
              origin: 'Italia', 
              price: '2.20', 
              unit: 'kg', 
              available: true,
              image: '/images/products/carote.jpg',
              description: 'Le carote con il ciuffo si distinguono per la radice allungata di colore arancione brillante e le foglie verdi fresche attaccate. La polpa è croccante e dolce, con gusto delicato e naturale, ideale per il consumo crudo, cotto, in insalate, contorni e frullati.'
            },
            { 
              id: 51, 
              name: 'Carote Pacchetto', 
              origin: 'Italia', 
              price: '2.20', 
              unit: 'pz', 
              available: true,
              image: '/images/products/carote pacchetto.jpg',
              description: 'Le carote si distinguono per la radice allungata di colore arancione brillante e la polpa croccante e dolce. Il gusto è delicato e naturalmente zuccherino, ideale per il consumo crudo, cotto, in insalate, zuppe, contorni e frullati.'
            },
            { 
              id: 52, 
              name: 'Carote Sfuse', 
              origin: 'Italia', 
              price: '2.20', 
              unit: 'kg', 
              available: true,
              image: '/images/products/Carote sfuse.jpg',
              description: 'Le carote si distinguono per la radice allungata di colore arancione brillante e la polpa croccante e dolce. Il gusto è delicato e naturalmente zuccherino, ideale per il consumo crudo, cotto, in insalate, zuppe, contorni e frullati.'
            },
{ 
              id: 53, 
              name: 'Patate Rosse', 
              origin: 'Italia', 
              price: '1.80', 
              unit: 'kg', 
              available: true,
              image: '/images/products/patate-rosse.jpg',
              description: 'Le patate rosse si distinguono per la buccia liscia di colore rosso e la polpa chiara, compatta e soda. Il gusto è delicato e leggermente dolce, ideale per il consumo arrosto, al forno, lessate, in insalate e contorni.'
            },
            {
              id: 54,
              name: 'Patate Bianche',
              origin: 'Italia',
              price: '2.20',
              unit: 'kg',
              available: true,
              image: '/images/products/patata-bianca.jpg',
              description: 'Le patate bianche si distinguono per la buccia chiara e la polpa bianca, farinosa e morbida dopo la cottura. Il gusto è delicato e leggermente dolce, ideale per il consumo lessate, in puree, gnocchi, zuppe e contorni.'
            },
            { 
              id: 55, 
              name: 'Patate Gialle', 
              origin: 'Italia', 
              price: '1.60', 
              unit: 'kg', 
              available: true,
              image: '/images/products/patate-gialle.jpg',
              description: 'Le patate gialle si distinguono per la buccia chiara e la polpa gialla, compatta e soda. Il gusto è delicato e leggermente saporito, ideale per il consumo al forno, arrosto, in padella, lessate e come contorno.'
            },
            {
              id: 56,
              name: 'Patate Sacchetto',
              origin: 'Italia',
              price: '2.20',
              unit: 'kg',
              available: true,
              image: '/images/products/patate-sacchetto.jpeg',
              description: 'Le patate gialle in sacchetto da 2 kg si distinguono per la buccia chiara e la polpa gialla, compatta e soda. Il gusto è delicato e leggermente saporito, ideali per il consumo al forno, arrosto, in padella, lessate e come contorno.'
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
              description: 'La pera Williams si distingue per la buccia verde-gialla, talvolta con leggere sfumature rosate. La polpa è succosa, morbida e molto aromatica, dal gusto dolce e intenso. È ideale per il consumo fresco, per dessert e anche per la preparazione di succhi e liquori.'
            },
            { 
              id: 181, 
              name: 'Coscia', 
              origin: 'Italia', 
              price: '2.70', 
              unit: 'kg', 
              available: true,
              image: '/images/products/Coscia.jpg',
              description: 'Le noci sono frutti secchi dal sapore intenso e ricco, con un gustoso retrogusto leggermente amaro. Ricchissime di acidi grassi omega-3 e proteine vegetali, sono perfette per un\'alimentazione sana. Ideali come snack naturale, per arricchire dolci, piatti salati, insalate e preparazioni dolciarie tradizionali.'
            },
            { id:77, 
              name: 'Anguria', 
              origin: 'Italia',
              price: '1.20', 
              unit: 'kg', 
              available: true,
              image: '/images/products/anguria.jpg',
              description: 'L\'anguria si distingue per la buccia verde, spesso striata, e la polpa rossa, succosa e dolce, con semi neri o assenti a seconda della varietà. Il gusto è rinfrescante e zuccherino, ideale per il consumo fresco, macedonie e frullati estivi.'
            },
            { id: 78, 
              name: 'Melone Liscio', 
              origin: 'Italia', 
              price: '1.80', 
              unit: 'kg', 
              available: true,
              image: '/images/products/melone-liscio.jpg',
              description: 'Il melone liscio si distingue per la buccia liscia di colore verde chiaro o giallo e la polpa arancione o verdastra, dolce, succosa e profumata. Il gusto è aromatico e rinfrescante, ideale per il consumo fresco, macedonie e frullati.'
            },
            {id:79,
              name: 'Melone Retato',
              origin: 'Italia',
              price: '1.80',
              unit: 'kg',
              available: true,
              image: '/images/products/melone retato.jpg',
              description: 'Il melone retato si distingue per la buccia giallo-verde con caratteristica rete di linee, e la polpa arancione, succosa e zuccherina. Il gusto è aromatico e rinfrescante, con una dolcezza bilanciata. Ideale per il consumo fresco, macedonie, frullati e gelati. Perfetto per le giornate calde, ricco di acqua e vitamine.'
            },
            {
              id: 63,
              name: 'Ciliegie',
              origin: 'Emilia Romagna',
              price: '3.20',
              unit: 'kg',
              available: true,
              image: '/images/products/ciliegie.jpg',
              description: 'La ciliegia si distingue per il colore rosso brillante o scuro e la polpa succosa e dolce, con un aroma intenso e delicato. È ideale per il consumo fresco, dolci, macedonie, confetture e dessert.'
            },
            {
              id: 80,
              name: 'Mirtilli',
              origin: 'Emilia Romagna',
              price: '3.20',
              unit: 'kg',
              available: true,
              image: '/images/products/mirtilli.jpg',
              description: 'I mirtilli si distinguono per il colore blu intenso e la polpa succosa, dolce e leggermente acidula. Il gusto è aromatico e delicato, ideale per il consumo fresco, in macedonie, yogurt, dolci e marmellate. Ricchissimi di antiossidanti e proprietà benefiche per la salute.'
            },
            {
              id: 81,
              name: 'More',
              origin: 'Emilia Romagna',
              price: '3.20',
              unit: 'kg',
              available: true,
              image: '/images/products/more.jpg',
              description: 'Le more si distinguono per il colore nero-violaceo della buccia e la polpa succosa e dolce con leggero retrogusto acidulo. Il gusto è aromatico e intenso, ideale per il consumo fresco, dolci, marmellate, smoothie e macedonie.'
            },
            {
              id: 82,
              name: 'Lamponi',
              origin: 'Emilia Romagna',
              price: '3.20',
              unit: 'kg',
              available: true,
              image: '/images/products/lamponi.jpg',
              description: 'I lamponi si caratterizzano per il colore rosso vivo e la forma fragile e delicata, con una polpa dolce succosa dal leggerissimo aroma acidulo. Il gusto è aromatico e delicato, ideale per il consumo fresco, in macedonie, dolci, marmellate e bevande. Apprezzati per le loro proprietà nutritive straordinarie.'
            },
            { id: 66, 
              name: 'Pesche', 
              origin: 'Emilia Romagna', 
              price: '2.80', 
              unit: 'kg', 
              available: true,
              image: '/images/products/pesche.jpg',
              description: 'La pesca si distingue per la buccia vellutata di colore arancione con sfumature rosse e la polpa succosa e dolce. Il gusto è aromatico e rinfrescante, ideale per il consumo fresco, dolci, macedonie, frullati e marmellate.'
            },
            { id: 67, 
              name: 'Pesche Noce',
               origin: 'Emilia Romagna', 
               price: '3.20', 
               unit: 'kg', 
               available: true,
               image: '/images/products/pesca-noce.jpg',
               description: 'Le pesche noce si distinguono per l\'assenza della leggera peluria, con una buccia liscia di colore giallo-rosso e una polpa dolce, succosa e profumata. Il gusto è ricco e intenso, con un aroma straordinario. Ideali per il consumo fresco come snack, in macedonie, dolci e frullati. Perfette per chi ama le pesche ma ne preferisce la versione liscia.'
            },
            { id: 83,
              name: 'Pesca Noce Bianca',
              origin: 'Emilia Romagna',
              price: '3.20',
              unit: 'kg',
              available: true,
              image: '/images/products/pesca-noce-bianca.jpg',
              description: 'La pesca noce bianca si distingue per la buccia vellutata di colore chiaro con sfumature rosate e la polpa bianca, molto succosa e dolce, dal gusto aromatico delicato. È ideale per il consumo fresco, dolci, macedonie, frullati e marmellate.'
            },
            { id: 182,
              name: 'Tabacchiera',
              origin: 'Emilia Romagna',
              price: '3.20',
              unit: 'kg',
              available: true,
              image: '/images/products/tabacchiera.jpg',
              description: 'I pistacchi sono frutti secchi pregiati dal sapore delicato, leggermente salato e molto apprezzato. Ricchi di antiossidanti e grassi buoni, sono perfetti come snack naturale e in numerose preparazioni dolci e salate. Ingrediente nobile per pasticceria, salse e un\'alimentazione equilibrata.'
            },
            { id: 65, 
              name: 'Albicocche', 
              origin: 'Campania', 
              price: '3.50', 
              unit: 'kg', 
              available: true,
              image: '/images/products/albicocche.jpg',
              description: 'Le albicocche si distinguono per il colore arancio intenso e la buccia leggermente pelosa. La polpa è morbida, succosa e dolce. Il gusto è aromatico e delicato, con leggere note tartare. Ideali per il consumo fresco, macedonie, marmellate, dolci e frullati. Ricche di betacarotene e vitamina A, sono un frutto estivo irrinunciabile.'
            },
            {
              id: 84,
              name: 'Uva Senza Semi Bianca',
              origin: 'Puglia',
              price: '3.50', 
              unit: 'kg', 
              available: true,
              image: '/images/products/uva-bianca-senza-semi.jpg',
              description: 'L\'uva bianca senza semi è la scelta ideale per il consumo pratico e piacevole, senza l\'inconveniente dei semini. La polpa è croccante, succosa e dal gusto dolce e delicato. Perfetta per il consumo fresco, macedonie, frullati e come snack sano per tutta la famiglia. Comoda, gustosa e piacevolmente sorprendente.'
             },
            {id: 85,
              name: 'Fico',
              origin: 'Italia',
              price: '3.50',
              unit: 'kg', 
              available: true,
              image: '/images/products/fico.jpg',
              description: 'Il fico si distingue per la buccia sottile, di colore verde, viola o nero a seconda della varietà, e la polpa morbida, dolce e succosa con numerosi piccoli semi croccanti. Il gusto è aromatico e zuccherino, ideale per il consumo fresco, dolci, marmellate e frullati.'
            },
            {id: 86,
              name: 'Susina',
              origin: 'Italia',
              price: '3.50',
              unit: 'kg',
              available: true,
              image: '/images/products/susina.jpg',
              description: 'La susina si distingue per il colore variabile (dal giallo al rosso al blu) e la buccia liscia. La polpa è morbida, succosa e dal gusto dolce. Il gusto è aromatico e piacevolmente equilibrato tra dolce e leggermente acidulo. Ideale per il consumo fresco, macedonie, marmellate, dolci e frullati. Frutto versatile e apprezzato.'
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
               description: 'Il pomodoro ramato si distingue per la buccia liscia di colore rosso intenso con sfumature ramate e la polpa succosa e soda. Il gusto è dolce e leggermente acidulo, ideale per il consumo crudo in insalate, salse, bruschette, panini e piatti cucinati.'
            },
            { id: 118, 
              name: 'Cuore Di Bue',
               origin: 'Sicilia', 
               price: '2.50', 
               unit: 'kg', 
               available: true,
               image: '/images/products/cuore di bue.jpeg',
               description: 'Il pomodoro Cuore di Bue si distingue per la forma grande e leggermente a cuore, la buccia liscia di colore rosso intenso e la polpa carnosa e succosa. Il gusto è dolce e delicato, ideale per il consumo crudo in insalate, bruschette, panini o per preparazioni culinarie.'
            },
            { id: 183, 
              name: 'Pomodoro Perino',
               origin: 'Sicilia', 
               price: '2.50', 
               unit: 'kg', 
               available: true,
               image: '/images/products/perino.jpg',
               description: 'Il pomodorino datterino si distingue per la forma allungata simile a datteri, la buccia liscia di colore rosso intenso e la polpa succosa e dolce. Il gusto è dolce e leggermente acidulo, ideale per il consumo crudo in insalate, aperitivi, bruschette o per cotture veloci.'
            },
            { id: 88, 
              name: 'Pomodorino Datterino',
               origin: 'Sicilia', 
               price: '2.50', 
               unit: 'kg', 
               available: true,
               image: '/images/products/pomodorini.jpg',
               description: 'Il pomodorino datterino si distingue per la forma allungata simile a datteri, la buccia liscia di colore rosso intenso e la polpa succosa e dolce. Il gusto è dolce e leggermente acidulo, ideale per il consumo crudo in insalate, aperitivi, bruschette o per cotture veloci.'
            },
            { id: 89, name: 'Zucchine',
               origin: 'Italia', 
               price: '1.80',
               unit: 'kg', 
               available: true,
               image: '/images/products/zucchine.jpg',
               description: 'Le zucchine si distinguono per il frutto cilindrico o leggermente allungato, di colore verde chiaro o scuro, con polpa tenera e delicata. Il gusto è fresco e leggermente dolce, ideale per il consumo crudo in insalate, saltate in padella, al forno, ripiene o in zuppe.'
            },
            { id: 90, 
              name: 'Melanzane', 
              origin: 'Sicilia', 
              price: '2.20', 
              unit: 'kg', 
              available: true,
              image: '/images/products/melanzane.jpeg',
              description: 'Le melanzane si distinguono per il frutto allungato o tondeggiante, con buccia liscia di colore viola intenso o scuro e polpa morbida e spugnosa. Il gusto è delicato e leggermente amarognolo, ideale per il consumo grigliate, al forno, in padella, ripiene o in zuppe e ratatouille.'
            },
            { id: 91, 
              name: 'Peperoni gialli', 
              origin: 'Italia', 
              price: '2.80', 
              unit: 'kg', 
              available: true,
              image: '/images/products/peperone-giallo.jpeg',
              description: 'I peperoni gialli si distinguono per il frutto carnoso e croccante di colore giallo brillante. Il gusto è dolce e leggermente fruttato, ideale per il consumo crudo in insalate, grigliati, al forno, ripieni o in soffritti.'
            },
            { id: 92, 
              name: 'Peperoni rossi', 
              origin: 'Italia', 
              price: '2.80', 
              unit: 'kg', 
              available: true,
              image: '/images/products/peperone-rosso.jpeg',
              description: 'I peperoni rossi si distinguono per il frutto carnoso e croccante di colore rosso intenso. Il gusto è dolce e leggermente fruttato, ideale per il consumo crudo in insalate, grigliati, al forno, ripieni o in soffritti.'
            },
            { id: 93, 
              name: 'Cetrioli', 
              origin: 'Italia', 
              price: '1.50', 
              unit: 'kg', 
              available: true,
              image: '/images/products/cetrioli.jpg',
              description: 'I cetrioli si distinguono per il frutto lungo e cilindrico, di colore verde chiaro o scuro, con polpa croccante e fresca. Il gusto è delicato e rinfrescante, ideale per il consumo crudo in insalate, panini, centrifugati o come snack.'
            },
            { id: 94, 
              name: 'Fagiolini', 
              origin: 'Italia', 
              price: '3.50', 
              unit: 'kg', 
              available: true,
              image: '/images/products/cornetti.jpg',
              description: 'I fagiolini si distinguono per i baccelli lunghi e sottili di colore verde brillante, con polpa tenera e croccante. Il gusto è delicato e fresco, ideale per il consumo lessati, al vapore, saltati in padella o in insalate.'
            },
            {id: 178 ,
              name: 'Piattoni',
              origin: 'Italia',
              price: '2.20',
              unit: 'kg',
              available: true,
              image: '/images/products/piattoni.jpg',
              description: 'I piattoni sono legumi a baccello piatto, dal gusto dolce e dalla consistenza tenera. Ricchi di fibre e poveri di calorie, sono ottimi per una cucina sana e gustosa.'
            },
            { id: 69, 
              name: 'Lattuga Trocadero', 
              origin: 'Locale', 
              price: '1.50', 
              unit: 'pz', 
              available: true,
              image: '/images/products/lattuga-trocadero.jpg',
              description: 'La lattuga Trocadero si distingue per le foglie larghe, croccanti e di colore verde chiaro, con un cuore compatto. Il gusto è fresco e delicato, ideale per il consumo crudo in insalate, panini, wrap o come base per piatti freddi.'
            },
            { 
              id: 50, 
              name: 'Carote', 
              origin: 'Italia', 
              price: '2.20', 
              unit: 'kg', 
              available: true,
              image: '/images/products/carote.jpg',
              description: 'Le carote con il ciuffo si distinguono per la radice allungata di colore arancione brillante e le foglie verdi fresche attaccate. La polpa è croccante e dolce, con gusto delicato e naturale, ideale per il consumo crudo, cotto, in insalate, contorni e frullati.'
            },
            { 
              id: 51, 
              name: 'Carote Pacchetto', 
              origin: 'Italia', 
              price: '2.20', 
              unit: 'pz', 
              available: true,
              image: '/images/products/carote pacchetto.jpg',
              description: 'Le carote si distinguono per la radice allungata di colore arancione brillante e la polpa croccante e dolce. Il gusto è delicato e naturalmente zuccherino, ideale per il consumo crudo, cotto, in insalate, zuppe, contorni e frullati.'
            },
            { 
              id: 52, 
              name: 'Carote Sfuse', 
              origin: 'Italia', 
              price: '2.20', 
              unit: 'kg', 
              available: true,
              image: '/images/products/Carote sfuse.jpg',
              description: 'Le carote si distinguono per la radice allungata di colore arancione brillante e la polpa croccante e dolce. Il gusto è delicato e naturalmente zuccherino, ideale per il consumo crudo, cotto, in insalate, zuppe, contorni e frullati.'
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
              description: 'La mela Golden Delicious Melinda si distingue per il colore giallo dorato e la buccia sottile. La polpa è croccante, succosa e dal gusto naturalmente dolce e delicato. Coltivata nei frutteti di montagna del Trentino, è ideale sia per il consumo fresco sia per l’utilizzo in cucina, perfetta per dolci e preparazioni salate.'
            },
            { 
              id: 2, 
              name: 'Golden Delicious', 
              origin: 'Italia', 
              price: '2.40', 
              unit: 'kg', 
              available: true,
              image: '/images/products/golden-amelia.jpg',
              description: 'La mela Golden Delicious presenta una buccia giallo dorata e una polpa croccante e succosa. Il gusto è dolce e delicato, molto equilibrato. È una mela versatile, ideale per il consumo fresco e perfetta anche per l’utilizzo in cucina, sia per dolci sia per preparazioni salate.'
            },
            { 
              id: 3, 
              name: 'Renetta', 
              origin: 'Italia', 
              price: '2.20', 
              unit: 'kg', 
              available: true,
              image: '/images/products/renetta.jpg',
              description: 'La mela Renetta è una varietà classica dal gusto aromatico e acidulo, con polpa compatta. Ottima sia da mangiare fresca sia per preparazioni culinarie tradizionali.'
            },
            { 
              id: 5, 
              name: 'Fuji', 
              origin: 'Italia', 
              price: '2.50', 
              unit: 'kg', 
              available: true,
              image: '/images/products/fuji.jpg',
              description: 'La mela Fuji presenta una buccia bicolore con fondo giallo e sovraccolore rosso. La polpa è molto croccante, compatta e succosa. Il gusto è dolce e aromatico, con un equilibrio piacevole. È ideale per il consumo fresco e adatta anche a preparazioni in cucina.'
            },
            { 
              id: 6, 
              name: 'Red Delicious', 
              origin: 'Italia', 
              price: '2.30', 
              unit: 'kg', 
              available: true,
              image: '/images/products/red-delicious.jpg',
              description: 'La mela Red Delicious si riconosce per la buccia rosso intenso e la forma allungata. La polpa è tenera e succosa, dal gusto dolce e delicato. È ideale per il consumo fresco ed è apprezzata per il suo aspetto elegante e il sapore equilibrato.'
            },
            { 
              id: 7, 
              name: 'Granny Smith', 
              origin: 'Italia', 
              price: '2.40', 
              unit: 'kg', 
              available: true,
              image: '/images/products/granny-smith.jpg',
              description: 'La mela Granny Smith si distingue per la buccia verde brillante e la polpa molto croccante e succosa. Il gusto è fresco, deciso e marcatamente acidulo. È ideale per il consumo fresco e particolarmente apprezzata in cucina, soprattutto per dolci e preparazioni salate.'
            },           
            { 
              id: 11, 
              name: 'Kaiser', 
              origin: 'Italia', 
              price: '2.60', 
              unit: 'kg', 
              available: true,
              image: '/images/products/pera-kaiser.jpg',
              description: 'La pera Kaiser si distingue per la forma allungata, la buccia ruvida di colore marrone-ruggine e la polpa chiara, soda e profumata. Il gusto è dolce e aromatico, ideale per il consumo crudo, cotto, in dolci, macedonie e preparazioni da forno.'
            },
            { 
              id: 10, 
              name: 'Abate Fetel', 
              origin: 'Italia', 
              price: '2.80', 
              unit: 'kg', 
              available: true,
              image: '/images/products/abate-fetel.jpg',
              description: 'La pera Abate Fetel si riconosce per la forma allungata e la buccia verde con sfumature giallo-rugginose. La polpa è bianca, fine, molto succosa e dal gusto dolce e aromatico. È ideale per il consumo fresco ed è apprezzata per l’elevata qualità e la sua eleganza.'
            },
            { 
              id: 76, 
              name: 'Williams', 
              origin: 'Italia', 
              price: '2.70', 
              unit: 'kg', 
              available: true,
              image: '/images/products/williams.jpg',
              description: 'La pera Williams si distingue per la buccia verde-gialla, talvolta con leggere sfumature rosate. La polpa è succosa, morbida e molto aromatica, dal gusto dolce e intenso. È ideale per il consumo fresco, per dessert e anche per la preparazione di succhi e liquori.'
            },
            { 
              id: 12, 
              name: 'Decana', 
              origin: 'Italia', 
              price: '2.50', 
              unit: 'kg', 
              available: true,
              image: '/images/products/decana.jpg',
              description: 'La pera Decana ha una buccia verde-gialla, talvolta con leggere sfumature rossastre. La polpa è soda, succosa e dal gusto dolce e aromatico, molto equilibrato. È ideale per il consumo fresco e ottima anche per dolci e preparazioni culinarie.'
            },
            { 
              id: 13, 
              name: 'Kiwi Giallo', 
              origin: 'Italia', 
              price: '4.20', 
              unit: 'kg', 
              available: true,
              image: '/images/products/kiwi-giallo.jpg',
              description: 'Il kiwi giallo si distingue per la buccia sottile e liscia di colore marrone chiaro e la polpa interna giallo dorato. La polpa è morbida, succosa e dal gusto dolce, meno acidulo rispetto al kiwi verde, con un aroma intenso e tropicale. È ideale per il consumo fresco, macedonie, smoothie e dolci.'
            },
            { 
              id: 14, 
              name: 'Kiwi Verde', 
              origin: 'Italia', 
              price: '3.20', 
              unit: 'kg', 
              available: true,
              image: '/images/products/kiwi-verde.jpg',
              description: 'Il kiwi verde si caratterizza per la buccia marrone leggermente pelosa e la polpa verde brillante con piccoli semi neri. La polpa è morbida, succosa e dal gusto acidulo equilibrato, con aroma intenso e caratteristico. Ricco di vitamina C e antiossidanti, è ideale per il consumo fresco, macedonie, frullati, dessert e dolci. Nutriente e rinfrescante.'
            },
            { 
              id: 19, 
              name: 'Arancia Navel', 
              origin: 'Sicilia', 
              price: '2.00', 
              unit: 'kg', 
              available: true,
              image: '/images/products/navel.jpg',
              description: 'Scopri la qualità premium di Arancia Navel. Un prodotto selezionato con cura per offrirti il miglior sapore e la massima freschezza.'
            },
            { 
              id: 22, 
              name: 'Mandarancio', 
              origin: 'Italia', 
              price: '2.90', 
              unit: 'kg', 
              available: true,
              image: '/images/products/mandarancio.jpg',
              description: 'Il mandarancio è un frutto ibrido tra mandarino e arancia, con buccia arancione brillante e polpa succosa, dolce e leggermente acidula. Il gusto è aromatico e equilibrato, ideale per il consumo fresco, spremute e macedonie.'
            },
            {
              id: 96,
              name: 'Melone Giallo',
              origin: 'Italia',
              price: '3.50',
              unit: 'kg',
              available: true,
              image: '/images/products/melone-giallo.jpg',
              description: 'Il melone giallo si distingue per la buccia liscia o leggermente rugosa di colore giallo intenso e la polpa arancione, dolce, succosa e profumata. Il gusto è aromatico e rinfrescante, ideale per il consumo fresco, macedonie, frullati e dessert.'
            },
            { id: 97, 
              name: 'Uva Italia', 
              origin: 'Puglia',
              price: '3.50', 
              unit: 'kg', 
              available: true,
              image: '/images/products/uva-italia.jpg',
              description: 'L\'uva Italia si distingue per gli acini grandi, di colore verde-giallo con buccia sottile e polpa dolce, succosa e croccante. Il gusto è aromatico e zuccherino, ideale per il consumo fresco, macedonie e dolci.'
             },
             {
              id: 98,
              name: 'Uva Moscato',
              origin: 'Puglia',
              price: '3.50', 
              unit: 'kg', 
              available: true,
              image: '/images/products/uva-moscato.jpg',
              description: 'L\'uva Moscata si distingue per gli acini di medie dimensioni, di colore giallo dorato o verde chiaro, con polpa succosa e dolce e buccia sottile. Il gusto è aromatico, intenso e zuccherino, ideale per il consumo fresco, macedonie, dolci e vini aromatici.'
             },
             {
              id: 99,
              name: 'Uva Pizzutella',
              origin: 'Puglia',
              price: '3.50', 
              unit: 'kg', 
              available: true,
              image: '/images/products/uva-pizzuttella.jpg',
              description: 'L\'uva Pizzutella si distingue per il colore giallo dorato e la forma caratteristica leggermente affusolata. La polpa è croccante, succosa e dal gusto dolce e buccia sottile. Il gusto è delizioso e bilanciato. Ideale per il consumo fresco, macedonie e come ingrediente per dolci e succhi. Varietà apprezzata per la qualità e il sapore eccezionale.'
             },
             {
              id: 84,
              name: 'Uva Senza Semi Bianca',
              origin: 'Puglia',
              price: '3.50', 
              unit: 'kg', 
              available: true,
              image: '/images/products/uva-bianca-senza-semi.jpg',
              description: 'L\'uva bianca senza semi è la scelta ideale per il consumo pratico e piacevole, senza l\'inconveniente dei semini. La polpa è croccante, succosa e dal gusto dolce e delicato. Perfetta per il consumo fresco, macedonie, frullati e come snack sano per tutta la famiglia. Comoda, gustosa e piacevolmente sorprendente.'
             },
             {
              id: 100,
              name: 'Uva Senza Semi Rosata',
              origin: 'Puglia',
              price: '3.50', 
              unit: 'kg', 
              available: true,
              image: '/images/products/uva-rosata-senza-semi.jpg',
              description: 'L\'uva senza semi rosata si distingue per gli acini medi di colore rosa tenue, con polpa succosa e dolce e buccia sottile. Il gusto è aromatico e zuccherino, ideale per il consumo fresco, macedonie e dolci.'
             },
             { 
              id: 15, 
              name: 'Melograno', 
              origin: 'Italia', 
              price: '3.80', 
              unit: 'kg', 
              available: true,
              image: '/images/products/melograno.jpg',
              description: 'Il melograno si distingue per il frutto tondeggiante con buccia spessa di colore rosso intenso e i chicchi interni succosi e brillanti. Il gusto è dolce con una leggera nota acidula, ideale per il consumo fresco, in spremute, insalate, macedonie e come ingrediente decorativo.'
            },
            { 
              id: 16, 
              name: 'Cachi', 
              origin: 'Italia', 
              price: '3.50', 
              unit: 'kg', 
              available: true,
              image: '/images/products/cachi.jpg',
              description: 'Il cachi si distingue per la buccia liscia di colore arancione intenso e la polpa morbida e dolce quando maturo. Il gusto è zuccherino, aromatico e molto gradevole. È ideale per il consumo fresco, dolci, macedonie e frullati.'
            },
            { 
              id: 17, 
              name: 'Cachi Mela', 
              origin: 'Italia', 
              price: '3.50', 
              unit: 'kg', 
              available: true,
              image: '/images/products/cachi-mela.jpg',
              description: 'Il Cacomela è un frutto ibrido tra mela e cachi, con buccia liscia che può variare dal giallo-arancio al rosso tenue. La polpa è morbida, succosa e dolce, con un aroma delicato che ricorda entrambe le varietà. È ideale per il consumo fresco, dessert e frullati.'
            },
            {
              id: 85,
              name: 'fico',
              origin: 'Italia',
              price: '3.50',
              unit: 'kg',
              available: true,
              image: '/images/products/fico.jpg',
              description: 'Il fico si distingue per la buccia sottile, di colore verde, viola o nero a seconda della varietà, e la polpa morbida, dolce e succosa con numerosi piccoli semi croccanti. Il gusto è aromatico e zuccherino, ideale per il consumo fresco, dolci, marmellate e frullati.'
            },
            {
              id: 101,
              name: 'Fico D\'India',
              origin: 'Italia',
              price: '3.50',
              unit: 'kg',
              available: true,
              image: '/images/products/fico-d\'india.jpg',
              description: "Il Fico d'India si distingue per il frutto ovale con buccia spessa di colore verde, gialla o rossastra e polpa dolce, succosa e granulosa con numerosi semi piccoli. Il gusto è aromatico e zuccherino, ideale per il consumo fresco, dolci, succhi e marmellate."
            },
            {
              id: 86,
              name: 'Susine',
              origin: 'Italia',
              price: '3.50',
              unit: 'kg',
              available: true,
              image: '/images/products/susina.jpg',
              description: 'La susina si distingue per il colore variabile (dal giallo al rosso al blu) e la buccia liscia. La polpa è morbida, succosa e dal gusto dolce. Il gusto è aromatico e piacevolmente equilibrato tra dolce e leggermente acidulo. Ideale per il consumo fresco, macedonie, marmellate, dolci e frullati. Frutto versatile e apprezzato.'
            },
            {
              id: 102,
              name: 'Prugna Goccia D\'oro',
              origin: 'Italia',
              price: '3.50',
              unit: 'kg',
              available: true,
              image: '/images/products/Goccia-d\'oro.jpg',
              description: 'La prugna Goccia d’Oro si distingue per la buccia liscia di colore giallo intenso e la polpa succosa, dolce e leggermente acidula. Il gusto è aromatico e fresco, ideale per il consumo fresco, dolci, marmellate e frullati.'
            },
            {
              id: 103,
              name: 'Prugna Santarosa',
              origin: 'Italia',
              price: '3.50',
              unit: 'kg',
              available: true,
              image: '/images/products/santarosa.jpg',
              description: 'La prugna Santarosa si riconosce per il colore rosso vivo e la forma tonda. La polpa è dolce, succosa e dalla consistenza soda. Il gusto è equilibrato tra dolce e leggermente acidulo, molto aromatico. Ideale per il consumo fresco, in macedonie, dolci, marmellate e frullati. Varietà particolarmente apprezzata per la qualità.'
            },
            {
              id: 104,
              name: 'Prugna Sangue Di Drago',
              origin: 'Italia',
              price: '3.50',
              unit: 'kg',
              available: true,
              image: '/images/products/sangue-di-drago.jpg',
              description: 'La prugna Sangue di Drago si distingue per la buccia liscia di colore rosso scuro e la polpa succosa, dolce con un leggero retrogusto acidulo. Il gusto è aromatico e intenso, ideale per il consumo fresco, dolci, marmellate e frullati.'
            },
            {
              id: 105,
              name: 'Prugna Regina Claudia',
              origin: 'Italia',
              price: '3.50',
              unit: 'kg',
              available: true,
              image: '/images/products/regina-claudia.jpg',
              description: 'La prugna Regina Claudia si distingue per la buccia liscia di colore verde-giallo con sfumature dorate e la polpa succosa, dolce e aromaticamente profumata. Il gusto è equilibrato e delicato, ideale per il consumo fresco, dolci'
            },
            {id: 106,
              name: 'Castagne',
              origin: 'Italia',
              price: '3.50',
              unit: 'kg',
              available: true,
              image: '/images/products/castagne.jpg',
              description: 'La castagna si distingue per il guscio marrone lucido e duro e la polpa interna dolce, farinosa e nutriente. Il gusto è delicato e dolce, ideale per il consumo arrostita, bollita, in dolci, puree e farine.'
            },
            {id: 107,
              name: 'Marroni',
              origin: 'Italia',
              price: '3.50',
              unit: 'kg',
              available: true,
              image: '/images/products/marroni.jpg',
              description: 'I marroni si distinguono per il guscio liscio e marrone chiaro e la polpa interna dolce, farinosa e molto nutriente. Il gusto è delicato e dolce, ideale per il consumo arrostiti, bolliti, dolci, puree e farine pregiate.'
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
              description: 'I broccoli si distinguono per le cime compatte di colore verde intenso e i gambi croccanti. Il gusto è delicato e leggermente amarognolo, ideale per il consumo al vapore, saltati in padella, gratinati, zuppe o insalate cotte.'
            },
            { 
              id: 27, 
              name: 'Cavolo Nero', 
              origin: 'Toscana', 
              price: '2.80', 
              unit: 'kg', 
              available: true,
              image: '/images/products/cavolo-nero.jpg',
              description: 'Il cavolo nero si distingue per le foglie lunghe, scure e rugose, di colore verde intenso, con un sapore leggermente amarognolo e aromatico. È ricco di vitamine e minerali, ideale per zuppe, minestre, insalate, saltati in padella o frullati verdi.'
            },
            { 
              id: 30, 
              name: 'Cavolfiore', 
              origin: 'Italia', 
              price: '2.20', 
              unit: 'kg', 
              available: true,
              image: '/images/products/cavolfiore.jpg',
              description: 'Il cavolfiore viola si distingue per la testa compatta di colore viola intenso e le foglie esterne verdi. Il gusto è delicato e leggermente dolce, ideale per il consumo al vapore, bollito, gratinato, in zuppe o insalate cotte, aggiungendo un tocco di colore ai piatti.'
            },
            { 
              id: 31, 
              name: 'Cavolfiore Verde', 
              origin: 'Italia', 
              price: '2.20', 
              unit: 'kg', 
              available: true,
              image: '/images/products/cavolfiore-verde.jpeg',
              description: 'Il cavolfiore verde si distingue per la testa compatta di colore verde brillante e le foglie esterne verdi. Il gusto è delicato e leggermente dolce, ideale per il consumo al vapore, bollito, gratinato, in zuppe o insalate cotte.'
            },
            {
              id: 32, 
              name: 'Cavolfiore viola', 
              origin: 'Italia', 
              price: '1.60', 
              unit: 'kg', 
              available: true,
              image: '/images/products/cavolfiore-viola.jpg',
              description: 'Il cavolfiore viola si distingue per la testa compatta di colore viola intenso e le foglie esterne verdi. Il gusto è delicato e leggermente dolce, ideale per il consumo al vapore, bollito, gratinato, in zuppe o insalate cotte, aggiungendo un tocco di colore ai piatti.'
            },
            {
              id: 33,
              name: 'Cavolo Romano',
              origin: 'Italia',
              price: '2.20',
              unit: 'kg',
              available: true,
              image: '/images/products/cavolo-romano.jpg',
              description: 'Il cavolo romano si distingue per le foglie lunghe, rugose e di colore verde scuro, con un sapore leggermente amarognolo e aromatico. È ricco di vitamine e minerali, ideale per zuppe, minestre, saltati in padella o frullati verdi.'
            },
            { 
              id: 37, 
              name: 'Finocchi', 
              origin: 'Italia', 
              price: '2.40', 
              unit: 'kg', 
              available: true,
              image: '/images/products/finocchi.jpg',
              description: 'I finocchi si distinguono per il bulbo bianco compatto e le fronde verdi e aromatiche. Il gusto è dolce e delicatamente anice, ideale per il consumo crudo in insalata, al vapore, bollito, gratinato o in zuppe.'
            }, 
            { 
              id: 48, 
              name: 'Barbabietole', 
              origin: 'Italia', 
              price: '2.99', 
              unit: 'kg', 
              available: true,
              image: '/images/products/barbabietole.jpg',
              description: 'La barbabietola si distingue per il tubero rotondo o allungato di colore rosso intenso e le foglie verdi commestibili. Il gusto è dolce e terroso, ideale per il consumo cotta, al vapore, arrosto, in insalate o frullati.'
            }, 
            {
              id: 49, 
              name: 'Zucca',
              origin: 'Italia',
              price: '2.20',
              unit: 'kg',
              available: true,
              image: '/images/products/zucca.jpeg',
              description: 'La zucca si distingue per la buccia dura di colore arancione, verde o grigio a seconda della varietà e la polpa interna arancione, dolce e compatta. Il gusto è delicato e leggermente dolce, ideale per il consumo al forno, in zuppe, risotti, puree e dolci.'
            },  
            { 
              id: 50, 
              name: 'Carote', 
              origin: 'Italia', 
              price: '2.20', 
              unit: 'kg', 
              available: true,
              image: '/images/products/carote.jpg',
              description: 'Le carote con il ciuffo si distinguono per la radice allungata di colore arancione brillante e le foglie verdi fresche attaccate. La polpa è croccante e dolce, con gusto delicato e naturale, ideale per il consumo crudo, cotto, in insalate, contorni e frullati.'
            },
            { 
              id: 51, 
              name: 'Carote Pacchetto', 
              origin: 'Italia', 
              price: '2.20', 
              unit: 'pz', 
              available: true,
              image: '/images/products/carote pacchetto.jpg',
              description: 'Le carote si distinguono per la radice allungata di colore arancione brillante e la polpa croccante e dolce. Il gusto è delicato e naturalmente zuccherino, ideale per il consumo crudo, cotto, in insalate, zuppe, contorni e frullati.'
            },
            { 
              id: 52, 
              name: 'Carote Sfuse', 
              origin: 'Italia', 
              price: '2.20', 
              unit: 'kg', 
              available: true,
              image: '/images/products/Carote sfuse.jpg',
              description: 'Le carote si distinguono per la radice allungata di colore arancione brillante e la polpa croccante e dolce. Il gusto è delicato e naturalmente zuccherino, ideale per il consumo crudo, cotto, in insalate, zuppe, contorni e frullati.'
            }, 
            {
              id: 108,
              name: 'Funghi Porcini',
              origin: 'Italia',
              price: '2.20',
              unit: 'kg',
              available: true,
              image: '/images/products/Funghi-porcini.jpg',
              description: 'I funghi porcini si distinguono per il cappello carnoso di colore marrone e il gambo robusto chiaro. Il gusto è intenso, aromatico e leggermente nocciolato, ideale per il consumo trifolati, in risotti, zuppe, salse o alla griglia.'
            },
            { 
              id: 57, 
              name: 'Porri', 
              origin: 'Italia', 
              price: '2.60', 
              unit: 'kg', 
              available: true,
              image: '/images/products/porri.jpg',
              description: 'Il porro si distingue per il fusto lungo e cilindrico di colore bianco nella parte inferiore e verde nella parte superiore. Il gusto è delicato e leggermente dolce, ideale per il consumo in zuppe, risotti, torte salate, saltato in padella o come contorno.'
            },
            { id: 36, 
              name: 'Cavolo cappuccio', 
              origin: 'Italia', 
              price: '1.50', 
              unit: 'kg', 
              available: true,
              image: '/images/products/cavolo-cappuccio.jpg',
              description: 'Il cavolo cappuccio si distingue per la testa compatta e rotonda con foglie lisce e croccanti di colore verde chiaro o violaceo a seconda della varietà. Il gusto è delicato e leggermente dolce, ideale per il consumo crudo in insalata, al vapore, bollito, in zuppe o stufati.'
            },
            { 
              id: 42, 
              name: 'Radicchio', 
              origin: 'Veneto', 
              price: '3.20', 
              unit: 'kg', 
              available: true,
              image: '/images/products/radicchio.jpg',
              description: 'Il radicchio si distingue per le foglie rosse o violacee con venature bianche, croccanti e leggermente amarognole. Il gusto è deciso e amarognolo, ideale per il consumo crudo in insalata, grigliato, al vapore o saltato in padella.'
            },
            { id: 38, 
              name: 'Spinaci', 
              origin: 'Italia', 
              price: '2.80', 
              unit: 'kg', 
              available: true,
              image: '/images/products/spinaci.jpg',
              description: 'Gli spinaci si distinguono per le foglie verdi, tenere e carnose. Il gusto è delicato e leggermente erbaceo, ideale per il consumo crudo in insalata, al vapore, saltati in padella, frullati o in zuppe.'
            },
            { id: 41, 
              name: 'Coste', 
              origin: 'Italia', 
              price: '2.20', 
              unit: 'kg', 
              available: true,
              image: '/images/products/coste.jpg',
              description: 'La catalogna si distingue per le foglie lunghe, sottili e frastagliate di colore verde scuro, con un gusto amarognolo e deciso. È ideale per il consumo saltata in padella, lessata, in zuppe o come contorno.'
            },
            { 
              id: 40, 
              name: 'Catalogna', 
              origin: 'Italia', 
              price: '2.50', 
              unit: 'kg', 
              available: true,
              image: '/images/products/catalogna.jpg',
              description: 'La catalogna si distingue per le foglie lunghe, sottili e frastagliate di colore verde scuro, con un gusto amarognolo e deciso. È ideale per il consumo saltata in padella, lessata, in zuppe o come contorno.'
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
          description: 'La mela Golden Delicious Melinda si distingue per il colore giallo dorato e la buccia sottile. La polpa è croccante, succosa e dal gusto naturalmente dolce e delicato. Coltivata nei frutteti di montagna del Trentino, è ideale sia per il consumo fresco sia per l’utilizzo in cucina, perfetta per dolci e preparazioni salate.'
        },
        { 
          id: 2, 
          name: 'Golden Delicious', 
          origin: 'Italia', 
          price: '2.40', 
          unit: 'kg', 
          available: true,
          image: '/images/products/golden-amelia.jpg',
          description: 'La mela Golden Delicious presenta una buccia giallo dorata e una polpa croccante e succosa. Il gusto è dolce e delicato, molto equilibrato. È una mela versatile, ideale per il consumo fresco e perfetta anche per l’utilizzo in cucina, sia per dolci sia per preparazioni salate.'
        },
        { 
          id: 3, 
          name: 'Renetta', 
          origin: 'Italia', 
          price: '2.20', 
          unit: 'kg', 
          available: true,
          image: '/images/products/renetta.jpg',
          description: 'La mela Renetta è una varietà classica dal gusto aromatico e acidulo, con polpa compatta. Ottima sia da mangiare fresca sia per preparazioni culinarie tradizionali.'
        },
        { 
          id: 4, 
          name: 'Ambrosia', 
          origin: 'Italia', 
          price: '2.60', 
          unit: 'kg', 
          available: true,
          image: '/images/products/ambrosia.jpg',
          description: 'La mela Ambrosia si distingue per la buccia bicolore giallo-rossa e l’aspetto elegante. La polpa è molto croccante, succosa e dal gusto intensamente dolce, con leggere note aromatiche. È ideale per il consumo fresco, perfetta come snack e apprezzata anche dai bambini.'
        },
        { 
          id: 5, 
          name: 'Fuji', 
          origin: 'Italia', 
          price: '2.50', 
          unit: 'kg', 
          available: true,
          image: '/images/products/fuji.jpg',
          description: 'La mela Fuji presenta una buccia bicolore con fondo giallo e sovraccolore rosso. La polpa è molto croccante, compatta e succosa. Il gusto è dolce e aromatico, con un equilibrio piacevole. È ideale per il consumo fresco e adatta anche a preparazioni in cucina.'
        },
        { 
          id: 6, 
          name: 'Red Delicious', 
          origin: 'Italia', 
          price: '2.30', 
          unit: 'kg', 
          available: true,
          image: '/images/products/red-delicious.jpg',
          description: 'La mela Red Delicious si riconosce per la buccia rosso intenso e la forma allungata. La polpa è tenera e succosa, dal gusto dolce e delicato. È ideale per il consumo fresco ed è apprezzata per il suo aspetto elegante e il sapore equilibrato.'
        },
        { 
          id: 7, 
          name: 'Granny Smith', 
          origin: 'Italia', 
          price: '2.40', 
          unit: 'kg', 
          available: true,
          image: '/images/products/granny-smith.jpg',
          description: 'La mela Granny Smith si distingue per la buccia verde brillante e la polpa molto croccante e succosa. Il gusto è fresco, deciso e marcatamente acidulo. È ideale per il consumo fresco e particolarmente apprezzata in cucina, soprattutto per dolci e preparazioni salate.'
        },
        { 
          id: 8, 
          name: 'Annurca', 
          origin: 'Italia', 
          price: '2.40', 
          unit: 'kg', 
          available: true,
          image: '/images/products/annurca.jpg',
          description: 'La mela Annurca è una varietà tradizionale italiana, riconoscibile per la buccia rosso intenso con fondo verde. La polpa è compatta e croccante, dal gusto equilibrato, dolce con una piacevole nota acidula. È ideale per il consumo fresco ed è apprezzata per il suo profumo intenso e caratteristico.'
        },
        { 
          id: 9, 
          name: 'Kissabel', 
          origin: 'Italia', 
          price: '4.50', 
          unit: 'kg', 
          available: true,
          image: '/images/products/kissabel.jpg',
          description: 'La mela Kissabel, nota anche come mela fragola, ha una buccia rossa intensa con sfumature rosa e gialle. La polpa è croccante, succosa e dal gusto dolce con un leggero aroma fruttato che ricorda le fragole. È ideale per il consumo fresco e come snack goloso per tutta la famiglia.'
        },
        { 
          id: 76, 
          name: 'Williams', 
          origin: 'Italia', 
          price: '2.70', 
          unit: 'kg', 
          available: true,
          image: '/images/products/williams.jpg',
          description: 'La pera Williams si distingue per la buccia verde-gialla, talvolta con leggere sfumature rosate. La polpa è succosa, morbida e molto aromatica, dal gusto dolce e intenso. È ideale per il consumo fresco, per dessert e anche per la preparazione di succhi e liquori.'
        },
        { 
          id: 10, 
          name: 'Abate Fetel', 
          origin: 'Italia', 
          price: '2.80', 
          unit: 'kg', 
          available: true,
          image: '/images/products/abate-fetel.jpg',
          description: 'La pera Abate Fetel si riconosce per la forma allungata e la buccia verde con sfumature giallo-rugginose. La polpa è bianca, fine, molto succosa e dal gusto dolce e aromatico. È ideale per il consumo fresco ed è apprezzata per l’elevata qualità e la sua eleganza.'
        },
        { 
          id: 11, 
          name: 'Kaiser', 
          origin: 'Italia', 
          price: '2.60', 
          unit: 'kg', 
          available: true,
          image: '/images/products/pera-kaiser.jpg',
          description: 'La pera Kaiser si distingue per la forma allungata, la buccia ruvida di colore marrone-ruggine e la polpa chiara, soda e profumata. Il gusto è dolce e aromatico, ideale per il consumo crudo, cotto, in dolci, macedonie e preparazioni da forno.'
        },
        { 
          id: 12, 
          name: 'Decana', 
          origin: 'Italia', 
          price: '2.50', 
          unit: 'kg', 
          available: true,
          image: '/images/products/decana.jpg',
          description: 'La pera Decana ha una buccia verde-gialla, talvolta con leggere sfumature rossastre. La polpa è soda, succosa e dal gusto dolce e aromatico, molto equilibrato. È ideale per il consumo fresco e ottima anche per dolci e preparazioni culinarie.'
        },
        { 
          id: 13, 
          name: 'Kiwi Giallo', 
          origin: 'Italia', 
          price: '4.20', 
          unit: 'kg', 
          available: true,
          image: '/images/products/kiwi-giallo.jpg',
          description: 'Il kiwi giallo si distingue per la buccia sottile e liscia di colore marrone chiaro e la polpa interna giallo dorato. La polpa è morbida, succosa e dal gusto dolce, meno acidulo rispetto al kiwi verde, con un aroma intenso e tropicale. È ideale per il consumo fresco, macedonie, smoothie e dolci.'
        },
        { 
          id: 14, 
          name: 'Kiwi Verde', 
          origin: 'Italia', 
          price: '3.20', 
          unit: 'kg', 
          available: true,
          image: '/images/products/kiwi-verde.jpg',
          description: 'Il kiwi verde si caratterizza per la buccia marrone leggermente pelosa e la polpa verde brillante con piccoli semi neri. La polpa è morbida, succosa e dal gusto acidulo equilibrato, con aroma intenso e caratteristico. Ricco di vitamina C e antiossidanti, è ideale per il consumo fresco, macedonie, frullati, dessert e dolci. Nutriente e rinfrescante.'
        },
        { 
          id: 62, 
          name: 'Fragole', 
          origin: 'Italia', 
          price: '3.50', 
          unit: 'pz', 
          available: true,
          image: '/images/products/Fragole.jpg',
          description: 'La fragola si distingue per il colore rosso brillante e la polpa succosa e dolce, con un aroma intenso e caratteristico. È ideale per il consumo fresco, macedonie, dolci, frullati e marmellate.'
        },
        {
          id: 80,
          name: 'Mirtilli',
          origin: 'Emilia Romagna',
          price: '3.20',
          unit: 'kg',
          available: true,
          image: '/images/products/mirtilli.jpg',
          description: 'I mirtilli si distinguono per il colore blu intenso e la polpa succosa, dolce e leggermente acidula. Il gusto è aromatico e delicato, ideale per il consumo fresco, in macedonie, yogurt, dolci e marmellate. Ricchissimi di antiossidanti e proprietà benefiche per la salute.'
        },
        {
          id: 81,
          name: 'More',
          origin: 'Emilia Romagna',
          price: '3.20',
          unit: 'kg',
          available: true,
          image: '/images/products/more.jpg',
          description: 'Le more si distinguono per il colore nero-violaceo della buccia e la polpa succosa e dolce con leggero retrogusto acidulo. Il gusto è aromatico e intenso, ideale per il consumo fresco, dolci, marmellate, smoothie e macedonie.'
        },
        {
          id: 82,
          name: 'Lamponi',
          origin: 'Emilia Romagna',
          price: '3.20',
          unit: 'kg',
          available: true,
          image: '/images/products/lamponi.jpg',
          description: 'I lamponi si caratterizzano per il colore rosso vivo e la forma fragile e delicata, con una polpa dolce succosa dal leggerissimo aroma acidulo. Il gusto è aromatico e delicato, ideale per il consumo fresco, in macedonie, dolci, marmellate e bevande. Apprezzati per le loro proprietà nutritive straordinarie.'
        },
        { 
          id: 19, 
          name: 'Arancia Navel', 
          origin: 'Sicilia', 
          price: '2.00', 
          unit: 'kg', 
          available: true,
          image: '/images/products/navel.jpg',
          description: 'Scopri la qualità premium di Arancia Navel. Un prodotto selezionato con cura per offrirti il miglior sapore e la massima freschezza.'
        },
        { 
          id: 21, 
          name: 'Mandarino', 
          origin: 'Calabria', 
          price: '2.80', 
          unit: 'kg', 
          available: true,
          image: '/images/products/mandarino.jpg',
          description: 'Il mandarino si riconosce per la buccia sottile e facile da sbucciare, di colore arancione brillante, e la polpa succosa e dolce con note aromatiche. È ideale per il consumo fresco, macedonie, spremute e dolci.'
        },
        { 
          id: 25, 
          name: 'Limoni', 
          origin: 'Italia', 
          price: '2.80', 
          unit: 'kg', 
          available: true,
          image: '/images/products/limoni.jpeg',
          description: 'Il limone si distingue per la buccia gialla, liscia o leggermente rugosa, e la polpa succosa e acidula. Il gusto è fresco, aromatico e deciso, ideale per il consumo fresco, spremuto come succo o utilizzato in cucina per condimenti e preparazioni dolci e salate. Ricco di vitamina C e proprietà benefiche.'
        },
        { 
          id: 26, 
          name: 'Limoni a Buccia Edibile', 
          origin: 'Italia', 
          price: '2.80', 
          unit: 'kg', 
          available: true,
          image: '/images/products/limoni-edibili.jpg',
          description: 'Il limone a buccia edibile si distingue per la buccia sottile e liscia di colore giallo intenso, consumabile insieme alla polpa. La polpa è succosa e acidula, mentre la buccia aggiunge un aroma fresco e intenso. È ideale per il consumo fresco, spremute, cucina, dolci e bevande aromatizzate.'
        },
        {
          id: 84,
          name: 'Uva Senza Semi Bianca',
          origin: 'Puglia',
          price: '3.50', 
          unit: 'kg', 
          available: true,
          image: '/images/products/uva-bianca-senza-semi.jpg',
          description: 'L\'uva bianca senza semi è la scelta ideale per il consumo pratico e piacevole, senza l\'inconveniente dei semini. La polpa è croccante, succosa e dal gusto dolce e delicato. Perfetta per il consumo fresco, macedonie, frullati e come snack sano per tutta la famiglia. Comoda, gustosa e piacevolmente sorprendente.'
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
          description: 'La banana si distingue per la buccia gialla e la polpa morbida, dolce e cremosa. Il gusto è zuccherino e delicato, ideale per il consumo fresco, frullati, dolci, dessert e macedonie.'
        },
        { 
          id: 110, 
          name: 'Ananas', 
          origin: 'Italia', 
          price: '18.90', 
          unit: 'kg', 
          available: true,
          image: '/images/products/Ananas.png',
          description: 'L\'ananas si distingue per la buccia spinosa di colore marrone-verde e la polpa interna gialla, succosa e dolce. Il gusto è aromatico e zuccherino, ideale per il consumo fresco, macedonie, frullati, dolci e succhi.'
        },
      
        {
        id: 111,
        name:'Mango',
        origin: 'Malesia',
        price: '18.90',
        unit: 'kg',
        available: true,
        image: '/images/products/mango.jpg',
        description: 'Il mango si distingue per la buccia liscia di colore verde, giallo o rosso a seconda della varietà e la polpa interna arancione, morbida, dolce e succosa. Il gusto è aromatico e zuccherino, ideale per il consumo fresco, frullati, macedonie, dolci e succhi.'
      },
      {
        id: 112,
        name:'Frutto della passione',
        origin: 'Italia',
        price: '18.90',
        unit: 'kg',
        available: true,
        image: '/images/products/frutto-della-passione.jpg',
        description: 'Il frutto della passione si distingue per la buccia dura e rugosa di colore viola o giallo e la polpa interna gelatinosa, dolce-acidula e ricca di semi. Il gusto è aromatico e tropicale, ideale per il consumo fresco, succhi, frullati, dessert e dolci.'
      },
      {
        id: 113,
        name:'Avocado',
        origin: 'Messico',
        price: '2.50',
        unit: 'pz',
        available: true,
        image: '/images/products/avocado.jpg',
        description: 'L\'avocado si distingue per la buccia verde scura, liscia o rugosa a seconda della varietà, e la polpa interna morbida, cremosa e leggermente burrosa. Il gusto è delicato e leggermente nocciolato, ideale per il consumo fresco, insalate, toast, frullati e salse come il guacamole.'
      },
      {
        id: 114,
        name:'Cocco',
        origin: 'Italia',
        price: '1.90',
        unit: 'kg',
        available: true,
        image: '/images/products/cocco.jpg',
        description: 'Il cocco si distingue per il guscio duro e marrone all\'esterno e la polpa bianca, carnosa e leggermente dolce all\'interno. Il gusto è delicato e tropicale, ideale per il consumo fresco, latte di cocco, dolci, frullati e dessert.'
      },
      {
        id: 115,
        name:'Pitaya Frutto del drago',
        origin: 'Messico',
        price: '2.50',
        unit: 'pz',
        available: true,
        image: '/images/products/frutto-del-drago.jpg',
        description: 'La pitaya si distingue per la buccia spessa e colorata, rosa o rossa con scaglie verdi, e la polpa interna bianca o rossa, dolce, succosa e ricca di piccoli semi neri. Il gusto è delicato e tropicale, ideale per il consumo fresco, frullati, macedonie e dessert.'
      },
      {
        id: 116,
        name:'Litchi',
        origin: 'Cina',
        price: '2.50',
        unit: 'kg',
        available: true,
        image: '/images/products/litchi.jpg',
        description: 'Il litchi si distingue per la buccia rugosa di colore rosso vivo e la polpa interna bianca, succosa, dolce e aromaticamente profumata. Il gusto è delicato e zuccherino, ideale per il consumo fresco, macedonie, dessert e succhi.'
      },
      {
        id: 117,
        name:'Papaya',
        origin: 'Guatemala',
        price: '2.50',
        unit: 'pz',
        available: true,
        image: '/images/products/Papaya.jpg',
        description: 'La papaya si distingue per la buccia liscia di colore verde o giallo-arancio e la polpa interna arancione, morbida, dolce e succosa. Il gusto è tropicale e aromatico, ideale per il consumo fresco, frullati, macedonie e dessert.'
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
          description: 'I broccoli si distinguono per le cime compatte di colore verde intenso e i gambi croccanti. Il gusto è delicato e leggermente amarognolo, ideale per il consumo al vapore, saltati in padella, gratinati, zuppe o insalate cotte.'
        },
        { 
          id: 30, 
          name: 'Cavolfiore', 
          origin: 'Italia', 
          price: '2.20', 
          unit: 'kg', 
          available: true,
          image: '/images/products/cavolfiore.jpg',
          description: 'Il cavolfiore viola si distingue per la testa compatta di colore viola intenso e le foglie esterne verdi. Il gusto è delicato e leggermente dolce, ideale per il consumo al vapore, bollito, gratinato, in zuppe o insalate cotte, aggiungendo un tocco di colore ai piatti.'
        },
        {
          id: 33,
          name: 'Cavolo Romano',
          origin: 'Italia',
          price: '2.20',
          unit: 'kg',
          available: true,
          image: '/images/products/cavolo-romano.jpg',
          description: 'Il cavolo romano si distingue per le foglie lunghe, rugose e di colore verde scuro, con un sapore leggermente amarognolo e aromatico. È ricco di vitamine e minerali, ideale per zuppe, minestre, saltati in padella o frullati verdi.'
        },
        { 
          id: 34, 
          name: 'Cavolini di Bruxelles', 
          origin: 'Italia', 
          price: '2.20', 
          unit: 'kg', 
          available: true,
          image: '/images/products/cavolini di bruxelles1.jpg',
          description: 'I cavolini di Bruxelles si distinguono per le piccole teste rotonde e compatte di colore verde, con foglie ben chiuse. Il gusto è leggermente amarognolo e aromatico, ideale per il consumo al vapore, bolliti, saltati in padella, gratinati o in zuppe.'
        },
        { 
          id: 36, 
          name: 'Cavolo Cappuccio', 
          origin: 'Italia', 
          price: '1.60', 
          unit: 'kg', 
          available: true,
          image: '/images/products/cavolo-cappuccio.jpg',
          description: 'Il cavolo cappuccio si distingue per la testa compatta e rotonda con foglie lisce e croccanti di colore verde chiaro o violaceo a seconda della varietà. Il gusto è delicato e leggermente dolce, ideale per il consumo crudo in insalata, al vapore, bollito, in zuppe o stufati.'
        },
        { 
          id: 37, 
          name: 'Finocchi', 
          origin: 'Italia', 
          price: '2.40', 
          unit: 'kg', 
          available: true,
          image: '/images/products/finocchi.jpg',
          description: 'I finocchi si distinguono per il bulbo bianco compatto e le fronde verdi e aromatiche. Il gusto è dolce e delicatamente anice, ideale per il consumo crudo in insalata, al vapore, bollito, gratinato o in zuppe.'
        },
        { 
          id: 38, 
          name: 'Spinaci', 
          origin: 'Italia', 
          price: '2.40', 
          unit: 'kg', 
          available: true,
          image: '/images/products/spinaci.jpg',
          description: 'Gli spinaci si distinguono per le foglie verdi, tenere e carnose. Il gusto è delicato e leggermente erbaceo, ideale per il consumo crudo in insalata, al vapore, saltati in padella, frullati o in zuppe.'
        },
        { 
          id: 39, 
          name: 'Erbette', 
          origin: 'Italia', 
          price: '2.30', 
          unit: 'kg', 
          available: true,
          image: '/images/products/erbette.jpg',
          description: 'Le erbette si distinguono per le foglie verdi tenere e i gambi bianchi croccanti. Il gusto è delicato e leggermente dolce, ideale per il consumo al vapore, saltate in padella, in zuppe o frittate.'
        },
        { 
          id: 40, 
          name: 'Catalogna', 
          origin: 'Italia', 
          price: '2.50', 
          unit: 'kg', 
          available: true,
          image: '/images/products/catalogna.jpg',
          description: 'La catalogna si distingue per le foglie lunghe, sottili e frastagliate di colore verde scuro, con un gusto amarognolo e deciso. È ideale per il consumo saltata in padella, lessata, in zuppe o come contorno.'
        },
        { 
          id: 41, 
          name: 'Coste', 
          origin: 'Italia', 
          price: '2.20', 
          unit: 'kg', 
          available: true,
          image: '/images/products/coste.jpg',
          description: 'La catalogna si distingue per le foglie lunghe, sottili e frastagliate di colore verde scuro, con un gusto amarognolo e deciso. È ideale per il consumo saltata in padella, lessata, in zuppe o come contorno.'
        },
        { 
          id: 42, 
          name: 'Radicchio', 
          origin: 'Veneto', 
          price: '3.20', 
          unit: 'kg', 
          available: true,
          image: '/images/products/radicchio.jpg',
          description: 'Il radicchio si distingue per le foglie rosse o violacee con venature bianche, croccanti e leggermente amarognole. Il gusto è deciso e amarognolo, ideale per il consumo crudo in insalata, grigliato, al vapore o saltato in padella.'
        },
        {
          id: 43, 
          name: 'Trevisana',
          origin: 'Italia',
          price: '2.50',
          unit: 'kg',
          available: true,
          image: '/images/products/trevisana.jpg',
          description: 'La trevisana si distingue per le foglie lunghe, croccanti e di colore rosso intenso con venature bianche. Il gusto è amarognolo e deciso, ideale per il consumo crudo in insalata, grigliata, al vapore o saltata in padella.'
        },
        { id: 69, 
          name: 'Lattuga Trocadero', 
          origin: 'Locale', 
          price: '1.50', 
          unit: 'pz', 
          available: true,
          image: '/images/products/lattuga-trocadero.jpg',
          description: 'La lattuga Trocadero si distingue per le foglie larghe, croccanti e di colore verde chiaro, con un cuore compatto. Il gusto è fresco e delicato, ideale per il consumo crudo in insalate, panini, wrap o come base per piatti freddi.'
        },
        { 
          id: 44, 
          name: 'Lattuga Iceberg', 
          origin: 'Italia', 
          price: '1.80', 
          unit: 'kg', 
          available: true,
          image: '/images/products/iceberg.jpg',
          description: 'La lattuga Iceberg si distingue per la testa compatta e rotonda, con foglie croccanti di colore verde chiaro. Il gusto è delicato e fresco, ideale per il consumo crudo in insalate, panini, sandwich o come base per piatti freddi.'
        },
        { 
          id: 45, 
          name: 'Lattuga Romana', 
          origin: 'Italia', 
          price: '2.00', 
          unit: 'kg', 
          available: true,
          image: '/images/products/lattuga-romana.jpg',
          description: 'La lattuga romana si distingue per le foglie lunghe, croccanti e di colore verde intenso, con un cuore centrale compatto. Il gusto è fresco e leggermente dolce, ideale per il consumo crudo in insalate, panini, wrap o come base per piatti freddi.'
        },
        { 
          id: 46, 
          name: 'Lattuga Gentilina', 
          origin: 'Italia', 
          price: '1.90', 
          unit: 'kg', 
          available: true,
          image: '/images/products/lattuga-gentilina.jpg',
          description: 'La lattuga Gentilina si distingue per le foglie piccole, tenere e croccanti, di colore verde chiaro con sfumature rosate. Il gusto è delicato e dolce, ideale per il consumo crudo in insalate, panini, sandwich o come guarnizione colorata.'
        },
        { 
          id: 47, 
          name: 'Scarola', 
          origin: 'Italia', 
          price: '2.10', 
          unit: 'kg', 
          available: true,
          image: '/images/products/scarola.jpg',
          description: 'La scarola si distingue per le foglie larghe, leggermente ricce e di colore verde chiaro, con un gusto delicatamente amarognolo. È ideale per il consumo crudo in insalata, saltata in padella, in zuppe o come contorno.'
        },
        { id: 87,
          name: 'Pomodoro ramato',
          origin: 'Sicilia', 
          price: '2.50', 
          unit: 'kg', 
          available: true,
          image: '/images/products/pomodoro ramato.jpg',
          description: 'Il pomodoro ramato si distingue per la buccia liscia di colore rosso intenso con sfumature ramate e la polpa succosa e soda. Il gusto è dolce e leggermente acidulo, ideale per il consumo crudo in insalate, salse, bruschette, panini e piatti cucinati.'
       },
       {
        id: 118,
        name: 'Cuore di Bue',
        origin: 'Italia',
        price: '1.40',
        unit: 'pz',
        available: true,
        image: '/images/products/cuore di bue.jpeg',
        description: 'Il pomodoro Cuore di Bue si distingue per la forma grande e leggermente a cuore, la buccia liscia di colore rosso intenso e la polpa carnosa e succosa. Il gusto è dolce e delicato, ideale per il consumo crudo in insalate, bruschette, panini o per preparazioni culinarie.'
       },
       {
        id: 119,
        name: 'Pomodoro Marinda',
        origin: 'Italia',
        price: '1.40',
        unit: 'pz',
        available: true,
        image: '/images/products/pomodoro marinda.jpg',
        description: 'Il pomodoro Marinda si distingue per la forma tondeggiante e compatta, la buccia liscia di colore rosso brillante e la polpa soda e succosa. Il gusto è dolce e leggermente acidulo, ideale per il consumo crudo in insalate, panini, salse o per cotture veloci.'
       },
       { id: 88, 
        name: 'Pomodorino Datterino',
        origin: 'Sicilia', 
        price: '2.50', 
        unit: 'kg', 
        available: true,
        image: '/images/products/pomodorini.jpg',
        description: 'Il pomodorino datterino si distingue per la forma allungata simile a datteri, la buccia liscia di colore rosso intenso e la polpa succosa e dolce. Il gusto è dolce e leggermente acidulo, ideale per il consumo crudo in insalate, aperitivi, bruschette o per cotture veloci.'
       },
        { id: 70, 
          name: 'Ravanelli', 
          origin: 'Italia', 
          price: '2.20', 
          unit: 'kg', 
          available: true,
          image: '/images/products/ravanelli.jpg',
          description: 'I ravanelli si distinguono per le radici tonde o allungate di colore rosso, rosa o bianco e le foglie verdi croccanti. Il gusto è fresco, leggermente piccante e croccante, ideale per il consumo crudo in insalate, come snack o come guarnizione.'
        },
        { 
          id: 48, 
          name: 'Barbabietole', 
          origin: 'Italia', 
          price: '2.99', 
          unit: 'kg', 
          available: true,
          image: '/images/products/barbabietole.jpg',
          description: 'La barbabietola si distingue per il tubero rotondo o allungato di colore rosso intenso e le foglie verdi commestibili. Il gusto è dolce e terroso, ideale per il consumo cotta, al vapore, arrosto, in insalate o frullati.'
        },
        {
          id: 49, 
          name: 'Zucca',
          origin: 'Italia',
          price: '2.20',
          unit: 'kg',
          available: true,
          image: '/images/products/zucca.jpeg',
          description: 'La zucca si distingue per la buccia dura di colore arancione, verde o grigio a seconda della varietà e la polpa interna arancione, dolce e compatta. Il gusto è delicato e leggermente dolce, ideale per il consumo al forno, in zuppe, risotti, puree e dolci.'
        }, 
        { id: 89, 
          name: 'Zucchine',
          origin: 'Italia', 
          price: '1.80',
          unit: 'kg', 
          available: true,
          image: '/images/products/zucchine.jpg',
          description: 'Le zucchine si distinguono per il frutto cilindrico o leggermente allungato, di colore verde chiaro o scuro, con polpa tenera e delicata. Il gusto è fresco e leggermente dolce, ideale per il consumo crudo in insalate, saltate in padella, al forno, ripiene o in zuppe.'
       },
       { id: 90, 
         name: 'Melanzane', 
         origin: 'Sicilia', 
         price: '2.20', 
         unit: 'kg', 
         available: true,
         image: '/images/products/melanzane.jpeg',
         description: 'Le melanzane si distinguono per il frutto allungato o tondeggiante, con buccia liscia di colore viola intenso o scuro e polpa morbida e spugnosa. Il gusto è delicato e leggermente amarognolo, ideale per il consumo grigliate, al forno, in padella, ripiene o in zuppe e ratatouille.'
       },
       { id: 91, 
         name: 'Peperoni gialli', 
         origin: 'Italia', 
         price: '2.80', 
         unit: 'kg', 
         available: true,
         image: '/images/products/peperone-giallo.jpeg',
         description: 'I peperoni gialli si distinguono per il frutto carnoso e croccante di colore giallo brillante. Il gusto è dolce e leggermente fruttato, ideale per il consumo crudo in insalate, grigliati, al forno, ripieni o in soffritti.'
       },
       { id: 92, 
         name: 'Peperoni rossi', 
         origin: 'Italia', 
         price: '2.80', 
         unit: 'kg', 
         available: true,
         image: '/images/products/peperone-rosso.jpeg',
         description: 'I peperoni rossi si distinguono per il frutto carnoso e croccante di colore rosso intenso. Il gusto è dolce e leggermente fruttato, ideale per il consumo crudo in insalate, grigliati, al forno, ripieni o in soffritti.'
       },
       { id: 93, 
         name: 'Cetrioli', 
         origin: 'Italia', 
         price: '1.50', 
         unit: 'kg', 
         available: true,
         image: '/images/products/cetrioli.jpg',
         description: 'I cetrioli si distinguono per il frutto lungo e cilindrico, di colore verde chiaro o scuro, con polpa croccante e fresca. Il gusto è delicato e rinfrescante, ideale per il consumo crudo in insalate, panini, centrifugati o come snack.'
       },
       { id: 94, 
         name: 'Fagiolini', 
         origin: 'Italia', 
         price: '3.50', 
         unit: 'kg', 
         available: true,
         image: '/images/products/cornetti.jpg',
         description: 'I fagiolini si distinguono per i baccelli lunghi e sottili di colore verde brillante, con polpa tenera e croccante. Il gusto è delicato e fresco, ideale per il consumo lessati, al vapore, saltati in padella o in insalate.'
       },
        { 
          id: 50, 
          name: 'Carote', 
          origin: 'Italia', 
          price: '2.20', 
          unit: 'kg', 
          available: true,
          image: '/images/products/carote.jpg',
          description: 'Le carote con il ciuffo si distinguono per la radice allungata di colore arancione brillante e le foglie verdi fresche attaccate. La polpa è croccante e dolce, con gusto delicato e naturale, ideale per il consumo crudo, cotto, in insalate, contorni e frullati.'
        },
        { 
          id: 51, 
          name: 'Carote Pacchetto', 
          origin: 'Italia', 
          price: '2.20', 
          unit: 'pz', 
          available: true,
          image: '/images/products/carote pacchetto.jpg',
          description: 'Le carote si distinguono per la radice allungata di colore arancione brillante e la polpa croccante e dolce. Il gusto è delicato e naturalmente zuccherino, ideale per il consumo crudo, cotto, in insalate, zuppe, contorni e frullati.'
        },
        { 
          id: 52, 
          name: 'Carote Sfuse', 
          origin: 'Italia', 
          price: '2.20', 
          unit: 'kg', 
          available: true,
          image: '/images/products/Carote sfuse.jpg',
          description: 'Le carote si distinguono per la radice allungata di colore arancione brillante e la polpa croccante e dolce. Il gusto è delicato e naturalmente zuccherino, ideale per il consumo crudo, cotto, in insalate, zuppe, contorni e frullati.'
        },
        { 
          id: 53, 
          name: 'Patate Rosse', 
          origin: 'Italia', 
          price: '1.80', 
          unit: 'kg', 
          available: true,
          image: '/images/products/patate-rosse.jpg',
          description: 'Le patate rosse si distinguono per la buccia liscia di colore rosso e la polpa chiara, compatta e soda. Il gusto è delicato e leggermente dolce, ideale per il consumo arrosto, al forno, lessate, in insalate e contorni.'
        },
        {
          id: 54,
          name: 'Patate Bianche',
          origin: 'Italia',
          price: '2.20',
          unit: 'kg',
          available: true,
          image: '/images/products/patata-bianca.jpg',
          description: 'Le patate bianche si distinguono per la buccia chiara e la polpa bianca, farinosa e morbida dopo la cottura. Il gusto è delicato e leggermente dolce, ideale per il consumo lessate, in puree, gnocchi, zuppe e contorni.'
        },
        { 
          id: 55, 
          name: 'Patate Gialle', 
          origin: 'Italia', 
          price: '1.60', 
          unit: 'kg', 
          available: true,
          image: '/images/products/patate-gialle.jpg',
          description: 'Le patate gialle si distinguono per la buccia chiara e la polpa gialla, compatta e soda. Il gusto è delicato e leggermente saporito, ideale per il consumo al forno, arrosto, in padella, lessate e come contorno.'
        },
        {
          id: 56,
          name: 'Patate Sacchetto',
          origin: 'Italia',
          price: '2.20',
          unit: 'kg',
          available: true,
          image: '/images/products/patate-sacchetto.jpeg',
          description: 'Le patate gialle in sacchetto da 2 kg si distinguono per la buccia chiara e la polpa gialla, compatta e soda. Il gusto è delicato e leggermente saporito, ideali per il consumo al forno, arrosto, in padella, lessate e come contorno.'
        },
        {
          id: 120,
          name: 'Patate Dolce',
          origin: 'Italia',
          price: '2.20',
          unit: 'kg',
          available: true,
          image: '/images/products/patata-dolce.jpg',
          description: 'La patata dolce si distingue per la buccia liscia di colore arancione, rame o violaceo e la polpa interna arancione o chiara, morbida e naturalmente dolce. Il gusto è dolce e delicato, ideale per il consumo al forno, lessata, in puree, contorni, zuppe e dolci.'
        },
        {
          id: 121,
          name:'Zenzero',
          origin: 'Italia',
          price: '2.40',
          unit: 'Kg',
          available: true,
          image: '/images/products/zenzero.jpeg',
          description: 'Lo zenzero è una radice dal sapore deciso e leggermente piccante, molto apprezzata per le sue proprietà digestive e tonificanti. Ottimo sia fresco che grattugiato in cucina.'
        },
        { 
          id: 57, 
          name: 'Porri', 
          origin: 'Italia', 
          price: '2.60', 
          unit: 'kg', 
          available: true,
          image: '/images/products/porri.jpg',
          description: 'Il porro si distingue per il fusto lungo e cilindrico di colore bianco nella parte inferiore e verde nella parte superiore. Il gusto è delicato e leggermente dolce, ideale per il consumo in zuppe, risotti, torte salate, saltato in padella o come contorno.'
        },
        {
          id: 122,
          name:'Cipolla Bianca',
          origin: 'Italia',
          price: '2.60',
          unit: 'kg',
          available: true,
          image: '/images/products/cipolla bianca.jpg',
        description: 'La cipolla bianca si distingue per la buccia chiara e la polpa bianca, croccante e dal sapore delicato. Il gusto è dolce e leggermente pungente, ideale per il consumo crudo in insalata, cotto in soffritti, zuppe, salse e contorni.'
        },
        {
          id: 123,
          name:'Cipolla Rossa',
          origin: 'Italia',
          price: '2.60',
          unit: 'kg',
          available: true,
          image: '/images/products/cipolla-rossa.jpg',
          description: 'La cipolla rossa si distingue per la buccia e la polpa violacea, croccante e leggermente dolce. Il gusto è delicato con un retrogusto aromatico, ideale per il consumo crudo in insalate, marinate, grigliate, soffritti e contorni.'
        },
        {
          id: 124,
          name:'Cipolla Dorata',
          origin: 'Italia',
          price: '2.60',
          unit: 'kg',
          available: true,
          image: '/images/products/cipolla dorata.jpg',
          description: 'La cipolla dorata si distingue per la buccia dorata e la polpa bianca, croccante e dolce. Il gusto è delicato e aromatico, ideale per il consumo crudo in insalate, soffritti, zuppe, salse e contorni.'
        },
        {
          id: 125,
          name:'Cipolla Tropea',
          origin: 'Italia',
          price: '2.60',
          unit: 'kg',
          available: true,
          image: '/images/products/cipolla-tropea.jpg',
          description: 'La cipolla di Tropea si distingue per la buccia e la polpa rosso-violacea, dolce e succosa. Il gusto è delicato e aromatico, ideale per il consumo crudo in insalate, carpacci, marinate, grigliate o cotto in soffritti e contorni.'
        },
        {
          id: 126,
          name:'Scalogno',
          origin: 'Italia',
          price: '2.60',
          unit: 'kg',
          available: true,
          image: '/images/products/scalogno.jpg',
          description: 'Lo scalogno si distingue per il bulbo allungato di colore rosato o violaceo e la polpa bianca dal sapore delicato. Il gusto è dolce e aromatico, ideale per il consumo crudo in insalate, marinature, soffritti, salse e contorni.'
        },
        { 
          id: 58, 
          name: 'Aglio', 
          origin: 'Italia', 
          price: '6.00', 
          unit: 'kg', 
          available: true,
          image: '/images/products/aglio.jpg',
          description: 'L’aglio si distingue per il bulbo bianco suddiviso in spicchi, con aroma intenso e caratteristico. Il gusto è pungente e aromatico, ideale per il consumo crudo, in soffritti, salse, zuppe, marinate e contorni.'
        },
        { 
          id: 59, 
          name: 'Sedano', 
          origin: 'Italia', 
          price: '2.00', 
          unit: 'kg', 
          available: true,
          image: '/images/products/sedano.jpg',
          description: 'Il sedano si distingue per i gambi croccanti di colore verde chiaro e le foglie aromatiche. Il gusto è fresco e leggermente amarognolo, ideale per il consumo crudo in insalate, centrifugati, zuppe, soffritti e contorni.'
        },
        {
          id: 72,
          name: 'Rucola',
          origin: 'Italia',
          price: '2.20',
          unit: 'kg',
          available: true,
          image: '/images/products/rucola.jpg',
          description: 'La rucola si distingue per le foglie verdi, sottili e leggermente frastagliate, dal sapore piccante e aromatico. È ideale per il consumo crudo in insalate, panini, pizze, insaporire piatti di pasta o come guarnizione.'
        },
        {
          id: 127,
          name: 'Fantasia Fine',
          origin: 'Italia',
          price: '1.40',
          unit: 'pz',
          available: true,
          image: '/images/products/fantasia fine.jpg',
          description: 'Un mix raffinato di tenere insalate a foglia fine, selezionate e sapientemente combinate. Ideale come base per insalatone complete o piatti freschi, con un gusto delicato e una presentazione elegante. Perfetto per chi ama le insalate gourmet e ricercate.'
        },
        {
          id: 128,
          name: 'Fantasia Grossa',
          origin: 'Italia',
          price: '1.40',
          unit: 'pz',
          available: true,
          image: '/images/products/fantasia-grossa.jpg',
          description: 'Una selezione generosa di insalate a foglia larga e carnosa, dal sapore ricco e consistente. Perfetto per piatti abbondanti e nutrienti, mantiene la freschezza e la croccantezza anche dopo ore. Ideale per insalate sostanziose che saziano e accontentano tutti.'
        },
        {
          id: 129,
          name: 'Mix di Insalate',
          origin: 'Italia',
          price: '1.40',
          unit: 'pz',
          available: true,
          image: '/images/products/bs mix di insalate.jpg',
          description: 'Una miscela versatile di diverse varietà di insalate, perfettamente bilanciate per offrire una varietà di sapori e consistenze. Il mix ideale per famiglie che amano la varietà e non vogliono annoiarsi. Fresco, nutriente e sempre gustoso.'
        },
        {
          id: 130,
          name: 'Novella',
          origin: 'Italia',
          price: '1.40',
          unit: 'pz',
          available: true,
          image: '/images/products/bs novella.jpg',
          description: 'Insalata novella di primavera, dal sapore delicato e dalla consistenza incredibilmente tenera e croccante. Raccolta al momento giusto per garantire la massima freschezza. Perfetta per chi apprezza la qualità premium e il gusto autentico dell\'orto.'
        },
        {
          id: 131,
          name: 'Valeriana',
          origin: 'Italia',
          price: '1.40',
          unit: 'pz',
          available: true,
          image: '/images/products/Valeriana.jpg',
          description: 'Una insalata dal sapore caratteristico, leggermente dolce con note erbacee raffinate. Ricca di nutrienti e di straordinaria freschezza, perfetta da sola o in abbinamento. Ideale per insalate invernali dal profilo gourmet.'
        },
        {
          id: '38',
          name: 'Spinaci',
          origin: 'Italia',
          price: '1.40',
          unit: 'pz',
          available: true,
          image: '/images/products/spinaci.jpg',
          description: 'Gli spinaci si distinguono per le foglie verdi, tenere e carnose. Il gusto è delicato e leggermente erbaceo, ideale per il consumo crudo in insalata, al vapore, saltati in padella, frullati o in zuppe.'
        },
        {
          id: 132,
          name: 'Cicorino Misto',
          origin: 'Italia',
          price: '1.40',
          unit: 'pz',
          available: true,
          image: '/images/products/cicorino-misto.jpg',
          description: 'Un accattivante mix di cicorini selezionati per il loro gusto leggermente amarognolo e la consistenza croccante. Perfetto per chi ama sapori decisi e ricercati. Ottimo da solo o abbinato ad altri ingredienti per contrasti affascinanti.'
        },
        {
          id: 133,
          name: 'Cicoria Verde Fine',
          origin: 'Italia',
          price: '1.40',
          unit: 'pz',
          available: true,
          image: '/images/products/cicoria-verde-fine.jpg',
          description: 'Cicoria verde a foglia fine dal sapore fresco e caratteristico, lievemente amarognolo. Ricca di proprietà nutritive e dallo straordinario valore salutistico. Perfetta per insalate genuine e preparazioni tradizionali.'
        },
        {
          id: 134,
          name: 'Minestrone',
          origin: 'Italia',
          price: '1.40',
          unit: 'pz',
          available: true,
          image: '/images/products/minestrone.jpg',
          description: 'Una miscela pronta all\'uso di ortaggi freschi e teneri, perfettamente combinati per il minestrone. Qualità selezionata, freschezza garantita. Basta aggiungere il brodo e i vostri ingredienti preferiti per una minestra vera e buona.'
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
          description: 'Scopri la qualità premium di Noci Naturali. Un prodotto selezionato con cura per offrirti il miglior sapore e la massima freschezza.'
        },
        { 
          id: 136, 
          name: 'Mandorle', 
          origin: 'Italia', 
          price: '1.90', 
          unit: 'kg', 
          available: true,
          image: '/images/products/Mandorle sgusciate.jpg',
          description: 'Le mandorle sono frutti secchi dal sapore delicato e dolce, con una consistenza croccante e gustosa. Ricche di proteine, grassi buoni e vitamina E, sono perfette per un\'alimentazione sana ed equilibrata. Ideali come snack naturale, per dolci, pasticceria, marzapani, latte vegetale e numerose preparazioni dolci.'
        },
        { 
          id: 137, 
          name: 'Nocciole', 
          origin: 'Italia', 
          price: '1.90', 
          unit: 'kg', 
          available: true,
          image: '/images/products/nocciole.jpg',
          description: 'Le nocciole sono frutti secchi dal sapore dolce e delicato, con una consistenza morbida e piacevole. Ricche di proprietà nutritive e da fondamentale importanza in gastronomia, sono perfette per creme, cioccolato, pasticceria e ricette tradizionali come la nocciola di Piemonte.'
        },
        { 
          id: 138, 
          name: 'Pistacchi', 
          origin: 'Italia', 
          price: '1.90', 
          unit: 'kg', 
          available: true,
          image: '/images/products/pistacchi.jpg',
          description: 'I pistacchi sono frutti secchi pregiati dal sapore delicato, leggermente salato e molto apprezzato. Ricchi di antiossidanti e grassi buoni, sono perfetti come snack naturale e in numerose preparazioni dolci e salate. Ingrediente nobile per pasticceria, salse e un\'alimentazione equilibrata.'
        },
        { 
          id: 139, 
          name: 'Castagne Secche', 
          origin: 'Italia', 
          price: '1.90', 
          unit: 'kg', 
          available: true,
          image: '/images/products/castagne secca.jpg',
          description: 'Le castagne secche mantengono il sapore dolce e la consistenza farinosa del frutto fresco, perfette per preparazioni tradizionali. Ricche di carboidrati e fibre, sono ideali per zuppe, marron glacé, farine e preparazioni tipiche. Ingrediente essenziale della cucina autunnale e invernale.'
        },
        {id: 140,
          name:'Noci Macadamia',
          origin: 'Australia',
          price: '1.90',
          unit: 'kg',
          available: true,
          image: '/images/products/Noci-Macadamia.jpg',
          description: 'Le noci macadamia sono frutti secchi pregiati dal sapore dolce e dalla consistenza morbida e burrosa. Ricchissime di grassi monoinsaturi benefici, sono perfette per un\'alimentazione equilibrata. Ideali come snack di lusso, per creme, pasticceria gourmet e un\'esperienza gustativa straordinaria.'
        },
        {id: 141,
          name:'Arachidi',
          origin: 'Italia',
          price: '1.90',
          unit: 'kg',
          available: true,
          image: '/images/products/Arachidi1.jpg',
          description: 'Le arachidi sono legumi dal sapore intenso e caratteristico, molto apprezzate come snack croccante. Ricche di proteine vegetali e grassi buoni, sono perfette per un\'alimentazione sana. Versatili per numerose preparazioni dolci e salate, burro di arachidi e snack golosi.'
        },
        {
          id: 142,
          name:'Datteri',
          origin: 'Italia',
          price: '1.90',
          unit: 'kg',
          available: true,
          image: '/images/products/datteri.jpg',
          description: 'I datteri sono frutti dolcissimi e nutrienti, ricchi di fibre, minerali e energia naturale. Dal sapore intenso e piacevolmente melato, sono perfetti per uno spuntino sano e energetico. Ottimi per arricchire dolci, preparazioni orientali, granola e per chi cerca il piacere dolce in forma naturale.'
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
          description: 'Grissini preparati artigianalmente con metodi tradizionali, croccanti e fragranti. Ingredienti semplici e di qualità per un gusto autentico che soddisfa il palato. Perfetti con aperitivi, formaggi o semplicemente come snack goloso.'
        },
        { id: 144,
          name: 'Grissini Artigianali Integrali', 
          origin: 'Locale', 
          price: '4.00', 
          unit: 'Pz', 
          available: true,
          image: '/images/products/grissini-artigianali-integrali.jpeg',
          description: 'Grissini integrali realizzati con cura artigianale, combinando il sapore autentico con il beneficio dei cereali integrali. Croccanti e saporiti, sono l\'alternativa salutare per chi non vuole rinunciare al gusto. Ideali per spuntini consapevoli.'
        },
        { id: 145, 
          name: 'Crostini', 
          origin: 'Locale', 
          price: '4.00', 
          unit: 'Pz', 
          available: true,
          image: '/images/products/crostini.jpeg',
          description: 'Crostini croccanti e saporiti, perfetti base per antipasti gourmet o accompagnamento elegante a piatti. Ricetta artigianale che garantisce la fragranza e il sapore autentico ad ogni morso. Essenziali per chi ama l\'aperitivo ricercato.'
        },
        { id: 146, 
          name: 'Cereal Cracker', 
          origin: 'Locale', 
          price: '4.00', 
          unit: 'Pz', 
          available: true,
          image: '/images/products/cereal-cracker.jpeg',
          description: 'Cracker ai cereali con ricetta equilibrata e ingredienti selezionati per un gusto completo e genuino. Croccanti e nutrienti, perfetti per accompagnare formaggi, salumi o da gustare da soli. L\'alternativa consapevole e saporita.'
        },
        {
          id: 147, 
          name: 'Focaccelle al Mais', 
          origin: 'Locale', 
          price: '4.00', 
          unit: 'Pz', 
          available: true,
          image: '/images/products/focaccella-al-mais.jpeg',
          description: 'Focaccelle leggere e fragranti al mais, con il gusto dolciastro e la consistenza morbida. Realizzate artigianalmente per garantire qualità e sapore autentico. Perfette a colazione, merenda o per sorprese gustose.'
        },
        {
          id: 148, 
          name: 'Focaccine Mantovane', 
          origin: 'Locale', 
          price: '4.00', 
          unit: 'Pz', 
          available: true,
          image: '/images/products/focaccine-mantovane.jpeg',
          description: 'Focaccine tradizionali mantovane con ricetta autentica, morbide e saporite. Rispettano la tradizione gastronomica mentre deliziano con il loro sapore caratteristico. Ideali per chi ama il gusto autentico e le ricette di una volta.'
        },
        {
          id: 149, 
          name: 'Taralli', 
          origin: 'Locale', 
          price: '4.00', 
          unit: 'Pz', 
          available: true,
          image: '/images/products/taralli.jpeg',
          description: 'Taralli croccanti e saporiti, realizzati con ricetta tradizionale italiana. Il perfetto snack da accompagnare a vino, birra o aperitivi. Sapore autentico e croccantezza che non si dimentica facilmente.'
        },
        {
          id: 150, 
          name: 'Gallette di Mais', 
          origin: 'Locale', 
          price: '4.00', 
          unit: 'Pz', 
          available: true,
          image: '/images/products/gallette-di-mais.jpeg',
          description: 'Gallette leggere e croccanti a base di mais puro, l\'alternativa sana e gustosa. Perfette per chi segue diete consapevoli o semplicemente ama snack leggeri. Ideali da sole o con condimenti a scelta.'
        },
        {
          id: 151, 
          name: 'Biscotti Aurora', 
          origin: 'Locale', 
          price: '4.00', 
          unit: 'Pz', 
          available: true,
          image: '/images/products/aurore.jpeg',
          description: 'Biscotti artigianali dalla ricetta tradizionale, morbidi e fragranti. Preparati con ingredienti genuini selezionati, mantengono la fragranza e il sapore autentico. Prodotto genuino, made in Italy. Ideali con tè, caffè o colazione, sono il piacere semplice e autentico.'
        },
        {
          id: 152, 
          name: 'Treccia Pesca e Amaretto', 
          origin: 'Locale', 
          price: '4.00', 
          unit: 'Pz', 
          available: true,
          image: '/images/products/treccia-pesca-e-amaretto.jpeg',
          description: 'Una deliziosa treccia che combina il sapore dolce e fresco della pesca con le note raffinate dell\'amaretto. Preparata artigianalmente con ingredienti di qualità. Irresistibile per i momenti golosi con una certa eleganza.'
        },
        {
          id: 153, 
          name: 'Fiocchi di sfoglia Frutti di bosco', 
          origin: 'Locale', 
          price: '4.00', 
          unit: 'Pz', 
          available: true,
          image: '/images/products/fiocchi-di-sfoglia-frutti-di-bosco.jpeg',
          description: 'Fiocchi di sfoglia fragranti con l\'aggiunta dei sapori golosi dei frutti di bosco. Sfogliati e delicati, perfetti per colazioni speciali o pause dolci nel pomeriggio. Qualità artigianale che sorprende ad ogni morso.'
        },
        {
          id: 154, 
          name: 'Fiocchi di sfoglia Fragola', 
          origin: 'Locale', 
          price: '4.00', 
          unit: 'Pz', 
          available: true,
          image: '/images/products/fiocchi-di-sfoglia-fragola.jpeg',
          description: 'Fiocchi di sfoglia dal sapore inconfondibile della fragola, preparati con ingredienti selezionati. La fragranza della sfoglia abbinata al gusto dolce della fragola crea un\'esperienza golosa memorabile. Perfetti per colazioni o merende raffinate.'
        },
        {
          id: 155, 
          name: 'Frollino al Limone', 
          origin: 'Locale', 
          price: '4.00', 
          unit: 'Pz', 
          available: true,
          image: '/images/products/frollino-al-limone.jpeg',
          description: 'Frollini mantecati e friabili al profumo di limone siciliano, per un gusto fresco e solare. Ricetta tradizionale con ingredienti genuini che garantisce il crollo in bocca. Ideali con tè o caffè per un momento di autentico piacere.'
        },
        {
          id: 156, 
          name: 'Farina Bramata di Mais', 
          origin: 'Locale', 
          price: '4.00', 
          unit: 'Pz', 
          available: true,
          image: '/images/products/farina-di-mais-bramata.jpeg',
          description: 'Farina di mais bramata, prodotto genuino per preparazioni tradizionali come la polenta. Grani di mais selezionati per garantire gusto autentico e texture perfetta. Essenziale per chi ama la cucina tradizionale e genuina.'
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
          description: 'Prodotto con carni scelte di suino italiano insaccato in budello naturale legato a mano. Stagionato per circa 90 giorni, sviluppa una maturazione perfetta che garantisce sapore intenso e equilibrato. Pezzatura: 1,4-1,8 kg. Perfetto per antipasti autentici, taglieri tradizionali e il piacere della vera gastronomia italiana.'
        },
      
        {
        id: 158,
        name:'Cacciatore',
        origin: 'Italia',
        price: '18.90',
        unit: 'kg',
        available: true,
        image: '/images/products/Salame Cacciatore.jpg',
        description: 'Prodotto con carni scelte di suino italiano insaccato in budello naturale legato a mano. Stagionato per 20-30 giorni, è pronto da gustare con aroma caratteristico. Pezzatura: 210-230 gr. Perfetto per antipasti, spuntini e da abbinare a vini rossi. Classico della salumeria italiana.'
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
          description: 'La mozzarella di bufala è un formaggio fresco a pasta filata dal colore bianco puro e dall\'aspetto morbido e cremoso. Dal sapore delicato e lievemente salato, con un aroma caratteristico latte di bufala. La consistenza è elastica e fondente in bocca. Perfetta per insalate caprese, antipasti gourmet e preparazioni fresche. Qualità DOP garantita.'
        },
        {
          id: 160,
          name:'Mozzarella di Bufala - Bocconcini',
          origin: 'Italia',
          price: '4.90',
          unit: 'pz',
          available: true,
          image: '/images/products/bocconcini mozzarella di bufala.jpg',
          description: 'Mozzarella di bufala in praticissimi bocconcini, dal colore bianco puro e dall\'aspetto morbido e cremoso. Stessi sapori delicati e il caratteristico aroma lattiero della bufala, con una consistenza elastica che diventa più fondente col passare delle ore. Perfetti per stuzzichini, insalate e piatti freddi. Praticità gourmet.'
        },
        {
          id: 161,
          name:'Burrata',
          origin: 'Italia',
          price: '4.90',
          unit: 'pz',
          available: true,
          image: '/images/products/burrata.jpeg',
          description: 'La burrata è un formaggio fresco cremoso, con un esterno di mozzarella fiordilatte e un cuore morbido e burroso composto da crema di latte e stracciatella. Dal sapore ricco e delicato, con un aroma intensamente lattiero. La consistenza è esteriormente soda e interiormente straordinariamente cremosa e burrosa. Consumo fresco, accompagnato da pane tostato o insalate. Esperienza gastronomica unica.'
        },
        {
          id: 162,
          name:'Formaggella di Malga',
          origin: 'Italia',
          price: '4.90',
          unit: 'pz',
          available: true,
          image: '/images/products/Formaggella di Malga.jpg',
          description: 'Formaggio tradizionale delle valli bergamasche, prodotto in malga con latte crudo. Dalla consistenza compatta e cremosa, rappresenta l\'eccellenza casearia alpina. Sapore delicato ma caratteristico, è il simbolo della tradizione casearia montane delle valli bergamasche.'
        },
        
        {
          id: 163,
          name:'Formaggio Branzi',
          origin: 'Italia',
          price: '4.90',
          unit: 'kg',
          available: true,
          image: '/images/products/formaggio branzi.jpg',
          description: 'Formaggio semigrasso da tavola prodotto con latte crudo, dalla tradizione casearia alpina. Pasta compatta con sapore delicato e caratteristico. Ideale per consumo da tavola e per completare taglieri di formaggi tradizionali.'
        },
        {
            id: 164,
          name:'Taleggio',
          origin: 'Lombardia',
          price: '11.00',
          unit: 'kg',
          available: true,
          image: '/images/products/Taleggio.jpg',
          description: 'Formaggio a pasta molle di media stagionatura, dal colore giallo paglierino e dai caratteristici odori intensi. La crosta naturale sviluppa una morbidezza unica, la pasta diventa sempre più cremosa con il passare dei giorni. Sapore ricco e aromatico. Perfetto per taglieri, degustazioni e accompagnamenti.'
        },
        {
          id: 165,
          name:'Stracchino Nostrano',
          origin: 'Italia',
          price: '4.90',
          unit: 'kg',
          available: true,
          image: '/images/products/Stracchino-nostrano-monte-bronzone.jpg',
          description: 'Formaggio a pasta molle fresca dalla ricetta tradizionale. Mantiene il sapore cremoso e delicato grazie alla breve stagionatura di 15-20 giorni. Ideale consumato fresco, è perfetto per taglieri e abbinamenti con vini bianchi.'
        },
        {
          id: 166,
          name:'Gorgonzola',
          origin: 'Italia',
          price: '4.90',
          unit: 'kg',
          available: true,
          image: '/images/products/gorgonzola.jpeg',
          description: 'Formaggio erborinato dal sapore deciso e affascinante, con le caratteristiche venature blu-verdi. Cremoso al palato con una complessità di sapori che sorprende. Perfetto per piatti gourmet, aperitivi eleganti o tagliere di formaggi ricercato.'
        },
        {
          id: 167,
          name:'Robiola Fresca',
          origin: 'Italia',
          price: '4.90',
          unit: 'kg',
          available: true,
          image: '/images/products/Robiola-fresca.jpg',
          description: 'Formaggio da tavola a pasta molle fresco dal sapore delicato e cremoso. La consistenza morbida e la freschezza sono garantite. Perfetto da gustare naturale, è ideale per chi ama i formaggi freschi e genuini.'
        },
        {
          id: 168,
          name:'Camembert di Capra',
          origin: 'Italia',
          price: '4.90',
          unit: 'kg',
          available: true,
          image: '/images/products/Camembert-di-capra.jpg',
          description: 'Formaggio a pasta molle da latte di capra, con crosta fiorita e cuore morbido e cremoso. Sapore delicato con sentori caratteristici capresi, elegante e raffinato. Ideale per taglieri speciali e palati ricercati.'
        },
        {
          id: 169,
          name:'Formaggella di Capra',
          price: '4.90',
          unit: 'kg',
          available: true,
          image: '/images/products/Formaggella di capra.jpg',
          description: 'Una tradizionale formaggella di capra, dal sapore leggermente acidulo e salato, perfettamente bilanciato. Pasta compatta e cremosa, ideale per assaporare l\'autenticità casearia. Rappresenta la genuinità della produzione lattiero-casearia tradizionale.'
        },
        {
          id: 170,
          name:'Formaggio di Capra',
          origin: 'Italia',
          price: '4.90',
          unit: 'kg',
          available: true,
          image: '/images/products/formaggio-di-capra.jpg',
          description: 'Formaggio classico da latte di capra, dal sapore caratteristico e dalla consistenza cremosa. Ingrediente versatile per antipasti, insalate o semplicemente gustato al naturale. La scelta per chi apprezza i sapori autentici e distintivi.'
        },
        {
          id: 171,
          name:'Toma',
          origin: 'Italia',
          price: '4.90',
          unit: 'kg',
          available: true,
          image: '/images/products/Toma.jpg',
          description: 'Formaggio semigrasso prodotto con latte caprino, dalla pasta compatta e dal sapore delicato ma caratteristico. Rappresenta la qualità della casearia caprina tradizionale. Ideale per consumo da tavola e taglieri specializzati.'
        },
        {
          id: 172,
          name:'Blu di Capra',
          origin: 'Italia',
          price: '4.90',
          unit: 'kg',
          available: true,
          image: '/images/products/blu-di-capra.jpeg',
          description: 'Formaggio erborinato pregiato prodotto con latte caprino, dalle caratteristiche venature blu. Sapore deciso e affascinante con note capresi. Formaggio da tavola perfetto per chi ricerca eccellenza e sapori caratteristici.'
        },
        {
          id: 173,
          name:'Casera',
          origin: 'Italia',
          price: '4.90',
          unit: 'kg',
          available: true,
          image: '/images/products/Casera.jpeg',
          description: 'Formaggio semigrasso, di media e lunga stagionatura, a pasta semidura e dura. Tipico della valle che gli dà il nome, nella provincia di Sondrio, viene prodotto con latte di vacca parzialmente scremato. La tecnica casearia è tipica dei formaggi alpini. Stagiona almeno 70 giorni, dopodiché viene marchiato a fuoco.'
        },
        {
          id: 174,
          name:'Camembert di Bufala',
          origin: 'Italia',
          price: '4.90',
          unit: 'kg',
          available: true,
          image: '/images/products/Camembert-di-bufala.jpg',
          description: 'Camembert realizzato con il latte pregiato di bufala, offrendo una cremosità straordinaria e un sapore ricco. Crosta fiorita e pasta morbida creano un\'esperienza gastronomica unica. Perfetto per chi ricerca l\'eccellenza nei formaggi.'
        },
        {
          id: 175,
          name:'Burro',
          origin: 'Italia',
          price: '4.90',
          unit: 'kg',
          available: true,
          image: '/images/products/Burro.jpg',
          description: 'Burro pastorizzato. Ottenuto dalle migliori panne di affioramento italiane. Dal punto di vista compositivo il burro deve avere un tenore minimo di grassi lattieri dell’80% ma inferiore al 90% e tenori massimi di acqua del 16% ed estratto secco no grasso lattiero del 2%.'
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
          description: 'Uova fresche da galline allevate con cura, garantendo qualità e tracciabilità. Guscio robusto e contenuto nutrizionalmente ricco. Essenziali per ogni cucina, dalle ricette semplici alle preparazioni più elaborate.'
        },
        { id: 177, 
          name: 'Uova (4pz)', 
          origin: 'Italia', 
          price: '2.50', 
          unit: 'conf', 
          available: true,
          image: '/images/products/uova-4pz.jpeg',
          description: 'Confezione pratica di 4 uova fresche e di qualità, perfetta per chi ha esigenze abitudinarie. Garantiscono freschezza e genuinità in ogni preparazione. La scelta intelligente per chi ama la praticità senza compromessi sulla qualità.'
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
