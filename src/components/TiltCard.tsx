import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion'
import type { MouseEvent, ReactNode } from 'react'

interface Props {
  children: ReactNode
  className?: string
  /** Amplitude max de la rotation, en degrés. */
  max?: number
}

/** Carte avec effet tilt 3D qui suit le curseur. */
export function TiltCard({ children, className, max = 8 }: Props) {
  const reduced = useReducedMotion()
  const px = useMotionValue(0.5)
  const py = useMotionValue(0.5)
  const spring = { stiffness: 220, damping: 22, mass: 0.4 }
  const rotateY = useSpring(useTransform(px, [0, 1], [-max, max]), spring)
  const rotateX = useSpring(useTransform(py, [0, 1], [max, -max]), spring)

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    if (reduced) return
    const rect = e.currentTarget.getBoundingClientRect()
    px.set((e.clientX - rect.left) / rect.width)
    py.set((e.clientY - rect.top) / rect.height)
  }
  const reset = () => {
    px.set(0.5)
    py.set(0.5)
  }

  return (
    <motion.div
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={reduced ? undefined : { rotateX, rotateY, transformPerspective: 900 }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
