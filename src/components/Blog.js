import React, { useState } from "react"
const Blog = ({ blog, updateLikes }) => {
  const [visible, setVisible] = useState(false)
  const showComponent = { display: visible ? "" : "none" }
  const toggleVisiblity = () => setVisible(!visible)

  const blogStyle = {
    padding: 15,
    border: "solid",
    borderWidth: 2,
    borderRadius: 5,
    marginBottom: 5,
    cursor: "pointer"
  }
  return (
    <React.Fragment>
      <div style={blogStyle}>
        <div>
          {blog.title}{" "}
          <button
            onClick={() => toggleVisiblity()}
            style={{ cursor: `pointer` }}
          >
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
        </div>
      </div>
    </React.Fragment>
  )
}

export default Blog
