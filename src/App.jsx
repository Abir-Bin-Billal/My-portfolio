import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { profile } from './data/portfolio'
import AuroraBackground from './components/ui/AuroraBackground'
import CursorGlow from './components/ui/CursorGlow'
import Preloader from './components/ui/Preloader'
import ScrollProgress from './components/ui/ScrollProgress'
import SocialRail from './components/ui/SocialRail'
import Navbar from './components/sections/Navbar'
import Hero from './components/sections/Hero'
import About from './components/sections/About'
import Skills from './components/sections/Skills'
import Experience from './components/sections/Experience'
import Projects from './components/sections/Projects'
import Services from './components/sections/Services'
import Contact from './components/sections/Contact'
import Footer from './components/sections/Footer'
import { FiArrowUp } from './components/Icons'
import { useScrollSpyProgress, useSmoothScroll } from './hooks/usePortfolio'

export default function App() {
  const [loading, setLoading] = useState(true)
  const progress = useScrollSpyProgress()
  const scrollTo = useSmoothScroll()

  useEffect(() => {
    document.documentElement.lang = 'en'
    document.title = `${profile.name} — ${profile.role}`
  }, [])

  return (
    <>
      <AnimatePresence>{loading && <Preloader onDone={() => setLoading(false)} />}</AnimatePresence>

      <AuroraBackground />
      <CursorGlow />
      <ScrollProgress />
      <SocialRail />
      <Navbar />

      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Services />
        <Contact />
      </main>

      <Footer />

      <AnimatePresence>
        {progress > 0.12 && (
          <motion.button
            type="button"
            onClick={() => scrollTo('home')}
            initial={{ opacity: 0, scale: 0.8, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 12 }}
            transition={{ duration: 0.3 }}
            aria-label="Back to top"
            className="fixed bottom-6 right-6 z-50 flex h-11 w-11 items-center justify-center rounded-full border border-white/12 bg-ink-900/80 text-slate-300 backdrop-blur-xl transition-colors duration-300 hover:border-brand-400/50 hover:text-brand-300"
          >
            <FiArrowUp className="h-4 w-4" />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  )
}
