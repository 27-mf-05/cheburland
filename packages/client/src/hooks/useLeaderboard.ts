import { useCallback } from 'react'

import {
  useAddUserToLeaderboardMutation,
  useAllLeaderboardQuery,
} from '@/app/redux/api'
import { LeaderboardData } from '@/shared'

export const useLeaderboard = (): {
  handleAddUserToLeaderboard: (data: LeaderboardData) => void
  handleGetAllLeaderboard: () => void
} => {
  const [addUserToLeaderboard] = useAddUserToLeaderboardMutation()
  const { refetch } = useAllLeaderboardQuery({
    ratingFieldName: 'scoreCheburland',
    cursor: 0,
    limit: 30,
  })

  const handleAddUserToLeaderboard = async (data: LeaderboardData) => {
    const { id, gameEndDate, scoreCheburland, userName, avatar } = data
    await addUserToLeaderboard({
      data: {
        id,
        gameEndDate,
        scoreCheburland,
        userName,
        avatar,
      },
      ratingFieldName: 'scoreCheburland',
      teamName: 'Cheburland',
    })
  }

  const handleGetAllLeaderboard = useCallback(async () => {
    const { data, isError } = await refetch()

    if (!isError && data?.length) {
      const result = data.map((item, i) => {
        const { id, userName, scoreCheburland, avatar } = item.data
        return {
          key: id,
          id,
          rank: i + 1,
          avatar,
          name: userName,
          score: scoreCheburland,
        }
      })
      return result
    }
  }, [refetch])

  return { handleAddUserToLeaderboard, handleGetAllLeaderboard }
}
