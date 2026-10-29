import { type ReactNode } from 'react'

export function CatHeader({ icon, title, lead }: { icon?: string; title: string; lead?: string }) {
  return (
    <div className="cat-header">
      <h2>
        {icon && <span aria-hidden="true">{icon}</span>} {title}
      </h2>
      {lead && <p>{lead}</p>}
    </div>
  )
}

export interface TableRow {
  cells: ReactNode[]
}

export function ApiTable({ headers, rows }: { headers: string[]; rows: TableRow[] }) {
  return (
    <table className="api-table">
      <thead>
        <tr>
          {headers.map((h) => (
            <th key={h}>{h}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((r, i) => (
          <tr key={i}>
            {r.cells.map((c, j) => (
              <td key={j}>{c}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export function Note({ children }: { children: ReactNode }) {
  return <div className="note">{children}</div>
}
