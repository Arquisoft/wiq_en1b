const puppeteer = require('puppeteer');
const { defineFeature, loadFeature } = require('jest-cucumber');
const setDefaultOptions = require('expect-puppeteer').setDefaultOptions;

const feature = loadFeature('./features/competitiveGame.feature');

const { register, login, logout } = require("../utils");

let page;
let browser;

const email = "testUserCompetitiveGame@example.com";
const username = "testUserCompetitiveGame"
const password = "testUserPassword"

defineFeature(feature, test => {
  
  beforeAll(async () => {
      browser = await puppeteer.launch({
        headless: "new",
        slowMo: 40,
        defaultViewport: { width: 1920, height: 1080 },
        args: ['--window-size=1920,1080']
    });
     
    page = await browser.newPage();
    setDefaultOptions({ timeout: 30000 });

    await register(page, email, username, password);
  });

  beforeEach(async () => {
    await logout(page);
    await login(page, username, password);
  })

  test('Create Competitive Game should go to /questions', ({ given,when, then }) => {
    given('I am on the game configurator', async () => {
      await page.goto('http://localhost:3000/configurator'); 
      await page.waitForSelector('.GameConfiguratorDiv');
    });
    when('I click on new competitive game', async () => {
        await page.click('#competitive');
      });
    then('I am in /questions', async () => {
      await expect(page).toMatchElement('.questionContainer');
    });
  });
  
  test('Create Customized Game should go to /questions', ({ given,when, then }) => {
    given('I am on the game configurator', async () => {
      await page.goto('http://localhost:3000/configurator'); 
      await page.waitForSelector('.GameConfiguratorDiv');
    });
    when('I click on new customized game', async () => {
        await page.click('.linkButton');
      });
    then('I am in /questions', async () => {
      await expect(page).toMatchElement('.questionContainer');
    });
  });

});