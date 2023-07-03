const keys = {
  87: {
    pressed: false,
  },
  65: {
    pressed: false,
  },
  83: {
    pressed: false,
  },
  68: {
    pressed: false,
  },
}

type Position = {
  x: number
  y: number
}

type Velocity = {
  x: number
  y: number
}

export default class HeroTest {
  private readonly _context: CanvasRenderingContext2D | null
  private _velocity: Velocity
  public position: Position
  private _lastKey: number | undefined
  private _canvas: HTMLCanvasElement
  private _radius = 15
  private _falseCells: { x: number; y: number }[]
  private _cellSize: number

  constructor(
    canvas: HTMLCanvasElement,
    falseCells: { x: number; y: number }[],
    cellSize: number
  ) {
    this._canvas = canvas
    this._cellSize = cellSize
    this._falseCells = falseCells
    this._context = canvas.getContext('2d')
    this._velocity = { x: 3, y: 3 }
    this.position = { x: 300, y: 300 }
    this.addEvents()
  }

  handleKeyUp = (e: KeyboardEvent) => {
    switch (e.keyCode) {
      case 87:
        keys[87].pressed = false
        break

      case 65:
        keys[65].pressed = false
        break

      case 83:
        keys[83].pressed = false
        break

      case 68:
        keys[68].pressed = false
        break
    }
  }

  handleKeyDown = (e: KeyboardEvent) => {
    switch (e.keyCode) {
      case 87:
        keys[87].pressed = true
        this._lastKey = 87
        break

      case 65:
        keys[65].pressed = true
        this._lastKey = 65
        break

      case 83:
        keys[83].pressed = true
        this._lastKey = 83
        break

      case 68:
        keys[68].pressed = true
        this._lastKey = 68
        break
    }
  }

  addEvents() {
    document.addEventListener('keydown', this.handleKeyDown)
    document.addEventListener('keyup', this.handleKeyUp)

    return () => {
      document.removeEventListener('keydown', this.handleKeyDown)
      document.removeEventListener('keyup', this.handleKeyUp)
    }
  }

  accelerate() {
    if (keys[87].pressed && this._lastKey === 87) {
      this._velocity.y = -5
    } else if (keys[65].pressed && this._lastKey === 65) {
      this._velocity.x = -5
    } else if (keys[83].pressed && this._lastKey === 83) {
      this._velocity.y = 5
    } else if (keys[68].pressed && this._lastKey === 68) {
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
