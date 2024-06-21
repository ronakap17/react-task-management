import { JwtPayload } from "jwt-decode";

export interface Role {
  id: number;
  name: string
}

export interface User {
  id: number | null;
  name: string;
  email: string;
  email_verified_at: null | string;
  img: string | null;
  img_url: string | null;
  is_active: boolean;
  created_at: null | string;
  updated_at: null | string;
  deleted_at: null | string;
  role_names: Role[]
}

export type LoginPayload = {
  email: string;
  password: string;
};

export type LoginResponsePayload = {
  token: string
  token_type: string
  user: User
}

export type RegisterPayload = {
  name: string;
  email: string;
  password: string;
  img?: File;
};

export type UserDetailsResponsePayload = {
  user: User
}

export type TokenData = JwtPayload

export type LogoutResponsePayload = []
