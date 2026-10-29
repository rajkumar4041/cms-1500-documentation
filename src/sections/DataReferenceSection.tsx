import { Demo } from '../components/Demo'
import { CatHeader, Note } from '../components/ui'
import { JsonPlaygroundDemo } from '../components/JsonPlaygroundDemo'
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
      <JsonPlaygroundDemo />
      <Note>
        <span>
          Diagnosis codes accept either <code>diagnisisCodeData</code> (array of{' '}
          <code>{'{ code }'}</code>) or, as a fallback, <code>diagnosisCodes</code> — a keyed map of{' '}
          <code>"CODE - description"</code> strings.
        </span>
      </Note>
      <Note>
        <span>
          <b>New in 1.4:</b> <code>serviceFacilityAddress</code> (Box 32) and{' '}
          <code>billingProviderAddress</code> (Box 33) now accept a{' '}
          <code>CMS1500Address</code> object as well as a string — the object fills the street line
          and the city/state/zip line separately.
        </span>
      </Note>
    </section>
  )
}
