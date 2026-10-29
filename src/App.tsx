import { useState } from 'react'
import { ToastProvider } from './components/ToastProvider'
import { TopBar } from './components/TopBar'
import { Sidebar } from './components/Sidebar'
import { Hero } from './components/Hero'
import { Demo } from './components/Demo'
import { Footer } from './components/Footer'
import { LiveClaimDemo } from './components/LiveClaimDemo'
import { JsonPlaygroundDemo } from './components/JsonPlaygroundDemo'
import { Installation } from './sections/Installation'
import { QuickStart } from './sections/QuickStart'
import { FormComponentSection } from './sections/FormComponentSection'
import { HookSection } from './sections/HookSection'
import { HeadlessSection } from './sections/HeadlessSection'
import { ValidationSection } from './sections/ValidationSection'
import { FhirSection } from './sections/FhirSection'
import { DataReferenceSection } from './sections/DataReferenceSection'
import { ConstantsSection } from './sections/ConstantsSection'
import { HipaaSection } from './sections/HipaaSection'

const FLAGSHIP_SNIPPET = `import { useCMS1500 } from 'cms1500-react';

function ClaimPreview({ claimData }) {
  const { pdfUrl, loading, generatePdf, handlePrint, handleDownload, iframeRef } =
    useCMS1500();

  useEffect(() => { generatePdf(claimData); }, [claimData]);

  return (
    <>
      <button onClick={handlePrint} disabled={!pdfUrl}>Print</button>
      <button onClick={() => handleDownload('claim.pdf')}>Download</button>
      <iframe ref={iframeRef} src={pdfUrl ?? undefined} />
    </>
  );
}`

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <ToastProvider>
      <div className="layout">
        <Sidebar open={menuOpen} onClose={() => setMenuOpen(false)} />
        <main className="content">
          <TopBar onMenuToggle={() => setMenuOpen((o) => !o)} />
          <div className="container">
            <Hero />
            <Demo
              title="Try it live"
              tagline="Edit the claim fields and watch a real CMS-1500 PDF fill in — generated entirely in your browser."
              flagship
              liveLabel="Live editor"
              live={<LiveClaimDemo />}
              code={FLAGSHIP_SNIPPET}
              lang="tsx"
            />
            <JsonPlaygroundDemo />
            <Installation />
            <QuickStart />
            <FormComponentSection />
            <HookSection />
            <HeadlessSection />
            <ValidationSection />
            <FhirSection />
            <DataReferenceSection />
            <ConstantsSection />
            <HipaaSection />
            <Footer />
          </div>
        </main>
      </div>
    </ToastProvider>
  )
}
