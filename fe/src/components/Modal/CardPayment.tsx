import classes from './CardPayment.module.css';

export function CardPayment() {
  return (
    <>
      <div className={classes.wrapper}>
        <input placeholder="카드 번호 입력" className={classes.input} type="number" />
      </div>
      <button className={classes.paymentBtn}>카드결제하기</button>
    </>
  );
}
