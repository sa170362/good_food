"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const RestoranSchema = new Schema({
    ime: {
        type: String,
        required: true,
    },
    adresa: {
        type: String,
        required: true,
    },
    tip: {
        type: String,
        enum: ['kineski', 'indiski', 'japanski', 'domaća kuhinja', 'italijanski', 'francuski'],
        required: true,
    }
});
const RestoranModel = mongoose_1.default.model("Restoran", RestoranSchema, "restorani");
exports.default = RestoranModel;
