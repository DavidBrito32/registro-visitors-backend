import express, { Request, Response, Express } from "express";
import cors from "cors";

const App: Express  = express();
const port = 3008;

App.use(express.json());
App.use(cors());




App.listen(port, () => {
	console.log(`servidor rodadando no endereço: http://localhost:${port}/`);
});