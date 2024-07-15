describe("navbar tests", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });
  it("does the navbar show all the contents", () => {
    cy.get("[data-test='website-logo']").should("exist");
    cy.get("[data-test='login-button']").should("exist");
    cy.get("[data-test='signup-button']").should("exist");
    cy.get("[data-test='home-link']").should("exist");
    cy.get("[data-test='events-link']").should("exist");
  });
});
