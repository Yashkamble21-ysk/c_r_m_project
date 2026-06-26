import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import {
  Brain, Users, MapPin, CalendarCheck, CreditCard, Eye,
  MessageCircle, Mail, GitBranch, UserCog, BarChart3, Bot
} from 'lucide-react'
import styles from './Features.module.css'

const features = [
  { icon: Brain, title: 'AI Lead Management', desc: 'Automatically score, qualify, and route leads using intelligent AI algorithms.', gradient: 'linear-gradient(135deg, #2563EB, #06B6D4)' },
  { icon: Users, title: 'Customer Management', desc: '360° customer view with interaction history, preferences, and smart segmentation.', gradient: 'linear-gradient(135deg, #8B5CF6, #EC4899)' },
  { icon: MapPin, title: 'Plot Inventory', desc: 'Real-time plot availability, pricing tiers, and interactive site maps.', gradient: 'linear-gradient(135deg, #10B981, #06B6D4)' },
  { icon: CalendarCheck, title: 'Booking Management', desc: 'Seamless booking workflows with digital agreements and e-signatures.', gradient: 'linear-gradient(135deg, #F59E0B, #EF4444)' },
  { icon: CreditCard, title: 'Payment Tracking', desc: 'Track installments, generate payment schedules, and send auto-reminders.', gradient: 'linear-gradient(135deg, #2563EB, #8B5CF6)' },
  { icon: Eye, title: 'Site Visit Scheduling', desc: 'AI-optimized visit scheduling with route planning and follow-up automation.', gradient: 'linear-gradient(135deg, #06B6D4, #10B981)' },
  { icon: MessageCircle, title: 'WhatsApp Integration', desc: 'Native WhatsApp Business API for instant customer communication.', gradient: 'linear-gradient(135deg, #10B981, #2563EB)' },
  { icon: Mail, title: 'Email Marketing', desc: 'Automated drip campaigns, newsletters, and personalized email sequences.', gradient: 'linear-gradient(135deg, #EC4899, #8B5CF6)' },
  { icon: GitBranch, title: 'Sales Pipeline', desc: 'Visual Kanban pipeline with drag-and-drop deal management and forecasting.', gradient: 'linear-gradient(135deg, #F59E0B, #2563EB)' },
  { icon: UserCog, title: 'Employee Management', desc: 'Track team performance, set targets, and manage commissions effortlessly.', gradient: 'linear-gradient(135deg, #EF4444, #F59E0B)' },
  { icon: BarChart3, title: 'Reports & Analytics', desc: 'Real-time dashboards, custom reports, and AI-generated business insights.', gradient: 'linear-gradient(135deg, #06B6D4, #8B5CF6)' },
  { icon: Bot, title: 'AI Sales Assistant', desc: '24/7 AI chatbot that qualifies leads, answers queries, and books visits.', gradient: 'linear-gradient(135deg, #2563EB, #10B981)' },
]

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.06, duration: 0.5, ease: 'easeOut' }
  })
}

export default function Features() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section id="features" className={styles.section} ref={ref}>
      <div className={`container-fluid ${styles.containerInner}`}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className={styles.tag}>Features</span>
          <h2 className={styles.title}>Everything You Need to <span className={styles.highlight}>Sell More Plots</span></h2>
          <p className={styles.subtitle}>
            A complete AI-powered CRM platform built specifically for real estate plot sales businesses.
          </p>
        </motion.div>

        <div className={styles.grid}>
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              className={styles.card}
              custom={i}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              variants={cardVariants}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
            >
              <div className={styles.iconWrap} style={{ background: f.gradient }}>
                {/* UPGRADED ICON SIZE FROM 24 to 32 */}
                <f.icon size={32} />
              </div>
              <h3 className={styles.cardTitle}>{f.title}</h3>
              <p className={styles.cardDesc}>{f.desc}</p>
              <div className={styles.cardGlow} style={{ background: f.gradient }} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
