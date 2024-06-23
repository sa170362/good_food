"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const restoran_controller_1 = require("../controllers/restoran.controller");
const restoranRouter = express_1.default.Router();
const restoranController = new restoran_controller_1.RestoranController();
// Definicija ruta za REST API operacije nad restoranima
restoranRouter.get('/', restoranController.getAllRestorani);
restoranRouter.post('/add', restoranController.addRestoran);
restoranRouter.post('/:ime/save-layout', restoranController.saveLayoutForRestoran);
restoranRouter.get('/name/:ime', restoranController.getRestoranByName);
// Dodajte ostale rute za dodavanje, brisanje, izmenu restorana ako je potrebno
exports.default = restoranRouter;
