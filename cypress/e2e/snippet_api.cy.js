describe('Snippet API tests', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/films?limit=3').as('films-request');
    cy.visit('/');
  });

  it('Should show titles from API when film title is selected', () => {
    cy.wait('@films-request').then(interception => {
      cy.contains('Film Title').click().then(() => {
        interception.response.body.forEach(element => {
          cy.contains(element.title);
        });
      });
    });
  });

  it('Should show directors from API when film director is selected', () => {
    cy.wait('@films-request').then(interception => {
        cy.contains('Director').click().then(() => {
          interception.response.body.forEach(element => {
            cy.contains(element.director);
          });
        });  
    });
  });

  it('Should show descriptions from API when film description is selected', () => {
    cy.wait('@films-request').then(interception => {
        cy.contains('Description').click().then(() => {
          interception.response.body.forEach(element => {
            cy.contains(element.description);
          });
        });
    });
  });
});