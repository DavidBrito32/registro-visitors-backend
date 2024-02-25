import express from "express";
import { VisitorControler } from "../controller/VisitorControler";

export const VisitorRouter = express.Router();

const visitante = new VisitorControler();

VisitorRouter.get("/", visitante.getAllVisitor);

VisitorRouter.post("/", visitante.createVisitor);

VisitorRouter.get("/blacklist", visitante.getallBlockedVisitor);

VisitorRouter.post("/block/:id", visitante.blockVisitor);

VisitorRouter.delete("/block/:id", visitante.unlockVisitor);

VisitorRouter.post("/registred", visitante.getVisitorByCpF);

VisitorRouter.put("/:id", visitante.editVisitor);

VisitorRouter.delete("/:id", visitante.deleteVisitor);

VisitorRouter.delete("/block/:id", visitante.unlokVisitor);
