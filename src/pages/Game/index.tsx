import React, { useState, useEffect } from 'react'
import { IData } from '@giligili'
import { makeStyles, Theme, createStyles, withStyles } from '@material-ui/core/styles';
import Header from './header'
import State from '@/models/state'
import Carousel from './carousel'
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import IconButton from '@material-ui/core/IconButton'
import Information from './infomation'
import { Typography } from '@material-ui/core';
import Icon1 from '@/assets/home.png'
import Icon2 from '@/assets/news.png'
import Icon3 from '@/assets/chart.png'
import News from './News'
import { searchGameById } from '@/services/search'
import Data from './Data'
import Paper from '@material-ui/core/Paper'

interface Props {
  id: string
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    row: {
      display: 'flex',
      alignItems: 'center',
      width: '100%',
      paddingLeft: '20px',
      marginTop: '50px'
    },
    root: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
    },
    column: {
      display: 'flex',
      flexDirection: 'column'
    },
    body: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      width: '1000px',
      paddingLeft: '30px',
      paddingRight: '30px',
      paddingBottom: '30px',
      marginTop: '30px',
      boxShadow: '0px 4px 20px 0px rgba(0,0,0,0.2), 0px 8px 8px 0px rgba(0,0,0,0.14), 0px 12px 4px -8px rgba(0,0,0,0.12)'
    }
  })
)

export default ({ id }: Props) => {
  useEffect(() => {
    State.changeTopSearchState(true)
    search()
  }, [])
  const classes = useStyles()
  const [data, setData] = useState<IData | null>(null)
  const search = async () => {
    const res = await searchGameById(id)
    res.map((r: any) => {
      setData(r.data)
    })
  }

  const [value, setValue] = React.useState(0)
  const handleChange = (e: any, val: number) => setValue(val)
  if (!data) return null
  const { tgbusData } = data
  return (
    <div className={classes.root}>
      <Paper className={classes.body}>
        <Header item={data} />

        <div className={classes.row}>
          <Tabs value={value} onChange={handleChange}>
            <Tab label="概览" icon={<IconButton><img style={{ width: '20px' }} src={Icon1} /></IconButton>} />
            <Tab label="资讯" icon={<IconButton><img style={{ width: '20px' }} src={Icon2} /></IconButton>} />
            <Tab label="数据分析" icon={<IconButton><img style={{ width: '20px' }} src={Icon3} /></IconButton>} />
          </Tabs>
        </div>

        {value === 0 && <>
          <div className={classes.row}>
            <Carousel imgUrl={tgbusData.imgUrl} />
            <Information data={data} />
          </div>
          <div style={{ paddingLeft: '30px', paddingTop: '20px' }} className={classes.row}>
            <Typography variant="h5" color="primary">游戏简介</Typography>
          </div>
          <div style={{ paddingLeft: '30px', paddingTop: '20px' }}>
            <Typography variant="body2" style={{ lineHeight: '25px', textIndent: '28px', opacity: 0.8 }}>
              {tgbusData.description}
            </Typography>
          </div>
        </>
        }
        {
          value === 1 && <News data={data} />
        }
        {
          value === 2 && <>
            <Data data={data} />
          </>
        }
      </Paper>
    </div>
  )
}
