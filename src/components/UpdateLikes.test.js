import React from "react"
import { render, fireEvent } from "@testing-library/react"
import "@testing-library/jest-dom/extend-expect"
import { prettyDOM } from "@testing-library/dom"
import Blog from "./Blog"

test("clicking the button call the event handler once", () => {
  const blog = {
    title: "Test Blog",
    author: "Jack Roby",
    url: "testurl.com",
    likes: 5
  }
  const mockHandler = jest.fn()
  const component = render(
    <Blog blog={blog} updateLikes={mockHandler} deleteBlog={mockHandler} />
  )
  const button = component.getByText("Like")
  fireEvent.click(button)
  fireEvent.click(button)
  expect(mockHandler.mock.calls.length).toBe(2)
})
