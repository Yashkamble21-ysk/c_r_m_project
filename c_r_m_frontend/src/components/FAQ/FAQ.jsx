import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ChevronDown, HelpCircle } from 'lucide-react'
import styles from './FAQ.module.css'

// Enriched with high-end category tags for optimal enterprise information density
const faqs = [
  {
    category: 'CORE CAPABILITIES',
    q: 'How does PlotCRM AI specifically work for land sales?',
    a: 'PlotCRM AI is an end-to-end real estate operating system engineered exclusively for plot developers. It autonomously captures incoming buyer inquiries across Meta Ads, WhatsApp, and walk-ins, assigns them instantly via algorithmic lead routing, schedules verified site visits, tracks token escrow advances, and automates multi-year installment ledgers.'
  },
  {
    category: 'AUTONOMOUS AGENTS',
    q: 'Are autonomous AI agents included in all subscription tiers?',
    a: 'Yes! Every PlotCRM plan includes core AI capabilities. The Starter tier provides automated algorithmic lead scoring, while Professional and above deploy fully autonomous AI Sales Assistants capable of answering complex customer queries, dispatching Google Maps routing links, and booking site visits 24/7.'
  },
  {
    category: 'INVENTORY SCALE',
    q: 'Can our organization manage multiple independent masterplans?',
    a: 'Absolutely. PlotCRM supports unlimited multi-phase masterplans with individual physical plot parcels, dynamic Preferential Location Charges (PLC), RERA document mapping, and dedicated sales teams. You can inspect and switch between massive land banks instantly from a single command matrix.'
  },
  {
    category: 'NATIVE SYNC',
    q: 'How deep is the native WhatsApp Business API integration?',
    a: 'Our integration is completely native and bi-directional. Your sales executives and AI bots can dispatch digital RERA sale agreements, collect instant token advances via secure payment links, share interactive masterplan coordinates, and run automated follow-up sequences entirely inside WhatsApp.'
  },
  {
    category: 'FIELD OPERATIONS',
    q: 'Is there a dedicated mobile application for field executives?',
    a: 'Yes, PlotCRM provides a lightning-fast, offline-capable mobile application for iOS and Android. Field agents can geofence site visits, scan customer KYC documents, inspect live plot availability instantly on the physical layout grid, and log token advances directly from the construction site.'
  },
  {
    category: 'ENTERPRISE SECURITY',
    q: 'What security protocols protect our sensitive client ledgers?',
    a: 'PlotCRM enforces zero-trust enterprise security backed by 256-bit SSL encryption, granular role-based RBAC permissions, automated hourly multi-region database snapshots, and strict SOC-2 Type II compliance. Your proprietary customer ledgers and financial data remain completely impenetrable.'
  },
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null)
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.15 })

  const toggle = (i) => setOpenIndex(openIndex === i ? null : i)

  return (
    <section id="faq" className={styles.section} ref={ref}>
      {/* Upgraded to container-fluid for edge-to-edge widescreen desktop span */}
      <div className={`container-fluid ${styles.containerInner}`}>
        
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className={styles.tag}>Knowledge Base</span>
          <h2 className={styles.title}>Frequently Asked <span className={styles.highlight}>Questions</span></h2>
          <p className={styles.subtitle}>Everything you need to know about deploying our AI real estate architecture</p>
        </motion.div>

        {/* Upscaled Centered FAQ Container (Expanded reading width) */}
        <div className={styles.faqList}>
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i
            return (
              <motion.div
                key={i}
                className={`${styles.faqItem} ${isOpen ? styles.itemOpen : ''}`}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.08, duration: 0.4, ease: 'easeOut' }}
              >
                <button
                  className={styles.question}
                  onClick={() => toggle(i)}
                  aria-expanded={isOpen}
                >
                  <div className={styles.questionLeft}>
                    <span className={styles.catBadge}>{faq.category}</span>
                    <span className={styles.qText}>{faq.q}</span>
                  </div>

                  <div className={`${styles.chevronWrap} ${isOpen ? styles.chevronWrapOpen : ''}`}>
                    {/* UPSCALED CHEVRON ICON FROM 20 to 24 */}
                    <ChevronDown size={24} className={styles.chevron} />
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      className={styles.answer}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: 'easeInOut' }}
                    >
                      <p>{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </div>

      </div>
    </section>
  )
}