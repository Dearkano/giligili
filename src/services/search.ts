import { GET } from '@/utils/fetch'

interface Params {
  type?: string
  theme?: string
  time?: string
  mode?: string
  word: string
  order: number | null
  page: number | null
}
export async function searchByWord(params: Params) {
  const { type, theme, time, mode, word, order, page } = params
  let query = ''
  if(word) query = `search/s?key=${word}`
  else query =  `search/games?`

  if (type) query += `&type=${type}`
  if (theme) query += `&theme=${theme}`
  if (time) query += `&year=${time}`
  if (mode) query += `&mode=${mode}`
  if (order) query += `&isOrdered=${order}`
  if (page) query += `&page=${page}`
  return await GET(query)
}

export async function searchGameById(id: string) {
  return await GET(`search/game?id=${id}`)
}
