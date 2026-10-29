export type Theme = 'dark' | 'light'

const KEY = 'cms1500-docs-theme'

export function getStoredTheme(): Theme {
  try {
    const v = localStorage.getItem(KEY)
    if (v === 'light' || v === 'dark') return v
  } catch {
    /* localStorage unavailable (private mode / SSR) — fall through */
  }
  return 'dark'
}

export function applyTheme(theme: Theme): void {
  document.documentElement.dataset.theme = theme
  try {
    localStorage.setItem(KEY, theme)
  } catch {
    /* best-effort persistence only */
  }
}
