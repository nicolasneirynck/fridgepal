describe('Recipes list', () => {

  beforeEach(() => {
    cy.login('nicolas@example.com','12345678');
  });
  it('should show the recipes', () => {
    cy.intercept(
      'GET',
      'http://localhost:3000/api/recipes',
      { fixture: 'recipes.json' },
    );

    cy.visit('http://localhost:5173');
    cy.get('[data-cy^=recipe-card-]').should('have.length', 2); // ^= is alle dat begint met deze waarde
    cy.get('[data-cy=spaghettibolognese]').contains('Spaghetti Bolognese');
    cy.get('[data-cy=vegetarischecurry]').contains('Vegetarische Curry');
  });

  it('should show a loading indicator for a very slow response', () => {
    cy.intercept(
      'http://localhost:3000/api/recipes',
      (req) => {
        req.on('response', (res) => {
          res.setDelay(1000);
        });
      },
    ).as('slowResponse'); 
    cy.visit('http://localhost:5173'); 
    cy.get('[data-cy=loader]').should('be.visible'); 
    cy.wait('@slowResponse'); 
    cy.get('[data-cy=loader]').should('not.exist'); 
  });

  it('should show all recipes with Rundergehakt', () => {
    cy.intercept('GET', 'http://localhost:3000/api/recipes', {
      fixture: 'recipes.json',
    }).as('getRecipes');

    cy.intercept('GET', 'http://localhost:3000/api/ingredients*', {
      fixture: 'ingredients.json',
    }).as('getIngredients');

    cy.visit('http://localhost:5173');
    cy.wait('@getRecipes');

    cy.get('[data-cy=ingredient-input]').type('runder');
    cy.wait('@getIngredients');
    cy.get('ul [data-cy=ingredient-suggestion]').first().click();

    cy.get('[data-cy^=recipe-card-]').should('have.length.at.least', 1);
  });

  it('should show a message when no recipes found', () => {
    cy.intercept('GET', 'http://localhost:3000/api/recipes', {
      fixture: 'recipes.json',
    }).as('getRecipes');

    cy.intercept('GET', 'http://localhost:3000/api/ingredients*', {
      fixture: 'ingredients.json',
    }).as('getIngredients');

    cy.visit('http://localhost:5173');
    cy.wait('@getRecipes');

    cy.get('[data-cy=ingredient-input]').type('aard');
    cy.wait('@getIngredients');
    cy.get('ul [data-cy=ingredient-suggestion]')
      .contains('aardappel')   // exact tekst, case-insensitive
      .click();
    cy.get('[data-cy=no_recipes]').should('exist');
  });

  it('should show an error if the API call fails', () => {
    cy.intercept('GET', 'http://localhost:3000/api/recipes', {
      statusCode: 500,
      body: {
        error: 'Internal server error',
      },
    });
    cy.visit('http://localhost:5173');

    cy.get('[data-cy=axios_error_message').should('exist');
  });

});