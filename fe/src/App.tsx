
import { Outlet } from 'react-router-dom';
import { useState, useEffect } from 'react';


import classes from './App.module.css';
import { AddMenu } from './components/AddMenu';
import { TabMenu } from './components/TabMenu';
import { MainArea } from './components/MainArea';
import { TestBtnForModal } from './components/TestBtnForModal';

function App() {
  const [activeTab, setActiveTab] = useState(0);
  const [menuList, setMenuList] = useState([]);
  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(false);
    
  useEffect(() => {
    setLoading(true);
    fetch('/api/menus')
      .then((res) => res.json())
      .then((data) => {
        setMenuList(data);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    setLoading(true);
    fetch(`api/products/${activeTab}`)
      .then((res) => res.json())
      .then((data) => {
        setProductList(data);
        setLoading(false);
      });
  }, [activeTab]);  
    
  const menu = [
    { name: '아메리카노', price: '4000', id: '1', img: '{url}' },
    { name: '콜드브루', price: '4500', id: '2', img: '{url}' },
    { name: '라떼', price: '4500', id: '3', img: '{url}' },
    { name: '바닐라라떼', price: '4500', id: '4', img: '{url}' },
    { name: '헤이즐넛', price: '4500', id: '5', img: '{url}' },
  ];
  return (
    <div className={classes.kiosk}>
      <TabMenu menuList={menuList} activeTab={activeTab} setActiveTab={setActiveTab} />
      <MainArea productList={productList} activeTab={activeTab} setActiveTab={setActiveTab} />
      {menu.map((menuItem) => (
        <TestBtnForModal key={menuItem.id} id={menuItem.id} name={menuItem.name} />
      ))}
      <Outlet />
    </div>
  );
}

export default App;
