/// <reference types="cypress" />

// eslint-disable-next-line no-unused-vars
let TOTAL_USERS = 10;

describe("Test de endpoints", () => {
  it("Endpoint to check index title", () => {
    cy.visit("/");
    cy.title().should("eq", "My example app");
  });
});
