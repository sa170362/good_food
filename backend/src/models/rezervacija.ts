import mongoose from "mongoose";

const Schema = mongoose.Schema;

const reservationSchema = new Schema({
  imeGosta: { type: String, required: true },
  datumVremeRezervacije: { type: Date, required: true },
  brojGostiju: { type: Number, required: true }, 
  komentarGosta: { type: String },
  statusRezervacije: { type: String },
  razlogOdbijanja: { type: String },
  brojStola: { type: Number },
  datumKreiranja: { type: Date, default: Date.now } 
});

export default mongoose.model('Rezervacija', reservationSchema, "rezervacije");