"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForbiddenError = void 0;
const CustomError_1 = require("./CustomError");
class ForbiddenError extends CustomError_1.CustomError {
    constructor(message = "Desculpe, você não tem permissão para acessar este recurso.") {
        super(403, message);
    }
}
exports.ForbiddenError = ForbiddenError;
