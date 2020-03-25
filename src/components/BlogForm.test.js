import React from "react"
import { render, fireEvent } from "@testing-library/react"
import "@testing-library/jest-dom/extend-expect"
import BlogForm from "./BlogForm"

test("<BlogForm /> updates parent state and calls onsubmit", () => {
  const createBlog = jest.fn()
  const component = render(<BlogForm createBlog={createBlog} />)
  const author = component.container.querySelector("#author")
  const title = component.container.querySelector("#title")
  const url = component.container.querySelector("#url")
  const form = component.container.querySelector("form")
  fireEvent.change(author, {
    target: { value: "Joe Martin" }
  })
  fireEvent.change(title, {
    target: { value: "Testing forms with React Testing Library" }
  })
  fireEvent.change(url, {
    target: { value: "testurl123.com" }
  })
  fireEvent.submit(form)
  expect(createBlog.mock.calls.length).toBe(1)
  expect(createBlog.mock.calls[0][0].title).toBe(
    "Testing forms with React Testing Library"
  )
  expect(createBlog.mock.calls[0][0].author).toBe("Joe Martin")
  expect(createBlog.mock.calls[0][0].url).toBe("testurl123.com")
})
