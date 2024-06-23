import mongoose from "mongoose";

const Schema = mongoose.Schema;

const KomentarSchema = new Schema({
  autor: { type: String, required: true },
  tekst: { type: String, required: true },
  ocena: { type: Number, required: true },
  datum: { type: Date, default: Date.now },
  ime: {type: String, required: true}
});

const Komentar = mongoose.model("Komentar", KomentarSchema, "komentari");

export default Komentar;
