export type UserRole = "admin" | "mechanic" | "guest";

export interface IUser {
  _id?: string;
  name: string;
  email: string;
  password: string;
  role: UserRole;
  createdAt?: Date;
  updatedAt?: Date;
}
export interface User {
  _id: string;
  name: string;
  email: string;
  role: "admin" | "mechanic" | "guest";
  createdAt: string;
  updatedAt: string;
}