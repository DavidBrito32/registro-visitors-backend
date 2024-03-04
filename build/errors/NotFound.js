"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotFound = void 0;
const CustomError_1 = require("./CustomError");
class NotFound extends CustomError_1.CustomError {
	constructor(message = "Ops. Verifique os dados informados e tente novamente") {
		super(400, message);
	}
}
exports.NotFound = NotFound;
