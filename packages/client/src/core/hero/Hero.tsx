import { Sprite } from '@/core'
import { keys } from '@/shared'

import heroSprite from './heroSprite.svg'

type Position = {
  x: number
  y: number
}

type Velocity = {
  x: number
  y: number
}

export class Hero {
  private readonly _context: CanvasRenderingContext2D | null
  private _velocity: Velocity
  private _speed = 2
  public position: Position
  private _lastKey: string | undefined
  private _canvas: HTMLCanvasElement
  private readonly _falseCells: { x: number; y: number }[]
  private readonly _cellSize: number
  private readonly _sprite: Sprite

  constructor(
    canvas: HTMLCanvasElement,
    falseCells: { x: number; y: number }[],
    cellSize: number,
    rows: number,
    columns: number
  ) {
    this._canvas = canvas
    this._cellSize = cellSize
    this._falseCells = falseCells
    this._context = canvas.getContext('2d')
    this._velocity = { x: 0, y: 0 }
    this.position = {
      x: Math.floor(rows / 2) * cellSize + cellSize / 2,
      y: Math.floor(columns / 2) * cellSize + cellSize / 2,
    }
    this._sprite = new Sprite(heroSprite, 44, 32, 3, 21, 100 / 21)
  }

  public handleKeyUp = (e: KeyboardEvent) => {
    if (e.code in keys) {
      keys[e.code].pressed = false
      this._sprite.setRow(0)
    }
  }

  public handleKeyDown = (e: KeyboardEvent) => {
    if (e.code in keys) {
      this._lastKey = e.code
      keys[e.code].pressed = true
      this._accelerate()
    }
  }

  private _accelerate() {
    if (
      (keys['KeyW'].pressed && this._lastKey === 'KeyW') ||
      (keys['ArrowUp'].pressed && this._lastKey === 'ArrowUp')
    ) {
      this._velocity.y = -this._speed
      this._sprite.setRow(0)
    } else if (
      (keys['KeyA'].pressed && this._lastKey === 'KeyA') ||
      (keys['ArrowLeft'].pressed && this._lastKey === 'ArrowLeft')
    ) {
      this._velocity.x = -this._speed
      this._sprite.setRow(2)
    } else if (
      (keys['KeyS'].pressed && this._lastKey === 'KeyS') ||
      (keys['ArrowDown'].pressed && this._lastKey === 'ArrowDown')
    ) {
      this._velocity.y = this._speed
      this._sprite.setRow(0)
    } else if (
      (keys['KeyD'].pressed && this._lastKey === 'KeyD') ||
      (keys['ArrowRight'].pressed && this._lastKey === 'ArrowRight')
    ) {
      this._velocity.x = this._speed
      this._sprite.setRow(1)
    } else {
      this._velocity.x = 0
      this._velocity.y = 0
    }

    if (this._playerCollidesWithWalls()) {
      this._velocity.x = 0
      this._velocity.y = 0
    }
  }

  private _playerCollidesWithWalls() {
    const halfFrameWidth = this._sprite.frameWidth / 2
    const halfFrameHeight = this._sprite.frameHeight / 2

    if (
      this.position.x - halfFrameWidth + this._velocity.x <= 0 ||
      this.position.y - halfFrameHeight + this._velocity.y <= 0 ||
      this.position.x + halfFrameWidth + this._velocity.x >=
        this._canvas.width ||
      this.position.y + halfFrameHeight + this._velocity.y >=
        this._canvas.height
    ) {
      return true
    }

    for (const cell of this._falseCells) {
      const cellX = cell.x * this._cellSize
      const cellY = cell.y * this._cellSize

      if (
        this.position.x + halfFrameWidth + this._velocity.x >= cellX &&
        this.position.x - halfFrameWidth + this._velocity.x <=
          cellX + this._cellSize &&
        this.position.y + halfFrameHeight + this._velocity.y >= cellY &&
        this.position.y - halfFrameHeight + this._velocity.y <=
          cellY + this._cellSize
      ) {
        return true
      }
    }

    return false
  }

  private _draw() {
    const context = this._context
    if (!context) return

    this._sprite.draw(
      context,
      this.position.x - this._sprite.frameWidth / 2 + this._velocity.x,
      this.position.y - this._sprite.frameHeight / 2 + this._velocity.y
    )
  }

  public update() {
    this._accelerate()
    this._draw()

    this.position.x += this._velocity.x
    this.position.y += this._velocity.y
  }
}
