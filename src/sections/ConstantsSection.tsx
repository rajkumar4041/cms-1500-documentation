import { Demo } from '../components/Demo'
import { CatHeader, ApiTable } from '../components/ui'
import { CONSTANTS_USAGE } from '../lib/snippets'

export function ConstantsSection() {
  return (
    <section id="constants" style={{ scrollMarginTop: 20 }}>
      <CatHeader
        icon="⌗"
        title="Field constants"
        lead="Exported PDF form-field name maps — for advanced, custom pdf-lib workflows."
      />
      <Demo
        title="Advanced constants"
        tagline="The raw CMS-1500 field names, keyed by box."
        code={CONSTANTS_USAGE}
        lang="ts"
      />
      <ApiTable
        headers={['Export', 'Covers']}
        rows={[
          { cells: ['DIAGNOSIS_FIELDS', 'Box 21 diagnosis code fields (A–L)'] },
          { cells: ['SERVICE_LINE_FIELDS', 'Box 24 service-line fields (up to 6 lines)'] },
          { cells: ['PRIOR_AUTH_FIELD', 'Box 23 prior authorization field'] },
          { cells: ['BILLING_PROVIDER_FIELDS', 'Box 33 billing provider fields'] },
          { cells: ['FACILITY_FIELDS', 'Box 32 service facility fields'] },
          { cells: ['PHYSICIAN_FIELDS', 'Box 31 physician signature fields'] },
        ]}
      />
    </section>
  )
}
