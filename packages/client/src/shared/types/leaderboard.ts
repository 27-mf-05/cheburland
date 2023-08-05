export interface LeaderData {
  data: {
    gameEndDate: number
    scoreCheburland: number
    userName: string
  }
  ratingFieldName: string
  teamName: string
}

export interface AllLeaderboardData {
  ratingFieldName: string
  cursor: number
  limit: number
}
