import { useState } from 'react'
import { ToastProvider } from './components/ToastProvider'
import { TopBar } from './components/TopBar'
import { Sidebar } from './components/Sidebar'

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <ToastProvider>
      <div className="layout">
        <Sidebar open={menuOpen} onClose={() => setMenuOpen(false)} />
        <main className="content">
          <TopBar onMenuToggle={() => setMenuOpen((o) => !o)} />
          <div className="container">
            <h1>cms1500-react</h1>
          </div>
        </main>
      </div>
    </ToastProvider>
  )
}
