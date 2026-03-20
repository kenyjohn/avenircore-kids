import Header from './components/Header';
import Hero from './components/Hero';
import ValuesPillars from './components/ValuesPillars';
import HowItWorks from './components/HowItWorks';
import ValuesCharter from './components/ValuesCharter';
import FutureRoadmap from './components/FutureRoadmap';
import EmailCapture from './components/EmailCapture';
import Footer from './components/Footer';

function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <ValuesPillars />
        <HowItWorks />
        <ValuesCharter />
        <FutureRoadmap />
        <EmailCapture />
      </main>
      <Footer />
    </>
  )
}

export default App
