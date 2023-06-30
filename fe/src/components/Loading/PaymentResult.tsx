import classes from './PaymentResult.module.css';

export function PaymentResult({
  cause,
  setIsModalOpen,
}: {
  cause: string | undefined;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  // 타이머로 메인화면돌아가기 //모달 닫기
  // 버튼으로 돌아가기 // 모달 닫기
  return (
    <>
      <div className={classes.cause}>
        <div className={classes.wrapper}>
          <p className={classes.causeTitle}>결제 실패</p>
          <p className={classes.causeText}>실패 사유: {cause}</p>
          <button
            className={classes.btn}
            onClick={() => {
              setIsModalOpen(false);
            }}
          >
            돌아가기
          </button>
        </div>
      </div>
    </>
  );
}
