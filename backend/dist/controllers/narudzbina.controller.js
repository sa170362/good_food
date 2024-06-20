"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NarudzbinaController = void 0;
const narudzbina_1 = __importDefault(require("../models/narudzbina"));
class NarudzbinaController {
    constructor() {
        // GET /narudzbine - Dobavlja sve narudžbine
        this.getOrders = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const orders = yield narudzbina_1.default.find();
                res.json(orders);
            }
            catch (err) {
                res.status(500).send(err);
            }
        });
        // PUT /narudzbine/confirm/:customer - Potvrđuje narudžbinu za određenog korisnika
        this.confirmOrder = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { customer } = req.params;
            const { estimatedDeliveryTime } = req.body;
            try {
                const orders = yield narudzbina_1.default.find({ customer });
                if (orders.length === 0) {
                    return res.status(404).send('Orders not found for the given customer');
                }
                for (let order of orders) {
                    order.status = 'confirmed';
                    order.estimatedDeliveryTime = estimatedDeliveryTime;
                    yield order.save();
                }
                res.json(orders);
            }
            catch (err) {
                res.status(500).send(err);
            }
        });
        // PUT /narudzbine/reject/:customer - Odbija narudžbinu za određenog korisnika
        this.rejectOrder = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { customer } = req.params;
            try {
                const orders = yield narudzbina_1.default.find({ customer });
                if (orders.length === 0) {
                    return res.status(404).send('Orders not found for the given customer');
                }
                for (let order of orders) {
                    order.status = 'rejected';
                    yield order.save();
                }
                res.json(orders);
            }
            catch (err) {
                res.status(500).send(err);
            }
        });
    }
}
exports.NarudzbinaController = NarudzbinaController;
