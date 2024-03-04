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
exports.checkToken = void 0;
const BadRequest_1 = require("../../errors/BadRequest");
const CustomError_1 = require("../../errors/CustomError");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const checkToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
	var _a, _b;
	try {
		const Authorization = (_b = (_a = req.headers) === null || _a === void 0 ? void 0 : _a.authorization) === null || _b === void 0 ? void 0 : _b.split(" ")[1];
		if (!Authorization) {
			throw new BadRequest_1.BadRequest("'Você não tem permissão para acessar esta rota'");
		}
		const SECRET = process.env.SECRET;
		if (!SECRET) {
			throw new BadRequest_1.BadRequest("'Falha ao decodificar token'");
		}
		const decoded = jsonwebtoken_1.default.verify(Authorization, SECRET);
		if (!decoded) {
			throw new BadRequest_1.BadRequest("'Unauthorized' - Falha na autenticação");
		}
		next();
	}
	catch (err) {
		if (err instanceof jsonwebtoken_1.default.JsonWebTokenError && err.message === "invalid signature") {
			res.status(400).send("Token Inválido");
		}
		if (err instanceof CustomError_1.CustomError) {
			res.status(err.statusCode).send(err.message);
		}
		else {
			res.status(500).send("erro inesperado");
		}
	}
});
exports.checkToken = checkToken;
