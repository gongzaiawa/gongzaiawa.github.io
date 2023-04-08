
const https = require('https');


function sendHTTPSRequest(url, method, headers, body, callback) {
  const options = {
    method: method,
    headers: headers
  };


  if (body) {
    options.body = body;
  }

  const req = https.request(url, options, (res) => {
    let data = '';


    res.on('data', (chunk) => {
      data += chunk;
    });

    res.on('end', () => {

      callback(data);
    });
  });


  req.on('error', (err) => {
    console.error(err);
  });


  if (body) {
    req.write(body);
  }


  req.end();
}


Scratch.extensions.register('myExtension', {
  getInfo: () => ({
    id: 'myExtension',
    name: 'My Extension',
    blocks: [
      {
        opcode: 'sendHTTPSRequest',
        blockType: Scratch.BlockType.COMMAND,
        text: 'Send HTTPS request to [URL] with method [METHOD] and headers [HEADERS] and body [BODY]',
        arguments: {
          URL: {
            type: Scratch.ArgumentType.STRING,
            defaultValue: ''
          },
          METHOD: {
            type: Scratch.ArgumentType.STRING,
            defaultValue: 'GET'
          },
          HEADERS: {
            type: Scratch.ArgumentType.STRING,
            defaultValue: '{}'
          },
          BODY: {
            type: Scratch.ArgumentType.STRING,
            defaultValue: ''
          }
        }
      }
    ]
  }),

  sendHTTPSRequest: (args) => {
    const url = args.URL;
    const method = args.METHOD;
    const headers = JSON.parse(args.HEADERS);
    const body = args.BODY;

    sendHTTPSRequest(url, method, headers, body, (data) => {
      console.log(data);
    });
  }
});
