// BEGIN
require('expect-puppeteer');

// const faker = require('faker');

const port = 5000;
const appUrl = `http://localhost:${port}`;

describe('simple blog', () => {
  it('should open main page', async () => {
    await page.goto(appUrl);
    const expected = 'Welcome to a Simple blog!';

    await expect(page).toMatch(expected);
  });

  it('should return articles', async () => {
    await page.goto(`${appUrl}/articles`);
    const articles = await page.$$('[data-testid="articles"]');
    const result = articles.length;
    const expected = 0;

    expect(result).toBeGreaterThan(expected);
  });

  it('should open form', async () => {
    await page.goto(`${appUrl}/articles`);
    await page.click('[data-testid="article-create-link"]');
    const result = await page.waitForSelector('[data-testid="article-create-form"]');

    expect(result).toBeTruthy();
  });

  it('should create new article', async () => {
    const name = '123'; // faker.lorem.sentence();
    const content = 'Test'; //faker.lorem.paragraph();

    await page.goto(`${appUrl}/articles/new`);
    await expect(page).toFillForm('form[data-testid="article-create-form"]', {
      'article[name]': name,
      'article[content]': content,
    });
    await expect(page).toSelect('#category', '1');
    await expect(page).toClick('[data-testid="article-create-button"]');
    await page.waitForSelector('[data-testid="articles"]');

    expect(page).toMatch(name);
  });

  // it('should edit article', async () => {
  //   const name = 'qwe'; // faker.lorem.sentence();

  //   await page.goto(`${appUrl}/articles`);
  //   await page.click(
  //     '[data-testid="article"]:first-child [data-testid^="article-edit-link"]',
  //   );
  //   await page.waitForSelector('[data-testid="article-edit-form"]');
  //   await expect(page).toFill('[data-testid="article-name"]', newName);
  //   await page.click('[data-testid="article-update-button"]');
  //   await page.waitForSelector('[data-testid="articles"]');

  //   expect(page).toMatch(newName);
  // });
});
// END
