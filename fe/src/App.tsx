import classes from './App.module.css';
import { TabMenu } from './components/TabMenu';

function App() {
  return (
    <div className={classes.kiosk}>
      <TabMenu />
    </div>
  );
}

export default App;
