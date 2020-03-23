import React from "react"
import "@testing-library/jest-dom"
import { render } from "@testing-library/react"
import { prettyDOM } from "@testing-library/dom"
import Blog from "./Blog"

test("renders title and author of blog but not likes or url", () => {
  const blog = {
    title: "Testing using react testing library",
    author: "Joe Martin",
    url: "testurl.com",
    likes: 3
  }
  const updateLikes = () => "Likes Updated"
  const deleteBlog = () => "Blog Deleted"
  const component = render(
    <Blog blog={blog} updateLikes={updateLikes} deleteBlog={deleteBlog} />
  )
  const div = component.container.querySelector(".blogStyle")

  expect(div).toHaveTextContent(
    "Testing using react testing library by Joe Martin"
  )
  console.log(prettyDOM(div))
})
