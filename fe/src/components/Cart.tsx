import classes from './Cart.module.css';
import { CartItem } from './CartItem';

export function Cart() {
  const orderList = [
    {
      menuId: 1,
      option: { size: 1, temperature: 2 },
      quantity: 1,
    },
    {
      menuId: 2,
      option: { size: 2, temperature: 2 },
      quantity: 3,
    },
    {
      menuId: 3,
      option: { size: 2, temperature: 1 },
      quantity: 2,
    },
    {
      menuId: 4,
      option: { size: 1, temperature: 2 },
      quantity: 1,
    },
  ];

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
