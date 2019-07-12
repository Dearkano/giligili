import React from 'react'
import Card from './card'
import {IMiniData} from '@giligili'

interface Props {
  list: Array<IMiniData>
}
export default ({ list }: Props) => {
  return <>{list.map(item => <Card item={item} />)}</>
}
