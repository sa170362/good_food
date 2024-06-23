"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const rezervacija_controller_1 = require("../controllers/rezervacija.controller");
const rezervacijaRouter = express_1.default.Router();
const controller = new rezervacija_controller_1.RezervacijaController();
rezervacijaRouter.get('/neobradjene/:restoran', controller.getAllNeobradjeneRezervacije);
rezervacijaRouter.post('/potvrdi/:imeGosta/:korisnickoImeKonobara', controller.confirmReservation);
rezervacijaRouter.post('/odbij/:imeGosta', controller.rejectReservation);
rezervacijaRouter.get('/brojGostijuPoDanima/:korisnickoIme', controller.getBrojGostijuPoDanima);
rezervacijaRouter.get('/rezervacije24', controller.getRez24h);
rezervacijaRouter.get('/rezervacije1m', controller.getRez1m);
rezervacijaRouter.get('/all', controller.getAll);
exports.default = rezervacijaRouter;
