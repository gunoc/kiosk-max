import { CardPayment } from './CardPayment';
import { CashPayment } from './CashPayment';
import classes from './Payment.module.css';

export function Payment({ addModalOpenHandler }: { addModalOpenHandler: (content: any) => void }) {
  return (
    <>
      <button
        className={classes.payBtn}
        onClick={() => {
          addModalOpenHandler(<CardPayment />);
        }}
      >
        카드 결제
      </button>
      <button
        className={classes.payBtn}
        onClick={() => {
          addModalOpenHandler(<CashPayment />);
        }}
      >
        현금 결제
      </button>
    </>
  );
}
