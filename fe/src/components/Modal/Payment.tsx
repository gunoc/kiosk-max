import { useState } from 'react';
import { OrderData } from '../../utils/types';
import { CardPayment } from './CardPayment';
import { CashPayment } from './CashPayment';
import classes from './Payment.module.css';

export function Payment({ orderList, modalCloseHandler }: { orderList: OrderData[]; modalCloseHandler: () => void }) {
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null);

  function selectPayHandler(payment: string) {
    if (payment === 'card') {
      setSelectedPayment('card');
    }
    if (payment === 'cash') {
      setSelectedPayment('cash');
    }
  }

  return (
    <>
      {selectedPayment === null && (
        <>
          <button
            className={classes.payBtn}
            onClick={() => {
              selectPayHandler('card');
            }}
          >
            카드 결제
          </button>
          <button
            className={classes.payBtn}
            onClick={() => {
              selectPayHandler('cash');
            }}
          >
            현금 결제
          </button>
        </>
      )}
      {selectedPayment === 'card' && <CardPayment orderList={orderList} modalCloseHandler={modalCloseHandler} />}
      {selectedPayment === 'cash' && <CashPayment />}
    </>
  );
}
