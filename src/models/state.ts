import { Model } from '@/hooks/useModel'
import { IMiniData } from '@giligili'
import { searchByWord } from '@/services/search'
interface State {
  needTopSearch: boolean
  word: string
  content: IMiniData[]
  type: string
  theme: string
  mode: string
  time: string
  order: number | null
  page: number | null,
  totalElements: number
  loading: boolean
}


class GlobalModel extends Model<State> {
  constructor() {
    super()
    this.state = {
      needTopSearch: false,
      word: '',
      content: [],
      type: '',
      mode: '',
      theme: '',
      order: null,
      time: '',
      page: null,
      totalElements: 0,
      loading: false
    }
  }

  changeTopSearchState = (v: boolean) => {
    this.setState({ needTopSearch: v })
  }

  setWord = (v: string) => this.setState({ word: v })
  setType = (v: string) => this.setState({ type: v })
  setTheme = (v: string) => this.setState({ theme: v })
  setTime = (v: string) => this.setState({ time: v })
  setOrder = (v: number) => this.setState({ order: v })
  setMode = (v: string) => this.setState({ mode: v })
  setPage = (v: number) => this.setState({ page: v })

  setContent = (v: IMiniData[]) => this.setState({ content: v })

  search = async () => {
    this.setState({ loading: true })
    const { word, type, mode, theme, order, time, page } = this.state
    const res = await searchByWord({ word, type, mode, theme, order, time, page })
    res.map((data: any) => {
      this.setState({ totalElements: data.data.totalElements, loading: false, content: data.data.content })
    })
  }


}

export default new GlobalModel()

