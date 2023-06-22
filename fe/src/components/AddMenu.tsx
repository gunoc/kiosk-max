import React, { useState } from 'react';
import { Modal } from './Modal';
import classes from './AddMenu.module.css';

export function AddMenu() {
  console.log('메뉴 담기 화면 로드');

  const [count, setCount] = useState(1);

  function incrementHandler() {
    setCount(count + 1);
  }

  function decrementHandler() {
    if (count === 1) {
      return;
    }
    setCount(count - 1);
  }

  return (
    <Modal>
      <div className={classes.menuLayout}>
        <div className={classes.menuCard}>
          <img src="" alt="" />
          이미지
          <p>아메리카노</p>
          <p>4000</p>
        </div>
        <div className={classes.optionsLayout}>
          <div className={classes.buttonsLayout}>
            <button className={classes.optionButton}>HOT</button>
            <button className={classes.optionButton}>ICE</button>
            <button className={classes.optionButton}>SMALL</button>
            <button className={classes.optionButton}>LARGE</button>
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
      <button className={classes.addBtn}>담기</button>
    </Modal>
  );
}
