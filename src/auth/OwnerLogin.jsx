import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Shield, Lock, Eye, EyeOff, ArrowLeft, AlertCircle, Loader2 } from 'lucide-react'
import { motion } from 'framer-motion'
import { verifyPassword, setAuthenticated } from './ownerAuth'
import './OwnerLogin.css'

export default function OwnerLogin({ onSuccess }) {
  const [password, setPassword] = useState('')
  const [show, setShow] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const ok = await verifyPassword(password)
      if (ok) {
        setAuthenticated()
        if (onSuccess) onSuccess()
        else navigate('/dashboard')
      } else {
        setError('Incorrect password. Access denied.')
      }
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="owner-login">
      <div className="owner-login__bg">
        <div className="glow-orb glow-orb--cyan owner-login__orb-1" />
        <div className="glow-orb glow-orb--purple owner-login__orb-2" />
      </div>

      <motion.div
        className="owner-login__card glass-card"
        initial={{ opacity: 0, y: 24, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
      >
        <Link to="/" className="owner-login__back">
          <ArrowLeft size={14} /> Back to site
        </Link>

        <div className="owner-login__icon">
          <Shield size={28} />
        </div>

        <div className="owner-login__header">
          <span className="badge badge--cyan">RESTRICTED</span>
          <h1>Owner Access</h1>
          <p>
            This area is for the GGW Enterprise owner only. Enter your password
            to continue.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="owner-login__form">
          <div className="owner-login__field">
            <Lock size={16} className="owner-login__field-icon" />
            <input
              id="owner-password"
              type={show ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Owner password"
              autoFocus
              autoComplete="current-password"
              required
            />
            <button
              type="button"
              className="owner-login__toggle"
              onClick={() => setShow((s) => !s)}
              aria-label={show ? 'Hide password' : 'Show password'}
            >
              {show ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>

          {error && (
            <div className="owner-login__error">
              <AlertCircle size={14} /> {error}
            </div>
          )}

          <button
            type="submit"
            className="btn btn--primary btn--large owner-login__submit"
            disabled={loading || !password}
          >
            {loading ? (
              <>
                <Loader2 size={16} className="owner-login__spin" /> Verifying...
              </>
            ) : (
              <>Authenticate</>
            )}
          </button>
        </form>

        <div className="owner-login__footnote">
          Forgot your password? Reset it by clearing site data in your browser
          (this restores the default <code>axional2026</code>).
        </div>
      </motion.div>
    </div>
  )
}
