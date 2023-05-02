class EmailExtension {
  constructor () {
    this.menuId = 'recipientMenu'
  }

  getInfo () {
    return {
      id: 'email',
      name: '邮箱验证码',
      blocks: [
        {
          opcode: 'sendEmail',
          blockType: Scratch.BlockType.COMMAND,
          text: '发送 邮箱 [recipient] 上的主题为 [subject] 内容为 [body] 的邮件',
          arguments: {
            recipient: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: 'example@example.com'
            },
            subject: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: 'TestEmail'
            },
            body: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: '内容'
            }
          }
        }
      ],
      menus: {
        [this.menuId]: []
      }
    }
  }

  async sendEmail (args) {
    const baseUrl = 'https://v.api.aa1.cn/api/qqemail/new/?to='
    const url = `${baseUrl}"${args.recipient}"&subject=${args.subject}&message="${args.body}"`
    try {
      await fetch(url)
    } catch (error) {
      console.log("Error while sending email:", error)
    }
  }
}

Scratch.extensions.register(new EmailExtension())
