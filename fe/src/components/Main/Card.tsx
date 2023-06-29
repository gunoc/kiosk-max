import classes from './Card.module.css';

export function Card({
  menuId,
  name,
  price,
  img,
  isPopular,
  menuCardClickHandler,
}: {
  menuId: number;
  name: string;
  price: number;
  img: string;
  isPopular: boolean;
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
        {isPopular && <div className={classes.best}>BEST</div>}
      </div>
    </>
  );
}
