const puppeteer = require('puppeteer');
const { defineFeature, loadFeature } = require('jest-cucumber');
const setDefaultOptions = require('expect-puppeteer').setDefaultOptions;

const feature = loadFeature('./features/login.feature');

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
    
  });

  test('Successful login', ({ given, when, then }) => {
    given('I am on the login page', async () => {
      await page.goto('http://localhost:3000/login');
      await page.waitForSelector('.general');
    });

    when('I enter valid credentials', async () => {
      await page.type('input[type="text"]', 'ltbg');
      await page.type('input[type="password"]', 'ltbg');
      await page.click('button[type="submit"]');
    });

    then('I should be redirected to the menu', async () => {
      await page.waitForNavigation();
      expect(page.url()).toContain('/menu');
    });
  }, 60000);

  test('Failed login', ({ given, when, then }) => {
    given('I am on the login page', async () => {
      await page.goto('http://localhost:3000/login');
      await page.waitForSelector('.general');
    });

    when('I enter invalid credentials', async () => {
      await page.type('input[type="text"]', 'invalidUsername');
      await page.type('input[type="password"]', 'invalidPassword');
      await page.click('button[type="submit"]');
    });

    then('I should NOT be redirected to the menu', async () => {
        await page.waitForNavigation();
        expect(page.url()).toContain('/login');
      });
  }, 60000);

  afterAll(async () => {
    await browser.close();
  });
});
