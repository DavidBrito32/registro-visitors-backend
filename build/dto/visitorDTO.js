"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
	return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditVisitorSchema = exports.CreateVisitorSchema = exports.GetVisitorSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.GetVisitorSchema = zod_1.default.object({
	name: zod_1.default.string({
		invalid_type_error: "'name' - deve ser enviado no formato string"
	}).min(2).optional()
}).transform(data => data);
exports.CreateVisitorSchema = zod_1.default.object({
	name: zod_1.default.string({
		required_error: "'name' é um campo obrigatorio",
		invalid_type_error: "'name': deve ser do tipo string"
	}).min(1),
	cpf: zod_1.default.string({
		required_error: "'cpf' é um campo obrigatorio",
		invalid_type_error: "'cpf': deve ser do tipo string",
	}).min(14),
	gender: zod_1.default.string({
		required_error: "'cpf' é um campo obrigatorio",
		invalid_type_error: "'cpf': deve ser do tipo string",
	}).min(1),
	age: zod_1.default.string({
		required_error: "'age' é um campo obrigatorio",
		invalid_type_error: "'age': deve ser do tipo STRING",
	}).min(1),
	profession: zod_1.default.string({
		required_error: "'profession' é um campo obrigatorio",
		invalid_type_error: "'profession': deve ser do tipo string",
	}).min(1),
	city: zod_1.default.string({
		required_error: "'city' é um campo obrigatorio",
		invalid_type_error: "'city': deve ser do tipo string",
	}).min(1),
	state: zod_1.default.string({
		required_error: "'state' é um campo obrigatorio",
		invalid_type_error: "'state': deve ser do tipo string",
	}).min(1)
}).transform(data => data);
exports.EditVisitorSchema = zod_1.default.object({
	id: zod_1.default.string({
		required_error: "'id' - é Obrigatorio",
		invalid_type_error: "'id' - deve ser obrigatoriamente uma string"
	}).min(1),
	name: zod_1.default.string({ invalid_type_error: "'name': deve ser do tipo string" }).min(1).optional(),
	cpf: zod_1.default.string({ invalid_type_error: "'cpf': deve ser do tipo string", }).min(14),
	gender: zod_1.default.string({ invalid_type_error: "'cpf': deve ser do tipo string", }).min(1).optional(),
	age: zod_1.default.string({ invalid_type_error: "'age': deve ser do tipo string", }).min(1).optional(),
	profession: zod_1.default.string({ invalid_type_error: "'profession': deve ser do tipo string", }).min(1).optional(),
	city: zod_1.default.string({ invalid_type_error: "'city': deve ser do tipo string", }).min(1).optional(),
	state: zod_1.default.string({ invalid_type_error: "'state': deve ser do tipo string", }).min(1).optional()
}).transform(data => data);
//#####################################################
