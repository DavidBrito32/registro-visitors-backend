import { Request, Response } from "express";
import {  VisitorDB } from "../types/types";
import { VisitorBusiness } from "../business/VisitorBusiness";
import {  CustomError } from "../errors/CustomError";
import { CreateVisitorInputDTO, CreateVisitorSchema, EditVisitorSchema, GetVisitorInput, GetVisitorSchema } from "../dto/visitorDTO";
import { ZodError } from "zod";

export class VisitorControler {
	constructor(
		protected visitorBusiness: VisitorBusiness
	){}
	public getAllVisitor = async (req: Request, res: Response): Promise<void> => {
		try {
			const name: GetVisitorInput = GetVisitorSchema.parse(req.query);
			const Visitante = this.visitorBusiness;
			const visitas = await Visitante.getAllVisitors(name);
			res.status(200).send(visitas);
		}catch (error) {	
			if (error instanceof ZodError) {
				res.status(400).send(error.issues);
			} else if (error instanceof CustomError) {
				res.status(error.statusCode).send(error.message);
			} else {
				res.status(500).send("Erro inesperado");
			}
		}
	};

	public getVisitorByCpF = async (req: Request,	res: Response): Promise<void> => {
		try {
			const CPF = req.body.cpf;
			const Visitor = this.visitorBusiness;
			const VISITANTE: VisitorDB | undefined = await Visitor.getVisitorByCpF(CPF);
			if (VISITANTE) {
				await Visitor.checkVisit(VISITANTE.id);
			}
			res.status(200).send(VISITANTE && {name: VISITANTE.name,}
			);
		} catch (err) {
			if(err instanceof ZodError){
				res.status(400).send(err.issues);				
			}else if (err instanceof CustomError) {
				res.status(err.statusCode).send(err.message);
			} else {
				res.status(500).send("erro inesperado");
			}
		}
	};

	public createVisitor = async (req: Request, res: Response): Promise<void> => {
		try {
			const data: CreateVisitorInputDTO = CreateVisitorSchema.parse(req.body);
			const postUser = this.visitorBusiness;
			const output = await postUser.createVisitors(data);
			res.status(201).send(output);
		} catch (err) {
			if(err instanceof ZodError){
				res.status(400).send(err.issues);		
			}else if (err instanceof CustomError) {
				res.status(err.statusCode).send(err.message);
			} else {
				res.status(500).send("erro inesperado");
			}
		}
	};

	public editVisitor = async (req: Request, res: Response): Promise<void> => {
		try {
			const Visitante = this.visitorBusiness;
			const id = req.params.id;
			const input = EditVisitorSchema.parse(req.body);
			await Visitante.editVisitor(id, input);
			res.status(200).send("Visitante Editado com sucesso");
		} catch (err) {
			if(err instanceof ZodError){
				res.status(400).send(err.issues);		
			}else if (err instanceof CustomError) {
				res.status(err.statusCode).send(err.message);
			} else {
				res.status(500).send("erro inesperado");
			}
		}
	};

	public deleteVisitor = async (req: Request, res: Response): Promise<void> => {
		try {
			const Visitante = this.visitorBusiness;
			await Visitante.deleteVisitor(req.params.id);
			res.status(200).send("Usuario excluido com sucesso");
		} catch (err) {
			if(err instanceof ZodError){
				res.status(400).send(err.issues);				
			}else if (err instanceof CustomError) {
				res.status(err.statusCode).send(err.message);
			} else {
				res.status(500).send("erro inesperado");
			}
		}
	};

	public blockVisitor = async (req: Request, res: Response): Promise<void> => {
		try {
			const idBlock = req.params.id;
			const message = req.body.message;
			const Visitante = this.visitorBusiness;
			await Visitante.blockVisitor(idBlock, message);
			res.status(201).send("visitante bloqueado com sucesso!");
		} catch (err) {
			if(err instanceof ZodError){
				res.status(400).send(err.issues);				
			}else if (err instanceof CustomError) {
				res.status(err.statusCode).send(err.message);
			} else {
				res.status(500).send("erro inesperado");
			}
		}
	};

	public unlokVisitor = async (req: Request, res: Response): Promise<void> => {
		try {
			const id = req.params.id;
			const Visitor = this.visitorBusiness;

			await Visitor.unlockVisitor(id);
			res.status(200).send("Visitante Desbloqueado com sucesso");
		} catch (err) {
			if(err instanceof ZodError){
				res.status(400).send(err.issues);				
			}else if (err instanceof CustomError) {
				res.status(err.statusCode).send(err.message);
			} else {
				res.status(500).send("erro inesperado");
			}
		}
	};

	public getallBlockedVisitor = async (req: Request, res: Response): Promise<void> => {
		try{
			const block = this.visitorBusiness;
			const bloqueados =  await block.getallBlockedVisitor();
			res.status(200).send(bloqueados);
		}catch (err) {
			if(err instanceof ZodError){
				res.status(400).send(err.issues);				
			}else if (err instanceof CustomError) {
				res.status(err.statusCode).send(err.message);
			} else {
				res.status(500).send("erro inesperado");
			}
		}
	};

	public unlockVisitor = async (req: Request, res: Response): Promise<void> => {
		try{
			const ID = req.params.id;
			const visitor = this.visitorBusiness;
			await visitor.unlockVisitor(ID);
			res.status(200).send("Acesso Liberado ao Museu");
		}catch (err) {
			if(err instanceof ZodError){
				res.status(400).send(err.issues);				
			}else if (err instanceof CustomError) {
				res.status(err.statusCode).send(err.message);
			} else {
				res.status(500).send("erro inesperado");
			}
		}
	};

	public getResults = async (req: Request, res: Response): Promise<void> => {
		try{
			const resultados = await this.visitorBusiness.results();
			res.status(200).send(resultados);
		}catch (err) {
			if(err instanceof ZodError){
				res.status(400).send(err.issues);				
			}else if (err instanceof CustomError) {
				res.status(err.statusCode).send(err.message);
			} else {
				res.status(500).send("erro inesperado");
			}
		}
	};
}
