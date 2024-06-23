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
        this.getAllNeobradjeneRezervacije = (req, res) => {
            rezervacija_1.default.find({ statusRezervacije: 'neobradjena' })
                .sort({ datumVremeRezervacije: 1 })
                .then(rezervacije => res.json(rezervacije))
                .catch(err => {
                console.error(err);
                res.status(500).json({ message: "Greška pri dohvatanju rezervacija" });
            });
        };
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
        // Kreiranje rezervacije
        this.kreirajRezervaciju = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { korisnickoIme, imeGosta, datumVremeRezervacije, brojGostiju, komentarGosta, brojStola } = req.body;
            const novaRezervacija = new rezervacija_1.default({
                korisnickoIme,
                imeGosta,
                datumVremeRezervacije: new Date(datumVremeRezervacije),
                brojGostiju,
                komentarGosta,
                brojStola,
                statusRezervacije: 'pending'
            });
            try {
                const savedReservation = yield novaRezervacija.save();
                res.status(201).json(savedReservation);
            }
            catch (err) {
                res.status(400).json();
            }
        });
        // Otkazivanje rezervacije
        this.otkaziRezervaciju = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { imeGosta, datumVremeRezervacije } = req.body;
            try {
                const datum = new Date(datumVremeRezervacije);
                const rezervacija = yield rezervacija_1.default.findOneAndDelete({ imeGosta, datumVremeRezervacije: datum });
                if (!rezervacija) {
                    return res.status(404).json({ message: 'Rezervacija nije pronađena' });
                }
                res.json({ message: 'Rezervacija otkazana' });
            }
            catch (err) {
                res.status(500).json();
            }
        });
    }
    getBrojGostijuPoDanima(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
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
                console.log(data);
            }
            catch (err) {
                console.error(err);
                res.status(500).json({ message: 'Greška prilikom dobijanja statističkih podataka.' });
            }
        });
    }
}
exports.RezervacijaController = RezervacijaController;
;
