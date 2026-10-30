import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { EASE, viewportOnce } from '../lib/motion'

interface Props {
  children: ReactNode
  className?: string
  delay?: number
  x?: number
  y?: number
  scale?: number
  as?: 'div' | 'li' | 'p' | 'span'
}

/** Apparition au scroll (une seule fois). Respecte prefers-reduced-motion via MotionConfig. */
export function Reveal({ children, className, delay = 0, x = 0, y = 24, scale = 1, as = 'div' }: Props) {
  const Component = motion[as]
  return (
    <Component
      className={className}
      initial={{ opacity: 0, x, y, scale }}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      viewport={viewportOnce}
      transition={{ duration: 0.55, ease: EASE, delay }}
    >
      {children}
    </Component>
  )
}
