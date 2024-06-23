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
            const restoran = decodeURIComponent(req.params.restoran);
            rezervacija_1.default.find({ statusRezervacije: 'neobradjena', restoran: restoran })
                .sort({ datumVremeRezervacije: -1 })
                .then(rezervacije => res.json(rezervacije))
                .catch(err => {
                console.error(err);
                res.status(500).json({ message: "Greška pri dohvatanju rezervacija" });
            });
        };
        //  confirmReservation = async (req: Request, res: Response): Promise<void> => {
        //   const imeGosta = decodeURIComponent(req.params.imeGosta);
        //   const { brojStola } = req.body;
        //   try {
        //     const rezervacija = await Rezervacija.findOneAndUpdate(
        //       { imeGosta, statusRezervacije: 'neobradjena' },
        //       { statusRezervacije: 'obradjena', brojStola },
        //       { new: true }
        //     );
        //     if (rezervacija) {
        //       res.json(rezervacija);
        //     } else {
        //       res.status(404).json({ message: 'Rezervacija nije pronađena ili već obrađena.' });
        //     }
        //   } catch (err) {
        //     console.error(err);
        //     res.status(500).json({ message: 'Greška pri potvrđivanju rezervacije' });
        //   }
        // };
        this.confirmReservation = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const imeGosta = decodeURIComponent(req.params.imeGosta);
            const { brojStola } = req.body;
            const korisnickoImeKonobara = decodeURIComponent(req.params.korisnickoImeKonobara); // Dodajemo ovde
            try {
                const rezervacija = yield rezervacija_1.default.findOneAndUpdate({ imeGosta, statusRezervacije: 'neobradjena' }, { statusRezervacije: 'obradjena', brojStola, konobar: korisnickoImeKonobara }, // Dodajemo konobar
                { new: true });
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
        this.getRez1m = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                // Računamo datum pre mesec dana od trenutnog datuma
                const datumPreMesecDana = new Date();
                datumPreMesecDana.setMonth(datumPreMesecDana.getMonth() - 1);
                // Upit za pronalaženje rezervacija koje su napravljene u poslednjih mesec dana
                const rezervacije = yield rezervacija_1.default.find({
                    datumVremeRezervacije: { $gte: datumPreMesecDana }
                });
                res.status(200).json(rezervacije);
            }
            catch (error) {
                console.error('Greška pri pronalaženju rezervacija:', error);
                res.status(500).json({ message: 'Greška pri pronalaženju rezervacija', error });
            }
        });
        this.getAll = (req, res) => {
            rezervacija_1.default.find()
                .then(rezervacije => res.json(rezervacije))
                .catch(err => {
                console.error(err);
                res.status(500).json({ message: "Greška pri dohvatanju rezervacija" });
            });
        };
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
    getRez24h(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Prvo izračunavamo vreme pre 24 sata u odnosu na trenutno vreme
                const danas = new Date();
                const pre24h = new Date(danas.getTime() - (24 * 60 * 60 * 1000));
                console.log(danas);
                console.log(pre24h);
                // Tražimo sve rezervacije kreirane u poslednjih 24 sata
                const rezervacije = yield rezervacija_1.default.find({
                    datumVremeRezervacije: { $gte: pre24h, $lt: danas } // $gte znači veće ili jednako, $lt znači manje od
                });
                res.json(rezervacije);
            }
            catch (error) {
                console.error('Greška pri dobijanju rezervacija:', error);
                res.status(500).json({ message: 'Greška pri dobijanju rezervacija', error: error });
            }
        });
    }
}
exports.RezervacijaController = RezervacijaController;
;
