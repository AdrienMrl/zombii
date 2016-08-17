const http = require('http')
const indev = require('indev');

const generator = indev({seed: 'lol'});
const simplexGenerator = generator.simplex({
  min: 0,
  max: 1,
  frequency: 0.01,
  octaves: 8
});

const uniformGenerator = generator.uniform({
  min: -10,
  max: 200,
  frequency: 0.004,
  octaves: 7
});


const PORT=7641;

const handleRequest = (request, response) => {

  const reqSplited = request.url.split('/')
  var yReq = parseFloat(reqSplited.pop())
  var xReq = parseFloat(reqSplited.pop())

  const chunkSize = 16

  const offsetX = (chunkSize) * xReq
  const offsetY = (chunkSize) * yReq

  map = Array(chunkSize + 1)
  for (var i = 0; i < chunkSize + 1; i++)
    map[i] = Array(chunkSize);

  for (let y = 0; y < chunkSize + 1; y++) {
    for (let x = 0; x < chunkSize + 1; x++) {

      let value = uniformGenerator.in2D(offsetY + y, offsetX + x);

      if (true || offsetX + x > 100)
        value /= 4;
      if (offsetY + y > 100)
        value *= 10;
      map[y][x] = String(value)
    }
  }

  const mapSer = map.map(x => x.join(' ')).join(' ')
  response.end(mapSer)
}


function httpServer() {

  const server = http.createServer(handleRequest)

  server.listen(PORT, () => {
    console.log('listening')
  })
}

function udpServer() {

  const dgram = require('dgram');
  const server = dgram.createSocket('udp4');

  server.on('error', (err) => {
    console.log(`server error:\n${err.stack}`);
    server.close();
  });

  server.on('message', (msg, rinfo) => {
    console.log(`server got: ${msg} from ${rinfo.address}:${rinfo.port}`);

    const message = Buffer.from('bien reçu: ' + msg);

    var mess = new Int32Array(4);
    mess[0] = 123456789


    server.send(Buffer.from(mess.buffer), rinfo.port, rinfo.address, (err) => {
      console.log('bien reçu: ' + msg)
    })

  });

  server.on('listening', () => {
    var address = server.address();
    console.log(`server listening ${address.address}:${address.port}`);
  });

  server.bind(11001);
}

udpServer()
//httpServer()
