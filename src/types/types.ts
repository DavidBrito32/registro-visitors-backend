export interface VisitorDB {
  id: string;
  name: string;
  cpf: string;
  gender: string;
  age: number;
  profession: string;
  city: string;
  state: string;
  created_at: string;
}

export interface UserDB {
  id: string;
  name: string;
  cpf: string;
  email: string;
  role: string;
  password: string;
  created_at: string;
}

export interface BlockedVisitor {
  id: string;
  name: string;
  cpf: string;
  message: string;
}

export interface LoginDB {
  message: string;
  usuario: UserDB;
  token: string;
}
