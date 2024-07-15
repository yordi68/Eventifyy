describe("does everything on the events page display", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/events");
  });
  it("does the main section of the events work", () => {
    cy.get("[data-test='hero-search-page']").should(
      "contain",
      "Explore a world of events."
    );
    cy.get("[data-test='hero-search-page']").should(
      "contain",
      "Find what excites you!"
    );
  });
});
