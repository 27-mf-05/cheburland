import { random } from './random'

export function particle(x: number, y: number) {
  return {
    x,
    y,
    radius: random(20, 30),
    color:
      'rgb(' + [random(0, 255), random(0, 255), random(0, 255)].join(',') + ')',
    rotation: random(0, 360),
    speed: random(8, 12),
    friction: 0.9,
    opacity: random(0, 0.5),
    yVel: 0,
    gravity: 0.1,
  }
}
