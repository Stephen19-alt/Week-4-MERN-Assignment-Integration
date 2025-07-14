// File: server/models/Category.js
// This schema defines a Category model with a name field that is required, unique, and trimmed.
const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Category name is required'],
      unique: true,
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Category', CategorySchema);
