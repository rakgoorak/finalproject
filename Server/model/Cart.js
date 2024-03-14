const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const CartSchema = new mongoose.Schema(
    {
        products: [
            {
                product: {
                    type: ObjectId,
                    ref: 'product'
                },
                name: String,
                count: Number,
                price: Number
            }
        ],
        cartTotal: Number,
        orderBy: {
            type: ObjectId,
            ref: 'user'
        }
    },
    { timestamps: true }
);

module.exports = Cart = mongoose.model("cart", CartSchema);
