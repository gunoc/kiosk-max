import { useState } from 'react';
import classes from './CashPayment.module.css';
import { OrderData } from '../../utils/types';

import { modifyOrderList } from '../../utils/modifyOrderList';

export function CashPayment({
  totalPrice,
  orderList,
  setOrderList,
}: {
  totalPrice: number;
  orderList: OrderData[];
  setOrderList: React.Dispatch<React.SetStateAction<OrderData[]>>;
}) {
  const [inputCash, setInputCash] = useState(0);

  const amounts = [1000, 100, 10000, 500];

  function btnClickHandler(inputAmount: number) {
    setInputCash(inputCash + inputAmount);
  }

  const orderListForServer = modifyOrderList(orderList);

  async function handleSubmit() {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/payments/cash`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        orderList: orderListForServer,
        inputMoney: inputCash,
      }),
    });
    const data = await response.json();

    setOrderList([]);
    if (data.result === true) {
      window.history.pushState({ ...data, paymentType: '현금', inputMoney: inputCash }, '', '/receipt');
      const paymentEvent = new PopStateEvent('popstate');
      window.dispatchEvent(paymentEvent);
    }
  }

  const isActive = inputCash >= totalPrice;

  return (
    <>
      <div className={classes.amountBtnLayout}>
        {amounts.map((amount, index) => (
          <button
            key={index}
            className={classes.amountBtn}
            onClick={() => {
              btnClickHandler(amount);
            }}
          >
            {amount}
          </button>
        ))}
      </div>
      <div className={classes.amountTextLayout}>
        <span>
          주문금액:
          <span>{totalPrice} 원</span>
        </span>
        <span>
          투입금액:
          <span>{inputCash} 원</span>
        </span>
      </div>

      <button
        className={`${classes.paymentBtn} ${isActive ? classes.active : ''}`}
        disabled={!isActive}
        onClick={handleSubmit}
      >
        현금결제하기
      </button>
    </>
  );
}
