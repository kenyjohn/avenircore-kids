import { readFileSync, readdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import mdx from '@mdx-js/rollup'
import sitemap from 'vite-plugin-sitemap'

const __dirname = dirname(fileURLToPath(import.meta.url))

/** Serve /llms.txt as UTF-8 explicitly (some browsers show a blank page for text/plain without charset). */
function llmsTxtUtf8Plugin() {
  return {
    name: 'llms-txt-utf8',
    enforce: 'pre',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const pathOnly = req.url?.split('?')[0]
        if (pathOnly !== '/llms.txt') return next()
        try {
          const body = readFileSync(resolve(__dirname, 'public/llms.txt'), 'utf8')
          res.setHeader('Content-Type', 'text/plain; charset=utf-8')
          res.setHeader('X-Content-Type-Options', 'nosniff')
          res.end(body)
        } catch {
          next()
        }
      })
    },
    configurePreviewServer(server) {
      server.middlewares.use((req, res, next) => {
        const pathOnly = req.url?.split('?')[0]
        if (pathOnly !== '/llms.txt') return next()
        const outDir =
          server.config.environments?.client?.build?.outDir ??
          server.config.build.outDir
        const file = resolve(server.config.root, outDir, 'llms.txt')
        try {
          const body = readFileSync(file, 'utf8')
          res.setHeader('Content-Type', 'text/plain; charset=utf-8')
          res.setHeader('X-Content-Type-Options', 'nosniff')
          res.end(body)
        } catch {
          next()
        }
      })
    },
  }
}

export default defineConfig({
  plugins: [
    llmsTxtUtf8Plugin(),
    mdx({ providerImportSource: '@mdx-js/react' }),
    react(),
    sitemap({
      hostname: 'https://avenircore.com',
      generateRobotsTxt: false,
      dynamicRoutes: (() => {
        const routes = [
          '/about', '/contact', '/workbook', '/stories', '/privacy', '/terms', '/blog'
        ]

        // Auto-detect blog posts from src/posts/
        const postFiles = readdirSync(resolve(__dirname, 'src/posts'))
          .filter(file => file.endsWith('.mdx'))
          .map(file => `/blog/${file.replace('.mdx', '')}`)
        
        // Auto-detect stories from src/data/stories/
        const storyFiles = readdirSync(resolve(__dirname, 'src/data/stories'))
          .filter(file => file.endsWith('.json'))
          .map(file => `/stories/${file.replace('.json', '')}`)

        return [...routes, ...postFiles, ...storyFiles]
      })(),
    }),
  ],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '/api'),
      },
    },
  },
})
