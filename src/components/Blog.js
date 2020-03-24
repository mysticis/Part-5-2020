import React, { useState } from "react"
import jwt from "jsonwebtoken"
import PropTypes from "prop-types"
const Blog = ({
  blog,
  updateLikes,
  deleteBlog,
  user,
  toggleVisiblity,
  showComponent,
  visible
}) => {
  //const showComponent = { display: visible ? "" : "none" }

  //const token = user.token
  //const decoded = jwt.verify(token, "secretword")

  return (
    <React.Fragment>
      <div className="blogStyle">
        <div id="blog">
          {`${blog.title} by ${blog.author}`}
          <button
            id="revealbutton"
            onClick={() => toggleVisiblity()}
            style={{ cursor: `pointer` }}
          >
            {visible ? "Hide" : "View"}
          </button>
        </div>
        <div id="hidden" style={showComponent}>
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
    </React.Fragment>
  )
}
Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  updateLikes: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired
  //user: PropTypes.object.isRequired
}
export default Blog

/*<div>
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
