const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../model/User");
const Product = require("../model/Product");
const Cart = require("../model/Cart");
const Order = require("../model/Order");
const Address = require("../model/Address");

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

// controllers/user.js
exports.readUsers = async (req, res) => {
  try {
    const user = await User.findById(req.params.id); // Error occurs here
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateUsers = async (req, res) => {
  try {
    // Code

    var { id, password } = req.body.values;
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
exports.resetPasswordUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { password } = req.body;

    // Generate salt and hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Update the user's password in the database
    const updatedUser = await User.findOneAndUpdate(
      { _id: id },
      { password: hashedPassword },
      { new: true }
    );

    res.json(updatedUser);
  } catch (error) {
    console.error(error);
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

exports.editUserTime = async (req, res) => {
  try {
    console.log(req.params);
    const { id } = req.params;
    console.log("id", id);
    const user = await User.findOne({ _id: id });

    user.editUserTime = new Date();
    await user.save();

    res.status(200).json({ message: "EditUserTime updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server editUserTime Error!");
  }
};
exports.editOrderTime = async (req, res) => {
  try {
    console.log(req.params);
    const { id } = req.params;
    console.log("id", id);
    const user = await User.findOne({ _id: id });

    user.editOrderTime = new Date();
    await user.save();

    res.status(200).json({ message: "EditOrderTime updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server EditOrderTime Error!");
  }
};
exports.editProductTime = async (req, res) => {
  try {
    console.log(req.params);
    const { id } = req.params;
    console.log("id", id);
    const user = await User.findOne({ _id: id });

    user.editProductTime = new Date();
    await user.save();

    res.status(200).json({ message: "editProductTime updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server editProductTime Error!");
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
      console.log("remove old cart");
    }
    // Loop through the cart items and format them for the new cart
    for (let i = 0; i < cart.length; i++) {
      let object = {
        Product: cart[i]._id,
        name: cart[i].name,
        count: cart[i].count,
        price: cart[i].price,
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
      orderBy: user._id,
    }).save();
    console.log("newCart._id:", newCart._id);
    // Send a success response to the client
    res.send("userCart ok");
  } catch (error) {
    // Log and send an error response in case of any errors
    console.log(error);
    res.status(500).send("userCart Server Error");
  }
};
exports.getUserCart = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.user.username }).exec();

    // Find the user's cart and populate the product details
    let cart = await Cart.findOne({ orderBy: user._id })
      .populate("products.product", "_id name price")
      .exec();

    const { products, cartTotal } = cart;

    res.json({ products, cartTotal });
  } catch (error) {
    // Handle errors, and send a 500 Internal Server Error response
    res.status(500).send("Server Error getcart User!!!");
  }
};
exports.saveZipCode = async (req, res) => {
  try {
    const userzipCode = await User.findOneAndUpdate(
      { username: req.user.username },
      { zipCode: req.body.zipCode }
    ).exec();
    res.json({ ok: true });
  } catch (error) {
    // Handle errors, and send a 500 Internal Server Error response
    res.status(500).send("Server Error savezipcode User!!!");
  }
};
exports.saveProvince = async (req, res) => {
  try {
    const userprovince = await User.findOneAndUpdate(
      { username: req.user.username },
      { province: req.body.province }
    ).exec();
    res.json({ ok: true });
  } catch (error) {
    // Handle errors, and send a 500 Internal Server Error response
    res.status(500).send("Server Error saveprovince User!!!");
  }
};
exports.savePhoneNumber = async (req, res) => {
  try {
    const userphoneNumber = await User.findOneAndUpdate(
      { username: req.user.username },
      { phoneNumber: req.body.phoneNumber }
    ).exec();
    res.json({ ok: true });
  } catch (error) {
    // Handle errors, and send a 500 Internal Server Error response
    res.status(500).send("Server Error savephoneNumber User!!!");
  }
};
exports.saveEditedPhoneNumber = async (req, res) => {
  try {
    const userphoneNumber = await User.findOneAndUpdate(
      { username: req.user.username },
      { phoneNumber: req.body.phoneNumber }
    ).exec();
    res.json({ ok: true });
  } catch (error) {
    // Handle errors, and send a 500 Internal Server Error response
    res.status(500).send("Server Error savephoneNumber User!!!");
  }
};
exports.saveFullAddress = async (req, res) => {
  try {
    const userAddress = await User.findOneAndUpdate(
      { username: req.user.username },
      { fulladdress: req.body.fulladdress }
    ).exec();
    res.json({ ok: true });
  } catch (error) {
    // Handle errors, and send a 500 Internal Server Error response
    res.status(500).send("Server Error saveAddress User!!!");
  }
};
exports.saveEditedFullAddress = async (req, res) => {
  try {
    const userAddress = await User.findOneAndUpdate(
      { username: req.user.username },
      { fulladdress: req.body.fulladdress }
    ).exec();
    res.json({ ok: true });
  } catch (error) {
    // Handle errors, and send a 500 Internal Server Error response
    res.status(500).send("Server Error saveAddress User!!!");
  }
};
exports.saveName = async (req, res) => {
  try {
    const userName = await User.findOneAndUpdate(
      { username: req.user.username },
      { name: req.body.name }
    ).exec();
    res.json({ ok: true });
  } catch (error) {
    // Handle errors, and send a 500 Internal Server Error response
    res.status(500).send("Server Error saveAddress User!!!");
  }
};
exports.saveEditedName = async (req, res) => {
  try {
    const userName = await User.findOneAndUpdate(
      { username: req.user.username },
      { name: req.body.name }
    ).exec();
    res.json({ ok: true });
  } catch (error) {
    // Handle errors, and send a 500 Internal Server Error response
    res.status(500).send("Server Error saveAddress User!!!");
  }
};

exports.saveSubdistrict = async (req, res) => {
  try {
    const usersubdistrict = await User.findOneAndUpdate(
      { username: req.user.username },
      { subdistrict: req.body.subdistrict }
    ).exec();
    res.json({ ok: true });
  } catch (error) {
    // Handle errors, and send a 500 Internal Server Error response
    res.status(500).send("Server Error subdistrict User!!!");
  }
};
exports.getSubdistrict = async (req, res) => {
  try {
    let list = await User.findOne({ username: req.user.username })
      .select("subdistrict")
      .populate("subdistrict")
      .exec();
    res.json(list);
  } catch (error) {
    console.error("Error in subdistrict", error);
    res.status(500).send("Internal Server Error");
  }
};
exports.getZipCode = async (req, res) => {
  try {
    let list = await User.findOne({ username: req.user.username })
      .select("zipCode")
      .populate("zipCode")
      .exec();
    res.json(list);
  } catch (error) {
    console.error("Error in zipCode", error);
    res.status(500).send("Internal Server Error");
  }
};
exports.getProvince = async (req, res) => {
  try {
    let list = await User.findOne({ username: req.user.username })
      .select("province")
      .populate("province")
      .exec();
    res.json(list);
  } catch (error) {
    console.error("Error in province", error);
    res.status(500).send("Internal Server Error");
  }
};
exports.getPhoneNumber = async (req, res) => {
  try {
    let list = await User.findOne({ username: req.user.username })
      .select("phoneNumber")
      .populate("phoneNumber")
      .exec();
    res.json({ phoneNumber: list.phoneNumber });
  } catch (error) {
    console.error("Error in Phone", error);
    res.status(500).send("Internal Server Error");
  }
};
exports.getFullAddress = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.user.username })
      .select("fulladdress")
      .populate("fulladdress")
      .exec();

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ fulladdress: user.fulladdress });
  } catch (error) {
    // Log the error for debugging purposes
    console.error("Error in getFullAddress:", error);
    // Handle errors, and send a 500 Internal Server Error response
    res.status(500).json({ error: "Internal Server Error" });
  }
};
exports.getName = async (req, res) => {
  try {
    let list = await User.findOne({ username: req.user.username })
      .select("name")
      .populate("name")
      .exec();
    res.json({ name: list.name });
  } catch (error) {
    console.error("Error in address", error);
    res.status(500).send("Internal Server Error");
  }
};
exports.getUserName = async (req, res) => {
  try {
    let list = await User.findOne({ username: req.user.username }).exec();
    res.json(list);
  } catch (error) {
    console.error("Error in address", error);
    res.status(500).send("Internal Server Error");
  }
};
exports.getPassWord = async (req, res) => {
  try {
    let list = await User.findOne({ username: req.user.username })
      .select("password")
      .populate("password")
      .exec();
    res.json({ password: list.password });
  } catch (error) {
    console.error("Error in address", error);
    res.status(500).send("Internal Server Error");
  }
};
exports.saveOrder = async (req, res) => {
  console.log(req.body)
  try {
    // Log the images from the request body
    const AddressOrder = await Address.find({
      addressBy: req.body.values.addressBy,
    })
      .populate("fulladdress")
      .exec();
    const user = await User.findOne({ username: req.user.username }).exec();

    if (!user) {
      return res.status(404).send("User not found");
    }
    const userCart = await Cart.findOne({ orderBy: user._id }).exec();

    if (!userCart) {
      return res.status(405).send("User cart not found");
    }
    const order = await new Order({
      fulladdress: req.body.values.fulladdress,
      name: req.body.values.name,
      phoneNumber: req.body.values.phoneNumber,
      products: userCart.products,
      orderBy: user._id,
      cartTotal: userCart.cartTotal,
      images: req.body.values.images, // Assuming images are in the request body
    }).save();
    let bulkOption = userCart.products.map((item) => {
      return {
        updateOne: {
          filter: { name: item.name },
          update: { $inc: { sold: +item.count } },
        },
      };
    });
    let updated = await Product.bulkWrite(bulkOption, {});
    res.send(updated);

    res.status(201).send(order); // Sending 201 Created status with the saved order
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error while saving order");
  }
};
exports.getOrder = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.user.username }).exec();

    // Find the user's cart and populate the product details
    let order = await Order.find({ orderBy: user._id })
      .populate("products.product")
      .exec();

    res.json(order);
  } catch (error) {
    // Handle errors, and send a 500 Internal Server Error response
    res.status(500).send("Server Error getOrder User!!!");
  }
};
exports.emptyCart = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.user.username }).exec();

    const empty = await Cart.findOneAndRemove({ orderBy: user._id }).exec();
    res.send(empty);
  } catch (err) {
    res.status(500).send("Remove Cart Error");
  }
};

