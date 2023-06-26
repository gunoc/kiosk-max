import { Product } from '../utils/types';
import { Card } from './Card';
import { useState } from 'react';
import classes from './MainArea.module.css';
import { Modal } from './Modal';
import { AddMenu } from './AddMenu';

export function MainArea({
  productList,
  setOrderList,
}: {
  productList: Product[];
  setOrderList: React.Dispatch<React.SetStateAction<never[]>>;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  function menuCardClickHandler(index: number) {
    const product = productList[index - 1];
    setSelectedProduct(product);
    addModalOpenHandler();
  }

  function addModalOpenHandler() {
    if (isModalOpen) {
      return;
    }

    setIsModalOpen(true);
  }

  function addModalCloseHandler() {
    if (!isModalOpen) {
      return;
    }

    setIsModalOpen(false);
  }

  return (
    <>
      <main className={classes.main}>
        {productList.map((product, index) => (
          <Card
            key={index}
            id={product.id}
            name={product.name}
            price={product.price}
            img={product.img}
            menuCardClickHandler={menuCardClickHandler}
          />
        ))}
        {isModalOpen && selectedProduct !== null && (
          <Modal addModalCloseHandler={addModalCloseHandler}>
            <AddMenu menuId={selectedProduct.id} setOrderList={setOrderList} />
          </Modal>
        )}
      </main>
    </>
  );
}
