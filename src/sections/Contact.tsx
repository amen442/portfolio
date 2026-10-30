import { zodResolver } from '@hookform/resolvers/zod'
import { AnimatePresence, motion } from 'framer-motion'
import { Check, Github, Linkedin, Loader2, Mail, MapPin, Phone, Send } from 'lucide-react'
import { useState } from 'react'
import { useForm, type UseFormRegisterReturn } from 'react-hook-form'
import { z } from 'zod'
import { Magnetic } from '../components/Magnetic'
import { Reveal } from '../components/Reveal'
import { SectionHeading } from '../components/SectionHeading'
import { profile } from '../data/profile'

const schema = z.object({
  name: z.string().trim().min(2, 'Ton nom doit contenir au moins 2 caractères'),
  email: z.string().trim().email('Adresse email invalide'),
  message: z.string().trim().min(10, 'Ton message doit contenir au moins 10 caractères').max(2000),
})
type FormValues = z.infer<typeof schema>
type Status = 'idle' | 'loading' | 'success' | 'error'

interface FieldProps {
  id: string
  label: string
  type?: string
  rows?: number
  error?: string
  registration: UseFormRegisterReturn
}

/** Champ avec label flottant (placeholder=" " + peer-placeholder-shown). */
function Field({ id, label, type = 'text', rows, error, registration }: FieldProps) {
  const base =
    'peer w-full rounded-xl border bg-bg px-4 pb-2.5 pt-6 text-base outline-none transition-colors placeholder-transparent focus:border-accent-fg ' +
    (error ? 'border-red-500' : 'border-line')
  return (
    <div>
      <div className="relative">
        {rows ? (
          <textarea
            id={id}
            rows={rows}
            placeholder=" "
            aria-invalid={!!error}
            aria-describedby={error ? `${id}-error` : undefined}
            className={`${base} resize-none`}
            {...registration}
          />
        ) : (
          <input
            id={id}
            type={type}
            placeholder=" "
            aria-invalid={!!error}
            aria-describedby={error ? `${id}-error` : undefined}
            className={base}
            {...registration}
          />
        )}
        <label
          htmlFor={id}
          className="pointer-events-none absolute left-4 top-2 text-xs text-muted transition-all duration-200 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-xs peer-focus:text-accent-fg"
        >
          {label}
        </label>
      </div>
      <AnimatePresence>
        {error && (
          <motion.p
            id={`${id}-error`}
            role="alert"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-1.5 text-sm text-red-600 dark:text-red-400"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}

export function Contact() {
  const [status, setStatus] = useState<Status>('idle')
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<FormValues>({ resolver: zodResolver(schema), mode: 'onChange' })

  const onSubmit = async (values: FormValues) => {
    setStatus('loading')
    try {
      const endpoint = import.meta.env.VITE_FORM_ENDPOINT
      if (endpoint) {
        const res = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(values),
        })
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
      } else {
        // Aucun backend configuré : simulation (voir README pour brancher un vrai endpoint).
        await new Promise((r) => setTimeout(r, 1200))
      }
      setStatus('success')
      reset()
      window.setTimeout(() => setStatus('idle'), 4000)
    } catch {
      setStatus('error')
      window.setTimeout(() => setStatus('idle'), 4000)
    }
  }

  const info = [
    { icon: Mail, label: 'Email', value: profile.email, href: `mailto:${profile.email}` },
    {
      icon: Phone,
      label: 'Téléphone',
      value: profile.phone,
      href: `tel:${profile.phone.replace(/\s/g, '')}`,
    },
    { icon: MapPin, label: 'Localisation', value: profile.location },
  ]
  const socialIcons = { github: Github, linkedin: Linkedin }

  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="section-y border-t border-line bg-surface"
    >
      <div className="container-x">
        <SectionHeading
          number="08"
          label="Contact"
          title="Let's build something — travaillons ensemble"
          id="contact-title"
        />

        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-7">
            <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
              <Field id="name" label="Nom" error={errors.name?.message} registration={register('name')} />
              <Field
                id="email"
                type="email"
                label="Email"
                error={errors.email?.message}
                registration={register('email')}
              />
              <Field
                id="message"
                label="Message"
                rows={6}
                error={errors.message?.message}
                registration={register('message')}
              />

              <div className="flex flex-wrap items-center gap-4">
                <Magnetic>
                <motion.button
                  type="submit"
                  disabled={!isValid || status === 'loading'}
                  whileTap={{ scale: 0.97 }}
                  className={`inline-flex min-w-[10rem] items-center justify-center gap-2 rounded-full px-7 py-3 font-medium text-white transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${
                    status === 'success' ? 'bg-emerald-600' : 'bg-accent'
                  }`}
                >
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.span
                      key={status}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.15 }}
                      className="inline-flex items-center gap-2"
                    >
                      {status === 'loading' ? (
                        <>
                          <Loader2 size={18} aria-hidden="true" className="animate-spin" /> Envoi…
                        </>
                      ) : status === 'success' ? (
                        <>
                          <Check size={18} aria-hidden="true" /> Envoyé !
                        </>
                      ) : (
                        <>
                          <Send size={18} aria-hidden="true" /> Envoyer
                        </>
                      )}
                    </motion.span>
                  </AnimatePresence>
                </motion.button>
                </Magnetic>

                <p role="status" aria-live="polite" className="text-sm">
                  {status === 'success' && (
                    <span className="text-emerald-600 dark:text-emerald-400">
                      Merci ! Je te réponds très vite.
                    </span>
                  )}
                  {status === 'error' && (
                    <span className="text-red-600 dark:text-red-400">
                      Échec de l’envoi. Réessaie ou écris-moi directement par email.
                    </span>
                  )}
                </p>
              </div>
            </form>
          </Reveal>

          <Reveal delay={0.15} className="lg:col-span-5">
            <ul className="space-y-6">
              {info.map(({ icon: Icon, label, value, href }) => (
                <li key={label} className="flex items-start gap-4">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-accent/10 text-accent-fg">
                    <Icon size={20} aria-hidden="true" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm text-muted">{label}</p>
                    {href ? (
                      <a href={href} className="link-underline break-all font-medium">
                        {value}
                      </a>
                    ) : (
                      <p className="font-medium">{value}</p>
                    )}
                  </div>
                </li>
              ))}
            </ul>

            <ul className="mt-10 flex gap-3">
              {profile.socials.map((s) => {
                const Icon = socialIcons[s.icon]
                return (
                  <li key={s.label}>
                    <Magnetic strength={0.5}>
                    <a
                      href={s.href || undefined}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.label}
                      className="grid h-12 w-12 place-items-center rounded-full border border-line transition-all hover:-translate-y-1 hover:border-accent-fg hover:text-accent-fg"
                    >
                      <Icon size={20} aria-hidden="true" />
                    </a>
                    </Magnetic>
                  </li>
                )
              })}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
