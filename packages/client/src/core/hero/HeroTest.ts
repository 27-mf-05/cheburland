/*
import { useEffect, useState } from 'react'

export enum DIRECTION {
  LEFT = 'left',
  RIGHT = 'right',
  UP = 'up',
  DOWN = 'down',
}

export enum ARROW {
  LEFT = 37,
  RIGHT = 39,
  UP = 38,
  DOWN = 40,
}

export type Position = {
  x: number
  y: number
}

export type Velocity = {
  x: number
  y: number
}

export const HeroTest = (canvas: HTMLCanvasElement) => {
  const context = canvas.getContext('2d')
  if (!context) {
    return
  }
  const velocity = {
    x: 5,
    y: 5,
  }

  const handleKeyDown = (e: any) => {
    const arrows = [ARROW.LEFT, ARROW.UP, ARROW.RIGHT, ARROW.DOWN]

    if (arrows.indexOf(e.keyCode) >= 0) {
      accelerate(e.keyCode)
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  const [position, setPosition] = useState({
    x: 0,
    y: 0,
  })

  const accelerate = (keypressed: number) => {
    switch (keypressed) {
      case ARROW.UP:
        setPosition({ x: position.x + velocity.x, y: position.y - 1 })
        break
      case ARROW.LEFT:
        setPosition({ x: position.x + 1, y: position.y - 1 })
        break
      case ARROW.RIGHT:
        setPosition({ x: position.x + 1, y: position.y - 1 })
        break
      default:
        setPosition({ x: position.x + 1, y: position.y - 1 })
    }
  }

  useEffect(() => {
    draw(position)
  }, [position])

  const draw = (position: Position) => {
    context.beginPath()
    context.arc(position.x, position.y, 15, 0, Math.PI * 2)
    context.fillStyle = 'brown'
    context.fill()
    context.closePath()
  }

  const update = (position: Position) => {
    position.x += velocity.x
    position.y += velocity.y
    draw({ x: position.x, y: position.y })
  }

  const move = () => {
    requestAnimationFrame(move)
    update({ x: position.x, y: position.y })
  }

  move()
}
*/
