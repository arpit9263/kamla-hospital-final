/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_CF_ANALYTICS_TOKEN?: string;
  readonly VITE_FORMSPREE_APPOINTMENT_ENDPOINT?: string;
  readonly VITE_FORMSPREE_CONTACT_ENDPOINT?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
