import mongoose from "mongoose";

const Schema = mongoose.Schema;
const JeloSchema = new Schema({
  naziv: { type: String },
  slika: { type: String },
  cena: { type: Number },
  sastojci: { type: [String] },
  // restoran: { type: mongoose.Schema.Types.ObjectId, ref: 'Restoran', required: true }
});
const PorudzbinaSchema = new Schema({
  customerKorIme: { type: String, required: true },
  stavke: [{
    jelo: JeloSchema,
    kolicina: { type: Number, required: true }
  }],
  restoran: { type: String },
  // items: [{ name: String, quantity: Number }],
  status: { type: String, enum: ['pending', 'confirmed', 'rejected'], default: 'pending' },
  estimatedDeliveryTime: { type: String, enum: ['20-30 minutes', '30-40 minutes', '50-60 minutes'], default: null },
  createdAt: { type: Date, default: Date.now },
  ukupnaCena:{ type: String, required: true },
  adresaDostave:{ type: String, required: true },
  kontaktTelefon:{ type: String, required: true }
});

export default mongoose.model("Porudzbina", PorudzbinaSchema, "porudzbine");
