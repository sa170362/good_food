"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const narudzbina_controller_1 = require("../controllers/narudzbina.controller");
const narudzbinaRouter = express_1.default.Router();
const narudzbinaController = new narudzbina_controller_1.NarudzbinaController();
narudzbinaRouter.get('/confirmed/:restoran', narudzbinaController.getConfirmedOrders);
narudzbinaRouter.get('/rejected/:restoran', narudzbinaController.getRejectedOrders);
narudzbinaRouter.get('/:restoran', narudzbinaController.getOrders);
narudzbinaRouter.put('/confirm/:customerkorIme', narudzbinaController.confirmOrder);
narudzbinaRouter.put('/reject/:customerkorIme', narudzbinaController.rejectOrder);
narudzbinaRouter.get('/svePorudzbine', narudzbinaController.svePorudzbine);
narudzbinaRouter.post('/kreiraj', narudzbinaController.kreirajPorudzbinu);
exports.default = narudzbinaRouter;
