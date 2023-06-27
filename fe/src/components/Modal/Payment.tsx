import classes from './Payment.module.css';

export function Payment({ addModalOpenHandler }: { addModalOpenHandler: (content: any) => void }) {
  return (
    <>
      <button className={classes.payBtn} onClick={addModalOpenHandler}>
        카드 결제
      </button>
      <button className={classes.payBtn} onClick={addModalOpenHandler}>
        현금 결제
      </button>
    </>
  );
}
