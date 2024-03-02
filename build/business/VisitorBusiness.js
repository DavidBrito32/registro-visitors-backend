"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VisitorBusiness = void 0;
const BadRequest_1 = require("../errors/BadRequest");
const NotFound_1 = require("../errors/NotFound");
const Visitor_1 = require("../models/Visitor");
const IdGenerator_1 = require("../services/uuid/IdGenerator");
class VisitorBusiness {
    constructor(visitorDb, idGenerator) {
        this.visitorDb = visitorDb;
        this.idGenerator = idGenerator;
        this.getAllVisitors = (input) => __awaiter(this, void 0, void 0, function* () {
            const { name } = input;
            const DB = this.visitorDb;
            let visitantes;
            let saida = [];
            if (name) {
                visitantes = yield DB.getByQueryParams(name);
                saida = visitantes.map((item) => new Visitor_1.Visitor(item.id, item.name, item.cpf, item.gender, item.age, item.city, item.state, item.profession, item.created_at));
            }
            else {
                visitantes = yield DB.getAllVisitors();
                saida = visitantes.map((item) => new Visitor_1.Visitor(item.id, item.name, item.cpf, item.gender, item.age, item.city, item.state, item.profession, item.created_at));
            }
            const output = {
                visitantes: saida
            };
            return output;
        });
        this.getVisitorByCpF = (CPF) => __awaiter(this, void 0, void 0, function* () {
            if (typeof CPF !== "string") {
                throw new BadRequest_1.BadRequest("'CPF' - Deve ser Informado no formato de TEXTO");
            }
            const DATABASE = this.visitorDb;
            const VISITOR = yield DATABASE.getVisitorByCpF(CPF);
            if (!VISITOR) {
                throw new BadRequest_1.BadRequest("'CPF' - Não Encontrado, Favor Realizar Cadastro");
            }
            return VISITOR;
        });
        this.checkVisit = (id) => __awaiter(this, void 0, void 0, function* () {
            const Visit = this.visitorDb;
            const Data = new Date().toString();
            yield Visit.checkVisit(id, Data);
        });
        this.createVisitors = (object) => __awaiter(this, void 0, void 0, function* () {
            const { name, cpf, gender, age, profession, city, state } = object;
            const CriarUsuario = this.idGenerator;
            const id = CriarUsuario.generate();
            const visitante = new Visitor_1.Visitor(id, name, cpf, gender, age, city, state, profession, new Date().toISOString());
            const VerificaCPF = this.visitorDb;
            const existe = yield VerificaCPF.getVisitorByCpF(cpf);
            if (existe) {
                throw new NotFound_1.NotFound("Verifique os Dados e tente novamente");
            }
            const visitanteDB = this.visitorDb;
            yield visitanteDB.createVisitor(visitante.getId(), visitante.getName(), visitante.getCpf(), visitante.getAge(), visitante.getGender(), visitante.getProfession(), visitante.getCity(), visitante.getState());
            const output = {
                message: "Visitante cadastrado com sucesso 💕💕",
                visitante: visitante
            };
            return output;
        });
        this.editVisitor = (id, input) => __awaiter(this, void 0, void 0, function* () {
            const visitante = this.visitorDb;
            const visitorToEdit = yield visitante.getVisitorById(id);
            if (!visitorToEdit) {
                throw new NotFound_1.NotFound("'id' - usuario não encontrado");
            }
            const { name, cpf, gender, age, profession, city, state } = input;
            if (name) {
                if (typeof name !== "string") {
                    throw new BadRequest_1.BadRequest("'name' - Deve ser enviado no formato string");
                }
            }
            if (cpf) {
                if (cpf.length < 15 && cpf.length > 15) {
                    throw new BadRequest_1.BadRequest("'cpf' - deve conter 15 caracteres ex: '000.000.000-00'");
                }
            }
            if (gender) {
                if (typeof gender !== "string") {
                    throw new BadRequest_1.BadRequest("'gender' - Deve ser enviado no formato string");
                }
            }
            if (age) {
                if (typeof age !== "number") {
                    throw new BadRequest_1.BadRequest("'age' - Deve ser enviado no formato number");
                }
            }
            if (profession) {
                if (typeof profession !== "string") {
                    throw new BadRequest_1.BadRequest("'profession' - Deve ser enviado no formato string");
                }
            }
            if (city) {
                if (typeof city !== "string") {
                    throw new BadRequest_1.BadRequest("'city' - Deve ser enviado no formato string");
                }
            }
            if (state) {
                if (typeof state !== "string") {
                    throw new BadRequest_1.BadRequest("'state' - Deve ser enviado no formato string");
                }
            }
            yield visitante.editVisitor(id, name || visitorToEdit.name, cpf || visitorToEdit.cpf, age || visitorToEdit.age, gender || visitorToEdit.gender, profession || visitorToEdit.profession, city || visitorToEdit.city, state || visitorToEdit.state);
        });
        this.deleteVisitor = (id) => __awaiter(this, void 0, void 0, function* () {
            const visitor = this.visitorDb;
            const existe = yield visitor.getVisitorById(id);
            if (!existe) {
                throw new NotFound_1.NotFound();
            }
            yield visitor.deleteVisitor(id);
        });
        this.blockVisitor = (id, message) => __awaiter(this, void 0, void 0, function* () {
            const Visitante = this.visitorDb;
            if (typeof message !== "string") {
                throw new BadRequest_1.BadRequest("Verifique o tipo de dado e tente novamente");
            }
            if (!id) {
                throw new BadRequest_1.BadRequest("Dados ausentes, favor verificar e tentar novamente");
            }
            const block = yield Visitante.getVisitorById(id);
            if (!block) {
                throw new NotFound_1.NotFound("Dados Incorretos, tentar novamente");
            }
            const newID = new IdGenerator_1.IdGenerator();
            const ID = newID.generate();
            yield Visitante.blockVisitor(ID, block.id, message);
        });
        this.unlockVisitor = (id) => __awaiter(this, void 0, void 0, function* () {
            const blocked = this.visitorDb;
            const exists = yield blocked.getBlockedVisitorById(id);
            if (!exists) {
                throw new NotFound_1.NotFound("Visitante Não Encontrado");
            }
            yield blocked.unlockVisitor(id);
        });
        this.getallBlockedVisitor = () => __awaiter(this, void 0, void 0, function* () {
            const blockedUsers = this.visitorDb;
            const bloqueados = yield blockedUsers.getallBlockedVisitor();
            return bloqueados;
        });
        this.results = () => __awaiter(this, void 0, void 0, function* () {
            const resultados = yield this.visitorDb.results();
            return resultados;
        });
    }
}
exports.VisitorBusiness = VisitorBusiness;
