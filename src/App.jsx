import { Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import OwnerDashboard from './pages/dashboard/OwnerDashboard'
import RequireOwner from './auth/RequireOwner'

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route
        path="/dashboard/*"
        element={
          <RequireOwner>
            <OwnerDashboard />
          </RequireOwner>
        }
      />
    </Routes>
  )
}

export default App
