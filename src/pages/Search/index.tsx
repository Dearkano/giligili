import React, { useState, useEffect } from 'react'
import List from './list'
import Search from '@/components/Search'
import Pagination from "material-ui-flat-pagination";
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';
import MuiExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { makeStyles, Theme, createStyles, withStyles } from '@material-ui/core/styles';
import logo from '@/assets/search_logo.png'
import { navigate } from '@/utils/history';
import DoneIcon from '@material-ui/icons/Done';
import { Typography, Divider } from '@material-ui/core';
import Chip from '@material-ui/core/Chip';
import State from '@/models/state'
import useModel from '@/hooks/useModel'
import FixFab from '@/components/FixFab'
import { searchByWord } from '@/services/search'
import Icon1 from '@/assets/sort.png'
import Icon2 from '@/assets/default.png'
import Icon3 from '@/assets/up.png'
import Icon4 from '@/assets/down.png'
import BlankImg from '@/assets/blank.png'
import Loading from '@/components/LoadingCircle'
import BotImg from '@/assets/bot.png'
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    row: {
      display: 'flex',
      alignItems: 'center',
      width: '100%'
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
      height: '100%',
      wordBreak: 'keep-all',
      flexWrap: 'wrap'
    },
    rate: {
      '&:focus': {
        backgroundColor: theme.palette.primary.main,
        color: '#fff'
      },
    },
    heading: {
      fontSize: theme.typography.pxToRem(14),
      wordBreak: 'keep-all',
      marginRight: '50px',
      fontWeight: 'bolder'
    },
    secondaryHeading: {
      fontSize: theme.typography.pxToRem(15),
      color: theme.palette.text.secondary,
    },
    panel: {
      boxShadow: 'none',
      width: '100%'
    }
  })
)
const ExpansionPanel = withStyles({
  root: {
    boxShadow: 'none',
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
    '&$expanded': {
      margin: 'auto',
    },
  },
  expanded: {},
})(MuiExpansionPanel);

const ExpansionPanelSummary = withStyles({
  root: {
    borderTop: '1px solid rgba(0, 0, 0, .125)',
    marginBottom: -1,
    minHeight: 30,
    '&$expanded': {
      minHeight: 30,
    },
  },
  content: {
    '&$expanded': {
      margin: '12px 0',
    },
  },
  expanded: {},
})(MuiExpansionPanelSummary);

const ExpansionPanelDetails = withStyles(theme => ({
  root: {
    padding: '0px 0px 20px 0px',
    '&expanded': {
      padding: '0px 0px 0px 0px'
    },
  },
  expanded: {
    padding: '0px 0px 0px 0px'
  }
}))(MuiExpansionPanelDetails);

const StyledRate = withStyles(theme => ({
  root: {
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
      color: '#fff'
    },
    padding: '2px 5px 2px 5px',
    borderRadius: '16px',
    cursor: 'pointer',
    width: '140px',
    textAlign: 'center',
    fontSize: '14px'

  },
}))(Typography);

const StyledCheckedRate = withStyles(theme => ({
  root: {
    backgroundColor: theme.palette.primary.main,
    color: '#fff',
    padding: '2px 5px 2px 5px',
    borderRadius: '16px',
    cursor: 'pointer',
    width: '140px',
    textAlign: 'center',
    fontSize: '14px'
  },
}))(Typography);

interface Props {
  word?: string
  type?: string
  mode?: string
  theme?: string
}

