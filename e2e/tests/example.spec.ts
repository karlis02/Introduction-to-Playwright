import { test, expect } from "@playwright/test";

test("This test case have a title", async ({ page }) => {
  // Act
  await page.goto("https://playwright.dev/");
  // Assert - Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test("Get started link", async ({ page }) => {
  // Act - Click the get started link
  await page.goto("https://playwright.dev/");
  await page.getByRole("link", { name: "Get started" }).click();
  // Assert - Expects page to have a heading with the name of Installation.
  await expect(
    page.getByRole("heading", { name: "Installation" }),
  ).toBeVisible();
});

/* 
  Steps of the test case below: 
  1. Open the page
  2. Click at get started
  3. Mouse hover the language dropdown
  4. Click at Java
  5. Check the URL
  6. Check the text "Installing Playwright" is not being
  displayed
  7. Check the test below is displayed
  
  Playwright is distributed as a set of Maven modules. The easiest way to use it is to add one dependency to your project's pom.xml as described below. If you're not familiar with Maven please refer to its documentation.
*/

test("Check Java page", async ({ page }) => {
  // Arrange
  const javaDescription = `Playwright is distributed as a set of Maven modules. The easiest way to use it is to add one dependency to your project's pom.xml as described below. If you're not familiar with Maven please refer to its documentation.`;
  // Act
  await page.goto("https://playwright.dev");
  await page.getByRole("link", { name: "Get started" }).click();
  await page.getByRole("button", { name: "Node.js" }).hover();
  await page
    .getByRole("navigation", { name: "Main" })
    .getByText("Java", { exact: true })
    .click();
  // Assert
  await expect(page).toHaveURL("https://playwright.dev/java/intro");
  await expect(
    page.getByText("Installing Playwright", { exact: true }),
  ).not.toBeVisible();
  await expect(page.getByRole("button", { name: "Java" })).toBeVisible();
  await expect(page.getByText(javaDescription)).toBeVisible();
  // Comments
  // This works to get by the exactly text - await page.getByText('Java', {exact: true}).click();
  // This works to get by role ex:link - await page.getByRole('link', { name: 'Get started' }).click();
  // This works to get by the url - await expect(page).toHaveURL('https://playwright.dev/java/docs/intro');
});

test("Check Java Page Original", async ({ page }) => {
  // Arrange
  const javaDescription = `Playwright is distributed as a set of Maven modules. The easiest way to use it is to add one dependency to your project's pom.xml as described below. If you're not familiar with Maven please refer to its documentation.`;
  // Act
  await page.goto("https://playwright.dev");
  await page.getByRole("link", { name: "Get Started" }).click();
  await page.getByRole("button", { name: "Node.js" }).hover();
  await page
    .getByRole("navigation", { name: "Main" })
    .getByText("Java", { exact: true })
    .click();
  // Assert
  await expect(page).toHaveURL("https://playwright.dev/java/docs/intro");
  await expect(
    page.getByText("Installing Playwright", { exact: true }),
  ).not.toBeVisible();
  await expect(page.getByText(javaDescription)).toBeVisible();
  // Comments
  // This works to validate if the page is visible - await expect(page.isVisible);
});
