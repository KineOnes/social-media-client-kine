describe("Login Form", () => {
  const validEmail = "user@example.com"; // Replace with a valid test email
  const validPassword = "password123"; // Replace with a valid test password
  const invalidEmail = "invalid@example.com";
  const invalidPassword = "wrongpassword";

  // Runs before each test to ensure starting from the login page
  beforeEach(() => {
    cy.visit("/"); // Adjust this to the route of your login page if needed
    cy.wait(500); // Optional wait for page load stability
  });

  it("The user can log in with the login form with valid credentials", () => {
    // Open the login modal
    cy.get("button[data-auth='login']").click();
    cy.wait(500);

    // Input valid login credentials
    cy.get("#loginEmail").type(validEmail);
    cy.get("#loginPassword").type(validPassword);

    // Submit the login form
    cy.get("#loginForm").submit();
    cy.wait(500);

    // Verify login success by checking for a logged-in specific element
    cy.get("button[data-auth='logout']").should("be.visible");
  });

  it("Displays an error message with invalid credentials", () => {
    // Open the login modal
    cy.get("button[data-auth='login']").click();
    cy.wait(500);

    // Input invalid login credentials
    cy.get("#loginEmail").type(invalidEmail);
    cy.get("#loginPassword").type(invalidPassword);

    // Submit the login form
    cy.get("#loginForm").submit();
    cy.wait(500);

    // Verify error message is displayed and no token is stored
    cy.get("#loginError").should("be.visible").and("contain", "Invalid login");
    cy.window().then((win) => {
      const token = win.localStorage.getItem("token");
      expect(token).to.be.null;
    });
  });

  it("Allows the user to log out successfully", () => {
    // Log in first to enable logout option
    cy.get("button[data-auth='login']").click();
    cy.get("#loginEmail").type(validEmail);
    cy.get("#loginPassword").type(validPassword);
    cy.get("#loginForm").submit();
    cy.wait(500);

    // Click on the logout button and confirm
    cy.get("button[data-auth='logout']").click();
    cy.wait(500);

    // Confirm the token is removed from local storage
    cy.window().then((win) => {
      const token = win.localStorage.getItem("token");
      expect(token).to.be.null;
    });

    // Ensure the user is back to the login screen or expected page
    cy.get("button[data-auth='login']").should("be.visible");
  });
});
