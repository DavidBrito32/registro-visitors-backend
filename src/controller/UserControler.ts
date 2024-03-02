import { Request, Response } from "express";
import { UserBusiness } from "../business/UserBusiness";
import { CustomError } from "../errors/CustomError";
import { LoginSchema } from "./../dto/userDTO";
import { ZodError } from "zod";

export class UserControler {
	constructor(
		protected userBusiness: UserBusiness
	){
	}	
	public getAllUsers = async (req: Request, res: Response): Promise<void> => {
		try{
			const user = this.userBusiness;
			const userReturn = await user.getAllUsers();
			res.status(200).send(userReturn);
		}catch (err) {
			if (err instanceof CustomError) {
				res.status(err.statusCode).send(err.message);
			} else {
				res.status(500).send("erro inesperado");
			}
		}
	};
	
	public createUser = async (req: Request, res: Response): Promise<void> => {
		try{
			const usuario = this.userBusiness;
			await usuario.createUser(req.body);
			res.status(200).send("Usuario Criado com sucesso! 🎆");
		}catch (err) {
			if (err instanceof CustomError) {
				res.status(err.statusCode).send(err.message);
			} else {
				res.status(500).send("erro inesperado");
			}
		}
	};
	
	public editUser = async (req: Request, res: Response): Promise<void> => {
		try{
			const ID = req.params.id;
			const Data = req.body;
			const editar = this.userBusiness;
			await editar.editUser(ID, Data);
			res.status(200).send("Usuario Editado com sucesso! 🎆");
		}catch (err) {
			if (err instanceof CustomError) {
				res.status(err.statusCode).send(err.message);
			} else {
				res.status(500).send("erro inesperado");
			}
		}
	};
	
	public deleteUser = async (req: Request, res: Response): Promise<void> => {
		try{
			const ID = req.params.id;
			const DEL = this.userBusiness;
			await DEL.deleteUser(ID);
			res.status(200).send("Usuario Deletado com sucesso! 🎆");
		}catch (err) {
			if (err instanceof CustomError) {
				res.status(err.statusCode).send(err.message);
			} else {
				res.status(500).send("erro inesperado");
			}
		}
	};
	
	public login = async (req: Request, res: Response): Promise<void> => {
		try{
			const USER = this.userBusiness;
			const input = LoginSchema.parse(req.body);
			res.send(await USER.login(input));
		}catch (err) {
			if (err instanceof ZodError) {
				res.status(400).send(err.issues);
			} else if (err instanceof CustomError) {
				res.status(err.statusCode).send(err.message);
			} else {
				res.status(500).send("erro inesperado");
			}
		}
	};
}