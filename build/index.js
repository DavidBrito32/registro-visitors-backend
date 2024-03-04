"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
	return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const Visitor_1 = require("./routes/Visitor");
const User_1 = require("./routes/User");
const App = (0, express_1.default)();
const port = 3008;
dotenv_1.default.config();
App.use(express_1.default.json());
App.use((0, cors_1.default)());
App.get("/ping", (req, res) => {
	try {
		res.send("pong");
	}
	catch (err) {
		if (res.statusCode === 200) {
			res.statusCode = 500;
		}
		if (err instanceof Error) {
			res.send(err.message);
		}
		else {
			res.send("erro inesperado");
		}
	}
});
App.use("/visitor", Visitor_1.VisitorRouter);
App.use("/users", User_1.UserRouter);
App.listen(port, () => {
	console.log(`servidor rodadando no endereço: http://localhost:${port}/`);
});
