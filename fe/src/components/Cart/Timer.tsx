import { useEffect, useState } from 'react';
import { OrderData } from '../../utils/types';
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
  const [seconds, setSeconds] = useState(120);

  useEffect(() => {
    if (!isPayBtnActive && !isPayProcessing) {
      setSeconds(120);
    } else if (isPayBtnActive || !isPayProcessing) {
      const timer = setTimeout(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);

      if (seconds === 0) {
        clearTimeout(timer);
        setOrderList([]);
      }

      return () => {
        clearTimeout(timer);
      };
    }
  }, [isPayBtnActive, seconds, isPayProcessing]);

  return <span className={classes.seconds}>{seconds}</span>;
}
