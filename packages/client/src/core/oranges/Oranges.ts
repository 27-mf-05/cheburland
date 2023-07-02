/*
import Maze from "../maze/Maze";

export default class Oranges {
  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;
  private _cells: any[];
  private _randomCell: Record<string, any>;
  private maze;

  constructor(maze: Maze) {
    this.canvas = maze._canvas;
    this.context = this.canvas.getContext("2d");
    this._cells = maze.getTrueCells();
    this.maze = maze;
  }

  getRandomCell(array) {
    const index = Math.floor(Math.random() * array.length);
    return array[index];
  }

  draw(state: boolean) {
    if (state) {
      this._randomCell = this.getRandomCell(this._cells);
    }
    this.context.beginPath();
    this.context.rect(
      this._randomCell.x * this.maze.CELL_SIZE + this.maze.PADDING + 20,
      this._randomCell.y * this.maze.CELL_SIZE + this.maze.PADDING + 20,
      20,
      20
    );

    this.context.fillStyle = "orange";
    this.context.fill();
    this.context.closePath();
  }
}
*/
