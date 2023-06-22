import classes from './Tab.module.css';

export function Tab({
  id,
  menuName,
  activeTab,
  onClick,
}: {
  id: number;
  menuName: string;
  activeTab: number;
  onClick: () => void;
}) {
  if (activeTab === id) {
    return (
      <button className={`${classes.tab} ${classes.active}`} onClick={onClick}>
        {menuName}
      </button>
    );
  }
  return (
    <button className={classes.tab} onClick={onClick}>
      {menuName}
    </button>
  );
}
