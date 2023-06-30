export type Leader = {
  rank: number
  avatar: string | null
  name: string
  score: number
}

export type SortConfig = {
  column: string | null
  direction: 'asc' | 'desc'
}
