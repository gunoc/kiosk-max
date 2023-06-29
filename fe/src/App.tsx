import { useState, useEffect } from 'react';
import Route from './components/Route';

import classes from './App.module.css';
import { MainArea } from './components/Main/MainArea';
import { Cart } from './components/Cart/Cart';
import { TabMenu } from './components/Tab/TabMenu';
import { Receipt } from './components/Receipt/Receipt';
import { OrderData } from './utils/types';

function App() {
  const [activeTab, setActiveTab] = useState(0);
  const [orderList, setOrderList] = useState<OrderData[]>([]);

  return (
    <div className={classes.kiosk}>
      <Route path="/">
        <>
          <TabMenu activeTab={activeTab} setActiveTab={setActiveTab} />
          <MainArea activeTab={activeTab} setOrderList={setOrderList} />
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
