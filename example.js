var PassThrough = require('stream').PassThrough
  , createChaos = require('./chaos')

    // the default is to always give chaos to a stream
  , alwaysChaos = createChaos()
    // but you can also create a custom chaos version of you own
  , chaosCounter = 0
  , eventuallyChaos = createChaos(function () {
      chaosCounter = chaosCounter + 1
      if (chaosCounter === 2)
        return true
    })

  , stream1 = new PassThrough()
  , stream2 = new PassThrough()
  , stream3 = new PassThrough()
  , endedStream = new PassThrough()

stream1.once('error', function (err) {
  console.log('stream1 will always error')
  console.log('err', err)
})

alwaysChaos(stream1)

stream2.once('error', function (err) {
  console.log('Well, this should not be called')
})

stream3.once('error', function (err) {
  console.log('This should always be called')
  console.log('err', err)
})

eventuallyChaos(stream2)
eventuallyChaos(stream3)