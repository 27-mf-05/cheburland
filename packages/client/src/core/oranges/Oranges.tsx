export class Oranges {
  private readonly _canvas: HTMLCanvasElement
  private readonly _context: CanvasRenderingContext2D | null
  private readonly _cells: { x: number; y: number }[]
  private _randomCell: Record<string, any> | undefined
  private readonly _cellSize: number

  constructor(
    canvas: HTMLCanvasElement,
    trueCells: { x: number; y: number }[],
    cellSize: number
  ) {
    this._canvas = canvas
    this._context = this._canvas.getContext('2d')
    this._cells = trueCells
    this._cellSize = cellSize
  }

  private _getRandomCell(array: { x: number; y: number }[]) {
    const index = Math.floor(Math.random() * array.length)
    return array[index]
  }

  public collapseWithFruit(xPosition: number, yPosition: number) {
    const collusionRadius = 50

    const orangeX = this._randomCell!.x * this._cellSize + this._randomCell!.x
    const orangeY = this._randomCell!.y * this._cellSize + this._randomCell!.y
    const distance = Math.sqrt(
      (xPosition - orangeX) ** 2 + (yPosition - orangeY) ** 2
    )
    return distance <= collusionRadius
  }

  public draw(state: boolean) {
    if (!this._canvas || !this._context) {
      return
    }

    if (state) {
      this._randomCell = this._getRandomCell(this._cells)
    }
    this._context.beginPath()
    this._context.rect(
      this._randomCell?.x * this._cellSize + 20,
      this._randomCell?.y * this._cellSize + 20,
      20,
      20
    )

    this._context.fillStyle = 'orange'
    this._context.fill()
    this._context.closePath()
  }
}