export default ({ word, type, theme, mode }: Props) => {
  useEffect(() => {
    if (word) {
      State.setWord(word)
    }
    if (type) {
      console.log(type)
      setTypeChecked(type)
      State.setType(type)
    }
    if (theme) {
      setThemeChecked(theme)
      State.setTheme(theme)
    }
    if (mode) {
      setModeChecked(mode)
      State.setMode(mode)
    }
    State.changeTopSearchState(false)
    State.search()
  }, [type, theme, mode])

  const [page, setPage] = useState(1)
  const [typeChecked, setTypeChecked] = useState('')
  const [themeChecked, setThemeChecked] = useState('')
  const [rateChecked, setRateChecked] = useState('')
  const [timeChecked, setTimeChecked] = useState('')
  const [modeChecked, setModeChecked] = useState('')
  const classes = useStyles()
  const s = useModel(State)

  const handleClick = (offset: number) => {
    State.setPage(offset / 10 + 1)
    setPage(offset / 10 + 1)
    State.search()
  }


  const handleTypeCheck = (item: string) => {
    State.setType(item)
    setTypeChecked(item)
    State.search()
  }
  const handleThemeCheck = (item: string) => {
    State.setTheme(item)
    setThemeChecked(item)
    State.search()
  }
  const handleModeCheck = (item: string) => {
    State.setMode(item)
    setModeChecked(item)
    State.search()
  }
  const handleRateCheck = (item: string) => {
    let num = 0
    if (item === '降序') num = 1
    if (item === '升序') num = -1
    State.setOrder(num)
    setRateChecked(item)
    State.search()
  }
  const handleTimeCheck = (item: string) => {
    let i = item
    if (item === '2009年以前') {
      i = '2009'
    }
    State.setTime(i)
    setTimeChecked(i)
    State.search()
  }
  const [typeExpand, setTypeExpand] = useState(false)
  const [themeExpand, setThemeExpand] = useState(false)
  const [timeExpand, setTimeExpand] = useState(false)
  const [modeExpand, setModeExpand] = useState(false)
  const [expand, setExpand] = useState(false)
  return (<div className={classes.column} style={{marginTop: '30px'}}>

    <div className={classes.row} style={{ justifyContent: 'center' }}>
      <img onClick={() => {
        State.clear()
        navigate('/'
        )
      }} width="200px" style={{ marginRight: '20px', marginTop: '15px', cursor: 'pointer' }} src={logo} />
      <Search position="list" />
    </div>

    <div className={classes.row} style={{ marginTop: '20px', marginBottom: '20px', justifyContent: 'center' }}>
      {typeChecked && <Chip color="primary" style={{ marginRight: '20px', fontSize: '14px' }} onDelete={() => handleTypeCheck('')} label={typeChecked} />}
      {themeChecked && <Chip color="primary" style={{ marginRight: '20px', fontSize: '14px' }} onDelete={() => handleThemeCheck('')} label={themeChecked} />}
      {rateChecked && <Chip color="primary" style={{ marginRight: '20px', fontSize: '14px' }} onDelete={() => handleRateCheck('')} label={rateChecked} />}
      {timeChecked && <Chip color="primary" style={{ marginRight: '20px', fontSize: '14px' }} onDelete={() => handleTimeCheck('')} label={timeChecked} />}
      {modeChecked && <Chip color="primary" style={{ marginRight: '20px', fontSize: '14px' }} onDelete={() => handleModeCheck('')} label={modeChecked} />}
    </div>

    <ExpansionPanel className={classes.panel} expanded={typeExpand}>
      <ExpansionPanelSummary
        expandIcon={<ExpandMoreIcon onClick={() => setTypeExpand(!typeExpand)} />}
        aria-controls="panel1bh-content"
        id="panel1bh-header"
      >
        <Typography className={classes.heading}>游戏类型</Typography>
        {!typeExpand && <div className={classes.select}>
          {['角色扮演游戏', '即时战略游戏', '独立游戏', '冒险游戏', '休闲'].map(item => (
            <div style={{ display: 'flex' }} onClick={() => handleTypeCheck(typeChecked === item ? '' : item)}>
              {typeChecked !== item && <StyledRate color="primary">{item}</StyledRate>}
              {typeChecked === item && <StyledCheckedRate >{item}</StyledCheckedRate>}
              <div style={{ width: '20px' }}></div>
            </div>))}
        </div>}
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <div className={classes.select}>
          {['生存恐怖', '校园', '角色扮演游戏', '即时战略游戏', '免费游玩', '独立游戏', '战争', '文字冒险游戏', '桌面游戏', '动作冒险游戏', '音乐游戏', '家庭', '卡牌', '钓鱼', '休闲', '第三人称', '体育游戏', '解谜游戏', '模拟游戏', '第一人称', '动作游戏', '虚拟现实', '聚会', '射击游戏', '冒险游戏', '格斗游戏', '弹珠台', '回合制战略游戏', '点击游戏', '日式角色扮演游戏', '动作角色扮演游戏', '养成', '恋爱冒险', '平台游戏', '儿童', '大型多人在线', '文字', '多人', '竞速游戏', '街机', '实用工具', '战略游戏'].map(item => (
            <div style={{ display: 'flex' }} onClick={() => handleTypeCheck(typeChecked === item ? '' : item)}>
              {typeChecked !== item && <StyledRate color="primary">{item}</StyledRate>}
              {typeChecked === item && <StyledCheckedRate >{item}</StyledCheckedRate>}
              <div style={{ width: '20px' }}></div>
            </div>))}
        </div>
      </ExpansionPanelDetails>
    </ExpansionPanel>


    <ExpansionPanel className={classes.panel} expanded={themeExpand}>
      <ExpansionPanelSummary
        expandIcon={<ExpandMoreIcon onClick={() => setThemeExpand(!themeExpand)} />}
        aria-controls="panel1bh-content"
        id="panel1bh-header"
      >
        <Typography className={classes.heading}>游戏主题</Typography>
        {!themeExpand && <div className={classes.select}>
          {['开放世界', '生存恐怖', '4X', '剧情', '科幻'].map(item => (
            <div style={{ display: 'flex' }} onClick={() => handleThemeCheck(themeChecked === item ? '' : item)}>
              {themeChecked !== item && <StyledRate color="primary">{item}</StyledRate>}
              {themeChecked === item && <StyledCheckedRate>{item}</StyledCheckedRate>}
              <div style={{ width: '20px' }}></div>
            </div>
          ))}
        </div>}
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <div className={classes.select}>
          {['潜行', '非虚构', '生存恐怖', '4X', '校园', '美少女', '战争', '喜剧', '教育', '剧情', '科幻', '奇幻', '色情', '卡牌', 'Roguelike', '恋爱', '惊悚', '悬疑', '动作游戏', '聚会', '生存', '恋爱冒险', '开放世界', '儿童', '历史', '类侠盗猎车手', '养成', '沙盒', '节奏', '模拟经营'].map(item => (
            <div style={{ display: 'flex' }} onClick={() => handleThemeCheck(themeChecked === item ? '' : item)}>
              {themeChecked !== item && <StyledRate color="primary">{item}</StyledRate>}
              {themeChecked === item && <StyledCheckedRate>{item}</StyledCheckedRate>}
              <div style={{ width: '20px' }}></div>
            </div>
          ))}
        </div>
      </ExpansionPanelDetails>
    </ExpansionPanel>

    <ExpansionPanel className={classes.panel} expanded={modeExpand}>
      <ExpansionPanelSummary
        expandIcon={<ExpandMoreIcon onClick={() => setModeExpand(!modeExpand)} />}
        aria-controls="panel1bh-content"
        id="panel1bh-header"
      >
        <Typography className={classes.heading}>游戏模式</Typography>
        {!modeExpand && <div className={classes.select}>
          {['大型多人在线', '多人', '分屏', '网页游戏', '单人'].map(item => (
            <div style={{ display: 'flex' }} onClick={() => handleModeCheck(modeChecked === item ? '' : item)}>
              {modeChecked !== item && <StyledRate color="primary">{item}</StyledRate>}
              {modeChecked === item && <StyledCheckedRate>{item}</StyledCheckedRate>}
              <div style={{ width: '20px' }}></div>
            </div>
          ))}
        </div>}
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
     <div className={classes.select}>
          {['大型多人在线', '多人', '分屏', '网页游戏', '单人', '合作'].map(item => (
            <div style={{ display: 'flex' }} onClick={() => handleModeCheck(modeChecked === item ? '' : item)}>
              {modeChecked !== item && <StyledRate color="primary">{item}</StyledRate>}
              {modeChecked === item && <StyledCheckedRate>{item}</StyledCheckedRate>}
              <div style={{ width: '20px' }}></div>
            </div>
          ))}
        </div>
      </ExpansionPanelDetails>
    </ExpansionPanel>


    <ExpansionPanel className={classes.panel} expanded={timeExpand}>
      <ExpansionPanelSummary
        expandIcon={<ExpandMoreIcon onClick={() => setTimeExpand(!timeExpand)} />}
        aria-controls="panel1bh-content"
        id="panel1bh-header"
      >
        <Typography className={classes.heading}>发行时间</Typography>
        {!timeExpand && <div className={classes.select}>
          {['2019', '2018', '2017', '2016', '2015'].map(item => (
            <div style={{ display: 'flex' }} onClick={() => handleTimeCheck(timeChecked === item ? '' : item)}>
              {timeChecked !== item && <StyledRate color="primary">{item}</StyledRate>}
              {timeChecked === item && <StyledCheckedRate>{item}</StyledCheckedRate>}
              <div style={{ width: '20px' }}></div>
            </div>
          ))}
        </div>}
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <div className={classes.select}>
          {['2019', '2018', '2017', '2016', '2015', '2014', '2013', '2012', '2011', '2010', '2009年以前'].map(item => (
            <div style={{ display: 'flex' }} onClick={() => handleTimeCheck(timeChecked === item ? '' : item)}>
              {timeChecked !== item && <StyledRate color="primary">{item}</StyledRate>}
              {timeChecked === item && <StyledCheckedRate>{item}</StyledCheckedRate>}
              <div style={{ width: '20px' }}></div>
            </div>
          ))}
        </div>
      </ExpansionPanelDetails>
    </ExpansionPanel>

    {!s.loading && s.content.length !== 0 && <List list={s.content} />}
    {!s.loading && s.content.length === 0 && <img width="400px" style={{ marginTop: '100px' }} src={BlankImg} />}
    {s.loading && <Loading />}

    <Pagination
      style={{ marginTop: '20px' }}
      size="large"
      limit={10}
      offset={(page - 1) * 10}
      total={s.totalElements}
      onClick={(e, offset) => handleClick(offset)}
      currentPageColor="default"
    />

    {expand && (
      <>
        <FixFab order={4} onClick={() => handleRateCheck('默认')}>
          <img width="40px" style={{ paddingTop: '5px' }} src={Icon2} />
        </FixFab>
        <FixFab order={3} onClick={() => handleRateCheck('升序')}>
          <img width="40px" style={{ paddingTop: '5px' }} src={Icon3} />
        </FixFab>
        <FixFab order={2} onClick={() => handleRateCheck('降序')}>
          <img width="40px" style={{ paddingTop: '5px' }} src={Icon4} />
        </FixFab>
      </>
    )}
    <FixFab onClick={() => setExpand(!expand)}>
      <img width="40px" style={{ paddingTop: '5px' }} src={Icon1} />
    </FixFab>
    <div style={{ display: 'flex', justifyContent: 'center', width: '100%', marginTop: '50px' }}><img width="300px" height="56px" src={BotImg} /></div>
  </div>)
}
