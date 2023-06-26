import classes from './CartItem.module.css';
import { OrderData } from '../utils/types';

export function CartItem({ orderData }: { orderData: OrderData }) {
  function getMenuName() {
    switch (orderData.menuId) {
      case 1:
        return '아메리카노';
      case 2:
        return '콜드브루';
      case 3:
        return '에스프레소';
      case 4:
        return '카페라떼';

      default:
        return '메뉴 이름';
    }
  }

  return (
    <li className={classes.item}>
      <button>X</button>
      <div className="name">{getMenuName()}</div>
      <div className="size">{orderData.option.size === 1 ? 'S' : 'L'}</div>
      <div className="temp">{orderData.option.temperature === 1 ? 'HOT' : 'ICE'}</div>
      {/* <div className="price">4000</div> */}
      <div className="count">{orderData.quantity}</div>
    </li>
  );
}
