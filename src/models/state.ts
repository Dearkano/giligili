import { Model } from '@/hooks/useModel'
import { IMiniData } from '@giligili'
import { searchByWord } from '@/services/search'
interface State {
  needTopSearch: boolean
  word: string
  content: IMiniData[]
}


class GlobalModel extends Model<State> {
  constructor() {
    super()
    this.state = {
      needTopSearch: false,
      word: '',
      content:[]
    }
  }

  changeTopSearchState = (v: boolean) => {
    this.setState({ needTopSearch: v })
  }

  setWord = (v: string) => this.setState({ word: v })

  setContent = (v:IMiniData[])=> this.setState({content: v})

  search = async () => {
      const res = await searchByWord({ word: this.state.word })
      res.map((data: any) => {
        this.setContent(data.data.content)
      })
  }

}

export default new GlobalModel()

