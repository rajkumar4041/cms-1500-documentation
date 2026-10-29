import { Demo } from '../components/Demo'
import { CatHeader } from '../components/ui'
import { COMPONENT_USAGE, HOOK_USAGE, HEADLESS_USAGE } from '../lib/snippets'

export function QuickStart() {
  return (
    <section id="quick-start" style={{ scrollMarginTop: 20 }}>
      <CatHeader
        icon="▶"
        title="Quick Start"
        lead="Three ways to use the library — a drop-in component, a hook, or a headless function."
      />
      <Demo
        title="1 · Component"
        tagline="Drop in the viewer and pass your claim data."
        code={COMPONENT_USAGE}
        lang="tsx"
      />
      <Demo
        title="2 · Hook (with print / download)"
        tagline="Full control over generation, printing, and downloading."
        code={HOOK_USAGE}
        lang="tsx"
      />
      <Demo
        title="3 · Headless (no React)"
        tagline="Generate a filled PDF anywhere — Node, workers, server-side."
        code={HEADLESS_USAGE}
        lang="ts"
      />
    </section>
  )
}
