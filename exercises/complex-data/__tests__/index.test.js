const faker = require('faker');

describe('faker helpers.createTransaction', () => {
  it('should return transaction', () => {
    const result = faker.helpers.createTransaction();
    const transactionTypes = [
      'deposit',
      'withdrawal',
      'payment',
      'invoice',
    ];
    const transactionTypesRegexp = new RegExp(transactionTypes.join('|'));
    const expected = {
      amount: expect.stringMatching(/\d+/g),
      date: expect.any(Date),
      business: expect.any(String),
      name: expect.any(String),
      type: expect.stringMatching(transactionTypesRegexp),
      account: expect.stringMatching(/\d+/g),
    };

    expect(result).toMatchObject(expected);
  });

  it('should return uniq transaction', () => {
    const result = faker.helpers.createTransaction();
    const expected = faker.helpers.createTransaction();

    expect(result).not.toEqual(expected);
  });
});
