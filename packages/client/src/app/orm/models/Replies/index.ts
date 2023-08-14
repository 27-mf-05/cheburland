import { ModelAttributes } from 'sequelize'
import { DataType, Model } from 'sequelize-typescript'

export interface IComment {
  body: string
  date: string
}
export const CommentModel: ModelAttributes<Model, IComment> = {
  body: {
    type: DataType.STRING,
    allowNull: false,
  },
  date: {
    type: DataType.DATE,
  },
}
