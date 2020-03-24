import React from "react"
import { render, fireEvent } from "@testing-library/react"
import "@testing-library/jest-dom/extend-expect"
import { prettyDOM } from "@testing-library/dom"
import Blog from "./Blog"
describe("<Blog/>", () => {
  let component
  beforeEach(() => {
    const blog = {
      title: "Component testing is done with react-testing-library",
      author: "Raymond",
      url: "testurl.com",
      likes: 4
    }
    const updateLikes = () => "Likes updated"
    const deleteBlog = () => "Blog Deleted"
    const mockHandler = jest.fn()
    component = render(
      <Blog
        blog={blog}
        updateLikes={updateLikes}
        deleteBlog={deleteBlog}
        toggleVisiblity={mockHandler}
      />
    )
  })
  test("should render blog title and author only by default", () => {
    const div = component.container.querySelector("#blog")
    expect(div).not.toHaveTextContent("Likes: 4")
  })
})
