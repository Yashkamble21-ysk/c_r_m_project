import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Check, Sparkles } from 'lucide-react'
import styles from './Pricing.module.css'

const plans = [
  {
    name: 'Starter Tier',
    monthly: 1999,
    yearly: 19990,
    desc: 'Perfect for small agencies getting started',
    features: ['Up to 5 Team Users', 'Smart Lead Routing', 'Customer Database', 'Standard Support'],
    highlight: false
  },
  {
    name: 'Professional',
    monthly: 4999,
    yearly: 49990,
    desc: 'For scaling teams with advanced pipelines',
    features: ['Up to 25 Team Users', 'Visual Kanban Pipeline', 'AI Assistant Core', 'Custom Analytics', 'WhatsApp API Sync'],
    highlight: false
  },
  {
    name: 'Business Grid',
    monthly: 9999,
    yearly: 99990,
    desc: 'Full automation for multi-project developers',
    features: ['Unlimited Team Users', 'Marketing Automation', 'Advanced AI Insights', 'Full API & Webhooks', 'Priority Queuing'],
    highlight: false
  },
  {
    name: 'Enterprise Core',
    monthly: 24999,
    yearly: 249990,
    desc: 'Maximum power for national developers',
    features: ['Everything Included', 'Autonomous AI Agents', 'Bespoke Dashboards', '24/7 SLA Guarantee', 'Dedicated Manager'],
    highlight: true
  }
]

export default function Pricing() {
  const [yearly, setYearly] = useState(false)
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section id="pricing" className={styles.section} ref={ref}>
      <div className={`container-fluid ${styles.containerInner}`}>
        
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className={styles.tag}>Transparent Investment</span>
          <h2 className={styles.title}>Choose the CRM Plan That's <span className={styles.highlight}>Right for You</span></h2>
        </motion.div>

        {/* Upscaled Toggle */}
        <motion.div
          className={styles.toggleWrap}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3 }}
        >
          <span className={!yearly ? styles.activeLabel : styles.inactiveLabel}>Monthly Billing</span>
          <button
            className={`${styles.toggle} ${yearly ? styles.yearly : ''}`}
            onClick={() => setYearly(!yearly)}
            aria-label="Toggle pricing"
          >
            <span className={styles.toggleKnob} />
          </button>
          <span className={yearly ? styles.activeLabel : styles.inactiveLabel}>
            Annual Billing <span className={styles.saveBadge}>SAVE 17%</span>
          </span>
        </motion.div>

        <div className={styles.grid}>
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              className={`${styles.card} ${plan.highlight ? styles.highlighted : ''}`}
              custom={i}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1 + 0.2, duration: 0.5, ease: 'easeOut' }}
              whileHover={{ y: -8, transition: { duration: 0.25 } }}
            >
              {plan.highlight && (
                <div className={styles.popularBadge}>
                  <Sparkles size={18} /> Most Popular Tier
                </div>
              )}
              
              <h3 className={styles.planName}>{plan.name}</h3>
              <p className={styles.planDesc}>{plan.desc}</p>
              
              <div className={styles.priceWrap}>
                <span className={styles.currency}>₹</span>
                <span className={styles.price}>
                  {(yearly ? plan.yearly : plan.monthly).toLocaleString('en-IN')}
                </span>
                <span className={styles.period}>/{yearly ? 'yr' : 'mo'}</span>
              </div>
              
              <ul className={styles.features}>
                {plan.features.map(f => (
                  <li key={f}>
                    {/* UPSCALED CHECKMARK ICON TO MATCH 18px TEXT */}
                    <Check size={24} className={styles.checkIcon} />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              
              <motion.button
                className={`${styles.cta} ${plan.highlight ? styles.ctaHighlight : ''}`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {plan.highlight ? 'Deploy Enterprise AI' : 'Start Free Trial'}
              </motion.button>
            </motion.div>
          ))}
        </div>

        <p className={styles.disclaimer}>
          This page is provided for informational purposes only. Please contact our enterprise sales desk for bespoke RERA document mapping and custom ERP API integrations.
        </p>

      </div>
    </section>
  )
}