export interface User {
  id: string;
  userName: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}
