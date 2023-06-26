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
  return (
    <button className={`${classes.tab} ${activeTab === id ? classes.active : ''}`} onClick={onClick}>
      {menuName}
    </button>
  );
}
