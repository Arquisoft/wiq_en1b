const puppeteer = require('puppeteer');
const { defineFeature, loadFeature } = require('jest-cucumber');
const setDefaultOptions = require('expect-puppeteer').setDefaultOptions;

const feature = loadFeature('./features/addUser.feature');

const { register, login, logout } = require("../utils");

let page;
let browser;

const email = "testUser1@example.com";
const username = "testUser1"
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
  
    }, 60000);
  
    beforeEach(async () => {
      await logout(page);
      await login(page, username, password);
    })

  test('Register', ({ given,when, then }) => {
    given('I am on the add user page', async () => {
      await page.goto('http://localhost:3000/addUser'); 
      await page.waitForSelector('.general');
    });
    when('I register a user', async () => {
        await register(page, email, username, password);
    });
    then('I am in /menu', async () => {
      await expect(page).toMatchElement('.divMenu');
    });
  }, 60000);
  
  

});