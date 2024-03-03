// Import necessary modules
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const address = require("./Address");

// Define user schema
const userSchema = mongoose.Schema(
    {
        username: {
            type: String,
        },
        password: {
            type: String,
        },
        role: {
            type: String,
            default: "user",
        },
        enabled: {
            type: Boolean,
            default: false,
        },
        addresses: [
            {
                type: ObjectId,
                ref: "address", // Reference the address model
            },
        ],
        phoneNumber: [
            {
                type: ObjectId,
                ref: "address", // Reference the address model
            },
        ],
        name: [
            {
                type: ObjectId,
                ref: "address", // Reference the address model
            },
        ],
        cart: [
            {
                type: ObjectId,
                ref: "cart",
            },
        ],
        wishlist: [
            {
                type: ObjectId,
                ref: "product",
            },
        ],
        editUserTime: {
            type: Date,
            default: null,
        },
        editProductTime: {
            type: Date,
            default: null,
        },
        editOrderTime: {
            type: Date,
            default: null,
        },
    },
    { timestamps: true }
);

// Export the User model
module.exports = mongoose.model("users", userSchema);