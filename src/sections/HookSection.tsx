import { Demo } from '../components/Demo'
import { CatHeader, ApiTable } from '../components/ui'
import { HOOK_USAGE } from '../lib/snippets'

export function HookSection() {
  return (
    <section id="use-cms1500" style={{ scrollMarginTop: 20 }}>
      <CatHeader icon="⚓" title="useCMS1500()" lead="The hook behind the component — generate, print, download, and bind your own iframe." />
      <Demo
        title="useCMS1500(options?)"
        tagline="Call generatePdf with your data, then wire the returned ref, print, and download."
        code={HOOK_USAGE}
        lang="tsx"
      />
      <ApiTable
        headers={['Returns', 'Type', 'Description']}
        rows={[
          { cells: ['pdfUrl', 'string | null', 'Blob URL of the generated PDF'] },
          { cells: ['loading', 'boolean', 'Generation in progress'] },
          { cells: ['error', 'Error | null', 'Last error'] },
          { cells: ['generatePdf', '(data) => Promise<string | null>', 'Generate / regenerate the PDF'] },
          { cells: ['handlePrint', '() => void', 'Print the generated PDF'] },
          { cells: ['handleDownload', '(filename?) => void', 'Download the generated PDF'] },
          { cells: ['iframeRef', 'RefObject<HTMLIFrameElement>', 'Ref for the iframe viewer'] },
          { cells: ['cleanup', '() => void', 'Revoke the blob URL'] },
        ]}
      />
    </section>
  )
}
