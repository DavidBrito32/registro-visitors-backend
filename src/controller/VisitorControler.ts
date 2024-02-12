import { Request, Response } from "express";
import { Visitors } from "../types/types";
import { Visitor } from "../models/Visitor";
import { VisitorDb } from "../database/VisitorDb";

export class VisitorControler {
	public async getAllVisitor(req: Request, res: Response) {
		try {
			const name = req.query.name as string;
			const DB = new VisitorDb();
			let visitantes;
			let visitas;

			if (name) {
				visitantes = await DB.getByQueryParams(name);				
			} else {
				visitantes = await DB.getAllVisitors();
			}
			if(visitantes !== undefined){
				const visitanteTratado: Array<Visitors> = visitantes;
    
				const visit = visitanteTratado.map((item: Visitors) => new Visitor(
					item.id,
					item.name,
					item.cpf,
					item.gender,
					item.age,
					item.city,
					item.state,
					item.profession,
					item.created_at
				));

				visitas = visit;
			}
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
			const { id, name, cpf, gender, age, profession, city, state } = req.body;

			if (!id) {
				res.statusCode = 400;
				throw new Error(
					"'id' - é um campo obrigatorio, por tanto deverá ser informado"
				);
			}
			if (!name) {
				res.statusCode = 400;
				throw new Error(
					"'name' - é um campo obrigatorio, por tanto deverá ser informado"
				);
			}
			if (!cpf) {
				res.statusCode = 400;
				throw new Error(
					"'cpf' - é um campo obrigatorio, por tanto deverá ser informado"
				);
			}
			if (!gender) {
				res.statusCode = 400;
				throw new Error(
					"'gender' - é um campo obrigatorio, por tanto deverá ser informado"
				);
			}
			if (!age) {
				res.statusCode = 400;
				throw new Error(
					"'age' - é um campo obrigatorio, por tanto deverá ser informado"
				);
			}
			if (!profession) {
				res.statusCode = 400;
				throw new Error(
					"'profession' - é um campo obrigatorio, por tanto deverá ser informado"
				);
			}
			if (!city) {
				res.statusCode = 400;
				throw new Error(
					"'city' - é um campo obrigatorio, por tanto deverá ser informado"
				);
			}
			if (!state) {
				res.statusCode = 400;
				throw new Error(
					"'state' - é um campo obrigatorio, por tanto deverá ser informado"
				);
			}
			if (typeof id !== "string") {
				res.statusCode = 400;
				throw new Error("'id' - deve ser enviado no formato string");
			}
			if (typeof name !== "string") {
				res.statusCode = 400;
				throw new Error("'name' - deve ser enviado no formato string");
			}
			if (typeof cpf !== "string") {
				res.statusCode = 400;
				throw new Error("'cpf' - deve ser enviado no formato string");
			}
			if (cpf.length < 15 && cpf.length > 15) {
				res.statusCode = 400;
				throw new Error(
					"'cpf' - deve conter 15 caracteres ex: '000.000.000-00'"
				);
			}
			if (typeof gender !== "string") {
				res.statusCode = 400;
				throw new Error("'gender' - deve ser enviado no formato string");
			}
			if (typeof age !== "number") {
				res.statusCode = 400;
				throw new Error("'age' - deve ser enviado no formato number");
			}
			if (typeof profession !== "string") {
				res.statusCode = 400;
				throw new Error("'profession' - deve ser enviado no formato string");
			}
			if (typeof city !== "string") {
				res.statusCode = 400;
				throw new Error("'city' - deve ser enviado no formato string");
			}
			if (typeof state !== "string") {
				res.statusCode = 400;
				throw new Error("'state' - deve ser enviado no formato string");
			}

			const visitante = new Visitor(
				id,
				name,
				cpf,
				gender,
				age,
				city,
				state,
				profession,
				new Date().toISOString()
			);

			const visitanteDB = new VisitorDb();
			await visitanteDB.createVisitor(
				visitante.getId(),
				visitante.getName(),
				visitante.getCpf(),
				visitante.getAge(),
				visitante.getGender(),
				visitante.getProfession(),
				visitante.getCity(),
				visitante.getState()
			);
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
	}

	public async editVisitor(req: Request, res: Response) {
		try {
			const idToEdit = req.params.id as string;
			const visitante = new VisitorDb();
			const visitorToEdit: Visitors | undefined =
        await visitante.getVisitorById(idToEdit);
			if (!visitorToEdit) {
				res.statusCode = 404;
				throw new Error("'id' - usuario não encontrado");
			}

			const { name, cpf, gender, age, profession, city, state } = req.body;
			if (name) {
				if (typeof name !== "string") {
					res.statusCode = 400;
					throw new Error("'name' - Deve ser enviado no formato string");
				}
			}
			if (cpf) {
				if (cpf.length < 15 && cpf.length > 15) {
					res.statusCode = 400;
					throw new Error(
						"'cpf' - deve conter 15 caracteres ex: '000.000.000-00'"
					);
				}
			}
			if (gender) {
				if (typeof gender !== "string") {
					res.statusCode = 400;
					throw new Error("'gender' - Deve ser enviado no formato string");
				}
			}
			if (age) {
				if (typeof age !== "number") {
					res.statusCode = 400;
					throw new Error("'age' - Deve ser enviado no formato number");
				}
			}
			if (profession) {
				if (typeof profession !== "string") {
					res.statusCode = 400;
					throw new Error("'profession' - Deve ser enviado no formato string");
				}
			}
			if (city) {
				if (typeof city !== "string") {
					res.statusCode = 400;
					throw new Error("'city' - Deve ser enviado no formato string");
				}
			}
			if (state) {
				if (typeof state !== "string") {
					res.statusCode = 400;
					throw new Error("'state' - Deve ser enviado no formato string");
				}
			}

			await visitante.editVisitor(
				idToEdit,
				name || visitorToEdit.name,
				cpf || visitorToEdit.cpf,
				age || visitorToEdit.age,
				gender || visitorToEdit.gender,
				profession || visitorToEdit.profession,
				city || visitorToEdit.city,
				state || visitorToEdit.state
			);

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
			const idToDelete: string = req.params.id;
			const visitor = new VisitorDb();

			const existe: Visitors | undefined = await visitor.getVisitorById(
				idToDelete
			);

			if (!existe) {
				res.statusCode = 404;
				throw new Error("'id' - usuario não encontrado");
			}
			await visitor.deleteVisitor(idToDelete);
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
