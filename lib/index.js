/*!
 * lmt-error
 * MIT Licensed
 */


/**
 * Фабрика возвращает конструктор пользовательской ошибки с именем/ типом `name`.
 *
 * @example
 * ```js
 * var error = require('lmt-error');
 * var TestError = error('TestError');
 * var err = new TestError('My error message.');
 *
 * throw err;
 * ```
 *
 * @param name
 * @param defaultMessage
 */
module.exports = function(name, defaultMessage) {


  function ErrorProto (message, props, ssf) {
    if (typeof message === 'object') {
      ssf = props;
      props = message;
      message = null;
    }

    this.message = message || defaultMessage;

    // игнорируем 'name', 'message', 'stack', все остальное в this
    for (var prop in props) {
      if (prop === 'name' || prop === 'message' || prop === 'stack') {
        continue
      }
      this[prop] = props[prop];
    }


    ssf = ssf || arguments.callee;
    if (ssf && Error.captureStackTrace) {
      Error.captureStackTrace(this, ssf);
    }
  }

  /*!
   * Build the prototype
   */

  ErrorProto.prototype = Object.create(Error.prototype);
  ErrorProto.prototype.name = name;
  ErrorProto.prototype.constructor = ErrorProto;

  /**
   *
   * @return {Object} JSON
   * @alias serialize
   * @api public
   */
  ErrorProto.prototype.toJSON =
    ErrorProto.prototype.serialize = function () {
      var props = {};

      for (var prop in this) {
        if (prop === 'constructor' || prop === 'serialize' || prop === 'toJSON' || prop === 'stack') {
          continue
        }
        props[prop] = this[prop];
      }

      return props;
    };

  // return constructor
  return ErrorProto;
};