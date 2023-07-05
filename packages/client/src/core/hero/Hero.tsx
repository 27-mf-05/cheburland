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
  public position: Position
  private _lastKey: number | undefined
  private _canvas: HTMLCanvasElement
  private _radius = 15
  private _falseCells: { x: number; y: number }[]
  private _cellSize: number

  private _keys: { [key: number]: { pressed: boolean } } = {
    87: {
      pressed: false,
    },
    38: {
      pressed: false,
    },

    65: {
      pressed: false,
    },
    37: {
      pressed: false,
    },

    83: {
      pressed: false,
    },
    40: {
      pressed: false,
    },

    68: {
      pressed: false,
    },
    39: {
      pressed: false,
    },
  }

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
    this._velocity = { x: 3, y: 3 }
    this.position = {
      x: Math.floor(rows / 2) * cellSize + cellSize / 2,
      y: Math.floor(columns / 2) * cellSize + cellSize / 2,
    }
    this.addEvents()
  }

  private _handleKeyUp = (e: KeyboardEvent) => {
    if (e.keyCode in this._keys) {
      this._keys[e.keyCode].pressed = false
    }
  }

  private _handleKeyDown = (e: KeyboardEvent) => {
    if (e.keyCode in this._keys) {
      this._lastKey = e.keyCode
      this._keys[e.keyCode].pressed = true
    }
  }

  addEvents() {
    document.addEventListener('keydown', this._handleKeyDown)
    document.addEventListener('keyup', this._handleKeyUp)

    return () => {
      document.removeEventListener('keydown', this._handleKeyDown)
      document.removeEventListener('keyup', this._handleKeyUp)
    }
  }

  accelerate() {
    if (
      (this._keys[87].pressed && this._lastKey === 87) ||
      (this._keys[38].pressed && this._lastKey === 38)
    ) {
      this._velocity.y = -5
    } else if (
      (this._keys[65].pressed && this._lastKey === 65) ||
      (this._keys[37].pressed && this._lastKey === 37)
    ) {
      this._velocity.x = -5
    } else if (
      (this._keys[83].pressed && this._lastKey === 83) ||
      (this._keys[40].pressed && this._lastKey === 40)
    ) {
      this._velocity.y = 5
    } else if (
      (this._keys[68].pressed && this._lastKey === 68) ||
      (this._keys[39].pressed && this._lastKey === 39)
    ) {
      this._velocity.x = 5
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
        this.position.x + this._velocity.x >= cellX &&
        this.position.x + this._velocity.x <= cellX + this._cellSize &&
        this.position.y + this._velocity.y >= cellY &&
        this.position.y + this._velocity.y <= cellY + this._cellSize
      ) {
        return true
      }
    }
  }

  draw() {
    const context = this._context
    if (!context) return

    context.beginPath()
    context.arc(this.position.x, this.position.y, 15, 0, Math.PI * 2)
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
