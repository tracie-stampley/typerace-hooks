describe('Snippet tests', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/films?limit=3'
    ,[
      {
        title: 'Test Title 1'
        ,director: 'Test Director 1'
        ,description: 'Test Description 1'
      }
      ,{
        title: 'Test Title 2'
        ,director: 'Test Director 2'
        ,description: 'Test Description 2'
      }
      ,{
        title: 'Test Title 3'
        ,director: 'Test Director 3'
        ,description: 'Test Description 3'
      }
    ]).as('films-request');
    cy.visit('/');
  });

  it('Should allow user to select and type title snippet', () => {
    cy.wait('@films-request').then(() => {
      cy.contains('Film Title').click().then(() => {
        cy.contains('Test Title 2');
        cy.contains('Test Title 3');

        cy.contains('Test Title 1').click().then(() => {
          cy.get('[data-cy=selected-snippet]').contains('Test Title 1');
          
          cy.get('[data-cy=typing-input]').type('Test Title 1').then(() => {
            cy.contains('Done');
          });
        });
      });
    });
  });

  it('Should allow user to select and type director snippet', () => {
    cy.wait('@films-request').then(() => {
      cy.contains('Director').click().then(() => {
        cy.contains('Test Director 2');
        cy.contains('Test Director 3');

        cy.contains('Test Director 1').click().then(() => {
          cy.get('[data-cy=selected-snippet]').contains('Test Director 1');
          
          cy.get('[data-cy=typing-input]').type('Test Director 1').then(() => {
            cy.contains('Done');
          });
        });
      });
    });
  });
  
  it('Should allow user to select and type description snippet', () => {
    cy.wait('@films-request').then(() => {
      cy.contains('Description').click().then(() => {
        cy.contains('Test Description 2');
        cy.contains('Test Description 3');

        cy.contains('Test Description 1').click().then(() => {
          cy.get('[data-cy=selected-snippet]').contains('Test Description 1');
          
          cy.get('[data-cy=typing-input]').type('Test Description 1').then(() => {
            cy.contains('Done');
          });
        });
      });
    });
  });
});