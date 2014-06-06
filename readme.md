# chaos-stream[![build status](https://secure.travis-ci.org/kesla/chaos-stream.png)](http://travis-ci.org/kesla/chaos-stream)

Make a chaotic stream, one that will error and stuff randomly from time to time

[![NPM](https://nodei.co/npm/chaos-stream.png?downloads&stars)](https://nodei.co/npm/chaos-stream/)

[![NPM](https://nodei.co/npm-dl/chaos-stream.png)](https://nodei.co/npm/chaos-stream/)

## Warning

This is still experimental and may change greatly going forward

## Installation

```
npm install chaos-stream
```

## Example

### Input

```javascript
var PassThrough = require('stream').PassThrough
  , createChaos = require('./chaos')

    // the default is to always give chaos to a stream
  , alwaysChaos = createChaos()
    // but you can also create a custom chaos version of you own
  , chaosCounter = 0
  , eventuallyChaos = createChaos(function () {
      chaosCounter = chaosCounter + 1
      if (chaosCounter === 1)
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
```

### Output

```
stream1 will always error
err [Error: This is chaos]
Well, this should not be called
```

## Licence

Copyright (c) 2014 David Björklund

This software is released under the MIT license:

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
