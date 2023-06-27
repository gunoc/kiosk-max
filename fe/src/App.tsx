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
    setIsAddMenuModalOpen(true);
    setAddMenuModalContent(content);
  }

  function addMenuModalCloseHandler() {
    if (!isAddMenuModalOpen) {
      return;
    }

    setIsAddMenuModalOpen(false);
    setAddMenuModalContent(null);
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
