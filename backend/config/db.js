const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      "mongodb+srv://pankaj:khiladi@cluster0.pw05d.mongodb.net/?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("mongodb is connected successfully");
  } catch (error) {
    console.log(`error occured ${error.message}`);
    process.exit();
  }
};
// console.log('pankaj',process.env.MONGO_URI);
module.exports = connectDB;
