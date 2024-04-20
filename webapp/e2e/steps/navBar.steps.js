const puppeteer = require('puppeteer');
const { defineFeature, loadFeature } = require('jest-cucumber');
const setDefaultOptions = require('expect-puppeteer').setDefaultOptions;

const feature = loadFeature('./features/navBar.feature');

let page;
let browser;

defineFeature(feature, test => {
  
  beforeAll(async () => {
    browser = await puppeteer.launch({
      slowMo: 20,
      defaultViewport: { width: 1920, height: 1080 },
      args: ['--window-size=1920,1080']
    });
    page = await browser.newPage();
    setDefaultOptions({ timeout: 10000 });
  });

  test('Displaying navbar elements correctly', ({ given, then }) => {
    given('I am on the home page', async () => {
      await page.goto('http://localhost:3000/'); 
      await page.waitForSelector('.navbar-container');
    });

    then('The navbar elements are visible', async () => {
      await expect(page).toMatchElement('.navbar-text', { text: 'Know and win!' });
      await expect(page).toMatchElement('.language-button', { text: 'Language' });
      await expect(page).toMatchElement('.help-button');
    });
  });

  test('Changing language', ({ given, when, then }) => {
    given('I am on the home page', async () => {
      await page.goto('http://localhost:3000/'); 
      await page.waitForSelector('.navbar-container');
    });

    when('I click on the language button', async () => {
      await page.click('.language-button');
    });

    then('The language options menu should be visible', async () => {
      await page.waitForSelector('.MuiMenu-paper', { visible: true });
    });

    then('I choose Spanish', async () => {
      await page.click('text=Spanish');
    });

    then('The navbar should be in Spanish', async () => {
      const navbarText = await page.$eval('.navbar-text', el => el.textContent.trim());
      expect(navbarText).toBe('¡Saber y ganar!');
    });
  });

  afterAll(async () => {
    await browser.close();
  });
});
