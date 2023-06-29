import { useState } from 'react';
import classes from './CardPayment.module.css';
import { OrderData } from '../../utils/types';
import { Loading } from '../Loading/Loading';
import { PaymentResult } from '../Loading/PaymentResult';

export function CardPayment({
  orderList,
  modalCloseHandler,
}: {
  orderList: OrderData[];
  modalCloseHandler: () => void;
}) {
  const [loading, setLoading] = useState(false);
  const [cardNumber, setCardNumber] = useState<string | null>(null);
  const [paymentResult, setPaymentResult] = useState<{ return: boolean; orderNumber?: string; cause?: string } | null>(
    null,
  );

  async function handleSubmit() {
    setLoading(true);

    const response = await fetch('/api/payments/card', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        orderList,
        number: cardNumber,
      }),
    });
    const data = await response.json();
    console.log(data);
    if (data.return === 'true') {
      // 결제 성공
      setPaymentResult({ return: true, orderNumber: data.orderNumber });
      setLoading(false);
    } else {
      // 결제 실패
      setPaymentResult({ return: false, cause: data.cause });
      setLoading(false);
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setCardNumber(e.target.value);
  }

  return (
    <>
      <div className={classes.wrapper}>
        <input
          placeholder="카드 번호 입력"
          className={classes.input}
          type="number"
          value={cardNumber || ''}
          onChange={handleChange}
        />
      </div>
      <button className={classes.paymentBtn} onClick={handleSubmit}>
        카드결제하기
      </button>
      {loading && !paymentResult && <Loading />}
      {/* {!loading &&  paymentResult?.return === true && <Receipt />} */}
      {!loading && paymentResult?.return === false && (
        <PaymentResult cause={paymentResult.cause || ''} modalCloseHandler={modalCloseHandler} />
      )}
    </>
  );
}
