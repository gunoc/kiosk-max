import { OrderData } from '../../utils/types';
import { useEffect, useState } from 'react';
import classes from './Timer.module.css';

export function Timer({
  isPayBtnActive,
  setOrderList,
  isPayProcessing,
}: {
  isPayBtnActive: boolean;
  setOrderList: React.Dispatch<React.SetStateAction<OrderData[]>>;
  isPayProcessing: boolean;
}) {
  const [seconds, setSeconds] = useState(500);

  useEffect(() => {
    console.log(isPayBtnActive);

    if (isPayProcessing) {
      setSeconds(500);
    } else if (isPayBtnActive && !isPayProcessing) {
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
  }, [isPayBtnActive, seconds, isPayProcessing]);
  //  orderList의존성빼기
  useEffect(() => {
    if (!isPayProcessing) {
      setSeconds(500);
    }
  }, [isPayProcessing]);

  return <span className={classes.seconds}>{seconds}</span>;
}
