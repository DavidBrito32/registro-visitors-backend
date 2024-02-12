export interface Visitors {
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


export interface Users {
  id: number;
  name: string;
  cpf: string;
  email: string;
  role: string;
  password: string;
  created_at: string;
}
