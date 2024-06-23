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
exports.KomentarController = void 0;
const komentar_1 = __importDefault(require("../models/komentar"));
const restoran_1 = __importDefault(require("../models/restoran"));
class KomentarController {
    constructor() {
        // Kreiranje komentara
        this.kreirajKomentar = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { autor, tekst, ocena, restoranId } = req.body;
            const noviKomentar = new komentar_1.default({ autor, tekst, ocena });
            try {
                const savedComment = yield noviKomentar.save();
                yield restoran_1.default.findByIdAndUpdate(restoranId, { $push: { komentari: savedComment._id } });
                res.status(201).json(savedComment);
            }
            catch (err) {
                console.error(err);
                res.status(400).json({ message: 'Failed to save comment' });
            }
        });
        this.getKomentarByIme = (req, res) => {
            const ime = req.params.ime;
            restoran_1.default.findOne({ ime: ime })
                .populate('komentari') // Ovo će popuniti komentare na osnovu ID-jeva koji su u polju komentari u Restoran modelu
                .exec()
                .then((restoran) => {
                if (!restoran) {
                    return res.status(404).json({ message: 'Restoran nije pronađen' });
                }
                const komentari = restoran.komentari; // Mongoose će vratiti komentare kao niz ID-jeva, pa ih treba konvertovati
                res.json(komentari);
            })
                .catch((err) => {
                console.error('Greška pri dohvatanju komentara:', err);
                res.status(500).json({ message: 'Greška pri dohvatanju komentara', error: err });
            });
        };
    }
}
exports.KomentarController = KomentarController;
