import { useState, useEffect } from 'react';

import classes from './App.module.css';
import { MainArea } from './components/Main/MainArea';
import { Cart } from './components/Cart/Cart';
import { TabMenu } from './components/Tab/TabMenu';
import { OrderData } from './utils/types';

function App() {
  const [activeTab, setActiveTab] = useState(0);
  const [menuList, setMenuList] = useState([]);
  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(false);

  const [orderList, setOrderList] = useState<OrderData[]>([]);
  const [isAddMenuModalOpen, setIsAddMenuModalOpen] = useState(false);
  const [addMenuModalContent, setAddMenuModalContent] = useState(null);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [paymentModalContent, setPaymentModalContent] = useState(null);

  useEffect(() => {
    // useEffect로 상태 변경 체크는 됨
    if (isAddMenuModalOpen) {
      console.log('모달 열!');
      console.log(isAddMenuModalOpen);
    }
    if (!isAddMenuModalOpen) {
      console.log('모달 닫!');
      console.log(isAddMenuModalOpen);
    }
  }, [isAddMenuModalOpen]);

  function addPaymentModalOpenHandler(content: any) {
    if (isPaymentModalOpen) {
      return;
    }
    setIsPaymentModalOpen(true);
    setPaymentModalContent(content);
  }

  function addPaymentModalCloseHandler() {
    if (!isPaymentModalOpen) {
      return;
    }

    setIsPaymentModalOpen(false);
    setPaymentModalContent(null);
  }

  function addMenuModalOpenHandler(content: any) {
    if (isAddMenuModalOpen) {
      return;
    }
    console.log(isAddMenuModalOpen + '가 false여야함');
    setIsAddMenuModalOpen(true);

    setAddMenuModalContent(content);
    console.log(content);
  }

  function addMenuModalCloseHandler() {
    console.log('되고있나요');
    console.log(isAddMenuModalOpen + '가 true여야함');
    setIsAddMenuModalOpen(false);
    setAddMenuModalContent(null);
    // 이 위로 변경

    if (!isAddMenuModalOpen) {
      return;
    }

    // 여전히 이건 안찍힘 true로 바뀐 상태가 아닌듯?? 비동기때문인지??  근데 왜 useEffect에는 감지가 되는가..? 이유는 모름
    console.log('되고있나요아악');
    console.log(isAddMenuModalOpen + '가 true여야함 아아악');
    // 이 위치에 있었는데
    // setIsAddMenuModalOpen(false);
    // setAddMenuModalContent(null);
  }

  useEffect(() => {
    setLoading(true);
    fetch('/api/categories')
      .then((res) => res.json())
      .then((data) => {
        setMenuList(data);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    setLoading(true);
    fetch(`api/menus/${activeTab}`)
      .then((res) => res.json())
      .then((data) => {
        setProductList(data);
        setLoading(false);
      });
  }, [activeTab]);

  return (
    <div className={classes.kiosk}>
      <TabMenu menuList={menuList} activeTab={activeTab} setActiveTab={setActiveTab} />
      <MainArea
        productList={productList}
        setOrderList={setOrderList}
        modalContent={addMenuModalContent}
        isModalOpen={isAddMenuModalOpen}
        addModalOpenHandler={addMenuModalOpenHandler}
        addModalCloseHandler={addMenuModalCloseHandler}
      />
      <Cart
        orderList={orderList}
        setOrderList={setOrderList}
        modalContent={paymentModalContent}
        isModalOpen={isPaymentModalOpen}
        addModalOpenHandler={addPaymentModalOpenHandler}
        addModalCloseHandler={addPaymentModalCloseHandler}
      />
    </div>
  );
}

export default App;
