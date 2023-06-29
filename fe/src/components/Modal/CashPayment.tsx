import { useState } from 'react';
import classes from './CashPayment.module.css';

import { Link } from '../Link';

export function CashPayment({ totalPrice }: { totalPrice: number }) {
  /* 버튼 네개
  총액 <안변함
  투입금액 <변함
  결제 버튼 */
  const [inputCash, setInputCash] = useState(0);

  const amounts = [1000, 100, 10000, 500];

  function btnClickHandler(inputAmount: number) {
    setInputCash(inputCash + inputAmount);
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
      <Link href="/receipt">
        <button
          className={`${classes.paymentBtn} ${isActive ? classes.active : ''}`}
          disabled={!isActive}
          onClick={() => {
            console.log('현금결제');
          }}
        >
          현금결제하기
        </button>
      </Link>
    </>
  );
}
