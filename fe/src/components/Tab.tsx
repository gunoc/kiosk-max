import classes from './Tab.module.css';

export function Tab({ key, tab }: { key: number; tab: string }) {
  return <button className={classes.btn}>{tab}</button>;
}
