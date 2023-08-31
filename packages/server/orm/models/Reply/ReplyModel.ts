import { Model } from 'sequelize'
import { DataType } from 'sequelize-typescript'

import { sequelize } from '../../sequelizeInit'

export class ReplyModel extends Model {
  public comment_id!: number
  public author_name!: string
  public message!: string
}

ReplyModel.init(
  {
    author_name: {
      type: DataType.STRING,
      allowNull: false,
    },
    message: {
      type: DataType.STRING,
      allowNull: false,
    },
  },
  {
    indexes: [{ unique: false, fields: ['commentId'] }],
    sequelize,
    modelName: 'reply',
  }
)
