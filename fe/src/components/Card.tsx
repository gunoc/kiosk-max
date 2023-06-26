import { Link } from 'react-router-dom';
import classes from './Card.module.css';

export function Card({ id, name, price, img }: { id: number; name: string; price: number; img: string }) {
  return (
    <Link to={`/add-menu/${id}`} state={{ id: id, name: name, price: price, img: img }} className={classes.box}>
      <img className={classes.img} src={img} alt="americano" />
      <p className={classes.text}>
        <span>{name}</span>
        <span>{price}</span>
      </p>
    </Link>
  );
}
