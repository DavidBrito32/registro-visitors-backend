import express from "express";
import { UserControler } from "../controller/UserControler";
import { UserBusiness } from "../business/UserBusiness";
import { UserDb } from "../database/UserDb";

export const UserRouter = express.Router();

const user = new UserControler(new UserBusiness(new UserDb()));

UserRouter.get("/", user.getAllUsers);

UserRouter.post("/auth", user.createUser);

UserRouter.put("/auth/:id", user.editUser);

UserRouter.delete("/auth/:id", user.deleteUser);

UserRouter.post("/auth/login", user.login);