import { rest } from 'msw';

const menus = [{ name: '커피' }, { name: '라떼' }, { name: '쥬스' }, { name: '티' }, { name: '디카페인' }];

const coffee = [
  { name: '아메리카노', price: 4000, menuId: 1, img: '/assets/americano.jpeg', popular: true },
  { name: '콜드브루', price: 4500, menuId: 2, img: '/assets/coldbrew.jpeg', popular: false },
  { name: '에스프레소', price: 3000, menuId: 3, img: '/assets/espresso.jpeg', popular: false },
  { name: '카페모카', price: 4500, menuId: 4, img: '/assets/caffe-mocha.jpeg', popular: false },
];

const latte = [
  { name: '카페라떼', price: 4500, menuId: 5, img: '/assets/latte.jpeg', popular: false },
  { name: '카푸치노', price: 4500, menuId: 6, img: '/assets/cappuccino.jpeg', popular: true },
  { name: '평범한라떼', price: 3000, menuId: 7, img: '/assets/latte.jpeg', popular: false },
  { name: '그냥라떼', price: 4500, menuId: 8, img: '/assets/latte.jpeg', popular: false },
];

const juice = [
  { name: '쥬스1', price: 4000, menuId: 9, img: '/assets/juice.jpeg', popular: false },
  { name: '쥬스2', price: 4500, menuId: 10, img: '/assets/juice.jpeg', popular: false },
  { name: '쥬스3', price: 3000, menuId: 11, img: '/assets/juice.jpeg', popular: false },
  { name: '쥬스4', price: 4500, menuId: 12, img: '/assets/juice.jpeg', popular: true },
];

const tea = [
  { name: '티1', price: 4000, menuId: 13, img: '/assets/tea.jpeg', popular: true },
  { name: '티2', price: 4500, menuId: 14, img: '/assets/tea.jpeg', popular: false },
  { name: '티3', price: 3000, menuId: 15, img: '/assets/tea.jpeg', popular: false },
  { name: '티4', price: 4500, menuId: 16, img: '/assets/tea.jpeg', popular: false },
];

const decaf = [
  { name: '디카페인1', price: 4000, menuId: 17, img: '/assets/decaf.jpeg', popular: true },
  { name: '디카페인2', price: 4500, menuId: 18, img: '/assets/decaf.jpeg', popular: false },
  { name: '디카페인3', price: 3000, menuId: 19, img: '/assets/decaf.jpeg', popular: false },
  { name: '디카페인4', price: 4500, menuId: 20, img: '/assets/decaf.jpeg', popular: false },
];

const menu1 = {
  name: '아메리카노',
  price: 4000,
  img: '/assets/americano.jpeg',
  option: [
    {
      optionCategoryType: 'size',
      optionId: 1,
      optionName: 'small',
      optionPrice: 0,
    },
    {
      optionCategoryType: 'size',
      optionId: 2,
      optionName: 'big',
      optionPrice: 500,
    },
    {
      optionCategoryType: 'temperature',
      optionId: 3,
      optionName: 'hot',
      optionPrice: 0,
    },
    {
      optionCategoryType: 'temperature',
      optionId: 4,
      optionName: 'ice',
      optionPrice: 500,
    },
  ],
};

const menu2 = {
  name: '콜드브루',
  price: 4500,
  img: '/assets/coldbrew.jpeg',
  option: [
    {
      optionCategoryType: 'size',
      optionId: 1,
      optionName: 'small',
      optionPrice: 0,
    },
    {
      optionCategoryType: 'size',
      optionId: 2,
      optionName: 'big',
      optionPrice: 500,
    },
    {
      optionCategoryType: 'temperature',
      optionId: 4,
      optionName: 'ice',
      optionPrice: 0,
    },
  ],
};

const menu3 = {
  name: '에스프레소',
  price: 3000,
  img: '/assets/espresso.jpeg',
  option: [
    {
      optionCategoryType: 'size',
      optionId: 1,
      optionName: 'small',
      optionPrice: 0,
    },
    {
      optionCategoryType: 'temperature',
      optionId: 3,
      optionName: 'hot',
      optionPrice: 0,
    },
  ],
};

const menu4 = {
  name: '카페모카',
  price: 4500,
  img: '/assets/espresso.jpeg',
  option: [
    {
      optionCategoryType: 'size',
      optionId: 1,
      optionName: 'small',
      optionPrice: 0,
    },
    {
      optionCategoryType: 'size',
      optionId: 2,
      optionName: 'big',
      optionPrice: 500,
    },
    {
      optionCategoryType: 'temperature',
      optionId: 3,
      optionName: 'hot',
      optionPrice: 0,
    },
    {
      optionCategoryType: 'temperature',
      optionId: 4,
      optionName: 'ice',
      optionPrice: 500,
    },
  ],
};

const receipt = {
  orderNumber: 3,
  orderList: [
    { name: '아메리카노', quantity: 2 },
    { name: '콜드브루', quantity: 1 },
  ],
};

const handlers = [
  // 카테고리 종류
  rest.get('/api/categories', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(menus));
  }),
  // 카테고리별 상품리스트
  rest.get('api/menus/1', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(coffee));
  }),
  rest.get('api/menus/2', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(latte));
  }),
  rest.get('api/menus/3', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(juice));
  }),
  rest.get('api/menus/4', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(tea));
  }),
  rest.get('api/menus/5', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(decaf));
  }),
  // 각 상품별 상세정보
  rest.get('/api/menuInfo/1', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(menu1));
  }),
  rest.get('/api/menuInfo/2', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(menu2));
  }),
  rest.get('/api/menuInfo/3', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(menu3));
  }),
  rest.get('/api/menuInfo/4', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(menu4));
  }),
  // 결제 관련
  rest.post('/api/payments/card', (req, res, ctx) => {
    const { number } = req.body as Record<string, any>;

    if (number === '0') {
      // 결제 성공
      return res(ctx.json({ result: 'true', orderNumber: '1' }));
    } else {
      // 결제 실패
      return res(ctx.json({ result: 'false', cause: '훔친 카드💩' }));
    }
  }),
  rest.post('/api/payments/cash', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ orderId: 3, totalPay: 18000, changes: 2000, result: true }));
  }),
  rest.get('/api/receipts/3', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(receipt));
  }),
];

export default handlers;
