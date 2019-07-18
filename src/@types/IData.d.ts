import { INews, ITGBus, IBaiduData, IBaiduData, ITrend } from "@giligili";

declare module '@giligili' {
  interface IData {
    tgbusData: ITGBus
    wordcloud: string
    news: INews[]
    competitors: Array<{ name: string, _id: string, baiduIndex: IBaiduData }>
    score: Array<{ real_score: number, full_score: number, website: string, comment: string }>
    baiduData: IBaiduData
    trend: ITrend[]
  }
}
