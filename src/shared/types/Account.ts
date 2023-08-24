export interface RegisterDto {
  first_name: string;
  last_name: string;
  username: string;
  password: string;
}

export interface RegisterResult {
  first_name: string;
  last_name: string;
  username: string;
  id: number;
}

export interface RegisterError {
  ok: boolean;
  result: {
    field: string;
    message: string;
  }[];
}

export interface LoginDto {
  username: string;
  password: string;
}

export interface LoginResult {
  access_token: string;
  access_token_expration: string;
}
