class HttpExtension {
  constructor (runtime) {
    this.runtime = runtime
  }

  getInfo () {
    return {
      id: 'http',
      name: 'HTTP',
      blocks: [
        {
          opcode: 'httpGet',
          blockType: Scratch.BlockType.REPORTER,
          text: 'get HTTP data from [URL]',
          arguments: {
            URL: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: 'https://www.example.com',
            },
          },
          func: 'httpGet',
        },
      ],
    }
  }

  async httpGet (args) {
    const url = args.URL
    try {
      const response = await fetch(url)
      const data = await response.text()
      return data
    } catch (e) {
      return ''
    }
  }
}

Scratch.extensions.register(new HttpExtension())
