import { INews, ITGBus } from "@giligili";

declare module '@giligili' {
  interface IData {
    tgbusData: ITGBus
    wordcloud: string
    news: INews[]
    competitors: Array<{ name: string, _id: string }>
    score: Array<{ real_score: number, full_score: number, website: string }>
  }
}
