import classes from './Card.module.css';

export function Card({
  menuId,
  name,
  price,
  img,
  popular,
  menuCardClickHandler,
}: {
  menuId: number;
  name: string;
  price: number;
  img: string;
  popular: boolean;
  menuCardClickHandler: (menuId: number) => void;
}) {
  return (
    <>
      <div className={classes.box} onClick={() => menuCardClickHandler(menuId)}>
        <img className={classes.img} src={img} alt="americano" />
        <p className={classes.text}>
          <span>{name}</span>
          <span>{price}</span>
        </p>
        {popular && <div className={classes.best}>BEST</div>}
      </div>
    </>
  );
}
