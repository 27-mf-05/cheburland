import orange from './orangeTexture.jpg'

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

    if (distance <= collusionRadius) {
      this.explodeAnimation(orangeX, orangeY)
    }
    return distance <= collusionRadius
  }

  private explodeAnimation(clientX: number, clientY: number) {
    const particles: any[] = []
    const ctx = this._context

    function Particle() {
      return {
        x: clientX,
        y: clientY,
        radius: random(20, 30),
        color:
          'rgb(' +
          [random(0, 255), random(0, 255), random(0, 255)].join(',') +
          ')',
        rotation: random(0, 360),
        speed: random(8, 12),
        friction: 0.9,
        opacity: random(0, 0.5),
        yVel: 0,
        gravity: 0.1,
      }
    }

    for (let i = 0; i < 25; i++) {
      particles.push(Particle())
    }

    const angleTools = {
      getAngle: function (
        t: { x: number; y: number },
        n: { x: number; y: number }
      ) {
        const x = n.x - t.x
        const y = n.y - t.y
        return (Math.atan2(y, x) / Math.PI) * 180
      },
      getDistance: function (
        t: { x: number; y: number },
        n: { x: number; y: number }
      ) {
        const x = t.x - n.x
        const y = t.y - n.y
        return Math.sqrt(x * x + y * y)
      },
      moveOnAngle: function (t: { x: number; y: number }, n: number) {
        const distance = this.getOneFrameDistance(n)
        t.x += distance.x
        t.y += distance.y
      },
      getOneFrameDistance: function (n: number) {
        return {
          x: n * Math.cos((random(0, 360) * Math.PI) / 180),
          y: n * Math.sin((random(0, 360) * Math.PI) / 180),
        }
      },
    }

    const render = (ctx: CanvasRenderingContext2D) => {
      particles.forEach(p => {
        angleTools.moveOnAngle(p, p.speed)

        p.opacity -= 0.01
        p.speed *= p.friction
        p.radius *= p.friction

        p.yVel += p.gravity
        p.y += p.yVel

        if (p.opacity < 0) return
        if (p.radius < 0) return

        ctx.beginPath()
        ctx.globalAlpha = p.opacity
        ctx.fillStyle = p.color
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2, false)
        ctx.fill()
      })
    }

    ;(function renderLoop() {
      requestAnimationFrame(renderLoop)
      render(ctx)
    })()

    function random(a: number, b: number) {
      return parseFloat(
        (Math.random() * ((a ? a : 1) - (b ? b : 0)) + (b ? b : 0)).toFixed(1)
      )
    }
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
    this._context.fillStyle = 'rgb(11, 85, 22)'
    this._context.fill()

    this._context.closePath()
  }
}
