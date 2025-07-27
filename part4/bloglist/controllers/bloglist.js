const bloglistRouter = require("express").Router();
const Blog = require("../models/blog");
const { Error } = require("../utils/logger");

bloglistRouter.get("/blogs", async (req, res) => {
  const blogs = await Blog.find({});
  res.json(blogs);
});

bloglistRouter.post("/api/blogs", async (req, res) => {
  try {
    const { title, author, url, likes } = req.body;

    const newBlog = new Blog({
      title: title,
      author: author,
      url: url,
      likes: likes,
    });

    const result = await newBlog.save();
    res.status(201).json(result);
  } catch (error) {
    res.sendStatus(400).json({ error: error.message });
  }
});

module.exports = bloglistRouter;
