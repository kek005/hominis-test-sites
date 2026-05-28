import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { PATIENTS, WARDS, WARD_BEDS, APPOINTMENTS, STAFF, ADMISSIONS, DEMO_USER } from '../data/seed.js'

const KEY = 'pulse.state.v1'

function freshState() {
  return { auth: false, patients: structuredClone(PATIENTS), appointments: structuredClone(APPOINTMENTS) }
}

function loadState() {
  try {
    const raw = localStorage.getItem(KEY)
    if (raw) return JSON.parse(raw)
  } catch {
    // ignore
  }
  return freshState()
}

const StoreContext = createContext(null)
let seq = Date.now()

export function StoreProvider({ children }) {
  const [state, setState] = useState(loadState)
  useEffect(() => { localStorage.setItem(KEY, JSON.stringify(state)) }, [state])

  const api = useMemo(
    () => ({
      ...state,
      user: DEMO_USER,
      wards: WARDS,
      wardBeds: WARD_BEDS,
      staff: STAFF,
      admissions: ADMISSIONS,
      patientById: (id) => state.patients.find((p) => p.id === id),

      login(email, password) {
        if (email.trim().toLowerCase() === DEMO_USER.email && password === DEMO_USER.password) {
          setState((s) => ({ ...s, auth: true }))
          return { ok: true }
        }
        return { ok: false, error: 'Incorrect email or password.' }
      },
      logout() { setState((s) => ({ ...s, auth: false })) },

      admitPatient(p) {
        const i = ++seq
        const patient = {
          id: 'p' + i, mrn: 'MRN-' + (500000 + (i % 9999)),
          status: 'Admitted', admitted: new Date().toISOString().slice(0, 10),
          vitals: { hr: 78, bp: '120/80', temp: '36.8', spo2: 98, resp: 16 },
          allergies: p.allergies ? [p.allergies] : ['None'], meds: [], notes: [],
          ...p,
        }
        setState((s) => ({ ...s, patients: [patient, ...s.patients] }))
        return patient
      },
      setStatus(id, status) {
        setState((s) => ({ ...s, patients: s.patients.map((p) => (p.id === id ? { ...p, status } : p)) }))
      },
      addNote(id, text) {
        const note = { id: 'n' + ++seq, at: new Date().toISOString().slice(0, 16).replace('T', ' '), author: DEMO_USER.name, text }
        setState((s) => ({ ...s, patients: s.patients.map((p) => (p.id === id ? { ...p, notes: [note, ...(p.notes || [])] } : p)) }))
      },
      resetDemo() { localStorage.removeItem(KEY); window.location.href = '/' },
    }),
    [state],
  )

  return <StoreContext.Provider value={api}>{children}</StoreContext.Provider>
}

export function useStore() {
  const ctx = useContext(StoreContext)
  if (!ctx) throw new Error('useStore must be used within StoreProvider')
  return ctx
}
