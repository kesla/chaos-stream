var PassThrough = require('stream').PassThrough

  , test = require('tape')
  , wrap = require('./chaos')

test('wrapped stream should emit error', function (t) {

  var stream = new PassThrough()

  wrap(stream)

  stream.once('error', function (err) {
    t.pass('should emit error')
    t.end()
  })
})

test('finished stream should not emit error', function (t) {
  var stream = new PassThrough()
    , timeout = setTimeout(function () {
        t.pass('no error has been emitted')
        t.end()
      }, 60)

  wrap(stream)

  stream.once('error', function (err) {
    t.fail('error should not be emitted on a finished stream')
    t.end()
    clearTimeout(timeout)
  })

  stream.emit('finish')
})

test('ended stream should not emit error', function (t) {
  var stream = new PassThrough()
    , timeout = setTimeout(function () {
        t.pass('no error has been emitted')
        t.end()
      }, 60)

  wrap(stream)

  stream.once('error', function (err) {
    t.fail('error should not be emitted on a ended stream')
    t.end()
    clearTimeout(timeout)
  })

  stream.emit('end')
})