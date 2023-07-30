import mongoose, { Document, model, Schema } from "mongoose";

interface IOrderItem {
  products: string;
  quantity: number;
  selectedColor: string;
  selectedSize: string;
  createdAt: Number;
}

export interface TOrderItem extends IOrderItem, Document {}

const OrderItemSchema: Schema<TOrderItem> = new mongoose.Schema({
  products: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Products",
    required: [true, "Please Add product id"],
  },
  quantity: {
    type: Number,
    default: 1,
  },
  selectedColor: {
    type: String,
    required: [true, "Please Add Selected Color"],
  },
  selectedSize: {
    type: String,
    required: [true, "Please Add Selected Size"],
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const OrderItem = model<TOrderItem>("OrderItem", OrderItemSchema);

export default OrderItem;
