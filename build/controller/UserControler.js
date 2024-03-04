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
exports.UserControler = void 0;
const CustomError_1 = require("../errors/CustomError");
class UserControler {
	constructor(userBusiness) {
		this.userBusiness = userBusiness;
		this.getAllUsers = (req, res) => __awaiter(this, void 0, void 0, function* () {
			try {
				const user = this.userBusiness;
				const userReturn = yield user.getAllUsers();
				res.status(200).send(userReturn);
			}
			catch (err) {
				if (err instanceof CustomError_1.CustomError) {
					res.status(err.statusCode).send(err.message);
				}
				else {
					res.status(500).send("erro inesperado");
				}
			}
		});
		this.createUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
			try {
				const usuario = this.userBusiness;
				yield usuario.createUser(req.body);
				res.status(200).send("Usuario Criado com sucesso! 🎆");
			}
			catch (err) {
				if (err instanceof CustomError_1.CustomError) {
					res.status(err.statusCode).send(err.message);
				}
				else {
					res.status(500).send("erro inesperado");
				}
			}
		});
		this.editUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
			try {
				const ID = req.params.id;
				const Data = req.body;
				const editar = this.userBusiness;
				yield editar.editUser(ID, Data);
				res.status(200).send("Usuario Editado com sucesso! 🎆");
			}
			catch (err) {
				if (err instanceof CustomError_1.CustomError) {
					res.status(err.statusCode).send(err.message);
				}
				else {
					res.status(500).send("erro inesperado");
				}
			}
		});
		this.deleteUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
			try {
				const ID = req.params.id;
				const DEL = this.userBusiness;
				yield DEL.deleteUser(ID);
				res.status(200).send("Usuario Deletado com sucesso! 🎆");
			}
			catch (err) {
				if (err instanceof CustomError_1.CustomError) {
					res.status(err.statusCode).send(err.message);
				}
				else {
					res.status(500).send("erro inesperado");
				}
			}
		});
		this.login = (req, res) => __awaiter(this, void 0, void 0, function* () {
			try {
				const input = req.body;
				const USER = this.userBusiness;
				const usuario = yield USER.login(input);
				res.send(usuario);
			}
			catch (err) {
				if (err instanceof CustomError_1.CustomError) {
					res.status(err.statusCode).send(err.message);
				}
				else {
					res.status(500).send("erro inesperado");
				}
			}
		});
	}
}
exports.UserControler = UserControler;
