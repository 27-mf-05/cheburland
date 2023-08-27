import comments from '@/pages/forum-topic/data.json'
import { ReactionAddToComment } from '@/shared'

export const useReaction = (): {
  handleAddReactionToComment: (
    data: ReactionAddToComment
  ) => Record<string, Array<number>> | undefined
  handleGetReactionToComment: (data: {
    commentId: number
  }) => Record<string, Array<number>> | undefined
} => {
  const handleAddReactionToComment = (data: ReactionAddToComment) => {
    const { commentId, emojiName, userId } = data
    const currentComment = comments.find(comment => comment.id === commentId)
    const commentReactions: Record<
      string,
      Array<number>
    > = currentComment?.reactions || {}
    const currentReaction = commentReactions[emojiName] || []
    const isUserLeaveReaction = currentReaction.includes(userId)

    if (isUserLeaveReaction) {
      const usersPostedReaction = commentReactions[emojiName].filter(
        (id: number) => id !== userId
      )

      if (!usersPostedReaction.length) {
        delete commentReactions[emojiName]
      } else {
        commentReactions[emojiName] = usersPostedReaction
      }
    } else {
      currentReaction.push(userId)
      commentReactions[emojiName] = currentReaction
    }

    return commentReactions
  }

  const handleGetReactionToComment = (data: { commentId: number }) => {
    const { commentId } = data
    return comments.find(comment => comment.id === commentId)?.reactions
  }

  return {
    handleAddReactionToComment,
    handleGetReactionToComment,
  }
}
