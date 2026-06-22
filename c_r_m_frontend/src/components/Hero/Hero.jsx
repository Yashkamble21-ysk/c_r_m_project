import { motion } from 'framer-motion'
import { ArrowRight, Play, TrendingUp, Users, MapPin, MessageSquare, BarChart3, DollarSign, Bot } from 'lucide-react'
import styles from './Hero.module.css'

const dashboardCards = [
  { icon: TrendingUp, label: 'Revenue', value: '₹2.4Cr', color: '#10B981', delay: 0.3 },
  { icon: Users, label: 'Active Leads', value: '1,247', color: '#2563EB', delay: 0.4 },
  { icon: MapPin, label: 'Plots Sold', value: '342', color: '#8B5CF6', delay: 0.5 },
  { icon: BarChart3, label: 'Conversion', value: '68%', color: '#06B6D4', delay: 0.6 },
  { icon: MessageSquare, label: 'AI Chats', value: '3.2K', color: '#F59E0B', delay: 0.7 },
  { icon: DollarSign, label: 'Pipeline', value: '₹18Cr', color: '#EF4444', delay: 0.8 },
]

const chatMessages = [
  { from: 'bot', text: 'Hi! I found 3 matching plots for Mr. Sharma based on his preferences.' },
  { from: 'user', text: 'Great! Schedule a site visit for tomorrow.' },
  { from: 'bot', text: 'Done! Visit scheduled for Plot #A-42 at 10 AM. Confirmation sent via WhatsApp.' }
]

export default function Hero() {
  const handleClick = (e, href) => {
    if (href?.startsWith('#')) {
      e.preventDefault()
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section className={styles.hero}>
      {/* Animated background elements */}
      <div className={styles.bgOrb1} />
      <div className={styles.bgOrb2} />
      <div className={styles.bgOrb3} />

      <div className={`container ${styles.heroInner}`}>
        <div className="row align-items-center g-5">
          {/* Left Content */}
          <div className="col-lg-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                className={styles.badge}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
              >
                <Bot size={14} /> AI-Powered CRM for Plot Sales
              </motion.div>

              <h1 className={styles.heading}>
                Get Started with the{' '}
                <span className={styles.gradientText}>#1 AI-Powered</span>{' '}
                Plot Sales CRM
              </h1>

              <p className={styles.subHeading}>
                Manage plot sales, customer relationships, bookings, site visits, follow-ups, documents, marketing campaigns, and AI-powered customer interactions from one intelligent CRM platform.
              </p>

              <p className={styles.description}>
                Automate sales, customer service, marketing, inventory management, and lead nurturing with AI assistants working alongside your sales team. Launch quickly with pre-built workflows and intelligent automation designed specifically for real estate and plot sales businesses.
              </p>

              <div className={styles.btnGroup}>
                <motion.a
                  href="#pricing"
                  onClick={(e) => handleClick(e, '#pricing')}
                  className={styles.btnMain}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Start Free Trial <ArrowRight size={18} />
                </motion.a>
                <motion.a
                  href="#dashboard"
                  onClick={(e) => handleClick(e, '#dashboard')}
                  className={styles.btnSecondary}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <Play size={18} /> Watch Demo
                </motion.a>
              </div>
            </motion.div>
          </div>

          {/* Right - Dashboard Illustration */}
          <div className="col-lg-6">
            <motion.div
              className={styles.dashboardWrap}
              initial={{ opacity: 0, x: 60, rotateY: -8 }}
              animate={{ opacity: 1, x: 0, rotateY: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              <div className={styles.dashboard}>
                {/* Top Bar */}
                <div className={styles.dashTopBar}>
                  <div className={styles.dashDots}>
                    <span /><span /><span />
                  </div>
                  <span className={styles.dashTitle}>PlotCRM Dashboard</span>
                </div>

                {/* Stats Grid */}
                <div className={styles.dashStats}>
                  {dashboardCards.map((card, i) => (
                    <motion.div
                      key={card.label}
                      className={styles.dashStatCard}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: card.delay, duration: 0.5 }}
                    >
                      <div className={styles.statIcon} style={{ background: `${card.color}20`, color: card.color }}>
                        <card.icon size={16} />
                      </div>
                      <div className={styles.statInfo}>
                        <span className={styles.statValue}>{card.value}</span>
                        <span className={styles.statLabel}>{card.label}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Chart Area */}
                <div className={styles.dashChart}>
                  <div className={styles.chartBars}>
                    {[65, 40, 80, 55, 90, 45, 70, 85, 50, 75, 60, 95].map((h, i) => (
                      <motion.div
                        key={i}
                        className={styles.chartBar}
                        initial={{ height: 0 }}
                        animate={{ height: `${h}%` }}
                        transition={{ delay: 0.8 + i * 0.05, duration: 0.6, ease: 'easeOut' }}
                        style={{
                          background: h > 70
                            ? 'linear-gradient(to top, #2563EB, #06B6D4)'
                            : 'rgba(37,99,235,0.2)'
                        }}
                      />
                    ))}
                  </div>
                </div>

                {/* AI Chat Widget */}
                <motion.div
                  className={styles.chatWidget}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2, duration: 0.6 }}
                >
                  <div className={styles.chatHeader}>
                    <Bot size={14} /> AI Sales Assistant
                  </div>
                  <div className={styles.chatMessages}>
                    {chatMessages.map((msg, i) => (
                      <motion.div
                        key={i}
                        className={`${styles.chatMsg} ${msg.from === 'bot' ? styles.botMsg : styles.userMsg}`}
                        initial={{ opacity: 0, x: msg.from === 'bot' ? -10 : 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1.4 + i * 0.3 }}
                      >
                        {msg.text}
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}