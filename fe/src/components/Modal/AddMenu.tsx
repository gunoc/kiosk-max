import React, { useState, useEffect } from 'react';
import classes from './AddMenu.module.css';
import { OptionButton } from './OptionButton';
import { Product, OrderData, ModaInfo, Option } from '../../utils/types';
import { useSleep } from '../../utils/customHook';

export function AddMenu({
  menuId,
  setOrderList,
  setSelectedProduct,
}: {
  menuId: number;
  setOrderList: React.Dispatch<React.SetStateAction<OrderData[]>>;
  setSelectedProduct: React.Dispatch<React.SetStateAction<Product | null>>;
}) {
  const [count, setCount] = useState(1);
  const [selectedSizeOptionId, setSelectedSizeOptionId] = useState<number | null>(null);
  const [selectedTempOptionId, setselectedTempOptionId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [modalInfo, setModalInfo] = useState<ModaInfo | null>(null);
  const [price, setPrice] = useState<number>(0);
  const [isAnimated, setIsAnimated] = useState(false);

  useEffect(() => {
    setLoading(true);
    let isMounted = true;

    fetch(`/api/carts/${menuId}`)
      .then((res) => res.json())
      .then((data) => {
        if (isMounted) {
          setModalInfo(data);
          setPrice(data.price);
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [menuId]);

  useEffect(() => {
    if (!modalInfo) {
      console.log('modalInfo is possibly null');
      return;
    }
    const additionalCost = calculateAdditionalCost();
    setPrice(modalInfo.price + additionalCost);
  }, [selectedSizeOptionId, selectedTempOptionId]);

  function calculateAdditionalCost() {
    if (!modalInfo) {
      console.log('modalInfo is possibly null');
      return 0;
    }

    let additionalCost = 0;

    if (modalInfo.option && selectedSizeOptionId === 2) {
      additionalCost += modalInfo.option.find((item: Option) => item.optionId === 2)?.optionPrice || 0;
    }

    if (modalInfo.option && selectedTempOptionId === 4) {
      additionalCost += modalInfo.option.find((item: Option) => item.optionId === 4)?.optionPrice || 0;
    }

    return additionalCost;
  }

  function handleOptionChange(setOption: React.Dispatch<React.SetStateAction<number | null>>, selectedOption: number) {
    setOption((prevOption) => (prevOption === selectedOption ? prevOption : selectedOption));
  }

  function incrementHandler() {
    setCount(count + 1);
  }

  function decrementHandler() {
    setCount(count > 1 ? count - 1 : 1);
  }

  const isActive = selectedSizeOptionId && selectedTempOptionId;

  async function handleSubmit() {
    setIsAnimated(true);

    await useSleep(600);

    setSelectedProduct(null);

    setOrderList((prevOrderList: OrderData[]): any => {
      const isDuplicate = prevOrderList.some(
        (item) =>
          item.menuId === menuId &&
          item.option.size === selectedSizeOptionId &&
          item.option.temperature === selectedTempOptionId,
      );

      if (isDuplicate) {
        return prevOrderList.map((item) => {
          if (
            item.menuId === menuId &&
            item.option.size === selectedSizeOptionId &&
            item.option.temperature === selectedTempOptionId
          ) {
            return {
              ...item,
              quantity: item.quantity + count,
            };
          }
          return item;
        });
      }

      return [
        {
          menuId: menuId,
          option: [selectedSizeOptionId, selectedTempOptionId],
          quantity: count,
          price: price,
        },
        ...prevOrderList,
      ];
    });
  }

  if (loading || !modalInfo) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className={classes.menuLayout}>
        <div className={classes.menuCard}>
          <img
            className={isAnimated ? `${classes.img} ${classes.animation}` : classes.img}
            src={modalInfo.img}
            alt={modalInfo.name}
          />
          <p>{modalInfo.name}</p>
          <p>{Number(price)}</p>
        </div>
        <div className={classes.optionsLayout}>
          <div className={classes.buttonsLayout}>
            <div className={classes.buttonsRowLayout}>
              {modalInfo.option &&
                modalInfo.option
                  .filter((option: Option) => option.optionCategoryType === 'size')
                  .map((option: Option, index: number) => (
                    <OptionButton
                      key={index}
                      label={option.optionName.toUpperCase()}
                      selected={selectedSizeOptionId === option.optionId}
                      onClick={() => handleOptionChange(setSelectedSizeOptionId, option.optionId)}
                    />
                  ))}
            </div>
            <div className={classes.buttonsRowLayout}>
              {modalInfo.option &&
                modalInfo.option
                  .filter((option: Option) => option.optionCategoryType === 'temperature')
                  .map((option: Option, index: number) => (
                    <OptionButton
                      key={index}
                      label={option.optionName.toUpperCase()}
                      selected={selectedTempOptionId === option.optionId}
                      onClick={() => handleOptionChange(setselectedTempOptionId, option.optionId)}
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
