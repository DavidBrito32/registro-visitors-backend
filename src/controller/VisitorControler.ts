import { Request, Response } from "express";
import { Visitors } from "../types/types";
import { VisitorBusiness } from "../business/VisitorBusiness";

export class VisitorControler {
	public async getAllVisitor(req: Request, res: Response) {
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
	}

	public async createVisitor(req: Request, res: Response) {
		try {
			const data: Visitors = req.body;
			const postUser = new VisitorBusiness();
			await postUser.createVisitors(data);
			res.status(201).send("Visitante Cadastrado com sucesso! Presença confirmada aproveite 🎆");
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
	}

	public async editVisitor(req: Request, res: Response) {
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
	}

	public async deleteVisitor(req: Request, res: Response) {
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
	}
}
