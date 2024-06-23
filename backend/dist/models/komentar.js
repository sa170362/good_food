"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const KomentarSchema = new Schema({
    autor: { type: String, required: true },
    tekst: { type: String, required: true },
    ocena: { type: Number, required: true },
    datum: { type: Date, default: Date.now },
    ime: { type: String, required: true }
});
const Komentar = mongoose_1.default.model("Komentar", KomentarSchema, "komentari");
exports.default = Komentar;
