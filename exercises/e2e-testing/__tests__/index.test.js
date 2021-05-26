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
    const lastArticleNameSelector = '[data-testid="article"]:last-child > [data-testid="article-name"]';

    await page.goto(`${articlesUrl}/new`);
    await expect(page).toFillForm('form[data-testid="article-create-form"]', {
      'article[name]': 'new article',
      'article[content]': 'some content',
    });
    await expect(page).toSelect('[name="article[categoryId]"]', '1');
    await page.click('[data-testid="article-create-button"]');
    await page.waitForSelector('[data-testid="articles"]');
    const result = await page.$eval(lastArticleNameSelector, (el) => el.innerText);
    const expectedName = 'new article';

    expect(result).toMatch(expectedName);
  });

  it('should edit article', async () => {
    const firstArticleNameSelector = '[data-testid="article"]:first-child > [data-testid="article-name"]';

    await page.goto(`${articlesUrl}/4/edit`);
    await expect(page).toFillForm('form[data-testid="article-edit-form"]', {
      'article[name]': 'renamed article',
      'article[content]': 'some content',
    });
    await expect(page).toSelect('[name="article[categoryId]"]', '1');
    await page.click('[data-testid="article-update-button"]');
    await page.waitForSelector('[data-testid="articles"]');
    const result = await page.$eval(firstArticleNameSelector, (el) => el.innerText);
    const expected = 'renamed article';

    expect(result).toBe(expected);
  });
});
// END
