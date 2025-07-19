const bloglistRouter = require("express").Router();
const Blog = require("../models/blog");

bloglistRouter.get("/blogs", (req, res) => {
  Blog.find({}).then((blogs) => {
    res.json(blogs);
  });
});

bloglistRouter.post("/api/blogs", (req, res) => {
  const { title, author, url, likes } = req.body;

  const newBlog = new Blog({
    title: title,
    author: author,
    url: url,
    likes: likes,
  });

  newBlog
    .save()
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((error) => console.log(error.message));
});

module.exports = bloglistRouter;
