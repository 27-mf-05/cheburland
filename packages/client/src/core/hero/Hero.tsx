import { keys } from '@/shared/core'

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
  private _speed = 3
  public position: Position
  private _lastKey: number | undefined
  private _canvas: HTMLCanvasElement
  private _radius = 15
  private readonly _falseCells: { x: number; y: number }[]
  private readonly _cellSize: number

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
  }

  public handleKeyUp = (e: KeyboardEvent) => {
    if (e.keyCode in keys) {
      keys[e.keyCode].pressed = false
    }
  }

  public handleKeyDown = (e: KeyboardEvent) => {
    if (e.keyCode in keys) {
      this._lastKey = e.keyCode
      keys[e.keyCode].pressed = true
    }
  }

  accelerate() {
    if (
      (keys[87].pressed && this._lastKey === 87) ||
      (keys[38].pressed && this._lastKey === 38)
    ) {
      this._velocity.y = -this._speed
    } else if (
      (keys[65].pressed && this._lastKey === 65) ||
      (keys[37].pressed && this._lastKey === 37)
    ) {
      this._velocity.x = -this._speed
    } else if (
      (keys[83].pressed && this._lastKey === 83) ||
      (keys[40].pressed && this._lastKey === 40)
    ) {
      this._velocity.y = this._speed
    } else if (
      (keys[68].pressed && this._lastKey === 68) ||
      (keys[39].pressed && this._lastKey === 39)
    ) {
      this._velocity.x = this._speed
    } else {
      this._velocity.x = 0
      this._velocity.y = 0
    }

    if (this.playerCollidesWithWalls()) {
      this._velocity.x = 0
      this._velocity.y = 0
    }
  }

  playerCollidesWithWalls() {
    if (
      this.position.x - this._radius + this._velocity.x <= 0 ||
      this.position.y - this._radius + this._velocity.y <= 0 ||
      this.position.x + this._velocity.x >= this._canvas.width - this._radius ||
      this.position.y + this._velocity.y >= this._canvas.height - this._radius
    ) {
      return true
    }

    for (const cell of this._falseCells) {
      const cellX = cell.x * this._cellSize
      const cellY = cell.y * this._cellSize

      if (
        this.position.x + this._radius + this._velocity.x >= cellX &&
        this.position.x - this._radius + this._velocity.x <=
          cellX + this._cellSize &&
        this.position.y + this._radius + this._velocity.y >= cellY &&
        this.position.y - this._radius + this._velocity.y <=
          cellY + this._cellSize
      ) {
        return true
      }
    }
  }

  draw() {
    const context = this._context
    if (!context) return

    context.beginPath()
    context.arc(this.position.x, this.position.y, this._radius, 0, Math.PI * 2)
    context.fillStyle = 'brown'
    context.fill()
    context.closePath()
  }

  update() {
    this.accelerate()
    this.draw()

    this.position.x += this._velocity.x
    this.position.y += this._velocity.y
  }
}
