const bloglistRouter = require("express").Router();
const Blog = require("../models/blog");

bloglistRouter.get("/", (req, res) => {
  res.json("Hello MF");
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
    .then((savedBlog) => {
      res.json(savedBlog);
    })
    .catch((error) => console.log(error.message));
});

module.exports = bloglistRouter;
