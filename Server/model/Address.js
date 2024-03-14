const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const addressSchema = mongoose.Schema(
  {
    fulladdress: {
      houseNumber: String,
      subdistrict: String,
      district: String,
      province: String,
      zipcode: String,
    },
    phoneNumber: String,
    name: String,
    addressBy: {
      type: ObjectId,
      ref: "users",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("address", addressSchema);
