import { CustomError } from "./CustomError";

export class BadRequest extends CustomError {
	constructor(message: string = "Erro na requisição") {
		super(400, message);
	}
}
