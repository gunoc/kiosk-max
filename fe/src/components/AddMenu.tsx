import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
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
  const [loading, setLoading] = useState(false);
  const [modalInfo, setModalInfo] = useState<any>({});

  const menuId = useParams();

  useEffect(() => {
    setLoading(true);

    fetch(`/api/carts/${menuId.id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        setModalInfo(data);
        setLoading(false);
      });
  }, []);

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

  function handleSubmit() {
    fetch('/api/payments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        menuId: menuId.id,
        option: { size: size, temperature: temperature },
        quantity: count,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        console.log('보냈음!');
      });
  }

  return (
    <Modal>
      <div className={classes.menuLayout}>
        <div className={classes.menuCard}>
          <img className={classes.img} src={modalInfo.img} alt={modalInfo.name} />
          <p>{modalInfo.name}</p>
          <p>{modalInfo.price}</p>
        </div>
        <div className={classes.optionsLayout}>
          <div className={classes.buttonsLayout}>
            <div className={classes.buttonsRowLayout}>
              {modalInfo.option &&
                modalInfo.option.size &&
                modalInfo.option.size.map((sizeOption: string, index: number) => (
                  <OptionButton
                    key={index}
                    label={sizeOption.toUpperCase()}
                    selected={size === sizeOption}
                    onClick={() => sizeHandler(sizeOption)}
                  />
                ))}
            </div>
            <div className={classes.buttonsRowLayout}>
              {modalInfo.option &&
                modalInfo.option.temperature &&
                modalInfo.option.temperature.map((temperatureOption: string, index: number) => (
                  <OptionButton
                    key={index}
                    label={temperatureOption.toUpperCase()}
                    selected={temperature === temperatureOption}
                    onClick={() => temperatureHandler(temperatureOption)}
                  />
                ))}
            </div>
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
      <button
        className={`${classes.addBtn} ${isActive ? classes.active : ''}`}
        disabled={!isActive}
        onClick={handleSubmit}
      >
        담기
      </button>
    </Modal>
  );
}

// export function loader() {}
