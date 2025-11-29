describe('General', () => {
  it('draait de applicatie', () => {
    cy.visit('http://localhost:5173');
    // cy.get('h1').should('exist'); 
  });
  it('should login', () => {
    cy.login('thomas.aelbrecht@hogent.be','12345678');
  });
});