import { describe, expect, test } from 'vitest'
import { highlight } from './highlight'

describe('highlight', () => {
  test('wraps string literals and keywords', () => {
    const out = highlight(`const x = "hi"`, 'ts')
    expect(out).toContain('tok-key') // const
    expect(out).toContain('tok-str') // "hi"
  })

  test('escapes html special chars', () => {
    expect(highlight('a < b', 'ts')).toContain('&lt;')
  })

  test('comments are tokenized', () => {
    expect(highlight('// note', 'ts')).toContain('tok-com')
  })

  test('numbers are tokenized', () => {
    expect(highlight('const n = 42', 'ts')).toContain('tok-num')
  })

  test('json keys and strings highlight without throwing', () => {
    const out = highlight('{ "a": "b", "n": 1 }', 'json')
    expect(out).toContain('tok-str')
    expect(out).toContain('tok-num')
  })
})