exports.addToWishList = async (req, res) => {
  try {
    const { productId } = req.body;
    console.log(productId);
    let user = await User.findOneAndUpdate(
      { username: req.user.username },
      { $addToSet: { wishlist: productId } }
    ).exec();
    res.send(user);
  } catch (error) {
    res.status(500).send("Add Wishlist Error");
  }
};
exports.getWishList = async (req, res) => {
  try {
    let list = await User.findOne({ username: req.user.username })
      .select("wishlist")
      .populate("wishlist")
      .exec();
    res.json(list);
  } catch (error) {
    console.error("Error in addToWishList:", error);
    res.status(500).send("Internal Server Error");
  }
};
exports.removeWishList = async (req, res) => {
  try {
    const { productId } = req.params;
    let user = await User.findOneAndUpdate(
      { username: req.user.username },
      { $pull: { wishlist: productId } }
    ).exec();
    res.send(user);
  } catch (error) {
    res.status(500).send("remove Wishlist Error");
  }
};
// controllers/user.js

// ... (Previous code)

exports.createAddress = async (req, res) => {
  try {
    const { id } = req.params;
    const { fulladdress, phoneNumber, name } = req.body;
    console.log(id);
    // Create a new address instance
    const address = await new Address({
      fulladdress,
      phoneNumber,
      name,
      addressBy: id,
    }).save();

    // Update the user's reference to the new address
    const user = await User.findOneAndUpdate(
      { _id: id },
      { fulladdress: address.id } // Assuming you want to associate the address with the user
    ).exec();

    res.status(201).send({ address, user });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error while creating address");
  }
};
exports.listAddress = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the user and populate the fulladdress field
    const user = await Address.find({ addressBy: id })
      .populate("fulladdress")
      .exec();
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Extract the addresses from the user object
    const address = user.fulladdress;

    res.send(user);
    console.log(user);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error while listing addresses");
  }
};
exports.editAddress = async (req, res) => {
  try {
    const { addressId } = req.params;
    const { fulladdress, phoneNumber, name } = req.body;

    // Find the address by ID and update its fields
    const updatedAddress = await Address.findOneAndUpdate(
      { _id: addressId },
      { fulladdress, phoneNumber, name },
      { new: true }
    ).exec();

    // Check if the address was found and updated successfully
    if (!updatedAddress) {
      return res.status(404).json({ error: "Address not found" });
    }

    res.status(200).send(updatedAddress);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error while editing address");
  }
};
exports.removeAddress = async (req, res) => {
  try {
    const { addressId } = req.params;

    // Find the address by ID and remove it
    const removedAddress = await Address.findOneAndRemove({
      _id: addressId,
    }).exec();

    // Check if the address was found and removed successfully
    if (!removedAddress) {
      return res.status(404).json({ error: "Address not found" });
    }

    // Optionally, you can update the user's reference to the address if needed
    // Example: await User.findOneAndUpdate({ fulladdress: addressId }, { fulladdress: null }).exec();

    res.status(200).send(removedAddress);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error while removing address");
  }
};