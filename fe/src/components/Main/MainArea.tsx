import { Product } from '../../utils/types';
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
  setOrderList: React.Dispatch<React.SetStateAction<never[]>>;
  modalContent: any;
  isModalOpen: boolean;
  addModalOpenHandler: (content: any) => void;
  addModalCloseHandler: () => void;
}) {
  // const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  function menuCardClickHandler(index: number) {
    const product = productList[index - 1];
    setSelectedProduct(product);
    addModalOpenHandler(<AddMenu menuId={product.id} setOrderList={setOrderList} />);
  }

  // function addModalOpenHandler() {
  //   if (isModalOpen) {
  //     return;
  //   }

  //   setIsModalOpen(true);
  // }

  // function addModalCloseHandler() {
  //   if (!isModalOpen) {
  //     return;
  //   }

  //   setIsModalOpen(false);
  // }

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
          <Modal addModalCloseHandler={addModalCloseHandler}>{modalContent}</Modal>
        )}
      </main>
    </>
  );
}
