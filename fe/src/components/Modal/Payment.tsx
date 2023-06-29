import { useState, useEffect } from 'react';
import { OrderData } from '../../utils/types';
import classes from './Payment.module.css';
import { useSleep } from '../../utils/customHook';
import { getRandomDelay } from '../../utils/getRandomDelay';

export function Payment({
  orderList,
  setModalContent,
  setIsPayProcessing,
  setOrderList
}: {
  orderList: OrderData[];
  setModalContent: React.Dispatch<React.SetStateAction<{ content: string; cause?: string | null }>>;
  setIsPayProcessing: React.Dispatch<React.SetStateAction<boolean>>;
  setOrderList: React.Dispatch<React.SetStateAction<OrderData[]>>;
}) {
  // const [loading, setLoading] = useState(false);
  // const [cardNumber, setCardNumber] = useState<string | null>(null);
  const [paymentResult, setPaymentResult] = useState<{ return: boolean; orderNumber?: string; cause?: string } | null>(
    null,
  );

  async function handleSubmit() {
    // setLoading(true);

    const response = await fetch('/api/payments/card', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        orderList,
        number: '0',
      }),
    });

    const data = await response.json();
    console.log(data);
    if (data.return === 'true') {
      // 결제 성공
      setPaymentResult({ return: true, orderNumber: data.orderNumber });
      // setLoading(false);
      await useSleep(getRandomDelay(3000, 7000));
      setOrderList([])
      window.history.pushState({}, '', '/receipt');
      const navEvent = new PopStateEvent('popstate');
      window.dispatchEvent(navEvent);
    } else {
      // 결제 실패
      setPaymentResult({ return: false, cause: data.cause });
      // setLoading(false);
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
