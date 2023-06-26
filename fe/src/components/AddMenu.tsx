import React, { useState, useEffect } from 'react';
import classes from './AddMenu.module.css';
import { OptionButton } from './OptionButton';

/* 여기에서 바뀐 수량, 가격 정보 같은걸 가지고 있어야 함 => 장바구니에 내려주기 위해 */

export function AddMenu({
  menuId,
  setOrderList,
}: {
  menuId: number;
  setOrderList: React.Dispatch<React.SetStateAction<never[]>>;
}) {
  const [count, setCount] = useState(1);
  const [temperature, setTemperature] = useState<string | null>(null);
  const [size, setSize] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [modalInfo, setModalInfo] = useState<any>({});
  const [price, setPrice] = useState<number>(modalInfo.price);

  useEffect(() => {
    setLoading(true);
    let isMounted = true;

    fetch(`/api/carts/${menuId}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        if (isMounted) {
          setModalInfo(data);
          setPrice(data.price);
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
      // 클린업 작업 수행
    };
  }, []);

  useEffect(() => {
    setPrice(modalInfo.price + calculateAdditionalCost());
  }, [temperature, size]);

  function calculateAdditionalCost() {
    let additionalCost = 0;
    if (temperature === 'ice') additionalCost += 500;
    if (size === 'big') additionalCost += 500;
    return additionalCost;
  }

  function handleOptionChange(
    setOption: React.Dispatch<React.SetStateAction<string | null>>,
    selectedOption: string | null,
  ) {
    setOption((prevOption) => (prevOption === selectedOption ? prevOption : selectedOption));
  }

  function incrementHandler() {
    setCount(count + 1);
  }

  function decrementHandler() {
    setCount(count > 1 ? count - 1 : 1);
  }

  const isActive = temperature && size;

  function handleSubmit() {
    setOrderList((prevOrderList): any => [
      {
        menuId: menuId,
        option: { size: size, temperature: temperature },
        quantity: count,
      },
      ...prevOrderList,
    ]);
  }

  // function handleSubmit() {
  //   fetch('/api/payments', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({
  //       menuId: menuId,
  //       option: { size: size, temperature: temperature },
  //       quantity: count,
  //     }),
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log(data);
  //       console.log('보냈음!');
  //     });
  // }

  return (
    <>
      <div className={classes.menuLayout}>
        <div className={classes.menuCard}>
          <img className={classes.img} src={modalInfo.img} alt={modalInfo.name} />
          <p>{modalInfo.name}</p>
          <p>{price}</p>
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
                    onClick={() => handleOptionChange(setSize, sizeOption)}
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
                    onClick={() => handleOptionChange(setTemperature, temperatureOption)}
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
    </>
  );
}
