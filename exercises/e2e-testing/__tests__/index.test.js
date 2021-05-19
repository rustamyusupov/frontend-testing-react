// BEGIN
require('expect-puppeteer');

const faker = require('faker');

const port = 5000;
const appUrl = `http://localhost:${port}`;

describe('simple blog', () => {
  beforeAll(async () => {
    await page.goto(appUrl);
  });

  it('should open main page', async () => {
    const expected = 'Welcome to a Simple blog!';

    await expect(page).toMatch(expected);
  });

  it('should return articles', async () => {
    await page.goto(`${appUrl}/articles`);
    const articles = await page.$$('[data-testid="article"]');
    const result = articles.length;
    const expected = 0;

    expect(result).toBeGreaterThan(expected);
  });

  it('should open form', async () => {
    await page.goto(`${appUrl}/articles`);
    await page.click('[data-testid="article-create-link"]');
    const result = await page.waitForSelector('form');

    expect(result).toBeTruthy();
  });

  it('should create new article', async () => {
    const name = faker.lorem.sentence();
    const content = faker.lorem.paragraph();

    await page.goto(`${appUrl}/articles/new`);
    await expect(page).toFillForm('form[data-testid="article-create-form"]', {
      'article[name]': name,
      'article[content]': content,
    });
    await expect(page).toSelect('[data-testid="article-category"]', '1');
    await expect(page).toClick('[data-testid="article-create-button"]');
    await page.waitForSelector('[data-testid="articles"]');

    expect(page).toMatch(name);
  });

  it('should edit article', async () => {
    const name = faker.lorem.sentence();

    await page.goto(`${appUrl}/articles`);
    await page.click('[data-testid="article"]:nth-child(1)>td:nth-child(4)>a');
    await expect(page).toFillForm('form[data-testid="article-edit-form"]', {
      'article[name]': name,
    });
    await expect(page).toClick('[data-testid="article-update-button"]');
    await page.waitForSelector('[data-testid="articles"]');

    expect(page).toMatch(name);
  });
});
// END
