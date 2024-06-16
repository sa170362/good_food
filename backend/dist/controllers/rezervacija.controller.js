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
exports.RezervacijaController = void 0;
const rezervacija_1 = __importDefault(require("../models/rezervacija"));
class RezervacijaController {
    constructor() {
        // Metoda za dobavljanje svih neobradjenih rezervacija, sortiranih po datumu
        this.getAllNeobradjeneRezervacije = (req, res) => {
            rezervacija_1.default.find({ statusRezervacije: 'neobradjena' })
                .sort({ datumVremeRezervacije: 1 }) // sortiranje od najskorijih ka najstarijim
                .then(rezervacije => res.json(rezervacije))
                .catch(err => {
                console.error(err);
                res.status(500).json({ message: "Greška pri dohvatanju rezervacija" });
            });
        };
        // Potvrđivanje rezervacije
        this.confirmReservation = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const imeGosta = decodeURIComponent(req.params.imeGosta);
            const { brojStola } = req.body;
            try {
                const rezervacija = yield rezervacija_1.default.findOneAndUpdate({ imeGosta, statusRezervacije: 'neobradjena' }, { statusRezervacije: 'obradjena', brojStola }, { new: true });
                if (rezervacija) {
                    res.json(rezervacija);
                }
                else {
                    res.status(404).json({ message: 'Rezervacija nije pronađena ili već obrađena.' });
                }
            }
            catch (err) {
                console.error(err);
                res.status(500).json({ message: 'Greška pri potvrđivanju rezervacije' });
            }
        });
        // Odbijanje rezervacije
        this.rejectReservation = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const imeGosta = decodeURIComponent(req.params.imeGosta);
            const { brojStola, razlogOdbijanja } = req.body;
            try {
                const rezervacija = yield rezervacija_1.default.findOneAndUpdate({ imeGosta, statusRezervacije: 'neobradjena' }, { statusRezervacije: 'obradjena', razlogOdbijanja, brojStola }, { new: true });
                if (rezervacija) {
                    res.json(rezervacija);
                }
                else {
                    res.status(404).json({ message: 'Rezervacija nije pronađena ili već obrađena.' });
                }
            }
            catch (err) {
                console.error(err);
                res.status(500).json({ message: 'Greška pri odbijanju rezervacije' });
            }
        });
    }
}
exports.RezervacijaController = RezervacijaController;
;
