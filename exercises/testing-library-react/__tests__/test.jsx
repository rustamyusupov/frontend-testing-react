// @ts-check

import '@testing-library/jest-dom';

import nock from 'nock';
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  flow, map, toLower, filter, startsWith, capitalize,
} from 'lodash/fp';
import Autocomplete from '../src/Autocomplete.jsx';

// BEGIN

const host = 'http://localhost';

beforeAll(() => {
  nock.disableNetConnect();
});

const countries = ['Albania', 'Algeria', 'Armenia'];
const getResponse = (char) => flow(map(toLower), filter(startsWith(char)), map(capitalize));

describe('autocomplete', () => {
  it('should render countries', async () => {
    const scopes = ['a', 'al', 'alg'].map((char) => nock(host)
      .get('/countries')
      .query({ term: char })
      .reply(200, getResponse(char)(countries)));

    const { container } = render(<Autocomplete />);
    const input = screen.getByRole('textbox');

    userEvent.type(input, 'a');
    await waitFor(() => {
      const requestIsPerformed = scopes[0].isDone();
      expect(requestIsPerformed).toBe(true);
    });

    const list = await screen.findByRole('list');

    expect(list).toContainElement(screen.getByText('Albania'));
    expect(list).toContainElement(screen.getByText('Algeria'));
    expect(list).toContainElement(screen.getByText('Armenia'));

    userEvent.type(input, 'l');
    await waitFor(() => {
      const requestIsPerformed = scopes[1].isDone();
      expect(requestIsPerformed).toBe(true);
    });

    expect(list).toContainElement(screen.getByText('Albania'));
    expect(list).toContainElement(screen.getByText('Algeria'));
    expect(list).not.toContainElement(screen.queryByText('Armenia'));

    userEvent.type(input, 'g');
    await waitFor(() => {
      const requestIsPerformed = scopes[2].isDone();
      expect(requestIsPerformed).toBe(true);
    });

    expect(list).not.toContainElement(screen.queryByText('Albania'));
    expect(list).toContainElement(screen.getByText('Algeria'));
    expect(list).not.toContainElement(screen.queryByText('Armenia'));

    userEvent.clear(input);

    expect(container.querySelector('ul')).not.toBeInTheDocument();
  });
});
// END
