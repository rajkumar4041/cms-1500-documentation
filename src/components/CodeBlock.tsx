import { useMemo } from 'react'
import { highlight, type Lang } from '../lib/highlight'
import { useToast } from './ToastProvider'

export function CodeBlock({ code, lang }: { code: string; lang: Lang }) {
  const toast = useToast()
  const html = useMemo(() => highlight(code.replace(/\n$/, ''), lang), [code, lang])

  const copy = async () => {
    try {
      if (!navigator.clipboard?.writeText) throw new Error('clipboard unavailable')
      await navigator.clipboard.writeText(code.replace(/\n$/, ''))
      toast('Copied to clipboard')
    } catch {
      toast('Copy failed')
    }
  }

  return (
    <div className="code-block">
      <button className="btn sm ghost copy" onClick={copy} aria-label="Copy code">
        Copy
      </button>
      <pre>
        <code dangerouslySetInnerHTML={{ __html: html }} />
      </pre>
    </div>
  )
}
