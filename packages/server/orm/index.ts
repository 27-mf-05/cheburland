import { associations } from './associations'
import { dbConnect } from './sequelizeInit'

export const startApp = () => {
  associations()
  dbConnect()
}
