export type Comment = {
  id: number
  user: string
  text: string
  time: string
  reactions?: Reaction
}

export type Reaction = {
  like?: Array<number>
  dislike?: Array<number>
  smile?: Array<number>
  sad?: Array<number>
  holiday?: Array<number>
  heart?: Array<number>
  rocket?: Array<number>
  eyes?: Array<number>
}

export type ReactionAddToComment = {
  commentId: number
  emojiName: string
  userId: number
}
