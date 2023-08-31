import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import * as fs from 'fs'
import * as path from 'path'
import type { ViteDevServer } from 'vite'
import { createServer as createViteServer } from 'vite'

dotenv.config()
const isDev = () => process.env.NODE_ENV === 'development'
const serverPort = Number(process.env.SERVER_PORT) || 3000

async function startServer() {
  const app = express()
  let vite: ViteDevServer | undefined

  const clientPath = path.dirname(require.resolve('client'))
  const distPath = path.dirname(
    require.resolve(`${clientPath}/dist/index.html`)
  )
  const ssrPath = require.resolve(`${clientPath}/dist-ssr/ssr.cjs`)

  app.use(cors())

  if (isDev()) {
    vite = await createViteServer({
      server: { middlewareMode: true },
      root: clientPath,
      appType: 'custom',
    })

    app.use(vite.middlewares)
  }

  app.get('/api', (_, res) => {
    res.json('👋 Howdy from the server :)')
  })

  if (!isDev()) {
    app.use('/assets', express.static(path.resolve(distPath, 'assets')))
  }

  app.use('*', async (req, res, next) => {
    const url = req.originalUrl
    interface SSRModule {
      render: (uri: express.Request) => Promise<string>
    }

    let module: SSRModule
    let template: string

    try {
      if (!isDev()) {
        template = fs.readFileSync(
          path.resolve(distPath, 'index.html'),
          'utf-8'
        )
      } else {
        template = fs.readFileSync(
          path.resolve(clientPath, 'index.html'),
          'utf-8'
        )

        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        template = await vite!.transformIndexHtml(url, template)
      }

      if (isDev()) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        module = (await vite!.ssrLoadModule(
          path.resolve(clientPath, 'ssr.tsx')
        )) as SSRModule
      } else {
        module = await import(ssrPath)
      }

      const { render } = module
      const appHtml = await render(req)

      const html = template.replace(`<!--ssr-outlet-->`, appHtml)
      res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
    } catch (e) {
      if (isDev()) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        vite!.ssrFixStacktrace(e as Error)
      }
      next(e)
    }
  })

  app.listen(serverPort, () => {
    console.log(`  ➜ 🎸 Server is listening on port: ${serverPort}`)
  })
}

startServer()
