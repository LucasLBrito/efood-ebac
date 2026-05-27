import type { Restaurante } from '../types'

const img = (id: string, w = 800) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&auto=format&fit=crop&q=80`

export const restaurants: Restaurante[] = [
  {
    id: 1,
    titulo: 'Trattoria Brito',
    destacado: true,
    tipo: 'Italiana',
    avaliacao: 4.8,
    descricao:
      'Autêntica culinária italiana preparada com ingredientes importados. Massas artesanais, pizzas napolitanas e risotos cremosos que transportam você diretamente para a Itália.',
    capa: img('1414235077428-338989a2e8c0'),
    cardapio: [
      {
        id: 11,
        nome: 'Pizza Margherita',
        foto: img('1565299624946-b28f40a0ae38', 400),
        preco: 4900,
        descricao:
          'Clássica pizza italiana com molho de tomate San Marzano, mozzarella de búfala fresca e folhas de manjericão.',
        porcao: 'Serve 2 pessoas',
      },
      {
        id: 12,
        nome: 'Tagliatelle al Ragù',
        foto: img('1476224203421-74177f19a9b9', 400),
        preco: 5800,
        descricao:
          'Massa fresca artesanal ao ragù de carne bovina cozido por 8 horas, finalizado com parmigiano reggiano.',
        porcao: 'Serve 1 pessoa',
      },
      {
        id: 13,
        nome: 'Risotto ai Funghi',
        foto: img('1504674900247-0877df9cc836', 400),
        preco: 6200,
        descricao:
          'Risoto cremoso com mix de cogumelos porcini e shitake, vinho branco e parmigiano regginao ralado na hora.',
        porcao: 'Serve 1 pessoa',
      },
    ],
  },
  {
    id: 2,
    titulo: 'Hioki Sushi',
    destacado: true,
    tipo: 'Japonesa',
    avaliacao: 4.9,
    descricao:
      'A melhor culinária japonesa no conforto da sua casa. Sushis frescos, sashimis deliciosos e pratos quentes incríveis. Entrega rápida, produtos bem embalados.',
    capa: img('1579871494447-9811cf80d66c'),
    cardapio: [
      {
        id: 21,
        nome: 'Temaki Salmão',
        foto: img('1579871494447-9811cf80d66c', 400),
        preco: 2800,
        descricao:
          'Temaki crocante recheado com salmão fresco, cream cheese e pepino japonês. Um clássico irresistível.',
        porcao: '2 unidades',
      },
      {
        id: 22,
        nome: 'Sashimi Premium',
        foto: img('1546069901-ba9599a7e63c', 400),
        preco: 6900,
        descricao:
          'Seleção especial com 15 peças de sashimi de salmão, atum e peixe branco, acompanhado de molho shoyu especial.',
        porcao: '15 peças',
      },
      {
        id: 23,
        nome: 'Ramen Tonkotsu',
        foto: img('1588166524941-3bf61a9c41db', 400),
        preco: 4500,
        descricao:
          'Caldo cremoso de osso de porco cozido por 12 horas, com macarrão artesanal, chashu e ovo marinado.',
        porcao: 'Serve 1 pessoa',
      },
    ],
  },
  {
    id: 3,
    titulo: 'Brito Burguer',
    destacado: false,
    tipo: 'Americana',
    avaliacao: 4.6,
    descricao:
      'Os melhores burgers artesanais da cidade! Carnes selecionadas, pães brioche frescos e combinações irresistíveis para qualquer hora do dia.',
    capa: img('1550547660-d9450f859349'),
    cardapio: [
      {
        id: 31,
        nome: 'Smash Burger Classic',
        foto: img('1568901346375-23c9450c58cd', 400),
        preco: 3500,
        descricao:
          'Blend de 180g de carne angus, queijo cheddar americano, pickles crocantes, cebola e molho especial da casa no pão brioche.',
        porcao: '1 unidade',
      },
      {
        id: 32,
        nome: 'BBQ Bacon Burguer',
        foto: img('1550547660-d9450f859349', 400),
        preco: 4200,
        descricao:
          'Blend duplo de 200g, bacon crocante, queijo gruyère, cebola caramelizada e molho BBQ defumado.',
        porcao: '1 unidade',
      },
      {
        id: 33,
        nome: 'Milkshake Artesanal',
        foto: img('1551024601-bec78aea704b', 400),
        preco: 2200,
        descricao:
          'Milkshake cremoso preparado na hora com sorvete artesanal. Sabores: chocolate, baunilha ou morango.',
        porcao: '400ml',
      },
    ],
  },
  {
    id: 4,
    titulo: 'Taqueria Brito',
    destacado: false,
    tipo: 'Mexicana',
    avaliacao: 4.5,
    descricao:
      'Sabores autênticos do México diretamente para sua mesa. Tacos, burritos e nachos preparados com receitas tradicionais e ingredientes frescos do dia.',
    capa: img('1565299507177-b0ac66763828'),
    cardapio: [
      {
        id: 41,
        nome: 'Tacos de Carnitas',
        foto: img('1565299585323-38d6b0865b47', 400),
        preco: 3200,
        descricao:
          'Trio de tacos com carnitas suculentas, cebola branca, coentro, salsa verde e fatias de limão tahiti.',
        porcao: '3 unidades',
      },
      {
        id: 42,
        nome: 'Burrito Supreme',
        foto: img('1565299507177-b0ac66763828', 400),
        preco: 3800,
        descricao:
          'Burrito generoso com arroz mexicano, feijão preto, frango grelhado, guacamole, pico de gallo e creme azedo.',
        porcao: '1 unidade',
      },
      {
        id: 43,
        nome: 'Nachos com Guacamole',
        foto: img('1512621776951-a57141f2eefd', 400),
        preco: 2900,
        descricao:
          'Nachos crocantes com guacamole artesanal, pico de gallo fresco, jalapeños e queijo derretido.',
        porcao: 'Serve 2 pessoas',
      },
    ],
  },
  {
    id: 5,
    titulo: 'Churrascaria Brito',
    destacado: false,
    tipo: 'Brasileira',
    avaliacao: 4.7,
    descricao:
      'O melhor churrasco brasileiro no seu estilo. Carnes selecionadas grelhadas na brasa com toda a essência e sabor da culinária brasileira.',
    capa: img('1544025162-d76694265947'),
    cardapio: [
      {
        id: 51,
        nome: 'Picanha na Brasa',
        foto: img('1544025162-d76694265947', 400),
        preco: 8900,
        descricao:
          'Picanha grelhada na brasa com sal grosso, acompanhada de farofa de bacon, vinagrete e pão de alho.',
        porcao: '400g — serve 2 pessoas',
      },
      {
        id: 52,
        nome: 'Costela Assada',
        foto: img('1504674900247-0877df9cc836', 400),
        preco: 7500,
        descricao:
          'Costela bovina assada lentamente por 8 horas, desossada e temperada com blend de ervas especiais da casa.',
        porcao: '500g — serve 2 pessoas',
      },
      {
        id: 53,
        nome: 'Frango no Espeto',
        foto: img('1540189549336-e6e99c3679fe', 400),
        preco: 4500,
        descricao:
          'Coxa e sobrecoxa de frango caipira no espeto, marinadas em alho, limão e ervas, assadas na brasa.',
        porcao: '6 peças — serve 2 pessoas',
      },
    ],
  },
  {
    id: 6,
    titulo: 'Doce Brito',
    destacado: false,
    tipo: 'Confeitaria',
    avaliacao: 4.8,
    descricao:
      'A confeitaria mais querida da cidade. Bolos artesanais, sobremesas especiais e doces únicos preparados com ingredientes de alta qualidade selecionados a dedo.',
    capa: img('1551024601-bec78aea704b'),
    cardapio: [
      {
        id: 61,
        nome: 'Cheesecake de Frutas Vermelhas',
        foto: img('1519984388953-d2406bc725e1', 400),
        preco: 2800,
        descricao:
          'Cheesecake cremoso com base de biscoito amanteigado, cobertura de geleia de frutas vermelhas e frutas frescas.',
        porcao: '1 fatia',
      },
      {
        id: 62,
        nome: 'Brigadeiro Gourmet',
        foto: img('1551024601-bec78aea704b', 400),
        preco: 1500,
        descricao:
          'Caixa com 9 brigadeiros gourmet em sabores variados: chocolate belga, pistache e caramelo com flor de sal.',
        porcao: '9 unidades',
      },
      {
        id: 63,
        nome: 'Açaí Premium',
        foto: img('1512621776951-a57141f2eefd', 400),
        preco: 2200,
        descricao:
          'Açaí do Pará batido na hora com granola artesanal, banana, morango e mel de abelha silvestre.',
        porcao: '500ml',
      },
    ],
  },
]
