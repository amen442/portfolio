import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useEffect, useState } from 'react'

/**
 * Desktop uniquement (pointeur précis) :
 *  - halo lumineux qui suit la souris
 *  - anneau qui grossit au-dessus des éléments interactifs
 *  - alimente les variables --mx/--my des éléments `.spotlight`
 */
export function CursorGlow() {
  const [enabled, setEnabled] = useState(false)

  const x = useMotionValue(-600)
  const y = useMotionValue(-600)
  const glowX = useSpring(x, { stiffness: 90, damping: 22, mass: 0.6 })
  const glowY = useSpring(y, { stiffness: 90, damping: 22, mass: 0.6 })
  const ringX = useSpring(x, { stiffness: 420, damping: 32, mass: 0.3 })
  const ringY = useSpring(y, { stiffness: 420, damping: 32, mass: 0.3 })
  const scaleTarget = useMotionValue(1)
  const ringScale = useSpring(scaleTarget, { stiffness: 300, damping: 20 })

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return
    setEnabled(true)

    const onMove = (e: PointerEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
      const target = e.target instanceof Element ? e.target : null

      const card = target?.closest<HTMLElement>('.spotlight')
      if (card) {
        const r = card.getBoundingClientRect()
        card.style.setProperty('--mx', `${e.clientX - r.left}px`)
        card.style.setProperty('--my', `${e.clientY - r.top}px`)
      }

      const interactive = target?.closest('a, button, input, textarea, [role="button"]')
      scaleTarget.set(interactive ? 1.9 : 1)
    }
    const onLeave = () => {
      x.set(-600)
      y.set(-600)
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    document.documentElement.addEventListener('mouseleave', onLeave)
    return () => {
      window.removeEventListener('pointermove', onMove)
      document.documentElement.removeEventListener('mouseleave', onLeave)
    }
  }, [x, y, scaleTarget])

  if (!enabled) return null

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[150] overflow-hidden">
      <motion.div
        style={{ x: glowX, y: glowY }}
        className="absolute left-0 top-0 -ml-[260px] -mt-[260px] h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,rgb(var(--accent)/0.13),transparent_65%)]"
      />
      <motion.div
        style={{ x: ringX, y: ringY, scale: ringScale }}
        className="absolute left-0 top-0 -ml-3.5 -mt-3.5 h-7 w-7 rounded-full border border-accent-fg/70"
      />
    </div>
  )
}
