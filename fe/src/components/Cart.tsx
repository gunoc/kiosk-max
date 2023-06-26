import { OrderData } from '../utils/types';
import classes from './Cart.module.css';
import { CartItem } from './CartItem';

export function Cart({ orderList }: { orderList: OrderData[] }) {
  function calculateTotalPrice() {
    let totalPrice = 0;

    orderList.reduce((acc, cur) => {
      totalPrice += cur.price * cur.quantity;
      return totalPrice;
    }, 0);

    return totalPrice;
  }

  return (
    <div className={classes.cart}>
      <div className={classes.left}>
        <ul className={classes.itemList}>
          {orderList.map((order, index) => {
            return <CartItem key={index} orderData={orderList[index]} />;
          })}
        </ul>
      </div>
      <div className={classes.right}>
        <div className={classes.timer}>
          <span>120초 후 주문이 취소됩니다.</span>
        </div>
        <div className={classes.info}>
          <div>
            <div className={classes.total}>{calculateTotalPrice()}</div>
            <button className={classes.cancelBtn}>전체취소</button>
          </div>
          <button className={classes.payBtn}>결제하기</button>
        </div>
      </div>
    </div>
  );
}
