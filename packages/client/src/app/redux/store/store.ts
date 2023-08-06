import { combineReducers, configureStore } from '@reduxjs/toolkit'

import { authApi, leaderboardApi, oAuthApi, userApi } from '@/app/redux/api'
import { errorToastMiddleware } from '@/app/redux/store/middlewares'
import { gameReducer, userReducer } from '@/app/redux/store/reducers'

const rootReducer = combineReducers({
  user: userReducer,
  game: gameReducer,
  [authApi.reducerPath]: authApi.reducer,
  [oAuthApi.reducerPath]: oAuthApi.reducer,
  [userApi.reducerPath]: userApi.reducer,
  [leaderboardApi.reducerPath]: leaderboardApi.reducer,
})

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware()
        .concat(authApi.middleware)
        .concat(oAuthApi.middleware)
        .concat(userApi.middleware)
        .concat(leaderboardApi.middleware)
        .concat(errorToastMiddleware),
  })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
