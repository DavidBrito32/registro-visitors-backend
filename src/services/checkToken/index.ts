import { NextFunction, Request, Response } from "express";
import { BadRequest } from "../../errors/BadRequest";
import { CustomError } from "../../errors/CustomError";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const checkToken = async (req: Request, res: Response, next: NextFunction) => {
	try{
		const Authorization =  req.headers?.authorization?.split(" ")[1];
		
		if(!Authorization){			
			throw new BadRequest("'Unauthorized' Você não tem permissão para acessar esta rota");			
		}
		const SECRET = process.env.SECRET as string;
		const decoded = jwt.verify(Authorization, SECRET);

		if(!decoded){
			throw new BadRequest("'Unauthorized' - Falha na autenticação");
		}
		next();

	}catch (err){
		if (err instanceof jwt.JsonWebTokenError ) {
			res.status(400).send(err);
		}
		if(err instanceof CustomError){
			res.status(err.statusCode).send(err.message);
		}else{
			res.status(500).send(err);
		}
	}
};