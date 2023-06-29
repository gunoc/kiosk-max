import { useState, useEffect } from 'react';
import classes from './MainArea.module.css';
import { OrderData, Product } from '../../utils/types';

import { Card } from './Card';
import { Modal } from '../Modal/Modal';
import { AddMenu } from '../Modal/AddMenu';
export function MainArea({
  activeTab,
  setOrderList,
}: {
  activeTab: number;
  setOrderList: React.Dispatch<React.SetStateAction<OrderData[]>>;
}) {
  const [loading, setLoading] = useState(false);
  const [productList, setProductList] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const categoryId = activeTab + 1;
  const isModalOpen = !!selectedProduct;

  useEffect(() => {
    setLoading(true);
    fetch(`api/menus/${categoryId}`)
      .then((res) => res.json())
      .then((data) => {
        setProductList(data);
        setLoading(false);
      });
  }, [activeTab]);

  function menuCardClickHandler(menuId: number) {
    const product = productList.find((item) => item.menuId === menuId);
    if (product) {
      setSelectedProduct(product);
    }
  }

  if (loading) {
    return <div className={classes.main}>Loading...</div>;
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
            isPopular={product.isPopular}
            menuCardClickHandler={menuCardClickHandler}
          />
        ))}
        {isModalOpen && selectedProduct !== null && (
          <Modal
            closeHandler={() => {
              setSelectedProduct(null);
            }}
          >
            <AddMenu
              menuId={selectedProduct.menuId}
              setOrderList={setOrderList}
              setSelectedProduct={setSelectedProduct}
            />
          </Modal>
        )}
      </main>
    </>
  );
}
