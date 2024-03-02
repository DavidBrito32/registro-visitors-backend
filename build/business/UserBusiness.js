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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserBusiness = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const User_1 = require("../models/User");
const IdGenerator_1 = require("../services/uuid/IdGenerator");
const ValidationError_1 = require("../errors/ValidationError");
const BadRequest_1 = require("../errors/BadRequest");
class UserBusiness {
    constructor(userDb) {
        this.userDb = userDb;
    }
    getAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            const user = this.userDb;
            const userList = yield user.getUsers();
            const userReturn = userList.map((item) => new User_1.User(item.id, item.name, item.role, item.cpf, item.email, item.password, item.created_at));
            const output = {
                usuarios: userReturn
            };
            return output;
        });
    }
    createUser(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, cpf, role, email, password } = input;
            if (!name) {
                throw new ValidationError_1.ValidationError("'name' - Não pode ser omitido");
            }
            if (!cpf) {
                throw new ValidationError_1.ValidationError("'cpf' - Não pode ser omitido");
            }
            if (!role) {
                throw new ValidationError_1.ValidationError("'role' - Não pode ser omitido");
            }
            if (!email) {
                throw new ValidationError_1.ValidationError("'email' - Não pode ser omitido");
            }
            if (!password) {
                throw new ValidationError_1.ValidationError("'password' - Não pode ser omitido");
            }
            if (typeof name !== "string") {
                throw new ValidationError_1.ValidationError("'name' - deve ser enviado no formato string");
            }
            if (typeof cpf !== "string") {
                throw new ValidationError_1.ValidationError("'cpf' - deve ser enviado no formato string");
            }
            if (typeof role !== "string") {
                throw new ValidationError_1.ValidationError("'role' - deve ser enviado no formato string");
            }
            if (typeof email !== "string") {
                throw new ValidationError_1.ValidationError("'email' - deve ser enviado no formato string");
            }
            if (typeof password !== "string") {
                throw new ValidationError_1.ValidationError("'password' - deve ser enviado no formato string");
            }
            const idGenerator = new IdGenerator_1.IdGenerator();
            const ID = idGenerator.generate();
            const salt = yield bcrypt_1.default.genSalt(12);
            const criptoPassword = yield bcrypt_1.default.hash(password, salt);
            const newUser = new User_1.User(ID, name, role, cpf, email, criptoPassword, new Date().toISOString());
            const Database = this.userDb;
            const existe = yield Database.getByCpf(cpf);
            if (existe) {
                throw new BadRequest_1.BadRequest("'CPF' - ja cadastrado");
            }
            yield Database.createUser(newUser.getId(), newUser.getName(), newUser.getRole(), newUser.getCpf(), newUser.getEmail(), newUser.getPassword(), newUser.getCreatedAt());
        });
    }
    editUser(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, cpf, role, email, password } = data;
            if (name) {
                if (typeof name !== "string") {
                    throw new ValidationError_1.ValidationError("'name' - deve ser uma string");
                }
            }
            if (cpf) {
                if (typeof cpf !== "string") {
                    throw new ValidationError_1.ValidationError("'cpf' - deve ser uma string");
                }
            }
            if (role) {
                if (typeof role !== "string") {
                    throw new ValidationError_1.ValidationError("'role' - deve ser uma string");
                }
            }
            if (email) {
                if (typeof email !== "string") {
                    throw new ValidationError_1.ValidationError("'email' - deve ser uma string");
                }
            }
            if (password) {
                if (typeof password !== "string") {
                    throw new ValidationError_1.ValidationError("'password' - deve ser uma string");
                }
            }
            if (typeof id !== "string") {
                throw new ValidationError_1.ValidationError("'id' - deve ser uma string");
            }
            const DataBase = this.userDb;
            const UsuarioEditado = yield DataBase.getUsersById(id);
            const newPassword = yield bcrypt_1.default.hash(password, 12);
            if (!UsuarioEditado) {
                throw new ValidationError_1.ValidationError("'Usuario' -  não encontrado");
            }
            const dataEdit = {
                id: UsuarioEditado.id,
                name: name || UsuarioEditado.name,
                cpf: cpf || UsuarioEditado.cpf,
                role: role || UsuarioEditado.role,
                email: email || UsuarioEditado.email,
                password: newPassword || UsuarioEditado.password,
                created_at: UsuarioEditado.created_at
            };
            yield DataBase.editUser(id, dataEdit);
        });
    }
    deleteUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (typeof id !== "string") {
                throw new ValidationError_1.ValidationError("'id' - deve ser enviado no formato string");
            }
            const DataBase = this.userDb;
            const userDel = yield DataBase.getUsersById(id);
            if (!userDel) {
                throw new ValidationError_1.ValidationError("'Usuario' - não encontrado");
            }
            yield DataBase.deleteUser(userDel.id);
        });
    }
    login(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = input;
            const userDB = this.userDb;
            const exists = yield userDB.getUserByEmail(email);
            if (!exists) {
                throw new BadRequest_1.BadRequest("usuario não encontrado");
            }
            const verifyPassword = yield bcrypt_1.default.compare(password, exists.password);
            if (!verifyPassword) {
                throw new BadRequest_1.BadRequest("Verifique os dados informados e tente novamente");
            }
            const usuario = yield userDB.login(email, exists.password);
            if (!usuario) {
                throw new BadRequest_1.BadRequest("'email' - ou 'senha' incorretos");
            }
            const secret = process.env.SECRET;
            let token;
            if (secret) {
                token = jsonwebtoken_1.default.sign({ id: usuario.id }, secret);
            }
            else {
                throw new BadRequest_1.BadRequest("não foi possivel gerar um token");
            }
            const output = {
                message: "usuario logado com sucesso!",
                usuario,
                token
            };
            return output;
        });
    }
}
exports.UserBusiness = UserBusiness;
