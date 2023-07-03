import { useEffect, useRef } from 'react'

import HeroTest from '@/core/hero/HeroTest'
import Maze from '@/core/maze/Maze'
import Oranges from '@/core/oranges/Oranges'

export const GameTest = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  let maze: Maze | null = null
  let hero: HeroTest | null = null
  let oranges: Oranges | null = null

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas?.getContext('2d')

    if (!canvas || !context) {
      return
    }

    maze = new Maze(canvas, 13, 65, 10, 10)

    maze.generate().then(() => {
      const cellSize = maze!.cellSize
      hero = new HeroTest(canvas, maze!.getFalseCells(), cellSize)
      oranges = new Oranges(canvas, maze!.getTrueCells(), cellSize)

      oranges?.draw(true)
      animate()
    })
    return () => {
      cancelAnimationFrame(animationFrame)
    }
  }, [])

  let animationFrame: number

  const animate = () => {
    animationFrame = requestAnimationFrame(animate)
    maze?.drawMaze()
    hero?.update()
    if (oranges?.collapseWithFruit(hero!.position.x, hero!.position.y)) {
      oranges!.draw(true)
    }

    oranges?.draw(false)
  }

  return <canvas ref={canvasRef} width={300} height={300} />
}
