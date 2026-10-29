import { type ReactNode } from 'react'
import { CodeBlock } from './CodeBlock'
import { type Lang } from '../lib/highlight'

export function Demo({
  id,
  title,
  tagline,
  flagship,
  live,
  code,
  lang = 'tsx',
  liveLabel = 'Live',
}: {
  id?: string
  title: string
  tagline?: string
  flagship?: boolean
  live?: ReactNode
  code: string
  lang?: Lang
  liveLabel?: string
}) {
  return (
    <section className="demo" id={id}>
      <div className="demo-head">
        <div className="demo-title">
          <h3>
            {id ? <a href={`#${id}`}>{title}</a> : title}
          </h3>
          {flagship && <span className="flagship-badge">Live demo</span>}
        </div>
        {tagline && <p className="demo-tagline">{tagline}</p>}
      </div>
      <div className="demo-body" style={live ? undefined : { gridTemplateColumns: '1fr' }}>
        {live && (
          <div className="demo-live">
            <div className="pane-label">{liveLabel}</div>
            {live}
          </div>
        )}
        <div className="demo-code-pane">
          <div className="pane-label" style={{ padding: '18px 20px 0' }}>
            Code
          </div>
          <CodeBlock code={code} lang={lang} />
        </div>
      </div>
    </section>
  )
}
