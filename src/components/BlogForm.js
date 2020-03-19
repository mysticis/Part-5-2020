import React from "react"

const BlogForm = ({
  addBlog,
  handleTitle,
  handleAuthor,
  handleUrl,
  title,
  author,
  url
}) => {
  return (
    <React.Fragment>
      <h3>Create New</h3>
      <form onSubmit={addBlog}>
        Title: <input type="text" value={title} onChange={handleTitle} />
        <br />
        <br />
        Author: <input type="text" value={author} onChange={handleAuthor} />
        <br />
        <br />
        Url: <input type="text" value={url} onChange={handleUrl} />
        <br />
        <br />
        <button type="submit">Create</button>
      </form>
    </React.Fragment>
  )
}

export default BlogForm
