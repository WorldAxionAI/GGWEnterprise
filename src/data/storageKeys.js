// Centralized localStorage keys so Contact / Dashboard agree on shape.
export const STORAGE_KEYS = {
  projects: 'ggw.dash.projects',
  activity: 'ggw.dash.activity',
  leads: 'ggw.dash.leads',
  clients: 'ggw.dash.clients',
}

// Append a lead. Used by the Contact form; the Dashboard reads via useLocalStorage.
export function appendLead(lead) {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.leads)
    const list = raw ? JSON.parse(raw) : []
    const entry = {
      id: 'l' + Date.now(),
      submittedAt: new Date().toISOString(),
      status: 'new',
      ...lead,
    }
    const next = [entry, ...list].slice(0, 200)
    localStorage.setItem(STORAGE_KEYS.leads, JSON.stringify(next))
    return entry
  } catch {
    return null
  }
}
