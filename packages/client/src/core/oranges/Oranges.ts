import Maze from '../maze/Maze'

export default class Oranges {
  private canvas: HTMLCanvasElement
  private context: CanvasRenderingContext2D | null
  private _cells: { x: number; y: number }[]
  private _randomCell: Record<string, any> | undefined
  private _cellSize: number

  constructor(
    canvas: HTMLCanvasElement,
    trueCells: { x: number; y: number }[],
    cellSize: number
  ) {
    this.canvas = canvas
    this.context = this.canvas.getContext('2d')
    this._cells = trueCells
    this._cellSize = cellSize
  }

  getRandomCell(array: { x: number; y: number }[]) {
    const index = Math.floor(Math.random() * array.length)
    return array[index]
  }

  collapseWithFruit(xPosition: number, yPosition: number) {
    const orangeX = this._randomCell!.x * this._cellSize + this._randomCell!.x
    const orangeY = this._randomCell!.y * this._cellSize + this._randomCell!.y
    const distance = Math.sqrt(
      (xPosition - orangeX) ** 2 + (yPosition - orangeY) ** 2
    )
    return distance <= 50
  }

  draw(state: boolean) {
    if (!this.canvas || !this.context) {
      return
    }

    if (state) {
      this._randomCell = this.getRandomCell(this._cells)
    }
    this.context.beginPath()
    this.context.rect(
      this._randomCell?.x * this._cellSize + 20,
      this._randomCell?.y * this._cellSize + 20,
      20,
      20
    )

    this.context.fillStyle = 'orange'
    this.context.fill()
    this.context.closePath()
  }
}
