import React from "react"

const LoginForm = ({
  handleLogin,
  handleUsername,
  handlePassword,
  username,
  password
}) => {
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
            onChange={handleUsername}
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
            onChange={handlePassword}
          />
        </div>
        <br />
        <button type="submit">Login</button>
      </form>
    </React.Fragment>
  )
}

export default LoginForm
