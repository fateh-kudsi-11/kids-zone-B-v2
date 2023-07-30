import mongoose, { Document, model, Schema } from "mongoose";

interface IPaymentMethod {
  cardNumber: string;
  month: string;
  year: string;
  cardName: string;
  user: string;
  createdAt: Number;
}

export interface TPaymentMethod extends IPaymentMethod, Document {}

const PaymentMethodSchema: Schema<TPaymentMethod> = new mongoose.Schema({
  cardNumber: {
    type: String,
    required: [true, "Plesae Enter card Number"],
  },
  month: {
    type: String,
    required: [true, "Plesae Enter month"],
  },

  year: {
    type: String,
    required: [true, "Please add a year"],
  },

  cardName: {
    type: String,
    required: [true, "Please add a Card name"],
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

const PaymentMethod = model<TPaymentMethod>(
  "PaymentMethod",
  PaymentMethodSchema
);

export default PaymentMethod;
