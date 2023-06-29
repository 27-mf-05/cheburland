import Maze from "../maze/Maze";
import Player from "../player/Player";
import Oranges from "../oranges/Oranges";

const canvas = document.querySelector("canvas");
const counterEl = document.querySelector(".counter");
const timerEl = document.querySelector(".timer");

let keys = {
  w: {
    pressed: false,
  },
  a: {
    pressed: false,
  },
  s: {
    pressed: false,
  },
  d: {
    pressed: false,
  },
};

let lastKey = "";

window.addEventListener("keydown", ({ key }) => {
  switch (key) {
    case "w":
      keys.w.pressed = true;
      lastKey = "w";
      break;
    case "ц":
      keys.w.pressed = true;
      lastKey = "w";
      break;

    case "a":
      keys.a.pressed = true;
      lastKey = "a";
      break;
    case "ф":
      keys.a.pressed = true;
      lastKey = "a";
      break;

    case "s":
      keys.s.pressed = true;
      lastKey = "s";
      break;
    case "ы":
      keys.s.pressed = true;
      lastKey = "s";
      break;

    case "d":
      keys.d.pressed = true;
      lastKey = "d";
      break;
    case "в":
      keys.d.pressed = true;
      lastKey = "d";
      break;
  }
});

window.addEventListener("keyup", function (event) {
  switch (event.key) {
    case "w":
      keys.w.pressed = false;
      break;
    case "ц":
      keys.w.pressed = false;
      break;

    case "a":
      keys.a.pressed = false;
      break;
    case "ф":
      keys.a.pressed = false;
      break;

    case "s":
      keys.s.pressed = false;
      break;
    case "ы":
      keys.s.pressed = false;
      break;

    case "d":
      keys.d.pressed = false;
      break;
    case "в":
      keys.d.pressed = false;
      break;
  }
});

export default class Controller {
  protected maze = new Maze(canvas, 13, 65, 10, 10);
  protected player = null;
  protected oranges = null;
  protected counter = 0;

  async generateEntities() {
    await this.maze.generate();

    this.player = new Player(this.maze, {
      position: {
        x:
          this.maze.PADDING +
          Math.floor(this.maze.ROWS / 2) * this.maze.CELL_SIZE +
          this.maze.CELL_SIZE / 2,
        y:
          this.maze.PADDING +
          Math.floor(this.maze.COLUMNS / 2) * this.maze.CELL_SIZE +
          this.maze.CELL_SIZE / 2,
      },
      velocity: {
        x: 0,
        y: 0,
      },
    });

    this.startTimer(timerEl);

    this.oranges = new Oranges(this.maze);

    this.player.draw();
    this.oranges.draw(true);

    this.animate();
  }

  startTimer(counterEl) {
    let counter = 60;

    const timerId = setInterval(() => {
      counter--;

      counterEl.innerHTML = counter;

      if (counter === 0) {
        clearInterval(timerId);
        alert("Таймер завершен!");
      }
    }, 1000);
  }

  collapseWithFruit() {
    const playerX = this.player.position.x;
    const playerY = this.player.position.y;
    const orangeX =
      this.oranges._randomCell.x * this.maze.CELL_SIZE +
      this.oranges._randomCell.x +
      this.maze.PADDING;
    const orangeY =
      this.oranges._randomCell.y * this.maze.CELL_SIZE +
      this.oranges._randomCell.y +
      this.maze.PADDING;
    const distance = Math.sqrt(
      (playerX - orangeX) ** 2 + (playerY - orangeY) ** 2
    );
    return distance <= 50;
  }

  animate() {
    requestAnimationFrame(this.animate.bind(this));

    this.maze.drawMaze();
    this.oranges.draw(false);

    if (keys.w.pressed && lastKey === "w") {
      this.player.velocity.y = -5;
    } else if (keys.a.pressed && lastKey === "a") {
      this.player.velocity.x = -5;
    } else if (keys.s.pressed && lastKey === "s") {
      this.player.velocity.y = 5;
    } else if (keys.d.pressed && lastKey === "d") {
      this.player.velocity.x = 5;
    } else {
      this.player.velocity.x = 0;
      this.player.velocity.y = 0;
    }

    if (this.collapseWithFruit()) {
      this.counter += 1;
      counterEl.innerHTML = this.counter.toString();
      this.oranges.draw(true);
    }

    if (
      this.player.playerCollidesWithWalls({
        body: this.player,
        border: this.maze,
      })
    ) {
      this.player.velocity.x = 0;
      this.player.velocity.y = 0;
    }
    this.player.update();
  }
}

const controller = new Controller();

controller.generateEntities();
