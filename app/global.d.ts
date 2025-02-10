export {}

declare global {
  interface Window {
    dataLayer: unknown[]
    fbq: (action: 'track' | 'init' | string, ...args: unknown[]) => void
  }
}
