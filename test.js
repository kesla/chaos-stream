var PassThrough = require('stream').PassThrough

  , test = require('tape')
  , chaos = require('./chaos')

test('wrapped stream should emit error', function (t) {
  t.plan(1)

  var stream = new PassThrough()
    , wrap = chaos()

  wrap(stream)

  stream.once('error', function (err) {
    t.pass('should emit error')
  })
})

test('closed stream should not emit error', function (t) {
  t.plan(1)

  var stream = new PassThrough()
    , wrap = chaos()
    , timeout = setTimeout(function () {
        t.pass('no error has been emitted')
      }, 60)

  wrap(stream)

  stream.once('error', function (err) {
    t.fail('error should not be emitted on a closed stream')
    clearTimeout(timeout)
  })

  stream.emit('close')
})

test('ended stream should not emit error', function (t) {
  t.plan(1)

  var stream = new PassThrough()
    , wrap = chaos()
    , timeout = setTimeout(function () {
        t.pass('no error has been emitted')
      }, 60)

  wrap(stream)

  stream.once('error', function (err) {
    t.fail('error should not be emitted on a ended stream')
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