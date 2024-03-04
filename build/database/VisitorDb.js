"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
	function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
	return new (P || (P = Promise))(function (resolve, reject) {
		function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
		function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
		function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
		step((generator = generator.apply(thisArg, _arguments || [])).next());
	});
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VisitorDb = void 0;
const knex_1 = require("./knex");
class VisitorDb extends knex_1.Database {
	constructor() {
		super(...arguments);
		this.checkVisit = (id, date) => __awaiter(this, void 0, void 0, function* () {
			yield knex_1.Database.connection
				.insert({
					id_visitor: id,
					date_visit: date,
				})
				.into("registro");
		});
		this.getallBlockedVisitor = () => __awaiter(this, void 0, void 0, function* () {
			const block = yield knex_1.Database.connection.select("visitor.id as id_Visitante", "visitors_block.id as ID", "name", "message", "cpf")
				.from("visitors_block")
				.join("visitor", "visitor.id", "=", "visitors_block.id_visitor");
			return block;
		});
		this.results = () => __awaiter(this, void 0, void 0, function* () {
			const gender = yield knex_1.Database.connection.raw("SELECT gender, COUNT(*) as total FROM visitor GROUP BY gender ORDER BY total DESC;");
			const profession = yield knex_1.Database.connection.raw("SELECT LOWER(profession) AS profession, COUNT(*) as total FROM visitor GROUP BY LOWER(profession) ORDER BY total DESC;");
			const city = yield knex_1.Database.connection.raw("SELECT city, COUNT(*) as total FROM visitor GROUP BY city ORDER BY total DESC;");
			const state = yield knex_1.Database.connection.raw("SELECT state, COUNT(*) as total FROM visitor GROUP BY state ORDER BY total DESC;");
			const output = {
				gender,
				profession,
				city,
				state
			};
			return output;
		});
	}
	getAllVisitors() {
		return __awaiter(this, void 0, void 0, function* () {
			const visitors = yield knex_1.Database.connection("visitor");
			return visitors;
		});
	}
	getByQueryParams(query) {
		return __awaiter(this, void 0, void 0, function* () {
			const q = yield knex_1.Database.connection("visitor").where("name", "LIKE", `%${query}%`);
			return q;
		});
	}
	getVisitorById(id) {
		return __awaiter(this, void 0, void 0, function* () {
			const [visitorSearch] = yield knex_1.Database.connection
				.select("*")
				.from("visitor")
				.where({ id: id });
			return visitorSearch;
		});
	}
	getBlockedVisitorById(id) {
		return __awaiter(this, void 0, void 0, function* () {
			const [visitorSearch] = yield knex_1.Database.connection
				.select("*")
				.from("visitors_block")
				.where({ id: id });
			return visitorSearch;
		});
	}
	getVisitorByCpF(cpf) {
		return __awaiter(this, void 0, void 0, function* () {
			const [visitorSearch] = yield knex_1.Database.connection
				.select("*")
				.from("visitor")
				.where({ cpf: cpf });
			return visitorSearch;
		});
	}
	createVisitor(id, name, cpf, age, gender, profession, city, state) {
		return __awaiter(this, void 0, void 0, function* () {
			yield knex_1.Database.connection.insert({ id, name, cpf, age, gender, profession, city, state, created_at: new Date().toISOString(), }).into("visitor");
			yield this.checkVisit(id, new Date().toISOString());
		});
	}
	editVisitor(id, name, cpf, age, gender, profession, city, state) {
		return __awaiter(this, void 0, void 0, function* () {
			yield knex_1.Database.connection("visitor").update({ name, cpf, age, gender, profession, city, state, }).where({ id: id, });
		});
	}
	deleteVisitor(id) {
		return __awaiter(this, void 0, void 0, function* () {
			yield knex_1.Database.connection("visitor").delete().where({ id: id });
		});
	}
	blockVisitor(id_table, id_visitante, message) {
		return __awaiter(this, void 0, void 0, function* () {
			yield knex_1.Database.connection.insert({ id: id_table, id_visitor: id_visitante, message: message }).into("visitors_block");
		});
	}
	unlockVisitor(id) {
		return __awaiter(this, void 0, void 0, function* () {
			yield knex_1.Database.connection.delete().from("visitors_block").where({ id: id });
		});
	}
}
exports.VisitorDb = VisitorDb;
