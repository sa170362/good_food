"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const statistika_controller_1 = require("../controllers/statistika.controller");
const statistikaRouter = express_1.default.Router();
const controller = new statistika_controller_1.StatistikaController();
statistikaRouter.get('/brojGostijuPoDanima/:korisnickoIme', controller.getBrojGostijuPoDanima);
exports.default = statistikaRouter;
