import { ModelAttributes } from 'sequelize'
import { DataType, Model } from 'sequelize-typescript'

export interface ITopic {
  title: string
}
export const TopicModel: ModelAttributes<Model, ITopic> = {
  title: {
    type: DataType.STRING,
    allowNull: false,
  },
}
