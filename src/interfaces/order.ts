import { CartProduct } from "./cart";
import { Product } from "./product";

export interface Order {
  shippingAddress: ShippingAddress;
  taxPrice: number;
  shippingPrice: number;
  totalOrderPrice: number;
  paymentMethodType: string;
  isPaid: boolean;
  isDelivered: boolean;
  _id: string;
  user: {
    _id: string;
    name: string;
    email: string;
    phone: string;
  };

  cartItems: CartProduct<Product>[];
  createdAt: string;
  updatedAt: string;
  id: number;
  __v: number;
}

export interface ShippingAddress {
  details: string;
  phone: string;
  city: string;
}

// Online Response
export interface OnlinePayment {
  status: string;
  session: {
    url: string;
    success_url: string;
    cancel_url: string;
  };
}

// Cash  Response
export interface CashPayment {
  status: string;
  data: {
    shippingAddress: ShippingAddress;
    taxPrice: number;
    shippingPrice: number;
    totalOrderPrice: number;
    paymentMethodType: string;
    isPaid: boolean;
    isDelivered: boolean;
    _id: string;
    user: string;
    cartItems: CartItemOnCash[];
    createdAt: string;
    updatedAt: string;
    id: number;
    __v: number;
  };
}

// CartItem in cash
interface CartItemOnCash {
  count: number;
  _id: string;
  product: Product;
  price: number;
}
