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

  //Create blog function
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
    return blogs.map(blog => (
      <Blog
        key={blog.id}
        blog={blog}
        updateLikes={() => updateLikes(blog.id)}
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
          <button onClick={() => logout()}>Logout</button>
        </div>
      ) : (
        loginForm()
      )}
    </React.Fragment>
  )
}

export default App

/*
const updateLikes = async id => {
    const blog = await blogs.find(blog => blog.id === id)
    console.log(blog)
    try {
      const changedBlog = { ...blog, likes: blog.likes + 1 }
      const response = await blogService.update(id, changedBlog)
      console.log(response)
      setBlogs(blogs.map(blog => (blog.id === id ? response : blog)))
    } catch (error) {
      setMessageSuccess(false)
      setMessage(`Blog ${blog.title} has already been removed from the server`)
      setTimeout(() => {
        setMessageSuccess(null)
        setMessage(null)
      }, 5000)
    }
  }
  */
/*const updateLikes = id => {
    const blogToUpdate = blogs.find(blog => blog.id === id)
    console.log(blogToUpdate)
    const changedBlog = { ...blogToUpdate, likes: blogToUpdate.likes + 1 }
    blogService
      .update(id, changedBlog)
      .then(returnedBlog => {
        console.log(returnedBlog)
        setBlogs(blogs.map(blog => (blog.id === id ? returnedBlog : blog)))
      })
      .catch(error => {
        setMessageSuccess(false)
        setMessage(`The Blog does not exist`)
        setTimeout(() => {
          setMessageSuccess(null)
          setMessage(null)
        }, 5000)
      })
  }*/
