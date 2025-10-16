import { test, expect } from "@playwright/test";
import { HomePage } from "./pages/HomePage";

test.describe("ESG Navigation Tests", () => {
  let home: HomePage;

  test.beforeEach(async ({ page }) => {
    home = new HomePage(page);
    await home.openHomePage();
  });

  test("verify navigate to ESG KPI Engine via Products > Finance & ESG", async ({
    page,
  }) => {
    // Open the Products > Finance & ESG and click ESG KPI Engine
    await home.openProductsFinanceAndEsg();
    await home.clickEsgKpiEngine();

    // Verify redirect to ESG KPI Engine page
    await expect(page).toHaveURL("/finance-esg/esg-kpi-engine/");
    // simple content check for confirmation
    await expect(
      page.getByRole("heading", { name: "Master ESG KPI management" })
    ).toBeVisible();
  });
});
