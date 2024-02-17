import express from "express";
import { UserControler } from "../controller/UserControler";

export const UserRouter = express.Router();

const user = new UserControler();

UserRouter.get("/", user.getAllUsers);