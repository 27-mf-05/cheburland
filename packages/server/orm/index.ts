import * as associations from './associations'
import { dbConnect } from './sequelizeInit'

export const startApp = () => {
  associations
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  dbConnect().then(async () => {})
}
