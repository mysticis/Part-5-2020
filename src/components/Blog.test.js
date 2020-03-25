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
    //const updateLikes = () => "Likes updated"
    const deleteBlog = () => "Blog Deleted"
    const mockHandler = jest.fn()
    component = render(
      <Blog
        blog={blog}
        updateLikes={mockHandler}
        deleteBlog={deleteBlog}
        toggleVisiblity={mockHandler}
      />
    )
  })
  test("should render blog title and author only by default", () => {
    const div = component.container.querySelector("#blog")
    expect(div).toHaveTextContent(
      "Component testing is done with react-testing-library by Raymond"
    )
    expect(div).not.toHaveTextContent("Likes: 4")
    expect(div).not.toHaveTextContent("testurl.com")
  })
  test("should reveal url and likes when view button is clicked", () => {
    const button = component.container.querySelector("#revealbutton")
    fireEvent.click(button)
    const div = component.container.querySelector("#hidden")
    expect(div).toHaveTextContent("Likes: 4")
    expect(div).toHaveTextContent("testurl.com")
    expect(div).toHaveTextContent("Raymond")
  })
})
