import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { UserPlus, UserCheck, Calendar, Handshake, ArrowRight } from 'lucide-react'
import styles from './Workflow.module.css'

const steps = [
  { icon: UserPlus, title: 'Capture Land Leads', desc: 'AI autonomously captures and enriches high-intent buyers from your website, WhatsApp, Meta ads, and site walk-ins.', color: '#2563EB' },
  { icon: UserCheck, title: 'Smart Lead Routing', desc: 'Instant algorithmic distribution assigns the exact right sales executive based on project location, language, and deal size.', color: '#8B5CF6' },
  { icon: Calendar, title: 'Schedule Site Visit', desc: 'Autonomous AI assistants book verified site visits, send Google Maps routing links, and trigger automated WhatsApp follow-ups.', color: '#06B6D4' },
  { icon: Handshake, title: 'Close Plot Deal', desc: 'Generate RERA digital sale agreements, collect instant token advances via payment links, and track multi-year installment schedules.', color: '#10B981' },
]

export default function Workflow() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.15 })

  return (
    <section className={styles.section} ref={ref}>
      {/* Upgraded to container-fluid for edge-to-edge widescreen desktop span */}
      <div className={`container-fluid ${styles.containerInner}`}>
        
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className={styles.tag}>Autonomous Architecture</span>
          <h2 className={styles.title}>How <span className={styles.highlight}>PlotCRM AI</span> Works</h2>
          <p className={styles.subtitle}>A seamless 4-step conversion pipeline built for modern land developers</p>
        </motion.div>

        {/* Upscaled 4-Column Widescreen Blueprint Grid */}
        <div className={styles.stepsWrap}>
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              className={styles.stepCard}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.15, duration: 0.5, ease: 'easeOut' }}
            >
              <div className={styles.stepNumber} style={{ background: `${step.color}18`, color: step.color }}>
                STEP 0{i + 1}
              </div>
              
              <div className={styles.stepIcon} style={{ background: step.color }}>
                {/* UPSCALED ICON SIZE FROM 26 to 36 */}
                <step.icon size={36} />
              </div>
              
              <h3 className={styles.stepTitle}>{step.title}</h3>
              <p className={styles.stepDesc}>{step.desc}</p>
              
              {/* Upscaled Connecting Arrows */}
              {i < steps.length - 1 && (
                <div className={styles.arrowWrap}>
                  <ArrowRight size={36} className={styles.arrow} />
                </div>
              )}
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}