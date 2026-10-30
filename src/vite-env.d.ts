/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Endpoint (ex. Formspree) qui reçoit le formulaire de contact en POST JSON. */
  readonly VITE_FORM_ENDPOINT?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
