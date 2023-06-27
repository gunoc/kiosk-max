import { OrderData, Product } from '../../utils/types';
import { Card } from './Card';
import { useState } from 'react';
import classes from './MainArea.module.css';
import { Modal } from '../Modal/Modal';
import { AddMenu } from '../Modal/AddMenu';

export function MainArea({
  productList,
  setOrderList,
  modalContent,
  isModalOpen,
  addModalOpenHandler,
  addModalCloseHandler,
}: {
  productList: Product[];
  setOrderList: React.Dispatch<React.SetStateAction<OrderData[]>>;
  modalContent: any;
  isModalOpen: boolean;
  addModalOpenHandler: (content: any) => void;
  addModalCloseHandler: () => void;
}) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  function menuCardClickHandler(menuId: number) {
    console.log(menuId);
    const product = productList.find((item) => item.menuId === menuId);

    if (product) {
      console.log('박하', menuId);
      setSelectedProduct(product);
      addModalOpenHandler(
        <>
          <AddMenu
            menuId={menuId}
            setOrderList={setOrderList}
            setSelectedProduct={setSelectedProduct}
            addModalCloseHandler={addModalCloseHandler}
          />
        </>,
      );
    }
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
          // <Modal addModalCloseHandler={addModalCloseHandler}>{modalContent}</Modal>
          <Modal addModalCloseHandler={addModalCloseHandler}>
            <AddMenu
              menuId={1}
              setOrderList={setOrderList}
              setSelectedProduct={setSelectedProduct}
              addModalCloseHandler={addModalCloseHandler}
            />
          </Modal>
        )}
      </main>
    </>
  );
}
