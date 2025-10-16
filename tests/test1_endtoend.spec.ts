import { test, expect } from "@playwright/test";
import { HomePage } from "./pages/HomePage";
import cardsData from "./data/endToEndCardsData.json";

test.describe("End-to-End Solutions Section Tests", () => {
  let home: HomePage;

  test.beforeEach(async ({ page }) => {
    home = new HomePage(page);
    await home.openHomePage();
  });

  test("verify End-to-end solutions for financial services section", async ({
    page,
  }) => {
    // Step 1: Find the card-block section with "End-to-end solutions" heading
    const cardBlock = home.getEndToEndCardBlockSection();

    // Ensure the section is scrolled into view and is visible
    await cardBlock.scrollIntoViewIfNeeded();
    await expect(cardBlock).toBeVisible();

    // Verify the section contains the expected h2 heading text
    await expect(cardBlock.locator("h2")).toContainText(
      "End-to-end solutions for financial services"
    );
    // Verify the section contains expected subtexts
    await expect(cardBlock).toContainText("Banking");
    await expect(cardBlock).toContainText("Insurance");
    await expect(cardBlock).toContainText("Finance & ESG");

    // Step 2: Get all cards within the section
    const cards = home.getCardsInSection(cardBlock);

    // Step 3: Verify each card contains all required elements and text matches JSON data
    const cardCount = await cards.count();
    // Verify each card
    for (let i = 0; i < cardCount; i++) {
      const card = cards.nth(i);
      const expectedCardData = cardsData.cards[i];

      // Verify all elements in the card
      const cardDetails = await home.verifyCardElements(card);

      // Assert that href matches the exact URL from JSON data
      expect(cardDetails.href).toBe(expectedCardData.url);

      // Assert that all other elements are present and visible
      expect(cardDetails.hasImage).toBe(true);
      expect(cardDetails.hasHeading).toBe(true);
      expect(cardDetails.hasDescription).toBe(true);
      expect(cardDetails.hasLearnMoreButton).toBe(true);

      // Verify heading and description text match JSON data
      expect(cardDetails.headingText).toBe(expectedCardData.heading);
      expect(cardDetails.descriptionText).toBe(expectedCardData.description);

      console.log(
        `✓ Card ${i + 1} (${
          expectedCardData.heading
        }): All elements verified and text matches JSON data`
      );
    }
  });
});
