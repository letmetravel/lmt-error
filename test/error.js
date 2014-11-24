var assert = require('assert');

var util = require('./../lib/util');
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


describe('util.toError', function () {

  it('should return error instance from object', function () {
    var err = util.toError({name: 'TestError', message: 'message', hello: 'universe'});

    assert.ok(err instanceof Error);
    assert.equal(err.name, 'TestError');
    assert.equal(err.message, 'message');
    assert.equal(err.hello, 'universe');
  });

  it('should return null if object not contains name', function () {
    var err = util.toError({message: 'message', hello: 'universe'});
    assert.equal(err, null);
  });

  it('should return null if object not contains message', function () {
    var err = util.toError({name: 'TestError', hello: 'universe'});
    assert.equal(err, null);
  });

  it('should return error instance deepEqual as normally created', function () {
    var err1 = new TestError('message', { hello: 'universe' });
    var err2 = util.toError({name: 'TestError', message: 'message', hello: 'universe'});
    assert.deepEqual(err1, err2);
  });

});