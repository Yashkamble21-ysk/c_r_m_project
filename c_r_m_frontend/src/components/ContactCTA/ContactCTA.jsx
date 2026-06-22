import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ArrowRight, Calendar } from 'lucide-react'
import styles from './ContactCTA.module.css'

export default function ContactCTA() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 })

  return (
    <section id="contact" className={styles.section} ref={ref}>
      <div className={styles.bgOrb1} />
      <div className={styles.bgOrb2} />

      <div className="container">
        <motion.div
          className={styles.content}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className={styles.title}>
            Ready to Transform Your <span className={styles.highlight}>Plot Sales</span> Business?
          </h2>
          <p className={styles.desc}>
            Join thousands of real estate businesses already using PlotCRM AI to sell more plots, faster. Start your free trial today — no credit card required.
          </p>
          <div className={styles.btnGroup}>
            <motion.a
              href="#pricing"
              className={styles.btnMain}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={(e) => {
                e.preventDefault()
                document.querySelector('#pricing')?.scrollIntoView({ behavior: 'smooth' })
              }}
            >
              Start Free Trial <ArrowRight size={18} />
            </motion.a>
            <motion.a
              href="#contact"
              className={styles.btnSecondary}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <Calendar size={18} /> Schedule Demo
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}