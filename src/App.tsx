import { MotionConfig } from 'framer-motion'
import { CursorGlow } from './components/CursorGlow'
import { Marquee } from './components/Marquee'
import { Navbar } from './components/Navbar'
import { Preloader } from './components/Preloader'
import { ScrollProgress } from './components/ScrollProgress'
import { useLenis } from './hooks/useLenis'
import { useTheme } from './hooks/useTheme'
import { About } from './sections/About'
import { Certifications } from './sections/Certifications'
import { Contact } from './sections/Contact'
import { Experience } from './sections/Experience'
import { Footer } from './sections/Footer'
import { Hero } from './sections/Hero'
import { Languages } from './sections/Languages'
import { Leadership } from './sections/Leadership'
import { Projects } from './sections/Projects'
import { Skills } from './sections/Skills'

export default function App() {
  const { theme, toggle } = useTheme()
  useLenis()

  return (
    // reducedMotion="user" : désactive les animations de transform si l'OS le demande.
    <MotionConfig reducedMotion="user">
      <Preloader />
      <ScrollProgress />
      <CursorGlow />
      <a
        href="#about"
        className="sr-only z-[100] rounded-md bg-accent px-4 py-2 text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Aller au contenu
      </a>
      <Navbar theme={theme} onToggleTheme={toggle} />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Leadership />
        <Certifications />
        <Languages />
        <Contact />
      </main>
      <Footer />
    </MotionConfig>
  )
}
