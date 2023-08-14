import { Sequelize, SequelizeOptions } from 'sequelize-typescript'

import { TopicModel } from '@/app/orm/models/Topic'

const sequelizeOptions: SequelizeOptions = {
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'postgres',
  dialect: 'postgres', // 'mysql', 'sqlite', 'mariadb', 'mssql'
}

export const sequelize = new Sequelize(sequelizeOptions)

export const Topic = sequelize.define('Topic', TopicModel, {})

export const dbConnect = async () => {
  try {
    await sequelize.authenticate()
    await sequelize.sync({ force: true })
    console.log('Connection has been established successfully.')
  } catch (e) {
    console.error('Unable to connect to the database:', e)
  }
}
