import classes from './Card.module.css';

export function Card({ name, price, img }: { name: string; price: number; img: string }) {
  return (
    <div className={classes.box}>
      <img className={classes.img} src={img} alt="americano" />
      <p className={classes.text}>
        <span>{name}</span>
        <span>{price}</span>
      </p>
    </div>
  );
}
