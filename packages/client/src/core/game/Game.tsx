import { useEffect, useRef } from 'react'

import Hero from '@/core/hero/Hero'
import Maze from '@/core/maze/Maze'
import Oranges from '@/core/oranges/Oranges'

export const Game = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const mazeRef = useRef<Maze | null>(null)
  const heroRef = useRef<Hero | null>(null)
  const orangesRef = useRef<Oranges | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas?.getContext('2d')

    if (!canvas || !context) {
      return
    }

    const maze = new Maze(canvas, 13, 65, 10, 10)
    mazeRef.current = maze

    maze.generate().then(() => {
      const cellSize = mazeRef.current!.cellSize
      const hero = new Hero(
        canvas,
        mazeRef.current!.getFalseCells(),
        cellSize,
        mazeRef.current!.rows,
        mazeRef.current!.columns
      )
      heroRef.current = hero

      const oranges = new Oranges(
        canvas,
        mazeRef.current!.getTrueCells(),
        cellSize
      )
      orangesRef.current = oranges

      orangesRef.current?.draw(true)
      animate()
    })
    return () => {
      cancelAnimationFrame(animationFrame)
    }
  }, [])

  let animationFrame: number

  const animate = () => {
    animationFrame = requestAnimationFrame(animate)
    mazeRef.current?.drawMaze()
    heroRef.current?.update()
    if (
      orangesRef.current?.collapseWithFruit(
        heroRef.current!.position.x,
        heroRef.current!.position.y
      )
    ) {
      orangesRef.current!.draw(true)
    }

    orangesRef.current?.draw(false)
  }

  return <canvas ref={canvasRef} width={300} height={300} />
}
