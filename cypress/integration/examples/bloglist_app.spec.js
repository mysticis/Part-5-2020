describe("BlogList App", function() {
  beforeEach(function() {
    cy.request("POST", "http://localhost:3003/api/testing/reset")
    cy.login({ username: "mary", name: "Saintmary", password: "marysecret" })
  })
  it("Login form is displayed by default", function() {
    cy.contains("Log in to application")
    cy.contains("Username")
    cy.contains("Password")
    cy.contains("Cancel")
  })
})

describe("Login", function() {
  it("Succeeds with correct credentials", function() {
    cy.contains("Login").click()
    cy.get("#username").type("mary")
    cy.get("#password").type("marysecret")
    cy.get("#login-button").click()
    cy.contains("Saintmary logged in")
    cy.get("#logout").click()
  })
  it("Fails with invalid password", function() {
    cy.contains("Login").click()
    cy.get("#username").type("mary")
    cy.get("#password").type("secret")
    cy.get("#login-button").click()
    cy.get(".error")
      .should("contain", "Invalid username and/or password!")
      .and("have.css", "color", "rgb(255, 0, 0)")
      .and("have.css", "border-style", "solid")
    cy.get("html").should("not.contain", "Saintmary logged in")
  })
})
