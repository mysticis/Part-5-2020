import React, { useState, useEffect } from "react"
import Blog from "./components/Blog"
import blogService from "./services/blogs"
import loginService from "./services/login"
import Notification from "./components/Notification"
const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [errorMessage, setErrorMessage] = useState(null)
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
  const handleLogin = async event => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username,
        password
      })
      window.localStorage.setItem("loggedInUser", JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername("")
      setPassword("")
    } catch (exception) {
      setUsername("")
      setPassword("")
      setErrorMessage("Invalid username and/or password!")
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }
  const loginForm = () => {
    return (
      <React.Fragment>
        <h2>Log in to application</h2>
        <form onSubmit={handleLogin}>
          <div>
            Username:
            <br />
            <input
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <br />
          <div>
            Password:
            <br />
            <input
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <br />
          <button type="submit">Login</button>
        </form>
      </React.Fragment>
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
      <Notification message={errorMessage} />

      {user === null ? (
        loginForm()
      ) : user ? (
        <div>
          <p>{user.name} logged in</p>
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
