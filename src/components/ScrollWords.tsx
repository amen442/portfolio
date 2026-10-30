import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'framer-motion'
import { useRef } from 'react'

interface Props {
  text: string
  className?: string
}

function Word({
  word,
  range,
  progress,
}: {
  word: string
  range: [number, number]
  progress: MotionValue<number>
}) {
  const opacity = useTransform(progress, range, [0.15, 1])
  return (
    <motion.span style={{ opacity }} className="mr-[0.25em] inline-block">
      {word}
    </motion.span>
  )
}

function Animated({ text, className }: Props) {
  const ref = useRef<HTMLParagraphElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.55'] })
  const words = text.split(' ')

  return (
    <p ref={ref} className={className} aria-label={text}>
      {words.map((word, i) => {
        const start = i / words.length
        const end = Math.min(1, start + 3 / words.length)
        return (
          <span key={i} aria-hidden="true">
            <Word word={word} range={[start, end]} progress={scrollYProgress} />
          </span>
        )
      })}
    </p>
  )
}

/** Texte dont les mots s'illuminent progressivement au fil du scroll. */
export function ScrollWords(props: Props) {
  const reduced = useReducedMotion()
  return reduced ? <p className={props.className}>{props.text}</p> : <Animated {...props} />
}
