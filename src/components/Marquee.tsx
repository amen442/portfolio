import { skillCategories } from '../data/profile'

const items = Array.from(
  new Set([...skillCategories.slice(0, 3).flatMap((c) => c.items), 'Generative AI']),
)

function Row({ reverse = false, outline = false }: { reverse?: boolean; outline?: boolean }) {
  const group = (
    <ul className="flex shrink-0 items-center">
      {items.map((item) => (
        <li key={item} className="flex items-center">
          <span
            className={`px-6 font-display text-5xl font-bold tracking-tightest md:px-10 md:text-7xl ${
              outline ? 'text-outline' : ''
            }`}
          >
            {item}
          </span>
          <span className="text-2xl text-accent-fg md:text-4xl">✦</span>
        </li>
      ))}
    </ul>
  )
  return (
    <div
      className={`flex w-max animate-marquee hover:[animation-play-state:paused] ${
        reverse ? '[animation-direction:reverse]' : ''
      }`}
    >
      {group}
      {group}
    </div>
  )
}

/** Bandeau défilant décoratif (masqué aux lecteurs d'écran : les compétences sont listées plus bas). */
export function Marquee() {
  return (
    <div
      aria-hidden="true"
      className="select-none space-y-2 overflow-hidden border-y border-line py-8 md:space-y-4 md:py-12"
    >
      <Row />
      <Row reverse outline />
    </div>
  )
}
