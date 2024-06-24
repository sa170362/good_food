import mongoose from "mongoose";

const Schema = mongoose.Schema;

const PorudzbinaSchema = new Schema({
  customer: { type: String, required: true },
  stavke: [{ type: mongoose.Schema.Types.ObjectId, ref: 'CartItem', required: true }],
  ukupnaCena: { type: Number, required: true },
  status: { type: String, enum: ['pending', 'confirmed', 'rejected'], default: 'pending' },
  estimatedDeliveryTime: { type: String, enum: ['20-30 minutes', '30-40 minutes', '50-60 minutes'], default: null },
  createdAt: { type: Date, default: Date.now },
  adresaDostave: { type: String, required: true },
  kontaktTelefon: { type: String, required: true },
});

export default mongoose.model("Porudzbina", PorudzbinaSchema, "porudzbine");
