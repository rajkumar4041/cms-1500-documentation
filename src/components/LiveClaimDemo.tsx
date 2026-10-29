import { useEffect, useMemo, useState } from 'react'
import { useCMS1500 } from 'cms1500-react'
import { buildClaim, defaultDemoFields, type DemoFields } from '../lib/sampleClaim'
import { useDebounce } from '../lib/useDebounce'

function StatusPill({ loading, ready, error }: { loading: boolean; ready: boolean; error: boolean }) {
  if (error) return <span className="pill error"><span className="dot" /> Error</span>
  if (loading) return <span className="pill loading"><span className="dot" /> Generating…</span>
  if (ready) return <span className="pill success"><span className="dot" /> PDF ready</span>
  return <span className="pill idle"><span className="dot" /> Idle</span>
}

export function LiveClaimDemo() {
  const [fields, setFields] = useState<DemoFields>(defaultDemoFields)
  const { pdfUrl, loading, error, generatePdf, handlePrint, handleDownload, iframeRef } =
    useCMS1500()

  const claim = useMemo(() => buildClaim(fields), [fields])
  const debounced = useDebounce(claim, 300)

  useEffect(() => {
    void generatePdf(debounced)
    // generatePdf identity is stable from the hook; depend only on data
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounced])

  const set = (key: keyof DemoFields) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setFields((f) => ({ ...f, [key]: e.target.value }))

  return (
    <div className="stack">
      <div className="row" style={{ justifyContent: 'space-between' }}>
        <StatusPill loading={loading} ready={!!pdfUrl} error={!!error} />
        <div className="row">
          <button className="btn sm" onClick={handlePrint} disabled={!pdfUrl}>
            Print
          </button>
          <button className="btn sm" onClick={() => handleDownload('cms-1500-claim.pdf')} disabled={!pdfUrl}>
            Download
          </button>
        </div>
      </div>

      <div className="row">
        <div style={{ flex: '1 1 160px' }}>
          <label className="lbl">Patient name</label>
          <input className="field" value={fields.patientName} onChange={set('patientName')} />
        </div>
        <div style={{ flex: '1 1 120px' }}>
          <label className="lbl">DOB</label>
          <input className="field" type="date" value={fields.patientDOB} onChange={set('patientDOB')} />
        </div>
        <div style={{ flex: '0 0 72px' }}>
          <label className="lbl">Sex</label>
          <select className="field" value={fields.patientSex} onChange={set('patientSex')}>
            <option value="M">M</option>
            <option value="F">F</option>
          </select>
        </div>
      </div>

      <div className="row">
        <div style={{ flex: '1 1 160px' }}>
          <label className="lbl">Insurance ID</label>
          <input className="field" value={fields.insuranceId} onChange={set('insuranceId')} />
        </div>
        <div style={{ flex: '0 0 110px' }}>
          <label className="lbl">Diagnosis</label>
          <input className="field" value={fields.diagnosisCode} onChange={set('diagnosisCode')} />
        </div>
      </div>

      <div className="row">
        <div style={{ flex: '1 1 130px' }}>
          <label className="lbl">CPT code</label>
          <input className="field" value={fields.cptCode} onChange={set('cptCode')} />
        </div>
        <div style={{ flex: '0 0 110px' }}>
          <label className="lbl">Charge ($)</label>
          <input className="field" inputMode="decimal" value={fields.charge} onChange={set('charge')} />
        </div>
      </div>

      <iframe
        ref={iframeRef as React.RefObject<HTMLIFrameElement>}
        src={pdfUrl ?? undefined}
        title="Filled CMS-1500 preview"
        style={{
          width: '100%',
          height: 420,
          border: '1px solid var(--border-soft)',
          borderRadius: 8,
          background: '#fff',
        }}
      />
      {error && <p className="hint" style={{ color: 'var(--red)' }}>{error.message}</p>}
      <p className="hint">Edit any field — the PDF regenerates client-side. Nothing is sent anywhere.</p>
    </div>
  )
}
