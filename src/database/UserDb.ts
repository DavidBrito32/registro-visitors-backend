import { UserDB } from "../types/types";
import { Database } from "./knex";

export class UserDb extends Database {
	public getUsers = async (): Promise<Array<UserDB>> => {
		const users: Array<UserDB> = await Database.connection("user");
		return users;
	};

	public getUserByEmail = async (email: string): Promise<UserDB | undefined> => {
		const [user]: Array<UserDB> | undefined[] = await Database.connection
			.select("*")
			.from("user")
			.where({ email: email });
		return user;
	};

	public getUsersById = async (id: string): Promise<UserDB | undefined> => {
		const [user]: Array<UserDB> | undefined[] = await Database.connection.select("*").from("user").where({ id: id });
		return user;
	};

	public createUser = async (id: string, name: string, role: string, cpf: string, email: string, password: string, createdAt: string): Promise<void> => {
		await Database.connection
			.insert({
				id,
				name,
				role,
				cpf,
				email,
				password,
				created_at: createdAt,
			})
			.into("user");
	};

	public getByCpf = async (cpf: string): Promise<UserDB | undefined> => {
		const [usuario]: Array<UserDB> | Array<undefined> = await Database.connection("user").where({ cpf: cpf });
		return usuario;
	};

	public editUser = async (id: string, data: UserDB): Promise<void> => {
		const { name, role, cpf, email, password }: UserDB = data;
		await Database.connection
			.update({
				name,
				role,
				cpf,
				email,
				password
			})
			.from("user")
			.where({ id: id });
	};

	public deleteUser = async (id: string): Promise<void> => {
		await Database.connection.delete().from("user").where({ id: id });
	};

	public login = async (email: string, password: string): Promise<UserDB | undefined> => {
		const [Usuario]: Array<UserDB> | Array<undefined> = await Database.connection.select("email", "name", "role", "cpf").from("user").where({ email: email, password: password });
		return Usuario;
	};
}
