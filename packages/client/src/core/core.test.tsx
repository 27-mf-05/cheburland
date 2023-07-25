import React from 'react'

import { render } from '@testing-library/react'

import { Scene } from '@/core'

describe('Core tests', () => {
  it('should throw an error on incorrect value of props rowsAndColumns', () => {
    try {
      render(<Scene onIncreaseScore={() => 0} />)
    } catch (error: unknown) {
      expect(error).toBeDefined()
      expect((error as Error).message).toBe(
        'rowsAndColumns should be <17, >5 and odd'
      )
    }

    try {
      render(<Scene onIncreaseScore={() => 0} />)
    } catch (error: unknown) {
      expect(error).toBeDefined()
      expect((error as Error).message).toBe(
        'rowsAndColumns should be <17, >5 and odd'
      )
    }

    try {
      render(<Scene onIncreaseScore={() => 0} />)
    } catch (error: unknown) {
      expect(error).toBeDefined()
      expect((error as Error).message).toBe(
        'rowsAndColumns should be <17, >5 and odd'
      )
    }
  })
  it('should throw an error on incorrect value of props cellSize', () => {
    try {
      render(<Scene onIncreaseScore={() => 0} />)
    } catch (error: unknown) {
      expect(error).toBeDefined()
      expect((error as Error).message).toBe('cellSize should be <125, >10')
    }
    try {
      render(<Scene onIncreaseScore={() => 0} />)
    } catch (error: unknown) {
      expect(error).toBeDefined()
      expect((error as Error).message).toBe('cellSize should be <125, >10')
    }
  })
})
