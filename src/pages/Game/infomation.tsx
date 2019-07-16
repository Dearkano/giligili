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
        <div>{tgbusData.startDate}</div>
      </div>

      <div className={classes.item}>
        <div style={{ width: '100px', fontWeight: 'bolder' }}>开发商</div>
        <div>{tgbusData.issuer}</div>
      </div>

      <div className={classes.item}>
        <div style={{ width: '100px' , fontWeight: 'bolder'}}>游戏引擎</div>
        <div>{tgbusData.engine}</div>
      </div>

      <div className={classes.item}>
        <div style={{ width: '100px', fontWeight: 'bolder' }}>类别</div>
        <div>{tgbusData.type.map(item => <div>{item}</div>)}</div>
      </div>

      <div className={classes.item}>
        <div style={{ width: '100px', fontWeight: 'bolder' }}>主题</div>
        <div>{tgbusData.theme.map(item => <div>{item}</div>)}</div>
      </div>

      <div className={classes.item}>
        <div style={{ width: '100px', fontWeight: 'bolder' }}>游戏模式</div>
        <div>{tgbusData.mode.map(item => <div>{item}</div>)}</div>
      </div>

      <div className={classes.item}>
        <div style={{ width: '100px', fontWeight: 'bolder' }}>玩家视角</div>
        <div>{tgbusData.view.map(item => <div>{item}</div>)}</div>
      </div>
    </div>
  )
}
