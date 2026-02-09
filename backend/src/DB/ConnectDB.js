import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const ConnectDB = async () => {
  try {
    mongoose.connection.on("connected", () => {
      console.log("database commected successfully");
    });
    await mongoose.connect(process.env.MONGO_URI);
  } catch (error) {
    console.log(error);

    console.error("Database connection failed!");
  }
};

export default ConnectDB;
