"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const TableSchema = new Schema({
    id: String,
    x: Number,
    y: Number,
    radius: Number,
    maxPeople: Number,
});
const RectangleSchema = new Schema({
    id: String,
    x: Number,
    y: Number,
    width: Number,
    height: Number,
});
const LayoutSchema = new Schema({
    tables: [TableSchema],
    kitchen: RectangleSchema,
    restroom: RectangleSchema,
});
const RestoranSchema = new Schema({
    ime: {
        type: String,
        required: true,
        unique: true,
    },
    adresa: {
        type: String,
        required: true,
    },
    tip: {
        type: String,
        enum: ['kineski', 'indiski', 'japanski', 'domaća kuhinja', 'italijanski', 'francuski'],
        required: true,
    },
    kratakOpis: { type: String },
    kontaktOsoba: {
        type: String
    },
    telefon: { type: String },
    workingHoursFrom: { type: String },
    workingHoursTo: { type: String },
    layout: LayoutSchema,
    ocena: { type: Number, default: 0 },
    komentari: [{ type: Schema.Types.ObjectId, ref: 'Komentar' }]
});
const RestoranModel = mongoose_1.default.model("Restoran", RestoranSchema, "restorani");
exports.default = RestoranModel;
