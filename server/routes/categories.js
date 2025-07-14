// File: server/routes/Categories.js
// This file defines the routes for categories in the blog application.
const express = require('express');
const router = express.Router();
const { getAllCategories, createCategory } = require('../controllers/categoryController');
const { protect, admin } = require('../middleware/auth');

router.get('/', getAllCategories);
router.post('/', protect, admin, createCategory);

module.exports = router;
