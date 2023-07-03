export default class Maze {
  private readonly _rows
  private readonly _columns
  public readonly cellSize
  private readonly _padding
  private _matrix: boolean[][] | undefined
  private _erasers: { x: number; y: number }[] = []
  private readonly _delay
  private readonly _canvas: HTMLCanvasElement
  private _context

  constructor(
    element: HTMLCanvasElement,
    rowsAndColumns: number,
    cellSize: number,
    padding: number,
    erasers: number,
    delay?: number
  ) {
    this._rows = rowsAndColumns
    this._columns = rowsAndColumns
    this._padding = padding
    this.cellSize = cellSize
    this._delay = delay
    this._canvas = element
    this._context = this._canvas.getContext('2d')

    for (let i = 0; i < erasers; i++) {
      this._erasers.push({
        x: 0,
        y: 0,
      })
    }
    this.createMatrix(this._rows, this._columns)
  }

  createMatrix(rows: number, columns: number) {
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

  drawMaze() {
    if (!this._context || !this._canvas || !this._matrix) {
      return
    }
    const WALL_COLOR = 'black'
    const FREE_COLOR = 'gray'
    const BACKGROUND_COLOR = 'blue'

    this._canvas.width = this._padding * 2 + this._columns * this.cellSize
    this._canvas.height = this._padding * 2 + this._rows * this.cellSize

    this._context.rect(0, 0, this._canvas.width, this._canvas.height)
    this._context.fillStyle = BACKGROUND_COLOR
    this._context.fill()

    for (let y = 0; y < this._columns; y++) {
      for (let x = 0; x < this._rows; x++) {
        //если координаты x и y true - тогда рисуем проход, если нет, тогда стену
        const color = this._matrix[y][x] ? FREE_COLOR : WALL_COLOR
        this._context.beginPath()
        this._context.rect(
          this._padding + x * this.cellSize,
          this._padding + y * this.cellSize,
          this.cellSize,
          this.cellSize
        )
        this._context.fillStyle = color
        this._context.fill()
      }
    }
  }

  drawEraser(eraser: Record<string, number>) {
    const PADDING = 5
    const ERASER_COLOR = 'red'

    this._context!.beginPath()
    this._context!.rect(
      PADDING + eraser.x * this.cellSize,
      PADDING + eraser.y * this.cellSize,
      this.cellSize,
      this.cellSize
    )
    this._context!.fillStyle = ERASER_COLOR
    this._context!.fill()
  }

  eraserMovement(eraser: Record<string, number>) {
    const directions: [number, number][] = []

    if (eraser.x > 0) {
      directions.push([-2, 0])
    }

    if (eraser.x < this._columns - 1) {
      directions.push([2, 0])
    }

    if (eraser.y > 0) {
      directions.push([0, -2])
    }

    if (eraser.y < this._rows - 1) {
      directions.push([0, 2])
    }

    // выбираем рандомное движение для нашего ластика
    const [dx, dy] = this.getRandomItem(directions)

    eraser.x += dx
    eraser.y += dy

    // проверяем если клетка false, делаем ее в true, тем самым появляется проход
    // так как ластик по дефолту проходит 2!!! клетки, мы должны еще закрасить предыдущюю, то есть length/2
    if (!this._matrix![eraser.y][eraser.x]) {
      this._matrix![eraser.y][eraser.x] = true
      this._matrix![eraser.y - dy / 2][eraser.x - dx / 2] = true
    }
  }

  public getFalseCells() {
    const falseCells = []
    for (let y = 0; y < this._rows; y++) {
      for (let x = 0; x < this._columns; x++) {
        if (!this._matrix![y][x]) {
          falseCells.push({ x, y })
        }
      }
    }

    return falseCells
  }

  public getTrueCells() {
    const trueCells = []

    for (let y = 0; y < this._rows; y++) {
      for (let x = 0; x < this._columns; x++) {
        if (this._matrix![y][x]) {
          trueCells.push({ x, y })
        }
      }
    }

    return trueCells
  }

  getRandomItem(array: [number, number][]) {
    const index = Math.floor(Math.random() * array.length)
    return array[index]
  }

  delay(timeout: number) {
    return new Promise(resolve => setTimeout(resolve, timeout))
  }

  isValidMaze() {
    for (let y = 0; y < this._rows; y += 2) {
      for (let x = 0; x < this._columns; x += 2) {
        if (!this._matrix![y][x]) {
          return false
        }
      }
    }
    return true
  }

  async generate() {
    while (!this.isValidMaze()) {
      // прописываем для каждого ластика движение
      for (const eraser of this._erasers) {
        this.eraserMovement(eraser)
      }

      if (this._delay! > -1) {
        //рисуем лабиринт
        this.drawMaze()

        //рисуем ластики
        for (const eraser of this._erasers) {
          this.drawEraser(eraser)
        }

        await this.delay(this._delay!)
      }
    }
    this.drawMaze()
  }
}
