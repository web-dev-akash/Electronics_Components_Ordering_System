import mongoose from "mongoose";
import { config } from "dotenv";
config();
const MONGO_URL = process.env.MONGO_URL;
export const connect = async () => {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("Database Connected Successfully");
  } catch (error) {
    console.log(error);
  }
};
