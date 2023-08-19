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

export const createStore = () => {
  let state

  if (typeof window !== 'undefined') {
    state = window.__PRELOADED_STATE__
    delete window.__PRELOADED_STATE__
  }

  return configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware()
        .concat(authApi.middleware)
        .concat(oAuthApi.middleware)
        .concat(userApi.middleware)
        .concat(leaderboardApi.middleware),
    // .concat(errorToastMiddleware),
    preloadedState: state,
  })
}

export type RootState = ReturnType<typeof createStore>['getState']
export type AppStore = ReturnType<typeof createStore>
export type AppDispatch = AppStore['dispatch']
