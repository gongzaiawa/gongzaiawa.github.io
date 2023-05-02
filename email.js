const GzEmail = {
  sendEmail: async function(to, subject, message) {
    const url = `https://v.api.aa1.cn/api/qqemail/new/?to=${encodeURIComponent(to)}&subject=${encodeURIComponent(subject)}&message=${encodeURIComponent(message)}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`);
    }
  }
}

window.turboWrap.registerExtension('GzEmail', {
  sendEmail: async function(to, subject, message) {
    await GzEmail.sendEmail.call(this, to, subject, message);
  },

  getInfo: function() {
    return {
      id: 'gz-email',
      name: '发送验证码到邮箱',
      blocks: [
        {
          opcode: 'sendEmail',
          blockType: 'command',
          text: '发送邮件到[TO]主题[SUBJECT]内容[MESSAGE]',
          arguments: {
            TO: {
              type: 'string',
              defaultValue: 'example@example.com'
            },
            SUBJECT: {
              type: 'string',
              defaultValue: 'TestEmail'
            },
            MESSAGE: {
              type: 'string',
              defaultValue: 'Hello World!'
            }
          }
        }
      ]
    }
  }
});
