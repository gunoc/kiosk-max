import classes from './Tab.module.css';

export function Tab({ menuName }: { menuName: string }) {
  return <button className={classes.btn}>{menuName}</button>;
}
