const nock = require('nock');
const axios = require('axios');

const { get, post } = require('../src/index.js');
const users = require('../__fixtures__/users.json');

axios.defaults.adapter = require('axios/lib/adapters/http');

const url = 'https://example.com';
const responseStatuses = {
  ok: 200,
  notFound: 404,
  serverError: 500,
};

describe('users get', () => {
  beforeAll(() => nock.disableNetConnect());
  afterEach(() => nock.cleanAll());
  afterAll(() => nock.enableNetConnect());

  it('should return users', async () => {
    nock(url).get('/users').reply(responseStatuses.ok, users);
    const result = await get(`${url}/users`);

    expect(result).toEqual(users);
  });

  it('should reject with error', async () => {
    nock(url).get('/users').reply(responseStatuses.notFound);

    await expect(() => get(`${url}/users`)).rejects.toThrow(Error);
  });
});

describe('users post', () => {
  const data = {
    firstname: 'Fedor',
    lastname: 'Sumkin',
    age: 33,
  };

  it('should return user', async () => {
    nock(url).post('/users', data).reply(responseStatuses.ok, data);
    const result = await post(`${url}/users`, data);

    expect(result).toEqual(data);
  });

  it('should reject with error', async () => {
    nock(url).post('/users', data).reply(responseStatuses.serverError);

    await expect(() => post(`${url}/users`, data)).rejects.toThrow(Error);
  });
});
