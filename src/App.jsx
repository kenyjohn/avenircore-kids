import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Hero from './components/Hero'
import AudienceSection from './components/AudienceSection'
import FeaturedStories from './components/FeaturedStories'
import SocialProof from './components/SocialProof'
import HowItWorks from './components/HowItWorks'
import ValuesCharter from './components/ValuesCharter'
import FutureRoadmap from './components/FutureRoadmap'
import WorkbookCTA from './components/WorkbookCTA'
import EmailCapture from './components/EmailCapture'
import Footer from './components/Footer'

const BlogIndex = lazy(() => import('./pages/BlogIndex'))
const BlogPost  = lazy(() => import('./pages/BlogPost'))
const Privacy   = lazy(() => import('./pages/Privacy'))
const Terms     = lazy(() => import('./pages/Terms'))
const PillarPage = lazy(() => import('./pages/PillarPage'))
const TeacherHub = lazy(() => import('./pages/TeacherHub'))
const About      = lazy(() => import('./pages/About'))
const NotFound  = lazy(() => import('./pages/NotFound'))
const StoriesIndex = lazy(() => import('./pages/StoriesIndex'))
const StoryPlayer  = lazy(() => import('./components/story/StoryPlayer'))
const Contact      = lazy(() => import('./pages/Contact'))
const WorkbookPage = lazy(() => import('./pages/WorkbookPage'))

function HomePage() {
  return (
    <>
      <Hero />
      <SocialProof />
      <FeaturedStories />
      <AudienceSection />
      <HowItWorks />
      <ValuesCharter />
      <FutureRoadmap />
      <WorkbookCTA />
      <EmailCapture />
    </>
  )
}

function App() {
  return (
    <>
      <Header />
      <main>
        <Suspense fallback={
          <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>🌱</div>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem' }}>Loading...</p>
            </div>
          </div>
        }>
          <Routes>
            <Route path="/"           element={<HomePage />} />
            <Route path="/blog"       element={<BlogIndex />} />
            <Route path="/blog/ai-for-kids-guide" element={<PillarPage />} />
            <Route path="/blog/teachers-ai-guide" element={<TeacherHub />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/about"      element={<About />} />
            <Route path="/privacy"    element={<Privacy />} />
            <Route path="/terms"      element={<Terms />} />
            <Route path="/stories"    element={<StoriesIndex />} />
            <Route path="/stories/:id" element={<StoryPlayer />} />
            <Route path="/workbook"   element={<WorkbookPage />} />
            <Route path="/contact"    element={<Contact />} />
            <Route path="*"           element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </>
  )
}

export default App
