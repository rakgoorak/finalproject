const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema
const productSchema = new mongoose.Schema(

    {
        id: {
            type: Number,
        },
        name: {
            type: String,
            text: true, // Enable text indexing for the 'name' field
        },
        detail: {
            type: String,
        },
        category: {
            type: ObjectId,
            ref: "category"
        },
        price: {
            type: Number
        },
        images: {
            type: Array,
        },
        sold: {
            type: Number,
            default: 0
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("product", productSchema);