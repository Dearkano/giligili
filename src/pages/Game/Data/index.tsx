import React from 'react'
import { IData } from '@giligili'
import { makeStyles, Theme, createStyles, withStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import {
  G2,
  Chart,
  Geom,
  Axis,
  Tooltip,
  Coord,
  Label,
  Legend,
  View,
  Guide,
  Shape,
  Facet,
  Util
} from "bizcharts";
import DataSet from "@antv/data-set";
import { searchGameById } from '@/services/search'
import { Typography, Paper } from '@material-ui/core';
import Table from './table'


interface IChartData {
  [key: string]: any
}

interface Props {
  data: IData
}


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    row: {
      display: 'flex',
      alignItems: 'center',
      width: '100%',
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
      flexDirection: 'column',
      width: '100%'
    },
    body: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      width: '1000px'
    },
    fab: {
      width: '120px',
      height: '120px',
      fontSize: '20px',
      marginBottom: '10px'
    },
    table: {
      maxHeight: '300px'
    },
  })
)

export default ({ data }: Props) => {
  const { DataView } = DataSet;
  const classes = useStyles()
  const { baiduData } = data
  const chartData: IChartData[] = [
    {
      name: '电脑端'
    },
    {
      name: '移动端'
    }
  ]
  React.useEffect(() => {
    draw()
  }, [])
  const fields: string[] = []
  const [pieDataDvs, setPieDataDvs] = React.useState<Array<any>>([])
  const makeData = () => {
    const pdvs = []
    if (JSON.stringify(data.baiduData) !== '{}') {
      chartData[0][data.tgbusData.name] = data.baiduData.pc.avg
      chartData[1][data.tgbusData.name] = data.baiduData.wise.avg
      fields.push(data.tgbusData.name)
      const pieData = [{ item: '男', count: Number(data.baiduData.sex.M), name: data.tgbusData.name }, { item: '女', count: Number(data.baiduData.sex.F), name: data.tgbusData.name }]
      const dv = new DataView();
      dv.source(pieData).transform({
        type: "percent",
        field: "count",
        dimension: "item",
        as: "percent"
      });
      pdvs.push(dv)
    }
    for (const item of data.competitors) {
      if (pdvs.length > 5) { break }
      if (JSON.stringify(item.baiduIndex) !== '{}' && item.baiduIndex.pc) {
        fields.push(item.name)
        chartData[0][item.name] = item.baiduIndex.pc.avg
        chartData[1][item.name] = item.baiduIndex.wise.avg

        const pieData = [{ item: '男', count: Number(item.baiduIndex.sex.M), name: item.name }, { item: '女', count: Number(item.baiduIndex.sex.F), name: item.name }]
        const dv = new DataView();
        dv.source(pieData).transform({
          type: "percent",
          field: "count",
          dimension: "item",
          as: "percent"
        });
        pdvs.push(dv)
      }
    }
    setPieDataDvs(pdvs)

  }

  const cols = {
    percent: {
      formatter: (val: number) => {
        const v = val * 100 + "%";
        return v;
      }
    }
  };
  const draw = async () => {
    makeData()
    const ds = new DataSet();
    const d = ds.createView().source(chartData);
    d.transform({
      type: "fold",
      fields: fields,
      // 展开字段集
      key: "月份",
      // key字段
      value: "月均降雨量" // value字段
    });
    setDv(d)
  }

  const [dv, setDv] = React.useState(null)
  const scale = {

  };
  const rows: Array<any> = []
  data.trend.map(item => {
    rows.push({
      name: item.name,
      avg: item.avg,
      qoq: item.qoq,
      yoy: item.yoy
    })
  })

  return (<div className={classes.column}>
    {dv && JSON.stringify(baiduData) !== '{}' && <div className={classes.row} style={{ marginTop: '20px' }}>

      <div className={classes.column} style={{ width: '70%', height: '900px' }}>

        <Paper style={{ height: 300, width: '500px', marginBottom: '20px' }}>
          <div style={{ paddingLeft: '30px', paddingTop: '20px' }} className={classes.row}>
            <Typography style={{ fontWeight: 'bolder' }} variant="h5" color="primary">热度分析</Typography>
          </div>
          <div className={classes.row} style={{ justifyContent: 'center', marginTop: '50px' }}>
            <div className={classes.column} style={{ width: '120px', marginRight: '20px' }}>
              <Fab className={classes.fab} color="primary">
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <Typography>总体热度</Typography>
                  <Typography>{baiduData.all.avg}</Typography>
                </div>
              </Fab>
              <Typography align="center">同比: {baiduData.all.yoy}%</Typography>
              <Typography align="center">环比: {baiduData.all.qoq}%</Typography>
            </div>
            <div className={classes.column} style={{ width: '120px', marginRight: '20px' }}>
              <Fab className={classes.fab} color="primary">
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <Typography>移动端</Typography>
                  <Typography>{baiduData.wise.avg}</Typography>
                </div>
              </Fab>
              <Typography align="center">同比: {baiduData.wise.yoy}%</Typography>
              <Typography align="center">环比: {baiduData.wise.qoq}%</Typography>
            </div>
            <div className={classes.column} style={{ width: '120px', marginRight: '20px' }}>
              <Fab className={classes.fab} color="primary">
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <Typography>电脑端</Typography>
                  <Typography>{baiduData.pc.avg}</Typography>
                </div>
              </Fab>
              <Typography align="center">同比: {baiduData.pc.yoy}%</Typography>
              <Typography align="center">环比: {baiduData.pc.qoq}%</Typography>
            </div>
          </div>
        </Paper>
        <Paper style={{ height: 400, width: '500px' }}>
          <div style={{ paddingLeft: '30px', paddingTop: '20px' }} className={classes.row}>
            <Typography style={{ fontWeight: 'bolder' }} variant="h5" color="primary">竞品数据</Typography>
          </div>
          <Chart height={350} width={500} data={dv} forceFit scale={scale}>
            <Legend />
            <Axis name="月份" />
            <Axis name="月均降雨量" />
            <Tooltip />
            <Geom
              type="intervalStack"
              position="月份*月均降雨量"
              color={["name", name => {
                return name === '电脑端' ? '#ff81a7' : '#47bafd'
              }]}
              style={{
                stroke: "#fff",
                lineWidth: 1
              }}
            />
          </Chart>
        </Paper>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', height: '900px' }}>
        <Paper style={{ height: 300, width: '100%', marginBottom: '20px' }}>
          <div style={{ paddingLeft: '30px', paddingTop: '20px' }} className={classes.row}>
            <Typography style={{ fontWeight: 'bolder' }} variant="h5" color="primary">类型分析</Typography>
          </div>
          <Paper style={{ height: 250, width: '100%', marginBottom: '20px', boxShadow: 'none' }}>
            <Table
              rowCount={rows.length}
              rowGetter={({ index }) => rows[index]}
              columns={[
                {
                  width: 200,
                  label: '类型',
                  dataKey: 'name',
                },
                {
                  width: 200,
                  label: '平均热度',
                  dataKey: 'avg',
                },
                {
                  width: 200,
                  label: '环比',
                  dataKey: 'qoq',
                },
                {
                  width: 200,
                  label: '同比',
                  dataKey: 'yoy',
                },
              ]}
            />

          </Paper>
        </Paper>
        <Paper style={{ height: 400, width: '400px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%' }}>
            <div style={{ paddingLeft: '30px', paddingTop: '20px' }} className={classes.row}>
              <Typography style={{ fontWeight: 'bolder' }} variant="h5" color="primary">性别比例</Typography>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', height: '100%' }}>
              {pieDataDvs.map((d: any, index: number) => <Chart
                key={index}
                height={120}
                width={120}
                data={d}
                scale={cols}
                padding={[0, 0, 0, 0]}
                forceFit
              >
                <Coord type="theta" radius={0.75} />
                <Axis name="percent" />
                <Legend
                  position="right"
                  offsetY={-window.innerHeight / 2 + 120}
                  offsetX={-100}
                />
                <Tooltip
                  showTitle={false}
                  itemTpl="<li><span style=&quot;background-color:{color};&quot; class=&quot;g2-tooltip-marker&quot;></span>{name}: {value}</li>"
                />
                <Geom
                  type="intervalStack"
                  position="percent"
                  color={['item', item => {
                    return item === '男' ? '#ff81a7' : '#47bafd'
                  }]}
                  tooltip={[
                    "item*percent",
                    (item, percent) => {
                      percent = percent * 100 + "%";
                      return {
                        name: item,
                        value: percent
                      };
                    }
                  ]}
                  style={{
                    lineWidth: 1,
                    stroke: "#fff"
                  }}
                >
                  <Typography style={{ width: '100%', textAlign: 'center' }}>{d.origin[0].name}</Typography>
                </Geom>
              </Chart>)}</div>
          </div>
        </Paper>
      </div>

    </div>}
    <img height="500px" src={data.wordcloud} />
  </div>)
}
