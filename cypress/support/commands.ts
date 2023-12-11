import '@testing-library/cypress/add-commands';

declare global {
  namespace Cypress {
    interface Chainable {
      setToken: () => void;
      stubBoardsAPI: () => void;
    }
  }
}

Cypress.Commands.add('setToken', () => {
  cy.setCookie('token', '1');
});
