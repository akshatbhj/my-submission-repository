import Togglable from "./Togglable";

const blogStyle = {
  paddingTop: 10,
  paddingBottom: 10,
  paddingLeft: 20,
  paddingRight: 20,
  border: "solid",
  borderWidth: 1,
  marginBottom: 10,
  marginTop: 10,
  marginRight: 10,
  marginLeft: 10,
  width: "45%",
  borderRadius: 8,
};

const likeButtonStyle = {
  paddingTop: 1,
  paddingBottom: 1,
  paddingRight: 5,
  paddingLeft: 5,
  cursor: "pointer",
};

const titleStyle = {
  color: "purple",
  fontSize: 32,
  letterSpacing: 2,
};

const deleteButtonStyle = {
  paddingTop: 5,
  paddingBottom: 5,
  paddingRight: 10,
  paddingLeft: 10,
  marginBottom: 10,
  cursor: "pointer",
  width: "10%",
  backgroundColor: "brown",
  color: "white",
  border: "none",
  borderRadius: 4,
};

const Blog = ({ blog, handleLike, handleDelete, currentUser }) => {
  const isOwner = currentUser?.username === blog.user?.username;

  return (
    <div style={blogStyle}>
      <h2 style={titleStyle}>{blog.title}</h2>
      <Togglable buttonLabel="view">
        Author: {blog.author} <br /> url: {blog.url} <br /> Likes: {blog.likes}{" "}
        <button style={likeButtonStyle} onClick={() => handleLike(blog)}>
          ♥️
        </button>
      </Togglable>
      {isOwner && (
        <button onClick={() => handleDelete(blog)} style={deleteButtonStyle}>
          Delete
        </button>
      )}
    </div>
  );
};

export default Blog;
