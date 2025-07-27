const { test, after, beforeEach } = require("node:test");
const assert = require("node:assert");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Blog = require("../models/blog");

const api = supertest(app);

const initialBlogs = [
  {
    title: "Supertest",
    author: "node",
    url: "ayx@akmf",
    likes: 5,
  },
  {
    title: "Supertest 2",
    author: "node",
    url: "ayx@akmf",
    likes: 15,
  },
];

beforeEach(async () => {
  await Blog.deleteMany({});
  let blogObj = new Blog(initialBlogs[0]);
  await blogObj.save();
  blogObj = new Blog(initialBlogs[1]);
  await blogObj.save();
});

test("all blogs are returned", async () => {
  const response = await api.get("/blogs");

  assert.strictEqual(response.body.length, initialBlogs.length);
});

test("blogs are returned as json", async () => {
  await api
    .get("/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("new blog is created successfully", async () => {
  const testBlog = {
    title: "test blog",
    author: "supertest",
    url: "supertest.com",
    likes: 1,
  };

  await api
    .post("/api/blogs")
    .send(testBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const response = await api.get("/blogs");
  assert.strictEqual(response.body.length, initialBlogs.length + 1);
});

test("unique identifier property of blog posts is named id", async () => {
  const response = await api.get("/blogs");

  const blog = response.body[0];
  assert.ok(blog.id, "Expected property 'id' to be defined");
  assert.strictEqual(typeof blog.id, "string");
  assert.strictEqual(
    blog._id,
    undefined,
    "Expected property '_id' to be undefined"
  );
});

test("if likes property is missing from request, it defaults to 0", async () => {
  const newBlog = {
    title: "Blog without likes",
    author: "Test Author",
    url: "http://example.com/blog-no-likes",
    // likes is intentionally missing
  };

  const response = await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  assert.strictEqual(response.body.likes, 0);
});

test("if title is missing, responds with 400 Bad Request", async () => {
  const blogMissingTitle = {
    author: "Test Author",
    url: "http://example.com/no-title",
    likes: 2,
  };

  await api.post("/api/blogs").send(blogMissingTitle).expect(400);
});

test("if url is missing, responds with 400 Bad Request", async () => {
  const blogMissingUrl = {
    title: "No URL Blog",
    author: "Test Author",
    likes: 2,
  };

  await api.post("/api/blogs").send(blogMissingUrl).expect(400);
});



after(async () => {
  await mongoose.connection.close();
});
