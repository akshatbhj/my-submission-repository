const bloglistRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const { Error } = require("../utils/logger");
const jwt = require("jsonwebtoken");
const userExtractor = require("../middlewares/userExtractor");

bloglistRouter.get("/blogs", async (req, res) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
  res.json(blogs);
});

bloglistRouter.delete(
  "/blogs/:id",
  userExtractor,
  async (request, response) => {
    const user = request.user;
    const blog = await Blog.findById(request.params.id);

    if (!blog) {
      return response.status(404).json({ error: "blog not found" });
    }

    if (blog.user.toString() !== user._id.toString()) {
      return response
        .status(403)
        .json({ error: "only the creator can delete the blog" });
    }

    await Blog.findByIdAndDelete(request.params.id);
    response.status(204).end();
  }
);

bloglistRouter.post("/blogs", userExtractor, async (request, response) => {
  const user = request.user;
  const body = request.body;

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user._id,
  });

  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();

  response.status(201).json(savedBlog);
});

bloglistRouter.put("/blogs/:id", async (req, res) => {
  try {
    const { likes } = req.body;

    const updatedBlog = await Blog.findByIdAndUpdate(
      req.params.id,
      { likes },
      { new: true, runValidators: true }
    );

    if (!updatedBlog) {
      return res.status(404).json({ error: "Blog not found" });
    }

    res.json(updatedBlog);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = bloglistRouter;
