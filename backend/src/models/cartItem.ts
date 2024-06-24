  import mongoose from "mongoose";

  const Schema = mongoose.Schema;

  const CartItemSchema = new Schema({
    jelo: { type: mongoose.Schema.Types.ObjectId, ref: 'Jelo' },
    kolicina: { type: Number }
  });

  export default mongoose.model("CartItem", CartItemSchema, "stavkeKorpe");
