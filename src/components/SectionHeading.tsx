import { motion } from 'framer-motion'
import { EASE, viewportOnce } from '../lib/motion'
import { Reveal } from './Reveal'

interface Props {
  number: string
  label: string
  title: string
  id?: string
}

export function SectionHeading({ number, label, title, id }: Props) {
  return (
    <div className="relative mb-12 md:mb-16">
      {/* Gros numéro contour en arrière-plan */}
      <motion.span
        aria-hidden="true"
        initial={{ opacity: 0, x: -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={viewportOnce}
        transition={{ duration: 0.8, ease: EASE }}
        className="text-outline pointer-events-none absolute -top-10 right-0 select-none font-display text-[7rem] font-bold leading-none md:-top-16 md:text-[13rem]"
      >
        {number}
      </motion.span>

      <Reveal className="relative z-10">
        <p className="mb-4 font-display text-sm font-medium uppercase tracking-[0.2em] text-accent-fg">
          {number} — {label}
        </p>
      </Reveal>
      {/* Le titre « monte » depuis un masque */}
      <h2
        id={id}
        className="relative z-10 overflow-hidden pb-2 text-3xl font-bold leading-tight md:text-5xl"
      >
        <motion.span
          className="block"
          initial={{ y: '110%' }}
          whileInView={{ y: '0%' }}
          viewport={viewportOnce}
          transition={{ duration: 0.75, ease: EASE }}
        >
          {title}
        </motion.span>
      </h2>
    </div>
  )
}
