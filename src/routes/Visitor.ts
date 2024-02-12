import express from "express";
import { VisitorControler } from "../controller/VisitorControler";

export const VisitorRouter = express.Router();

const visitante = new VisitorControler();

VisitorRouter.get("/", visitante.getAllVisitor);

VisitorRouter.post("/", visitante.createVisitor);

VisitorRouter.put("/:id", visitante.editVisitor);

VisitorRouter.delete("/:id", visitante.deleteVisitor);
