import mongoose from "mongoose";

const Schema = mongoose.Schema;

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

const RestoranModel = mongoose.model("Restoran", RestoranSchema, "restorani");

export default RestoranModel;
