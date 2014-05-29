var makeChaos = function (stream) {
      var timeout = setTimeout(function () {
            stream.emit('error', new Error('This is chaos'))
          }, 50)
        , cleanup = function () {
            stream.removeListener('close', cleanup)
            stream.removeListener('end', cleanup)
            stream.removeListener('error', cleanup)

            clearTimeout(timeout)
          }

      stream.once('close', cleanup)
      stream.once('end', cleanup)
      stream.once('error', cleanup)
    }

  , wrap = function (func) {
      func = func || function () {
            return true
          }

      return function (stream) {
        if (func())
          makeChaos(stream)
      }
    }

module.exports = wrap