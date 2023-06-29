import { useState, useEffect } from 'react';
import classes from './CartItem.module.css';
import { OrderData } from '../../utils/types';

export function CartItem({
  idx,
  orderData,
  setOrderList,
}: {
  idx: number;
  orderData: OrderData;
  setOrderList: React.Dispatch<React.SetStateAction<OrderData[]>>;
}) {
  function getMenuName(menuId: number) {
    switch (menuId) {
      case 1:
        return '아메리카노';
      case 2:
        return '콜드브루';
      case 3:
        return '에스프레소';
      case 4:
        return '카페모카';
      case 5:
        return '카페라떼';
      case 6:
        return '카푸치노';
      case 7:
        return '평범한라떼';
      case 8:
        return '그냥라떼';
      default:
        return '메뉴 이름';
    }
  }

  function handleClick() {
    setOrderList((prevOrderList) => {
      return prevOrderList.filter(
        (order) =>
          order.menuId !== orderData.menuId ||
          order.option.size !== orderData.option.size ||
          order.option.temperature !== orderData.option.temperature,
      );
    });
  }

  return (
    <li className={`${classes.item} ${classes.fadeIn}`}>
      <button onClick={handleClick}>X</button>
      <div className="name">{getMenuName(orderData.menuId)}</div>
      <div className="size">{orderData.option.size === 1 ? 'S' : 'L'}</div>
      <div className="temp">{orderData.option.temperature === 1 ? 'HOT' : 'ICE'}</div>
      <div className={classes.count}>
        <span>{orderData.quantity}</span>
      </div>
    </li>
  );
}
