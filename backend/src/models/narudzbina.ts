import mongoose from "mongoose";

const Schema = mongoose.Schema;

const PorudzbinaSchema = new Schema({
  customer: { type: String, required: true },
  customerkorIme: { type: String},
  restoran: { type: String, required: true },
  items: [{ name: String, quantity: Number }],
  status: { type: String, enum: ['pending', 'confirmed', 'rejected'], default: 'pending' },
  estimatedDeliveryTime: { type: String, enum: ['20-30 minutes', '30-40 minutes', '50-60 minutes'], default: null },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Porudzbina", PorudzbinaSchema, "porudzbine");
