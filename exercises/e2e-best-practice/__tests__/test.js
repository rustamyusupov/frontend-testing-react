// @ts-check
// BEGIN
const appUrl = 'http://localhost:8080';

beforeAll(async () => await page.goto(appUrl));

describe('app', () => {
  it('should open app', async () => {
    await expect(page).toMatchElement('[data-testid="task-name-input"]');
    await expect(page).toMatchElement('[data-testid="add-task-button"]');
  });

  it('should create task', async () => {
    const createTask = async (text) => {
      await expect(page).toFillForm('form', { text });
      
      return page.click('[data-testid=add-task-button]');
    }

    await createTask('test1');
    await createTask('test2');

    await expect(page).toMatch('test1');
    await expect(page).toMatch('test2');
  });

  it('should delete task', async () => {
    await page.click('[data-testid=remove-task-1]');

    await expect(page).not.toMatch('test1');  
  });  
});
// END
