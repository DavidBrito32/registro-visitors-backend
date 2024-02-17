import { Users } from "../types/types";
import { Database } from "./knex";

export class UserDb extends Database {
	public async getUsers(): Promise<Array<Users>> {
		const users: Users[] = await Database.connection("user");
		return users;
	}

	public async createUser (id: string, name: string, role: string, cpf: string, email: string, password: string): Promise<void> {
		await Database.connection.insert({
			id,
			name,
			role,
			cpf,
			email,
			password,
			created_at: new Date().toISOString()
		}).into("user");
	}
}