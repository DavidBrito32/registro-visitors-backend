"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRouter = void 0;
const express_1 = __importDefault(require("express"));
const UserControler_1 = require("../controller/UserControler");
const UserBusiness_1 = require("../business/UserBusiness");
const UserDb_1 = require("../database/UserDb");
const checkToken_1 = require("../services/checkToken");
exports.UserRouter = express_1.default.Router();
const user = new UserControler_1.UserControler(new UserBusiness_1.UserBusiness(new UserDb_1.UserDb()));
exports.UserRouter.get("/", checkToken_1.checkToken, user.getAllUsers);
exports.UserRouter.post("/auth", checkToken_1.checkToken, user.createUser);
exports.UserRouter.put("/auth/:id", checkToken_1.checkToken, user.editUser);
exports.UserRouter.delete("/auth/:id", checkToken_1.checkToken, user.deleteUser);
exports.UserRouter.post("/auth/login", user.login);
