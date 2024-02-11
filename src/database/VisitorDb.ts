import { Visitors } from "../types/types";
import { Database } from "./knex";

export class VisitorDb extends Database {

	public async getAllVisitors (): Promise<Array<Visitors>> {
		const visitors: Array<Visitors> = await Database.connection.select("visitors");
		return visitors;
	}

	public async getVisitorById (id: number): Promise<Visitors | undefined> {
		const [visitorSearch]: Array<Visitors> = await Database.connection.select("*").where({id: id});

		if(!visitorSearch){
			return undefined;
		}

		return visitorSearch;
	}
    
}