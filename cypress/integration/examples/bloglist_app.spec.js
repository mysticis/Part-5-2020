describe("BlogList App", function() {
  beforeEach(function() {
    cy.login({ username: "Augusta", password: "godisgood" })
  })
  it("Login form is displayed by default", function() {
    cy.contains("Log in to application")
    cy.contains("Username")
    cy.contains("Password")
    cy.contains("Cancel")
  })
})
