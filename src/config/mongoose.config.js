import mongoose from "mongoose";

const connectToMongoose = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/renters-db");
    console.log("Mongoose is connected Successfully!");
  } catch (err) {
    console.log("Something went wrong with DB");
  }
};

export default connectToMongoose;
