import { combineReducers, configureStore } from '@reduxjs/toolkit'

import {
  authApi,
  errorToastMiddleware,
  leaderboardApi,
  oAuthApi,
  userApi,
} from '@/app/redux'

import gameReducer from './reducers/gameSlice'
import userReducer from './reducers/userSlice'

const rootReducer = combineReducers({
  user: userReducer,
  game: gameReducer,
  [authApi.reducerPath]: authApi.reducer,
  [oAuthApi.reducerPath]: oAuthApi.reducer,
  [userApi.reducerPath]: userApi.reducer,
  [leaderboardApi.reducerPath]: leaderboardApi.reducer,
})

const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware()
        .concat(authApi.middleware)
        .concat(oAuthApi.middleware)
        .concat(userApi.middleware)
        .concat(leaderboardApi.middleware),
    // .concat(errorToastMiddleware),
  })
}

export const store = setupStore()

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
