// load type definitions from Cypress module
/// <reference types="cypress" />

// -- Chainable é um comando que pode ser enccadeado tipo comando().outrocomando()...
declare namespace Cypress {
  interface Chainable {
    /**
     * Custom command to visit google page
     * @example cy.google()
     */
    google(): Chainable<Window>;
  }
}
