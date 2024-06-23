import mongoose from "mongoose";

const Schema = mongoose.Schema;

let KorisnikSchema = new Schema({
  ime: {
    type: String,
  },
  prezime: {
    type: String,
  },
  korisnickoIme: {
    type: String,
    unique: true,
  },
  lozinka: {
    type: String,
  },
  mejl: {
    type: String,
    unique: true,
  },
  tip: {
    type: String,
  },
  sigurnosnoPitanje: {
    type: String,
  },
  sigurnosniOdgovor: {
    type: String,
  },
  pol: {
    type: String,
  },
  adresa: {
    type: String,
  },
  kontaktTelefon: {
    type: String,
  },
  profilnaSlikaUrl: {
    type: String,
  },
  profilnaSlika: {
    type: String,
  },
  brojKreditneKartice: {
    type: String,
  },
  status: {
    type: String,
  },
  restoran: {
    type: String,
  },
});

export default mongoose.model("Korisnik", KorisnikSchema, "korisnici");
