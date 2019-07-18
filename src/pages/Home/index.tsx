import React, { useEffect } from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import LayoutCenter from '@/components/LayoutCenter'
import logo from '@/assets/giligili_white.png'
import Search from '@/components/Search'
import State from '@/models/state'
import BotImg from '@/assets/bot_white.png'
import BackImg from '@/assets/background.jpg'
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    row: {
      display: 'flex',
      fontSize: '16px',
      border: 'rgb(223,225,227) solid 1px',
      width: '540px',
      height: '52px',
      borderRadius: '24px',
      alignItems: 'center',
      padding: '2px 4px',
    },
    column: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '-70px',
      height: '93.2vh',
      backgroundImage: `url(${BackImg})`,
      backgroundSize: 'cover'
    }
  })
)

export default () => {
  const classes = useStyles();
  useEffect(() => {
    State.changeTopSearchState(false)
  }, [])
  return (<div className={classes.column}>

    <div style={{ display: 'flex', flexDirection: 'column', marginTop: (document.body.clientHeight - 65) / 2 - 150, width: '100%', justifyContent: 'center', alignItems: 'center' }}>
      <img width="300px" src={logo} />
      <Search position={'home'} />
    </div>



    <div style={{ display: 'flex', justifyContent: 'center', width: '100%',marginBottom: '10px' }}><img width="300px" height="56px" src={BotImg} /></div>
  </div>)
}
