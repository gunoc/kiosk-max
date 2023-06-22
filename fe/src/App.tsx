import { Outlet } from 'react-router-dom';

import classes from './App.module.css';
import { AddMenu } from './components/AddMenu';
import { TabMenu } from './components/TabMenu';
import { TestBtnForModal } from './components/TestBtnForModal';

function App() {
  return (
    <div className={classes.kiosk}>
      <TabMenu />
      <TestBtnForModal />
      <Outlet />
    </div>
  );
}

export default App;
