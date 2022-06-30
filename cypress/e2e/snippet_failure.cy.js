describe('Snippet Failure Test', () => {
    beforeEach(() => {
      cy.intercept('GET', '**/films?limit=3').as('films-request');
      cy.visit('/');
    });

  it('Should allow user to select and type description snippet', () => {
    cy.wait('@films-request').then(interception => {
      cy.contains('Description').click().then(() => {
        cy.contains(interception.response.body[0].description).click().then(() => {
          cy.get('[data-cy=typing-input]').type('Test Description 1').then(() => {
            cy.contains('Done');
          });
        });
      });
    });
  });
});