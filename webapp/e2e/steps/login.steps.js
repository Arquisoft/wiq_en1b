const puppeteer = require('puppeteer');
const { defineFeature, loadFeature } = require('jest-cucumber');
const setDefaultOptions = require('expect-puppeteer').setDefaultOptions;

const feature = loadFeature('./features/login.feature');

const { register, login, logout } = require("../utils");

let page;
let browser;

const email = "testUserLogin@example.com";
const username = "testUserLogin"
const password = "testUserPassword"

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
await register(page, email, username, password);
await logout(page);
},60000);


   test('Login', ({ given, then }) => {
    given('I login a user', async () => {
      await login(page, username, password);

    });
    then('I am in /menu', async () => {
      await expect(page).toMatchElement('.divMenu');
      await logout(page);
    });
  }, 60000);

   test('Failed login', ({ given,when, then }) => {
     given('I am on the login page', async () => {
       await page.goto('http://localhost:3000/login'); 
     });
     when('I try to login', async () => {
      await page.goto('http://localhost:3000/login'); 
      await page.waitForSelector('.general');
  
      await page.type('input[type="text"]', 'lau');
      await page.type('input[type="password"]', '123');
      await page.click('button[type="submit"]');
     });
     then('I am in /login', async () => {
       await expect(page).toMatchElement('.title-login');
     }, 60000);
   });
  
  

});