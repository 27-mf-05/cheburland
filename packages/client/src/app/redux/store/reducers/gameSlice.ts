import { createSlice } from '@reduxjs/toolkit'

import { GameStatus } from '@/shared'

type GameState = {
  status: GameStatus
  score: number
}

const initialState: GameState = {
  status: GameStatus.Initial,
  score: 0,
}

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    startGame(state) {
      state.status = GameStatus.Started
      state.score = 0
    },
    finishGame(state) {
      state.status = GameStatus.Finished
    },
    increaseScore(state) {
      state.score += 1
    },
  },
})

const { actions, reducer: gameReducer } = gameSlice
export const { startGame, finishGame, increaseScore } = actions
export default gameReducer
