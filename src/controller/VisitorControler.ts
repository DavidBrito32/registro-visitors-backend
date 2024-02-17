/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Request, Response } from "express";
import { Visitors } from "../types/types";
import { VisitorBusiness } from "../business/VisitorBusiness";

export class VisitorControler {
	public getAllVisitor = async (req: Request, res: Response): Promise<void> => {
		try {
			const name = req.query.name as string;
			const Visitante = new VisitorBusiness();
			const visitas = await Visitante.getAllVisitors(name);
			res.status(200).send(visitas);
		} catch (err) {
			if (res.statusCode === 200) {
				res.statusCode = 500;
			}
			if (err instanceof Error) {
				res.send(err.message);
			} else {
				res.send("erro inesperado");
			}
		}
	};

	public getVisitorByCpF = async (
		req: Request,
		res: Response
	): Promise<void> => {
		try {
			const CPF = req.body.cpf;
			const Visitor = new VisitorBusiness();
			const VISITANTE: Array<Visitors> | undefined = await Visitor.getVisitorByCpF(CPF);
			if(VISITANTE && VISITANTE[0]){
				await Visitor.checkVisit(VISITANTE[0].id);
			}
			res.status(200).send(VISITANTE && {
				name: VISITANTE[0].name				
			});
		} catch (err) {
			if (res.statusCode === 200) {
				res.statusCode = 500;
			}
			if (err instanceof Error) {
				res.send(err.message);
			} else {
				res.send("Erro Inesperado");
			}
		}
	};

	public createVisitor = async (req: Request, res: Response): Promise<void> => {
		try {
			const data: Visitors = req.body;
			const postUser = new VisitorBusiness();
			await postUser.createVisitors(data);
			res
				.status(201)
				.send(
					"Visitante Cadastrado com sucesso! Presença confirmada aproveite 🎆"
				);
		} catch (err) {
			if (res.statusCode === 200) {
				res.statusCode = 500;
			}

			if (err instanceof Error) {
				res.send(err.message);
			} else {
				res.send("Erro Inesperado");
			}
		}
	};

	public editVisitor = async (req: Request, res: Response): Promise<void> => {
		try {
			const Visitante = new VisitorBusiness();
			const data: Visitors = req.body;
			await Visitante.editVisitor(req.params.id, data);
			res.status(200).send("Visitante Editado com sucesso");
		} catch (err) {
			if (res.statusCode === 200) {
				res.statusCode = 500;
			}
			if (err instanceof Error) {
				res.send(err.message);
			} else {
				res.send("erro inesperado");
			}
		}
	};

	public deleteVisitor = async (req: Request, res: Response): Promise<void> => {
		try {
			const Visitante = new VisitorBusiness();
			await Visitante.deleteVisitor(req.params.id);
			res.status(200).send("Usuario excluido com sucesso");
		} catch (err) {
			if (res.statusCode === 200) {
				res.statusCode = 500;
			}
			if (err instanceof Error) {
				res.send(err.message);
			} else {
				res.send("erro inesperado");
			}
		}
	};
}
