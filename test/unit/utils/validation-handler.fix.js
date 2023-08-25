const ValidationHandler = require('../../../src/utils/validation-handler');
const ValidateError = require('../../../src/errors/validation-error');

describe('ValidationHandler class tests', () => {
  test('should successfully validate', async () => {
    const schema = {
      validate: jest.fn(() => {}),
    };
    const result = ValidationHandler.validate(schema, {}, () => 'ok');
    expect(result).toEqual('ok');
  });

  test('should handle error', async () => {
    const schema = {
      validate: jest.fn(() => {
        error: {
          details: [{ message: 'Something wrong' }];
        }
      }),
    };
    const result = ValidationHandler.validate(schema, {}, (err) => err);
    expect(result).toBeInstanceOf(ValidateError);
  });
});
