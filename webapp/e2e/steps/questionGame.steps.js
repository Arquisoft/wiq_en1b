const puppeteer = require('puppeteer');
const { defineFeature, loadFeature } = require('jest-cucumber');
const setDefaultOptions = require('expect-puppeteer').setDefaultOptions;

const feature = loadFeature('./features/questionGame.feature');

const { register, login, logout } = require("../utils");

let page;
let browser;

const email = "testUser1@example.com";
const username = "testUser1"
const password = "testUserPassword"

defineFeature(feature, test => {
  
  beforeAll(async () => {
      browser = await puppeteer.launch({
        headless: false,
        slowMo: 20,
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

  test('Create Customized Game of Capital questions', ({ given,when, then }) => {
    given('I am on the game configurator', async () => {
      await page.goto('http://localhost:3000/configurator'); 
      await page.waitForSelector('.GameConfiguratorDiv');
    });
    when('I click select Capital and I create a new customized game', async () => {
        await page.select('#select', 'CAPITAL');
        await page.click('.linkButton');//click on capital
      });
    then('I get Capital questions', async () => {
      //await expect(page).toMatchElement('.topPanel');
      const questionContainer = await page.$('.topPanel');
      const questionText = await page.evaluate(questionContainer => questionContainer.textContent, questionContainer);
      const containsCapital = /Capital/i.test(questionText);
      expect(containsCapital).toBe(true);
    });
  });

  test('Create Customized Game of Language questions', ({ given,when, then }) => {
    given('I am on the game configurator', async () => {
      await page.goto('http://localhost:3000/configurator'); 
      await page.waitForSelector('.GameConfiguratorDiv');
    });
    when('I click select Language and I create a new customized game', async () => {
        await page.select('#select', 'LANGUAGE');
        await page.click('.linkButton');
      });
    then('I get Language questions', async () => {
      //await expect(page).toMatchElement('.topPanel');
      const questionContainer = await page.$('.topPanel');
      const questionText = await page.evaluate(questionContainer => questionContainer.textContent, questionContainer);
      const containsCapital = /Language/i.test(questionText);
      expect(containsCapital).toBe(true);
    });
  });
  test('Create Customized Game of Population questions', ({ given,when, then }) => {
    given('I am on the game configurator', async () => {
      await page.goto('http://localhost:3000/configurator'); 
      await page.waitForSelector('.GameConfiguratorDiv');
    });
    when('I click select Population and I create a new customized game', async () => {
        await page.select('#select', 'POPULATION');
        await page.click('.linkButton');
      });
    then('I get Population questions', async () => {
      //await expect(page).toMatchElement('.topPanel');
      const questionContainer = await page.$('.topPanel');
      const questionText = await page.evaluate(questionContainer => questionContainer.textContent, questionContainer);
      const containsCapital = /Population/i.test(questionText);
      expect(containsCapital).toBe(true);
    });
  });
  test('Create Customized Game of Size questions', ({ given,when, then }) => {
    given('I am on the game configurator', async () => {
      await page.goto('http://localhost:3000/configurator'); 
      await page.waitForSelector('.GameConfiguratorDiv');
    });
    when('I click select Size and I create a new customized game', async () => {
        await page.select('#select', 'SIZE');
        await page.click('.linkButton');
      });
    then('I get Size questions', async () => {
      //await expect(page).toMatchElement('.topPanel');
      const questionContainer = await page.$('.topPanel');
      const questionText = await page.evaluate(questionContainer => questionContainer.textContent, questionContainer);
      const containsCapital = /Size/i.test(questionText);
      expect(containsCapital).toBe(true);
    });
  });
  test('Create Customized Game of Head of Goverment questions', ({ given,when, then }) => {
    given('I am on the game configurator', async () => {
      await page.goto('http://localhost:3000/configurator'); 
      await page.waitForSelector('.GameConfiguratorDiv');
    });
    when('I click select Head of Goverment and I create a new customized game', async () => {
        await page.select('#select', 'HEAD_OF_GOVERMENT');
        await page.click('.linkButton');
      });
    then('I get Head of Goverment questions', async () => {
      //await expect(page).toMatchElement('.topPanel');
      const questionContainer = await page.$('.topPanel');
      const questionText = await page.evaluate(questionContainer => questionContainer.textContent, questionContainer);
      const containsCapital = /Head of Goverment/i.test(questionText);
      expect(containsCapital).toBe(true);
    });
  });

});
