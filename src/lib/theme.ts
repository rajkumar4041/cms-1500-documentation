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
  const root = document.documentElement
  root.dataset.theme = theme
  // Set color-scheme imperatively on the root so the browser re-applies the
  // active scheme (native controls, scrollbars, auto-dark decision) live on
  // every toggle — without needing a page reload. The static <meta> keeps its
  // "light dark" value so browser auto-dark stays off for both themes.
  root.style.colorScheme = theme
  try {
    localStorage.setItem(KEY, theme)
  } catch {
    /* best-effort persistence only */
  }
}
