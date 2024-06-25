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
exports.JelaKontroler = void 0;
const jelo_1 = __importDefault(require("../models/jelo"));
class JelaKontroler {
    constructor() {
        // Dohvatanje svih jela
        this.svaJela = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const jela = yield jelo_1.default.find();
                res.status(200).send(jela);
            }
            catch (error) {
                res.status(500).send(error);
            }
        });
    }
    // Dodavanje novog jela
    dodajJelo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const novoJelo = new jelo_1.default({
                    naziv: req.body.naziv,
                    slika: req.body.slika,
                    cena: req.body.cena,
                    sastojci: req.body.sastojci
                }); // Kreiranje novog objekta Jelo
                yield novoJelo.save(); // Čekanje dok se jelo ne sačuva u bazi
                res.status(201).send(novoJelo); // Slanje odgovora sa statusom 201 (Created) i podacima novog jela
            }
            catch (error) {
                console.error('Greška prilikom dodavanja jela:', error);
                res.status(400).send(error); // Slanje greške ako se desi problem pri čuvanju jela
            }
        });
    }
}
exports.JelaKontroler = JelaKontroler;
