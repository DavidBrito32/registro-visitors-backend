import express, { Request, Response, Express } from "express";
import dotenv from "dotenv";
import cors from "cors";
import { VisitorRouter } from "./routes/Visitor";
import { UserRouter } from "./routes/User";
dotenv.config();

const App: Express = express();
const port = 3008;

App.use(express.json());
App.use(cors());

App.get("/ping", (req: Request, res: Response) => {
	try{
		res.send("pong");
	}catch (err){
		if(res.statusCode === 200){
			res.statusCode = 500;
		}

		if(err instanceof Error){
			res.send(err.message);
		}else{
			res.send("erro inesperado");
		}
	}
});

App.use("/visitor", VisitorRouter);

App.use("/users", UserRouter);



App.listen(port, () => {
	console.log(`servidor rodadando no endereço: http://localhost:${port}/`);
});