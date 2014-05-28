var wrap = function (opts) {
      return function (stream) {
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
    }

module.exports = wrap