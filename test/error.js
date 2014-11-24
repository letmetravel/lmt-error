var assert = require('assert');

var error = require('./../lib/');
var TestError = error('TestError');
var TestErrorWithDefaultMessage = error('TestErrorWithDefaultMessage', 'dafault message');


describe('compatibility', function () {

  it('should construct an instance of an Error', function () {
    var err = new Error();
    var myerr = new TestError();
    assert.ok(err instanceof Error);
    assert.ok(myerr instanceof Error);
  });

  it('should constructe with a `name` property', function () {
    var err = new ReferenceError();
    var myerr = new TestError();
    assert.equal(err.name, 'ReferenceError');
    assert.equal(myerr.name, 'TestError');
  });

});



describe('error instance', function () {

  it('should use default message if not passed', function () {
    var myerr = new TestErrorWithDefaultMessage({hello: 'universe'});
    assert.equal(myerr.message, 'dafault message');
  });

  it('should overwrite default message', function () {
    var myerr = new TestErrorWithDefaultMessage('custom message');
    assert.equal(myerr.message, 'custom message');
  });

  it('should merge properties', function () {
    var err = new TestError('message', { hello: 'universe' });
    assert.equal(err.hello, 'universe');
  });

  it('should not overwrite name prop', function () {
    var err = new TestError('message', { name: 'RealError' });
    assert.equal(err.name, 'TestError');
  });

  it('should not overwrite message prop', function () {
    var err = new TestError('message', { message: 'wow' });
    assert.equal(err.message, 'message');

  });

  it('should return a json object', function () {
    var err = new TestErrorWithDefaultMessage({hello: 'universe'});
    var json = err.serialize();

    assert.equal(err.name, 'TestErrorWithDefaultMessage');
    assert.equal(err.message, 'dafault message');
    assert.equal(err.hello, 'universe');
  });

});