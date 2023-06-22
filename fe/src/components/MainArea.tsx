import { Product } from '../utils/types';
import { Card } from './Card';

import classes from './MainArea.module.css';

export function MainArea({
  productList,
  activeTab,
  setActiveTab,
}: {
  productList: Product[];
  activeTab: number;
  setActiveTab: (idx: number) => void;
}) {
  return (
    <main className={classes.main}>
      {productList.map((product, index) => (
        <Card key={index} name={product.name} price={product.price} img={product.img} />
      ))}
    </main>
  );
}
