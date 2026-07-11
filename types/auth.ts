export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  role?: "admin" | "mechanic" | "guest";
}

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: "admin" | "mechanic" | "guest";
}