import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, ChevronDown, Download, MapPin } from 'lucide-react'
import { useRef, type PointerEvent } from 'react'
import profileImg from '../assets/profile.jpg'
import { Magnetic } from '../components/Magnetic'
import { profile } from '../data/profile'
import { useTypewriter } from '../hooks/useTypewriter'
import { EASE, INTRO_DELAY } from '../lib/motion'

const words = profile.name.split(' ')
const orbitChips = ['React', 'Node.js', 'PHP', 'SQL', 'AI', 'MongoDB']

const charVariants = {
  hidden: { opacity: 0, y: '60%', rotateX: -40 },
  show: { opacity: 1, y: '0%', rotateX: 0, transition: { duration: 0.5, ease: EASE } },
}

const GRID_MASK_BASE = '[mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_75%)]'
const GRID_MASK_SPOT =
  '[mask-image:radial-gradient(220px_circle_at_var(--hx,50%)_var(--hy,40%),black,transparent)]'

function GridLayer({ id, className }: { id: string; className: string }) {
  return (
    <svg className={`absolute inset-0 h-full w-full ${className}`} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id={id} width="56" height="56" patternUnits="userSpaceOnUse">
          <path d="M56 0H0V56" fill="none" stroke="currentColor" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  )
}

function GridBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {/* Grille de base qui pulse doucement */}
      <GridLayer id="hero-grid" className={`animate-grid-pulse text-fg/10 ${GRID_MASK_BASE}`} />
      {/* Même grille, mais illuminée en accent autour du curseur */}
      <GridLayer id="hero-grid-lit" className={`text-accent-fg/80 ${GRID_MASK_SPOT}`} />
      <div className="absolute left-1/2 top-1/3 h-[480px] w-[480px] -translate-x-1/2 rounded-full bg-accent/10 blur-[120px]" />
    </div>
  )
}

function ProfilePhoto() {
  return (
    <div className="relative mx-auto h-56 w-56 animate-float sm:h-64 sm:w-64 lg:h-80 lg:w-80">
      <div
        aria-hidden="true"
        className="absolute inset-0 animate-spin-slow rounded-full"
        style={{
          background:
            'conic-gradient(from 0deg, rgb(37 99 235), rgb(96 165 250), transparent 40%, rgb(37 99 235))',
        }}
      />
      <div className="absolute inset-[5px] overflow-hidden rounded-full bg-bg">
        <img
          src={profileImg}
          alt={profile.name}
          width={800}
          height={800}
          fetchPriority="high"
          decoding="async"
          className="h-full w-full object-cover object-top"
        />
      </div>

      {/* Puces technos en orbite autour de la photo */}
      <div aria-hidden="true" className="absolute -inset-12 hidden animate-orbit sm:block">
        {orbitChips.map((chip, i) => {
          const angle = (i / orbitChips.length) * Math.PI * 2 - Math.PI / 2
          return (
            <div
              key={chip}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${50 + 50 * Math.cos(angle)}%`, top: `${50 + 50 * Math.sin(angle)}%` }}
            >
              <span className="block animate-orbit-reverse whitespace-nowrap rounded-full border border-line bg-bg/80 px-3 py-1 font-mono text-xs font-medium text-fg shadow-lg backdrop-blur">
                {chip}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export function Hero() {
  const role = useTypewriter(profile.roles)
  const reduced = useReducedMotion()
  const base = reduced ? 0 : INTRO_DELAY
  const sectionRef = useRef<HTMLElement>(null)

  // Parallaxe : le contenu monte et s'estompe quand on quitte le hero.
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [0, 140])
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  const onPointerMove = (e: PointerEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    e.currentTarget.style.setProperty('--hx', `${e.clientX - r.left}px`)
    e.currentTarget.style.setProperty('--hy', `${e.clientY - r.top}px`)
  }

  const enter = (delay: number) => ({
    initial: { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.55, delay: base + delay, ease: EASE },
  })

  return (
    <section
      ref={sectionRef}
      id="top"
      aria-labelledby="hero-title"
      onPointerMove={onPointerMove}
      className="relative flex min-h-screen items-center pb-24 pt-32 md:pt-36"
    >
      <GridBackground />

      <motion.div
        style={reduced ? undefined : { y, opacity }}
        className="container-x grid items-center gap-12 lg:grid-cols-12"
      >
        <div className="order-2 lg:order-1 lg:col-span-8">
          <motion.p
            {...enter(0)}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-line px-4 py-1.5 text-sm text-muted"
          >
            <MapPin size={14} aria-hidden="true" className="text-accent-fg" />
            {profile.location}
          </motion.p>

          <h1
            id="hero-title"
            aria-label={profile.name}
            className="text-6xl font-bold leading-[0.95] tracking-tightest md:text-8xl"
          >
            <motion.span
              aria-hidden="true"
              className="block"
              initial="hidden"
              animate="show"
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.035, delayChildren: base + 0.1 } },
              }}
            >
              {words.map((word, wi) => (
                <span key={wi} className="mr-[0.25em] inline-block whitespace-nowrap">
                  {word.split('').map((char, ci) => (
                    <motion.span
                      key={ci}
                      variants={charVariants}
                      className="inline-block"
                      style={{ transformPerspective: 600 }}
                    >
                      {char}
                    </motion.span>
                  ))}
                </span>
              ))}
            </motion.span>
          </h1>

          <motion.p
            {...enter(0.8)}
            className="mt-6 flex h-10 items-center font-display text-2xl font-medium text-accent-fg md:text-4xl"
            aria-label={profile.roles.join(', ')}
          >
            <span aria-hidden="true">{role}</span>
            <span
              aria-hidden="true"
              className="ml-1 inline-block h-[1em] w-[3px] animate-blink bg-accent-fg"
            />
          </motion.p>

          <motion.p {...enter(0.95)} className="mt-6 max-w-2xl leading-relaxed text-muted">
            {profile.tagline}
          </motion.p>

          <motion.div {...enter(1.1)} className="mt-10 flex flex-wrap items-center gap-4">
            <Magnetic>
              <a
                href="#projects"
                className="group inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 font-medium text-white shadow-lg shadow-accent/25 transition-shadow hover:shadow-xl hover:shadow-accent/40"
              >
                Voir mes projets
                <ArrowRight
                  size={18}
                  aria-hidden="true"
                  className="transition-transform group-hover:translate-x-1"
                />
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href={profile.cvUrl}
                download={profile.cvFileName}
                className="inline-flex items-center gap-2 rounded-full border border-line px-6 py-3 font-medium transition-colors hover:border-accent-fg hover:text-accent-fg"
              >
                <Download size={18} aria-hidden="true" />
                Télécharger mon CV
              </a>
            </Magnetic>
            <Magnetic strength={0.2}>
              <a href="#contact" className="link-underline group inline-flex items-center gap-1.5 font-medium">
                Me contacter
                <ArrowRight
                  size={16}
                  aria-hidden="true"
                  className="transition-transform group-hover:translate-x-1"
                />
              </a>
            </Magnetic>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: base + 0.2, ease: EASE }}
          className="order-1 lg:order-2 lg:col-span-4"
        >
          <ProfilePhoto />
        </motion.div>
      </motion.div>

      <a
        href="#about"
        aria-label="Défiler vers la section À propos"
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-1 text-muted transition-colors hover:text-fg md:flex"
      >
        <span className="text-xs uppercase tracking-[0.2em]">Scroll</span>
        <ChevronDown size={22} aria-hidden="true" className="animate-bounce-soft" />
      </a>
    </section>
  )
}
