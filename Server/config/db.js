const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const uri = process.env.DATABASEDEPLOY || 'mongodb+srv://rakgorak:Lr6BhgkKdI0VXPkY@cluster0.iwhsxw0.mongodb.net/db_elect';
    await mongoose.connect(uri);
    console.log("DB Connected");
  } catch (err) {
    console.error(err);
  }
};

module.exports = connectDB;

// const mongoose = require("mongoose");

// const connectDB = async () => {
//   try {
//     await mongoose.connect("mongodb://127.0.0.1:27017/elect");
//     console.log("DB Connected");
//   } catch (err) {
//     console.log(err);
//   }
// };

// module.exports = connectDB;
