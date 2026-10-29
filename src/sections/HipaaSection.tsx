import { CodeBlock } from '../components/CodeBlock'
import { CatHeader, ApiTable, Note } from '../components/ui'
import { DATA_FLOW } from '../lib/snippets'

export function HipaaSection() {
  return (
    <section id="hipaa" style={{ scrollMarginTop: 20 }}>
      <CatHeader
        icon="⛨"
        title="HIPAA compliance"
        lead="Designed with the Privacy Rule, Security Rule, and Minimum Necessary Standard in mind."
      />

      <div className="prose">
        <p>
          <strong>Zero PHI footprint.</strong> PDF generation happens entirely in the browser.
          Protected Health Information is passed via props and held only in memory.
        </p>
      </div>

      <ApiTable
        headers={['Safeguard', "How it's enforced"]}
        rows={[
          { cells: ['No data storage', 'Data is passed via props and held only in memory — nothing is written to disk'] },
          { cells: ['No logging of PHI', 'No console.log, console.debug, or telemetry captures patient data'] },
          { cells: ['No network transmission', 'Zero outbound API calls — the bundled template means nothing is even fetched'] },
          { cells: ['No persistence', 'No localStorage, sessionStorage, cookies, or IndexedDB of PHI'] },
          { cells: ['No third-party sharing', 'No analytics, tracking pixels, or external SDKs'] },
          { cells: ['Client-side only', 'pdf-lib runs in the browser — PHI never leaves the client'] },
          { cells: ['Stateless rendering', 'No internal state retains PHI beyond the render cycle'] },
        ]}
      />

      <div className="prose">
        <p>
          <strong>PHI data flow</strong>
        </p>
      </div>
      <CodeBlock code={DATA_FLOW} lang="bash" />

      <div className="prose">
        <p>
          <strong>Recommended for a compliant deployment:</strong>
        </p>
        <ul>
          <li>Gate form access behind role-based access control (RBAC).</li>
          <li>Log access events in your application layer (who viewed / printed / downloaded).</li>
          <li>Serve over HTTPS; set <code>Cache-Control: no-store</code> on pages rendering PHI.</li>
          <li>Auto-timeout idle sessions (≈15 min); ensure BAA coverage with your host.</li>
        </ul>
      </div>

      <Note>
        <span>
          <b>Disclaimer.</b> This library is designed to <b>support</b> HIPAA compliance but does
          not guarantee it on its own. Compliance is a holistic requirement across your entire
          application stack — access controls, audit logging, encryption, and organizational
          policies remain your responsibility.
        </span>
      </Note>
    </section>
  )
}
