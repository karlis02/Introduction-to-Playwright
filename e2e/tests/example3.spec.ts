import { test, type Page } from '@playwright/test';
import { HomePage } from '../pages/home-page';
import TopMenuPage from '../pages/top-menu-page';
import {
    BatchInfo, Configuration, EyesRunner,
    ClassicRunner, VisualGridRunner, BrowserType,
    DeviceName, ScreenOrientation, Eyes, Target
} from '@applitools/eyes-playwright'

const URL = 'https://plawright.dev';
let homePage: HomePage;
let topMenuPage: TopMenuPage;
const pageUrl = /.*intro/;

// Applitools
export const USE_ULTRAFAST_GRID: boolean = false;
export let Batch: BatchInfo;
export let Config: Configuration;
export let Runner: EyesRunner;
let eyes: Eyes;
// end of Applitools

// beforeAll for Applitools
test.beforeAll(async () => {
    if (USE_ULTRAFAST_GRID) {
        Runner = new VisualGridRunner({ testConcurrency: 5 });
    } else {
        Runner = new ClassicRunner();
    }
    const runnerName = (USE_ULTRAFAST_GRID) ? 'Ultrafast Grid' : 'Classic Runner';
    Batch = new BatchInfo({ name: `Playwright website - ${runnerName}` });
    Config = new Configuration();
    Config.setBatch(Batch);
    if (USE_ULTRAFAST_GRID) {
        Config.addBrowser(800, 600, BrowserType.CHROME);
        Config.addBrowser(1600, 1200, BrowserType.FIREFOX);
        Config.addBrowser(1024, 768, BrowserType.SAFARI);
        Config.addDeviceEmulation(DeviceName.iPhone_11, ScreenOrientation.PORTRAIT);
        Config.addDeviceEmulation(DeviceName.Nexus_10, ScreenOrientation.LANDSCAPE);
    }
});

test.beforeEach(async ({ page }) => {
    //Applitools
    eyes = new Eyes(Runner, Config);
    await eyes.open(
        page,
        'Playwright',
        test.info().title,
        { width: 1024, height: 768 }
    );
    // end of Applitools
    await page.goto(URL);
    homePage = new HomePage(page);
});

test.afterEach(async () => {
    await eyes.close();
});

test.afterAll(async () => {
    // Arrange - This forces Playwright to wait synchronously for all visual checkpoints to 
    const results = await Runner.getAllTestResults();
    //console.log('Visual test results', results);
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
        // https://applitools.com/docs/api-ref/sdk-api/playwright/js-intro/checksettings
        await eyes.check('Home page', Target.window().fully());
    });

    test('get started link', async ({ page }) => {
        await clickGetStarted(page);
        await topMenuPage.assertPageUrl(pageUrl);
        // https://applitools.com/docs/api-ref/sdk-api/playwright/js-intro/checksettings#region-match-levels
        // Layout: Check only the layout and ignore actual text and graphics.
        await eyes.check('Get Started page', Target.window().fully().layout());
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
            // https://applitools.com/docs/api-ref/sdk-api/playwright/js-intro/checksettings#region-match-levels
            // Ignore colors: Similar to the strict match level but ignores changes in colors.
            await eyes.check('Java page', Target.window().fully().ignoreColors());
        });
    });
});
