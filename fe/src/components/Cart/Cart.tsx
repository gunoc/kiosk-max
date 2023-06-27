import { context } from 'msw';
import { OrderData } from '../../utils/types';
import { Modal } from '../Modal/Modal';
import { Payment } from '../Modal/Payment';
import classes from './Cart.module.css';
import { CartItem } from './CartItem';
import { useEffect, useState } from 'react';

export function Cart({
  orderList,
  setOrderList,
  modalContent,
  isModalOpen,
  addModalOpenHandler,
  addModalCloseHandler,
}: {
  orderList: OrderData[];
  setOrderList: React.Dispatch<React.SetStateAction<never[]>>;
  modalContent: any;
  isModalOpen: boolean;
  addModalOpenHandler: (content: any) => void;
  addModalCloseHandler: () => void;
}) {
  const [totalPrice, setTotalPrice] = useState(0);
  const [seconds, setSeconds] = useState(5);

  useEffect(() => {
    calculateTotalPrice();
  }, [orderList]);

  useEffect(() => {
    if (orderList.length === 0) {
      setSeconds(5);
    } else {
      const timer = setTimeout(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);

      if (seconds === 0) {
        clearInterval(timer);
        setOrderList([]);
      }

      return () => {
        clearTimeout(timer);
      };
    }
  }, [orderList, seconds]);

  function calculateTotalPrice() {
    const totalPrice = orderList.reduce((acc, cur) => acc + cur.price * cur.quantity, 0);
    setTotalPrice(totalPrice);
  }

  function cancelOrderHandler() {
    setOrderList([]);
  }

  function payBtnClickHandler(content: React.ReactNode) {
    if (totalPrice === 0) {
      return;
    }
    addModalOpenHandler(content);
  }

  const isPayBtnActive = totalPrice > 0;

  return (
    <>
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
            <span>
              <span className={classes.second}>{seconds}</span> 초 후 주문이 취소됩니다.
            </span>
          </div>
          <div className={classes.info}>
            <div>
              <div className={classes.total}>
                {totalPrice}
                <span className={classes.won}>원</span>
              </div>
              <button className={classes.cancelBtn} onClick={cancelOrderHandler}>
                전체취소
              </button>
            </div>
            <button
              className={`${classes.payBtn} ${isPayBtnActive ? classes.active : ''}`}
              onClick={() => {
                payBtnClickHandler(<Payment addModalOpenHandler={addModalOpenHandler} />);
              }}
            >
              결제하기
            </button>
          </div>
        </div>
      </div>
      {isModalOpen && <Modal addModalCloseHandler={addModalCloseHandler}>{modalContent}</Modal>}
    </>
  );
}
