const Product = require('../models/product');
const asyncHandler = require('express-async-handler');

const addProduct = asyncHandler(async (req, res) => {
  const { name, price, quantity } = req.body;
  const pictures = req.files.map(file => file.path.replace(/\\/g, '/'));
  const userId = req.user._id;

  if (!name || !price || !quantity || pictures.length === 0) {
    res.status(400).json({ message: 'All fields are required' });
    return;
  }

  const product = new Product({
    name,
    price,
    quantity,
    pictures,
    user: userId,
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

const getUserProducts = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const products = await Product.find({ user: userId });
  res.json(products);
});

module.exports = { addProduct, getUserProducts };
