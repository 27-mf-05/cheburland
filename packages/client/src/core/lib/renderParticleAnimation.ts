import { angleTools } from './angleTools'
import { particle } from './particle'

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
  x: number,
  y: number,
  ctx: CanvasRenderingContext2D | null
) => {
  const particles: Particle[] = []
  let animationFrame: number

  for (let i = 0; i < 25; i++) {
    particles.push(particle(x, y))
  }

  const render = (ctx: CanvasRenderingContext2D) => {
    particles.forEach(p => {
      angleTools.moveOnAngle(p, p.speed)

      p.opacity -= 0.01
      p.speed *= p.friction
      p.radius *= p.friction

      p.yVel += p.gravity
      p.y += p.yVel

      if (p.opacity < 0 || p.radius < 0) {
        return
      }

      ctx.beginPath()
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
      ctx.fillStyle = p.color
      ctx.fill()
      ctx.closePath()
    })
  }

  ;(function renderLoop() {
    animationFrame = requestAnimationFrame(renderLoop)
    if (ctx !== null) render(ctx)
  })()

  setTimeout(() => {
    cancelAnimationFrame(animationFrame)
  }, 1000)
}
