import mongoose, { Document, model, Schema } from "mongoose";

interface IBag {
  OrderItem: string[];
  user: string;
  createdAt: Number;
}

export interface TBag extends IBag, Document {}

const BagSchema: Schema<TBag> = new mongoose.Schema({
  OrderItem: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "OrderItem" }],
    default: [],
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Please Add user ID"],
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Bag = model<TBag>("Bag", BagSchema);

export default Bag;
