import { Sequelize } from 'sequelize'
import type { SequelizeOptions } from 'sequelize-typescript'

const { POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB, POSTGRES_PORT } =
  process.env

const sequelizeOptions: SequelizeOptions = {
  host: 'localhost',
  port: Number(POSTGRES_PORT),
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DB,
  dialect: 'postgres', // 'mysql', 'sqlite', 'mariadb', 'mssql'
}

export const sequelize = new Sequelize(sequelizeOptions)

export const dbConnect = async () => {
  try {
    await sequelize.authenticate()
    await sequelize.sync({ force: true })
    console.log('Connection has been established successfully.')
  } catch (e) {
    console.error('Unable to connect to the database:', e)
  }
}
