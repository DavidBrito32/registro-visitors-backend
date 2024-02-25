import { Request, Response } from "express";
import { UserBusiness } from "../business/UserBusiness";
import { CustomError } from "../errors/CustomError";

export class UserControler {
	public async getAllUsers(req: Request, res: Response){
		try{
			const user = new UserBusiness();
			const userReturn = await user.getAllUsers();
			res.status(200).send(userReturn);
		}catch (err) {
			if (err instanceof CustomError) {
				res.status(err.statusCode).send(err.message);
			} else {
				res.status(500).send("erro inesperado");
			}
		}
	}
	public async createUser(req: Request, res: Response){
		try{
			const usuario = new UserBusiness();
			await usuario.createUser(req.body);
			res.status(200).send("Usuario Criado com sucesso! 🎆");
		}catch (err) {
			if (err instanceof CustomError) {
				res.status(err.statusCode).send(err.message);
			} else {
				res.status(500).send("erro inesperado");
			}
		}
	}
	public async editUser(req: Request, res: Response){
		try{
			const ID = req.params.id;
			const Data = req.body;
			const editar = new UserBusiness();
			console.log(Data);

			await editar.editUser(ID, Data);
			res.status(200).send("Usuario Editado com sucesso! 🎆");
		}catch (err) {
			if (err instanceof CustomError) {
				res.status(err.statusCode).send(err.message);
			} else {
				res.status(500).send("erro inesperado");
			}
		}
	}
	public async deleteUser(req: Request, res: Response){
		try{
			const ID = req.params.id;
			console.log(ID);
			const DEL = new UserBusiness();
			await DEL.deleteUser(ID);
			res.status(200).send("Usuario Deletado com sucesso! 🎆");
		}catch (err) {
			if (err instanceof CustomError) {
				res.status(err.statusCode).send(err.message);
			} else {
				res.status(500).send("erro inesperado");
			}
		}
	}
	public async login(req: Request, res: Response){
		try{
			const input = req.body;
			const USER = new UserBusiness();

			const usuario = await USER.login(input);
			res.send(usuario);
		}catch (err) {
			if (err instanceof CustomError) {
				res.status(err.statusCode).send(err.message);
			} else {
				res.status(500).send("erro inesperado");
			}
		}
	}
}