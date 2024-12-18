import mongoose from "mongoose";

export const connectMongoDB = async () => {
  try {
      mongoose.connect("mongodb://localhost:27017/e-commerce")
      console.log("MongoDB connected");
  } catch (error) {
    console.log(`Error: ${error}`);
  }
}