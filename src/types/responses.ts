import {
  Brand,
  CashPayment,
  Category,
  GetAdressesInterface,
  IAddress,
  IWhishlistResponse,
  OnlinePayment,
  Order,
  Product,
} from "@/interfaces";
import { IRegister } from "@/interfaces/auth";

// api response types
export type ProductResponse = ApiResponse<Product>;
export type CategoryResponse = ApiResponse<Category>;
export type BrandResponse = ApiResponse<Brand>;

// api response for single item

export type SingleProductResponse = {
  data: Product;
};
export type SingleCategoryResponse = {
  data: Category;
};
export type SingleBrandResponse = {
  data: Brand;
};

// Api response for whishlist
export type AddToWhishListResponse = IWhishlistResponse<string>;
export type GetFromWhishListResponse = IWhishlistResponse<Product>;
export type RemoveFromWhishListResponse = IWhishlistResponse<string>;

// Auth responses
export type AuthResponse = IRegister;

// Address response
export type GetAllAddressesResponse = GetAdressesInterface<IAddress[]>;
export type AddAddressResponse = GetAdressesInterface<IAddress[]>;

//Get spesific address
export type GetSingleAddressResponse = GetAdressesInterface<IAddress>;

// User Orders
export type UserOrdersResponse = Order[];

// ONLINE PAYMENT RESPONSE
export type OnlinePaymentResponse = OnlinePayment;

// CASH PAYMENT RESPONSE
export type CashPaymentResponse = CashPayment;
