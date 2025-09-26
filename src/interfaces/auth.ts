export interface IRegister {
  message: string;
  user: User;
  token: string;
}

export interface User {
  name: string;
  email: string;
  role: "user" | "admin";
}
