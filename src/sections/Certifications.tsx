import { motion } from 'framer-motion'
import { Award, ExternalLink } from 'lucide-react'
import { SectionHeading } from '../components/SectionHeading'
import { certificationGroups } from '../data/profile'
import { iconMap } from '../lib/icons'
import { fadeUp, stagger, viewportOnce } from '../lib/motion'

export function Certifications() {
  return (
    <section id="certifications" aria-labelledby="certs-title" className="py-16 md:py-24">
      <div className="container-x">
        <SectionHeading number="06" label="Certifications" title="Certifications" id="certs-title" />

        <motion.div
          className="grid gap-6 md:grid-cols-2"
          variants={stagger(0.12)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
        >
          {certificationGroups.map((group) => {
            const Icon = iconMap[group.icon]
            return (
              <motion.article
                key={group.organization}
                variants={fadeUp}
                whileHover={{ y: -6 }}
                transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                className={`spotlight overflow-hidden rounded-3xl border bg-surface p-6 transition-colors duration-300 hover:border-accent-fg/50 hover:shadow-xl hover:shadow-accent/10 md:p-8 ${
                  group.featured
                    ? 'border-accent/40 md:col-span-2'
                    : 'border-line'
                }`}
              >
                <header className="mb-6 flex items-center gap-4">
                  <span
                    className={`grid h-12 w-12 shrink-0 place-items-center rounded-2xl ${
                      group.featured ? 'bg-accent text-white' : 'bg-accent/10 text-accent-fg'
                    }`}
                  >
                    <Icon size={24} aria-hidden="true" />
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-xl font-bold md:text-2xl">{group.organization}</h3>
                    {group.category && (
                      <p className="text-sm font-medium text-accent-fg">{group.category}</p>
                    )}
                  </div>
                  {group.featured && (
                    <span className="ml-auto hidden rounded-full bg-accent px-3 py-1 text-xs font-semibold text-white sm:inline-block">
                      À la une
                    </span>
                  )}
                </header>

                <ul
                  className={`grid gap-3 ${group.featured ? 'lg:grid-cols-3' : 'sm:grid-cols-1'}`}
                >
                  {group.certs.map((cert) => (
                    <li
                      key={cert.name}
                      className="flex flex-col justify-between gap-3 rounded-xl border border-line bg-bg px-4 py-3.5"
                    >
                      <span className="flex items-start gap-2.5 text-base leading-snug">
                        <Award
                          size={18}
                          aria-hidden="true"
                          className="mt-0.5 shrink-0 text-accent-fg"
                        />
                        {cert.name}
                      </span>
                      <a
                        href={cert.href || undefined}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-disabled={!cert.href}
                        title={cert.href ? undefined : 'Lien à venir'}
                        className={`inline-flex w-fit items-center gap-1.5 text-sm font-medium text-accent-fg ${
                          cert.href ? 'link-underline' : 'cursor-not-allowed opacity-50'
                        }`}
                      >
                        Voir le diplôme
                        <ExternalLink size={14} aria-hidden="true" />
                        <span className="sr-only"> — {cert.name}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.article>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
