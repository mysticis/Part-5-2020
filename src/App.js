import React, { useState, useEffect } from "react"
import Blog from "./components/Blog"
import blogService from "./services/blogs"
import loginService from "./services/login"
import Notification from "./components/Notification"
import LoginForm from "./components/LoginForm"
import BlogForm from "./components/BlogForm"
import ToggleTool from "./components/ToggleTool"

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState(null)
  const [messageSuccess, setMessageSuccess] = useState(true)
  const [user, setUser] = useState(null)
  const [visible, setVisible] = useState(false)
  //Get all blogs
  useEffect(() => {
    blogService.getAll().then(blogs => setBlogs(blogs))
  }, [])

  //Get token from response and set in localStorage
  useEffect(() => {
    const loggedInUser = window.localStorage.getItem("loggedInUser")
    if (loggedInUser) {
      const user = JSON.parse(loggedInUser)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])
  //Toggle Visibility
  const showComponent = { display: visible ? "" : "none" }
  const toggleVisiblity = () => setVisible(!visible)
  //Create blog function
  const addBlog = async newBlogObject => {
    try {
      const response = await blogService.create(newBlogObject)
      console.log(response.user)
      setBlogs(blogs.concat(response))
      setMessageSuccess(true)
      setMessage(`A new blog ${response.title}! by ${response.author} added`)
      setTimeout(() => {
        setMessage(null)
        setMessageSuccess(null)
      }, 5000)
    } catch (error) {
      setMessageSuccess(false)
      setMessage(`Err Something went wrong!`)
      setTimeout(() => {
        setMessage(null)
        setMessageSuccess(null)
      }, 5000)
    }
  }

  //Update likes blog function
  const updateLikes = async id => {
    const blogToUpdate = await blogs.find(blog => blog.id === id)
    console.log(blogToUpdate)
    try {
      const changedBlog = { ...blogToUpdate, likes: blogToUpdate.likes + 1 }
      const response = await blogService.update(id, changedBlog)
      console.log(response)
      setBlogs(blogs.map(blog => (blog.id === id ? response : blog)))
    } catch (error) {
      setMessageSuccess(false)
      setMessage(`Blog has already been removed from the server`)
      setTimeout(() => {
        setMessageSuccess(null)
        setMessage(null)
      }, 5000)
    }
  }
  //Remove blog

  const removeBlog = async id => {
    try {
      const blogToRemove = await blogs.find(blog => blog.id === id)
      if (
        window.confirm(
          `Delete ${blogToRemove.title} by ${blogToRemove.author}?`
        )
      ) {
        await blogService.deleteBlog(blogToRemove.id)
        setMessageSuccess(true)
        setMessage(`Deletion Successful!`)
        setTimeout(() => {
          setMessageSuccess(null)
          setMessage(null)
        }, 5000)
        setBlogs(blogs.filter(blog => blog.id !== blogToRemove.id))
      }
    } catch (error) {
      setMessageSuccess(false)
      setMessage(`Unauthorized user!`)
      setTimeout(() => {
        setMessageSuccess(null)
        setMessage(null)
      }, 5000)
    }
  }
  //Login function
  const handleLogin = async credentials => {
    try {
      const user = await loginService.login(credentials)
      window.localStorage.setItem("loggedInUser", JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
    } catch (exception) {
      setMessageSuccess(false)
      setMessage("Invalid username and/or password!")
      setTimeout(() => {
        setMessage(null)
        setMessageSuccess(null)
      }, 5000)
    }
  }

  //Login form
  const loginForm = () => {
    return (
      <ToggleTool buttonLabel="Login">
        <LoginForm handleLogin={handleLogin} />
      </ToggleTool>
    )
  }

  //Blog form
  const blogForm = () => {
    return (
      <ToggleTool buttonLabel="New Blog">
        <BlogForm createBlog={addBlog} />
      </ToggleTool>
    )
  }

  //List of blogs to view
  const blogsList = blogs => {
    return blogs
      .sort((a, b) => b.likes - a.likes)
      .map(blog => (
        <Blog
          key={blog.id}
          blog={blog}
          updateLikes={() => updateLikes(blog.id)}
          deleteBlog={() => removeBlog(blog.id)}
          user={user}
          toggleVisiblity={toggleVisiblity}
          showComponent={showComponent}
          visible={visible}
        />
      ))
  }

  //Logout function
  const logout = () => {
    setUser(null)
    window.localStorage.clear()
  }

  return (
    <React.Fragment>
      <Notification message={message} messageSuccess={messageSuccess} />

      {user === null ? (
        loginForm()
      ) : user ? (
        <div>
          <p>{user.name} logged in</p>
          {blogForm()}
          <h2>Blogs</h2>
          <div>{blogsList(blogs)}</div>
          <button onClick={() => logout()} style={{ cursor: `pointer` }}>
            Logout
          </button>
        </div>
      ) : (
        loginForm()
      )}
    </React.Fragment>
  )
}

export default App
