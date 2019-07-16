import { GET } from '@/utils/fetch'

interface Params {
  type?: string
  theme?: string
  time?: string
  mode?: string
  word: string
}
export async function searchByWord(params: Params) {
  const { type, theme, time, mode, word } = params
  let query = `search/s?key=${word}`
  if (type) query += `&type=${type}`
  if (theme) query += `&theme=${theme}`
  if (time) query += `&time=${time}`
  if (mode) query += `&mode=${mode}`
  return await GET(query)
}

export async function searchGameById(id: string) {
  return await GET(`search/game?id=${id}`)
}
