const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const OrderSchema = new mongoose.Schema(
    {
        products: [
            {
                product: {
                    type: ObjectId,
                    ref: "product",
                },
                name: String,
                count: Number,
                price: Number,
            },
        ],
        cartTotal: Number,
        fulladdress: {
            houseNumber: String,
            subdistrict: String,
            district: String,
            province: String,
            zipcode: String,
        },
        phoneNumber: String,
        name: String,
        orderstatus: {
            type: String,
            default: "Processing",
        },
        orderBy: {
            type: ObjectId,
            ref: "users",
        },
        images: {
            type: Array,
        },
    },
    { timestamps: true }
);

module.exports = Order = mongoose.model("order", OrderSchema);