import { assotiations } from './associations'
import { dbConnect } from './sequelizeInit'

export const startApp = () => {
  assotiations()
  dbConnect()
}
