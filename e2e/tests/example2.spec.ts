import { test, expect, Page } from '@playwright/test';
import HomePage from '../pages/home-page';
import TopMenuPage from '../pages/top-menu-page';

/// AAA
/// POM (Page Object Model)

const URL = 'https://playwright.dev/';
let homePage: HomePage;
let topMenuPage: TopMenuPage;
const pageUrl = /.*intro/;

test.beforeEach(async ({ page }) => {
    await page.goto(URL);
    homePage = new HomePage(page);
});

async function clickGetStarted(page: Page) {
    // Arrange
    topMenuPage = new TopMenuPage(page);
    // Act
    await homePage.clickGetStarted();
}

test.describe('Playwright website', () => {
    test('The home page has the title', async () => {
        // Assert
        await homePage.assertPageTitle();
    });

    test('Get started link', async ({ page }) => {
        // Act
        await clickGetStarted(page);
        // Assert
        await topMenuPage.assertPageUrl(pageUrl);
    });

    test('Check Java page', async ({ page }) => {
        await test.step('Act', async () => {
            await clickGetStarted(page);
            await topMenuPage.hoverNode();
            await topMenuPage.clickJava();
        })

        await test.step('Assert', async () => {
            await topMenuPage.assertPageUrl(pageUrl);
            await topMenuPage.assertNodeDescriptionNotVisible();
            await topMenuPage.assertJavaDescriptionVisible()
        })
    })
})