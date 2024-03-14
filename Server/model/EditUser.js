const mongoose = require("mongoose");
const { Schema, ObjectId } = mongoose; // Importing Schema and ObjectId from Mongoose

const editUserDetailSchema = Schema(
  {
    editUserById: [
      {
        type: ObjectId,
        ref: "user",
      },
    ],
    editUserId: {
      type: String,
    },
    editUserDetail: {
      type: String,
    },
    editedTime: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("editUserDetail", editUserDetailSchema);
