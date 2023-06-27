import { OrderData, Product } from '../../utils/types';
import { Card } from './Card';
import { useState } from 'react';
import classes from './MainArea.module.css';
import { Modal } from '../Modal/Modal';
import { AddMenu } from '../Modal/AddMenu';

export function MainArea({
  productList,
  setOrderList,
}: {
  productList: Product[];
  setOrderList: React.Dispatch<React.SetStateAction<OrderData[]>>;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  function menuCardClickHandler(menuId: number) {
    const product = productList.find((item) => item.menuId === menuId);
    if (product) {
      setSelectedProduct(product);
      addModalOpenHandler();
    }
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
            menuId={product.menuId}
            name={product.name}
            price={product.price}
            img={product.img}
            menuCardClickHandler={menuCardClickHandler}
          />
        ))}
        {isModalOpen && selectedProduct !== null && (
          <Modal addModalCloseHandler={addModalCloseHandler}>
            <AddMenu
              menuId={selectedProduct.menuId}
              setOrderList={setOrderList}
              addModalCloseHandler={addModalCloseHandler}
            />
          </Modal>
        )}
      </main>
    </>
  );
}
