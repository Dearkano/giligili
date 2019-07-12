import React, { useState } from 'react'
import List from './list'
import Search from '@/components/Search'
import Pagination from "material-ui-flat-pagination";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { makeStyles, Theme, createStyles, withStyles } from '@material-ui/core/styles';
import img1 from '@/assets/1.jpg'
import img2 from '@/assets/2.jpg'
import img3 from '@/assets/3.jpg'
import logo from '@/assets/logo.png'
import { navigate } from '@/utils/history';
import { Typography, Divider } from '@material-ui/core';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    row: {
      display: 'flex',
      alignItems: 'center',
    },
    column: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      paddingLeft: '200px',
      paddingRight: '200px'
    },
    select: {
      display: 'flex',
      width: '100%',
      marginTop: '10px',
      wordBreak: 'keep-all',
      flexWrap: 'wrap'
    },
    rate: {
      '&:focus': {
        backgroundColor: theme.palette.primary.main,
        color: '#fff'
      },
    }
  })
)

const StyledRate = withStyles(theme => ({
  root: {
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
      color: '#fff'
    },
    padding: '2px 5px 2px 5px',
    borderRadius: '5px',
    cursor: 'pointer'
  },
}))(Typography);

const StyledCheckedRate = withStyles(theme => ({
  root: {
    backgroundColor: theme.palette.primary.main,
    color: '#fff',
    padding: '2px 5px 2px 5px',
    borderRadius: '5px',
    cursor: 'pointer'
  },
}))(Typography);

interface Props {
  word?: string
  type?: string
}

export default ({ word, type }: Props) => {
  const [page, setPage] = useState(1)
  const [value, setValue] = useState(0)
  const [checked, setChecked] = useState('')
  const classes = useStyles()
  const [list, setList] = useState([
    {
      name: '英雄联盟',
      subname: 'League of Legends',
      abstract: 'Microsoft Windows, Mac / 2009-10-27 / 即时战略游戏, 战略游戏, 俯瞰 / 《英雄联盟》(简称LOL)是由美国拳头游戏(Riot Games)开发、中国大陆地区腾讯游戏代理运营的英雄对战MOBA竞技网游。游戏里拥有数百个个性英雄，并拥有排位系统、符文系统等特色养成系统。',
      cover: img1
    },
    {
      name: '怪物猎人：世界',
      subname: 'Monster Hunter World / モンスターハンター：ワールド',
      abstract: 'Microsoft Windows, PlayStation 4, Xbox One / 2018-1-26 / 角色扮演游戏, 冒险游戏, 第三人称 / 《怪物猎人 世界》（日语：モンスターハンター：ワールド，英语：Monster Hunter: World，港台译作“魔物猎人 世界”）是一款由卡普空制作并发在PlayStation 4、Xbox One和Windows平台上的动作角色扮演游戏，是系列继2009年发售的《怪物猎人3》之后再次为家用主机平台制作的新作，也是系列首次在Windows上发售本传作品，亦是本传作品首次进行中文化：PlayStation 4版本和Windows上的Steam网络商店版本提供官方繁体中文化，腾讯的Wegame平台将发售Windows版的官方简体中文版本。',
      cover: img2
    },
    {
      name: '绝地求生大逃杀',
      subname: "PLAYERUNKNOWN'S BATTLEGROUNDS",
      abstract: 'Microsoft Windows, Xbox One / 2017-12-12 / 射击游戏, 冒险游戏, 独立游戏, 第一人称, 第三人称 / 绝地求生(PLAYERUNKNOWN’S BATTLEGROUNDS)是战术竞技类型的游戏，每一局游戏将有100名玩家参与，他们将被投放在绝地岛(battlegrounds)的上空，游戏开始跳伞时所有人都一无所有。',
      cover: img3
    }
  ])
  if (word) {

  }

  const handleClick = (offset: number) => {
    setPage(offset / 10 + 1)
  }

  const handleChange = (e: any, val: number) => {
    setValue(val)
  }


  const handleCheck = (item: string) => {
    setChecked(item)
  }
  return (<div className={classes.column}>

    <div className={classes.row}>
      <img width="100px" style={{ marginRight: '20px' }} src={logo} />
      <Search />
    </div>

    <Tabs value={value} onChange={handleChange}>
      <Tab label="游戏类型" />
      <Tab label="游戏主题" />
      <Tab label="评分" />
      <Tab label="发行时间" />
    </Tabs>

    {value === 2 &&
      <div className={classes.select}>
        {['全部', '0-1', '2-3', '4-5', '6-7', '>8'].map(item => (
          <div style={{ display: 'flex' }} onClick={() => handleCheck(item)}>
            {checked !== item && <StyledRate color="primary">{item}</StyledRate>}
            {checked === item && <StyledCheckedRate>{item}</StyledCheckedRate>}
            <div style={{ width: '20px' }}></div>
          </div>
        ))}
      </div>}

    {value === 0 &&
      <div className={classes.select}>
        {['全部', '生存恐怖', '校园', '角色扮演游戏', '即时战略游戏', '免费游玩', '独立游戏', '战争', '文字冒险游戏', '桌面游戏', '动作冒险游戏', '音乐游戏', '家庭', '卡牌', '钓鱼', '休闲', '第三人称','体育游戏', '解谜游戏','模拟游戏', '第一人称', '动作游戏', '虚拟现实', '聚会', '射击游戏', '冒险游戏', '格斗游戏', '弹珠台', '回合制战略游戏', '点击游戏', '日式角色扮演游戏', '动作角色扮演游戏', '养成', '恋爱冒险',  '平台游戏', '儿童', '大型多人在线', '文字', '多人', '竞速游戏', '街机', '实用工具', '战略游戏'].map(item => (
          <div style={{ display: 'flex' }} onClick={() => handleCheck(item)}>
            {checked !== item && <StyledRate color="primary">{item}</StyledRate>}
            {checked === item && <StyledCheckedRate>{item}</StyledCheckedRate>}
            <div style={{ width: '20px' }}></div>
          </div>
        ))}
      </div>}

      {value === 1 &&
      <div className={classes.select}>
        {['全部', '潜行', '非虚构', '生存恐怖', '4X', '校园', '美少女', '战争', '喜剧', '教育', '剧情', '科幻', '奇幻', '色情', '卡牌', 'Roguelike', '恋爱', '惊悚', '悬疑', '动作游戏', '聚会', '生存', '恋爱冒险', '开放世界', '儿童', '历史', '类侠盗猎车手', '养成', '沙盒', '节奏', '模拟经营'].map(item => (
          <div style={{ display: 'flex' }} onClick={() => handleCheck(item)}>
            {checked !== item && <StyledRate color="primary">{item}</StyledRate>}
            {checked === item && <StyledCheckedRate>{item}</StyledCheckedRate>}
            <div style={{ width: '20px' }}></div>
          </div>
        ))}
      </div>}

    <List list={list} />

    <Pagination
      limit={10}
      offset={(page - 1) * 10}
      total={100}
      onClick={(e, offset) => handleClick(offset)}
    />

  </div>)
}
