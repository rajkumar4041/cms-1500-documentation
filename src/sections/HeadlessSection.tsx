import { Demo } from '../components/Demo'
import { CatHeader } from '../components/ui'
import { HEADLESS_USAGE, TEMPLATE_HELPERS } from '../lib/snippets'

export function HeadlessSection() {
  return (
    <section id="headless" style={{ scrollMarginTop: 20 }}>
      <CatHeader
        icon="⚙"
        title="Headless & template helpers"
        lead="Fill PDFs without React — in Node, serverless functions, or web workers."
      />
      <Demo
        title="fillCMS1500Pdf(pdfBytes, data, options?)"
        tagline="Low-level fill — returns a Uint8Array you can save, upload, or stream."
        code={HEADLESS_USAGE}
        lang="ts"
      />
      <Demo
        title="Template helpers"
        tagline="The blank template ships inside the package."
        code={TEMPLATE_HELPERS}
        lang="ts"
      />
    </section>
  )
}
