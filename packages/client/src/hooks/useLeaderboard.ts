import {
  useAddUserToLeaderboardMutation,
  useAllLeaderboardMutation,
} from '@/app/redux/api'
import { LeaderData } from '@/shared'

export const useLeaderboard = (): {
  handleAddUserToLeaderboard: (
    gameEndDate: number,
    score: number,
    userName: string
  ) => void
  handleGetAllLeaderboard: () => void
} => {
  const [addUserToLeaderboard] = useAddUserToLeaderboardMutation()
  const [allLeaderboard] = useAllLeaderboardMutation()

  const handleAddUserToLeaderboard = async (
    gameEndDate: number,
    score: number,
    userName: string
  ) => {
    console.log(gameEndDate, score, userName, 'userName')
    await addUserToLeaderboard({
      data: {
        gameEndDate,
        scoreCheburland: score,
        userName,
      },
      ratingFieldName: 'scoreCheburland',
      teamName: 'Cheburland',
    })
  }

  const handleGetAllLeaderboard = async () => {
    return await allLeaderboard({
      ratingFieldName: 'scoreCheburland',
      cursor: 0,
      limit: 10,
    })
  }

  return { handleAddUserToLeaderboard, handleGetAllLeaderboard }
}
