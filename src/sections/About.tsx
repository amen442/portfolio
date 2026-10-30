import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { Counter } from '../components/Counter'
import { Reveal } from '../components/Reveal'
import { ScrollWords } from '../components/ScrollWords'
import { SectionHeading } from '../components/SectionHeading'
import { profile } from '../data/profile'

export function About() {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [40, -40])

  return (
    <section id="about" aria-labelledby="about-title" className="section-y">
      <div className="container-x">
        <SectionHeading number="01" label="About" title="À propos de moi" id="about-title" />

        <div ref={ref} className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <ScrollWords
              text={profile.about}
              className="font-display text-xl font-medium leading-snug md:text-2xl"
            />
          </div>

          <motion.div style={reduced ? undefined : { y }} className="lg:col-span-5">
            <dl className="grid grid-cols-3 gap-4 lg:grid-cols-1">
              {profile.stats.map((stat, i) => (
                <Reveal
                  key={stat.label}
                  delay={i * 0.1}
                  className="spotlight rounded-2xl border border-line bg-surface p-5 md:p-6 lg:flex lg:items-baseline lg:justify-between"
                >
                  <dd className="order-2 font-display text-4xl font-bold text-accent-fg md:text-6xl">
                    <Counter to={stat.value} suffix={stat.suffix} />
                  </dd>
                  <dt className="order-1 mt-1 text-sm text-muted md:text-base lg:mt-0">{stat.label}</dt>
                </Reveal>
              ))}
            </dl>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
