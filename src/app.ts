import { config } from "dotenv";
import express, { Application } from "express";
import connectDB from "./config/db";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import { red } from "colors";
import errorHandler from "./middleware/errorHandelr";
import product from "./routes/product";
import user from "./routes/user";
import addressbook from "./routes/addressBook";
import paymentMethod from "./routes/paymentMethod";
import wishList from "./routes/wishList";
import bag from "./routes/bag";
const path = require("path");
const colros = require("colors");

config();
connectDB();

const app: Application = express();

// Body parser
app.use(express.json());

// cors
app.use(cors());

app.use(helmet());

// Dev logging middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Mount Routes
app.use("/api/v1/products", product);
app.use("/api/v1/user", user);
app.use("/api/v1/addressbook", addressbook);
app.use("/api/v1/paymentMethod", paymentMethod);
app.use("/api/v1/wishList", wishList);
app.use("/api/v1/bag", bag);

// Set static folder
app.use(express.static(path.join(__dirname, "../public")));

app.use(errorHandler);

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`.bgGreen);
});

// Handle unhandled Promise rejections

process.on("unhandledRejection", (err: Error, promise) => {
  console.log(`Error:${err.message}`.red);
  // Close server & Exit Process
  server.close(() => process.exit(1));
});
