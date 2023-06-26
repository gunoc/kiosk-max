import React, { useState } from 'react';
import { Modal } from './Modal';
import classes from './AddMenu.module.css';
import { OptionButton } from './OptionButton';
import { useLocation } from 'react-router';

/* 여기에서 바뀐 수량, 가격 정보 같은걸 가지고 있어야 함 => 장바구니에 내려주기 위해 */
export function AddMenu() {
  const { state } = useLocation();

  const [count, setCount] = useState(1);
  const [temperature, setTemperature] = useState<string | null>(null);
  const [size, setSize] = useState<string | null>(null);

  function temperatureHandler(selectedTemperature: string | null) {
    if (temperature === selectedTemperature) {
      return;
    }
    setTemperature(selectedTemperature);
  }

  function sizeHandler(selectedSize: string | null) {
    if (size === selectedSize) {
      return;
    }
    setSize(selectedSize);
  }

  function incrementHandler() {
    setCount(count + 1);
  }

  function decrementHandler() {
    if (count === 1) {
      return;
    }
    setCount(count - 1);
  }

  const isActive = temperature && size;

  return (
    <Modal>
      <div className={classes.menuLayout}>
        <div className={classes.menuCard}>
          <img className={classes.img} src={state.img} alt={state.name} />
          <p>{state.name}</p>
          <p>{state.price}</p>
        </div>
        <div className={classes.optionsLayout}>
          <div className={classes.buttonsLayout}>
            <OptionButton label="HOT" selected={temperature === 'hot'} onClick={() => temperatureHandler('hot')} />
            <OptionButton label="ICE" selected={temperature === 'ice'} onClick={() => temperatureHandler('ice')} />
            <OptionButton label="LARGE" selected={size === 'large'} onClick={() => sizeHandler('large')} />
            <OptionButton label="SMALL" selected={size === 'small'} onClick={() => sizeHandler('small')} />
          </div>
          <div className={classes.counterLayout}>
            <button className={classes.counterButton} onClick={decrementHandler}>
              -
            </button>
            <p>{count}</p>
            <button className={classes.counterButton} onClick={incrementHandler}>
              +
            </button>
          </div>
        </div>
      </div>
      <button className={`${classes.addBtn} ${isActive ? classes.active : ''}`}>담기</button>
    </Modal>
  );
}

// export function loader() {}
