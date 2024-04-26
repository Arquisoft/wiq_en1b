const puppeteer = require('puppeteer');
const { defineFeature, loadFeature } = require('jest-cucumber');
const setDefaultOptions = require('expect-puppeteer').setDefaultOptions;

const feature = loadFeature('./features/login.feature');

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
    slowMo: 20,
    defaultViewport: { width: 1920, height: 1080 },
    args: ['--window-size=1920,1080']
});
 
page = await browser.newPage();
setDefaultOptions({ timeout: 10000 });
await register(page, email, username, password);

},60000);


   test('Login', ({ given,when, then }) => {
    given('I am on the login page', async () => {
      await page.goto('http://localhost:3000/login'); 
      await page.waitForSelector('.general');

    });
    when('I login as user', async () => {
        
      await page.type('input[type="text"]', username);
      await page.type('input[type="password"]', password);
      await page.click('button[type="submit"]');
      await page.waitForSelector('.general');
    });
    then('I am in /menu', async () => {
      await page.waitForSelector('.general');
      await expect(page).toMatchElement('.divMenu');
    });
  }, 60000);

  // test('Failed login', ({ given,when, then }) => {
  //   given('I am on the login page', async () => {
  //     await page.goto('http://localhost:3000/login'); 
  //   });
  //   when('I try to login', async () => {
  //       await login(page, email, "lau", "123");
  //   });
  //   then('I am in /login', async () => {
  //     await expect(page).toMatchElement('.general');
  //   }, 60000);
  // });
  
  

});