import orange from './orangeTexture.jpg'

const greenColor = 'rgb(11, 85, 22)'

export class Oranges {
  private readonly _canvas: HTMLCanvasElement
  private readonly _context: CanvasRenderingContext2D | null
  private readonly _cells: { x: number; y: number }[]
  private _randomCell: Record<string, number>
  private readonly _cellSize: number
  private _image: HTMLImageElement
  private _radius = 15

  constructor(
    canvas: HTMLCanvasElement,
    trueCells: { x: number; y: number }[],
    cellSize: number
  ) {
    this._canvas = canvas
    this._context = this._canvas.getContext('2d')
    this._cells = trueCells
    this._cellSize = cellSize
    this._randomCell = Oranges._getRandomCell(this._cells)
    this._image = Oranges.createImage(orange)
  }

  private static _getRandomCell(array: { x: number; y: number }[]) {
    const index = Math.floor(Math.random() * array.length)
    return array[index]
  }

  public collapseWithFruit(xPosition: number, yPosition: number) {
    const collusionRadius = 50

    if (!this._randomCell) {
      return
    }

    const orangeX = this._randomCell.x * this._cellSize + this._randomCell.x
    const orangeY = this._randomCell.y * this._cellSize + this._randomCell.y
    const distance = Math.sqrt(
      (xPosition - orangeX) ** 2 + (yPosition - orangeY) ** 2
    )

    return distance <= collusionRadius
  }

  public static createImage(src: string) {
    const image = new Image()
    image.src = src
    return image
  }

  public draw(state: boolean) {
    if (!this._canvas || !this._context) {
      return
    }

    if (state) {
      this._randomCell = Oranges._getRandomCell(this._cells)
    }

    // orange
    this._context.beginPath()
    this._context.arc(
      this._randomCell.x * this._cellSize + 30,
      this._randomCell.y * this._cellSize + 30,
      this._radius,
      0,
      Math.PI * 2
    )
    this._context.fillStyle = 'orange'
    this._context.fill()
    this._context.save()
    this._context.clip()
    this._context.drawImage(
      this._image,
      this._randomCell.x * this._cellSize + 10,
      this._randomCell.y * this._cellSize + 10,
      40,
      40
    )
    this._context.restore()

    // leaf
    this._context.beginPath()
    this._context.arc(
      this._randomCell.x * this._cellSize + 30,
      this._randomCell.y * this._cellSize + 10,
      11,
      0,
      0.5 * Math.PI
    )
    this._context.arc(
      this._randomCell.x * this._cellSize + 40,
      this._randomCell.y * this._cellSize + 21,
      11,
      Math.PI,
      1.5 * Math.PI
    )
    this._context.fillStyle = greenColor
    this._context.fill()

    this._context.closePath()
  }
}
