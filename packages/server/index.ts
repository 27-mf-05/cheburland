import React from 'react'

// import cookieParser from 'cookie-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import * as fs from 'fs'
import { createProxyMiddleware } from 'http-proxy-middleware'
import * as path from 'path'
import type { ViteDevServer } from 'vite'
import { createServer as createViteServer } from 'vite'

import topicRoutes from './orm/routes/topicRoutes/topicRoutes'
import { dbConnect } from './orm/sequelizeInit'
React.useLayoutEffect = React.useEffect

dotenv.config()
const isDev = () => process.env.NODE_ENV === 'development'
const serverPort = Number(process.env.SERVER_PORT) || 3000

async function startServer() {
  const app = express()
  let vite: ViteDevServer | undefined

  const clientPath = path.dirname(require.resolve('/client'))
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

  // app.get('/api', (_, res) => {
  //   res.json('👋 Howdy from the server :)')
  // })

  app.use(
    '/api/v2',
    createProxyMiddleware({
      changeOrigin: true,
      cookieDomainRewrite: {
        '*': '',
      },
      target: 'https://ya-praktikum.tech',
    })
  )

  if (!isDev()) {
    app.use('/assets', express.static(path.resolve(distPath, 'assets')))
  }
  await dbConnect()

  app.use(express.json())
  app.use('/topic', topicRoutes)

  app.use('*', async (req, res, next) => {
    const url = req.originalUrl
    interface SSRModule {
      render: (req: express.Request) => Promise<string>
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
      const [initialState, appHtml] = await render(req)

      const storeData = JSON.stringify(initialState).replace(/</g, '\\u003c')

      const html = template
        .replace(`<!--ssr-outlet-->`, appHtml)
        .replace(
          '<!--store-data-->',
          `<script>window.__PRELOADED_STATE__ = ${storeData}</script>`
        )

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
