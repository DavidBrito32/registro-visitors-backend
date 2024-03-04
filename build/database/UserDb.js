"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
	function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
	return new (P || (P = Promise))(function (resolve, reject) {
		function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
		function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
		function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
		step((generator = generator.apply(thisArg, _arguments || [])).next());
	});
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserDb = void 0;
const knex_1 = require("./knex");
class UserDb extends knex_1.Database {
	constructor() {
		super(...arguments);
		this.getUsers = () => __awaiter(this, void 0, void 0, function* () {
			const users = yield knex_1.Database.connection("user");
			return users;
		});
		this.getUserByEmail = (email) => __awaiter(this, void 0, void 0, function* () {
			const [user] = yield knex_1.Database.connection
				.select("*")
				.from("user")
				.where({ email: email });
			return user;
		});
		this.getUsersById = (id) => __awaiter(this, void 0, void 0, function* () {
			const [user] = yield knex_1.Database.connection.select("*").from("user").where({ id: id });
			return user;
		});
		this.createUser = (id, name, role, cpf, email, password, createdAt) => __awaiter(this, void 0, void 0, function* () {
			yield knex_1.Database.connection
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
		});
		this.getByCpf = (cpf) => __awaiter(this, void 0, void 0, function* () {
			const [usuario] = yield knex_1.Database.connection("user").where({ cpf: cpf });
			return usuario;
		});
		this.editUser = (id, data) => __awaiter(this, void 0, void 0, function* () {
			const { name, role, cpf, email, password } = data;
			yield knex_1.Database.connection
				.update({
					name,
					role,
					cpf,
					email,
					password
				})
				.from("user")
				.where({ id: id });
		});
		this.deleteUser = (id) => __awaiter(this, void 0, void 0, function* () {
			yield knex_1.Database.connection.delete().from("user").where({ id: id });
		});
		this.login = (email, password) => __awaiter(this, void 0, void 0, function* () {
			const [Usuario] = yield knex_1.Database.connection.select("email", "name", "role", "cpf").from("user").where({ email: email, password: password });
			return Usuario;
		});
	}
}
exports.UserDb = UserDb;
