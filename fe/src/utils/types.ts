export interface Menu {
  name: string;
}

export interface Product {
  name: string;
  price: number;
  id: number;
  img: string;
}

export type OrderData = {
  menuId: number;
  option: { size: number; temperature: number };
  quantity: number;
};
