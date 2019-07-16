import React from 'react'
import { IData } from '@giligili'
import News from './item'
interface Props {
  data: IData
}
export default ({ data }: Props) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '10px', marginRight: '10px',width:'100%' }}>
      {data.news.map((item, index) => {
        item.coverUrl = data.tgbusData.imgUrl[Math.round(index % (data.tgbusData.imgUrl.length / 2))]
        return <News item={item} />
      })}
    </div>
  )
}
