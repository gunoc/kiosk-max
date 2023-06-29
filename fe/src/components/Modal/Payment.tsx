import classes from './Payment.module.css';

export function Payment({ setModalContent }: { setModalContent: React.Dispatch<React.SetStateAction<string>> }) {
  return (
    <>
      <button
        className={classes.payBtn}
        onClick={() => {
          setModalContent('card');
        }}
      >
        카드 결제
      </button>
      <button
        className={classes.payBtn}
        onClick={() => {
          setModalContent('cash');
        }}
      >
        현금 결제
      </button>
    </>
  );
}
