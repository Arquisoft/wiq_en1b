const puppeteer = require('puppeteer');
const { defineFeature, loadFeature } = require('jest-cucumber');
const setDefaultOptions = require('expect-puppeteer').setDefaultOptions;

const feature = loadFeature('./features/home.feature');

let page;
let browser;

defineFeature(feature, test => {
  
  beforeAll(async () => {
    browser = await puppeteer.launch({ headless: false }); 
    page = await browser.newPage();
    setDefaultOptions({ timeout: 10000 });
  });

  test('Home page functionality', ({ given, when, then }) => {
    given('I am on the home page', async () => {
      await page.goto('http://localhost:3000/home'); 
      await page.waitForSelector('.general');
    });

    when('I click on the toggle button to open', async () => {
      await page.click('#toggleOpen');
    });

    then('The text container should be hidden', async () => {
      await expect(page).toMatchElement('.text-container.hidden');
    });

    when('I click on the toggle button to close', async () => {
      await page.click('#toggleClose');
    });

    then('The text container should be visible', async () => {
      await expect(page).toMatchElement('.text-container.visible');
    });
  });

  afterAll(async () => {
    await browser.close();
  });
});
