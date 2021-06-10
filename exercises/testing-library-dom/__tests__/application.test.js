// @ts-check

require('@testing-library/jest-dom');
const fs = require('fs');
const path = require('path');
const testingLibraryDom = require('@testing-library/dom');
const testingLibraryUserEvent = require('@testing-library/user-event');

const run = require('../src/application');

const { screen } = testingLibraryDom;
const userEvent = testingLibraryUserEvent.default;

beforeEach(() => {
  const initHtml = fs.readFileSync(path.join('__fixtures__', 'index.html')).toString();
  document.body.innerHTML = initHtml;
  run();
});

// BEGIN
const addTask = (text) => {
  userEvent.type(screen.getByRole('textbox', { name: /new task name/i }), text);
  userEvent.click(screen.getByRole('button', { name: /add task/i }));
};

describe('application', () => {
  it('should render app', () => {
    expect(screen.getByText(/general/i)).toBeVisible();
    expect(document.querySelector('[data-container="tasks"]')).toBeEmptyDOMElement();
  });

  it('should create tasks', () => {
    addTask('test1');
    addTask('test2');

    expect(screen.getByRole('textbox', { name: /new task name/i })).toHaveValue('');
    expect(screen.getByText('test1')).toBeVisible();
    expect(screen.getByText('test2')).toBeVisible();
  });

  it('should create custom list and task', () => {
    addTask('test1');

    expect(screen.getByText('test1')).toBeVisible();

    userEvent.type(screen.getByRole('textbox', { name: /new list name/i }), 'Secondary');
    userEvent.click(screen.getByRole('button', { name: /add list/i }));
    userEvent.click(screen.getByText(/secondary/i));
    addTask('test2');

    expect(screen.getByText(/secondary/i)).toBeVisible();
    expect(screen.getByText('test2')).toBeVisible();
  });
});
// END
