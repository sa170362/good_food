"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const komentar_controller_1 = require("../controllers/komentar.controller");
const komentarRouter = express_1.default.Router();
const controller = new komentar_controller_1.KomentarController();
komentarRouter.get('/komentari/:ime', controller.getKomentarByIme);
exports.default = komentarRouter;
