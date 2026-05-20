import { useState, useEffect } from 'react'
import { isAuthenticated } from './ownerAuth'
import OwnerLogin from './OwnerLogin'

export default function RequireOwner({ children }) {
  const [authed, setAuthed] = useState(() => isAuthenticated())

  useEffect(() => {
    const onStorage = () => setAuthed(isAuthenticated())
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [])

  if (!authed) return <OwnerLogin onSuccess={() => setAuthed(true)} />
  return children
}
