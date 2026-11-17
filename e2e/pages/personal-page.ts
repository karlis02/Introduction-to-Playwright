import { type Locator, type Page, expect } from '@playwright/test';

export default class PersonalPage {
    // variables
    readonly navigation: Locator;
    readonly mainContentLbl: Locator;
    readonly personalPageUrl: string;
    
    constructor(page: Page) {
        this.navigation = page.locator('#nav > li:nth-child(4) > a');
        this.mainContentLbl = page.locator('#maincontentbox > h1');
        this.personalPageUrl = 'http://www.softwareqatest.com/qatweb1.html';
    }
}