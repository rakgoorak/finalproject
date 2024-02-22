const mongoose = require("mongoose");

const connectDB = async () => {
  try {
      const uri = process.env.DATABASEDEPLOY || 'mongodb+srv://rakgorak:Lr6BhgkKdI0VXPkY@cluster0.iwhsxw0.mongodb.net/db_elect';
      await mongoose.connect(uri);
      console.log("DB Connected");
  } catch (err) {
      console.error(err);
      process.exit(1);
  }
};

module.exports = connectDB;
