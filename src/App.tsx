import { ToastProvider } from './components/ToastProvider'
import { TopBar } from './components/TopBar'

export default function App() {
  return (
    <ToastProvider>
      <div className="layout">
        <aside className="sidebar">
          <div className="brand">
            cms1500-react <span className="ver">v1.3.1</span>
          </div>
        </aside>
        <main className="content">
          <TopBar />
          <div className="container">
            <h1>cms1500-react</h1>
          </div>
        </main>
      </div>
    </ToastProvider>
  )
}
