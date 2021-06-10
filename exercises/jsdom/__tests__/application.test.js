// @ts-check

require('@testing-library/jest-dom');
const fs = require('fs');
const path = require('path');

const run = require('../src/application');

beforeEach(() => {
  const initHtml = fs.readFileSync(path.join('__fixtures__', 'index.html')).toString();
  document.body.innerHTML = initHtml;
  run();
});

// BEGIN
const getListContainer = () => document.querySelector('[data-container="lists"]');
const getTaskContainer = () => document.querySelector('[data-container="tasks"]');
const getListInput = () => document.querySelector('[data-testid="add-list-input"]');
const getTaskInput = () => document.querySelector('[data-testid="add-task-input"]');
const getListSubmitButton = () => document.querySelector('[data-testid="add-list-button"]');
const getTaskSubmitButton = () => document.querySelector('[data-testid="add-task-button"]');

describe('application', () => {
  it('should return empty list', () => {
    expect(getListContainer()).toHaveTextContent('General');
    expect(getTaskContainer()).toBeEmptyDOMElement();
  });

  it('should create tasks', () => {
    getTaskInput().value = 'test1';
    getTaskSubmitButton().click();

    expect(getTaskInput()).toBeEmptyDOMElement();
    expect(getTaskContainer()).toHaveTextContent('test1');

    getTaskInput().value = 'test2';
    getTaskSubmitButton().click();

    expect(getTaskContainer()).toHaveTextContent('test2');
  });

  it('should create custom list and task', () => {
    getTaskInput().value = 'test1';
    getTaskSubmitButton().click();

    expect(getTaskContainer()).toHaveTextContent('test1');

    getListInput().value = 'Secondary';
    getListSubmitButton().click();

    const secondaryList = document.querySelector('[data-testid="secondary-list-item"]');

    secondaryList.click();
    getTaskInput().value = 'test2';
    getTaskSubmitButton().click();

    expect(getListContainer()).toHaveTextContent('Secondary');
    expect(getTaskContainer()).toHaveTextContent('test2');
    expect(secondaryList).not.toHaveTextContent('test1');
  });
});
// END
