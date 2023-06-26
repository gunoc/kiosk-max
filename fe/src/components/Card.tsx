import classes from './Card.module.css';

export function Card({
  id,
  name,
  price,
  img,
  menuCardClickHandler,
}: {
  id: number;
  name: string;
  price: number;
  img: string;
  menuCardClickHandler: (index: number) => void;
}) {
  return (
    <div className={classes.box} onClick={() => menuCardClickHandler(id)}>
      <img className={classes.img} src={img} alt="americano" />
      <p className={classes.text}>
        <span>{name}</span>
        <span>{price}</span>
      </p>
    </div>
  );
}
