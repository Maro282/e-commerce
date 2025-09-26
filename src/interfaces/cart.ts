import { Product } from "./product";

export interface CartResponse {
  status: string;
  message?: string;
  numOfCartItems: number;
  cartId: string;
  data: CartData<string>;
}

export interface GetCartResponse {
  status: string;
  message?: string;
  numOfCartItems: number;
  cartId: string;
  data: CartData<Product>;
}

export interface CartData<T> {
  _id: string;
  cartOwner: string;
  products: CartProduct<T>[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  totalCartPrice: number;
}

export interface CartProduct<T> {
  count: number;
  _id: string;
  product: T;
  price: number;
}

export interface IClearCart {
  message: string;
}
