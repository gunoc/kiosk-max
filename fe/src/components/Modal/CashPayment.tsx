import classes from './CashPayment.module.css';

export function CashPayment() {
  /* 버튼 네개
  총액 <안변함
  투입금액 <변함
  결제 버튼 */

  const amounts = [1000, 100, 10000, 500];

  return (
    <>
      <div className={classes.amountBtnLayout}>
        {amounts.map((amount, index) => (
          <button key={index} className={classes.amountBtn}>
            {amount}
          </button>
        ))}
      </div>
      <div className={classes.amountTextLayout}>
        <span>
          주문금액:
          <span>{' ' + 10000} 원</span>
        </span>
        <span>
          투입금액:
          <span>{' ' + 15000} 원</span>
        </span>
      </div>
      <button className={classes.paymentBtn}>현금결제하기</button>
    </>
  );
}
