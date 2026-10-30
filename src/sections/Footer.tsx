import { motion } from 'framer-motion'
import { ArrowUp } from 'lucide-react'
import { navLinks, profile } from '../data/profile'

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="container-x flex flex-col items-center justify-between gap-6 py-10 md:flex-row">
        <p className="text-sm text-muted">
          © {new Date().getFullYear()} {profile.name}. Tous droits réservés.
        </p>

        <nav aria-label="Navigation du pied de page">
          <ul className="flex flex-wrap justify-center gap-6 text-sm">
            {navLinks.map((l) => (
              <li key={l.id}>
                <a href={`#${l.id}`} className="link-underline text-muted transition-colors hover:text-fg">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <motion.a
          href="#top"
          aria-label="Retour en haut de la page"
          whileHover={{ y: -4 }}
          whileTap={{ scale: 0.92 }}
          className="grid h-11 w-11 place-items-center rounded-full border border-line transition-colors hover:border-accent-fg hover:text-accent-fg"
        >
          <ArrowUp size={18} aria-hidden="true" />
        </motion.a>
      </div>
    </footer>
  )
}
