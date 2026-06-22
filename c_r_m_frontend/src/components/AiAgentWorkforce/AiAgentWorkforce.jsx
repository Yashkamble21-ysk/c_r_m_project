import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { 
  Bot, Zap, Clock, TrendingUp, Cpu, 
  MessageSquare, PhoneCall, FileText, CreditCard, ArrowRight
} from 'lucide-react'
import styles from './AiAgentWorkforce.module.css'

const aiWorkforce = [
  {
    id: '01',
    name: 'Vanguard AI',
    title: 'Top-of-Funnel Lead Singularity',
    humanEquivalent: 'Saves 3.5 FTEs',
    desc: 'Ingests 100% of raw incoming Meta, Google, and 99acres leads within 1.2 seconds. Instantly scrubs Truecaller DND registries and initiates bilingual WhatsApp discovery.',
    kpis: [
      { label: 'Avg. Response', val: '< 1.8s' },
      { label: 'Spam Filtered', val: '99.4%' }
    ],
    apis: ['Meta Graph', 'WhatsApp Business', 'Truecaller'],
    color: '#2563EB',
    icon: PhoneCall
  },
  {
    id: '02',
    name: 'Pathfinder AI',
    title: 'Site-Tour & Logistics Dispatcher',
    humanEquivalent: 'Saves 2.0 FTEs',
    desc: 'Engages qualified prospects to lock down physical weekend site visits. Autonomously dispatches customized Google Maps coordinates, weather updates, and gate-pass QR codes.',
    kpis: [
      { label: 'Visit Show-Up', val: '+42%' },
      { label: 'Reschedules', val: '100% Auto' }
    ],
    apis: ['Google Maps API', 'Twilio SMS', 'Dynamic QR'],
    color: '#06B6D4',
    icon: MessageSquare
  },
  {
    id: '03',
    name: 'Escrow-X',
    title: 'Instant Advance & RERA Closer',
    humanEquivalent: 'Saves 4.0 FTEs',
    desc: 'Strikes while the iron is hot. Generates instant, time-sensitive Razorpay token advance links right at the plot site and auto-generates digital RERA booking receipts.',
    kpis: [
      { label: 'Escrow Velocity', val: '3x Faster' },
      { label: 'Zero-Drop Rate', val: '100%' }
    ],
    apis: ['Razorpay Banking', 'DocuSign', 'RERA Portal'],
    color: '#10B981',
    icon: CreditCard
  },
  {
    id: '04',
    name: 'Ledger-AI',
    title: 'Post-Sale Installment Collector',
    humanEquivalent: 'Saves 2.5 FTEs',
    desc: 'Chases overdue payments so your humans don’t have to. Tracks multi-year plot installment schedules and dispatches polite, automated WhatsApp payment links 5 days prior to due dates.',
    kpis: [
      { label: 'On-Time EMIs', val: '88.5%' },
      { label: 'Default Rate', val: '< 2.1%' }
    ],
    apis: ['ICICI Escrow Sync', 'WhatsApp Pay', 'ERP Core'],
    color: '#8B5CF6',
    icon: FileText
  }
]

export default function AiAgentWorkforce() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.15 })

  return (
    <section id="workforce" className={styles.section} ref={ref}>
      {/* Edge-to-edge widescreen container matching global layout */}
      <div className={`container-fluid ${styles.containerInner}`}>
        
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className={styles.pulseBadge}>
            <span className={styles.pulseDot} /> AUTONOMOUS PAYROLL OFFSET
          </div>
          <h2 className={styles.title}>Meet Your Autonomous AI <span className={styles.highlight}>Field Workforce</span></h2>
          <p className={styles.subtitle}>
            You aren’t just subscribing to a database. You are hiring four tireless, highly synchronized digital specialists that work 24/7/365 without demanding commissions, sick leave, or sleep.
          </p>
        </motion.div>

        {/* Widescreen 4-Column Roster Grid */}
        <div className={styles.grid}>
          {aiWorkforce.map((agent, i) => (
            <motion.div
              key={agent.id}
              className={styles.agentCard}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.12, duration: 0.5, ease: 'easeOut' }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
            >
              {/* Top ID Bar */}
              <div className={styles.cardTop}>
                <div className={styles.agentId}>
                  <Cpu size={16} style={{ color: agent.color }} />
                  <span>UNIT // {agent.id}</span>
                </div>
                <span className={styles.fteBadge} style={{ backgroundColor: `${agent.color}15`, color: agent.color }}>
                  {agent.humanEquivalent}
                </span>
              </div>

              {/* Agent Bio */}
              <div className={styles.bioBox}>
                <div className={styles.avatarWrap} style={{ backgroundColor: `${agent.color}12`, color: agent.color }}>
                  <agent.icon size={28} />
                </div>
                <div>
                  <h3 className={styles.agentName}>{agent.name}</h3>
                  <span className={styles.agentTitle}>{agent.title}</span>
                </div>
              </div>

              <p className={styles.agentDesc}>{agent.desc}</p>

              {/* Internal KPI Display */}
              <div className={styles.kpiBox}>
                {agent.kpis.map(kpi => (
                  <div key={kpi.label} className={styles.kpiCol}>
                    <span className={styles.kpiVal}>{kpi.val}</span>
                    <span className={styles.kpiLbl}>{kpi.label}</span>
                  </div>
                ))}
              </div>

              {/* API Control Badges */}
              <div className={styles.apiStack}>
                <span className={styles.apiTitle}>NATIVE PROTOCOLS:</span>
                <div className={styles.apiPills}>
                  {agent.apis.map(api => (
                    <span key={api} className={styles.apiPill}>{api}</span>
                  ))}
                </div>
              </div>

              <div className={styles.cardBottomGlow} style={{ backgroundColor: agent.color }} />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}