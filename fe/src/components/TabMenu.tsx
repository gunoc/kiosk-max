import { TabContainer } from './TabContainer';
import classes from './TabMenu.module.css';

export function TabMenu() {
  const tabs: string[] = ['커피', '라떼', '쥬스', '티', '디카페인'];

  return (
    <nav className={classes.nav}>
      <TabContainer tabs={tabs} />
    </nav>
  );
}
