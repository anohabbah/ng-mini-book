describe('Home', () => {
  it('Visits the initial project page', () => {
    cy.contains('Welcome to ng-minibook!')
    cy.contains('Search')
  })
})
