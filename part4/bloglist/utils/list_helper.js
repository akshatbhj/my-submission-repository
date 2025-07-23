const _ = require("lodash");

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  if (blogs.length === 0) return 0;
  const result = blogs.reduce((likes, blog) => {
    return likes + blog.likes;
  }, 0);
  return result;
};

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return 0;

  let favorite = blogs[0];
  for (const blog of blogs) {
    if (blog.likes > favorite.likes) favorite = blog;
  }
  return favorite;
};

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return 0;

  const countByAuthor = _.countBy(blogs, "author"); // returns => {author : count}
  const [author, blogCount] = Object.entries(countByAuthor).reduce((a, b) =>
    b[1] > a[1] ? b : a
  );

  return { author, blogs: blogCount };
};

const mostLikes = (blogs) => {
  if (blogs.length === 0) return 0;

  const grouped = _.groupBy(blogs, "author"); // returns => {'authorName' : [All the blogs written by the author]}

  const authorLikes = Object.entries(grouped).map(([author, authorBlogs]) => {
    const totalLikes = _.sumBy(authorBlogs, "likes");
    return { author, likes: totalLikes };
  });

  return authorLikes.reduce((max, author) => {
    return author.likes > max.likes ? author : max;
  });
};

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes };
