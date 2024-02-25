import { Request, Response } from "express";
import {  VisitorDB } from "../types/types";
import { VisitorBusiness } from "../business/VisitorBusiness";
import {  CustomError } from "../errors/CustomError";

export class VisitorControler {
	public getAllVisitor = async (req: Request, res: Response): Promise<void> => {
		try {
			const name = req.query.name as string;
			const Visitante = new VisitorBusiness();
			const visitas = await Visitante.getAllVisitors(name);
			res.status(200).send(visitas);
		}catch (err) {
			if (err instanceof CustomError) {
				res.status(err.statusCode).send(err.message);
			} else {
				res.status(500).send("erro inesperado");
			}
		}
	};

	public getVisitorByCpF = async (req: Request,	res: Response): Promise<void> => {
		try {
			const CPF = req.body.cpf;
			const Visitor = new VisitorBusiness();
			const VISITANTE: VisitorDB | undefined = await Visitor.getVisitorByCpF(CPF);
			if (VISITANTE) {
				await Visitor.checkVisit(VISITANTE.id);
			}
			res.status(200).send(VISITANTE && {name: VISITANTE.name,}
			);
		} catch (err) {
			if (err instanceof CustomError) {
				res.status(err.statusCode).send(err.message);
			} else {
				res.status(500).send("erro inesperado");
			}
		}
	};

	public createVisitor = async (req: Request, res: Response): Promise<void> => {
		try {
			const data: VisitorDB = req.body;
			const postUser = new VisitorBusiness();
			await postUser.createVisitors(data);
			res
				.status(201)
				.send(
					"Visitante Cadastrado com sucesso! Presença confirmada aproveite 🎆"
				);
		} catch (err) {
			if (err instanceof CustomError) {
				res.status(err.statusCode).send(err.message);
			} else {
				res.status(500).send("erro inesperado");
			}
		}
	};

	public editVisitor = async (req: Request, res: Response): Promise<void> => {
		try {
			const Visitante = new VisitorBusiness();
			const data = req.body;
			await Visitante.editVisitor(req.params.id, data);
			res.status(200).send("Visitante Editado com sucesso");
		} catch (err) {
			if (err instanceof CustomError) {
				res.status(err.statusCode).send(err.message);
			} else {
				res.status(500).send("erro inesperado");
			}
		}
	};

	public deleteVisitor = async (req: Request, res: Response): Promise<void> => {
		try {
			const Visitante = new VisitorBusiness();
			await Visitante.deleteVisitor(req.params.id);
			res.status(200).send("Usuario excluido com sucesso");
		} catch (err) {
			if (err instanceof CustomError) {
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
			const Visitante = new VisitorBusiness();
			await Visitante.blockVisitor(idBlock, message);
			res.status(201).send("visitante bloqueado com sucesso!");
		} catch (err) {
			if (err instanceof CustomError) {
				res.status(err.statusCode).send(err.message);
			} else {
				res.status(500).send("erro inesperado");
			}
		}
	};

	public unlokVisitor = async (req: Request, res: Response): Promise<void> => {
		try {
			const id = req.params.id;
			const Visitor = new VisitorBusiness();

			await Visitor.unlockVisitor(id);
			res.status(200).send("Visitante Desbloqueado com sucesso");
		} catch (err) {
			if (err instanceof CustomError) {
				res.status(err.statusCode).send(err.message);
			} else {
				res.status(500).send("erro inesperado");
			}
		}
	};

	public getallBlockedVisitor = async (req: Request, res: Response): Promise<void> => {
		try{
			const block = new VisitorBusiness();
			const bloqueados =  await block.getallBlockedVisitor();
			res.status(200).send(bloqueados);
		}catch (err) {
			if (err instanceof CustomError) {
				res.status(err.statusCode).send(err.message);
			} else {
				res.status(500).send("erro inesperado");
				console.log(err);
			}
		}
	};

	public unlockVisitor = async (req: Request, res: Response): Promise<void> => {
		try{
			const ID = req.params.id;
			const visitor = new VisitorBusiness();
			await visitor.unlockVisitor(ID);
			res.status(200).send("Acesso Liberado ao Museu");
		}catch (err) {
			if (err instanceof CustomError) {
				res.status(err.statusCode).send(err.message);
			} else {
				res.status(500).send("erro inesperado");
				console.log(err);
			}
		}
	};
}
