"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const narudzbina_controller_1 = require("../controllers/narudzbina.controller");
const narudzbinaRouter = express_1.default.Router();
const narudzbinaController = new narudzbina_controller_1.NarudzbinaController();
// Definicija ruta za narudžbine
narudzbinaRouter.get('/', narudzbinaController.getOrders);
narudzbinaRouter.put('/confirm/:customer', narudzbinaController.confirmOrder);
narudzbinaRouter.put('/reject/:customer', narudzbinaController.rejectOrder);
exports.default = narudzbinaRouter;
