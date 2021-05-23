// BEGIN
require('expect-puppeteer');

const appUrl = 'http://localhost:5000';

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
    await page.goto(`${appUrl}/articles/new`);
    await page.type('#name', 'new article');
    await page.type('#category', 'optio quo quis');
    await page.type('#content', 'some content');
    await page.click('[data-testid="article-create-button"]');
    await page.waitForSelector('[data-testid="articles"]');
    const result = await page.$eval(
      'tbody > tr:last-child > td:nth-child(2)',
      (el) => el.innerText,
    );
    const expected = 'new article';

    expect(result).toMatch(expected);
  });

  it('should edit article', async () => {
    await page.goto(`${appUrl}/articles/4/edit`);
    // eslint-disable-next-line no-param-reassign
    await page.$eval('#name', (el) => { el.value = ''; });
    await page.type('#name', 'renamed article');
    await page.click('[data-testid="article-update-button"]');
    await page.waitForSelector('[data-testid="articles"]');
    const result = await page.$eval(
      'tbody > tr:nth-child(1) > td:nth-child(2)',
      (el) => el.innerText,
    );
    const expected = 'renamed article';

    expect(result).toBe(expected);
  });
});
// END
