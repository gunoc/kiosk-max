import { useState, useEffect } from 'react';

import classes from './App.module.css';
import { TabMenu } from './components/TabMenu';
import { MainArea } from './components/MainArea';

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

  // const menuList: Menu[] = [
  //   {
  //     category: '커피',
  //     products: [
  //       {
  //         imgURL: '/assets/americano.jpeg',
  //         name: '아메리카노',
  //         price: 4000,
  //       },
  //       {
  //         imgURL: '/assets/americano.jpeg',
  //         name: '콜드브루',
  //         price: 4500,
  //       },
  //       {
  //         imgURL: '/assets/americano.jpeg',
  //         name: '에스프레스',
  //         price: 3000,
  //       },
  //       {
  //         imgURL: '/assets/americano.jpeg',
  //         name: '카페모카',
  //         price: 5000,
  //       },
  //     ],
  //   },
  //   {
  //     category: '라떼',
  //     products: [
  //       {
  //         imgURL: '/assets/americano.jpeg',
  //         name: '라떼1',
  //         price: 4000,
  //       },
  //       {
  //         imgURL: '/assets/americano.jpeg',
  //         name: '라떼2',
  //         price: 4500,
  //       },
  //       {
  //         imgURL: '/assets/americano.jpeg',
  //         name: '라떼3',
  //         price: 3000,
  //       },
  //       {
  //         imgURL: '/assets/americano.jpeg',
  //         name: '라떼4',
  //         price: 5000,
  //       },
  //     ],
  //   },
  //   {
  //     category: '쥬스',
  //     products: [
  //       {
  //         imgURL: '/assets/americano.jpeg',
  //         name: '쥬스1',
  //         price: 4000,
  //       },
  //       {
  //         imgURL: '/assets/americano.jpeg',
  //         name: '쥬스2',
  //         price: 4500,
  //       },
  //       {
  //         imgURL: '/assets/americano.jpeg',
  //         name: '쥬스3',
  //         price: 3000,
  //       },
  //       {
  //         imgURL: '/assets/americano.jpeg',
  //         name: '쥬스4',
  //         price: 5000,
  //       },
  //     ],
  //   },
  //   {
  //     category: '티',
  //     products: [
  //       {
  //         imgURL: '/assets/americano.jpeg',
  //         name: '티1',
  //         price: 4000,
  //       },
  //       {
  //         imgURL: '/assets/americano.jpeg',
  //         name: '티2',
  //         price: 4500,
  //       },
  //       {
  //         imgURL: '/assets/americano.jpeg',
  //         name: '티3',
  //         price: 3000,
  //       },
  //       {
  //         imgURL: '/assets/americano.jpeg',
  //         name: '티4',
  //         price: 5000,
  //       },
  //     ],
  //   },
  //   {
  //     category: '디카페인',
  //     products: [
  //       {
  //         imgURL: '/assets/americano.jpeg',
  //         name: '디카페인1',
  //         price: 4000,
  //       },
  //       {
  //         imgURL: '/assets/americano.jpeg',
  //         name: '디카페인2',
  //         price: 4500,
  //       },
  //       {
  //         imgURL: '/assets/americano.jpeg',
  //         name: '디카페인3',
  //         price: 3000,
  //       },
  //       {
  //         imgURL: '/assets/americano.jpeg',
  //         name: '디카페인4',
  //         price: 5000,
  //       },
  //     ],
  //   },
  // ];

  return (
    <div className={classes.kiosk}>
      <TabMenu menuList={menuList} activeTab={activeTab} setActiveTab={setActiveTab} />
      <MainArea productList={productList} activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
}

export default App;
