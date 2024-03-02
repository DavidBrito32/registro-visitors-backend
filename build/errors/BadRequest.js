"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BadRequest = void 0;
const CustomError_1 = require("./CustomError");
class BadRequest extends CustomError_1.CustomError {
    constructor(message = "Erro na requisição") {
        super(400, message);
    }
}
exports.BadRequest = BadRequest;
