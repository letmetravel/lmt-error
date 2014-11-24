lmt-error [![Build Status] ![Travis CI][travis-image]][travis-url]

=========

Библиотека для удобной работы с ошибками в nodejs и в браузере

------------------

Вдохновленный [tea-error](https://github.com/qualiancy/tea-error)

## Использование

```js
var error = require('lmt-error')

// создать конструктор ошибки
var TestError = error('TestError');

// создать конструктор ошибки c сообщением ошибки по умолчанию
var TestErrorWithDefaultMessage = error('TestErrorWithDefaultMessage', 'dafault message');

// создать экземпляр ошибки
var err = new TestError('My error message.');

// создать экземпляр ошибки
var err = new TestErrorWithDefaultMessage();

// создать экземпляр ошибки и передать дополнительные данные
var err = new TestError('My error message.', {some: 'data'});
var err = new TestErrorWithDefaultMessage({some: 'data'});

```

[travis-image]: https://img.shields.io/travis/letmetravel/lmt-error.svg?style=flat-square
[travis-url]: https://travis-ci.org/letmetravel/lmt-error
