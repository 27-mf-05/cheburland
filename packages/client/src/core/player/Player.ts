import Maze from "../maze/Maze";

export default class Player {
  public position: Record<string, number>;
  public velocity: Record<string, number>;
  public radius: number;
  public canvas: HTMLCanvasElement;
  public context: CanvasRenderingContext2D;

  constructor(maze: Maze, { position, velocity }) {
    this.position = position;
    this.velocity = velocity;
    this.radius = 15;
    this.canvas = maze._canvas;
    this.context = this.canvas.getContext("2d");
  }

  draw() {
    this.context.beginPath();
    this.context.arc(
      this.position.x,
      this.position.y,
      this.radius,
      0,
      Math.PI * 2
    );

    this.context.fillStyle = "brown";
    this.context.fill();
    this.context.closePath();
  }

  public playerCollidesWithWalls({ body, border }) {
    if (
      body.position.x - body.radius - border.PADDING + body.velocity.x <= 0 ||
      body.position.y - body.radius - border.PADDING + body.velocity.y <= 0 ||
      body.position.x + border.PADDING + body.velocity.x >=
        border._canvas.width - body.radius ||
      body.position.y + border.PADDING + body.velocity.y >=
        border._canvas.height - body.radius
    ) {
      return true;
    }

    const falseCells = border.getFalseCells();

    for (const cell of falseCells) {
      const cellX = border.PADDING + cell.x * border.CELL_SIZE;
      const cellY = border.PADDING + cell.y * border.CELL_SIZE;

      if (
        body.position.x + body.velocity.x >= cellX &&
        body.position.x + body.velocity.x <= cellX + border.CELL_SIZE &&
        body.position.y + body.velocity.y >= cellY &&
        body.position.y + body.velocity.y <= cellY + border.CELL_SIZE
      ) {
        return true;
      }
    }

    return false;
  }

  update() {
    this.draw();
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
  }
}
