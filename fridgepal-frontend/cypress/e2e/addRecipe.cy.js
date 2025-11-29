describe('Add and remove recipe', () => {
  beforeEach(() => {
    cy.login('thomas.aelbrecht@hogent.be','12345678');
  });
  
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

  it('should show the error message for empty recipe name', () => {
    cy.visit('http://localhost:5173/add-recipe');
    cy.get('[data-cy=recipename-input]').click();
    cy.get('[data-cy=recipename-input]').blur();
    cy.get('[data-cy=label_input_error]').contains('Receptnaam is verplicht');
  });

  it('should show the error message for empty recipe description', () => {
    cy.visit('http://localhost:5173/add-recipe');
    cy.get('[data-cy=description-input]').click();
    cy.get('[data-cy=description-input]').blur();
    cy.get('[data-cy=description_input_error]').contains('Beschrijving is verplicht');
  });

  it('should show the error message for recipe description too short', () => {
    cy.visit('http://localhost:5173/add-recipe');
    cy.get('[data-cy=description-input]').type('short');
    cy.get('[data-cy=description-input]').blur();
    cy.get('[data-cy=description_input_error]').contains('Minstens 10 tekens');
  });

  it('should show the error message for empty time', () => {
    cy.visit('http://localhost:5173/add-recipe');
    cy.get('[data-cy=time-input]').click();
    cy.get('[data-cy=time-input]').blur();
    cy.get('[data-cy=label_input_error]').contains('Bereidingstijd is verplicht');
  });
  
  it('should show the error message for negative time', () => {
    cy.visit('http://localhost:5173/add-recipe');
    cy.get('[data-cy=time-input]').type(-5);
    cy.get('[data-cy=time-input]').blur();
    cy.get('[data-cy=label_input_error]').contains('Bereidingstijd moet minstens 1 minuut zijn');
  });

  it('should show the error message for when not selecting category', () => {
    cy.visit('http://localhost:5173/add-recipe');
    cy.get('[data-cy=next-step]').click();
    cy.get('[data-cy=categories_error]').contains('Kies minstens 1 categorie');
  });
  it('step 1 does not go to next step when required fields are empty', () => {
    cy.visit('http://localhost:5173/add-recipe');
    cy.get('[data-cy=next-step]').click();

    cy.get('[data-cy=label_input_error]').should('be.visible');
    cy.get('[data-cy=description_input_error]').should('be.visible');
    cy.get('[data-cy=label_input_error]').should('be.visible');
    cy.get('[data-cy=categories_error]').should('be.visible');

    cy.get('[data-cy=step-1]').should('exist');
    cy.get('[data-cy=step-2]').should('not.exist');
  });

  it('should show the error message for no ingredients added', () => {
    cy.visit('http://localhost:5173/add-recipe');
    cy.get('[data-cy=recipename-input]').type('Balletjes in tomatensaus');
    cy.get('[data-cy=description-input]').type('Op grootmoederswijze');
    cy.get('[data-cy=time-input]').type('30');
    cy.get('[data-cy=category1-input]').click();
    cy.get('[data-cy=next-step]').click();

    cy.get('[data-cy=next-step]').click();
    cy.get('[data-cy=ingredients_error]').contains('Voeg minstens één ingrediënt toe');
  });

  it('step 2 does not go to next step when no ingredients chosen', () => {
    cy.visit('http://localhost:5173/add-recipe');
    cy.get('[data-cy=recipename-input]').type('Balletjes in tomatensaus');
    cy.get('[data-cy=description-input]').type('Op grootmoederswijze');
    cy.get('[data-cy=time-input]').type('30');
    cy.get('[data-cy=category1-input]').click();
    cy.get('[data-cy=next-step]').click();

    cy.get('[data-cy=next-step]').click();
    cy.get('[data-cy=ingredients_error]').should('be.visible');

    cy.get('[data-cy=step-2]').should('exist');
    cy.get('[data-cy=step-3]').should('not.exist');
  });

  it('should show the error message for negative amount', () => {
    cy.visit('http://localhost:5173/add-recipe');
    cy.get('[data-cy=recipename-input]').type('Balletjes in tomatensaus');
    cy.get('[data-cy=description-input]').type('Op grootmoederswijze');
    cy.get('[data-cy=time-input]').type('30');
    cy.get('[data-cy=category1-input]').click();
    cy.get('[data-cy=next-step]').click();

    cy.get('[data-cy=ingredient-input]').type('runder');
    cy.get('ul [data-cy=ingredient-suggestion]').first().click();
    cy.get('[data-cy=amount0-input]').type('-5');
    cy.get('[data-cy=amount0-input]').blur();
    cy.get('[data-cy=amount0_error]').contains('Hoeveelheid moet groter dan 0 zijn');
  });

  it('should show error for empty instruction', () => {
    cy.visit('http://localhost:5173/add-recipe');
    cy.get('[data-cy=recipename-input]').type('Balletjes in tomatensaus');
    cy.get('[data-cy=description-input]').type('Op grootmoederswijze');
    cy.get('[data-cy=time-input]').type('30');
    cy.get('[data-cy=category1-input]').click();
    cy.get('[data-cy=next-step]').click();

    cy.get('[data-cy=ingredient-input]').type('runder');
    cy.get('ul [data-cy=ingredient-suggestion]').first().click();
    cy.get('[data-cy=next-step]').click();

    cy.get('[data-cy=submit_recipe]').click();
    cy.get('[data-cy=instruction_error]').contains('Vul een beschrijving in');
  });
});