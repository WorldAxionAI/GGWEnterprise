import { motion } from 'framer-motion'
import { techStack } from '../data/companyData'
import './TechStack.css'

const categoryColors = {
  Frontend: '#6c5ce7',
  Language: '#e040fb',
  Backend: '#00d2ff',
  Database: '#00e676',
  Cloud: '#ffc107',
  DevOps: '#ff5252',
  API: '#6c5ce7',
  Payments: '#00d2ff',
  'AI/ML': '#e040fb',
  'Real-time': '#ffc107',
}

export default function TechStack() {
  return (
    <section className="tech-stack section" id="technology">
      <div className="container">
        <div className="section-header">
          <span className="badge badge--primary">Our Arsenal</span>
          <h2>
            Powered by <span className="gradient-text">Modern Technology</span>
          </h2>
          <p>
            We leverage the most powerful tools in the industry to deliver
            software that's fast, secure, and built to last.
          </p>
        </div>

        <div className="tech-stack__grid">
          {techStack.map((tech, index) => (
            <motion.div
              key={tech.name}
              className="tech-chip"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              whileHover={{ scale: 1.05, y: -3 }}
              style={{
                borderColor: `${categoryColors[tech.category]}30`,
              }}
              id={`tech-${tech.name.toLowerCase().replace(/[\s.]/g, '-')}`}
            >
              <span
                className="tech-chip__dot"
                style={{ background: categoryColors[tech.category] }}
              />
              <span className="tech-chip__name">{tech.name}</span>
              <span
                className="tech-chip__category"
                style={{ color: categoryColors[tech.category] }}
              >
                {tech.category}
              </span>
            </motion.div>
          ))}
        </div>

        <div className="tech-stack__bottom">
          <p className="tech-stack__note">
            + dozens more tools, libraries, and frameworks tailored to each project's needs
          </p>
        </div>
      </div>
    </section>
  )
}
