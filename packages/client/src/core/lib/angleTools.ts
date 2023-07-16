import { random } from './random'

export const angleTools = {
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
