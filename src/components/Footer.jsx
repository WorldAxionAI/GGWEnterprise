import { Shield, ExternalLink, Mail, Code2, ArrowUp } from 'lucide-react'
import { Link } from 'react-router-dom'
import './Footer.css'

const CONTACT_EMAIL = 'officialaxionai@gmail.com'
const REPO_URL = 'https://github.com/WorldAxionAI/GGWEnterprise'

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleAnchorClick = (href) => (e) => {
    const target = document.querySelector(href)
    if (target) {
      e.preventDefault()
      target.scrollIntoView({ behavior: 'smooth' })
    }
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
            <a href="#services" onClick={handleAnchorClick('#services')}>Web Development</a>
            <a href="#services" onClick={handleAnchorClick('#services')}>SaaS Platforms</a>
            <a href="#services" onClick={handleAnchorClick('#services')}>Backend Engineering</a>
            <a href="#services" onClick={handleAnchorClick('#services')}>Cybersecurity</a>
            <a href="#services" onClick={handleAnchorClick('#services')}>UI/UX Design</a>
          </div>

          <div className="footer__links-group">
            <h4>Company</h4>
            <a href="#about" onClick={handleAnchorClick('#about')}>About Us</a>
            <a href="#portfolio" onClick={handleAnchorClick('#portfolio')}>Portfolio</a>
            <a href="#testimonials" onClick={handleAnchorClick('#testimonials')}>Testimonials</a>
            <Link to="/dashboard">Owner Dashboard</Link>
            <a href="#contact" onClick={handleAnchorClick('#contact')}>Contact</a>
          </div>

          <div className="footer__links-group">
            <h4>Connect</h4>
            <a href={`mailto:${CONTACT_EMAIL}`} className="footer__social-link">
              <Mail size={14} /> Email
            </a>
            <a href={REPO_URL} target="_blank" rel="noopener noreferrer" className="footer__social-link">
              <Code2 size={14} /> GitHub
            </a>
            <a href="#contact" onClick={handleAnchorClick('#contact')} className="footer__social-link">
              <ExternalLink size={14} /> Start a project
            </a>
          </div>
        </div>

        <div className="footer__bottom">
          <p>&copy; {new Date().getFullYear()} GGW Enterprise. All rights reserved.</p>
          <button className="footer__back-to-top" onClick={scrollToTop} aria-label="Back to top" id="back-to-top">
            <ArrowUp size={18} />
          </button>
        </div>
      </div>
    </footer>
  )
}
