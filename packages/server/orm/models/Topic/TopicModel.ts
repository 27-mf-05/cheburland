import { Model } from 'sequelize'
import { DataType } from 'sequelize-typescript'

import { sequelize } from '../../sequelizeInit'
import { CommentModel } from '../Comment'
import { ReplyModel } from '../Reply'
export class TopicModel extends Model {
  public title!: string
  public replies_count?: number
  public message!: string
}
TopicModel.init(
  {
    title: {
      type: DataType.STRING,
      allowNull: false,
    },
    replies_count: {
      type: DataType.INTEGER,
    },
    message: {
      type: DataType.STRING,
      allowNull: false,
    },
  },
  { sequelize, modelName: 'topic' }
)

TopicModel.hasMany(CommentModel)
CommentModel.belongsTo(TopicModel)

TopicModel.hasMany(ReplyModel)
ReplyModel.belongsTo(TopicModel)
