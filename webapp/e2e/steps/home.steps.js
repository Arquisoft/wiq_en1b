const puppeteer = require('puppeteer');
const { defineFeature, loadFeature } = require('jest-cucumber');
const setDefaultOptions = require('expect-puppeteer').setDefaultOptions;

const feature = loadFeature('./features/home.feature');

let page;
let browser;

defineFeature(feature, test => {
  
  beforeAll(async () => {
      browser = await puppeteer.launch({
        headless: "new",
        slowMo: 20,
        defaultViewport: { width: 1920, height: 1080 },
        args: ['--window-size=1920,1080']
    });
     
    page = await browser.newPage();
    setDefaultOptions({ timeout: 10000 });
  });

  test('The text container is initially visible', ({ given, then }) => {
    given('I am on the home page', async () => {
      await page.goto('http://localhost:3000/home'); 
      await page.waitForSelector('.general');
    });

    then('The text container should be visible', async () => {
      await expect(page).toMatchElement('.text-container.visible');
    });
  });

  test('Opening the text container', ({ given, when, then }) => {
    given('I am on the home page', async () => {
      await page.goto('http://localhost:3000/home'); 
      await page.waitForSelector('.general');
    });

    when('I click on the toggle button to open', async () => {
      await page.click('label[for="toggleOpen"]');
    });

    then('The text container should be hidden', async () => {
      await expect(page).toMatchElement('.text-container.hidden');
    });
  });

  test('Closing the text container', ({ given, when, then }) => {
    given('I am on the home page', async () => {
      await page.goto('http://localhost:3000/home'); 
      await page.waitForSelector('.general');
    });

    when('I click on the toggle button to open and then I click it to close', async () => {

      await page.click('label[for="toggleOpen"]');

      // Wait for label to be render, visible : true
      await page.waitForSelector(`label[for="toggleClose"]`, {visible: true});
      await page.click('label[for="toggleClose"]');

    });

    then('The text container should be visible', async () => {
      await expect(page).toMatchElement('.text-container.visible');
    });
  });

  afterAll(async () => {
    await browser.close();
  });
});
