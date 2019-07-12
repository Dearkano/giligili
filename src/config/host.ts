interface IHost {
  oauth: string
  api: string
}

const host: IHost = {
  oauth: process.env.oauth || '',
  api: 'http://localhost:7001'
}

export default host
