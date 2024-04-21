const puppeteer = require('puppeteer');
const { defineFeature, loadFeature } = require('jest-cucumber');
const setDefaultOptions = require('expect-puppeteer').setDefaultOptions;

const feature = loadFeature('./features/instructions.feature');

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

  test('Instructions view is well rendered', ({ given, then }) => {
    given('I am on the instructions page', async () => {
      await page.goto('http://localhost:3000/instructions'); 
      await page.waitForSelector('.instructions_title');
    });

    then('The instructions title is rendered', async () => {
      await expect(page).toMatchElement('.instructions_title');
    });

    then('The instructions content is rendered', async () => {
      await expect(page).toMatchElement('.ins_ul');
    });
  });

  afterAll(async () => {
    await browser.close();
  });
});
