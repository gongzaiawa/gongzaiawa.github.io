class EmailExtension {
  constructor() {
    this.menuId = 'recipientMenu'
  }

  getInfo() {
    const locale = {
      en: {
        sendEmail: 'Send email to %recipient with subject %subject and body %body'
      },
      zh_CN: {
        sendEmail: '向邮箱 %recipient 发送标题为 %subject 内容为 %body 的邮件'
      }
    }

    return {
      id: 'email',
      name: {en: 'Email Verification Code', zh_CN: '邮箱验证码'},
      blocks: [
        {
          opcode: 'sendEmail',
          blockType: Scratch.BlockType.COMMAND,
          text: locale[Scratch.GUI_LANGUAGE]['sendEmail'],
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
              defaultValue: 'Content'
            }
          }
        }
      ],
      menus: {
        [this.menuId]: []
      }
    }
  }

  async sendEmail(args) {
    const baseUrl = 'https://v.api.aa1.cn/api/qqemail/new/?to='
    const url = `${baseUrl}"${args.recipient}"&subject=${args.subject}&message="${args.body}"`
    try {
      await fetch(url)
      alert(locale[Scratch.GUI_LANGUAGE]['waitMessage'])
    } catch (error) {
      console.log("Error while sending email:", error)
    }
  }
}

const locale = {
  en: {
    waitMessage: 'Please wait for a minute before using this feature again.'
  },
  zh_CN: {
    waitMessage: '请稍等一分钟后再使用此功能。'
  }
}

Scratch.extensions.register(new EmailExtension(locale))
