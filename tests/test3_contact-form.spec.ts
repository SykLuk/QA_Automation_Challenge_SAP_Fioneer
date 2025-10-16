import { test, expect } from "@playwright/test";
import { faker } from "@faker-js/faker";
import { HomePage } from "./pages/HomePage";
import { ContactPage } from "./pages/ContactPage";

test.describe("Contact Form Validation Tests", () => {
  let home: HomePage;

  test.beforeEach(async ({ page }) => {
    home = new HomePage(page);
    await home.openHomePage();
  });

  test("verify contact form validation for business email", async ({
    page,
  }) => {
  const contactPage = new ContactPage(page);

  await home.clickGetInTouch();
  await contactPage.verifyContactPageURL();

  // List of different types of invalid emails to test
  const invalidEmails = [
    {
      value: faker.string.alphanumeric(10),
      description: "random alphanumeric string",
    },
    { value: "test@", description: "email with @ but no domain" },
    {
      value: "@example.com",
      description: "@ symbol with domain but no username",
    },
    { value: "plaintext", description: "plain text without @" },
  ];

  // Test each invalid email format
  for (const { value, description } of invalidEmails) {
    // Fill with invalid email
    await contactPage.fillEmail(value);

    // Try to submit the form
    await contactPage.submitForm();

    // Expect validation message to appear
    await expect(page.getByText("Email must be formatted")).toBeVisible();

    console.log(`Validated invalid email (${description}): ${value}`);
  }
});
});
