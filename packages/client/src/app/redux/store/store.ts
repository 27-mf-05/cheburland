import { useDispatch } from 'react-redux'

import { combineReducers, configureStore } from '@reduxjs/toolkit'

import {
  authApi,
  errorToastMiddleware,
  leaderboardApi,
  oAuthApi,
  userApi,
} from '@/app/redux'
import { User } from '@/shared'

import gameReducer from './reducers/gameSlice'
import userReducer from './reducers/userSlice'
import { UserState } from './reducers/userSlice'

interface IUserService {
  getCurrentUser(): Promise<User>
}

export interface StoreState {
  user: UserState
}

const rootReducer = combineReducers({
  user: userReducer,
  game: gameReducer,
  [authApi.reducerPath]: authApi.reducer,
  [oAuthApi.reducerPath]: oAuthApi.reducer,
  [userApi.reducerPath]: userApi.reducer,
  [leaderboardApi.reducerPath]: leaderboardApi.reducer,
})

export const createStore = (
  service: IUserService,
  initialState?: StoreState
) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState: initialState,
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware({
        thunk: {
          extraArgument: service,
        },
      })
        .concat(authApi.middleware)
        .concat(oAuthApi.middleware)
        .concat(userApi.middleware)
        .concat(leaderboardApi.middleware),
    // .concat(errorToastMiddleware),
  })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof createStore>
export type AppDispatch = AppStore['dispatch']
export const useAppDispatch: () => AppDispatch = useDispatch
