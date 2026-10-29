import { useEffect, useState } from 'react'

/**
 * Tracks which section is currently in view and returns its id.
 * Uses IntersectionObserver; the topmost intersecting section wins.
 */
export function useScrollSpy(ids: string[]): string {
  const [active, setActive] = useState<string>(ids[0] ?? '')

  useEffect(() => {
    const visible = new Map<string, number>()

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            visible.set(entry.target.id, entry.boundingClientRect.top)
          } else {
            visible.delete(entry.target.id)
          }
        }
        if (visible.size > 0) {
          // choose the section nearest the top of the viewport
          const top = [...visible.entries()].sort((a, b) => a[1] - b[1])[0]
          setActive(top[0])
        }
      },
      { rootMargin: '-10% 0px -70% 0px', threshold: 0 },
    )

    const els = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)
    els.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [ids])

  return active
}
