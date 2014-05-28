var PassThrough = require('stream').PassThrough

  , test = require('tape')
  , chaos = require('./chaos')

test('wrapped stream should emit error', function (t) {

  var stream = new PassThrough()
    , wrap = chaos()

  wrap(stream)

  stream.once('error', function (err) {
    t.pass('should emit error')
    t.end()
  })
})

test('finished stream should not emit error', function (t) {
  var stream = new PassThrough()
    , wrap = chaos()
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
    , wrap = chaos()
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

test('errored stream should not emit chaos-error', function (t) {
  var stream = new PassThrough()
    , wrap = chaos()

  wrap(stream)

  stream.on('error', function (err) {
    t.equal(err.message, 'beep boop')
    t.end()
  })

  stream.emit('error', new Error('beep boop'))
})