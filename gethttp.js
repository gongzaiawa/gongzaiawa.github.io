// 导入所需的库和模块
const https = require('https');

// 创建发送 HTTPS 请求的函数
function sendHTTPSRequest(url, method, headers, body, callback) {
  const options = {
    method: method,
    headers: headers
  };

  // 如果需要添加正文，请在选项中设置 "body" 属性
  if (body) {
    options.body = body;
  }

  // 创建请求对象
  const req = https.request(url, options, (res) => {
    let data = '';

    // 处理响应数据
    res.on('data', (chunk) => {
      data += chunk;
    });

    res.on('end', () => {
      // 将响应数据传递给回调函数进行处理
      callback(data);
    });
  });

  // 处理错误
  req.on('error', (err) => {
    console.error(err);
  });

  // 根据需要，如果有正文，请写入请求主体
  if (body) {
    req.write(body);
  }

  // 发送请求
  req.end();
}

// 在扩展中使用该函数
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

    // 发送 HTTPS 请求并处理响应数据
    sendHTTPSRequest(url, method, headers, body, (data) => {
      console.log(data); // 这里可以根据实际情况进行处理
    });
  }
});
