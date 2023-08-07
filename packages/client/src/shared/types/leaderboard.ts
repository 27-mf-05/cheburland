export interface LeaderData {
  data: LeaderboardData
  ratingFieldName: string
  teamName: string
}

export interface AllLeaderboardData {
  ratingFieldName: string
  cursor: number
  limit: number
}

export interface LeaderboardData {
  id: number | undefined
  gameEndDate: number
  scoreCheburland: number
  userName: string
  avatar: string | undefined
}

export type Leader = {
  key: number | undefined
  id: number | undefined
  rank: number
  avatar: string | undefined
  name: string
  score: number
}
