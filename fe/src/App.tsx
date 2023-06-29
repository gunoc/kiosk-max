import { useState, useEffect } from 'react';
import Route from './components/Route';

import classes from './App.module.css';
import { MainArea } from './components/Main/MainArea';
import { Cart } from './components/Cart/Cart';
import { TabMenu } from './components/Tab/TabMenu';
import { Receipt } from './components/Receipt/Receipt';
import { OrderData } from './utils/types';

function App() {
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [menuList, setMenuList] = useState([]);
  const [productList, setProductList] = useState([]);
  const [orderList, setOrderList] = useState<OrderData[]>([]);

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

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={classes.kiosk}>
      <Route path="/">
        <>
          <TabMenu menuList={menuList} activeTab={activeTab} setActiveTab={setActiveTab} />
          <MainArea productList={productList} setOrderList={setOrderList} />
          <Cart orderList={orderList} setOrderList={setOrderList} />
        </>
      </Route>
      <Route path="/receipt">
        <Receipt />
      </Route>
    </div>
  );
}

export default App;
