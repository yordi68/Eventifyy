describe("navbar tests", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });
  it("does the navbar show all the contents", () => {
    cy.get("[data-test='website-logo']").should("exist");
  });
});
