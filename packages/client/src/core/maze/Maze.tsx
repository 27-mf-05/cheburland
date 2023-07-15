import mazeTexture from './mazeTexture.webp'

export class Maze {
  public readonly rows
  public readonly columns
  public readonly cellSize
  private _matrix: boolean[][] | undefined
  private _erasers: { x: number; y: number }[] = []
  private readonly _delay
  private readonly _canvas: HTMLCanvasElement
  private readonly _context
  private _image: HTMLImageElement

  constructor(
    element: HTMLCanvasElement,
    rowsAndColumns: number,
    cellSize: number,
    erasers: number,
    delay?: number
  ) {
    this.rows = rowsAndColumns
    this.columns = rowsAndColumns
    this.cellSize = cellSize
    this._delay = delay
    this._canvas = element
    this._context = this._canvas.getContext('2d')
    this._image = Maze.createImage(mazeTexture)

    for (let i = 0; i < erasers; i++) {
      this._erasers.push({
        x: 0,
        y: 0,
      })
    }
    this._createMatrix(this.rows, this.columns)
  }

  public static createImage(src: string) {
    const image = new Image()
    image.src = src
    return image
  }

  private _createMatrix(rows: number, columns: number) {
    const matrix = []

    // columns и rows обязательно НЕЧЕТНОЕ число, определяющее размеры матрицы
    for (let y = 0; y < rows; y++) {
      const row: boolean[] = []
      for (let x = 0; x < columns; x++) {
        row.push(false)
      }
      matrix.push(row)
    }
    this._matrix = matrix
  }

  public drawMaze() {
    if (!this._context || !this._canvas || !this._matrix) {
      return
    }
    const WALL_COLOR = 'black'
    const FREE_COLOR = 'gray'
    const BACKGROUND_COLOR = 'blue'

    this._canvas.width = this.columns * this.cellSize
    this._canvas.height = this.rows * this.cellSize

    this._context.rect(0, 0, this._canvas.width, this._canvas.height)
    // this._context.drawImage(this._image, 0, 0, this._canvas.width, this._canvas.height)
    this._context.fillStyle = BACKGROUND_COLOR
    this._context.fill()

    for (let y = 0; y < this.columns; y++) {
      for (let x = 0; x < this.rows; x++) {
        //если координаты x и y true - тогда рисуем проход, если нет, тогда стену
        const color = this._matrix[y][x] ? FREE_COLOR : WALL_COLOR
        this._context.beginPath()
        this._context.rect(
          x * this.cellSize,
          y * this.cellSize,
          this.cellSize,
          this.cellSize
        )
        if (this._matrix[y][x]) {
          this._context.fillStyle = color
          this._context.fill()
        } else {
          this._context.drawImage(
            this._image,
            x * this.cellSize,
            y * this.cellSize,
            this.cellSize,
            this.cellSize
          )
        }
      }
    }
  }

  private _drawEraser(eraser: Record<string, number>) {
    const PADDING = 5
    const ERASER_COLOR = 'red'

    if (!this._context) {
      return
    }

    this._context.beginPath()
    this._context.rect(
      PADDING + eraser.x * this.cellSize,
      PADDING + eraser.y * this.cellSize,
      this.cellSize,
      this.cellSize
    )
    this._context.fillStyle = ERASER_COLOR
    this._context.fill()
  }

  private _eraserMovement(eraser: Record<string, number>) {
    const directions: [number, number][] = []

    if (eraser.x > 0) {
      directions.push([-2, 0])
    }

    if (eraser.x < this.columns - 1) {
      directions.push([2, 0])
    }

    if (eraser.y > 0) {
      directions.push([0, -2])
    }

    if (eraser.y < this.rows - 1) {
      directions.push([0, 2])
    }

    // выбираем рандомно движение для нашего ластика
    const [dx, dy] = Maze._getRandomItem(directions)

    eraser.x += dx
    eraser.y += dy

    // проверяем если клетка false, делаем ее в true, тем самым появляется проход
    // так как ластик по дефолту проходит 2!!! клетки, мы должны еще закрасить предыдущую, то есть length/2
    if (!this._matrix) {
      return
    }

    if (!this._matrix[eraser.y][eraser.x]) {
      this._matrix[eraser.y][eraser.x] = true
      this._matrix[eraser.y - dy / 2][eraser.x - dx / 2] = true
    }
  }

  public getFalseCells() {
    const falseCells: { x: number; y: number }[] = []

    if (!this._matrix) {
      return falseCells
    }

    for (let y = 0; y < this.rows; y++) {
      for (let x = 0; x < this.columns; x++) {
        if (!this._matrix[y][x]) {
          falseCells.push({ x, y })
        }
      }
    }

    return falseCells
  }

  public getTrueCells() {
    const trueCells: { x: number; y: number }[] = []

    if (!this._matrix) {
      return trueCells
    }

    for (let y = 0; y < this.rows; y++) {
      for (let x = 0; x < this.columns; x++) {
        if (this._matrix[y][x]) {
          trueCells.push({ x, y })
        }
      }
    }

    return trueCells
  }

  private static _getRandomItem(array: [number, number][]) {
    const index = Math.floor(Math.random() * array.length)
    return array[index]
  }

  private _setDelay(timeout: number) {
    return new Promise(resolve => setTimeout(resolve, timeout))
  }

  private _isValidMaze() {
    if (!this._matrix) {
      return
    }

    for (let y = 0; y < this.rows; y += 2) {
      for (let x = 0; x < this.columns; x += 2) {
        if (!this._matrix[y][x]) {
          return false
        }
      }
    }
    return true
  }

  public async generate() {
    while (!this._isValidMaze()) {
      // прописываем для каждого ластика движение
      for (const eraser of this._erasers) {
        this._eraserMovement(eraser)
      }

      if (this._delay !== undefined && this._delay > -1) {
        //рисуем лабиринт
        this.drawMaze()

        //рисуем ластики
        for (const eraser of this._erasers) {
          this._drawEraser(eraser)
        }

        await this._setDelay(this._delay)
      }
    }
    this.drawMaze()
  }
}
