import React, { useEffect } from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import LayoutCenter from '@/components/LayoutCenter'
import logo from '@/assets/logo.png'
import Search from '@/components/Search'
import State from '@/models/state'

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
      padding: '2px 4px'
    },
    column: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      paddingBottom: '200px'
    }
  })
)

export default () => {
  const classes = useStyles();
  useEffect(()=>{
    State.changeTopSearchState(false)
  }, [])
  return <LayoutCenter>
    <div className={classes.column}>

      <div>
        <img width="300px" src={logo} />
      </div>

      <Search />
    </div>
  </LayoutCenter>
}
