import { AnimatePresence, motion } from 'framer-motion'
import { Download } from 'lucide-react'
import { useEffect, useState } from 'react'
import { navLinks, profile } from '../data/profile'
import { useActiveSection } from '../hooks/useActiveSection'
import type { Theme } from '../hooks/useTheme'
import { EASE } from '../lib/motion'
import { Magnetic } from './Magnetic'
import { ThemeToggle } from './ThemeToggle'

const sectionIds = navLinks.map((l) => l.id)

interface Props {
  theme: Theme
  onToggleTheme: () => void
}

export function Navbar({ theme, onToggleTheme }: Props) {
  const active = useActiveSection(sectionIds)
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [hidden, setHidden] = useState(false)

  // Se masque en descendant, réapparaît en remontant.
  useEffect(() => {
    let last = window.scrollY
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 24)
      if (Math.abs(y - last) > 6) {
        setHidden(y > last && y > 400)
        last = y
      }
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Verrouille le scroll et gère Échap quand le panneau mobile est ouvert.
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <>
    <header
      className={`fixed inset-x-0 top-0 z-[60] transition-all duration-300 ${hidden && !open ? '-translate-y-full' : ''} ${
        scrolled ? 'border-b border-line bg-bg/70 backdrop-blur-lg' : 'border-b border-transparent'
      }`}
    >
      <nav
        aria-label="Navigation principale"
        className="container-x flex h-16 items-center justify-between md:h-20"
      >
        <a
          href="#top"
          aria-label="Retour en haut de page"
          className="font-display text-xl font-bold tracking-tightest"
        >
          {profile.initials}
          <span className="text-accent-fg">.</span>
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <li key={link.id} className="relative">
              <a
                href={`#${link.id}`}
                aria-current={active === link.id ? 'true' : undefined}
                className={`py-2 text-sm font-medium transition-colors hover:text-fg ${
                  active === link.id ? 'text-fg' : 'text-muted'
                }`}
              >
                {link.label}
              </a>
              {active === link.id && (
                <motion.span
                  layoutId="nav-underline"
                  className="absolute -bottom-0.5 left-0 right-0 h-0.5 rounded-full bg-accent"
                  transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                />
              )}
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <ThemeToggle theme={theme} onToggle={onToggleTheme} />
          <Magnetic className="hidden md:inline-block">
            <a
              href={profile.cvUrl}
              download={profile.cvFileName}
              className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-sm font-medium text-white"
            >
              <Download size={16} aria-hidden="true" /> CV
            </a>
          </Magnetic>

          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="relative z-[60] grid h-10 w-10 place-items-center rounded-full border border-line md:hidden"
          >
            <span className="relative block h-3.5 w-5">
              <motion.span
                className="absolute left-0 top-0 h-0.5 w-5 rounded bg-fg"
                animate={open ? { y: 6, rotate: 45 } : { y: 0, rotate: 0 }}
              />
              <motion.span
                className="absolute left-0 top-[6px] h-0.5 w-5 rounded bg-fg"
                animate={{ opacity: open ? 0 : 1 }}
              />
              <motion.span
                className="absolute left-0 top-[12px] h-0.5 w-5 rounded bg-fg"
                animate={open ? { y: -6, rotate: -45 } : { y: 0, rotate: 0 }}
              />
            </span>
          </button>
        </div>
      </nav>
    </header>

      {/* Hors du <header> : backdrop-filter y créerait un contexte qui casserait position:fixed */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              key="backdrop"
              className="fixed inset-0 z-[54] bg-black/50 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />
            <motion.div
              key="panel"
              id="mobile-menu"
              data-lenis-prevent
              className="fixed inset-y-0 right-0 z-[55] flex w-4/5 max-w-sm flex-col border-l border-line bg-bg px-8 pb-10 pt-24 md:hidden"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.4, ease: EASE }}
            >
              <motion.ul
                className="flex flex-1 flex-col gap-2"
                initial="hidden"
                animate="show"
                variants={{ hidden: {}, show: { transition: { staggerChildren: 0.07, delayChildren: 0.15 } } }}
              >
                {navLinks.map((link) => (
                  <motion.li
                    key={link.id}
                    variants={{ hidden: { opacity: 0, x: 24 }, show: { opacity: 1, x: 0 } }}
                  >
                    <a
                      href={`#${link.id}`}
                      onClick={() => setOpen(false)}
                      className={`block py-3 font-display text-3xl font-bold ${
                        active === link.id ? 'text-accent-fg' : 'text-fg'
                      }`}
                    >
                      {link.label}
                    </a>
                  </motion.li>
                ))}
              </motion.ul>
              <a
                href={profile.cvUrl}
                download={profile.cvFileName}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-5 py-3 font-medium text-white"
              >
                <Download size={18} aria-hidden="true" /> Télécharger mon CV
              </a>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
