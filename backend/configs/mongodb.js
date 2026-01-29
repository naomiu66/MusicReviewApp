const mongoose = require("mongoose");
require("dotenv").config();
const MONGO_URI = process.env.MONGO_URI;

const connectDb = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("MongoDb connected");
  } catch (err) {
    console.error("Connection to MongoDb failed", err);
  }
};

module.exports = connectDb;
