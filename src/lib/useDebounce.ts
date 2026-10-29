import { useEffect, useState } from 'react'

/** Returns `value` only after it has stopped changing for `ms` milliseconds. */
export function useDebounce<T>(value: T, ms: number): T {
  const [debounced, setDebounced] = useState<T>(value)

  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), ms)
    return () => clearTimeout(id)
  }, [value, ms])

  return debounced
}
