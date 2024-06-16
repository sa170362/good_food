"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let KorisnikSchema = new Schema({
    ime: {
        type: String,
    },
    prezime: {
        type: String,
    },
    korisnickoIme: {
        type: String,
        unique: true,
    },
    lozinka: {
        type: String,
    },
    mejl: {
        type: String,
        unique: true,
    },
    opstina: {
        type: String,
    },
    tip: {
        type: String,
    },
    sigurnosnoPitanje: {
        type: String,
    },
    sigurnosniOdgovor: {
        type: String,
    },
    pol: {
        type: String,
    },
    adresa: {
        type: String,
    },
    kontaktTelefon: {
        type: String,
    },
    profilnaSlikaUrl: {
        type: String,
    },
    brojKreditneKartice: {
        type: String,
    },
});
exports.default = mongoose_1.default.model("Korisnik", KorisnikSchema, "korisnici");
