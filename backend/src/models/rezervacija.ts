import mongoose from "mongoose";

const Schema = mongoose.Schema;

const reservationSchema = new Schema({
    korisnickoIme: { type: String, required: true },
    imeGosta: { type: String, required: true },
    datumVremeRezervacije: { type: Date, required: true },
    brojGostiju: { type: Number, required: true },
    komentarGosta: { type: String },
    statusRezervacije: { type: String },
    razlogOdbijanja: { type: String },
    brojStola: { type: Number },
    datumKreiranja: { type: Date, default: Date.now },
    imeRestorana: { type: String }
}, { versionKey: false });

export default mongoose.model('Rezervacija', reservationSchema, "rezervacije");
