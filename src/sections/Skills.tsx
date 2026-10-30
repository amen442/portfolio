import { motion } from 'framer-motion'
import { Reveal } from '../components/Reveal'
import { SectionHeading } from '../components/SectionHeading'
import { skillCategories } from '../data/profile'
import { fadeUp, stagger, viewportOnce } from '../lib/motion'
import { iconMap } from '../lib/icons'

export function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-title" className="section-y">
      <div className="container-x">
        <SectionHeading
          number="04"
          label="Skills"
          title="Compétences techniques"
          id="skills-title"
        />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {skillCategories.map((cat, i) => {
            const Icon = iconMap[cat.icon]
            return (
              <Reveal
                key={cat.name}
                delay={(i % 3) * 0.08}
                className="spotlight rounded-2xl border border-line bg-surface p-6"
              >
                <h3 className="mb-5 flex items-center gap-3 text-xl font-bold">
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-accent/10 text-accent-fg">
                    <Icon size={20} aria-hidden="true" />
                  </span>
                  {cat.name}
                </h3>
                <motion.ul
                  className="flex flex-wrap gap-2.5"
                  variants={stagger(0.06)}
                  initial="hidden"
                  whileInView="show"
                  viewport={viewportOnce}
                >
                  {cat.items.map((item) => (
                    <motion.li
                      key={item}
                      variants={fadeUp}
                      whileHover={{ y: -4, rotate: -3, scale: 1.04 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 18 }}
                      className="cursor-default rounded-full border border-line bg-bg px-4 py-1.5 text-sm font-medium transition-colors duration-200 hover:border-accent hover:text-accent-fg hover:shadow-md hover:shadow-accent/10"
                    >
                      {item}
                    </motion.li>
                  ))}
                </motion.ul>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
