var error = require('./index');

module.exports = {
  toError: function(errorData) {
    if (!errorData.name || !errorData.message) {
      return null
    }

    var ErrorProto = error(errorData.name);

    var props = {};
    for (prop in errorData) {
      if (prop === 'name' || prop === 'message') {
        continue
      }
      props[prop] = errorData[prop];
    }

    return new ErrorProto(errorData.message, props);
  }
};