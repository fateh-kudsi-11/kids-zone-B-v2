import mongoose, { Document, model, Schema } from "mongoose";

interface IWishList {
  products: string[];
  user: string;
  createdAt: Number;
}

export interface TWishList extends IWishList, Document {}

const WishListSchema: Schema<TWishList> = new mongoose.Schema({
  products: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Products" }],
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

const WishList = model<TWishList>("WishList", WishListSchema);

export default WishList;
