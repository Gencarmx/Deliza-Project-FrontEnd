export interface User {
  id: string;
  userName: string;
  password: string;
}

export interface LoginResponse {
  code: string;
  message: string;
  data: {
    token: string;
  };
}

export interface LoginResult {
  token: string;
}
