import { Request, Response } from "express";
import { UserBusiness } from "../business/UserBusiness";

export class UserControler {
	public async getAllUsers(req: Request, res: Response){
		try{
			const user = new UserBusiness();
			const userReturn = await user.getAllUsers();
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
			const usuario = new UserBusiness();
			await usuario.createUser(req.body);
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
			const ID = req.params.id;
			const Data = req.body;
			const editar = new UserBusiness();

			await editar.editUser(ID, Data);
			res.status(200).send("Usuario Editado com sucesso! 🎆");
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
			const ID = req.params.id;
			const DEL = new UserBusiness();
			await DEL.deleteUser(ID);
			res.status(200).send("Usuario Deletado com sucesso! 🎆");
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