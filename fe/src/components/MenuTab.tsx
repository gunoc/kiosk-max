import { Tab } from './Tab';

import classes from './MenuTab.module.css';

export function MenuTab() {
  const categoryList = ['커피', '라떼', '쥬스', '티', '디카페인'];

  return (
    <nav className={classes.nav}>
      <div className={classes.container}>
        <Tab menuName={categoryList[0]} />
        <Tab menuName={categoryList[1]} />
        <Tab menuName={categoryList[2]} />
        <Tab menuName={categoryList[3]} />
        <Tab menuName={categoryList[4]} />
      </div>
    </nav>
  );
}
