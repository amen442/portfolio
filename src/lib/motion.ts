import type { Variants } from 'framer-motion'

export const EASE = [0.25, 0.1, 0.25, 1] as const

/** Délai (s) avant que les animations du hero démarrent : laisse le préloader se terminer. */
export const INTRO_DELAY = 1.5

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
}

export const stagger = (delay = 0.08, delayChildren = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: delay, delayChildren } },
})

export const viewportOnce = { once: true, margin: '0px 0px -80px 0px' } as const

export function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
