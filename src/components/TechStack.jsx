import { motion } from 'framer-motion'
import { techStack } from '../data/companyData'
import './TechStack.css'

const categoryColors = {
  Frontend: '#4d7cff',
  Language: '#7a8bff',
  Backend: '#00d4ff',
  Database: '#00f0a8',
  Cloud: '#80f5ff',
  DevOps: '#5eb8ff',
  API: '#4d7cff',
  Payments: '#00d4ff',
  'AI/ML': '#7a8bff',
  'Real-time': '#80f5ff',
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
