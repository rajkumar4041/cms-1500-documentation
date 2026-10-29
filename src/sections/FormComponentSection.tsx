import { CMS1500Form } from 'cms1500-react'
import { Demo } from '../components/Demo'
import { CatHeader, ApiTable } from '../components/ui'
import { sampleClaim } from '../lib/sampleClaim'

const COMPONENT_CODE = `import { CMS1500Form } from 'cms1500-react';

<CMS1500Form
  data={claimData}
  width="100%"
  height={520}
  showToolbar
  onPdfReady={(url) => console.log('ready', url)}
/>`

export function FormComponentSection() {
  return (
    <section id="cms1500form" style={{ scrollMarginTop: 20 }}>
      <CatHeader icon="❖" title="<CMS1500Form />" lead="A self-contained viewer that fills and renders the PDF for you." />
      <Demo
        title="<CMS1500Form />"
        tagline="Pass data in; get a rendered, printable CMS-1500 out."
        liveLabel="Rendered"
        live={
          <CMS1500Form
            data={sampleClaim}
            width="100%"
            height={420}
            showToolbar
          />
        }
        code={COMPONENT_CODE}
        lang="tsx"
      />
      <ApiTable
        headers={['Prop', 'Type', 'Default', 'Description']}
        rows={[
          { cells: ['data', 'CMS1500Data', 'required', 'Claim data to render'] },
          { cells: ['pdfTemplateUrl', 'string', 'bundled', 'Custom PDF template URL (uses embedded template by default)'] },
          { cells: ['onPdfReady', '(url: string) => void', '—', 'Called when the PDF is generated'] },
          { cells: ['onError', '(error: Error) => void', '—', 'Called on error'] },
          { cells: ['width', 'string | number', "'100%'", 'Viewer width'] },
          { cells: ['height', 'string | number', 'calc(100vh - 120px)', 'Viewer height'] },
          { cells: ['autoGenerate', 'boolean', 'true', 'Auto-generate on mount'] },
          { cells: ['showToolbar', 'boolean', 'false', "Show the package's Print / Download / Open toolbar"] },
          { cells: ['downloadFileName', 'string', 'cms-1500-claim.pdf', "File name for the toolbar's Download action"] },
          { cells: ['className / style', 'string / CSSProperties', '—', 'Styling hooks'] },
        ]}
      />
    </section>
  )
}
