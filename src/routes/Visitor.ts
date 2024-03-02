import express from "express";
import { VisitorControler } from "../controller/VisitorControler";
import { VisitorBusiness } from "../business/VisitorBusiness";
import { VisitorDb } from "../database/VisitorDb";
import { IdGenerator } from "../services/uuid/IdGenerator";
import { checkToken } from "../services/checkToken";

export const VisitorRouter = express.Router();

const visitante = new VisitorControler(new VisitorBusiness(new VisitorDb, new IdGenerator));

VisitorRouter.get("/", checkToken, visitante.getAllVisitor);

VisitorRouter.get("/results", checkToken, visitante.getResults);

VisitorRouter.post("/", visitante.createVisitor);

VisitorRouter.get("/blacklist", checkToken, visitante.getallBlockedVisitor);

VisitorRouter.post("/block/:id", checkToken, visitante.blockVisitor);

VisitorRouter.delete("/block/:id", checkToken, visitante.unlockVisitor);

VisitorRouter.post("/registred", visitante.getVisitorByCpF);

VisitorRouter.put("/:id", checkToken, visitante.editVisitor);

VisitorRouter.delete("/:id", checkToken, visitante.deleteVisitor);

VisitorRouter.delete("/block/:id", checkToken, visitante.unlokVisitor);
