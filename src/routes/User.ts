import express from "express";
import { UserControler } from "../controller/UserControler";
import { UserBusiness } from "../business/UserBusiness";
import { UserDb } from "../database/UserDb";
import { checkToken } from "../services/checkToken";

export const UserRouter = express.Router();

const user = new UserControler(new UserBusiness(new UserDb()));

UserRouter.get("/", checkToken, user.getAllUsers);

UserRouter.post("/auth", checkToken, user.createUser);

UserRouter.put("/auth/:id", checkToken, user.editUser);

UserRouter.delete("/auth/:id", checkToken, user.deleteUser);

UserRouter.post("/auth/login", user.login);