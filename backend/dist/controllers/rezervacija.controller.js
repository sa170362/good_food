"use strict";
// controllers/rezervacija.controller.ts
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
        this.getNeobradjeneRezervacije = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const neobradjeneRezervacije = yield rezervacija_1.default.find({ potvrdjenaRezervacija: false })
                    .sort({ datumVremeRezervacije: 1 }); // 1 za rastući redosled
                res.json(neobradjeneRezervacije);
            }
            catch (err) {
                console.error("Greška pri dohvatanju neobrađenih rezervacija:", err);
                res.status(500).json({ message: "Greška pri dohvatanju neobrađenih rezervacija" });
            }
        });
        // Metoda za potvrdu ili odbijanje rezervacije
        this.potvrdiRezervaciju = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { potvrdjena, razlogOdbijanja } = req.body;
            try {
                const rezervacija = yield rezervacija_1.default.findById(id);
                if (!rezervacija) {
                    res.status(404).json({ message: "Rezervacija nije pronađena" });
                    return;
                }
                if (potvrdjena) {
                    rezervacija.potvrdjenaRezervacija = true;
                    rezervacija.brojStola = 123; // Primer: Postavljamo broj stola na osnovu nekog algoritma
                }
                else {
                    rezervacija.potvrdjenaRezervacija = false;
                    rezervacija.razlogOdbijanja = razlogOdbijanja;
                    rezervacija.brojStola = undefined; // Ako se odbija, stol je ponovo slobodan
                }
                yield rezervacija.save();
                res.json(rezervacija);
            }
            catch (err) {
                console.error("Greška pri potvrđivanju/odbijanju rezervacije:", err);
                res.status(500).json({ message: "Greška pri potvrđivanju/odbijanju rezervacije" });
            }
        });
    }
}
exports.RezervacijaController = RezervacijaController;
