import { Demo } from '../components/Demo'
import { CatHeader, Note } from '../components/ui'
import { FULL_DATA_REFERENCE, MINIMAL_EXAMPLE } from '../lib/snippets'

export function DataReferenceSection() {
  return (
    <section id="data-reference" style={{ scrollMarginTop: 20 }}>
      <CatHeader
        icon="▤"
        title="CMS1500Data reference"
        lead="Every supported field, grouped by form area. All fields are optional — pass only what you need."
      />
      <Demo
        title="Minimal example"
        tagline="The few fields needed for a basic claim."
        code={MINIMAL_EXAMPLE}
        lang="json"
      />
      <Demo
        title="Full field reference"
        tagline="Every supported field with its CMS-1500 box number."
        code={FULL_DATA_REFERENCE}
        lang="json"
      />
      <Note>
        <span>
          Diagnosis codes accept either <code>diagnisisCodeData</code> (array of{' '}
          <code>{'{ code }'}</code>) or, as a fallback, <code>diagnosisCodes</code> — a keyed map of{' '}
          <code>"CODE - description"</code> strings.
        </span>
      </Note>
    </section>
  )
}
