export interface Menu {
  name: string;
}

export interface Product {
  name: string;
  price: number;
  menuId: number;
  img: string;
  isPopular: boolean;
}

export type OrderData = {
  menuId: number;
  option: { size: number; temperature: number };
  quantity: number;
  price: number;
  sizeCost: number;
  iceCost: number;
};
