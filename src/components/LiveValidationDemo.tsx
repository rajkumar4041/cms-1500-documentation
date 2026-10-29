import { useMemo, useState } from 'react'
import { validateCMS1500, type CMS1500Data } from 'cms1500-react'
import { sampleClaim } from '../lib/sampleClaim'

// A deliberately-broken variant to show blocking errors and non-blocking warnings.
const brokenClaim: CMS1500Data = {
  ...sampleClaim,
  billingProviderNPI: '123', // too short → NPI_INVALID (error)
  // 13 diagnosis codes → overflow past the 12-code cap (warning)
  diagnisisCodeData: Array.from({ length: 13 }, (_, i) => ({ code: `J0${i}.9` })),
  patientProcedureCodes: [
    {
      procedureCode: { '1': '99213' },
      diagnosisFirstPointers: 'Z', // points at a Box 21 slot that doesn't exist → error
      charges: 150,
      quantity: 1,
    },
  ],
}

export function LiveValidationDemo() {
  const [mode, setMode] = useState<'valid' | 'broken'>('broken')
  const data = mode === 'valid' ? sampleClaim : brokenClaim
  const result = useMemo(() => validateCMS1500(data), [data])

  return (
    <div className="stack">
      <div className="row">
        <button
          className={`btn sm${mode === 'valid' ? ' primary' : ''}`}
          onClick={() => setMode('valid')}
        >
          Valid claim
        </button>
        <button
          className={`btn sm${mode === 'broken' ? ' primary' : ''}`}
          onClick={() => setMode('broken')}
        >
          Claim with issues
        </button>
        <span className={`pill ${result.valid ? 'success' : 'error'}`}>
          <span className="dot" /> {result.valid ? 'valid' : 'invalid'}
        </span>
      </div>

      <IssueList label={`Errors (${result.errors.length})`} issues={result.errors} color="var(--red)" />
      <IssueList label={`Warnings (${result.warnings.length})`} issues={result.warnings} color="var(--amber)" />

      <p className="hint">validateCMS1500() runs synchronously, in-browser — it never throws or mutates your data.</p>
    </div>
  )
}

function IssueList({
  label,
  issues,
  color,
}: {
  label: string
  issues: { field: string; code: string; message: string }[]
  color: string
}) {
  return (
    <div>
      <div className="pane-label" style={{ color }}>{label}</div>
      {issues.length === 0 ? (
        <p className="muted">None</p>
      ) : (
        <ul className="result-list">
          {issues.map((iss, i) => (
            <li key={i}>
              <code style={{ color }}>{iss.code}</code> — {iss.message}
              <span className="muted"> ({iss.field})</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
