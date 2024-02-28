import express from "express";
import { VisitorControler } from "../controller/VisitorControler";
import { VisitorBusiness } from "../business/VisitorBusiness";
import { VisitorDb } from "../database/VisitorDb";
import { IdGenerator } from "../services/uuid/IdGenerator";

export const VisitorRouter = express.Router();

const visitante = new VisitorControler(new VisitorBusiness(new VisitorDb, new IdGenerator));

VisitorRouter.get("/", visitante.getAllVisitor);

VisitorRouter.post("/", visitante.createVisitor);

VisitorRouter.get("/blacklist", visitante.getallBlockedVisitor);

VisitorRouter.post("/block/:id", visitante.blockVisitor);

VisitorRouter.delete("/block/:id", visitante.unlockVisitor);

VisitorRouter.post("/registred", visitante.getVisitorByCpF);

VisitorRouter.put("/:id", visitante.editVisitor);

VisitorRouter.delete("/:id", visitante.deleteVisitor);

VisitorRouter.delete("/block/:id", visitante.unlokVisitor);
