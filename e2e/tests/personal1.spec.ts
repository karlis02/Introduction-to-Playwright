import { test, expect, Page } from '@playwright/test';
import PersonalPage from '../pages/personal-page';

let personalPage: PersonalPage;

test.beforeEach(async ({page}) => {
    await page.goto(personalPage.personalPageUrl);
    personalPage = new PersonalPage(page);
})

test.describe('Prueba', () => {
    test('Prueba1',async () => {
        await personalPage.navigation.click();
        await expect(personalPage.mainContentLbl.innerText()).toEqual('Software QA and Testing Less-Frequently-Asked-Questions')
    })
})