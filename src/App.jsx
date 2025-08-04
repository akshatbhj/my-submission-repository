import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import Togglable from "./components/Togglable";
import BlogForm from "./components/BlogForm";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [newBlog, setNewBlog] = useState("");
  const [newBlogAuthor, setNewBlogAuthor] = useState("");
  const [newBlogUrl, setNewBlogUrl] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [blogCreationMessage, setBlogCreationMessage] = useState(null);
  const [user, setUser] = useState(null);
  const [loginVisible, setLoginVisible] = useState(false);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }

    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({ username, password });
      blogService.setToken(user.token);
      setUser(user);
      window.localStorage.setItem("loggedBlogUser", JSON.stringify(user));
      setUsername("");
      setPassword("");
    } catch (error) {
      setErrorMessage("Wrong credentials");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const handleBlogTitleChange = (event) => {
    setNewBlog(event.target.value);
  };

  const handleBlogAuthorChange = (event) => {
    setNewBlogAuthor(event.target.value);
  };

  const handleBlogUrlChange = (event) => {
    setNewBlogUrl(event.target.value);
  };

  const addBlog = async (event) => {
    event.preventDefault();
    try {
      const newBlogObject = {
        title: newBlog,
        author: newBlogAuthor,
        url: newBlogUrl,
        likes: 0,
      };

      const returnedBlog = await blogService.create(newBlogObject);
      setBlogs(blogs.concat(returnedBlog));
      setNewBlog("");
      setNewBlogAuthor("");
      setNewBlogUrl("");
      setBlogCreationMessage(`Sucessfully created : ${newBlog}`);
      setTimeout(() => setBlogCreationMessage(null), 5000);
    } catch (error) {
      setErrorMessage("Failed to add blog");
      setTimeout(() => setErrorMessage(null), 5000);
      console.error(
        "Error creating blog:",
        error.response?.data || error.message
      );
    }
  };

  const loginForm = () => {
    const hideWhenVisible = { display: loginVisible ? "none" : "" };
    const showWhenVisible = { display: loginVisible ? "" : "none" };

    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setLoginVisible(true)}>log in</button>
        </div>
        <div style={showWhenVisible}>
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
          <button onClick={() => setLoginVisible(false)}>cancel</button>
        </div>
      </div>
    );
  };

  const handleLike = async (blogToLike) => {
    const updatedBlog = {
      ...blogToLike,
      likes: blogToLike.likes + 1,
    };

    try {
      const returnedBlog = await blogService.updateLikes(updatedBlog);
      setBlogs(
        blogs.map((blog) => (blog.id !== blogToLike.id ? blog : returnedBlog))
      );
    } catch (error) {
      console.error("Error liking the blog:", error);
    }
  };

  const handleDelete = async (blogToDelete) => {
    const confirm = window.confirm(`Delete blog "${blogToDelete.title}"?`);
    if (!confirm) return;

    try {
      await blogService.remove(blogToDelete.id);
      setBlogs(blogs.filter((blog) => blog.id !== blogToDelete.id));
    } catch (error) {
      console.error(
        "Error deleting the blog:",
        error.response?.data || error.message
      );
    }
  };

  const logoutButtonStyle = {
    paddingTop: 4,
    paddingBottom: 4,
    paddingRight: 8,
    paddingLeft: 8,
    borderRadius: 4,
    border: "none",
    marginTop: 10,
    marginBottom: 10,
    cursor: "pointer",
    width: "10%",
    font: "bold",
    backgroundColor: "#f44336",
    color: "white",
  };

  const containerStyle = {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
  };

  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes);

  return (
    <div>
      <h1>Blogs</h1>
      <Notification message={errorMessage} />
      <Notification message={blogCreationMessage} />

      {!user && loginForm()}

      {user && (
        <div>
          <p>{user.name} logged in</p>
          <button
            style={logoutButtonStyle}
            onClick={() => {
              window.localStorage.removeItem("loggedBlogUser");
              setUser(null);
            }}
          >
            logout
          </button>
          <Togglable buttonLabel="create blog">
            <BlogForm
              onSubmit={addBlog}
              title={newBlog}
              author={newBlogAuthor}
              url={newBlogUrl}
              handleTitleChange={handleBlogTitleChange}
              handleAuthorChange={handleBlogAuthorChange}
              handleUrlChange={handleBlogUrlChange}
            />
          </Togglable>
          <div style={containerStyle}>
            {sortedBlogs.map((blog) => (
              <Blog
                key={blog.id}
                blog={blog}
                handleLike={handleLike}
                handleDelete={handleDelete}
                currentUser={user}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
