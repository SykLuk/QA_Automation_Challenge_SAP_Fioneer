import { Page, Locator } from "@playwright/test";

export class HomePage {
  page: Page;
  endToEndSection: Locator;
  productsMenu: Locator;
  financeAndEsgLink: Locator;
  esgKpiEngineLink: Locator;
  getInTouchButton: Locator;

  constructor(page: Page) {
    this.page = page;
    // Target the cards-block container that contains the "End-to-end solutions for" heading text
    this.endToEndSection = page.locator(
      '[class*="cards-block"]:has-text("End-to-end solutions for financial services")'
    );
    this.productsMenu = page.getByRole("button", { name: "Products" });
    this.financeAndEsgLink = page
      .locator("button")
      .filter({ hasText: /^Finance & ESG$/ });
    this.esgKpiEngineLink = page.getByRole("link", { name: "ESG KPI Engine" });
    this.getInTouchButton = page.getByLabel("Get in touch");
  }

  async openHomePage() {
    await this.page.goto("/");
  }

  async openProductsFinanceAndEsg() {
    // Click the Products menu and then the Finance & ESG link.
    await this.productsMenu.first().click();
    await this.financeAndEsgLink.first().click();
  }

  async clickEsgKpiEngine() {
    await this.esgKpiEngineLink.click();
  }

  async clickGetInTouch() {
    await this.getInTouchButton.first().click();
  }

  /**
   * Get the card-block section container that contains the "End-to-end solutions" heading
   */
  getEndToEndCardBlockSection() {
    return this.endToEndSection;
  }

  /**
   * Get all cards within a specific section
   */
  getCardsInSection(section: Locator) {
    // Look for common card selectors - adjust based on actual HTML structure
    return section.locator('[class="col-12 col-md-4"]');
  }

  /**
   * Verify that a card contains all expected elements:
   * - href (link)
   * - image
   * - h3 heading
   * - text/description
   * - "Learn more" button
   */
  async verifyCardElements(card: Locator) {
    // Get the link element (cards are typically wrapped in <a> tags or contain links)
    const link = card.locator("a").first();
    await link.waitFor({ state: "visible" });

    // Verify the link has an href attribute
    const href = await link.getAttribute("href");
    if (!href) {
      throw new Error("Card link does not have an href attribute");
    }

    // Verify image exists
    const image = card.locator("img").first();
    await image.waitFor({ state: "visible" });

    // Get h3 heading element
    const heading = card.locator("h3").first();
    await heading.waitFor({ state: "visible" });

    // Get description text element (typically in a p tag)
    const description = card.locator("p").first();
    await description.waitFor({ state: "visible" });

    // Verify "Learn more" button/link exists
    const learnMoreButton = card.getByRole("link", { name: "Learn more" });
    await learnMoreButton.waitFor({ state: "visible" });

    return {
      href,
      hasImage: await image.isVisible(),
      hasHeading: await heading.isVisible(),
      hasDescription: await description.isVisible(),
      hasLearnMoreButton: await learnMoreButton.isVisible(),
      headingText: (await heading.textContent())?.trim() || "",
      descriptionText: (await description.textContent())?.trim() || "",
    };
  }

  /**
   * Get the text content from a card (heading and description)
   */
  async getCardTextContent(card: Locator) {
    const heading = card.locator("h3").first();
    const description = card.locator("p").first();

    return {
      heading: (await heading.textContent())?.trim() || "",
      description: (await description.textContent())?.trim() || "",
    };
  }
}
