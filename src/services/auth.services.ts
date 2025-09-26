import { IFormValues } from "@/interfaces";
import { AuthResponse } from "@/types/responses";

// SignUp function
export async function signUp(values: IFormValues): Promise<AuthResponse> {
  return await fetch("https://ecommerce.routemisr.com/api/v1/auth/signup", {
    method: "post",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(values),
  })
    .then((res) => res.json())
    .catch((error) => error);
}

// Function to Login
export async function login(email: string, password: string) {
  return await fetch("https://ecommerce.routemisr.com/api/v1/auth/signin", {
    method: "post",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  })
    .then((res) => res.json())
    .catch((error) => error);
}

//  function to verifyToken and get user Id
export async function verifyToken(token: string) {
  return await fetch(
    "https://ecommerce.routemisr.com/api/v1/auth/verifyToken",
    {
      headers: {
        token,
      },
    }
  ).then((res) => res.json());
}
