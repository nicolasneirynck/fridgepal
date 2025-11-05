describe('Add and remove recipe', () => {
  it('should add a recipe', () => {
    cy.visit('http://localhost:5173/add-recipe');
    //TOEVOEGEN
    cy.get('[data-cy=recipename-input]').type('Balletjes in tomatensaus');
    cy.get('[data-cy=description-input]').type('Op grootmoederswijze');
    cy.get('[data-cy=time-input]').type('30');
    cy.get('[data-cy=category1-input]').click();
    cy.get('[data-cy=next-step]').click();

    cy.get('[data-cy=ingredient-input]').type('runder');
    cy.get('ul [data-cy=ingredient-suggestion]').first().click();
    cy.get('[data-cy=amount0-input]').type('500');
    cy.get('[data-cy=unit0-input]').type('gr');
    cy.get('[data-cy=next-step]').click();

    cy.get('[data-cy=instruction0-input]').type('Draai de balletjes');
    cy.get('[data-cy=next-instruction]').click();
    cy.get('[data-cy=instruction1-input]').type('Roer ze door de tomatensaus uit blik');
    cy.get('[data-cy=submit_recipe]').click();
    
    //CHECKEN
    // TODO uitzoeken hoe de lengte van lijst te testen
    cy.get('[data-cy=balletjesintomatensaus]').click(); // miss dynamischer maken door lijst te hebben en dan .last()?
    cy.get('[data-cy=recipe_name]').contains('Balletjes in tomatensaus');
    cy.get('[data-cy=description]').contains('Op grootmoederswijze');
    // TODO bereidingstijd nog integreren in receptdetails
    // TODO uitvinden hoe categorie te checken -> wordt per id bijgehouden
    cy.get('[data-cy=ingredients]').eq(0).contains('Rundergehakt');
    // TODO uitvinden hoe amount en unit te checken
    cy.get('[data-cy=instruction0]').contains('Draai de balletjes');
    cy.get('[data-cy=instruction1]').contains('Roer ze door de tomatensaus uit blik');
  });
  // verwijderen
  it('should remove the recipe', () => {
    cy.visit('http://localhost:5173/');
    cy.get('[data-cy=balletjesintomatensaus]').click(); // miss dynamischer maken door lijst te hebben en dan .last()?
    cy.get('[data-cy=recipe_remove_btn]').click(); // miss dynamischer maken door lijst te hebben en dan .last()?
    
    // TODO lengte checken?
  });
});