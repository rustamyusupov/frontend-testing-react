// BEGIN
require('expect-puppeteer');

const appUrl = 'http://localhost:5000';
const articlesUrl = `${appUrl}/articles`;

describe('simple blog', () => {
  it('should open main page', async () => {
    await page.goto(appUrl);
    const expected = 'Welcome to a Simple blog!';

    await expect(page).toMatch(expected);
  });

  it('should return articles', async () => {
    await page.goto(articlesUrl);
    const articles = await page.$$('[data-testid="articles"]');
    const result = articles.length;
    const expected = 0;

    expect(result).toBeGreaterThan(expected);
  });

  it('should open form', async () => {
    await page.goto(articlesUrl);
    await page.click('[data-testid="article-create-link"]');
    await page.waitForSelector('[data-testid="article-create-form"]');
    const expected = 'Create article';

    await expect(page).toMatch(expected);
  });

  it('should create new article', async () => {
    await page.goto(`${articlesUrl}/new`);
    await expect(page).toFillForm('form[data-testid="article-create-form"]', {
      'article[name]': 'new article',
      'article[content]': 'some content',
    });
    await expect(page).toSelect('[name="article[categoryId]"]', '1');
    await page.click('[data-testid="article-create-button"]');
    await page.waitForSelector('[data-testid="articles"]');
    const result = await page.$eval(
      '[data-testid="article"]:last-child > [data-testid="article-name"]',
      (el) => el.innerText,
    );
    const expected = 'new article';

    expect(result).toMatch(expected);
  });

  it('should edit article', async () => {
    await page.goto(`${articlesUrl}/4/edit`);
    // eslint-disable-next-line no-param-reassign
    await page.$eval('#name', (el) => { el.value = ''; });
    await page.type('#name', 'renamed article');
    await page.click('[data-testid="article-update-button"]');
    await page.waitForSelector('[data-testid="articles"]');
    const result = await page.$eval(
      '[data-testid="article"]:nth-child(1) > [data-testid="article-name"]',
      (el) => el.innerText,
    );
    const expected = 'renamed article';

    expect(result).toBe(expected);
  });
});
// END
