import { OrderData } from '../../utils/types';
import { CardPayment } from '../Modal/CardPayment';
import { CashPayment } from '../Modal/CashPayment';
import { Modal } from '../Modal/Modal';
import { Payment } from '../Modal/Payment';
import classes from './Cart.module.css';
import { CartItem } from './CartItem';
import { useEffect, useState } from 'react';
import { Timer } from './Timer';


export function Cart({
  orderList,
  setOrderList,
}: {
  orderList: OrderData[];
  setOrderList: React.Dispatch<React.SetStateAction<OrderData[]>>;
}) {
  const [totalPrice, setTotalPrice] = useState(0);
  const [isPayProcessing, setIsPayProcessing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<string>('');


  useEffect(() => {
    calculateTotalPrice();
  }, [orderList]);

  function calculateTotalPrice() {
    const totalPrice = orderList.reduce((acc, cur) => acc + cur.price * cur.quantity, 0);
    setTotalPrice(totalPrice);
  }

  function cancelOrderHandler() {
    setOrderList([]);
  }

  function payBtnClickHandler() {
    if (totalPrice === 0) {
      return;
    }
    setIsModalOpen(true);
    setModalContent('payment');
    setIsPayProcessing(true);
  }

  const isPayBtnActive = totalPrice > 0;

  return (
    <>
      <div className={classes.cart}>
        <div className={classes.left}>
          <ul className={classes.itemList}>
            {orderList.map((order, index) => {
              return <CartItem key={index} idx={index} orderData={orderList[index]} setOrderList={setOrderList} />;
            })}
          </ul>
        </div>
        <div className={classes.right}>
          <div className={classes.timer}>
            <span>
              <Timer orderList={orderList} setOrderList={setOrderList} isPayProcessing={isPayProcessing} />초 후 주문이
              취소됩니다.
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
                payBtnClickHandler();
              }}
            >
              결제하기
            </button>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <Modal
          closeHandler={() => {
            setIsModalOpen(false);
            setModalContent('');
          }}
        >
          {modalContent === 'payment' ? (
            <Payment setModalContent={setModalContent} />
          ) : modalContent === 'card' ? (
            <CardPayment />
          ) : modalContent === 'cash' ? (
            <CashPayment totalPrice={totalPrice} />
          ) : (
            <div>Error!</div>
          )}
        </Modal>
      )}
    </>
  );
}
