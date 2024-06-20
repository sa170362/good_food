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
exports.StatistikaController = void 0;
const rezervacija_1 = __importDefault(require("../models/rezervacija"));
class StatistikaController {
    constructor() {
        this.getBrojGostijuPoDanima = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { korisnickoIme } = req.params;
            try {
                const data = yield rezervacija_1.default.aggregate([
                    {
                        $match: { korisnickoIme, statusRezervacije: 'obradjena' }
                    },
                    {
                        $group: {
                            _id: { $dateToString: { format: '%Y-%m-%d', date: '$datumVremeRezervacije' } },
                            brojGostiju: { $sum: '$brojGostiju' }
                        }
                    },
                    {
                        $sort: { _id: 1 }
                    }
                ]);
                res.json(data);
            }
            catch (err) {
                console.error(err);
                res.status(500).json({ message: 'Greška prilikom dobijanja statističkih podataka.' });
            }
        });
    }
}
exports.StatistikaController = StatistikaController;
