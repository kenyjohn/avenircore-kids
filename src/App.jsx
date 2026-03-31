import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Hero from './components/Hero'
import StatsStrip from './components/StatsStrip'
import ValuesPillars from './components/ValuesPillars'
import HowItWorks from './components/HowItWorks'
import ValuesCharter from './components/ValuesCharter'
import FutureRoadmap from './components/FutureRoadmap'
import WorkbookCTA from './components/WorkbookCTA'
import EmailCapture from './components/EmailCapture'
import Footer from './components/Footer'
import BlogIndex from './pages/BlogIndex'
import BlogPost from './pages/BlogPost'

function HomePage() {
  return (
    <>
      <Hero />
      <StatsStrip />
      <ValuesPillars />
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
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/blog" element={<BlogIndex />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}

export default App
