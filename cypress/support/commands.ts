/// <reference types="cypress" />
Cypress.Commands.add("login", (username, password) => {
  cy.request("POST", "http://137.74.230.245:81/site/login", {
    username,
    password,
  })
    .then((response) => {
      const { access_token, access_token_expration } = response.body.result;

      // Store the token in a cookie
      cy.setCookie("access_token", access_token);
      cy.setCookie("access_token_expration", access_token_expration);
    })
    .then(() => {
      // Return null to fulfill the Chainable<null> return type
      return null;
    });
});

declare namespace Cypress {
  interface Chainable {
    login(username: string, password: string): Chainable<void>;
  }
}
