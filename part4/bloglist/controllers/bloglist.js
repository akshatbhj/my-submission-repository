const bloglistRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const { Error } = require("../utils/logger");

bloglistRouter.get("/blogs", async (req, res) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
  res.json(blogs);
});

bloglistRouter.delete("/blogs/:id", async (req, res) => {
  const id = req.params.id;
  const blog = await Blog.findById(id);

  if (!blog) return response.status(404).json({ error: "Blog not found" });

  await Blog.findByIdAndDelete(id);
  res.status(204).end();
});

bloglistRouter.post("/api/blogs", async (req, res) => {
  try {
    const { title, author, url, likes } = req.body;
    const user = await User.findOne();

    const newBlog = new Blog({
      title: title,
      author: author,
      url: url,
      likes: likes || 0,
      user: user,
    });

    const result = await newBlog.save();
    user.blogs = user.blogs.concat(result);
    await user.save();
    res.status(201).json(result);
  } catch (error) {
    res.sendStatus(400).json({ error: error.message });
  }
});

bloglistRouter.put("/api/blogs/:id", async (req, res) => {
  try {
    const { likes } = req.body;
    const blog = await Blog.findById(req.params.id);

    if (!blog) return response.status(404).json({ error: "Blog not found" });

    blog.likes = likes;
    const updatedBlog = await blog.save();

    res.json(updatedBlog);
  } catch (error) {
    res.sendStatus(400).json({ error: error.message });
  }
});

bloglistRouter.delete("/api/blogs:id", async (req, res) => {});

module.exports = bloglistRouter;
