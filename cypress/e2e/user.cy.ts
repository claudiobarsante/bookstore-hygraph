import { cy, Cypress, describe, it } from 'local-cypress';

describe('User', () => {
  it('should sign in', () => {
    cy.visit('/sign-in');
    cy.url().should('contain', Cypress.config().baseUrl + '/sign-in');

    cy.get('#email').type('testing@bookstore.com');
    cy.get('#password').type('123456');

    cy.findByRole('button', { name: /sign in/i }).click();

    //Todo: test after signin if the user is redirected to the page that he was on before signing in
  });
});
