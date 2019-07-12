import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles, Theme, createStyles, withStyles } from '@material-ui/core/styles';
import Menu, { MenuProps } from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Fade from '@material-ui/core/Fade';
import Button from '@material-ui/core/Button'
import ListItemText from '@material-ui/core/ListItemText';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
    },
    grow: {
      flexGrow: 1,
    },
    sectionDesktop: {
      display: 'flex',
    },
    appBar: {
      backgroundColor: 'white',
      boxShadow: 'none'
    },
    button: {
      marginLeft: '10px',
      fontWeight: 'bold'
    },
    text: {
      fontSize: '14px'
    }
  })
)

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
    borderRadius: '35px'
  },
})((props: MenuProps) => (
  <Menu
    elevation={0}
    disableAutoFocus
    keepMounted
    TransitionComponent={Fade}
    disableAutoFocusItem={true}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles(theme => ({
  root: {
    '&:focus': {
      backgroundColor: theme.palette.primary.main,
      color: '#fff'
    },
    opacity: 0.6,
    minHeight: '36px'
  },
}))(MenuItem);

export default () => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [type, setType] = React.useState('')

  function handleClick(event: React.MouseEvent<HTMLElement>, val: string) {
    setAnchorEl(event.currentTarget);
    setType(val)
  }

  function handleClose() {
    setAnchorEl(null);
  }

  const platformOpen = Boolean(anchorEl) && type === 'platform'
  const typeOpen = Boolean(anchorEl) && type === 'type'
  const themeOpen = Boolean(anchorEl) && type === 'theme'
  const companyOpen = Boolean(anchorEl) && type === 'company'

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default" className={classes.appBar}>
        <Toolbar>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>

            <Button className={classes.button} aria-controls="fade-menu-1" aria-haspopup="true" color="primary" onClick={e => handleClick(e, 'type')}>
              类型
           </Button>
            <StyledMenu
              id="fade-menu-2"
              anchorEl={anchorEl}
              open={typeOpen}
              onClose={handleClose}
            >
              {['生存恐怖', '校园', '角色扮演游戏', '即时战略游戏', '免费游玩', '独立游戏', '战争', '文字冒险游戏', '桌面游戏', '动作冒险游戏', '音乐游戏', '家庭', '卡牌', '钓鱼', '休闲', '第三人称', '体育游戏', '解谜游戏', '模拟游戏', '第一人称', '动作游戏', '虚拟现实', '聚会', '射击游戏', '冒险游戏', '格斗游戏', '弹珠台', '回合制战略游戏', '点击游戏', '日式角色扮演游戏', '动作角色扮演游戏', '养成', '恋爱冒险', '平台游戏', '儿童', '大型多人在线', '文字', '多人', '竞速游戏', '街机', '实用工具', '战略游戏'].map(item => (
                <StyledMenuItem onClick={handleClose}>
                  <ListItemText classes={{ primary: classes.text }} primary={item} />
                </StyledMenuItem>
              ))}
            </StyledMenu>

            <Button className={classes.button} aria-controls="fade-menu-3" aria-haspopup="true" color="primary" onClick={e => handleClick(e, 'theme')}>
              题材
           </Button>
            <StyledMenu
              id="fade-menu-3"
              anchorEl={anchorEl}
              open={themeOpen}
              onClose={handleClose}
            >
              {['非虚构', '生存恐怖', '校园', '战争', '喜剧', '教育', '剧情', '科幻', '奇幻', '卡牌', '恋爱', '惊悚', '悬疑', '动作游戏', '生存', '恋爱冒险', '开放世界', '儿童', '历史', '类侠盗猎车手', '养成', '沙盒', '模拟经营'].map(item => (
                <StyledMenuItem onClick={handleClose}>
                  <ListItemText classes={{ primary: classes.text }} primary={item} />
                </StyledMenuItem>
              ))}
            </StyledMenu>

            <Button className={classes.button} aria-controls="fade-menu-4" aria-haspopup="true" color="primary" onClick={e => handleClick(e, 'company')}>
              模式
           </Button>
            <StyledMenu
              id="fade-menu-4"
              anchorEl={anchorEl}
              open={companyOpen}
              onClose={handleClose}
            >
              {['大型多人在线', '多人', '分屏', '网页游戏', '单人', '合作'].map(item => (
                <StyledMenuItem onClick={handleClose}>
                  <ListItemText classes={{ primary: classes.text }} primary={item} />
                </StyledMenuItem>
              ))}
            </StyledMenu>

          </div>
        </Toolbar>
      </AppBar>
    </div>
  )
}
