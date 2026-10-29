export interface NavLink {
  id: string
  text: string
}

export interface NavGroup {
  label: string
  links: NavLink[]
}

export const NAV: NavGroup[] = [
  {
    label: 'Getting Started',
    links: [
      { id: 'overview', text: 'Overview' },
      { id: 'installation', text: 'Installation' },
      { id: 'quick-start', text: 'Quick Start' },
    ],
  },
  {
    label: 'Components',
    links: [{ id: 'cms1500form', text: '<CMS1500Form />' }],
  },
  {
    label: 'Hooks',
    links: [{ id: 'use-cms1500', text: 'useCMS1500()' }],
  },
  {
    label: 'Headless / Core',
    links: [{ id: 'headless', text: 'fillCMS1500Pdf()' }],
  },
  {
    label: 'FHIR',
    links: [{ id: 'fhir', text: 'mapFHIRToCMS1500()' }],
  },
  {
    label: 'Data Reference',
    links: [
      { id: 'data-reference', text: 'CMS1500Data' },
      { id: 'constants', text: 'Field constants' },
    ],
  },
  {
    label: 'Compliance',
    links: [{ id: 'hipaa', text: 'HIPAA' }],
  },
]

export const NAV_IDS: string[] = NAV.flatMap((g) => g.links.map((l) => l.id))
