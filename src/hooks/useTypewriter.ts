import { useEffect, useState } from 'react'
import { useReducedMotion } from 'framer-motion'

interface Options {
  typeSpeed?: number
  deleteSpeed?: number
  pause?: number
}

/** Effet machine à écrire qui cycle indéfiniment entre plusieurs mots. */
export function useTypewriter(words: string[], opts: Options = {}) {
  const { typeSpeed = 80, deleteSpeed = 40, pause = 1600 } = opts
  const reduced = useReducedMotion()
  const [index, setIndex] = useState(0)
  const [text, setText] = useState('')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    if (reduced) return
    const word = words[index % words.length]

    let delay = deleting ? deleteSpeed : typeSpeed
    if (!deleting && text === word) delay = pause
    if (deleting && text === '') delay = 300

    const id = window.setTimeout(() => {
      if (!deleting && text === word) {
        setDeleting(true)
      } else if (deleting && text === '') {
        setDeleting(false)
        setIndex((i) => (i + 1) % words.length)
      } else {
        setText(
          deleting ? word.slice(0, text.length - 1) : word.slice(0, text.length + 1),
        )
      }
    }, delay)

    return () => window.clearTimeout(id)
  }, [text, deleting, index, words, reduced, typeSpeed, deleteSpeed, pause])

  // Avec prefers-reduced-motion : on affiche le premier rôle, sans animation.
  return reduced ? words[0] : text
}
