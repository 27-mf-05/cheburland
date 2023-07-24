import React from 'react'

import { render } from '@testing-library/react'

import { Scene } from '@/core'

describe('Core tests', () => {
  it('should throw an error on incorrect value of props rowsAndColumns', () => {
    try {
      render(
        <Scene
          onCollision={() => 0}
          rowsAndColumns={17}
          cellSize={56}
          erasers={10}
        />
      )
    } catch (error: unknown) {
      expect(error).toBeDefined()
      expect((error as Error).message).toBe(
        'rowsAndColumns should be <17, >5 and odd'
      )
    }

    try {
      render(
        <Scene
          onCollision={() => 0}
          rowsAndColumns={3}
          cellSize={56}
          erasers={10}
        />
      )
    } catch (error: unknown) {
      expect(error).toBeDefined()
      expect((error as Error).message).toBe(
        'rowsAndColumns should be <17, >5 and odd'
      )
    }

    try {
      render(
        <Scene
          onCollision={() => 0}
          rowsAndColumns={10}
          cellSize={56}
          erasers={10}
        />
      )
    } catch (error: unknown) {
      expect(error).toBeDefined()
      expect((error as Error).message).toBe(
        'rowsAndColumns should be <17, >5 and odd'
      )
    }
  })
  it('should throw an error on incorrect value of props cellSize', () => {
    try {
      render(
        <Scene
          onCollision={() => 0}
          rowsAndColumns={15}
          cellSize={9}
          erasers={10}
        />
      )
    } catch (error: unknown) {
      expect(error).toBeDefined()
      expect((error as Error).message).toBe('cellSize should be <125, >10')
    }
    try {
      render(
        <Scene
          onCollision={() => 0}
          rowsAndColumns={15}
          cellSize={126}
          erasers={10}
        />
      )
    } catch (error: unknown) {
      expect(error).toBeDefined()
      expect((error as Error).message).toBe('cellSize should be <125, >10')
    }
  })
})
