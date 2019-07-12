import { GET } from '@/utils/fetch'

export async function searchByWord(word: string) {
  return await GET(`search?word=${word}`)
}
