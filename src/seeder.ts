import fs from "fs";
import colors from "colors";
import connectDB from "./config/db.js";
import Product from "./models/Product.js";
import { config } from "dotenv";

config();
connectDB();

// Read JSON file
const products = JSON.parse(fs.readFileSync(`data/data.json`, "utf8"));

// Import Data
const importData = async () => {
  try {
    await Product.create(products);
    console.log("Data Imported....".green.inverse);
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

// Delete Data
const deleteData = async () => {
  try {
    await Product.deleteMany();
    console.log("Data Destroyed....".red.inverse);
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

if (process.argv[2] === "-i") {
  importData();
} else if (process.argv[2] === "-d") {
  deleteData();
}
