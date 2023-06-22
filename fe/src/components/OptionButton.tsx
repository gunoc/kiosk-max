import classes from './OptionButton.module.css';

interface buttonProps {
  label: string;
  selected: boolean;
  onClick: () => void;
}

export function OptionButton({ label, selected, onClick }: buttonProps) {
  const buttonClasses = selected ? `${classes.optionButton} ${classes.active}` : classes.optionButton;
  return (
    <button className={buttonClasses} onClick={onClick}>
      {label}
    </button>
  );
}
