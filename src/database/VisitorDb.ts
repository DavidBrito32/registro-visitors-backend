import { BlockedVisitor, ResultsDB, Total, VisitorDB } from "../types/types";
import { Database } from "./knex";

export class VisitorDb extends Database {
	public async getAllVisitors(): Promise<Array<VisitorDB>> {
		const visitors: Array<VisitorDB> = await Database.connection("visitor");
		return visitors;
	}

	public async getByQueryParams(query: string): Promise<Array<VisitorDB>> {
		const q: Array<VisitorDB> = await Database.connection("visitor").where(
			"name",
			"LIKE",
			`%${query}%`
		);
		return q;
	}

	public async getVisitorById(id: string): Promise<VisitorDB | undefined> {
		const [visitorSearch]: Array<VisitorDB> = await Database.connection
			.select("*")
			.from("visitor")
			.where({ id: id });
		return visitorSearch;
	}

	public async getBlockedVisitorById(
		id: string
	): Promise<BlockedVisitor | undefined> {
		const [visitorSearch]: Array<BlockedVisitor> = await Database.connection
			.select("*")
			.from("visitors_block")
			.where({ id: id });
		return visitorSearch;
	}

	public async getVisitorByCpF(cpf: string): Promise<VisitorDB | undefined> {
		const [visitorSearch]: Array<VisitorDB> = await Database.connection
			.select("*")
			.from("visitor")
			.where({ cpf: cpf });
		return visitorSearch;
	}

	public checkVisit = async (id: string, date: string): Promise<void> => {
		await Database.connection
			.insert({
				id_visitor: id,
				date_visit: date,
			})
			.into("registro");
	};

	public async createVisitor(
		id: string,
		name: string,
		cpf: string,
		age: string,
		gender: string,
		profession: string,
		city: string,
		state: string
	): Promise<void> {
		await Database.connection
			.insert({
				id,
				name,
				cpf,
				age,
				gender,
				profession,
				city,
				state,
				created_at: new Date().toISOString(),
			})
			.into("visitor");

		await this.checkVisit(id, new Date().toISOString());
	}

	public async editVisitor(
		id: string,
		name: string,
		cpf: string,
		age: string,
		gender: string,
		profession: string,
		city: string,
		state: string
	): Promise<void> {
		await Database.connection("visitor")
			.update({ name, cpf, age, gender, profession, city, state })
			.where({ id: id });
	}

	public async deleteVisitor(id: string): Promise<void> {
		await Database.connection("visitor").delete().where({ id: id });
	}

	public async blockVisitor(
		id_table: string,
		id_visitante: string,
		message: string
	): Promise<void> {
		await Database.connection
			.insert({ id: id_table, id_visitor: id_visitante, message: message })
			.into("visitors_block");
	}

	public async unlockVisitor(id: string): Promise<void> {
		await Database.connection.delete().from("visitors_block").where({ id: id });
	}

	public getallBlockedVisitor = async (): Promise<Array<BlockedVisitor>> => {
		const block: Array<BlockedVisitor> = await Database.connection
			.select(
				"visitor.id as id_Visitante",
				"visitors_block.id as ID",
				"name",
				"message",
				"cpf"
			)
			.from("visitors_block")
			.join("visitor", "visitor.id", "=", "visitors_block.id_visitor");
		return block;
	};

	public results = async (): Promise<ResultsDB> => {
		const gender = await Database.connection.raw(
			"SELECT gender, COUNT(*) as total FROM visitor GROUP BY gender ORDER BY total DESC;"
		);
		const profession = await Database.connection.raw(
			"SELECT LOWER(profession) AS profession, COUNT(*) as total FROM visitor GROUP BY LOWER(profession) ORDER BY total DESC;"
		);
		const city = await Database.connection.raw(
			"SELECT city, COUNT(*) as total FROM visitor GROUP BY city ORDER BY total DESC;"
		);
		const state = await Database.connection.raw(
			"SELECT state, COUNT(*) as total FROM visitor GROUP BY state ORDER BY total DESC;"
		);

		const output: ResultsDB = {
			gender,
			profession,
			city,
			state,
		};
		return output;
	};

	public allVisits = async (): Promise<Total> => {
		const TotalVisitas: Total = await Database.connection
			.count("* as total")
			.from("registro");
		return TotalVisitas;
	};
}
