const Category = require("../model/Category");
const Product = require("../model/Product");

exports.create = async (req, res) => {
  try {
    const { id, category } = req.body;

    // Check if the product with the same id already exists
    const existingProduct = await Product.findOne({ id });

    if (existingProduct) {
      return res
        .status(400)
        .json({ error: "Product with the same id already exists" });
    }

    // If the product with the same id doesn't exist, create a new one
    const product = await new Product(req.body).save();

    // Find the category by its ID
    const foundCategory = await Category.findById(category);

    if (foundCategory) {
      // If the category exists, add the product to its products array
      foundCategory.products.push(product._id);
      await foundCategory.save();
    } else {
      // If the category doesn't exist, you may want to handle this case
      console.error("Category not found");
      // You can choose to return an error response or handle it in a different way
    }

    res.status(201).json(product);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error Create Product!!!");
  }
};

exports.list = async (req, res) => {
  try {
    const count = parseInt(req.params.count);
    const product = await Product.find()
      .limit(count)
      .populate("category")
      .sort([["createdAt", "desc"]]);
    res.send(product);
  } catch (err) {
    res.status(500).send("Server Error list Product!!!");
  }
};
exports.remove = async (req, res) => {
  try {
    const deleted = await Product.findOneAndRemove({
      _id: req.params.id,
    }).exec();
    res.send(deleted);
  } catch (error) {
    res.status(500).send("Server Error Remove Product!!!");
  }
};
exports.read = async (req, res) => {
  try {
    const product = await Product.findOne({ _id: req.params.id })
      .populate("category")
      .exec();
    res.send(product);
  } catch (error) {
    res.status(500).send("Server Error Read Product!!!");
  }
};
exports.update = async (req, res) => {
  try {
    const { id, category } = req.body;
    const existingProduct = await Product.findById(req.params.id);
    const oldCategoryId = existingProduct.category;
    // Update the product with the new data
    const product = await Product.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    ).exec();

    // Remove the product ID from the old category's products array
    if (oldCategoryId) {
      const oldCategory = await Category.findById(oldCategoryId);
      oldCategory.products.pull(product._id);
      await oldCategory.save();
    }

    // Add the product ID to the new category's products array
    const newCategoryId = req.body.category;
    if (newCategoryId) {
      const newCategory = await Category.findById(newCategoryId);
      newCategory.products.push(product._id);
      await newCategory.save();
    }

    res.send(product);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error Update Product!!!");
  }
};

exports.listBy = async (req, res) => {
  try {
    const { sort, order, limit } = req.body;
    const product = await Product.find()
      .limit(limit)
      .populate("category")
      .sort([[sort, order]]);
    res.send(product);
  } catch (err) {
    res.status(500).send("Server Error listBy Product!!!");
  }
};
const handleQuery = async (req, res, query) => {
  let products = await Product.find({ $text: { $search: query } }).populate(
    "category",
    "_id name"
  );
  res.send(products);
};
const handlePrice = async (req, res, price) => {
  let products = await Product.find({
    price: {
      $gte: price[0],
      $lte: price[1],
    },
  }).populate("category", "_id name");
  res.send(products);
};
const handleCategory = async (req, res, category) => {
  let products = await Product.find({ category }).populate(
    "category",
    "_id name"
  );
  res.send(products);
};
exports.searchFilters = async (req, res) => {
  const { query, price, category } = req.body;
  console.log(query);
  if (query) {
    await handleQuery(req, res, query);
  }
  if (price !== undefined) {
    console.log("price----", price);
    await handlePrice(req, res, price);
  }
  if (category !== undefined) {
    console.log("price----", category);
    await handleCategory(req, res, category);
  }
};
