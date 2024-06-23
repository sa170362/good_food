"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const PorudzbinaSchema = new Schema({
    customer: { type: String, required: true },
    customerkorIme: { type: String },
    restoran: { type: String, required: true },
    items: [{ name: String, quantity: Number }],
    status: { type: String, enum: ['pending', 'confirmed', 'rejected'], default: 'pending' },
    estimatedDeliveryTime: { type: String, enum: ['20-30 minutes', '30-40 minutes', '50-60 minutes'], default: null },
    createdAt: { type: Date, default: Date.now }
});
exports.default = mongoose_1.default.model("Porudzbina", PorudzbinaSchema, "porudzbine");
