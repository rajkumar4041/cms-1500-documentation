import { useState } from 'react'
import { ToastProvider } from './components/ToastProvider'
import { TopBar } from './components/TopBar'
import { Sidebar } from './components/Sidebar'
import { Hero } from './components/Hero'
import { Demo } from './components/Demo'
import { Footer } from './components/Footer'

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
              id="quick-start"
              title="Quick Start"
              tagline="Render a filled CMS-1500 with a single component."
              code={`import { CMS1500Form } from 'cms1500-react';\n\n<CMS1500Form data={claimData} width="100%" />`}
              lang="tsx"
            />
            <Footer />
          </div>
        </main>
      </div>
    </ToastProvider>
  )
}
