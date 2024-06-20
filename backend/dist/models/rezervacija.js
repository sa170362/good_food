"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const reservationSchema = new Schema({
    korisnickoIme: { type: String, required: true },
    imeGosta: { type: String, required: true },
    datumVremeRezervacije: { type: Date, required: true },
    brojGostiju: { type: Number, required: true },
    komentarGosta: { type: String },
    statusRezervacije: { type: String },
    razlogOdbijanja: { type: String },
    brojStola: { type: Number },
    datumKreiranja: { type: Date, default: Date.now }
});
exports.default = mongoose_1.default.model('Rezervacija', reservationSchema, "rezervacije");
