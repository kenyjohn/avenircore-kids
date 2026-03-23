import Header from './components/Header';
import Hero from './components/Hero';
import StatsStrip from './components/StatsStrip';
import ValuesPillars from './components/ValuesPillars';
import HowItWorks from './components/HowItWorks';
import ValuesCharter from './components/ValuesCharter';
import FutureRoadmap from './components/FutureRoadmap';
import WorkbookCTA from './components/WorkbookCTA';
import EmailCapture from './components/EmailCapture';
import Footer from './components/Footer';

function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <StatsStrip />
        <ValuesPillars />
        <HowItWorks />
        <ValuesCharter />
        <FutureRoadmap />
        <WorkbookCTA />
        <EmailCapture />
      </main>
      <Footer />
    </>
  );
}

export default App;
