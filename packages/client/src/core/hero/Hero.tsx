import { keys } from '@/shared/core'

import animalTexture from './animalTexture.png'

type Position = {
  x: number
  y: number
}

type Velocity = {
  x: number
  y: number
}

const beigeСolor = 'rgb(202, 132, 69)'

export class Hero {
  private readonly _context: CanvasRenderingContext2D | null
  private _velocity: Velocity
  private _speed = 3
  public position: Position
  private _lastKey: number | undefined
  private _canvas: HTMLCanvasElement
  private _radius = 20
  private readonly _falseCells: { x: number; y: number }[]
  private readonly _cellSize: number
  private _image: HTMLImageElement

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
    this._image = Hero.createImage(animalTexture)
  }

  public static createImage(src: string) {
    const image = new Image()
    image.src = src
    return image
  }

  public handleKeyUp = (e: KeyboardEvent) => {
    if (e.keyCode in keys) {
      keys[e.keyCode].pressed = false
    }
  }

  public handleKeyDown = (e: KeyboardEvent) => {
    console.log(e.code)
    if (e.keyCode in keys) {
      this._lastKey = e.keyCode
      keys[e.keyCode].pressed = true
    }
  }

  private _accelerate() {
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

    if (this._playerCollidesWithWalls()) {
      this._velocity.x = 0
      this._velocity.y = 0
    }
  }

  private _playerCollidesWithWalls() {
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

  private _draw() {
    const context = this._context
    if (!context) return

    // left ear
    context.beginPath()
    context.ellipse(
      this.position.x - 12,
      this.position.y - 11,
      10,
      8,
      0,
      0,
      Math.PI * 2
    )
    context.save()
    context.clip()
    context.drawImage(
      this._image,
      this.position.x - 30,
      this.position.y - 20,
      30,
      30
    )
    context.restore()

    // right ear
    context.beginPath()
    context.ellipse(
      this.position.x + 12,
      this.position.y - 11,
      10,
      8,
      0,
      0,
      Math.PI * 2
    )
    context.save()
    context.clip()
    context.drawImage(
      this._image,
      this.position.x,
      this.position.y - 20,
      30,
      30
    )
    context.restore()

    // left hand
    context.beginPath()
    context.ellipse(
      this.position.x - 8,
      this.position.y + 2,
      4,
      10,
      Math.PI / 4,
      0,
      Math.PI * 2
    )
    context.save()
    context.clip()
    context.drawImage(
      this._image,
      this.position.x - 20,
      this.position.y - 6,
      30,
      30
    )
    context.restore()

    // right hand
    context.beginPath()
    context.ellipse(
      this.position.x + 8,
      this.position.y + 2,
      4,
      10,
      -Math.PI / 4,
      0,
      Math.PI * 2
    )
    context.save()
    context.clip()
    context.drawImage(
      this._image,
      this.position.x - 10,
      this.position.y - 6,
      30,
      30
    )
    context.restore()

    // body
    context.beginPath()
    context.ellipse(this.position.x, this.position.y, 9, 15, 0, 0, Math.PI * 2)
    context.save()
    context.clip()
    context.drawImage(
      this._image,
      this.position.x - 20,
      this.position.y - 6,
      30,
      30
    )
    context.restore()

    // body (belly)
    context.beginPath()
    context.ellipse(
      this.position.x,
      this.position.y + 2,
      5,
      8,
      0,
      0,
      Math.PI * 2
    )
    context.fillStyle = beigeСolor
    context.fill()

    // head
    context.beginPath()
    context.ellipse(
      this.position.x,
      this.position.y - 10,
      12,
      10,
      0,
      0,
      Math.PI * 2
    )
    context.save()
    context.clip()
    context.drawImage(
      this._image,
      this.position.x - 12,
      this.position.y - 20,
      30,
      30
    )
    context.restore()

    // face
    context.beginPath()
    context.ellipse(
      this.position.x,
      this.position.y - 9,
      9,
      7,
      0,
      0,
      Math.PI * 2
    )
    context.fillStyle = beigeСolor
    context.fill()

    // left eye
    context.beginPath()
    context.arc(this.position.x - 5, this.position.y - 11, 2, 0, Math.PI * 2)
    context.fillStyle = 'black'
    context.fill()

    // right eye
    context.beginPath()
    context.arc(this.position.x + 5, this.position.y - 11, 2, 0, Math.PI * 2)
    context.fillStyle = 'black'
    context.fill()

    // nose
    context.beginPath()
    context.moveTo(this.position.x + 1, this.position.y - 8)
    context.lineTo(this.position.x, this.position.y - 10)
    context.lineTo(this.position.x - 1, this.position.y - 8)
    context.fillStyle = 'black'
    context.fill()
    // context.restore()

    // smile
    context.beginPath()
    context.quadraticCurveTo(
      this.position.x - 3,
      this.position.y - 6,
      this.position.x,
      this.position.y - 4
    )
    context.quadraticCurveTo(
      this.position.x + 3,
      this.position.y - 4,
      this.position.x + 3,
      this.position.y - 6
    )
    context.fillStyle = '#BC3329'
    context.fill()

    // left leg
    context.beginPath()
    context.ellipse(
      this.position.x - 8,
      this.position.y + 15,
      4,
      7,
      Math.PI / 2,
      0,
      Math.PI * 2
    )
    context.save()
    context.clip()
    context.drawImage(
      this._image,
      this.position.x - 20,
      this.position.y + 5,
      30,
      30
    )
    context.restore()

    // right leg
    context.beginPath()
    context.ellipse(
      this.position.x + 8,
      this.position.y + 15,
      4,
      7,
      Math.PI / 2,
      0,
      Math.PI * 2
    )
    context.save()
    context.clip()
    context.drawImage(
      this._image,
      this.position.x - 10,
      this.position.y + 5,
      30,
      30
    )
    context.restore()

    context.closePath()
  }

  public update() {
    this._accelerate()
    this._draw()

    this.position.x += this._velocity.x
    this.position.y += this._velocity.y
  }
}
