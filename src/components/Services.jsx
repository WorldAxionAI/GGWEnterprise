import { Globe, Cloud, Server, Shield, Palette, BrainCircuit, ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { services } from '../data/companyData'
import './Services.css'

const iconMap = { Globe, Cloud, Server, Shield, Palette, BrainCircuit }

export default function Services() {
  return (
    <section className="services section" id="services">
      <div className="container">
        <div className="section-header">
          <span className="badge badge--primary">What We Build</span>
          <h2>
            Enterprise Solutions.<br />
            <span className="gradient-text">Infinite Possibilities.</span>
          </h2>
          <p>
            From concept to deployment, we deliver battle-tested software that
            scales with your ambition. No shortcuts. No compromises.
          </p>
        </div>

        <div className="services__grid">
          {services.map((service, index) => {
            const Icon = iconMap[service.icon]
            return (
              <motion.div
                key={service.id}
                className="service-card glass-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                id={`service-${service.id}`}
              >
                <div
                  className="service-card__icon"
                  style={{
                    background: `${service.color}15`,
                    boxShadow: `0 0 30px ${service.color}20`,
                  }}
                >
                  {Icon && <Icon size={28} style={{ color: service.color }} />}
                </div>
                <h3 className="service-card__title">{service.title}</h3>
                <p className="service-card__desc">{service.description}</p>
                <div className="service-card__features">
                  {service.features.map((f) => (
                    <span key={f} className="service-card__feature" style={{ borderColor: `${service.color}30` }}>
                      {f}
                    </span>
                  ))}
                </div>
                <a href="#contact" className="service-card__cta">
                  Learn More <ArrowRight size={14} />
                </a>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
