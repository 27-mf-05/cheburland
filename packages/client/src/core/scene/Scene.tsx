import type { FC } from 'react'
import { memo, useCallback, useEffect, useRef } from 'react'

import { Hero, Maze, Oranges } from '@/core'
import { particle, renderParticleAnimation } from '@/core/lib'
import { CELL_SIZE, ERASERS, ROWS_AND_COLUMNS } from '@/shared'

type GameProps = {
  onIncreaseScore: () => void
}

type Particle = {
  x: number
  y: number
  radius: number
  color: string
  rotation: number
  speed: number
  friction: number
  opacity: number
  yVel: number
  gravity: number
}

export const Scene: FC<GameProps> = memo(({ onIncreaseScore }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mazeRef = useRef<Maze | null>(null)
  const heroRef = useRef<Hero | null>(null)
  const orangesRef = useRef<Oranges | null>(null)
  const isShowAnimation = useRef(false)
  const particles = useRef<Particle[]>([])
  let animationFrameId: number

  if (
    ROWS_AND_COLUMNS >= 17 ||
    ROWS_AND_COLUMNS <= 5 ||
    ROWS_AND_COLUMNS % 2 == 0
  ) {
    throw new Error('ROWS_AND_COLUMNS should be <17, >5 and odd')
  }

  if (CELL_SIZE >= 125 || CELL_SIZE <= 10) {
    throw new Error('CELL_SIZE should be <125, >10')
  }

  const init = useCallback(() => {
    const canvas = canvasRef.current
    let context
    if (canvas) canvas.getContext('2d')

    if (!canvas || !context) {
      return
    }

    const maze = new Maze(canvas, ROWS_AND_COLUMNS, CELL_SIZE, ERASERS)
    mazeRef.current = maze

    maze.generate()
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
  }, [])

  const animate = useCallback(() => {
    mazeRef.current?.drawMaze()
    heroRef.current?.update()
    orangesRef.current?.draw(false)
    const canvas = canvasRef.current
    let context
    if (canvas) context = canvas.getContext('2d')
    if (!heroRef.current || !canvas || !context) {
      return
    }

    renderParticleAnimation(context, isShowAnimation, particles.current)

    if (
      orangesRef.current?.collapseWithFruit(
        heroRef.current.position.x,
        heroRef.current.position.y
      )
    ) {
      orangesRef.current.draw(true)
      onIncreaseScore()

      const particlesData: Particle[] = []
      for (let i = 0; i < 25; i++) {
        particlesData.push(
          particle(heroRef.current.position.x, heroRef.current.position.y)
        )
      }
      particles.current = particlesData

      isShowAnimation.current = true
    }

    if (!orangesRef.current) {
      return
    }

    orangesRef.current.draw(false)
    requestAnimationFrame(animate)
  }, [onIncreaseScore])

  useEffect(() => {
    init()
    animationFrameId = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(animationFrameId)
      if (!heroRef.current) {
        return
      }
      document.removeEventListener('keydown', heroRef.current.handleKeyDown)
      document.removeEventListener('keyup', heroRef.current.handleKeyUp)
    }
  }, [animate, init, onIncreaseScore])

  return <canvas ref={canvasRef} width={300} height={300} />
})
