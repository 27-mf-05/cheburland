import { CommentModel, ReplyModel, TopicModel } from './models'

export const associations = () => {
  TopicModel.hasMany(CommentModel)
  CommentModel.belongsTo(TopicModel)

  TopicModel.hasMany(ReplyModel)
  ReplyModel.belongsTo(TopicModel)

  CommentModel.hasMany(ReplyModel)
  ReplyModel.belongsTo(CommentModel)
}
