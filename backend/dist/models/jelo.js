"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const JeloSchema = new Schema({
    naziv: { type: String, required: true },
    slika: { type: String, required: true },
    cena: { type: Number, required: true },
    sastojci: { type: [String], required: true },
    // restoran: { type: mongoose.Schema.Types.ObjectId, ref: 'Restoran', required: true }
});
exports.default = mongoose_1.default.model("Jelo", JeloSchema, "jela");
