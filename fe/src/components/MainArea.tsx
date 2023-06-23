import { Product } from '../utils/types';
import { Card } from './Card';
import { Outlet } from 'react-router-dom';

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
    <>
      <main className={classes.main}>
        {productList.map((product, index) => (
          <Card key={index} id={product.id} name={product.name} price={product.price} img={product.img} />
        ))}
        <Outlet />
      </main>
    </>
  );
}
