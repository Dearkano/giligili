import React from 'react';
import { Theme, createStyles, makeStyles, useTheme } from '@material-ui/core/styles';
import { IData } from '@giligili'
import Typography from '@material-ui/core/Typography'

interface Props {
  data: IData
}
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    item: {
      display: 'flex',
      marginBottom: '15px',
      fontSize: '14px'
    },
    column: {
      display: 'flex',
      flexDirection: 'column',
    }
  })
)

export default ({ data }: Props) => {
  const { tgbusData } = data
  const classes = useStyles()
  return (
    <div style={{ marginLeft: '30px', height: '450px', paddingTop: '30px' }} className={classes.column}>
      <div className={classes.item}>
        <Typography variant="body2" style={{ width: '100px', fontWeight: 'bolder' }}>首发日期</Typography>
        <Typography variant="body2" style={{ width: '100px', opacity: 0.54}}>{tgbusData.startDate}</Typography>
      </div>

      <div className={classes.item}>
        <Typography variant="body2" style={{ width: '100px', fontWeight: 'bolder' }}>开发商</Typography>
        <Typography variant="body2" style={{ width: '100px', opacity: 0.54 }}>{tgbusData.issuer}</Typography>
      </div>

      <div className={classes.item}>
        <Typography variant="body2" style={{ width: '100px' , fontWeight: 'bolder'}}>游戏引擎</Typography>
        <Typography variant="body2" style={{ width: '100px', opacity: 0.54 }}>{tgbusData.engine}</Typography>
      </div>

      <div className={classes.item}>
        <Typography variant="body2" style={{ width: '100px', fontWeight: 'bolder' }}>类别</Typography>
        <div style={{ width: '100px'}}>{tgbusData.type.map(item => <Typography style={{opacity: 0.54}}  variant="body2">{item}</Typography>)}</div>
      </div>

      <div className={classes.item}>
        <Typography variant="body2" style={{ width: '100px', fontWeight: 'bolder' }}>主题</Typography>
        <div style={{ width: '100px' }}>{tgbusData.theme.map(item => <Typography style={{opacity: 0.54}}  variant="body2">{item}</Typography>)}</div>
      </div>

      <div className={classes.item}>
        <Typography variant="body2" style={{ width: '100px', fontWeight: 'bolder' }}>游戏模式</Typography>
        <div style={{ width: '100px' }}>{tgbusData.mode.map(item => <Typography style={{opacity: 0.54}}  variant="body2">{item}</Typography>)}</div>
      </div>

      <div className={classes.item}>
        <Typography variant="body2" style={{ width: '100px', fontWeight: 'bolder' }}>玩家视角</Typography>
        <div style={{ width: '100px'}}>{tgbusData.view.map(item => <Typography style={{opacity: 0.54}}  variant="body2">{item}</Typography>)}</div>
      </div>
    </div>
  )
}
