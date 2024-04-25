const puppeteer = require('puppeteer');
const { defineFeature, loadFeature } = require('jest-cucumber');
const setDefaultOptions = require('expect-puppeteer').setDefaultOptions;

const feature = loadFeature('./features/revealAnswers.feature');

const { register, login, logout } = require("../utils");

let page;
let browser;

const email = "testUser2@example.com";
const username = "testUser2"
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
    setDefaultOptions({ timeout: 30000 });

    await register(page, email, username, password);
  });

  beforeEach(async () => {
    await logout(page);
    await login(page, username, password);
  })

  test('Create Competitive Game and reveal correct answer color', ({ given,when, then }) => {
    given('I am on the game configurator and create a competitive game', async () => {
      await page.goto('http://localhost:3000/configurator'); 
      await page.waitForSelector('.GameConfiguratorDiv');
      await page.click('#competitive');
    });
    when('I let the counter end', async () => {
      await page.waitForTimeout(10000); // 10000 milisegundos = 10 segundos
    });
    then('Correct Color appears', async () => {
      const answerButtons = await page.$$('.answerButton');
      let colorFound = false;

      for (const button of answerButtons) {
          const style = await page.evaluate(button => window.getComputedStyle(button).backgroundColor, button);
          if (style === 'rgb(110, 242, 110)') { // Verifica si el color es #6EF26E en formato RGB
              colorFound = true;
              break;
          }
      }
      expect(colorFound).toBe(true);    
    });
  
  });

  test('Create Competitive Game and reveal wrong answer colors', ({ given,when, then }) => {
    given('I am on the game configurator and create a competitive game', async () => {
      await page.goto('http://localhost:3000/configurator'); 
      await page.waitForSelector('.GameConfiguratorDiv');
      await page.click('#competitive');
    });
    when('I let the counter end', async () => {
      await page.waitForTimeout(10000); // 10000 milisegundos = 10 segundos
    });
    then('Incorrect Color appears', async () => {
      const answerButtons = await page.$$('.answerButton');
      let countColor = 0;
  
      for (const button of answerButtons) {
          const style = await page.evaluate(button => window.getComputedStyle(button).backgroundColor, button);
          if (style === 'rgb(255, 102, 102)') { // Verifica si el color es #FF6666 en formato RGB
              countColor++;
              if (countColor === 3) {
                  break; // Si encuentra tres elementos del color requerido, sale del bucle
              }
          }
      }
      expect(countColor).toBe(3); // Verifica si se encontraron exactamente tres elementos con el color requerido
     
    });
  
  });



});
