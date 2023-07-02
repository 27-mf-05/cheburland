/*
import { createContext, useContext, useEffect, useState } from 'react'

interface HeroProps {
  position: Position
}

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

export const startPosition: Position = {
  x: 0,
  y: 0,
}

const velocity: Velocity = {
  x: 5,
  y: 5,
}

export enum GAME_STATUS {
  IN_PROGRESS = 'in_progress',
  WON = 'won',
}

export type GameStatus = GAME_STATUS.IN_PROGRESS | GAME_STATUS.WON

const radius = 15

/!*const Hero = () => {

  const gameContext = {
    heroPosition: {
      x: 0,
      y: 0,
    },
    gameStatus: false,
  }

  //game - фабричный компонент, инициализирует и отрисовывает все элементы игры и содержит логику анимации. возвращает элемент канвас


  const heroContext = createContext(gameContext)

  const { heroPosition, gameStatus } = useContext(heroContext)

  const [position, setPosition] = useState(heroPosition)

  const handleKeyDown = (e: any) => {
    const arrows = [ARROW.LEFT, ARROW.UP, ARROW.RIGHT, ARROW.DOWN]

    if (arrows.indexOf(e.keyCode) >= 0) {
      move(e.keyCode)
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  useEffect(() => {
    draw(position)
  }, [position])

  const move = (keypressed: number) => {
    switch (keypressed) {
      case ARROW.UP:
        setPosition(DIRECTION.UP)
        break
      case ARROW.LEFT:
        setPosition(DIRECTION.LEFT)
        break
      case ARROW.RIGHT:
        setPosition(DIRECTION.RIGHT)
        break
      default:
        setPosition(DIRECTION.DOWN)
    }
  }

  const update = (position: Position) => {
    position.x += velocity.x
    position.y += velocity.y
    draw({ x: position.x, y: position.y })
  }

  const draw = (position: Position) => {
    context.beginPath()
    context.arc(position.x, position.y, radius, 0, Math.PI * 2)

    context.fillStyle = 'brown'
    context.fill()
    context.closePath()
  }

  const move = () => {
    requestAnimationFrame(move)
    if (gameStatus === GAME_STATUS.IN_PROGRESS) {
      if (keys.w.pressed && lastKey === 'w') {
        this.player.velocity.y = -5
      } else if (keys.a.pressed && lastKey === 'a') {
        this.player.velocity.x = -5
      } else if (keys.s.pressed && lastKey === 's') {
        this.player.velocity.y = 5
      } else if (keys.d.pressed && lastKey === 'd') {
        this.player.velocity.x = 5
      } else {
        this.player.velocity.x = 0
        this.player.velocity.y = 0
      }
    }
  }

  const playerCollidesWithWalls = ({ body, border }) => {
    if (
      body.position.x - body.radius - border.PADDING + body.velocity.x <= 0 ||
      body.position.y - body.radius - border.PADDING + body.velocity.y <= 0 ||
      body.position.x + border.PADDING + body.velocity.x >=
        border._canvas.width - body.radius ||
      body.position.y + border.PADDING + body.velocity.y >=
        border._canvas.height - body.radius
    ) {
      return true
    }

    const falseCells = border.getFalseCells()

    for (const cell of falseCells) {
      const cellX = border.PADDING + cell.x * border.CELL_SIZE
      const cellY = border.PADDING + cell.y * border.CELL_SIZE

      if (
        body.position.x + body.velocity.x >= cellX &&
        body.position.x + body.velocity.x <= cellX + border.CELL_SIZE &&
        body.position.y + body.velocity.y >= cellY &&
        body.position.y + body.velocity.y <= cellY + border.CELL_SIZE
      ) {
        return true
      }
    }

    return false
  }
}*!/

export default class Hero {
  public position: Record<string, number>
  public velocity: Record<string, number>
  public radius: number
  public canvas: HTMLCanvasElement
  public context: CanvasRenderingContext2D | null

  // @ts-ignore
  constructor(canvas: HTMLCanvasElement, { position, velocity }) {
    this.position = position
    this.velocity = velocity
    this.radius = 15
    this.canvas = canvas

    this.context = this.canvas.getContext('2d')

    if (!canvas || !this.context) {
      return
    }
  }

  draw() {
    this.context?.beginPath()
    this.context?.arc(
      this.position.x,
      this.position.y,
      this.radius,
      0,
      Math.PI * 2
    )

    this.context!.fillStyle = 'brown'
    this.context?.fill()
    this.context?.closePath()
  }

  /!*public playerCollidesWithWalls({ body, border }) {
    if (
      body.position.x - body.radius - border.PADDING + body.velocity.x <= 0 ||
      body.position.y - body.radius - border.PADDING + body.velocity.y <= 0 ||
      body.position.x + border.PADDING + body.velocity.x >=
      border._canvas.width - body.radius ||
      body.position.y + border.PADDING + body.velocity.y >=
      border._canvas.height - body.radius
    ) {
      return true;
    }

    const falseCells = border.getFalseCells();

    for (const cell of falseCells) {
      const cellX = border.PADDING + cell.x * border.CELL_SIZE;
      const cellY = border.PADDING + cell.y * border.CELL_SIZE;

      if (
        body.position.x + body.velocity.x >= cellX &&
        body.position.x + body.velocity.x <= cellX + border.CELL_SIZE &&
        body.position.y + body.velocity.y >= cellY &&
        body.position.y + body.velocity.y <= cellY + border.CELL_SIZE
      ) {
        return true;
      }
    }

    return false;
  }*!/

  /!*move() {
    requestAnimationFrame(move)
    if (gameStatus === GAME_STATUS.IN_PROGRESS) {
      if (keys.w.pressed && lastKey === 'w') {
        this.velocity.y = -5
      } else if (keys.a.pressed && lastKey === 'a') {
        this.velocity.x = -5
      } else if (keys.s.pressed && lastKey === 's') {
        this.velocity.y = 5
      } else if (keys.d.pressed && lastKey === 'd') {
        this.velocity.x = 5
      } else {
        this.velocity.x = 0
        this.velocity.y = 0
      }
    }
  }*!/

  update() {
    this.draw()
    this.position.x += this.velocity.x
    this.position.y += this.velocity.y
  }
}
*/
