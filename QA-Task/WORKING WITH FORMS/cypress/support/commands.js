//Create objects to extend Cypress commands
Cypress.Commands.add("login", (username, password) => {
  cy.visit('https://testwebapp3456.netlify.app/')
  cy.get('#username').type(username)
  cy.get('#password').type(password)
  cy.get('#loginForm').submit()
})