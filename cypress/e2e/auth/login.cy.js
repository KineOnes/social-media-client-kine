describe("Login Form", () => {
  beforeEach(() => {
    // Visit the root URL before each test
    cy.visit("/");
    cy.wait(500); // Wait for elements to load
  });

  it("Allows user to log in with valid credentials and email ending in @stud.noroff.no", () => {
    // Open the login form using a more specific selector
    cy.get('#registerForm button[data-auth="login"]').click();
    cy.wait(500);

    // Enter valid Noroff email and password
    cy.get("#loginEmail").type("validuser@stud.noroff.no");
    cy.get("#loginPassword").type("ValidPassword123");

    // Submit the form
    cy.get("#loginForm").submit();
    cy.wait(500);

    // Assert that login was successful (check if logout button is visible)
    cy.get('button[data-auth="logout"]', { timeout: 8000 }) // Increase timeout to 8 seconds
      .should("be.visible");
  });

  it("Displays an error for non-Noroff student emails", () => {
    // Open the login form using a more specific selector
    cy.get('#registerForm button[data-auth="login"]').click();
    cy.wait(500);

    // Enter an invalid email (not ending with @stud.noroff.no) and valid password
    cy.get("#loginEmail").type("invaliduser@example.com");
    cy.get("#loginPassword").type("ValidPassword123");

    // Submit the form
    cy.get("#loginForm").submit();
    cy.wait(500);

    // Assert that an error message is shown
    cy.get("#loginError", { timeout: 6000 })
      .should("be.visible")
      .and("contain", "Invalid email");
  });
});
