import React from 'react'

import { render } from '@testing-library/react'

import { Game } from '@/core'

describe('Core tests', () => {
  it('should throw an error on incorrect value of props rowsAndColumns', () => {
    try {
      render(<Game rowsAndColumns={17} />)
    } catch (error: unknown) {
      expect(error).toBeDefined()
      expect((error as Error).message).toBe(
        'rowsAndColumns should be <17, >5 and odd'
      )
    }

    try {
      render(<Game rowsAndColumns={3} />)
    } catch (error: unknown) {
      expect(error).toBeDefined()
      expect((error as Error).message).toBe(
        'rowsAndColumns should be <17, >5 and odd'
      )
    }

    try {
      render(<Game rowsAndColumns={10} />)
    } catch (error: unknown) {
      expect(error).toBeDefined()
      expect((error as Error).message).toBe(
        'rowsAndColumns should be <17, >5 and odd'
      )
    }
  })
  it('should throw an error on incorrect value of props cellSize', () => {
    try {
      render(<Game cellSize={9} />)
    } catch (error: unknown) {
      expect(error).toBeDefined()
      expect((error as Error).message).toBe('cellSize should be <125, >10')
    }
    try {
      render(<Game cellSize={126} />)
    } catch (error: unknown) {
      expect(error).toBeDefined()
      expect((error as Error).message).toBe('cellSize should be <125, >10')
    }
  })
})
