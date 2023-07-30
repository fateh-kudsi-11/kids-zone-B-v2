import mongoose, { Document, model, Schema } from "mongoose";

type Igender = "boys" | "girls";
interface IProduct {
  gender: Igender;
  productName: string;
  brand: string;
  price: Number;
  size: string[];
  availableColor: string[];
  colors: IColor[];
  images: IImage[];
  description: string;
  details: string[];
  category: string;
  productType: string;
  productNumber: Number;
  createAt: Number;
  watchCount: Number;
}

interface IColor {
  colorName: string;
  colorCode: string;
}

interface IImage {
  imagesColor: string;
  images: string[];
}

const ColorSchema: Schema = new mongoose.Schema({
  colorName: {
    type: String,
    required: true,
  },
  colorCode: {
    type: String,
    required: true,
  },
});

const ImagesSchema: Schema = new mongoose.Schema({
  imagesColor: {
    type: String,
    required: true,
  },
  images: {
    type: [String],
    required: true,
  },
});

const ProductSchema: Schema = new mongoose.Schema({
  gender: {
    type: String,
    required: [true, "Please add Gender"],
    enum: ["boys", "girls"],
  },
  productName: {
    type: String,
    required: [true, "Please add a Product Name"],
    unique: true,
    trim: true,
    maxlength: [50, "Name can not be more than 50 characters"],
  },
  brand: {
    required: [true, "Please add a brand"],
    type: String,
  },
  price: {
    type: Number,
    required: [true, "Please add a price"],
  },

  size: {
    type: [String],
    required: [true, "Please add a sizes"],
  },
  availableColor: {
    type: [String],
    required: [true, "Please add an available Color"],
  },
  colors: {
    type: [ColorSchema],
    required: true,
  },
  images: {
    type: [ImagesSchema],
    required: true,
  },
  description: {
    type: String,
    required: [true, "please add a description"],
    maxlength: [500, "Description can not be more than 500 characters"],
  },
  details: {
    required: [true, "Please add a details"],
    type: [String],
  },
  category: {
    type: String,
    required: [true, "Please add a Category"],
  },
  productType: {
    type: String,
    required: [true, "Please add a Product Type"],
  },
  productNumber: {
    type: Number,
    required: [true, "Please add a Product Number"],
  },

  createAt: {
    type: Date,
    default: Date.now(),
  },
  watchCount: {
    type: Number,
    default: 0,
  },
});

export interface TProduct extends IProduct, Document {}

const Product = model<TProduct>("Products", ProductSchema);

export default Product;
