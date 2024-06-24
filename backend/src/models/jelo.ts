import mongoose from "mongoose";

const Schema = mongoose.Schema;

const JeloSchema = new Schema({
  naziv: { type: String, required: true },
  slika: { type: String, required: true },
  cena: { type: Number, required: true },
  sastojci: { type: [String], required: true },
  // restoran: { type: mongoose.Schema.Types.ObjectId, ref: 'Restoran', required: true }
});

export default mongoose.model("Jelo", JeloSchema, "jela");
