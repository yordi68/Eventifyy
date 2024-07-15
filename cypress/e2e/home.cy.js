describe("template spec", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });
  it("does the hero ui render everything", () => {
    cy.get("[data-test='hero-heading']").contains(
      "Do not miss out! Explore the vibrant events happening locally and globally."
    );
    cy.get("[data-test='hero-heading']").should(
      "contain",
      "Do not miss out! Explore the vibrant events happening locally and globally."
    );
    cy.get("[data-test='search-input']").should("exist");
    // cy.get("[data-test='submit-button']");
  });
});
