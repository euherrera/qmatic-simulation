const ajvInstance = require('./ajv-instance');

const schema = {
    type: 'object',
    properties: {
      eventType: {type: 'string'},
      orderNumber: {type: 'string'},
      orderStatus: {type: 'string'},
      customerId: {type: 'string'},
      name: {type: 'string'},
      store: {type: 'string'},
    },
    required: []
  }

  const validate = ajvInstance.compile(schema);

  module.exports = validate;