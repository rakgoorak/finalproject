const mongoose = require("mongoose");
const { Schema, ObjectId } = mongoose; // Importing Schema and ObjectId from Mongoose

const editProductDetailSchema = Schema(
  {
    editproductById: [
      {
        type: ObjectId,
        ref: "user",
      },
    ],
    editProductId: {
      type: String,
      ref: "product",
    },
    editproductDetail: {
      type: String,
    },
    editedTime: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("editproductDetail", editProductDetailSchema);
