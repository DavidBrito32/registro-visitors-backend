import z from "zod";
import { Visitor } from "../models/Visitor";

//GEL ALL VISITORS

export interface GetVisitorInput {
	name?: string;
}

export interface GetVisitorOutput {
	visitantes: Array<Visitor>
}

export const GetVisitorSchema = z.object({
	name: z.string({
		invalid_type_error: "'name' - deve ser enviado no formato string"
	}).min(2).optional()
}).transform(data => data as GetVisitorInput);



// CREATE VISITOR
export interface CreateVisitorInputDTO {
    name: string; 
	cpf: string; 
	gender: string; 
	age: number; 
	profession: string; 
	city: string; 
	state: string;
}
export interface CreateVisitorOutPutDTO {
	message: string;
	visitante: Visitor
}
export const CreateVisitorSchema = z.object({
	name: z.string({
		required_error: "'name' é um campo obrigatorio",
		invalid_type_error: "'name': deve ser do tipo string"
	}).min(1), 
	cpf: z.string({
		required_error: "'cpf' é um campo obrigatorio",
		invalid_type_error: "'cpf': deve ser do tipo string",
	}).min(14), 
	gender: z.string(
		{
			required_error: "'cpf' é um campo obrigatorio",
			invalid_type_error: "'cpf': deve ser do tipo string",
		}
	).min(1), 
	age: z.number(
		{
			required_error: "'age' é um campo obrigatorio",
			invalid_type_error: "'age': deve ser do tipo number",
		}
	).min(1), 
	profession: z.string({
		required_error: "'profession' é um campo obrigatorio",
		invalid_type_error: "'profession': deve ser do tipo string",
	}).min(1), 
	city: z.string({
		required_error: "'city' é um campo obrigatorio",
		invalid_type_error: "'city': deve ser do tipo string",
	}).min(1), 
	state: z.string({
		required_error: "'state' é um campo obrigatorio",
		invalid_type_error: "'state': deve ser do tipo string",
	}).min(1) 
}).transform(data => data as CreateVisitorInputDTO);

//#####################################################

//EDIT VISITOR
export interface EditVisitoriInputDTO {
	id: string;
	name?: string; 
	cpf?: string; 
	gender?: string; 
	age?: number; 
	profession?: string; 
	city?: string; 
	state?: string;
}

export interface EditVisitorOutPutDTO {
	message: string;
	visitante: Visitor
}

export const EditVisitorSchema = z.object({
	id: z.string({
		required_error: "'id' - é Obrigatorio",
		invalid_type_error: "'id' - deve ser obrigatoriamente uma string"
	}).min(1),
	name: z.string({invalid_type_error: "'name': deve ser do tipo string"}).min(1).optional(), 	
	cpf: z.string({invalid_type_error: "'cpf': deve ser do tipo string",}).min(14), 
	gender: z.string({invalid_type_error: "'cpf': deve ser do tipo string",}).min(1).optional(), 
	age: z.number({invalid_type_error: "'age': deve ser do tipo number",}).min(1).optional(), 
	profession: z.string({invalid_type_error: "'profession': deve ser do tipo string",}).min(1).optional(), 
	city: z.string({invalid_type_error: "'city': deve ser do tipo string",}).min(1).optional(), 
	state: z.string({invalid_type_error: "'state': deve ser do tipo string",}).min(1).optional() 
}).transform(data => data as EditVisitoriInputDTO);
//#####################################################