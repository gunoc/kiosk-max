import { Outlet } from 'react-router-dom';

import classes from './App.module.css';
import { AddMenu } from './components/AddMenu';
import { TabMenu } from './components/TabMenu';
import { TestBtnForModal } from './components/TestBtnForModal';

function App() {
  const menu = [
    { name: '아메리카노', price: '4000', id: '1', img: '{url}' },
    { name: '콜드브루', price: '4500', id: '2', img: '{url}' },
    { name: '라떼', price: '4500', id: '3', img: '{url}' },
    { name: '바닐라라떼', price: '4500', id: '4', img: '{url}' },
    { name: '헤이즐넛', price: '4500', id: '5', img: '{url}' },
  ];
  return (
    <div className={classes.kiosk}>
      <TabMenu />
      {menu.map((menuItem) => (
        <TestBtnForModal key={menuItem.id} id={menuItem.id} name={menuItem.name} />
      ))}
      <Outlet />
    </div>
  );
}

export default App;
