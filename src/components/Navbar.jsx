import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, ChevronRight, Shield } from 'lucide-react'
import './Navbar.css'

const navLinks = [
  { label: 'Services', href: '#services' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Technology', href: '#technology' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (href) => {
    setMobileOpen(false)
    if (href.startsWith('#')) {
      const element = document.querySelector(href)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  return (
    <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`} id="main-nav">
      <div className="navbar__inner container">
        <Link to="/" className="navbar__logo" id="nav-logo">
          <div className="navbar__logo-icon">
            <Shield size={24} />
          </div>
          <div className="navbar__logo-text">
            <span className="navbar__logo-name">GGW</span>
            <span className="navbar__logo-sub">ENTERPRISE</span>
          </div>
        </Link>

        <div className={`navbar__links ${mobileOpen ? 'navbar__links--open' : ''}`}>
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="navbar__link"
              onClick={() => handleNavClick(link.href)}
              id={`nav-${link.label.toLowerCase()}`}
            >
              {link.label}
            </a>
          ))}
          <div className="navbar__actions-mobile">
            <Link to="/dashboard" className="btn btn--primary btn--small" onClick={() => setMobileOpen(false)}>
              Owner Dashboard <ChevronRight size={16} />
            </Link>
          </div>
        </div>

        <div className="navbar__actions">
          <Link to="/dashboard" className="btn btn--primary btn--small" id="nav-dashboard-btn">
            Owner Dashboard <ChevronRight size={16} />
          </Link>
        </div>

        <button
          className="navbar__toggle"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle navigation"
          id="nav-toggle"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </nav>
  )
}
