var wrap = function (opts) {
      return function (stream) {
            var timeout = setTimeout(function () {
                  stream.emit('error', new Error('This is chaos'))
                }, 50)
              , cleanup = function () {
                  clearTimeout(timeout)
                }

            stream.once('end', cleanup)
            stream.once('error', cleanup)
            stream.once('finish', cleanup)
          }
    }

module.exports = wrap