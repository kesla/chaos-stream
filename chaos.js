var wrap = function (opts) {
      return function (stream) {
            var timeout = setTimeout(function () {

                  stream.emit('error', new Error('This is chaos'))
                }, 50)
              , clean = function () {
                  clearTimeout(timeout)
                }

            stream.once('end', clean)
            stream.once('finish', clean)
          }
    }

module.exports = wrap