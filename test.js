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

test('make is possible to add function to decide if it should error', function (t) {
  t.plan(2)

  var count = 0
    , stream1 = new PassThrough()
    , stream2 = new PassThrough()
    , stream3 = new PassThrough()
    , stream4 = new PassThrough()
    , wrap = chaos(function () {
        count++
        return count > 2
      })

  wrap(stream1)
  wrap(stream2)
  wrap(stream3)
  wrap(stream4)

  stream3.on('error', function () {
    t.pass('third stream should error')
  })
  stream4.on('error', function () {
    t.pass('fourth stream should error')
  })
})