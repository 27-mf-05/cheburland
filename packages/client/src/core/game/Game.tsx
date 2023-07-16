import type { FC } from 'react'
import { useEffect, useRef } from 'react'

import { Hero, Maze, Oranges } from '@/core'

type GameProps = {
  onCollision: () => void
  rowsAndColumns: number
  cellSize: number
  erasers: number
  delay: number
}

export const Game: FC<GameProps> = ({ rowsAndColumns, cellSize, erasers, delay, onCollision }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const mazeRef = useRef<Maze | null>(null)
  const heroRef = useRef<Hero | null>(null)
  const orangesRef = useRef<Oranges | null>(null)

  if (rowsAndColumns >= 17 || rowsAndColumns <= 5 || rowsAndColumns % 2 == 0) {
    throw new Error('rowsAndColumns should be <17, >5 and odd')
  }

  if (cellSize >= 125 || cellSize <= 10) {
    throw new Error('cellSize should be <125, >10')
  }

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas?.getContext('2d')

    if (!canvas || !context) {
      return
    }

    const maze = new Maze(canvas, rowsAndColumns, cellSize, erasers, delay)
    mazeRef.current = maze

    maze.generate().then(() => {
      if (!mazeRef.current) {
        return
      }

      const cellSize = mazeRef.current.cellSize
      heroRef.current = new Hero(
        canvas,
        maze.getFalseCells(),
        cellSize,
        mazeRef.current.rows,
        mazeRef.current.columns
      )

      document.addEventListener('keydown', heroRef.current?.handleKeyDown)
      document.addEventListener('keyup', heroRef.current?.handleKeyUp)

      orangesRef.current = new Oranges(canvas, maze.getTrueCells(), cellSize)

      animate()
    })
    return () => {
      cancelAnimationFrame(animationFrame)
      if (!heroRef.current) {
        return
      }
      document.removeEventListener('keydown', heroRef.current.handleKeyDown)
      document.removeEventListener('keyup', heroRef.current.handleKeyUp)
    }
  }, [])

  let animationFrame: number

  const animate = () => {
    animationFrame = requestAnimationFrame(animate)
    mazeRef.current?.drawMaze()
    heroRef.current?.update()
    orangesRef.current?.draw(false)
    if (!heroRef.current) {
      return
    }

    if (
      orangesRef.current?.collapseWithFruit(
        heroRef.current.position.x,
        heroRef.current.position.y
      )
    ) {
      orangesRef.current.draw(true)
      onCollision()
    }

    if (!orangesRef.current) {
      return
    }

    orangesRef.current.draw(false)
  }

  return <canvas ref={canvasRef} width={300} height={300} />
}
