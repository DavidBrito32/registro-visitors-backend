import { Users } from "../types/types";
import { Database } from "./knex";

export class UserDb extends Database {
	public async getUsers(): Promise<Array<Users>> {
		const users: Array<Users> = await Database.connection("user");
		return users;
	}

	public async getUsersById(id: string): Promise<Users | undefined> {
		const [user]: Array<Users> | undefined[] = await Database.connection.select("*").from("user").where({id: id});
		return user;
	}

	public async createUser (id: string, name: string, role: string, cpf: string, email: string, password: string, createdAt: string): Promise<void> {
		await Database.connection.insert({
			id,
			name,
			role,
			cpf,
			email,
			password,
			created_at: createdAt
		}).into("user");
	}

	public async getByCpf(cpf: string): Promise<Users | undefined>{
		const [usuario]: Array<Users> | Array<undefined> = await Database.connection("user").where({cpf: cpf});
		return usuario;
	}

	public async editUser (id: string, data: Users): Promise<void> {
		const { name, role, cpf, email, password } = data;
		await Database.connection.update({
			name,
			role,
			cpf,
			email,
			password,
			created_at: new Date().toISOString()
		}).from("user").where({id: id});
	}

	public async deleteUser(id: string): Promise<void>{
		await Database.connection.delete().from("user").where({id: id});
	}

	public async login(email: string, password: string): Promise<Users | undefined>{
		const [ Usuario ] : Array<Users> | Array<undefined> = await Database.connection.select("email, password").from("user").where({email: email, password: password});
		return Usuario;
	}
} 