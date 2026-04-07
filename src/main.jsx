import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { Analytics } from '@vercel/analytics/react'
import './index.css'
import App from './App.jsx'

// `http://host:port//blog/...` yields pathname `//blog/...`, which does not match `/blog/:slug`.
const { pathname, search, hash } = window.location
const normalizedPath = pathname.replace(/\/+/g, '/') || '/'
if (normalizedPath !== pathname) {
  window.history.replaceState(null, '', normalizedPath + search + hash)
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <App />
        <Analytics />
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>
)
