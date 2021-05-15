const faker = require('faker');
const puppeteer = require('puppeteer');

const getApp = require('../server/index.js');

const port = 5001;
const appUrl = `http://localhost:${port}`;
const serverResponse = {
  ok: 200,
};

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
    const response = await page.goto(appUrl, { waitUntil: 'load' });
    const result = response.status();
    const expected = serverResponse.ok;

    expect(result).toBe(expected);
  });

  it('should navigate to articles', async () => {
    await page.goto(appUrl, { waitUntil: 'networkidle0' });
    await Promise.all([page.waitForNavigation(), page.click('.nav-link')]);
    const result = await page.$('#articles');

    expect(result).toBeTruthy();
  });

  it('should open form', async () => {
    await page.goto(`${appUrl}/articles`);
    await Promise.all([page.waitForNavigation(), page.click('body > div > a')]);
    const result = await page.$('form');

    expect(result).toBeTruthy();
  });

  it('should create new article', async () => {
    const name = faker.lorem.sentence();
    const content = faker.lorem.paragraph();

    await page.goto(`${appUrl}/articles/new`);
    await page.type('#name', name);
    await page.type('#category', 'optio quo quis');
    await page.type('#content', content);
    await Promise.all([
      page.waitForNavigation(),
      page.click('input[type=submit]'),
    ]);
    const result = await page.$eval(
      'tbody > tr:last-child > td:nth-child(2)',
      (el) => el.innerText,
    );

    expect(result).toBe(name);
  });

  it('should edit article', async () => {
    const name = faker.lorem.sentence();

    await page.goto(`${appUrl}/articles`);
    await Promise.all([
      page.waitForNavigation(),
      page.click('tbody > tr:nth-child(1) > td:nth-child(4) > a'),
    ]);
    // eslint-disable-next-line no-param-reassign
    await page.$eval('#name', (el) => { el.value = ''; });
    await page.type('#name', name);
    await Promise.all([
      page.waitForNavigation(),
      page.click('input[type=submit]'),
    ]);
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
