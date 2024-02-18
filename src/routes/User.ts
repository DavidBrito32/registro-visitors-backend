import express from "express";
import { UserControler } from "../controller/UserControler";

export const UserRouter = express.Router();

const user = new UserControler();

UserRouter.get("/", user.getAllUsers);

UserRouter.post("/auth", user.createUser);

UserRouter.put("/auth/:id", user.editUser);

UserRouter.delete("/auth/:id", user.deleteUser);