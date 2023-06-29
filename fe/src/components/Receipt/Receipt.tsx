import classes from './Receipt.module.css';
export function Receipt() {
  return (
    <div className={classes.container}>
      <h1 className={classes.orderNum}>주문번호 03</h1>
      <div className={classes.info}>
        <div className={classes.orderListWrapper}>
          <header className={classes.orderLabel}>
            <span>메뉴</span>
            <span>수량</span>
          </header>
          <section className={classes.orderList}>
            <div className={classes.orderItem}>
              <span>아메리카노</span>
              <span>1</span>
            </div>
            <div className={classes.orderItem}>
              <span>아메리카노</span>
              <span>1</span>
            </div>
          </section>
        </div>
        <div className={classes.paymentInfo}>
          <header className={classes.paymentLabel}>
            <span>결제 정보</span>
          </header>
          <section className={classes.infoList}>
            <span>결제 방식: 현금</span>
            <span>투입금액: 10000</span>
            <span>총 결제금액: 9500</span>
            <span>잔돈: 500</span>
          </section>
        </div>
      </div>
      <span className={classes.timer}>10초 뒤 대기화면으로 돌아갑니다.</span>
    </div>
  );
}
