const puppeteer = require('puppeteer');
const { defineFeature, loadFeature } = require('jest-cucumber');
const setDefaultOptions = require('expect-puppeteer').setDefaultOptions;

const feature = loadFeature('./features/gameMenu.feature');

const { register, login, logout } = require("../utils");

let page;
let browser;

const email = "testUser@example.com";
const username = "testUser"
const password = "testUserPassword"

defineFeature(feature, test => {
  
  beforeAll(async () => {
      browser = await puppeteer.launch({
        headless: false, // Muestra el navegador
        slowMo: 40,
        defaultViewport: { width: 1920, height: 1080 },
        args: ['--window-size=1920,1080']
    });
     
    page = await browser.newPage();
    setDefaultOptions({ timeout: 10000 });

    await register(page, email, username, password);
  });

  test('There should be visible three links', ({ given, then }) => {
    given('I am on the game menu', async () => {
      await page.goto('http://localhost:3000/menu'); 
      await page.waitForSelector('.divMenu');
    });

    then('three buttons should be visible', async () => {
      //await expect(page).toMatchElement('.linkButton');
      const elements = await page.$$('.linkButton');
      expect(elements.length).toBe(3);
    });
  });
  test('New Game should go to game configurator', ({ given, when, then }) => {
    given('I am on the game menu', async () => {
      await page.goto('http://localhost:3000/menu'); 
      await page.waitForSelector('.divMenu');
    });
    when('I click on New Game', async () => {
      await page.click('.linkButton');
    });
    then('I should be in the game configurator', async () => {
      await expect(page).toMatchElement('.GameConfiguratorDiv');
    });
  });

});
