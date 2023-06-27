import { useState, useEffect } from 'react';
import classes from './CartItem.module.css';
import { OrderData } from '../../utils/types';

export function CartItem({
  idx,
  orderData,
  setOrderList,
}: {
  idx: number;
  orderData: OrderData;
  setOrderList: React.Dispatch<React.SetStateAction<OrderData[]>>;
}) {
  // fade in 애니메이션
  // CartItem이 마운트 될 때 fade in 애니메이션을 보여주고 싶다.
  // 컴포넌트가 마운트 될 때 CartItem className에 fadeIn 클래스를 추가한다. (useEffect 이용?)
  // CartItem이 렌더링 될 때 미리 지정한 클래스(fadeIn) 이름에 따라서 애니메이션을 보여준다.
  // .item 클래스에 scale 0 으로 .fadeIn 클래스에 scale 1로
  // 아니면 @keyframes 으로 애니메이션 만들고 클래스 이름 하나만 부여하기?
  // const [fade, setFade] = useState('');

  // useEffect(() => {
  //   setFade(classes.fadeIn);
  // }, []);

  const [showAnimation, setShowAnimation] = useState(false);

  useEffect(() => {
    setShowAnimation(true);
  }, []);

  function getMenuName(menuId: number) {
    switch (menuId) {
      case 1:
        return '아메리카노';
      case 2:
        return '콜드브루';
      case 3:
        return '에스프레소';
      case 4:
        return '카페모카';
      case 5:
        return '카페라떼';
      case 6:
        return '카푸치노';
      case 7:
        return '평범한라떼';
      case 8:
        return '그냥라떼';

      default:
        return '메뉴 이름';
    }
  }

  function handleClick() {
    setOrderList((prevOrderList) => {
      return prevOrderList.filter(
        (order) =>
          order.menuId !== orderData.menuId ||
          order.option.size !== orderData.option.size ||
          order.option.temperature !== orderData.option.temperature,
      );
    });
  }

  console.log(idx, orderData);

  return (
    <li className={idx === 1 ? `${classes.item} ${classes.fadeIn}` : classes.item}>
      <button onClick={handleClick}>X</button>
      <div className="name">{getMenuName(orderData.menuId)}</div>
      <div className="size">{orderData.option.size === 1 ? 'S' : 'L'}</div>
      <div className="temp">{orderData.option.temperature === 1 ? 'HOT' : 'ICE'}</div>
      <div className={classes.count}>
        <span>{orderData.quantity}</span>
      </div>
    </li>
  );
}
