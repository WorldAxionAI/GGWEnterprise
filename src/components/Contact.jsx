import { useState } from 'react'
import { Send, Mail, Phone, MapPin, ArrowRight, CheckCircle } from 'lucide-react'
import { motion } from 'framer-motion'
import './Contact.css'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    budget: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 4000)
    setFormData({ name: '', email: '', company: '', budget: '', message: '' })
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <section className="contact section" id="contact">
      <div className="container">
        <div className="contact__inner">
          <motion.div
            className="contact__info"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="badge badge--primary">Let's Talk</span>
            <h2>
              Ready to Build<br />
              <span className="gradient-text">Something Incredible?</span>
            </h2>
            <p>
              Whether you need a full SaaS platform, a stunning website, or an
              enterprise security overhaul — we're ready to make it happen.
            </p>

            <div className="contact__details">
              <div className="contact__detail">
                <Mail size={18} className="contact__detail-icon" />
                <span>contact@ggwenterprise.com</span>
              </div>
              <div className="contact__detail">
                <Phone size={18} className="contact__detail-icon" />
                <span>+1 (555) 0199</span>
              </div>
              <div className="contact__detail">
                <MapPin size={18} className="contact__detail-icon" />
                <span>United States — Global Operations</span>
              </div>
            </div>

            <div className="contact__guarantee glass-card">
              <h4>Our Guarantee</h4>
              <ul>
                <li><CheckCircle size={14} /> Free initial consultation</li>
                <li><CheckCircle size={14} /> Response within 24 hours</li>
                <li><CheckCircle size={14} /> NDA ready on request</li>
                <li><CheckCircle size={14} /> Fixed-price or hourly options</li>
              </ul>
            </div>
          </motion.div>

          <motion.form
            className="contact__form glass-card"
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            id="contact-form"
          >
            {submitted && (
              <div className="contact__success">
                <CheckCircle size={24} />
                <span>Message sent! We'll be in touch within 24 hours.</span>
              </div>
            )}

            <div className="contact__form-row">
              <div className="contact__field">
                <label htmlFor="contact-name">Full Name</label>
                <input
                  type="text"
                  id="contact-name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Smith"
                  required
                />
              </div>
              <div className="contact__field">
                <label htmlFor="contact-email">Email Address</label>
                <input
                  type="email"
                  id="contact-email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@company.com"
                  required
                />
              </div>
            </div>

            <div className="contact__form-row">
              <div className="contact__field">
                <label htmlFor="contact-company">Company</label>
                <input
                  type="text"
                  id="contact-company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="Your Company"
                />
              </div>
              <div className="contact__field">
                <label htmlFor="contact-budget">Budget Range</label>
                <select
                  id="contact-budget"
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                >
                  <option value="">Select Budget</option>
                  <option value="10k-25k">$10K — $25K</option>
                  <option value="25k-50k">$25K — $50K</option>
                  <option value="50k-100k">$50K — $100K</option>
                  <option value="100k-250k">$100K — $250K</option>
                  <option value="250k+">$250K+</option>
                </select>
              </div>
            </div>

            <div className="contact__field">
              <label htmlFor="contact-message">Project Details</label>
              <textarea
                id="contact-message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell us about your project, goals, and timeline..."
                rows={5}
                required
              />
            </div>

            <button type="submit" className="btn btn--primary btn--large contact__submit" id="contact-submit">
              <Send size={18} /> Send Message
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  )
}
