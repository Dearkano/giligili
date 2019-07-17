import React from 'react'
import { IData } from '@giligili'
import News from './item'
import blank from '@/assets/blank3.jpg'
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
      {data.news.length===0&&<img width="500px" style={{alignSelf: 'center', marginTop: '30px', marginBottom: '30px'}} src={blank} />}
    </div>
  )
}
