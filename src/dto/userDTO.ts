import { z } from "zod";
import { UserDB } from "../types/types";

export interface LoginInputDto {
    email: string;
    password: string;
}

export interface LoginOutputDto {
    message: string;
    usuario: UserDB;
    token: string;
    route: string;
}

export const LoginSchema = z.object({
	email: z.string({
		required_error: "'email' - é um campo obrigatorio",
		invalid_type_error: "'email' - deve ser uma string"
	}).min(2),
	password: z.string({
		required_error: "'password' - é um campo obrigatorio",
		invalid_type_error: "'password' - deve ser uma string"
	}).min(2) 
}).transform(data => data as LoginInputDto);

