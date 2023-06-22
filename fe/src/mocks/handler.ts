import { rest } from 'msw';

const menus = [{ name: '커피' }, { name: '라떼' }, { name: '쥬스' }, { name: '티' }, { name: '디카페인' }];

const coffee = [
  { name: '아메리카노', price: '4000', id: '1', img: '/assets/americano.jpeg' },
  { name: '콜드브루', price: '4500', id: '2', img: '/assets/americano.jpeg' },
  { name: '에스프레소', price: '3000', id: '3', img: '/assets/americano.jpeg' },
  { name: '카페모카', price: '4500', id: '4', img: '/assets/americano.jpeg' },
];

const latte = [
  { name: '라떼1', price: '4000', id: '1', img: '/assets/latte.jpeg' },
  { name: '라떼2', price: '4500', id: '2', img: '/assets/latte.jpeg' },
  { name: '라떼3', price: '3000', id: '3', img: '/assets/latte.jpeg' },
  { name: '라떼4', price: '4500', id: '4', img: '/assets/latte.jpeg' },
];

const juice = [
  { name: '쥬스1', price: '4000', id: '1', img: '/assets/juice.jpeg' },
  { name: '쥬스2', price: '4500', id: '2', img: '/assets/juice.jpeg' },
  { name: '쥬스3', price: '3000', id: '3', img: '/assets/juice.jpeg' },
  { name: '쥬스4', price: '4500', id: '4', img: '/assets/juice.jpeg' },
];

const tea = [
  { name: '티1', price: '4000', id: '1', img: '/assets/tea.jpeg' },
  { name: '티2', price: '4500', id: '2', img: '/assets/tea.jpeg' },
  { name: '티3', price: '3000', id: '3', img: '/assets/tea.jpeg' },
  { name: '티4', price: '4500', id: '4', img: '/assets/tea.jpeg' },
];

const decaf = [
  { name: '디카페인1', price: '4000', id: '1', img: '/assets/decaf.jpeg' },
  { name: '디카페인2', price: '4500', id: '2', img: '/assets/decaf.jpeg' },
  { name: '디카페인3', price: '3000', id: '3', img: '/assets/decaf.jpeg' },
  { name: '디카페인4', price: '4500', id: '4', img: '/assets/decaf.jpeg' },
];

const handlers = [
  rest.get('/api/menus', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(menus));
  }),
  rest.get('api/products/0', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(coffee));
  }),
  rest.get('api/products/1', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(latte));
  }),
  rest.get('api/products/2', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(juice));
  }),
  rest.get('api/products/3', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(tea));
  }),
  rest.get('api/products/4', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(decaf));
  }),
];

export default handlers;
