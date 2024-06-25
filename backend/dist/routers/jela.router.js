"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jela_controller_1 = require("../controllers/jela.controller");
const jelaRouter = express_1.default.Router();
const jelaKontroler = new jela_controller_1.JelaKontroler();
jelaRouter.post('/', jelaKontroler.dodajJelo);
jelaRouter.get('/', jelaKontroler.svaJela);
exports.default = jelaRouter;
