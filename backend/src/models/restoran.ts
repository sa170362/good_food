import mongoose from "mongoose";

const Schema = mongoose.Schema;
const TableSchema = new Schema({
  id: String,
  x: Number,
  y: Number,
  radius: Number,
  maxPeople: Number,
});

const RectangleSchema = new Schema({
  id: String,
  x: Number,
  y: Number,
  width: Number,
  height: Number,
});

const LayoutSchema = new Schema({
  tables: [TableSchema],
  kitchen: RectangleSchema,
  restroom: RectangleSchema,
});
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
  },
  kratakOpis:{type:String},
  kontaktOsoba: {
    type: String
   
  },
  workingHoursFrom: {type:String},
  workingHoursTo: {type:String},
  layout: LayoutSchema
});

const RestoranModel = mongoose.model("Restoran", RestoranSchema, "restorani");

export default RestoranModel;
