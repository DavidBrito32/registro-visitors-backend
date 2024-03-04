"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationError = void 0;
const CustomError_1 = require("./CustomError");
class ValidationError extends CustomError_1.CustomError {
	constructor(message = "A solicitação contém dados inválidos ou ausentes. Por favor, verifique os campos fornecidos e tente novamente.") {
		super(422, message);
	}
}
exports.ValidationError = ValidationError;
