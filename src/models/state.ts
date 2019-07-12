import { Model } from '@/hooks/useModel'
import { GET } from '@/utils/fetch'
import { logIn, isLogIn,logOut } from '@/utils/logIn'
interface State {
  /**
   * 是否登录
   */
  isLogIn: boolean
  /**
   * 个人账户信息
   */
  myInfo: any | null
}


class UserModel extends Model<State> {
  constructor() {
    super()

    this.state = {
      isLogIn: isLogIn(),
      myInfo: null,
    }

    this.FRESH_INFO()
  }

  LOG_IN = async (username: string, password: string) => {
    const token = await logIn(username, password)

    token.fail().succeed(_ => {
      this.setState({
        isLogIn: true,
      })
      this.FRESH_INFO()
    })

    return token
  }

  LOG_OUT = () => {
    logOut()

    this.setState({
      isLogIn: false,
      myInfo: null,
    })
  }

  FRESH_INFO = async () => {
    if (!this.state.isLogIn) {
      return
    }

    //const res = await getMyInfo()
    //res.map((data:IUser)=>this.setState({myInfo:data}))
  }
}

export default new UserModel()

