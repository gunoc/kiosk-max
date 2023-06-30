import { useEffect, useState, useRef } from 'react';

import classes from './Receipt.module.css';

type ReceiptData = {
  orderNumber: number;
  orderList: { name: string; quantity: number }[];
};

export function Receipt() {
  const [seconds, setSeconds] = useState(10);
  const [loading, setLoading] = useState(true);
  const receiptData = useRef<ReceiptData | null>(null);

  const responseData = window.history.state;

  useEffect(() => {
    setLoading(true);
    let isMounted = true;

    fetch(`${process.env.REACT_APP_API_URL}/api/receipts/${responseData.orderId}`)
      .then((res) => res.json())
      .then((data) => {
        if (isMounted) {
          receiptData.current = data;
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSeconds((prevSeconds) => prevSeconds - 1);
    }, 1000);

    if (seconds === 0) {
      clearTimeout(timer);
      window.history.pushState({}, '', '/');
      const navEvent = new PopStateEvent('popstate');
      window.dispatchEvent(navEvent);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [seconds]);

  const formattedSeconds = seconds.toString().padStart(2, '0');

  if (loading) {
    return <div className={classes.container}>Loading...</div>;
  }

  return (
    <div className={classes.container}>
      <h1 className={classes.orderNum}>주문번호 {responseData.orderNumber}</h1>
      <div className={classes.info}>
        <div className={classes.orderListWrapper}>
          <header className={classes.orderLabel}>
            <span>메뉴</span>
            <span>수량</span>
          </header>
          <section className={classes.orderList}>
            {receiptData.current!.orderList.map((item, index) => {
              return (
                <div key={index} className={classes.orderItem}>
                  <span>{item.name}</span>
                  <span>{item.quantity}</span>
                </div>
              );
            })}
          </section>
        </div>
        <div className={classes.paymentInfo}>
          <header className={classes.paymentLabel}>
            <span>결제 정보</span>
          </header>
          <section className={classes.infoList}>
            <span>결제 방식: {responseData.paymentType}</span>
            <span>
              투입금액: {responseData.paymentType === '현금' ? responseData.inputMoney : responseData.totalPay}
            </span>
            <span>총 결제금액: {responseData.totalPay}</span>
            <span>잔돈: {responseData.changes}</span>
          </section>
        </div>
      </div>
      <span className={classes.timer}>{formattedSeconds}초 뒤 대기화면으로 돌아갑니다.</span>
    </div>
  );
}
