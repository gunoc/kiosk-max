import classes from './App.module.css';
import { MenuTab } from './components/MenuTab';

function App() {
  return (
    <div className={classes.kiosk}>
      <MenuTab />
    </div>
  );
}

export default App;
