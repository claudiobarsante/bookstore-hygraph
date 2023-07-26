import { cy, Cypress, describe, it } from 'local-cypress';
import { createFakeUser } from '../support/generateFakeUser';

describe('User', () => {
  describe('Sign in', () => {
    it('should sign in', () => {
      cy.visit('/sign-in');
      cy.url().should('contain', Cypress.config().baseUrl + '/sign-in');

      cy.get('#email').type('testing@bookstore.com');
      cy.get('#password').type('123456');

      cy.findByRole('button', { name: /sign in/i }).click();

      //Todo: test after signin if the user is redirected to the page that he was on before signing in
    });

    it('should show an error message when the user types an invalid email or password', () => {
      cy.visit('/sign-in');
      cy.url().should('contain', Cypress.config().baseUrl + '/sign-in');

      cy.get('#email').type('testing@bookstore.com');
      cy.get('#password').type('invalid-password');

      cy.findByRole('button', { name: /sign in/i }).click();
      cy.findByText(/username or password is invalid/i).should('exist');
    });
  });

  describe('Sign up', () => {
    it('should sign up', () => {
      const fakeUser = createFakeUser();

      cy.visit('/sign-up');
      cy.url().should('contain', Cypress.config().baseUrl + '/sign-up');

      cy.get('#username').type(fakeUser.username);
      cy.get('#email').type(fakeUser.email);
      cy.get('#password').type(fakeUser.password);
      cy.get('#confirmPassword').type(fakeUser.password);

      cy.findByRole('button', { name: /sign up/i }).click();

      cy.url().should('equal', Cypress.config().baseUrl + '/');
    });

    it('should show error message for invalid fields', () => {
      cy.visit('/sign-up');
      cy.url().should('contain', Cypress.config().baseUrl + '/sign-up');

      // -- username --
      cy.get('#username').click().clear().blur();
      cy.findByText('"username" is not allowed to be empty').should('exist');
      cy.get('#username').click().type('abc').blur();
      cy.findByText(
        '"username" length must be at least 5 characters long'
      ).should('exist');
      // -- email --
      cy.get('#email').click().clear().blur();
      cy.findByText('"email" is not allowed to be empty').should('exist');
      cy.get('#email').click().type('<email>').blur();
      // -- password --
      cy.get('#password').click().clear().blur();
      cy.findByText('"password" is not allowed to be empty').should('exist');
      cy.get('#password').click().type('fail').blur();
      cy.findByText(
        '"password" length must be at least 6 characters long'
      ).should('exist');
      // -- confirmPassword --
      cy.get('#confirmPassword').click().clear().blur();
      cy.findByRole('button', { name: /sign up/i }).click();
      cy.findByText('"confirmPassword" is not allowed to be empty').should(
        'exist'
      );
      cy.get('#password').click().type('123456').blur();
      cy.get('#confirmPassword').click().type('fail').blur();
      cy.findByRole('button', { name: /sign up/i }).click();
    });
  });
});
