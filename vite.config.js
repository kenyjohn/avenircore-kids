import { readFileSync } from 'node:fs'
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
      dynamicRoutes: [
        // Core pages
        '/about',
        '/contact',
        '/workbook',
        '/stories',
        '/privacy',
        '/terms',
        // Blog articles
        '/blog',
        '/blog/ai-for-kids-guide',
        '/blog/teachers-ai-guide',
        '/blog/ai-classroom-safety-guide',
        '/blog/detect-ai-homework-guide',
        '/blog/ai-lesson-planning-for-teachers',
        '/blog/ai-prompts-for-group-work',
        '/blog/is-ai-safe-for-kids',
        '/blog/how-to-talk-to-kids-about-ai',
        '/blog/free-ai-tools-for-kids-2026',
        '/blog/what-age-can-kids-use-ai',
        '/blog/will-ai-make-kids-lazy',
        // Stories — original 5
        '/stories/curious-robot',
        '/stories/smart-assistant',
        '/stories/data-detective',
        '/stories/kind-ai',
        '/stories/ai-mistake',
        // Stories — 5 new ethical AI (Issue #12)
        '/stories/the-robot-that-couldnt-see-amara',
        '/stories/mia-and-the-weather-machine',
        '/stories/the-news-bot-that-lied',
        '/stories/zara-builds-a-doctor',
        '/stories/the-privacy-jar',
        '/stories/the-day-leo-stopped-thinking',
      ],
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
