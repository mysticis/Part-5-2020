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
  useEffect(() => {
    blogService.getAll().then(blogs => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const loggedInUser = window.localStorage.getItem("loggedInUser")
    if (loggedInUser) {
      const user = JSON.parse(loggedInUser)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])
  const addBlog = newBlogObject => {
    blogService.create(newBlogObject).then(returnedBlog => {
      console.log(blogs)
      setBlogs(blogs.concat(returnedBlog))
      setMessageSuccess(true)
      setMessage(
        `A new blog ${returnedBlog.title}! by ${returnedBlog.author} added`
      )
      setTimeout(() => {
        setMessage(null)
        setMessageSuccess(null)
      }, 5000)
    })
  }
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
  const loginForm = () => {
    return (
      <ToggleTool buttonLabel="Login">
        <LoginForm handleLogin={handleLogin} />
      </ToggleTool>
    )
  }
  const blogForm = () => {
    return (
      <ToggleTool buttonLabel="New Blog">
        <BlogForm createBlog={addBlog} />
      </ToggleTool>
    )
  }
  const blogsList = blogs => {
    return blogs.map(blog => <Blog key={blog.id} blog={blog} />)
  }
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
          <button onClick={() => logout()}>Logout</button>
        </div>
      ) : (
        loginForm()
      )}
    </React.Fragment>
  )
}

export default App
