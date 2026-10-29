import { NAV, NAV_IDS } from '../lib/nav'
import { useScrollSpy } from '../lib/useScrollSpy'

export function Sidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  const active = useScrollSpy(NAV_IDS)

  const go = (e: React.MouseEvent, id: string) => {
    e.preventDefault()
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    onClose()
  }

  return (
    <aside className={`sidebar${open ? ' open' : ''}`}>
      <a className="brand" href="#overview" onClick={(e) => go(e, 'overview')}>
        <img className="logo" src="/favicon.svg" alt="" />
        cms1500-react <span className="ver">v1.4.1</span>
      </a>
      <p className="sidebar-sub">Fill, render & print CMS-1500 claims as real PDFs.</p>

      {NAV.map((group) => (
        <div key={group.label}>
          <div className="nav-group-label">{group.label}</div>
          {group.links.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className={`nav-link${active === link.id ? ' active' : ''}`}
              onClick={(e) => go(e, link.id)}
            >
              {link.text}
            </a>
          ))}
        </div>
      ))}
    </aside>
  )
}
