import { Page, Locator } from "@playwright/test";

export class ContactPage {
  page: Page;
  emailField: Locator;
  submitButton: Locator;

  constructor(page: Page) {
    this.page = page;

    // Email field - targets common email input selectors
    this.emailField = page.getByRole("textbox", { name: "Business email*" });
    // Submit button - targets common submit button selectors
    this.submitButton = page.getByRole("button", { name: "Submit" });
  }

  async fillEmail(email: string) {
    //  clear the form field before filling
    await this.emailField.clear();
    //  fill the email field
    await this.emailField.fill(email);
  }

  async submitForm() {
    await this.submitButton.first().click();
  }

  async verifyContactPageURL() {
    await this.page.waitForURL("/contact-sales/");
  }
}
