import { CommentModel, TopicModel } from './models'

TopicModel.hasMany(CommentModel)
TopicModel.belongsTo(CommentModel, {
  as: 'Current',
  foreignKey: 'commentID',
  constraints: false,
})

// CommentModel.hasOne(TopicModel)
// CommentModel.hasMany(ReplyModel)
// CommentModel.belongsTo(TopicModel, {
//   as: 'TopicID',
//   foreignKey: 'id'
// })
//
// ReplyModel.hasOne(CommentModel)
