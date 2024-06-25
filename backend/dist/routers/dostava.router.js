"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dostava_controller_1 = require("../controllers/dostava.controller");
const dostavaRouter = express_1.default.Router();
const dostavaKontroler = new dostava_controller_1.DostavaKontroler();
dostavaRouter.get('/aktuelne/:korisnik', dostavaKontroler.aktuelneDostave);
exports.default = dostavaRouter;
