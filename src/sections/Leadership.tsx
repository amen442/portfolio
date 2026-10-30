import { motion, useReducedMotion } from 'framer-motion'
import { Reveal } from '../components/Reveal'
import { SectionHeading } from '../components/SectionHeading'
import { TiltCard } from '../components/TiltCard'
import { leadership, type Leadership as LeadershipItem } from '../data/profile'
import { iconMap } from '../lib/icons'
import { EASE, viewportOnce } from '../lib/motion'

const cardClass =
  'spotlight relative flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-surface p-6 transition-all duration-300 hover:border-accent-fg/40 hover:shadow-xl hover:shadow-accent/10 md:p-8'

/** Pastille d'icône avec halo pulsant. */
function IconBadge({ item, float }: { item: LeadershipItem; float?: boolean }) {
  const reduced = useReducedMotion()
  const Icon = iconMap[item.icon]
  return (
    <span className="relative grid h-14 w-14 place-items-center">
      {!reduced && (
        <motion.span
          aria-hidden="true"
          className="absolute inset-0 rounded-2xl bg-accent"
          animate={{ scale: [1, 1.5], opacity: [0.35, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeOut' }}
        />
      )}
      <motion.span
        className="relative grid h-14 w-14 place-items-center rounded-2xl bg-accent text-white shadow-lg shadow-accent/30"
        animate={float && !reduced ? { y: [0, -5, 0], rotate: [0, -6, 0] } : undefined}
        transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
        whileHover={{ rotate: 8, scale: 1.08 }}
      >
        <Icon size={26} aria-hidden="true" />
      </motion.span>
    </span>
  )
}

/** Parcours Media Manager → VP → Président : la ligne se dessine, puis chaque étape apparaît. */
function Progression({ steps }: { steps: string[] }) {
  return (
    <ol aria-label="Progression" className="relative mt-8 grid gap-4 sm:grid-cols-3">
      <motion.span
        aria-hidden="true"
        className="absolute left-0 top-[18px] hidden h-0.5 origin-left bg-gradient-to-r from-accent/20 via-accent to-accent sm:block"
        style={{ width: 'calc(100% - 2rem)', marginLeft: '1rem' }}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={viewportOnce}
        transition={{ duration: 1.1, ease: EASE, delay: 0.3 }}
      />
      {steps.map((step, i) => {
        const last = i === steps.length - 1
        return (
          <motion.li
            key={step}
            className="relative flex items-center gap-3 sm:flex-col sm:items-start"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.5, ease: EASE, delay: 0.35 + i * 0.3 }}
          >
            <span
              className={`relative grid h-9 w-9 shrink-0 place-items-center rounded-full border-2 text-sm font-bold ${
                last
                  ? 'border-accent bg-accent text-white shadow-lg shadow-accent/40'
                  : 'border-accent/50 bg-surface text-accent-fg'
              }`}
            >
              {i + 1}
            </span>
            <span className={`text-base font-semibold ${last ? 'text-fg' : 'text-muted'}`}>
              {step}
            </span>
          </motion.li>
        )
      })}
    </ol>
  )
}

function Points({ points }: { points: string[] }) {
  return (
    <ul className="mt-6 space-y-2.5 text-base text-muted">
      {points.map((p, i) => (
        <motion.li
          key={p}
          className="flex gap-3 leading-relaxed"
          initial={{ opacity: 0, x: -14 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.4, ease: EASE, delay: 0.2 + i * 0.1 }}
        >
          <span aria-hidden="true" className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
          {p}
        </motion.li>
      ))}
    </ul>
  )
}

/** Associations : pastilles qui "popent" en cascade. */
function Chips({ points }: { points: string[] }) {
  return (
    <ul className="mt-6 flex flex-wrap gap-3">
      {points.map((p, i) => {
        const match = p.match(/^(.*?)\s*\((.*)\)$/)
        const name = match ? match[1] : p
        const period = match?.[2]
        return (
          <motion.li
            key={p}
            className="group rounded-2xl border border-line bg-fg/[0.03] px-4 py-3 transition-colors hover:border-accent-fg/50 hover:bg-accent/10"
            initial={{ opacity: 0, scale: 0.6, y: 12 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ type: 'spring', stiffness: 260, damping: 18, delay: 0.2 + i * 0.12 }}
            whileHover={{ y: -4 }}
          >
            <span className="block text-base font-semibold">{name}</span>
            {period && <span className="text-sm text-muted">{period}</span>}
          </motion.li>
        )
      })}
    </ul>
  )
}

export function Leadership() {
  return (
    <section id="leadership" aria-labelledby="leadership-title" className="section-y">
      <div className="container-x">
        <SectionHeading
          number="05"
          label="Leadership"
          title="Leadership & entrepreneuriat"
          id="leadership-title"
        />

        <div className="grid gap-6 md:grid-cols-2 md:gap-8">
          {leadership.map((item, i) => {
            const featured = item.layout === 'featured'
            const chips = item.layout === 'chips'
            return (
              <Reveal
                key={item.title}
                y={28}
                scale={0.94}
                delay={i * 0.12}
                className={`h-full ${featured ? 'md:col-span-2' : ''}`}
              >
                <TiltCard max={featured ? 2 : 4} className="h-full">
                  <article className={cardClass}>
                    {featured && (
                      <span
                        aria-hidden="true"
                        className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-accent/15 blur-3xl"
                      />
                    )}

                    <div className="relative mb-6 flex items-center justify-between gap-4">
                      <IconBadge item={item} float={item.icon === 'rocket'} />
                      <span className="rounded-full border border-line px-3 py-1 text-sm text-muted">
                        {item.period}
                      </span>
                    </div>

                    <h3 className={`relative font-bold ${featured ? 'text-3xl' : 'text-2xl'}`}>
                      {item.title}
                    </h3>
                    <p className="relative mt-2 text-base text-muted">{item.organization}</p>

                    {item.progression && <Progression steps={item.progression} />}

                    {item.description && (
                      <p className="relative mt-6 text-base leading-relaxed text-muted">
                        {item.description}
                      </p>
                    )}

                    {item.points.length > 0 &&
                      (chips ? <Chips points={item.points} /> : <Points points={item.points} />)}
                  </article>
                </TiltCard>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
