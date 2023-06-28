import { OrderData } from '../../utils/types';
import { useEffect, useState } from 'react';
import classes from './Timer.module.css';

export function Timer({
  orderList,
  setOrderList,
  isPayProcessing,
}: {
  orderList: OrderData[];
  setOrderList: React.Dispatch<React.SetStateAction<OrderData[]>>;
  isPayProcessing: boolean;
}) {
  const [seconds, setSeconds] = useState(500);

  useEffect(() => {
    if (orderList.length === 0 || isPayProcessing) {
      setSeconds(500);
    } else {
      const timer = setTimeout(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);

      if (isPayProcessing) {
        clearTimeout(timer);
      }

      if (seconds === 0) {
        clearTimeout(timer);
        setOrderList([]);
      }

      return () => {
        clearTimeout(timer);
      };
    }
  }, [orderList, seconds, isPayProcessing]);

  useEffect(() => {
    if (!isPayProcessing) {
      setSeconds(500);
    }
  }, [isPayProcessing]);

  return <span className={classes.seconds}>{seconds}</span>;
}
