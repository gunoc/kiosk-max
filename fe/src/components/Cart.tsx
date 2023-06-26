import { OrderData } from '../utils/types';
import classes from './Cart.module.css';
import { CartItem } from './CartItem';

export function Cart({ orderList }: { orderList: OrderData[] }) {
  console.log(orderList);

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
            <div className={classes.total}>총합: 0원</div>
            <button className={classes.cancelBtn}>전체취소</button>
          </div>
          <button className={classes.payBtn}>결제하기</button>
        </div>
      </div>
    </div>
  );
}
