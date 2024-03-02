export interface VisitorDB {
  id: string;
  name: string;
  cpf: string;
  gender: string;
  age: string;
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

export interface GenderDB {
  name: string;
  total: number;
}
export interface CityDB {
  name: string;
  total: number;
}
export interface StateDB {
  name: string;
  total: number;
}
export interface ProfessionDB {
  name: string;
  total: number;
}
export interface ResultsDB {
  gender: Array<GenderDB>,
  city: Array<CityDB>,
  state: Array<StateDB>,
  profession: Array<ProfessionDB>
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
  route: string;
}
