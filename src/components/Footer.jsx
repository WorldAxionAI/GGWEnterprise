import { Shield, ExternalLink, Globe2, MessageCircle, ArrowUp } from 'lucide-react'
import { Link } from 'react-router-dom'
import './Footer.css'

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="footer" id="footer">
      <div className="footer__glow" />
      <div className="container">
        <div className="footer__top">
          <div className="footer__brand">
            <div className="footer__logo">
              <div className="footer__logo-icon">
                <Shield size={20} />
              </div>
              <div>
                <div className="footer__logo-name">GGW Enterprise</div>
                <div className="footer__logo-tagline">Building the future of software</div>
              </div>
            </div>
            <p className="footer__brand-desc">
              World-class custom software, SaaS platforms, and secure web solutions.
              On a mission to become the #1 custom software creator in the world.
            </p>
          </div>

          <div className="footer__links-group">
            <h4>Services</h4>
            <a href="#services">Web Development</a>
            <a href="#services">SaaS Platforms</a>
            <a href="#services">Backend Engineering</a>
            <a href="#services">Cybersecurity</a>
            <a href="#services">UI/UX Design</a>
          </div>

          <div className="footer__links-group">
            <h4>Company</h4>
            <a href="#about">About Us</a>
            <a href="#portfolio">Portfolio</a>
            <a href="#testimonials">Testimonials</a>
            <Link to="/dashboard">Owner Dashboard</Link>
            <a href="#contact">Contact</a>
          </div>

          <div className="footer__links-group">
            <h4>Connect</h4>
            <a href="#" className="footer__social-link">
              <MessageCircle size={14} /> Twitter
            </a>
            <a href="#" className="footer__social-link">
              <Globe2 size={14} /> LinkedIn
            </a>
            <a href="#" className="footer__social-link">
              <ExternalLink size={14} /> GitHub
            </a>
          </div>
        </div>

        <div className="footer__bottom">
          <p>&copy; {new Date().getFullYear()} GGW Enterprise. All rights reserved.</p>
          <div className="footer__bottom-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </div>
          <button className="footer__back-to-top" onClick={scrollToTop} aria-label="Back to top" id="back-to-top">
            <ArrowUp size={18} />
          </button>
        </div>
      </div>
    </footer>
  )
}
