export interface User {
  id: number | null;
  name: string;
  email: string;
  email_verified_at: null | string;
  created_at: null | string;
  updated_at: null | string;
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
