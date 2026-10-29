import { useToast } from './ToastProvider'

const INSTALL = 'npm install cms1500-react pdf-lib'

const STATS: { num: string; lbl: string }[] = [
  { num: '33', lbl: 'CMS-1500 boxes' },
  { num: '0', lbl: 'network calls' },
  { num: 'FHIR R4', lbl: 'compatible' },
  { num: 'MIT', lbl: 'licensed' },
]

export function Hero() {
  const toast = useToast()

  const copyInstall = async () => {
    try {
      if (!navigator.clipboard?.writeText) throw new Error('clipboard unavailable')
      await navigator.clipboard.writeText(INSTALL)
      toast('Copied install command')
    } catch {
      toast('Copy failed')
    }
  }

  return (
    <header className="hero" id="overview">
      <span className="eyebrow">⚕ React · PDF · FHIR R4 · Validation · HIPAA-conscious</span>
      <h1>
        CMS-1500 claim forms,
        <br />
        <span className="grad">filled as real PDFs.</span>
      </h1>
      <p className="lead">
        A production-ready React library to fill, render, and print CMS-1500 (HCFA) medical
        claim forms. It fills the actual PDF form fields with <code>pdf-lib</code> for
        pixel-perfect output — entirely in the browser, with zero network calls.
      </p>

      <div className="hero-actions">
        <button className="install" onClick={copyInstall} title="Copy to clipboard">
          <span className="dollar">$</span> {INSTALL}
        </button>
        <a
          className="btn primary"
          href="#quick-start"
          onClick={(e) => {
            e.preventDefault()
            document.getElementById('quick-start')?.scrollIntoView({ behavior: 'smooth' })
          }}
        >
          Quick start
        </a>
        <a
          className="btn ghost"
          href="https://www.npmjs.com/package/cms1500-react"
          target="_blank"
          rel="noreferrer"
        >
          npm ↗
        </a>
      </div>

      <div className="stat-row">
        {STATS.map((s) => (
          <div className="stat" key={s.lbl}>
            <div className="num">{s.num}</div>
            <div className="lbl">{s.lbl}</div>
          </div>
        ))}
      </div>
    </header>
  )
}
