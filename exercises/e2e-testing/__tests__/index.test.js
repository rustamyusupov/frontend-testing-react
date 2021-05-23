// BEGIN
require('expect-puppeteer');

const faker = require('faker');

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
    await page.waitForSelector('[data-testid="article-create-form"]');
    const expected = 'Create article';

    await expect(page).toMatch(expected);
  });

  it('should create new article', async () => {
    const name = faker.lorem.sentence();
    const content = faker.lorem.paragraph();

    await page.goto(`${appUrl}/articles/new`);
    await expect(page).toFillForm('form[data-testid="article-create-form"]', {
      'article[name]': name,
      'article[content]': content,
    });
    await expect(page).toSelect('[name="article[categoryId]"]', '1');
    await expect(page).toClick('[data-testid="article-create-button"]');
    await page.waitForSelector('[data-testid="articles"]');

    expect(page).toMatch(name);
  });

  it('should edit article', async () => {
    const name = faker.name.title();
    const content = faker.lorem.paragraph();

    await page.goto(`${appUrl}/articles/new`);
    await expect(page).toFillForm('form[data-testid="article-create-form"]', {
      'article[name]': name,
      'article[content]': content,
    });
    await expect(page).toSelect('[name="article[categoryId]"]', '1');
    await expect(page).toClick('[data-testid="article-create-button"]');
    await page.waitForSelector('[data-testid="articles"]');
    const id = await page.evaluate((elem) => elem.innerText, (await page.$('[data-testid="articles"] [data-testid="article"]:last-child [data-testid="article-id"]')));
    await page.goto(`${appUrl}/articles/${id}/edit`);

    const newName = faker.name.title();

    await expect(page).toFill('#name', newName);
    await page.click('[data-testid="article-update-button"]');
    await page.waitForSelector('[data-testid="articles"]');

    await expect(page).toMatch(newName);
  });
});
// END
