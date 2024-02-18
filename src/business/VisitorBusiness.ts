/* eslint-disable @typescript-eslint/ban-ts-comment */
import { VisitorDb } from "../database/VisitorDb";
import { Visitor } from "../models/Visitor";
import { IdGenerator } from "../services/uuid/IdGenerator";
import { Visitors } from "../types/types";

export class VisitorBusiness {
	public getAllVisitors = async (name: string): Promise<Array<Visitors>> => {
		const DB = new VisitorDb();
		let visitantes: Visitors[];
		if (name) {
			visitantes = await DB.getByQueryParams(name);
			return visitantes;
		} else {
			visitantes = await DB.getAllVisitors();
			//@ts-expect-error
			const visit: Array<Visitors> = visitantes.map((item: Visitors) => new Visitor(
				item.id,
				item.name,
				item.cpf,
				item.gender,
				item.age,
				item.city,
				item.state,
				item.profession,
				item.created_at
			)
			);
			return visit;
		}
	};

	public getVisitorByCpF = async (CPF: string): Promise<Array<Visitors> | undefined> => {
		if (typeof CPF !== "string") {
			throw new Error("'CPF' - Deve ser Informado no formato de TEXTO");
		}
		const DATABASE = new VisitorDb();
		const VISITOR: Array<Visitors> | undefined = await DATABASE.getVisitorByCpF(CPF);
		if(VISITOR && VISITOR.length < 1){
			throw new Error("'CPF' - Não Encontrado, Favor Realizar Cadastro");
		}
		return VISITOR;
	};

	public checkVisit = async (id: string): Promise<void> => {
		const Visit = new VisitorDb();
		const Data = new Date().toString();
		await Visit.checkVisit(id, Data);
	};

	public createVisitors = async (object: Visitors): Promise<void> => {
		const { name, cpf, gender, age, profession, city, state } = object;

		if (!name) {
			throw new Error(
				"'name' - é um campo obrigatorio, por tanto deverá ser informado"
			);
		}
		if (!cpf) {
			throw new Error(
				"'cpf' - é um campo obrigatorio, por tanto deverá ser informado"
			);
		}
		if (!gender) {
			throw new Error(
				"'gender' - é um campo obrigatorio, por tanto deverá ser informado"
			);
		}
		if (!age) {
			throw new Error(
				"'age' - é um campo obrigatorio, por tanto deverá ser informado"
			);
		}
		if (!profession) {
			throw new Error(
				"'profession' - é um campo obrigatorio, por tanto deverá ser informado"
			);
		}
		if (!city) {
			throw new Error(
				"'city' - é um campo obrigatorio, por tanto deverá ser informado"
			);
		}
		if (!state) {
			throw new Error(
				"'state' - é um campo obrigatorio, por tanto deverá ser informado"
			);
		}
		if (typeof name !== "string") {
			throw new Error("'name' - deve ser enviado no formato string");
		}
		if (typeof cpf !== "string") {
			throw new Error("'cpf' - deve ser enviado no formato string");
		}
		if (cpf.length < 15 && cpf.length > 15) {
			throw new Error("'cpf' - deve conter 15 caracteres ex: '000.000.000-00'");
		}
		if (typeof gender !== "string") {
			throw new Error("'gender' - deve ser enviado no formato string");
		}

		if (typeof profession !== "string") {
			throw new Error("'profession' - deve ser enviado no formato string");
		}
		if (typeof city !== "string") {
			throw new Error("'city' - deve ser enviado no formato string");
		}
		if (typeof state !== "string") {
			throw new Error("'state' - deve ser enviado no formato string");
		}

		const CriarUsuario = new IdGenerator();

		const id = CriarUsuario.generate();
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
		const VerificaCPF = new VisitorDb();

		const existe: Array<Visitors> | undefined = await VerificaCPF.getVisitorByCpF(cpf);
		if (existe && existe[0] !== undefined) {
			throw new Error(
				"CPF Ja cadastrado, Registre sua presença na pagina de Visitante Cadastrado"
			);
		}

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
	};

	public editVisitor = async (id: string, object: Visitors): Promise<void> => {
		const visitante = new VisitorDb();
		const visitorToEdit: Visitors | undefined = await visitante.getVisitorById(
			id
		);
		if (!visitorToEdit) {
			throw new Error("'id' - usuario não encontrado");
		}

		const { name, cpf, gender, age, profession, city, state } = object;

		if (name) {
			if (typeof name !== "string") {
				throw new Error("'name' - Deve ser enviado no formato string");
			}
		}
		if (cpf) {
			if (cpf.length < 15 && cpf.length > 15) {
				throw new Error(
					"'cpf' - deve conter 15 caracteres ex: '000.000.000-00'"
				);
			}
		}
		if (gender) {
			if (typeof gender !== "string") {
				throw new Error("'gender' - Deve ser enviado no formato string");
			}
		}
		if (age) {
			if (typeof age !== "number") {
				throw new Error("'age' - Deve ser enviado no formato number");
			}
		}
		if (profession) {
			if (typeof profession !== "string") {
				throw new Error("'profession' - Deve ser enviado no formato string");
			}
		}
		if (city) {
			if (typeof city !== "string") {
				throw new Error("'city' - Deve ser enviado no formato string");
			}
		}
		if (state) {
			if (typeof state !== "string") {
				throw new Error("'state' - Deve ser enviado no formato string");
			}
		}
		await visitante.editVisitor(
			id,
			name || visitorToEdit.name,
			cpf || visitorToEdit.cpf,
			age || visitorToEdit.age,
			gender || visitorToEdit.gender,
			profession || visitorToEdit.profession,
			city || visitorToEdit.city,
			state || visitorToEdit.state
		);
	};

	public deleteVisitor = async (id: string): Promise<void> => {
		const visitor = new VisitorDb();

		const existe: Visitors | undefined = await visitor.getVisitorById(id);

		if (!existe) {
			throw new Error("'id' - usuario não encontrado");
		}
		await visitor.deleteVisitor(id);
	};
}
