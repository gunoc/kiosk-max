import { OrderData } from './types';

export function modifyOrderList(orderList: OrderData[]) {
  const newOrderList = orderList.map(({ price, ...rest }) => rest);
  return newOrderList;
}
