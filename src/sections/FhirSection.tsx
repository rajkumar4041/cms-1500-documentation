import { Demo } from '../components/Demo'
import { CatHeader, Note } from '../components/ui'
import { FHIR_USAGE } from '../lib/snippets'

export function FhirSection() {
  return (
    <section id="fhir" style={{ scrollMarginTop: 20 }}>
      <CatHeader
        icon="⇄"
        title="FHIR R4 mapping"
        lead="Map a FHIR R4 Claim bundle straight into CMS-1500 data."
      />
      <Demo
        title="mapFHIRToCMS1500(bundle)"
        tagline="Patient + Practitioner + Organization + Claim → CMS1500Data."
        code={FHIR_USAGE}
        lang="ts"
      />
      <Note>
        <span>
          The result is a plain <b>CMS1500Data</b> object — pass it straight to{' '}
          <code>&lt;CMS1500Form&gt;</code>, <code>useCMS1500</code>, or{' '}
          <code>fillCMS1500Pdf</code>.
        </span>
      </Note>
    </section>
  )
}
