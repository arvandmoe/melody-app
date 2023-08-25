describe("Login Page E2E Test", () => {
  it("should successfully login with valid credentials", () => {
    cy.visit("http://localhost:3000/auth/login");

    cy.get('input[name="username"]').type("John");
    cy.get('input[name="password"]').type("123456");

    cy.intercept("POST", `${process.env.NEXT_PUBLIC_BASEURL}/site/login`, {
      statusCode: 200,
      body: {
        data: {
          result: {
            access_token: "mocked-access-token",
          },
        },
      },
    }).as("loginRequest");

    cy.get("#loginBtn").click();

    cy.url().should("eq", "http://localhost:3000/");
    cy.getCookie("token").should("have.property", "value");
  });

  it("should display error messages for invalid credentials", () => {
    cy.visit("http://localhost:3000/auth/login");

    cy.get('input[name="username"]').type("invalid-username");
    cy.get('input[name="password"]').type("invalid-password");

    cy.intercept("POST", "http://localhost:3000/auth/login", {
      statusCode: 422,
      body: {
        error: "Invalid credentials",
      },
    }).as("loginRequest");

    cy.get("#loginBtn").click();

    cy.contains("Please check your credentials");
  });
});
