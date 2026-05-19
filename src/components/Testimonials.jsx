import { Star, Quote } from 'lucide-react'
import { motion } from 'framer-motion'
import { testimonials } from '../data/companyData'
import './Testimonials.css'

export default function Testimonials() {
  return (
    <section className="testimonials section" id="testimonials">
      <div className="container">
        <div className="section-header">
          <span className="badge badge--warning">Client Love</span>
          <h2>
            What Industry Leaders<br />
            <span className="gradient-text">Say About Us</span>
          </h2>
          <p>
            Don't just take our word for it. Here's what our enterprise clients
            have to say about working with GGW.
          </p>
        </div>

        <div className="testimonials__grid">
          {testimonials.map((t, index) => (
            <motion.div
              key={index}
              className="testimonial-card glass-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              id={`testimonial-${index}`}
            >
              <Quote size={32} className="testimonial-card__quote-icon" />
              <p className="testimonial-card__content">{t.content}</p>
              <div className="testimonial-card__stars">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} size={14} fill="#ffc107" color="#ffc107" />
                ))}
              </div>
              <div className="testimonial-card__author">
                <div className="testimonial-card__avatar">
                  {t.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <div className="testimonial-card__name">{t.name}</div>
                  <div className="testimonial-card__role">{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
