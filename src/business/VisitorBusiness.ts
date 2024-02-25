import { VisitorDb } from "../database/VisitorDb";
import { BadRequest } from "../errors/BadRequest";
import { NotFound } from "../errors/NotFound";
import { Visitor } from "../models/Visitor";
import { IdGenerator } from "../services/uuid/IdGenerator";
import { BlockedVisitor, VisitorDB } from "../types/types";

export class VisitorBusiness {
	public getAllVisitors = async (name: string): Promise<Array<Visitor>> => {
		const DB = new VisitorDb();
		let visitantes: VisitorDB[];
		if (name) {
			visitantes = await DB.getByQueryParams(name);
			
			const visit: Array<Visitor> = visitantes.map(
				(item: VisitorDB) =>
					new Visitor(
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
		} else {
			visitantes = await DB.getAllVisitors();
			const visit: Array<Visitor> = visitantes.map(
				(item: VisitorDB) =>
					new Visitor(
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

	public getVisitorByCpF = async (CPF: string): Promise<VisitorDB | undefined> => {
		if (typeof CPF !== "string") {
			throw new BadRequest("'CPF' - Deve ser Informado no formato de TEXTO");
		}
		const DATABASE = new VisitorDb();
		const VISITOR: VisitorDB | undefined = await DATABASE.getVisitorByCpF(CPF);
		if (!VISITOR) {
			throw new BadRequest("'CPF' - Não Encontrado, Favor Realizar Cadastro");
		}
		return VISITOR;
	};

	public checkVisit = async (id: string): Promise<void> => {
		const Visit = new VisitorDb();
		const Data = new Date().toString();
		await Visit.checkVisit(id, Data);
	};

	public createVisitors = async (object: VisitorDB): Promise<void> => {
		const { name, cpf, gender, age, profession, city, state } = object;

		if (!name) {
			throw new BadRequest(
				"'name' - é um campo obrigatorio, por tanto deverá ser informado"
			);
		}
		if (!cpf) {
			throw new BadRequest(
				"'cpf' - é um campo obrigatorio, por tanto deverá ser informado"
			);
		}
		if (!gender) {
			throw new BadRequest(
				"'gender' - é um campo obrigatorio, por tanto deverá ser informado"
			);
		}
		if (!age) {
			throw new BadRequest(
				"'age' - é um campo obrigatorio, por tanto deverá ser informado"
			);
		}
		if (!profession) {
			throw new BadRequest(
				"'profession' - é um campo obrigatorio, por tanto deverá ser informado"
			);
		}
		if (!city) {
			throw new BadRequest(
				"'city' - é um campo obrigatorio, por tanto deverá ser informado"
			);
		}
		if (!state) {
			throw new BadRequest(
				"'state' - é um campo obrigatorio, por tanto deverá ser informado"
			);
		}
		if (typeof name !== "string") {
			throw new BadRequest("'name' - deve ser enviado no formato string");
		}
		if (typeof cpf !== "string") {
			throw new BadRequest("'cpf' - deve ser enviado no formato string");
		}
		if (cpf.length < 15 && cpf.length > 15) {
			throw new BadRequest("'cpf' - deve conter 15 caracteres ex: '000.000.000-00'");
		}
		if (typeof gender !== "string") {
			throw new BadRequest("'gender' - deve ser enviado no formato string");
		}		
		if (typeof profession !== "string") {
			throw new BadRequest("'profession' - deve ser enviado no formato string");
		}
		if (typeof city !== "string") {
			throw new BadRequest("'city' - deve ser enviado no formato string");
		}
		if (typeof state !== "string") {
			throw new BadRequest("'state' - deve ser enviado no formato string");
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

		const existe: VisitorDB | undefined = await VerificaCPF.getVisitorByCpF(cpf);
		
		if (existe) {
			throw new NotFound("Verifique os Dados e tente novamente");
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

	public editVisitor = async (id: string, input: VisitorDB): Promise<void> => {
		const visitante = new VisitorDb();
		const visitorToEdit: VisitorDB | undefined = await visitante.getVisitorById(
			id
		);
		if (!visitorToEdit) {
			throw new NotFound("'id' - usuario não encontrado");
		}
		const { name, cpf, gender, age, profession, city, state } = input;

		if (name) {
			if (typeof name !== "string") {
				throw new BadRequest("'name' - Deve ser enviado no formato string");
			}
		}
		if (cpf) {
			if (cpf.length < 15 && cpf.length > 15) {
				throw new BadRequest(
					"'cpf' - deve conter 15 caracteres ex: '000.000.000-00'"
				);
			}
		}
		if (gender) {
			if (typeof gender !== "string") {
				throw new BadRequest("'gender' - Deve ser enviado no formato string");
			}
		}
		if (age) {
			if (typeof age !== "number") {
				throw new BadRequest("'age' - Deve ser enviado no formato number");
			}
		}
		if (profession) {
			if (typeof profession !== "string") {
				throw new BadRequest("'profession' - Deve ser enviado no formato string");
			}
		}
		if (city) {
			if (typeof city !== "string") {
				throw new BadRequest("'city' - Deve ser enviado no formato string");
			}
		}
		if (state) {
			if (typeof state !== "string") {
				throw new BadRequest("'state' - Deve ser enviado no formato string");
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

		const existe: VisitorDB | undefined = await visitor.getVisitorById(id);

		if (!existe) {
			throw new NotFound();
		}
		await visitor.deleteVisitor(id);
	};

	public blockVisitor = async (id: string, message: string): Promise<void> => {
		const Visitante = new VisitorDb();
		if(typeof message !== "string"){
			throw new BadRequest("Verifique o tipo de dado e tente novamente"); 
		}
		if(!id){
			throw new BadRequest("Dados ausentes, favor verificar e tentar novamente"); 
		}
		const block: VisitorDB | undefined = await Visitante.getVisitorById(id);

		if(!block){
			throw new NotFound("Dados Incorretos, tentar novamente"); 
		}

		const newID = new IdGenerator();
		const ID = newID.generate();

		await Visitante.blockVisitor(ID, block.id, message);
	};

	public unlockVisitor = async (id: string): Promise<void> => {
		const blocked: VisitorDb = new VisitorDb();
		const exists: BlockedVisitor | undefined = await blocked.getBlockedVisitorById(id);

		if(!exists){
			throw new NotFound("Visitante Não Encontrado");
		}

		await blocked.unlockVisitor(id);
	};

	public getallBlockedVisitor = async (): Promise<Array<BlockedVisitor>> => {
		const blockedUsers = new VisitorDb();
		const bloqueados: Array<BlockedVisitor> = await blockedUsers.getallBlockedVisitor();
		return bloqueados;
	};
}
