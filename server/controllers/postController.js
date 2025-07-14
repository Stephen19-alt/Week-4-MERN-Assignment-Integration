// GET /api/posts/author/:authorId
const Post = require('../models/Post');
const User = require('../models/User');
const Category = require('../models/Category');
const mongoose = require('mongoose');

// GET /api/posts?page=1&limit=10&category=catId
exports.getAllPosts = async (req, res) => {
  const { page = 1, limit = 10, category } = req.query;
  const query = category ? { category } : {};

  const posts = await Post.find(query)
    .populate('author', 'username')
    .populate('category', 'name')
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(Number(limit));

  const count = await Post.countDocuments(query);

  res.json({ posts, totalPages: Math.ceil(count / limit), currentPage: Number(page) });
};

// GET /api/posts/:idOrSlug
exports.getPost = async (req, res) => {
  const { idOrSlug } = req.params;

  const post = await Post.findOne(
    mongoose.Types.ObjectId.isValid(idOrSlug)
      ? { _id: idOrSlug }
      : { slug: idOrSlug }
  )
    .populate('author', 'username')
    .populate('category', 'name');

  if (!post) return res.status(404).json({ message: 'Post not found' });

  await post.incrementViewCount();

  res.json(post);
};

// POST /api/posts
exports.createPost = async (req, res) => {
  const { title, content, category, tags, featuredImage, excerpt } = req.body;

  const post = await Post.create({
    title,
    content,
    category,
    tags,
    excerpt,
    featuredImage,
    author: req.user._id,
  });

  res.status(201).json(post);
};

// PUT /api/posts/:id
exports.updatePost = async (req, res) => {
  const { id } = req.params;
  const post = await Post.findById(id);

  if (!post) return res.status(404).json({ message: 'Post not found' });

  if (!post.author.equals(req.user._id) && req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Unauthorized' });
  }

  Object.assign(post, req.body);
  await post.save();

  res.json(post);
};

// DELETE /api/posts/:id
exports.deletePost = async (req, res) => {
  const { id } = req.params;
  const post = await Post.findById(id);

  if (!post) return res.status(404).json({ message: 'Post not found' });

  if (!post.author.equals(req.user._id) && req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Unauthorized' });
  }

  await post.deleteOne();
  res.json({ message: 'Post deleted' });
};

// POST /api/posts/:id/comments
exports.addComment = async (req, res) => {
  const { id } = req.params;
  const { content } = req.body;

  const post = await Post.findById(id);
  if (!post) return res.status(404).json({ message: 'Post not found' });

  await post.addComment(req.user._id, content);

  res.status(201).json({ message: 'Comment added' });
};

// GET /api/posts/search?q=keyword
exports.searchPosts = async (req, res) => {
  const { q } = req.query;

  const posts = await Post.find({
    $or: [
      { title: new RegExp(q, 'i') },
      { content: new RegExp(q, 'i') },
      { excerpt: new RegExp(q, 'i') },
    ],
  })
    .populate('author', 'username')
    .populate('category', 'name')
    .sort({ createdAt: -1 });

  res.json(posts);
};
