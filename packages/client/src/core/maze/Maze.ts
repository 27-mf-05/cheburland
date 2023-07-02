export default class Maze {
  public readonly ROWS
  public readonly COLUMNS
  public readonly CELL_SIZE
  public readonly PADDING
  public MATRIX: boolean[][] | undefined
  private _ERASERS: { x: number; y: number }[] = []
  private readonly _DELAY
  public readonly _canvas: HTMLCanvasElement
  private _context

  constructor(
    element: HTMLCanvasElement,
    rowsAndColumns: number,
    CELL_SIZE: number,
    PADDING: number,
    ERASERS: number,
    DELAY?: number
  ) {
    this.ROWS = rowsAndColumns
    this.COLUMNS = rowsAndColumns
    this.PADDING = PADDING
    this.CELL_SIZE = CELL_SIZE
    this._DELAY = DELAY
    this._canvas = element
    this._context = this._canvas.getContext('2d')

    for (let i = 0; i < ERASERS; i++) {
      this._ERASERS.push({
        x: 0,
        y: 0,
      })
    }

    this.createMatrix(this.ROWS, this.COLUMNS)
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
    this.MATRIX = matrix
  }

  drawMaze() {
    const WALL_COLOR = 'black'
    const FREE_COLOR = 'gray'
    const BACKGROUND_COLOR = 'blue'

    this._canvas.width = this.PADDING * 2 + this.COLUMNS * this.CELL_SIZE
    this._canvas.height = this.PADDING * 2 + this.ROWS * this.CELL_SIZE

    this._context!.rect(0, 0, this._canvas.width, this._canvas.height)
    this._context!.fillStyle = BACKGROUND_COLOR
    this._context!.fill()

    for (let y = 0; y < this.COLUMNS; y++) {
      for (let x = 0; x < this.ROWS; x++) {
        //если координаты x и y true - тогда рисуем проход, если нет, тогда стену
        const color = this.MATRIX![y][x] ? FREE_COLOR : WALL_COLOR
        this._context!.beginPath()
        this._context!.rect(
          this.PADDING + x * this.CELL_SIZE,
          this.PADDING + y * this.CELL_SIZE,
          this.CELL_SIZE,
          this.CELL_SIZE
        )
        this._context!.fillStyle = color
        this._context!.fill()
      }
    }
  }

  drawEraser(eraser: Record<string, number>) {
    const PADDING = 5
    const ERASER_COLOR = 'red'

    this._context!.beginPath()
    this._context!.rect(
      PADDING + eraser.x * this.CELL_SIZE,
      PADDING + eraser.y * this.CELL_SIZE,
      this.CELL_SIZE,
      this.CELL_SIZE
    )
    this._context!.fillStyle = ERASER_COLOR
    this._context!.fill()
  }

  eraserMovement(eraser: Record<string, number>) {
    const directions: [number, number][] = []

    if (eraser.x > 0) {
      directions.push([-2, 0])
    }

    if (eraser.x < this.COLUMNS - 1) {
      directions.push([2, 0])
    }

    if (eraser.y > 0) {
      directions.push([0, -2])
    }

    if (eraser.y < this.ROWS - 1) {
      directions.push([0, 2])
    }

    // выбираем рандомное движение для нашего ластика
    const [dx, dy] = this.getRandomItem(directions)

    eraser.x += dx
    eraser.y += dy

    // проверяем если клетка false, делаем ее в true, тем самым появляется проход
    // так как ластик по дефолту проходит 2!!! клетки, мы должны еще закрасить предыдущюю, то есть length/2
    if (!this.MATRIX![eraser.y][eraser.x]) {
      this.MATRIX![eraser.y][eraser.x] = true
      this.MATRIX![eraser.y - dy / 2][eraser.x - dx / 2] = true
    }
  }

  public getFalseCells() {
    const falseCells = []
    for (let y = 0; y < this.ROWS; y++) {
      for (let x = 0; x < this.COLUMNS; x++) {
        if (!this.MATRIX![y][x]) {
          falseCells.push({ x, y })
        }
      }
    }

    return falseCells
  }

  public getTrueCells() {
    const trueCells = []

    for (let y = 0; y < this.ROWS; y++) {
      for (let x = 0; x < this.COLUMNS; x++) {
        if (this.MATRIX![y][x]) {
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
    for (let y = 0; y < this.ROWS; y += 2) {
      for (let x = 0; x < this.COLUMNS; x += 2) {
        if (!this.MATRIX![y][x]) {
          return false
        }
      }
    }
    return true
  }

  async generate() {
    while (!this.isValidMaze()) {
      // прописываем для каждого ластика движение
      for (const eraser of this._ERASERS) {
        this.eraserMovement(eraser)
      }

      if (this._DELAY! > -1) {
        //рисуем лабиринт
        this.drawMaze()

        //рисуем ластики
        for (const eraser of this._ERASERS) {
          this.drawEraser(eraser)
        }

        await this.delay(this._DELAY!)
      }
    }
    this.drawMaze()
  }
}
