const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema;

const userSchema = mongoose.Schema({
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
    fulladdress: {
        houseNumber: String,
        subdistrict: String,
        district: String,
        province: String,
        zipcode: String,
    },
    phoneNumber: String,
    name: String,
    cart: [{
        type: ObjectId,
        ref: 'cart'
    }],
    wishlist: [{
        type: ObjectId,
        ref: 'product'
    }],
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
}, { timestamps: true })

module.exports = mongoose.model('users', userSchema)
