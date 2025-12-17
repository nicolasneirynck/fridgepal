describe('Ingredient search and suggestions', () => {
  // beforeEach(() => {
  //   cy.visit('http://localhost:5173');
    
  // });
  beforeEach(() => {
    cy.login('nicolas@example.com','12345678');
  });

  it('shows ingredient suggestions when typing', () => {
    cy.intercept('GET', 'http://localhost:3000/api/ingredients*', {
      fixture: 'ingredients.json',
    }).as('getIngredients');

    cy.get('[data-cy=ingredient-input]').type('run');
    cy.wait('@getIngredients');
    cy.get('ul [data-cy=ingredient-suggestion]').each((el) => {
      const text = el.text().trim().toLowerCase();
      expect(['rundergehakt', 'kipfilet', 'tofu', 'ahornsiroop','aardappel']).to.include(text);
    });
  });

  it('shows an error message when ingredients API fails', () => {
    cy.intercept('GET', 'http://localhost:3000/api/ingredients*', {
      statusCode: 500,
      body: { error: 'Internal server error' },
    }).as('getIngredientsFail');

    cy.get('[data-cy=ingredient-input]').type('runder');
    cy.wait('@getIngredientsFail');
    cy.get('[data-cy=axios_error_message]').should('exist');
  });
});
