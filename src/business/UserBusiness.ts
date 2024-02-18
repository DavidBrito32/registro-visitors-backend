/* eslint-disable @typescript-eslint/ban-ts-comment */
import { UserDb } from "../database/UserDb";
import { User } from "../models/User";
import { IdGenerator } from "../services/uuid/IdGenerator";
import { Users } from "../types/types";

export class UserBusiness {
	public async getAllUsers(): Promise<Array<Users>>{
		const user = new UserDb();
		const userList: Array<Users> = await user.getUsers();
		const userReturn = userList.map((item: Users) => new User(item.id, item.name, item.role, item.cpf, item.email, item.password, item.created_at));
		//@ts-ignore
		return userReturn;
	}

	public async createUser(data: Users): Promise<void>{
		const { name, cpf, role, email, password } = data;
		if(!name){
			throw new Error("'name' - Não pode ser omitido");
		}
		if(!cpf){
			throw new Error("'cpf' - Não pode ser omitido");
		}
		if(!role){
			throw new Error("'role' - Não pode ser omitido");
		}
		if(!email){
			throw new Error("'email' - Não pode ser omitido");
		}
		if(!password){
			throw new Error("'password' - Não pode ser omitido");
		}
		if(typeof name !== "string"){
			throw new Error("'name' - deve ser enviado no formato string");
		}
		if(typeof cpf !== "string"){
			throw new Error("'cpf' - deve ser enviado no formato string");
		}
		if(typeof role !== "string"){
			throw new Error("'role' - deve ser enviado no formato string");
		}
		if(typeof email !== "string"){
			throw new Error("'email' - deve ser enviado no formato string");
		}
		if(typeof password !== "string"){
			throw new Error("'password' - deve ser enviado no formato string");
		}

		const idGenerator = new IdGenerator();
		const ID = idGenerator.generate();
		const newUser = new User(ID, name, role, cpf, email, password, new Date().toISOString());

		const Database = new UserDb();
		const existe = await Database.getByCpf(cpf);
		if(existe[0]){
			throw new Error("'CPF' - ja cadastrado");
		}
		await Database.createUser(newUser.getId(), newUser.getName(), newUser.getRole(), newUser.getCpf(), newUser.getEmail(), newUser.getPassword(), newUser.getCreatedAt());
	}

	public async editUser(id: string, data: Users): Promise<void>{
		const { name, cpf, role, email, password } = data;
		if(name){
			if(typeof name !== "string"){
				throw new Error("'name' - deve ser uma string");
			}
		}
		if(cpf){
			if(typeof cpf !== "string"){
				throw new Error("'cpf' - deve ser uma string");
			}
		}
		if(role){
			if(typeof role !== "string"){
				throw new Error("'role' - deve ser uma string");
			}
		}
		if(email){
			if(typeof email !== "string"){
				throw new Error("'email' - deve ser uma string");
			}
		}
		if(password){
			if(typeof password !== "string"){
				throw new Error("'password' - deve ser uma string");
			}
		}
		if(typeof id !== "string"){
			throw new Error("'id' - deve ser uma string");
		}
		const DataBase = new UserDb();
		const UsuarioEditado: Users = await DataBase.getUsersById(id);
		if(!UsuarioEditado){
			throw new Error("'Usuario' -  não encontrado");
		}
		const usuarioEditadoAtualizado = new User(
			UsuarioEditado.id,
			name || UsuarioEditado.name,
			role || UsuarioEditado.role,
			cpf || UsuarioEditado.cpf,
			email || UsuarioEditado.email,
			password || UsuarioEditado.password,
			new Date().toISOString()
		);

		await DataBase.editUser(id, usuarioEditadoAtualizado);
	}

	public async deleteUser(id: string): Promise<void>{
		if(typeof id !== "string"){
			throw new Error("'id' - deve ser enviado no formato string");
		}
		const DataBase = new UserDb();		
		const userDel: Users = await DataBase.getUsersById(id);
		if(!userDel){
			throw new Error("'Usuario' - não encontrado");
		}
		await DataBase.deleteUser(userDel.id);
	}
}