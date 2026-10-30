import { AnimatePresence, animate, motion, useReducedMotion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { profile } from '../data/profile'

/** Écran d'intro : compteur 0→100 puis rideau qui se lève. Durée ≈ INTRO_DELAY. */
export function Preloader() {
  const reduced = useReducedMotion()
  const [done, setDone] = useState(!!reduced)
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (reduced) return
    const controls = animate(0, 100, {
      duration: 1.1,
      ease: 'easeInOut',
      onUpdate: (v) => setCount(Math.round(v)),
      onComplete: () => window.setTimeout(() => setDone(true), 150),
    })
    return () => controls.stop()
  }, [reduced])

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          role="status"
          aria-label="Chargement"
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center gap-6 bg-bg"
          exit={{ y: '-100%' }}
          transition={{ duration: 0.75, ease: [0.76, 0, 0.24, 1] }}
        >
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="font-display text-7xl font-bold tracking-tightest md:text-9xl"
          >
            {profile.initials}
            <span className="text-accent-fg">.</span>
          </motion.p>
          <div className="h-px w-48 overflow-hidden bg-line">
            <div className="h-full origin-left bg-accent" style={{ transform: `scaleX(${count / 100})` }} />
          </div>
          <p className="font-display text-sm tabular-nums text-muted">{count}%</p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
