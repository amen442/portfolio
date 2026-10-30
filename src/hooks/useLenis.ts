import { useReducedMotion } from 'framer-motion'
import Lenis from 'lenis'
import { useEffect } from 'react'

/** Scroll inertiel fluide. Désactivé si l'utilisateur préfère moins d'animations. */
export function useLenis() {
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced) return

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      // Les liens #ancre défilent en douceur, en tenant compte de la navbar fixe.
      anchors: { offset: -80 },
    })

    let raf = 0
    const loop = (time: number) => {
      lenis.raf(time)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(raf)
      lenis.destroy()
    }
  }, [reduced])
}
