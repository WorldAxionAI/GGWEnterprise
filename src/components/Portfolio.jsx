import { useState } from 'react'
import { ChevronDown, CheckCircle2 } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { portfolio } from '../data/companyData'
import './Portfolio.css'

export default function Portfolio() {
  const [selected, setSelected] = useState(null)

  return (
    <section className="portfolio section" id="portfolio">
      <div className="container">
        <div className="section-header">
          <span className="badge badge--cyan">Our Work</span>
          <h2>
            Proven Results.<br />
            <span className="gradient-text">Successful Businesses.</span>
          </h2>
          <p>
            Every project we build becomes a success story. Here are platforms
            we've engineered that generate real revenue and real impact.
          </p>
        </div>

        <div className="portfolio__grid">
          {portfolio.map((project, index) => {
            const isOpen = selected === project.id
            return (
              <motion.div
                key={project.id}
                className={`portfolio-card glass-card ${isOpen ? 'portfolio-card--open' : ''}`}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onClick={() => setSelected(isOpen ? null : project.id)}
                id={`portfolio-${project.id}`}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSelected(isOpen ? null : project.id) } }}
              >
                <div className="portfolio-card__header">
                  <div className="portfolio-card__badge-row">
                    <span className="badge badge--success">{project.status}</span>
                    <span className="portfolio-card__category">{project.category}</span>
                  </div>
                  <h3
                    className="portfolio-card__name"
                    style={{ color: project.color }}
                  >
                    {project.name}
                  </h3>
                  <p className="portfolio-card__desc">{project.description}</p>
                </div>

                <div className="portfolio-card__metrics">
                  {Object.entries(project.metrics).map(([key, value]) => (
                    <div key={key} className="portfolio-card__metric">
                      <span className="portfolio-card__metric-value">{value}</span>
                      <span className="portfolio-card__metric-label">{key}</span>
                    </div>
                  ))}
                </div>

                <div className="portfolio-card__tech">
                  {project.tech.map((t) => (
                    <span key={t} className="portfolio-card__tech-tag">{t}</span>
                  ))}
                </div>

                <div className="portfolio-card__footer">
                  <span className="portfolio-card__link">
                    {isOpen ? 'Hide details' : 'View case study'}
                    <ChevronDown
                      size={14}
                      style={{ transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.25s' }}
                    />
                  </span>
                </div>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      className="portfolio-card__expanded"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="portfolio-card__expanded-inner">
                        <h4>Case study highlights</h4>
                        <ul>
                          <li><CheckCircle2 size={14} style={{ color: project.color }} /> Architecture designed for {project.category.toLowerCase()} scale</li>
                          <li><CheckCircle2 size={14} style={{ color: project.color }} /> Built with {project.tech.slice(0, 3).join(', ')}</li>
                          <li><CheckCircle2 size={14} style={{ color: project.color }} /> Currently {project.status.toLowerCase()} in production</li>
                          <li><CheckCircle2 size={14} style={{ color: project.color }} /> Continuous deployment + monitoring in place</li>
                        </ul>
                        <a
                          href="#contact"
                          className="btn btn--outline btn--small"
                          onClick={(e) => {
                            e.stopPropagation()
                            const el = document.querySelector('#contact')
                            if (el) { e.preventDefault(); el.scrollIntoView({ behavior: 'smooth' }) }
                          }}
                        >
                          Want something similar? Talk to us
                        </a>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div
                  className="portfolio-card__accent"
                  style={{ background: project.color }}
                />
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
