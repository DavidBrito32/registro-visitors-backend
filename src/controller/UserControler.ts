import { Request, Response } from "express";
import { UserDb } from "../database/UserDb";
import { Users } from "../types/types";
import { User } from "../models/User";

export class UserControler {

	public async getAllUsers(req: Request, res: Response){
		try{
			const user = new UserDb();
			const userList: Array<Users> = await user.getUsers();
			const userReturn = userList.map((item: Users) => new User(item.id, item.name, item.role, item.cpf, item.email, item.password, item.created_at));
			res.status(200).send(userReturn);
		}catch (err){
			if(res.statusCode === 200){
				res.statusCode = 400;
			}

			if(err instanceof Error){
				res.send(err.message);
			}else{
				res.send("Erro inesperado");
			}
		}
	}

	public async createUser(req: Request, res: Response){
		try{
			res.status(200).send("Usuario Criado com sucesso! 🎆");
		}catch (err){
			if(res.statusCode === 200){
				res.statusCode = 400;
			}

			if(err instanceof Error){
				res.send(err.message);
			}else{
				res.send("Erro inesperado");
			}
		}
	}

	public async editUser(req: Request, res: Response){
		try{
			res.status(200).send("Usuario Criado com sucesso! 🎆");
		}catch (err){
			if(res.statusCode === 200){
				res.statusCode = 400;
			}

			if(err instanceof Error){
				res.send(err.message);
			}else{
				res.send("Erro inesperado");
			}
		}
	}

	public async deleteUser(req: Request, res: Response){
		try{
			res.status(200).send("Usuario Criado com sucesso! 🎆");
		}catch (err){
			if(res.statusCode === 200){
				res.statusCode = 400;
			}

			if(err instanceof Error){
				res.send(err.message);
			}else{
				res.send("Erro inesperado");
			}
		}
	}
}