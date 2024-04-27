const puppeteer = require('puppeteer');
const { defineFeature, loadFeature } = require('jest-cucumber');
const setDefaultOptions = require('expect-puppeteer').setDefaultOptions;

const feature = loadFeature('./features/addUser.feature');

const { register, login, logout } = require("../utils");

let page;
let browser;

const email = "testUserAddUser@example.com";
const username = "testUserAddUser"
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
  
    
  test('Register', ({ given,when, then }) => {
    given('I register a user', async () => {
        await register(page, email, username, password);
    });

    then('I am in /menu', async () => {
      await expect(page).toMatchElement('.divMenu');
    });
  }, 60000);
  
  

});