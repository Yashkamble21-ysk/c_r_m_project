import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Zap, TrendingUp, Bot, BarChart3, Clock } from 'lucide-react'
import styles from './AISection.module.css'

const metrics = [
  { icon: Zap, value: 66, suffix: '%', label: 'Faster Lead Qualification Velocity', color: '#2563EB' },
  { icon: TrendingUp, value: 40, suffix: '%', label: 'Higher Site-Visit Conversion Rate', color: '#10B981' },
  { icon: Bot, value: 70, suffix: '%', label: 'Fully Automated Customer Queries', color: '#8B5CF6' },
  { icon: BarChart3, value: 15, suffix: '%', label: 'Overall Sales Pipeline Expansion', color: '#06B6D4' },
  { icon: Clock, value: 2, suffix: 'X', label: 'Faster Instant Follow-Up Response', color: '#F59E0B' },
]

export default function AISection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.15 })

  return (
    <section id="ai-section" className={styles.section} ref={ref}>
      {/* Upgraded to container-fluid for edge-to-edge widescreen desktop span */}
      <div className={`container-fluid ${styles.containerInner}`}>
        <div className="row align-items-center g-5">
          
          {/* Left Column: Big Enterprise Pitch */}
          <div className="col-lg-6">
            <motion.div
              className={styles.leftContent}
              initial={{ opacity: 0, x: -40 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, ease: 'easeOut' }}
            >
              <span className={styles.tag}>AI-Powered Business Velocity</span>
              
              <h2 className={styles.title}>
                AI That Delivers <span className={styles.highlight}>Real Business Results</span>
              </h2>
              
              <p className={styles.desc}>
                Many software companies talk about abstract AI, but our Plot Sales CRM helps real estate developers achieve concrete, measurable financial growth. Automate multi-channel customer conversations, qualify incoming land leads instantly, schedule verified site visits, and double your booking conversions using intelligent autonomous agents.
              </p>
            </motion.div>
          </div>

          {/* Right Column: Upscaled Progress Metric Cards */}
          <div className="col-lg-6">
            <div className={styles.metricsGrid}>
              {metrics.map((m, i) => (
                <motion.div
                  key={m.label}
                  className={styles.metricCard}
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: i * 0.1, duration: 0.5, ease: 'easeOut' }}
                >
                  <div className={styles.metricTop}>
                    <div className={styles.metricIconWrap} style={{ background: `${m.color}18`, color: m.color }}>
                      {/* UPSCALED ICON SIZE FROM 20 to 28 */}
                      <m.icon size={28} />
                    </div>
                    <span className={styles.metricValue} style={{ color: m.color }}>
                      {m.value}{m.suffix}
                    </span>
                  </div>
                  
                  <p className={styles.metricLabel}>{m.label}</p>
                  
                  <div className={styles.progressBar}>
                    <motion.div
                      className={styles.progressFill}
                      style={{ background: m.color }}
                      initial={{ width: 0 }}
                      animate={inView ? { width: `${m.value}%` } : { width: 0 }}
                      transition={{ delay: 0.4 + i * 0.1, duration: 1.2, ease: 'easeOut' }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}