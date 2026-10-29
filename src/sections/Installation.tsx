import { CodeBlock } from '../components/CodeBlock'
import { CatHeader, Note } from '../components/ui'
import { INSTALL_CMD } from '../lib/snippets'

export function Installation() {
  return (
    <section id="installation" style={{ scrollMarginTop: 20 }}>
      <CatHeader icon="◆" title="Installation" lead="Install the package and its single peer, pdf-lib." />
      <CodeBlock code={`$ ${INSTALL_CMD}`} lang="bash" />
      <div className="prose">
        <p>
          <strong>Peer dependencies:</strong> <code>react &gt;= 17</code> and{' '}
          <code>react-dom &gt;= 17</code>.
        </p>
      </div>
      <Note>
        <span>
          <b>Zero config.</b> The CMS-1500 PDF template is bundled inside the package. No file
          copying, no <code>public/</code> setup, no URL configuration — install and use.
        </span>
      </Note>
    </section>
  )
}
