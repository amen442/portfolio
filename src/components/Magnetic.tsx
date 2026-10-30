import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion'
import type { MouseEvent, ReactNode } from 'react'

interface Props {
  children: ReactNode
  /** Fraction du déplacement du curseur appliquée à l'élément. */
  strength?: number
  className?: string
}

/** L'élément est légèrement attiré par le curseur quand celui-ci s'approche. */
export function Magnetic({ children, strength = 0.35, className = '' }: Props) {
  const reduced = useReducedMotion()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 220, damping: 16, mass: 0.25 })
  const sy = useSpring(y, { stiffness: 220, damping: 16, mass: 0.25 })

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    if (reduced) return
    const r = e.currentTarget.getBoundingClientRect()
    x.set((e.clientX - (r.left + r.width / 2)) * strength)
    y.set((e.clientY - (r.top + r.height / 2)) * strength)
  }
  const reset = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      style={{ x: sx, y: sy }}
      onMouseMove={onMove}
      onMouseLeave={reset}
      className={`inline-block ${className}`}
    >
      {children}
    </motion.div>
  )
}
