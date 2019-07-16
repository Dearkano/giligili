import React from 'react';
import { Theme, createStyles, makeStyles, useTheme } from '@material-ui/core/styles';
import { IData } from '@giligili'

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
        <div style={{ width: '100px', fontWeight: 'bolder' }}>首发日期</div>
        <div style={{ width: '100px'}}>{tgbusData.startDate}</div>
      </div>

      <div className={classes.item}>
        <div style={{ width: '100px', fontWeight: 'bolder' }}>开发商</div>
        <div style={{ width: '100px' }}>{tgbusData.issuer}</div>
      </div>

      <div className={classes.item}>
        <div style={{ width: '100px' , fontWeight: 'bolder'}}>游戏引擎</div>
        <div style={{ width: '100px' }}>{tgbusData.engine}</div>
      </div>

      <div className={classes.item}>
        <div style={{ width: '100px', fontWeight: 'bolder' }}>类别</div>
        <div style={{ width: '100px'}}>{tgbusData.type.map(item => <div>{item}</div>)}</div>
      </div>

      <div className={classes.item}>
        <div style={{ width: '100px', fontWeight: 'bolder' }}>主题</div>
        <div style={{ width: '100px' }}>{tgbusData.theme.map(item => <div>{item}</div>)}</div>
      </div>

      <div className={classes.item}>
        <div style={{ width: '100px', fontWeight: 'bolder' }}>游戏模式</div>
        <div style={{ width: '100px' }}>{tgbusData.mode.map(item => <div>{item}</div>)}</div>
      </div>

      <div className={classes.item}>
        <div style={{ width: '100px', fontWeight: 'bolder' }}>玩家视角</div>
        <div style={{ width: '100px'}}>{tgbusData.view.map(item => <div>{item}</div>)}</div>
      </div>
    </div>
  )
}
