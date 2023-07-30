import mongoose from "mongoose";

const connectDB = async () => {
  if (!process.env.MONG_URI) {
    console.log("Please provide database uri".red.inverse);
    return process.exit(1);
  }
  //  mongoose.set("strictQuery", false);
  const conn = await mongoose.connect(process.env.MONG_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  });
  console.log(`MongoDB Connected: ${conn.connection.host}`.magenta.inverse);
};
export default connectDB;
