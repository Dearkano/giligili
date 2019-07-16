interface IHost {
  oauth: string
  api: string
}

const host: IHost = {
  oauth: process.env.oauth || '',
  api: 'http://139.155.103.174:8080'
}

export default host
