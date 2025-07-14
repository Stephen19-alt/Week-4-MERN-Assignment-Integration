// File: server/controllers/categoryController.js
// PUT /api/categories/:id
const Category = require('../models/Category');

// GET /api/categories
exports.getAllCategories = async (req, res) => {
  const categories = await Category.find();
  res.json(categories);
};

// POST /api/categories
exports.createCategory = async (req, res) => {
  const { name } = req.body;
  const category = await Category.create({ name });
  res.status(201).json(category);
};
// PUT /api/categories/:id