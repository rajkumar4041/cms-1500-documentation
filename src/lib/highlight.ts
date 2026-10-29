export type Lang = 'tsx' | 'ts' | 'json' | 'bash'

const KEYWORDS = [
  'const', 'let', 'var', 'function', 'return', 'import', 'export', 'from',
  'default', 'async', 'await', 'if', 'else', 'for', 'while', 'new', 'type',
  'interface', 'extends', 'implements', 'as', 'of', 'in', 'class', 'true',
  'false', 'null', 'undefined', 'void', 'this', 'typeof', 'keyof', 'enum',
]

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

interface Rule {
  re: RegExp
  cls: string | null // null = emit escaped, no wrapping span
}

function rulesFor(lang: Lang): Rule[] {
  const commentRe =
    lang === 'bash' ? /#[^\n]*/y : /\/\/[^\n]*|\/\*[\s\S]*?\*\//y
  const rules: Rule[] = [
    { re: commentRe, cls: 'tok-com' },
    { re: /"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|`(?:\\.|[^`\\])*`/y, cls: 'tok-str' },
    { re: /\b\d[\d_]*(?:\.\d+)?\b|\.\d+/y, cls: 'tok-num' },
  ]
  if (lang !== 'bash' && lang !== 'json') {
    rules.push({ re: new RegExp(`\\b(?:${KEYWORDS.join('|')})\\b`, 'y'), cls: 'tok-key' })
    rules.push({ re: /[A-Za-z_$][\w$]*(?=\s*\()/y, cls: 'tok-fn' })
  }
  if (lang === 'json') {
    rules.push({ re: /\b(?:true|false|null)\b/y, cls: 'tok-key' })
  }
  return rules
}

/** Tokenize source into HTML with `.tok-*` spans. All text is HTML-escaped. */
export function highlight(code: string, lang: Lang): string {
  const rules = rulesFor(lang)
  let out = ''
  let i = 0

  while (i < code.length) {
    let matched = false
    for (const rule of rules) {
      rule.re.lastIndex = i
      const m = rule.re.exec(code)
      if (m && m.index === i && m[0].length > 0) {
        const text = escapeHtml(m[0])
        out += rule.cls ? `<span class="${rule.cls}">${text}</span>` : text
        i += m[0].length
        matched = true
        break
      }
    }
    if (!matched) {
      out += escapeHtml(code[i])
      i += 1
    }
  }
  return out
}
