import { combineReducers, configureStore } from '@reduxjs/toolkit'

import { gameReducer, userReducer } from '@/app/redux/store/reducers'

const rootReducer = combineReducers({
  user: userReducer,
  game: gameReducer,
})

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
