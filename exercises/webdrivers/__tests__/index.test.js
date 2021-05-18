const faker = require('faker');
const puppeteer = require('puppeteer');

const getApp = require('../server/index.js');

const port = 5001;
const appUrl = `http://localhost:${port}`;

let browser;
let page;

const app = getApp();

describe('it works', () => {
  beforeAll(async () => {
    await app.listen(port, '0.0.0.0');
    browser = await puppeteer.launch({
      args: ['--no-sandbox'],
      headless: true,
      // slowMo: 250
    });
    page = await browser.newPage();
    await page.setViewport({
      width: 1280,
      height: 720,
    });
  });
  // BEGIN
  it('should open main page', async () => {
    await page.goto(appUrl);
    const title = await page.$('#title');
    const result = await page.evaluate((el) => el.innerText, title);
    const expected = 'Welcome to a Simple blog!';

    expect(result).toContain(expected);
  });

  it('should return articles', async () => {
    await page.goto(`${appUrl}/articles`);
    const articles = await page.$$('#articles tr');
    const result = articles.length;
    const expected = 0;

    expect(result).toBeGreaterThan(expected);
  });

  it('should open form', async () => {
    await page.goto(`${appUrl}/articles`);
    await page.click('body > div > a');
    const result = await page.waitForSelector('form');

    expect(result).toBeTruthy();
  });

  it('should create new article', async () => {
    const name = faker.lorem.sentence();
    const content = faker.lorem.paragraph();

    await page.goto(`${appUrl}/articles/new`);
    await page.type('#name', name);
    await page.type('#category', 'optio quo quis');
    await page.type('#content', content);
    await page.click('input[type=submit]');
    await page.waitForSelector('#articles');
    const result = await page.$eval(
      'tbody > tr:last-child > td:nth-child(2)',
      (el) => el.innerText,
    );

    expect(result).toBe(name);
  });

  it('should edit article', async () => {
    const name = faker.lorem.sentence();

    await page.goto(`${appUrl}/articles`);
    await page.click('tbody > tr:nth-child(1) > td:nth-child(4) > a');
    await page.waitForSelector('#edit-form');
    // eslint-disable-next-line no-param-reassign
    await page.$eval('#name', (el) => { el.value = ''; });
    await page.type('#name', name);
    await page.click('input[type=submit]');
    await page.waitForSelector('#articles');
    const result = await page.$eval(
      'tbody > tr:nth-child(1) > td:nth-child(2)',
      (el) => el.innerText,
    );

    expect(result).toBe(name);
  });
  // END
  afterAll(async () => {
    await browser.close();
    await app.close();
  });
});
