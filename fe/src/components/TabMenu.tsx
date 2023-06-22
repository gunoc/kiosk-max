import { TabContainer } from './TabContainer';
import classes from './TabMenu.module.css';
import { Menu } from '../utils/types';

export function TabMenu({
  menuList,
  activeTab,
  setActiveTab,
}: {
  menuList: Menu[];
  activeTab: number;
  setActiveTab: (idx: number) => void;
}) {
  return (
    <nav className={classes.nav}>
      <TabContainer menuList={menuList} activeTab={activeTab} setActiveTab={setActiveTab} />
    </nav>
  );
}
