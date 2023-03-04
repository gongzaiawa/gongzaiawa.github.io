const ws = require("nodejs-websocket");
let count = 0;
const serve = ws.createServer(conn => {console.log('新的连接');count++conn.userName = `用户${count}号`broadcast(`${conn.userName}进入了聊天室`);// 接收到了浏览器的数据
                                       conn.on('text', data => {broadcast(`${conn.userName}:` + data)})// 关闭的时候触发
                                       conn.on('close', data => {console.log('关闭连接');broadcast(`${conn.userName}离开了聊天室`);})// 发生异常 触发
                                       conn.on('error', data => {console.log('发生异常');})
})
// 广播信息给所有的用户
function broadcast(msg) {serve.connections.forEach(item => {item.send(msg)})
}serve.listen(0, () => {console.log('监听端口0')
})
