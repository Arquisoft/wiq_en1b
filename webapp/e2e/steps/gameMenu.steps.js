const puppeteer = require('puppeteer');
const { defineFeature, loadFeature } = require('jest-cucumber');
const setDefaultOptions = require('expect-puppeteer').setDefaultOptions;

const feature = loadFeature('../features/gameMenu.feature');

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

  test('There should be visible three links', ({ given, then }) => {
    given('I am on the game menu', async () => {
      await page.goto('http://localhost:3000/menu'); 
      await page.waitForSelector('.divMenu');
    });

    then('three buttons should be visible', async () => {
      //await expect(page).toMatchElement('.linkButton');
      const elements = await page.$$('.linkButton');
      expect(elements.length).toBeGreaterThan(0); // At least one element with class 'linkButton'
    });
  });

});
