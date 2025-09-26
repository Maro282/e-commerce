export interface GetAdressesInterface<T> {
  result?: number; // when getting logged user addresses
  status: string; // when getting single and all
  message?: string; // when adding a new one
  data: T;
}

export interface IAddress {
  _id: string;
  name: string;
  details: string;
  phone: string;
  city: string;
}
