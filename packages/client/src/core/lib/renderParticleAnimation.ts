import { angleTools } from './angleTools'

type Particle = {
  x: number
  y: number
  radius: number
  color: string
  rotation: number
  speed: number
  friction: number
  opacity: number
  yVel: number
  gravity: number
}

export const renderParticleAnimation = (
  ctx: CanvasRenderingContext2D | null,
  isShowAnimation: any,
  particles: Particle[]
) => {
  function draw() {
    particles.forEach(p => {
      angleTools.moveOnAngle(p, p.speed)

      if (ctx !== null) {
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fillStyle = p.color
        ctx.fill()
        ctx.closePath()
      }
    })
  }

  function update() {
    draw()
    particles.map(p => {
      p.opacity -= 0.01
      p.speed *= p.friction
      p.radius *= p.friction

      p.yVel += p.gravity
      p.y += p.yVel

      if (p.opacity < 0 || p.radius < 0) {
        return
      }

      return p
    })
  }

  if (isShowAnimation.current) {
    update()

    setTimeout(() => {
      isShowAnimation.current = false
    }, 500)
  }
}
