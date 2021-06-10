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
    ['a', 'al', 'alg'].forEach((char) => {
      nock(host)
        .get('/countries')
        .query({ term: char })
        .reply(200, getResponse(char)(countries));
    });

    const { container } = render(<Autocomplete />);
    const input = screen.getByRole('textbox');

    userEvent.type(input, 'a');

    await waitFor(() => {
      expect(screen.queryByText('Albania')).toBeVisible();
      expect(screen.queryByText('Algeria')).toBeVisible();
      expect(screen.queryByText('Armenia')).toBeVisible();
    });

    userEvent.type(input, 'l');

    await waitFor(() => {
      expect(screen.queryByText('Albania')).toBeVisible();
      expect(screen.queryByText('Algeria')).toBeVisible();
      expect(screen.queryByText('Armenia')).toBeNull();
    });

    userEvent.type(input, 'g');

    await waitFor(() => {
      expect(screen.queryByText('Albania')).toBeNull();
      expect(screen.queryByText('Algeria')).toBeVisible();
      expect(screen.queryByText('Armenia')).toBeNull();
    });

    userEvent.clear(input);

    expect(container.querySelector('ul')).toBeNull();
  });
});
// END
