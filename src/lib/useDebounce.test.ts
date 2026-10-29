import { act, renderHook } from '@testing-library/react'
import { afterEach, expect, test, vi } from 'vitest'
import { useDebounce } from './useDebounce'

afterEach(() => {
  vi.useRealTimers()
})

test('returns latest value only after delay; rapid changes collapse', () => {
  vi.useFakeTimers()
  const { result, rerender } = renderHook(({ v }) => useDebounce(v, 200), {
    initialProps: { v: 'a' },
  })
  rerender({ v: 'b' })
  rerender({ v: 'c' })
  expect(result.current).toBe('a')
  act(() => {
    vi.advanceTimersByTime(200)
  })
  expect(result.current).toBe('c')
})

test('does not update before the delay elapses', () => {
  vi.useFakeTimers()
  const { result, rerender } = renderHook(({ v }) => useDebounce(v, 300), {
    initialProps: { v: 1 },
  })
  rerender({ v: 2 })
  act(() => {
    vi.advanceTimersByTime(299)
  })
  expect(result.current).toBe(1)
  act(() => {
    vi.advanceTimersByTime(1)
  })
  expect(result.current).toBe(2)
})
