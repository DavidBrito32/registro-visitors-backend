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
exports.VisitorControler = void 0;
const CustomError_1 = require("../errors/CustomError");
const visitorDTO_1 = require("../dto/visitorDTO");
const zod_1 = require("zod");
class VisitorControler {
	constructor(visitorBusiness) {
		this.visitorBusiness = visitorBusiness;
		this.getAllVisitor = (req, res) => __awaiter(this, void 0, void 0, function* () {
			try {
				const name = visitorDTO_1.GetVisitorSchema.parse(req.query);
				const Visitante = this.visitorBusiness;
				const visitas = yield Visitante.getAllVisitors(name);
				res.status(200).send(visitas);
			}
			catch (error) {
				if (error instanceof zod_1.ZodError) {
					res.status(400).send(error.issues);
				}
				else if (error instanceof CustomError_1.CustomError) {
					res.status(error.statusCode).send(error.message);
				}
				else {
					res.status(500).send("Erro inesperado");
				}
			}
		});
		this.getVisitorByCpF = (req, res) => __awaiter(this, void 0, void 0, function* () {
			try {
				const CPF = req.body.cpf;
				const Visitor = this.visitorBusiness;
				const VISITANTE = yield Visitor.getVisitorByCpF(CPF);
				if (VISITANTE) {
					yield Visitor.checkVisit(VISITANTE.id);
				}
				res.status(200).send(VISITANTE && { name: VISITANTE.name, });
			}
			catch (err) {
				if (err instanceof zod_1.ZodError) {
					res.status(400).send(err.issues);
				}
				else if (err instanceof CustomError_1.CustomError) {
					res.status(err.statusCode).send(err.message);
				}
				else {
					res.status(500).send("erro inesperado");
				}
			}
		});
		this.createVisitor = (req, res) => __awaiter(this, void 0, void 0, function* () {
			try {
				const data = visitorDTO_1.CreateVisitorSchema.parse(req.body);
				const postUser = this.visitorBusiness;
				const output = yield postUser.createVisitors(data);
				res.status(201).send(output);
			}
			catch (err) {
				if (err instanceof zod_1.ZodError) {
					res.status(400).send(err.issues);
				}
				else if (err instanceof CustomError_1.CustomError) {
					res.status(err.statusCode).send(err.message);
				}
				else {
					res.status(500).send("erro inesperado");
				}
			}
		});
		this.editVisitor = (req, res) => __awaiter(this, void 0, void 0, function* () {
			try {
				const Visitante = this.visitorBusiness;
				const id = req.params.id;
				const input = visitorDTO_1.EditVisitorSchema.parse(req.body);
				yield Visitante.editVisitor(id, input);
				res.status(200).send("Visitante Editado com sucesso");
			}
			catch (err) {
				if (err instanceof zod_1.ZodError) {
					res.status(400).send(err.issues);
				}
				else if (err instanceof CustomError_1.CustomError) {
					res.status(err.statusCode).send(err.message);
				}
				else {
					res.status(500).send("erro inesperado");
				}
			}
		});
		this.deleteVisitor = (req, res) => __awaiter(this, void 0, void 0, function* () {
			try {
				const Visitante = this.visitorBusiness;
				yield Visitante.deleteVisitor(req.params.id);
				res.status(200).send("Usuario excluido com sucesso");
			}
			catch (err) {
				if (err instanceof zod_1.ZodError) {
					res.status(400).send(err.issues);
				}
				else if (err instanceof CustomError_1.CustomError) {
					res.status(err.statusCode).send(err.message);
				}
				else {
					res.status(500).send("erro inesperado");
				}
			}
		});
		this.blockVisitor = (req, res) => __awaiter(this, void 0, void 0, function* () {
			try {
				const idBlock = req.params.id;
				const message = req.body.message;
				const Visitante = this.visitorBusiness;
				yield Visitante.blockVisitor(idBlock, message);
				res.status(201).send("visitante bloqueado com sucesso!");
			}
			catch (err) {
				if (err instanceof zod_1.ZodError) {
					res.status(400).send(err.issues);
				}
				else if (err instanceof CustomError_1.CustomError) {
					res.status(err.statusCode).send(err.message);
				}
				else {
					res.status(500).send("erro inesperado");
				}
			}
		});
		this.unlokVisitor = (req, res) => __awaiter(this, void 0, void 0, function* () {
			try {
				const id = req.params.id;
				const Visitor = this.visitorBusiness;
				yield Visitor.unlockVisitor(id);
				res.status(200).send("Visitante Desbloqueado com sucesso");
			}
			catch (err) {
				if (err instanceof zod_1.ZodError) {
					res.status(400).send(err.issues);
				}
				else if (err instanceof CustomError_1.CustomError) {
					res.status(err.statusCode).send(err.message);
				}
				else {
					res.status(500).send("erro inesperado");
				}
			}
		});
		this.getallBlockedVisitor = (req, res) => __awaiter(this, void 0, void 0, function* () {
			try {
				const block = this.visitorBusiness;
				const bloqueados = yield block.getallBlockedVisitor();
				res.status(200).send(bloqueados);
			}
			catch (err) {
				if (err instanceof zod_1.ZodError) {
					res.status(400).send(err.issues);
				}
				else if (err instanceof CustomError_1.CustomError) {
					res.status(err.statusCode).send(err.message);
				}
				else {
					res.status(500).send("erro inesperado");
				}
			}
		});
		this.unlockVisitor = (req, res) => __awaiter(this, void 0, void 0, function* () {
			try {
				const ID = req.params.id;
				const visitor = this.visitorBusiness;
				yield visitor.unlockVisitor(ID);
				res.status(200).send("Acesso Liberado ao Museu");
			}
			catch (err) {
				if (err instanceof zod_1.ZodError) {
					res.status(400).send(err.issues);
				}
				else if (err instanceof CustomError_1.CustomError) {
					res.status(err.statusCode).send(err.message);
				}
				else {
					res.status(500).send("erro inesperado");
				}
			}
		});
		this.getResults = (req, res) => __awaiter(this, void 0, void 0, function* () {
			try {
				const resultados = yield this.visitorBusiness.results();
				res.status(200).send(resultados);
			}
			catch (err) {
				if (err instanceof zod_1.ZodError) {
					res.status(400).send(err.issues);
				}
				else if (err instanceof CustomError_1.CustomError) {
					res.status(err.statusCode).send(err.message);
				}
				else {
					res.status(500).send("erro inesperado");
				}
			}
		});
	}
}
exports.VisitorControler = VisitorControler;
