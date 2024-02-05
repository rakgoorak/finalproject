const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require('../model/User')
const Product = require('../model/Product')
const Cart = require('../model/Cart')
const Order = require('../model/Order')

exports.listUsers = async (req, res) => {
    try {
        // Code
        const user = await User.find({}).select("-password").exec();
        res.send(user);
    } catch (err) {
        console.log(err);
        res.status(500).send("Server Error!");
    }
};

exports.readUsers = async (req, res) => {
    try {
        // Code
        const id = req.params.id;
        const user = await User.findOne({ _id: id }).select("-password").exec();
        res.send(user);
    } catch (err) {
        console.log(err);
        res.status(500).send("Server Error!");
    }
};

exports.updateUsers = async (req, res) => {
    try {
        // Code
        var { id, password } = req.body.values
        // 1 gen salt
        const salt = await bcrypt.genSalt(10);
        // 2 encrypt
        var enPassword = await bcrypt.hash(password, salt);

        const user = await User.findOneAndUpdate(
            { _id: id },
            { password: enPassword }
        );
        res.send(user);
    } catch (err) {
        console.log(err);
        res.status(500).send("Server Error!");
    }
};

exports.removeUsers = async (req, res) => {
    try {
        // Code
        const id = req.params.id;
        const user = await User.findOneAndDelete({ _id: id });
        res.send(user);
    } catch (err) {
        console.log(err);
        res.status(500).send("Server Error!");
    }
};

exports.changeStatus = async (req, res) => {
    try {
        // Code
        console.log(req.body);
        const user = await User.findOneAndUpdate(
            { _id: req.body.id },
            { enabled: req.body.enabled }
        );
        res.send(user);
    } catch (err) {
        console.log(err);
        res.status(500).send("Server Error!");
    }
};

exports.changeRole = async (req, res) => {
    try {
        // Code
        console.log(req.body);
        const user = await User.findOneAndUpdate(
            { _id: req.body.id },
            { role: req.body.role }
        );
        res.send(user);
    } catch (err) {
        console.log(err);
        res.status(500).send("Server Error!");
    }
};
exports.userCart = async (req, res) => {
    try {
        // Destructure the cart array from the request body
        const { cart } = req.body;

        // Find the user based on the username in the request
        const user = await User.findOne({ username: req.user.username }).exec();

        // Initialize an empty array to store products
        let products = [];

        // Check if there is an existing cart for the user and remove it if present
        let cartOld = await Cart.findOne({ orderBy: user._id }).exec();
        if (cartOld) {
            await cartOld.deleteOne(); // Use deleteOne to remove the document
            console.log('remove old cart');
        }
        // Loop through the cart items and format them for the new cart
        for (let i = 0; i < cart.length; i++) {
            let object = {
                Product: cart[i]._id,
                name: cart[i].name,
                count: cart[i].count,
                price: cart[i].price
            };
            products.push(object);
        }

        // Calculate the total cost of the cart
        let cartTotal = 0;
        for (let i = 0; i < products.length; i++) {
            cartTotal = cartTotal + products[i].price * products[i].count;
        }

        // Create a new Cart document and save it to the database
        let newCart = await new Cart({
            products,
            cartTotal,
            orderBy: user._id
        }).save();
        console.log('newCart._id:', newCart._id);
        // Send a success response to the client
        res.send('userCart ok');
    } catch (error) {
        // Log and send an error response in case of any errors
        console.log(error);
        res.status(500).send('userCart Server Error');
    }
};
exports.getUserCart = async (req, res) => {
    try {
        const user = await User
            .findOne({ username: req.user.username })
            .exec();

        // Find the user's cart and populate the product details
        let cart = await Cart.findOne({ orderBy: user._id })
            .populate('products.product', "_id name price")
            .exec();

        const { products, cartTotal } = cart;

        res.json({ products, cartTotal });
    } catch (error) {
        // Handle errors, and send a 500 Internal Server Error response
        res.status(500).send('Server Error getcart User!!!');
    }
};
exports.saveAddress = async (req, res) => {
    try {
        const userAddress = await User
            .findOneAndUpdate({ username: req.user.username },
                { address: req.body.address }
            ).exec()
        res.json({ ok: true })
    } catch (error) {
        // Handle errors, and send a 500 Internal Server Error response
        res.status(500).send('Server Error saveAddress User!!!');
    }
};
exports.saveOrder = async (req, res) => {
    try {
        const { name, address, phoneNumber } = req.body; // Add this line to get customer details

        let user = await User.findOne({ username: req.user.username }).exec();
        let userCart = await Cart.findOne({ orderBy: user._id }).exec();

        // Save customer details to the user document
        await User.findOneAndUpdate(
            { _id: user._id },
            { name, address, phoneNumber }
        );

        let order = await new Order({
            products: userCart.products,
            orderBy: user._id,
            cartTotal: userCart.cartTotal
        }).save();

        // Remove the cart after order is placed
        await Cart.findOneAndRemove({ orderBy: user._id }).exec();

        res.send(order);
    } catch (error) {
        console.log(error);
        res.status(500).send('Server Error saveOrder User!!!');
    }
};

exports.getOrder = async (req, res) => {
    try {
        const user = await User
            .findOne({ username: req.user.username })
            .exec();

        // Find the user's cart and populate the product details
        let order = await Order.find({ orderBy: user._id })
            .populate('products.product')
            .exec();


        res.json(order);
    } catch (error) {
        // Handle errors, and send a 500 Internal Server Error response
        res.status(500).send('Server Error getOrder User!!!');
    }
};
exports.emptyCart = async (req, res) => {
    try {
        const user = await User.findOne({ username: req.user.username }).exec();

        const empty = await Cart
            .findOneAndRemove({ orderBy: user._id })
            .exec()
        res.send(empty)

    } catch (err) {
        res.status(500).send("Remove Cart Error");
    }
};

exports.addToWishList = async (req, res) => {
    try {
        const { productId } = req.body
        console.log(productId)
        let user = await User.findOneAndUpdate(
            { username: req.user.username },
            { $addToSet: { wishlist: productId } }).exec()
        res.send(user)
    } catch (error) {
        res.status(500).send('Add Wishlist Error')
    }
}
exports.getWishList = async (req, res) => {
    try {
        let list = await User
            .findOne({ username: req.user.username })
            .select('wishlist')
            .populate('wishlist')
            .exec()
        res.json(list)
    } catch (error) {
        console.error('Error in addToWishList:', error);
        res.status(500).send('Internal Server Error');
    }
}
exports.removeWishList = async (req, res) => {
    try {
        const { productId } = req.params
        let user = await User.findOneAndUpdate(
            { username: req.user.username },
            { $pull: { wishlist: productId } }
        ).exec()
        res.send(user)
    } catch (error) {
        res.status(500).send('remove Wishlist Error')
    }
}