import { Target, Rocket, Lock, Users, Globe2, Award } from 'lucide-react'
import { motion } from 'framer-motion'
import './About.css'

const values = [
  {
    icon: Target,
    title: 'Mission-Driven',
    description: 'Every line of code we write is aimed at making our clients the dominant force in their market.',
    color: '#6c5ce7',
  },
  {
    icon: Lock,
    title: 'Security First',
    description: 'Enterprise-grade security is baked into our DNA. Zero-trust architecture, end-to-end encryption, always.',
    color: '#00e676',
  },
  {
    icon: Rocket,
    title: 'Speed to Market',
    description: 'We ship fast without cutting corners. Our agile process delivers MVPs in weeks, not months.',
    color: '#00d2ff',
  },
  {
    icon: Users,
    title: 'Elite Talent',
    description: 'Our engineers come from top-tier backgrounds and bring battle-tested expertise to every project.',
    color: '#e040fb',
  },
  {
    icon: Globe2,
    title: 'Global Scale',
    description: 'We build for billions. Our architectures handle massive traffic across global infrastructure.',
    color: '#ffc107',
  },
  {
    icon: Award,
    title: 'Excellence Standard',
    description: 'We don\'t do "good enough." Every deliverable meets our world-class quality bar.',
    color: '#ff5252',
  },
]

export default function About() {
  return (
    <section className="about section" id="about">
      <div className="container">
        <div className="about__hero">
          <motion.div
            className="about__hero-content"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="badge badge--primary">Who We Are</span>
            <h2>
              The Future of<br />
              <span className="gradient-text">Custom Software</span>
            </h2>
            <p>
              GGW Enterprise isn't just another dev shop. We're a team of elite
              engineers, designers, and strategists on a mission to become the
              world's #1 custom software company.
            </p>
            <p>
              We've built successful businesses ourselves — from healthcare
              platforms to e-commerce empires — proving that we don't just write
              code, we create companies that win.
            </p>
            <p>
              Our vision: a world where every business has access to
              enterprise-grade technology, built with the highest security
              standards and designed for the future.
            </p>
          </motion.div>

          <motion.div
            className="about__hero-visual"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="about__vision-card glass-card">
              <div className="about__vision-header">
                <span className="about__vision-year">2027</span>
                <span className="about__vision-label">Our Vision</span>
              </div>
              <h3 className="about__vision-title gradient-text">
                #1 Custom Software<br />Creator Worldwide
              </h3>
              <div className="about__vision-metrics">
                <div className="about__vision-metric">
                  <span className="about__vision-metric-value">$10M+</span>
                  <span className="about__vision-metric-label">ARR Target</span>
                </div>
                <div className="about__vision-metric">
                  <span className="about__vision-metric-value">200+</span>
                  <span className="about__vision-metric-label">Enterprise Clients</span>
                </div>
                <div className="about__vision-metric">
                  <span className="about__vision-metric-value">5</span>
                  <span className="about__vision-metric-label">Global Offices</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="about__values">
          <h3 className="about__values-title">Our Core Values</h3>
          <div className="about__values-grid">
            {values.map((value, index) => {
              const Icon = value.icon
              return (
                <motion.div
                  key={value.title}
                  className="value-card"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  id={`value-${value.title.toLowerCase().replace(/\s/g, '-')}`}
                >
                  <Icon size={24} style={{ color: value.color }} />
                  <h4>{value.title}</h4>
                  <p>{value.description}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
