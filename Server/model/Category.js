const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const CategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    products: [
      {
        product: {
          type: ObjectId,
          ref: "product",
        },
        name: String,
      },
    ],
  },
  { timestamps: true }
);

module.exports = Category = mongoose.model("category", CategorySchema);
