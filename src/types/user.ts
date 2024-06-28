import { JwtPayload } from "jwt-decode";

export interface Role {
  id: number;
  name: string
}

export interface User {
  id: number | null;
  name: string;
  email: string;
  emailVerifiedAt: null | string;
  img: string | null;
  imgUrl: string | null;
  isActive: boolean;
  createdAt: null | string;
  updatedAt: null | string;
  deletedAt: null | string;
  roleNames: Role[]
}

export type LoginPayload = {
  email: string;
  password: string;
};

export type LoginResponsePayload = {
  token: string
  tokenType: string
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
