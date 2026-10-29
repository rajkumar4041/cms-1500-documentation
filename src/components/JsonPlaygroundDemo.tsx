import { useEffect, useMemo, useRef, useState } from 'react'
import { useCMS1500, type CMS1500Data } from 'cms1500-react'
import { sampleClaim } from '../lib/sampleClaim'
import { useDebounce } from '../lib/useDebounce'

const INITIAL_JSON = JSON.stringify(sampleClaim, null, 2)

export function JsonPlaygroundDemo() {
  const [text, setText] = useState(INITIAL_JSON)
  const [parseError, setParseError] = useState<string | null>(null)
  const lastGood = useRef<CMS1500Data>(sampleClaim)

  const { pdfUrl, loading, error, generatePdf, handlePrint, handleDownload, iframeRef } =
    useCMS1500()

  // Parse on every edit; keep the last valid payload so the PDF never blanks.
  const data = useMemo<CMS1500Data>(() => {
    try {
      const parsed = JSON.parse(text) as CMS1500Data
      setParseError(null)
      lastGood.current = parsed
      return parsed
    } catch (e) {
      setParseError(e instanceof Error ? e.message : 'Invalid JSON')
      return lastGood.current
    }
  }, [text])

  const debounced = useDebounce(data, 400)

  useEffect(() => {
    void generatePdf(debounced)
    // generatePdf is stable from the hook
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounced])

  const reset = () => setText(INITIAL_JSON)

  const status = parseError
    ? { cls: 'error', label: 'Invalid JSON' }
    : loading
      ? { cls: 'loading', label: 'Generating…' }
      : pdfUrl
        ? { cls: 'success', label: 'PDF ready' }
        : { cls: 'idle', label: 'Idle' }

  return (
    <section className="demo" id="json-playground" style={{ scrollMarginTop: 20 }}>
      <div className="demo-head">
        <div className="demo-title">
          <h3>
            <a href="#json-playground">JSON playground</a>
          </h3>
          <span className="flagship-badge">Live demo</span>
        </div>
        <p className="demo-tagline">
          Edit the claim JSON on the left — the CMS-1500 PDF re-fills on the right. Download it when
          you're happy. Everything runs in your browser.
        </p>
      </div>

      <div className="demo-body">
        <div className="demo-live" style={{ minWidth: 0 }}>
          <div className="row" style={{ justifyContent: 'space-between', marginBottom: 10 }}>
            <div className="pane-label" style={{ margin: 0 }}>
              Claim JSON
            </div>
            <button className="btn sm ghost" onClick={reset}>
              Reset
            </button>
          </div>
          <textarea
            className="field"
            spellCheck={false}
            value={text}
            onChange={(e) => setText(e.target.value)}
            style={{ height: 460, fontFamily: 'var(--mono)', fontSize: 12.5, lineHeight: 1.6 }}
            aria-label="Editable claim JSON"
          />
          {parseError && (
            <p className="hint" style={{ color: 'var(--red)' }}>
              {parseError}
            </p>
          )}
        </div>

        <div className="demo-code-pane" style={{ padding: '22px 20px' }}>
          <div className="row" style={{ justifyContent: 'space-between', marginBottom: 12 }}>
            <span className={`pill ${status.cls}`}>
              <span className="dot" /> {status.label}
            </span>
            <div className="row">
              <button className="btn sm" onClick={handlePrint} disabled={!pdfUrl}>
                Print
              </button>
              <button
                className="btn sm primary"
                onClick={() => handleDownload('cms-1500-claim.pdf')}
                disabled={!pdfUrl}
              >
                Download PDF
              </button>
            </div>
          </div>
          <iframe
            ref={iframeRef as React.RefObject<HTMLIFrameElement>}
            src={pdfUrl ?? undefined}
            title="Filled CMS-1500 from JSON"
            style={{
              width: '100%',
              height: 460,
              border: '1px solid var(--border-soft)',
              borderRadius: 8,
              background: '#fff',
            }}
          />
          {error && !parseError && (
            <p className="hint" style={{ color: 'var(--red)' }}>
              {error.message}
            </p>
          )}
        </div>
      </div>
    </section>
  )
}
