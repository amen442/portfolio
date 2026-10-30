import { motion } from 'framer-motion'
import { Reveal } from '../components/Reveal'
import { SectionHeading } from '../components/SectionHeading'
import { languages } from '../data/profile'
import { EASE, viewportOnce } from '../lib/motion'

const SEGMENTS = 6

export function Languages() {
  return (
    <section id="languages" aria-labelledby="languages-title" className="py-16 md:py-24">
      <div className="container-x">
        <SectionHeading number="07" label="Languages" title="Langues" id="languages-title" />

        <ul className="grid gap-8 md:grid-cols-3">
          {languages.map((lang, i) => (
            <Reveal as="li" key={lang.name} delay={i * 0.1}>
              <div className="mb-3 flex items-baseline justify-between">
                <h3 className="text-xl font-bold">{lang.name}</h3>
                <span className="text-sm text-muted">{lang.level}</span>
              </div>
              <div
                role="img"
                aria-label={`${lang.name} : niveau ${lang.level}`}
                className="flex gap-1.5"
              >
                {Array.from({ length: SEGMENTS }, (_, s) => (
                  <motion.span
                    key={s}
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={viewportOnce}
                    transition={{ duration: 0.4, ease: EASE, delay: 0.2 + i * 0.1 + s * 0.06 }}
                    className={`h-2 flex-1 origin-left rounded-full ${
                      s < lang.score ? 'bg-accent' : 'bg-line'
                    }`}
                  />
                ))}
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
