class GzEmail {
  getInfo() {
    return {
      id: 'gz邮箱验证码', // 扩展 ID，不要和其他扩展重复
      name: '发送验证码到邮箱', // 扩展名称，将显示在 Scratch 中
      blocks: [
        {
          opcode: 'sendEmail',
          blockType: Scratch.BlockType.COMMAND,
          text: '发送邮件到 [TO] 主题 [SUBJECT] 内容 [MESSAGE]', // 指令文本，[] 内的字符串是参数名称
          arguments: {
            TO: {
              type: Scratch.ArgumentType.STRING, // 参数数据类型：字符串
              defaultValue: 'example@example.com', // 默认值
            },
            SUBJECT: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: 'TestEmail',
            },
            MESSAGE: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: 'Hello World!',
            },
          },
        },
      ],
    };
  }

  /**
   * 发送邮件的实现函数
   * @param {object} args - 参数对象
   * @param {string} args.TO - 接收方邮箱地址
   * @param {string} args.SUBJECT - 邮件主题
   * @param {string} args.MESSAGE - 邮件内容
   */
  sendEmail(args) {
    const to = encodeURIComponent(args.TO); // 将邮箱地址转码
    const subject = encodeURIComponent(args.SUBJECT);
    const message = encodeURIComponent(args.MESSAGE);
    const url = `https://v.api.aa1.cn/api/qqemail/new/?to=${to}&subject=${subject}&message=${message}`;
    fetch(url) // 使用 fetch API 发送请求
      .then((response) => {
        if (!response.ok) { // 如果响应不是 OK，抛出异常
          throw new Error(`HTTP error ${response.status}`);
        }
      })
      .catch((error) => {
        console.error(error); // 打印错误信息到控制台
        throw new Error('发送邮件失败！'); // 将异常向上抛出，让 Scratch 感知到运行时错误
      });
  }
}

Scratch.extensions.register(new GzEmail());
