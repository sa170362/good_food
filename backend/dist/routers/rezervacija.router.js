"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const rezervacija_controller_1 = require("../controllers/rezervacija.controller");
const rezervacijaRouter = express_1.default.Router();
const controller = new rezervacija_controller_1.RezervacijaController();
rezervacijaRouter.get('/neobradjene', controller.getAllNeobradjeneRezervacije);
rezervacijaRouter.post('/potvrdi/:imeGosta', controller.confirmReservation);
rezervacijaRouter.post('/odbij/:imeGosta', controller.rejectReservation);
rezervacijaRouter.get('/brojGostijuPoDanima/:korisnickoIme', controller.getBrojGostijuPoDanima);
rezervacijaRouter.post('/rezervacije', controller.kreirajRezervaciju);
rezervacijaRouter.post('/otkazi', controller.otkaziRezervaciju);
exports.default = rezervacijaRouter;
