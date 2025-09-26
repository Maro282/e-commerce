import { AddAddressResponse, GetAllAddressesResponse } from "@/types/responses";

interface AddAddressParam {
  name: string;
  details: string;
  phone: string;
  city: string;
}

// Function to add a new address
export async function addNewAddress(
  token: string,
  address: AddAddressParam
): Promise<AddAddressResponse> {
  return fetch("https://ecommerce.routemisr.com/api/v1/addresses", {
    method: "post",
    headers: {
      token,
      "content-type": "application/json",
    },
    body: JSON.stringify(address),
  })
    .then((res) => res.json())
    .catch((error) => error);
}

// Function to get all addresses
export async function getAllAddresses(
  token: string
): Promise<GetAllAddressesResponse> {
  return fetch("https://ecommerce.routemisr.com/api/v1/addresses", {
    headers: {
      token,
    },
  })
    .then((res) => res.json())
    .catch((error) => error);
}

// Function to delete spesific address
export async function removeAddress(
  addressId: string,
  token: string
): Promise<GetAllAddressesResponse> {
  return fetch(
    "https://ecommerce.routemisr.com/api/v1/addresses/" + `${addressId}`,
    {
      method: "delete",
      headers: {
        token,
      },
    }
  )
    .then((res) => res.json())
    .catch((error) => error);
}
