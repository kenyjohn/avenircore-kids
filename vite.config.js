import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import mdx from '@mdx-js/rollup'
import sitemap from 'vite-plugin-sitemap'

export default defineConfig({
  plugins: [
    mdx(),
    react(),
    sitemap({
      hostname: 'https://avenircore.com',
      dynamicRoutes: [
        '/blog',
        '/blog/is-ai-safe-for-kids',
        '/blog/how-to-talk-to-kids-about-ai',
        '/blog/free-ai-tools-for-kids-2026',
        '/blog/what-age-can-kids-use-ai',
        '/blog/ai-for-kids-uk',
        '/blog/will-ai-make-kids-lazy',
      ],
    }),
  ],
})
