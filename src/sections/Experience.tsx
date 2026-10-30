import { motion, useReducedMotion, useScroll, useSpring } from 'framer-motion'
import { Briefcase, CalendarDays } from 'lucide-react'
import { useRef } from 'react'
import { Reveal } from '../components/Reveal'
import { SectionHeading } from '../components/SectionHeading'
import { experiences } from '../data/profile'
import { EASE, viewportOnce } from '../lib/motion'

export function Experience() {
  const listRef = useRef<HTMLOListElement>(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: listRef, offset: ['start 75%', 'end 60%'] })
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.3 })

  return (
    <section id="experience" aria-labelledby="experience-title" className="section-y">
      <div className="container-x">
        <SectionHeading
          number="02"
          label="Experience"
          title="Expérience professionnelle"
          id="experience-title"
        />

        <ol ref={listRef} className="relative">
          {/* Ligne de fond + ligne qui se dessine au scroll */}
          <div
            aria-hidden="true"
            className="absolute bottom-0 left-4 top-0 w-px -translate-x-1/2 bg-line md:left-1/2"
          />
          <motion.div
            aria-hidden="true"
            style={{ scaleY: reduced ? 1 : scaleY }}
            className="absolute bottom-0 left-4 top-0 w-px origin-top -translate-x-1/2 bg-accent md:left-1/2"
          />

          {experiences.map((exp, i) => {
            const fromLeft = i % 2 === 0
            return (
              <li
                key={exp.company}
                className="relative pb-12 pl-12 last:pb-0 md:grid md:grid-cols-2 md:gap-20 md:pl-0"
              >
                <motion.span
                  aria-hidden="true"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={viewportOnce}
                  transition={{ duration: 0.4, ease: EASE, delay: 0.15 }}
                  className="absolute left-4 top-8 h-4 w-4 -translate-x-1/2 animate-dot-pulse rounded-full border-4 border-bg bg-accent md:left-1/2"
                />

                <Reveal
                  x={fromLeft ? -48 : 48}
                  y={0}
                  className={fromLeft ? 'md:col-start-1' : 'md:col-start-2'}
                >
                  <article className="spotlight overflow-hidden rounded-2xl border border-line bg-surface p-6 transition-all duration-300 hover:-translate-y-1 hover:scale-[1.015] hover:border-accent-fg/40 hover:shadow-xl hover:shadow-accent/10 md:p-8">
                    <p className="mb-3 inline-flex items-center gap-2 text-sm text-muted">
                      <CalendarDays size={16} aria-hidden="true" className="text-accent-fg" />
                      {exp.period}
                    </p>
                    <h3 className="text-2xl font-bold">{exp.company}</h3>
                    <p className="mb-5 mt-1 inline-flex items-center gap-2 font-medium text-accent-fg">
                      <Briefcase size={16} aria-hidden="true" />
                      {exp.role}
                    </p>
                    <ul className="space-y-3 text-base text-muted">
                      {exp.highlights.map((h) => (
                        <li key={h} className="flex gap-3 leading-relaxed">
                          <span
                            aria-hidden="true"
                            className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                          />
                          {h}
                        </li>
                      ))}
                    </ul>
                  </article>
                </Reveal>
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
