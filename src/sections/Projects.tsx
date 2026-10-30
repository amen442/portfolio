import { motion } from 'framer-motion'
import { ArrowUpRight, Github, Star, Users } from 'lucide-react'
import { Reveal } from '../components/Reveal'
import { SectionHeading } from '../components/SectionHeading'
import { TiltCard } from '../components/TiltCard'
import { projects, type Project } from '../data/profile'

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <Reveal
      delay={(index % 2) * 0.1}
      className={project.featured ? 'md:col-span-2' : undefined}
    >
      <TiltCard className="h-full [transform-style:preserve-3d]">
        <motion.article
          initial="rest"
          whileHover="hover"
          whileFocus="hover"
          animate="rest"
          className={`spotlight group relative flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-surface p-6 transition-colors duration-300 hover:border-accent-fg/50 md:p-8 ${
            project.featured ? 'md:min-h-[320px]' : ''
          }`}
        >
          {/* Overlay dégradé au survol */}
          <motion.div
            aria-hidden="true"
            variants={{ rest: { opacity: 0 }, hover: { opacity: 1 } }}
            transition={{ duration: 0.3 }}
            className="pointer-events-none absolute inset-0 bg-gradient-to-br from-accent/15 via-transparent to-accent/5"
          />

          <div className="relative flex items-start justify-between gap-4">
            <span
              aria-hidden="true"
              className="font-display text-5xl font-bold text-line transition-colors duration-300 group-hover:text-accent-fg/60 md:text-6xl"
            >
              {String(index + 1).padStart(2, '0')}
            </span>
            <div className="flex flex-col items-end gap-2 text-right">
              <span className="rounded-full border border-line px-3 py-1 text-xs font-medium text-muted">
                {project.category}
              </span>
              {project.badge && (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-accent px-3 py-1 text-xs font-semibold text-white">
                  <Star size={12} aria-hidden="true" /> {project.badge}
                </span>
              )}
            </div>
          </div>

          <div className="relative mt-8 flex-1">
            <h3 className="text-2xl font-bold md:text-3xl">{project.title}</h3>
            <p className="mt-3 text-base leading-relaxed text-muted">{project.description}</p>
            <ul className="mt-4 space-y-1.5 text-base text-muted">
              {project.details.map((d) => (
                <li key={d} className="flex gap-3">
                  <span
                    aria-hidden="true"
                    className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                  />
                  {d}
                </li>
              ))}
            </ul>
            {project.team && (
              <p className="mt-4 inline-flex items-center gap-2 text-sm text-muted">
                <Users size={16} aria-hidden="true" className="text-accent-fg" />
                {project.team.join(' · ')}
              </p>
            )}
          </div>

          <div className="relative mt-6 flex flex-wrap items-center justify-between gap-4">
            <ul className="flex flex-wrap gap-2" aria-label="Technologies">
              {project.tech.map((t) => (
                <li
                  key={t}
                  className="rounded-md bg-fg/5 px-2.5 py-1 font-mono text-xs text-fg/80"
                >
                  {t}
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap items-center gap-3">
              {project.github && (
                <motion.a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  variants={{
                    rest: { opacity: 0.0, x: 20 },
                    hover: { opacity: 1, x: 0 },
                  }}
                  transition={{ duration: 0.3 }}
                  className="inline-flex items-center gap-1.5 rounded-full border border-line px-4 py-2 text-sm font-medium text-fg transition-colors hover:border-accent-fg/50 focus-visible:!opacity-100 [@media(hover:none)]:!opacity-100"
                >
                  <Github size={16} aria-hidden="true" />
                  GitHub
                  <span className="sr-only"> — {project.title} (nouvel onglet)</span>
                </motion.a>
              )}

              {project.link && (
                <motion.a
                  href={project.link.href || undefined}
                  aria-disabled={!project.link.href}
                  title={project.link.href ? undefined : 'Lien à venir'}
                  target="_blank"
                  rel="noopener noreferrer"
                  variants={{
                    rest: { opacity: 0.0, x: 20 },
                    hover: { opacity: 1, x: 0 },
                  }}
                  transition={{ duration: 0.3 }}
                  // Toujours visible au clavier / sur tactile (pas de survol disponible)
                  className={`inline-flex items-center gap-1.5 rounded-full bg-accent px-4 py-2 text-sm font-medium text-white focus-visible:!opacity-100 [@media(hover:none)]:!opacity-100 ${
                    project.link.href ? '' : 'cursor-not-allowed saturate-50'
                  }`}
                >
                  {project.link.label}
                  <ArrowUpRight size={16} aria-hidden="true" />
                  <span className="sr-only"> — {project.title} (nouvel onglet)</span>
                </motion.a>
              )}
            </div>
          </div>
        </motion.article>
      </TiltCard>
    </Reveal>
  )
}

export function Projects() {
  return (
    <section id="projects" aria-labelledby="projects-title" className="section-y">
      <div className="container-x">
        <SectionHeading number="03" label="Projects" title="Projets sélectionnés" id="projects-title" />
        <div className="grid gap-6 md:grid-cols-2 md:gap-8">
          {projects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
