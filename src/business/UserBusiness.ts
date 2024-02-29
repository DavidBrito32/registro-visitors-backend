import { UserDb } from "../database/UserDb";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { User } from "../models/User";
import { IdGenerator } from "../services/uuid/IdGenerator";
import { LoginDB, UserDB } from "../types/types";
import { ValidationError } from "../errors/ValidationError";
import { BadRequest } from "../errors/BadRequest";
import { GetUserOutPutDTO } from "../dto/userDTO";

export class UserBusiness {
	constructor(
		protected userDb: UserDb
	){
	}
	public async getAllUsers(): Promise<GetUserOutPutDTO> { 
		const user = this.userDb;
		const userList: Array<UserDB> = await user.getUsers();
		const userReturn = userList.map((item) => new User(
			item.id,
			item.name,
			item.role,
			item.cpf,
			item.email,
			item.password,
			item.created_at
		)
		);
		const output: GetUserOutPutDTO = {
			usuarios: userReturn
		};

		return output;
	}

	public async createUser(input: UserDB): Promise<void> {
		const { name, cpf, role, email, password }: UserDB = input;
		if (!name) {
			throw new ValidationError("'name' - Não pode ser omitido");
		}
		if (!cpf) {
			throw new ValidationError("'cpf' - Não pode ser omitido");
		}
		if (!role) {
			throw new ValidationError("'role' - Não pode ser omitido");
		}
		if (!email) {
			throw new ValidationError("'email' - Não pode ser omitido");
		}
		if (!password) {
			throw new ValidationError("'password' - Não pode ser omitido");
		}
		if (typeof name !== "string") {
			throw new ValidationError("'name' - deve ser enviado no formato string");
		}
		if (typeof cpf !== "string") {
			throw new ValidationError("'cpf' - deve ser enviado no formato string");
		}
		if (typeof role !== "string") {
			throw new ValidationError("'role' - deve ser enviado no formato string");
		}
		if (typeof email !== "string") {
			throw new ValidationError("'email' - deve ser enviado no formato string");
		}
		if (typeof password !== "string") {
			throw new ValidationError("'password' - deve ser enviado no formato string");
		}

		const idGenerator = new IdGenerator();
		const ID = idGenerator.generate();
		const salt = await bcrypt.genSalt(12);

		const criptoPassword = await bcrypt.hash(password, salt);

		const newUser = new User(
			ID,
			name,
			role,
			cpf,
			email,
			criptoPassword,
			new Date().toISOString()
		);

		const Database = this.userDb;
		const existe: UserDB | undefined = await Database.getByCpf(cpf);

		if (existe) {
			throw new BadRequest("'CPF' - ja cadastrado");
		}
		await Database.createUser(
			newUser.getId(),
			newUser.getName(),
			newUser.getRole(),
			newUser.getCpf(),
			newUser.getEmail(),
			newUser.getPassword(),
			newUser.getCreatedAt()
		);
	}

	public async editUser(id: string, data: UserDB): Promise<void> {
		const { name, cpf, role, email, password }: UserDB = data;
		if (name) {
			if (typeof name !== "string") {
				throw new ValidationError("'name' - deve ser uma string");
			}
		}
		if (cpf) {
			if (typeof cpf !== "string") {
				throw new ValidationError("'cpf' - deve ser uma string");
			}
		}
		if (role) {
			if (typeof role !== "string") {
				throw new ValidationError("'role' - deve ser uma string");
			}
		}
		if (email) {
			if (typeof email !== "string") {
				throw new ValidationError("'email' - deve ser uma string");
			}
		}
		if (password) {
			if (typeof password !== "string") {
				throw new ValidationError("'password' - deve ser uma string");
			}
		}
		if (typeof id !== "string") {
			throw new ValidationError("'id' - deve ser uma string");
		}
		const DataBase = this.userDb;
		const UsuarioEditado: UserDB | undefined = await DataBase.getUsersById(id);
		
		const newPassword = await bcrypt.hash(password, 12);
		if (!UsuarioEditado) {
			throw new ValidationError("'Usuario' -  não encontrado");
		}

		const dataEdit: UserDB = {
			id: UsuarioEditado.id,
			name: name || UsuarioEditado.name,
			cpf: cpf || UsuarioEditado.cpf,
			role: role || UsuarioEditado.role,
			email: email || UsuarioEditado.email,
			password: newPassword || UsuarioEditado.password,
			created_at: UsuarioEditado.created_at
		};

		await DataBase.editUser(id, dataEdit);
	}

	public async deleteUser(id: string): Promise<void> {
		if (typeof id !== "string") {
			throw new ValidationError("'id' - deve ser enviado no formato string");
		}
		const DataBase = this.userDb;
		const userDel: UserDB | undefined = await DataBase.getUsersById(id);
		if (!userDel) {
			throw new ValidationError("'Usuario' - não encontrado");
		}
		await DataBase.deleteUser(userDel.id);
	}

	public async login(input: UserDB): Promise<LoginDB> {
		const { email, password } = input;
		const userDB = this.userDb;
		const exists: UserDB | undefined = await userDB.getUserByEmail(email);
		if (!exists) {
			throw new BadRequest("usuario não encontrado");
		}

		const verifyPassword = await bcrypt.compare(password, exists.password);
		if (!verifyPassword) {
			throw new BadRequest("Verifique os dados informados e tente novamente");
		}

		const usuario: UserDB | undefined = await userDB.login(
			email,
			exists.password
		);
		if (!usuario) {
			throw new BadRequest("'email' - ou 'senha' incorretos");
		}

		const secret: string | undefined = process.env.SECRET;
		let token;

		if (secret) {
			token = jwt.sign({ id: usuario.id }, secret);
		} else {
			throw new BadRequest("não foi possivel gerar um token");
		}

		const output: LoginDB = {
			message: "usuario logado com sucesso!",
			usuario,
			token
		};
		return output;
	}
}
