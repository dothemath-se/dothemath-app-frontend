/* eslint-disable no-undef */
/* eslint-disable jest/expect-expect */

describe('dothemath.app', () => {
  beforeEach(() => {
    Cypress.Cookies.preserveOnce('name', 'subject', 'threadId');
  });

  it('1. Registration', () => {
    cy.visit('/');
    cy.contains('Innan vi börjar...');
    cy.contains('button', 'Börja').should('be.disabled');
    cy.get('[placeholder^="Välj ett"]').type('Cypress');
    cy.contains('förstår och accepterar').click();
    cy.contains('har läst och accepterar').click();
    cy.contains('button', 'Börja').should('be.enabled');

    cy.percySnapshot();

    cy.contains('button', 'Börja').click();
    cy.contains('Välj ämne');
    cy.contains('Bot-Test', { matchCase: false });
  });

  it('2. Subject List', () => {
    cy.visit('/');
    cy.contains('Välj ämne');
    cy.contains('Bot-Test', { matchCase: false });

    cy.percySnapshot();

    cy.contains('Bot-Test', { matchCase: false }).click();
    cy.contains('Ställ en ny');
  });

  it('3. Chat', () => {
    cy.visit('/');
    cy.contains('Ställ en ny');
    cy.contains('Bot-Test', { matchCase: false });
    cy.get('[placeholder^="Skriv"]').type('testmeddelande 1{enter}');
    cy.contains('p', 'testmeddelande 1');
    cy.get('[placeholder^="Skriv"]').type('testmeddelande 2');
    cy.get('button[aria-label^="Skicka"]').click();
    cy.contains('p', 'testmeddelande 1');
    cy.contains('p', 'testmeddelande 2');

    cy.percySnapshot();
  });

  it('4. Chat revisited', () => {
    cy.visit('/');
    cy.contains('Ställ en ny');
    cy.contains('Bot-Test', { matchCase: false });
    cy.contains('p', 'testmeddelande 1');
    cy.contains('p', 'testmeddelande 2');

    cy.percySnapshot();
  });
});
