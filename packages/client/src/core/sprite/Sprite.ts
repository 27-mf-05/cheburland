export class Sprite {
  private readonly _image: HTMLImageElement
  private readonly _frameWidth: number
  private readonly _frameHeight: number
  private readonly _rows: number
  private readonly _columns: number
  private _currentRow: number
  private _currentFrame: number
  private _frameDuration: number
  private _lastFrameTime: number

  constructor(
    imageSrc: string,
    frameWidth: number,
    frameHeight: number,
    rows: number,
    columns: number,
    frameDuration: number
  ) {
    this._image = new Image()
    this._image.src = imageSrc
    this._frameWidth = frameWidth
    this._frameHeight = frameHeight
    this._rows = rows
    this._columns = columns
    this._currentRow = 0
    this._currentFrame = 0
    this._frameDuration = frameDuration
    this._lastFrameTime = performance.now()
  }

  public get frameWidth() {
    return this._frameWidth
  }

  public get frameHeight() {
    return this._frameHeight
  }

  public draw(context: CanvasRenderingContext2D, x: number, y: number) {
    const row = this._currentRow
    const column = this._currentFrame % this._columns

    context.drawImage(
      this._image,
      column * this._frameWidth,
      row * this._frameHeight,
      this._frameWidth,
      this._frameHeight,
      x,
      y,
      this._frameWidth,
      this._frameHeight
    )

    this.update()
  }

  public update() {
    const currentFrameTime = performance.now()
    const deltaTime = currentFrameTime - this._lastFrameTime

    if (deltaTime >= this._frameDuration) {
      this._currentFrame = (this._currentFrame + 1) % this._columns
      this._lastFrameTime = currentFrameTime
    }
  }

  public setRow(row: number) {
    if (row >= 0 && row < this._rows) {
      this._currentRow = row
    }
  }
}
