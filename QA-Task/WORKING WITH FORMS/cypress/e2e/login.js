describe('template spec', () => {
  it('validate user can login in with valid credentials (using fixture)', function () {
    cy.fixture('loginData').then((user) => {
      cy.visit('https://testwebapp3456.netlify.app/')
      cy.get('#username').type(user.username)
      cy.get('#password').type(user.password)
      cy.get('#loginForm').submit()
      cy.get('#loginMessage').should('contain', 'Login successful! Redirecting...')
    })
  })
  it('validate user can login with invalid credentials', function () {
    cy.fixture('loginData').then((user) => {
      cy.visit('https://testwebapp3456.netlify.app/')
      cy.get('#username').type(user.invalidUsername)
      cy.get('#password').type(user.invalidPassword)
      cy.get('#loginForm').submit()
      cy.get('#loginMessage').should('contain', 'Invalid username or password.')
    })
  })
})