// @ts-check

import React from 'react';
import nock from 'nock';
import axios from 'axios';
import httpAdapter from 'axios/lib/adapters/http';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

import TodoBox from '../src/TodoBox.jsx';

axios.defaults.adapter = httpAdapter;
const host = 'http://localhost';

beforeAll(() => {
  nock.disableNetConnect();
});

afterAll(() => {
  nock.enableNetConnect();
});

// BEGIN
describe('notes', () => {
  it('should render app', () => {
    nock(host).get('/tasks').reply(200, []);
    render(<TodoBox />);

    expect(screen.getByRole('textbox')).toBeVisible();
    expect(screen.getByRole('button', { name: /add/i })).toBeVisible();
  });

  it('should create tasks', async () => {
    nock(host).get('/tasks').reply(200, []);
    [
      { id: 1, text: 'test1', state: 'active' },
      { id: 2, text: 'test2', state: 'active' },
    ].forEach((response) => {
      nock(host).post('/tasks', { text: response.text }).reply(200, response);
    });

    render(<TodoBox />);

    const input = screen.getByRole('textbox');
    const submit = screen.getByRole('button', { name: /add/i });

    userEvent.type(input, 'test1');
    userEvent.click(submit);

    expect(await screen.findByText('test1')).toBeVisible();

    userEvent.type(input, 'test2');
    userEvent.click(submit);

    expect(await screen.findByText('test2')).toBeVisible();
  });

  it('should change task state', async () => {
    nock(host).get('/tasks').reply(200, [{ id: 1, text: 'text', state: 'active' }]);
    [
      {
        action: 'finish', id: 1, text: 'text', state: 'finished',
      },
      {
        action: 'activate', id: 1, text: 'text', state: 'active',
      },
    ].forEach(({ action, ...response }) => {
      nock(host).patch(`/tasks/${response.id}/${action}`).reply(200, response);
    });

    const { container } = render(<TodoBox />);

    userEvent.click(await screen.findByText('text'));

    await waitFor(() => {
      expect(container.querySelector('s')).toBeVisible();
    });

    userEvent.click(await screen.findByText('text'));

    await waitFor(() => {
      expect(container.querySelector('s')).toBeNull();
    });
  });
});
// END
