import { Demo } from '../components/Demo'
import { CatHeader, ApiTable, Note } from '../components/ui'
import { LiveValidationDemo } from '../components/LiveValidationDemo'
import { VALIDATE_USAGE } from '../lib/snippets'

export function ValidationSection() {
  return (
    <section id="validation" style={{ scrollMarginTop: 20 }}>
      <CatHeader
        icon="✓"
        title="validateCMS1500()"
        lead="Check a payload for claim-readiness before you print or submit — blocking errors and non-blocking warnings."
      />
      <Demo
        title="validateCMS1500(data)"
        tagline="Toggle a valid claim against one with issues and watch the result update live."
        flagship
        liveLabel="Live validator"
        live={<LiveValidationDemo />}
        code={VALIDATE_USAGE}
        lang="ts"
      />
      <ApiTable
        headers={['Field', 'Type', 'Description']}
        rows={[
          { cells: ['valid', 'boolean', 'True when there are no error-severity issues'] },
          { cells: ['errors', 'CMS1500ValidationIssue[]', 'Blocking issues — invalid NPI/date, out-of-range diagnosis pointers, missing required fields'] },
          { cells: ['warnings', 'CMS1500ValidationIssue[]', 'Non-blocking — overflow past the 12-diagnosis / 6-line caps, missing recommended fields'] },
        ]}
      />
      <Note>
        <span>
          Each issue is <code>{'{ field, code, message, severity }'}</code>. <code>code</code> is a
          stable identifier (e.g. <code>DIAGNOSIS_POINTER_OUT_OF_RANGE</code>, <code>NPI_INVALID</code>,{' '}
          <code>SERVICE_LINE_OVERFLOW</code>) you can branch on. The function <b>never throws</b> and{' '}
          <b>never mutates</b> its input.
        </span>
      </Note>
    </section>
  )
}
