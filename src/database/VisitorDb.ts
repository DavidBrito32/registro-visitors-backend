import { Visitors } from "../types/types";
import { Database } from "./knex";

export class VisitorDb extends Database {
	public async getAllVisitors(): Promise<Array<Visitors>> {
		const visitors: Array<Visitors> = await Database.connection("visitor");
		return visitors;
	}

	public async getByQueryParams(query: string): Promise<Array<Visitors>> {
		const q: Array<Visitors> = await Database.connection("visitor").where(
			"name",
			"LIKE",
			`%${query}%`
		);
		return q;
	}

	public async getVisitorById(id: string): Promise<Visitors | undefined> {
		const visitorSearch: Array<Visitors> = await Database.connection
			.select("*")
			.from("visitor")
			.where({ id: id });

		if (visitorSearch.length < 1) {
			return undefined;
		}

		return visitorSearch[0];
	}

	public async getVisitorByCpF(cpf: string): Promise<Visitors | undefined> {
		const visitorSearch: Array<Visitors> = await Database.connection
			.select("*")
			.from("visitor")
			.where({ cpf: cpf });

		if (visitorSearch.length < 1) {
			return undefined;
		}

		return visitorSearch[0];
	}

	public async createVisitor(
		id: string,
		name: string,
		cpf: string,
		age: number,
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
	}

	public async editVisitor(
		id: string,
		name: string,
		cpf: string,
		age: number,
		gender: string,
		profession: string,
		city: string,
		state: string
	): Promise<void> {
		await Database.connection("visitor")
			.update({
				name,
				cpf,
				age,
				gender,
				profession,
				city,
				state,
			})
			.where({
				id: id,
			});
	}

	public async deleteVisitor(id: string): Promise<void> {
		await Database.connection("visitor").delete().where({ id: id });
	}
}
