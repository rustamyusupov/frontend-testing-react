// @ts-check

import '@testing-library/jest-dom';

import nock from 'nock';
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Autocomplete from '../src/Autocomplete.jsx';

const host = 'http://localhost';

beforeAll(() => {
  nock.disableNetConnect();
});

// BEGIN

// END
