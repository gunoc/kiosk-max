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
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [addModalOpen, setAddModalOpen] = useState(false);

  // const isModalOpen = !!selectedProduct;

  function menuCardClickHandler(menuId: number) {
    const product = productList.find((item) => item.menuId === menuId);
    if (product) {
      setAddModalOpen(true);
      setSelectedProduct(product);
    }
  }

  function modalCloseHandler() {
    setAddModalOpen(false);
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
        {addModalOpen && selectedProduct !== null && (
          <Modal modalCloseHandler={modalCloseHandler}>
            <AddMenu
              menuId={selectedProduct.menuId}
              setOrderList={setOrderList}
              setSelectedProduct={setSelectedProduct}
              modalCloseHandler={modalCloseHandler}
            />
          </Modal>
        )}
      </main>
    </>
  );
}
