"use strict";
// routes/rezervacija.router.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const rezervacija_controller_1 = require("../controllers/rezervacija.controller");
const rezervacijaRouter = express_1.default.Router();
const controller = new rezervacija_controller_1.RezervacijaController();
// GET ruta za dohvatanje svih neobrađenih rezervacija
rezervacijaRouter.get("/neobradjene", controller.getNeobradjeneRezervacije);
// PUT ruta za potvrdu ili odbijanje rezervacije
rezervacijaRouter.put("/:imeGosta", controller.potvrdiRezervaciju);
exports.default = rezervacijaRouter;
