import { Model } from 'sequelize'
import { DataType } from 'sequelize-typescript'

import { sequelize } from '../../init'

export class CommentModel extends Model {
  public author_name!: string
  public message!: string
}

CommentModel.init(
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
  { sequelize, modelName: 'comment' }
)
