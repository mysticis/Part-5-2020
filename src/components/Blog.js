import React, { useState } from "react"
import jwt from "jsonwebtoken"
import PropTypes from "prop-types"
const Blog = ({ blog, updateLikes, deleteBlog, user }) => {
  const [visible, setVisible] = useState(false)
  const showComponent = { display: visible ? "" : "none" }
  const toggleVisiblity = () => setVisible(!visible)
  //const token = user.token
  //const decoded = jwt.verify(token, "secretword")

  return (
    <div className="blogStyle">
      <div>
        {`${blog.title} by ${blog.author}`}{" "}
        <button onClick={() => toggleVisiblity()} style={{ cursor: `pointer` }}>
          {visible ? "Hide" : "View"}
        </button>
      </div>
      <div style={showComponent}>
        <div>{blog.url}</div>
        <div>
          Likes: {blog.likes}{" "}
          <button
            style={{ cursor: `pointer` }}
            onClick={() => updateLikes(blog.id)}
          >
            Like
          </button>
        </div>
        <div>{blog.author}</div>
        <div>
          <button
            onClick={() => deleteBlog(blog.id)}
            style={{ cursor: `pointer` }}
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  updateLikes: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired
  //user: PropTypes.object.isRequired
}
export default Blog

/*
<div>
          {blog.user === decoded.id && (
            <div>
              <button
                onClick={() => deleteBlog(blog.id)}
                style={{ cursor: `pointer` }}
              >
                Remove
              </button>
            </div>
          )}
        </div>
        */
