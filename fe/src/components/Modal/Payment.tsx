import { useState, useEffect } from 'react';
import { OrderData } from '../../utils/types';
import classes from './Payment.module.css';
import { useSleep } from '../../utils/customHook';
import { getRandomDelay } from '../../utils/getRandomDelay';

export function Payment({
  orderList,
  setModalContent,
  setIsPayProcessing,
  setOrderList,
}: {
  orderList: OrderData[];
  setModalContent: React.Dispatch<React.SetStateAction<{ content: string; cause?: string | null }>>;
  setIsPayProcessing: React.Dispatch<React.SetStateAction<boolean>>;
  setOrderList: React.Dispatch<React.SetStateAction<OrderData[]>>;
}) {
  const [paymentResult, setPaymentResult] = useState<{
    result: boolean;
    totalPay?: number;
    changes?: number;
    orderId?: number;
    cause?: string;
  } | null>(null);

  async function handleSubmit() {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/payments/card`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        orderList,
        inputMoney: 0,
      }),
    });

    const data = await response.json();
    if (data.result === 'true') {
      setPaymentResult({ result: true, orderId: data.orderId, totalPay: data.totalPay, changes: data.changes });
      await useSleep(getRandomDelay(3000, 7000));
      setOrderList([]);
      window.history.pushState({ ...paymentResult, paymentType: '카드' }, '', '/receipt');
      const navEvent = new PopStateEvent('popstate');
      window.dispatchEvent(navEvent);
    } else {
      setPaymentResult({ result: false, cause: data.cause });
      await useSleep(getRandomDelay(3000, 7000));
      setModalContent({ content: 'paymentResult', cause: data.cause });
    }
  }

  return (
    <>
      <button
        className={classes.payBtn}
        onClick={() => {
          handleSubmit();
          setModalContent({ content: 'card' });
          setIsPayProcessing(false);
        }}
      >
        카드 결제
      </button>
      <button
        className={classes.payBtn}
        onClick={() => {
          setModalContent({ content: 'cash' });
        }}
      >
        현금 결제
      </button>
    </>
  );
}
