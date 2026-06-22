import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import {
  Users, CalendarCheck, Bot, Bell, 
  BarChart3, Coins, CheckCircle2, Clock
} from 'lucide-react'
import styles from './DashboardPreview.module.css'

export default function DashboardPreview() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.15 })

  return (
    <section id="dashboard" className={styles.section} ref={ref}>
      <div className={`container-fluid ${styles.containerInner}`}>
        
        {/* Outer Marketing Header remains bold */}
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className={styles.tag}>Live ERP Simulation</span>
          <h2 className={styles.title}>Your Command Center for <span className={styles.highlight}>Plot Sales</span></h2>
          <p className={styles.subtitle}>High information density built for native desktop workspaces</p>
        </motion.div>

        {/* Re-scaled 100% Windows Desktop UI Mockup */}
        <motion.div
          className={styles.dashboardWrap}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.25, duration: 0.7, ease: 'easeOut' }}
        >
          <div className={styles.dashContainer}>
            
            {/* Native 220px Sidebar */}
            <div className={styles.sidebar}>
              <div className={styles.sidebarLogo}>
                <div className={styles.logoIconWrap}>
                  <Bot size={18} />
                </div>
                <span>PlotCRM <strong>AI</strong></span>
              </div>
              
              <div className={styles.navMenu}>
                {['Command Center', 'Land Leads', 'Plot Inventory', 'Escrow Bookings', 'Client Ledger', 'RERA Reports', 'API Webhooks'].map(item => (
                  <div key={item} className={`${styles.sidebarItem} ${item === 'Command Center' ? styles.sidebarActive : ''}`}>
                    {item}
                  </div>
                ))}
              </div>
            </div>

            {/* Workspace Content */}
            <div className={styles.mainContent}>
              
              {/* Top Bar */}
              <div className={styles.topBar}>
                <span className={styles.welcome}>Good Morning, Rahul Sharma</span>
                <div className={styles.topRight}>
                  <span className={styles.projectPill}>Sector-7 Gated Villa Project</span>
                  <div className={styles.notifications}>
                    <Bell size={16} />
                    <span className={styles.notifDot} />
                  </div>
                </div>
              </div>

              {/* Native KPI Row */}
              <div className={styles.statsRow}>
                {[
                  { icon: Coins, label: 'Gross Revenue Fired', value: '₹2.40 Cr', change: '+14.2%', color: '#10B981' },
                  { icon: Users, label: 'Active Land Leads', value: '1,247', change: '+23.1%', color: '#2563EB' },
                  { icon: CalendarCheck, label: 'Escrow Lockings', value: '89 Units', change: '+8.4%', color: '#8B5CF6' },
                  { icon: Clock, label: 'Pending AI Follow-Ups', value: '34 Tasks', change: '-4.5%', color: '#F59E0B' },
                ].map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    className={styles.statCard}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.4 + i * 0.08, duration: 0.35 }}
                  >
                    <div className={styles.statIcon} style={{ background: `${stat.color}15`, color: stat.color }}>
                      {/* Dialed back to standard 20px UI icons */}
                      <stat.icon size={20} />
                    </div>
                    <div className={styles.statInfo}>
                      <div className={styles.statValue}>{stat.value}</div>
                      <div className={styles.statLabel}>{stat.label}</div>
                    </div>
                    <span className={styles.statChange} style={{ color: stat.change.startsWith('+') ? '#10B981' : '#EF4444' }}>
                      {stat.change}
                    </span>
                  </motion.div>
                ))}
              </div>

              {/* Split Feed Row */}
              <div className={styles.chartsRow}>
                
                {/* Standardized Chart Box */}
                <div className={styles.chartArea}>
                  <div className={styles.chartHeader}>
                    <span>Monthly Escrow Velocity (INR Lacs)</span>
                    <BarChart3 size={16} className={styles.chartIconGlow} />
                  </div>
                  <div className={styles.chartBars}>
                    {[45, 65, 40, 80, 55, 90, 60, 85, 70, 95, 50, 88].map((h, i) => (
                      <motion.div
                        key={i}
                        className={styles.chartBar}
                        initial={{ height: 0 }}
                        animate={inView ? { height: `${h}%` } : {}}
                        transition={{ delay: 0.7 + i * 0.03, duration: 0.5, ease: 'easeOut' }}
                        style={{
                          background: h > 70
                            ? 'linear-gradient(to top, #2563EB, #06B6D4)'
                            : 'rgba(37, 99, 235, 0.18)'
                        }}
                      />
                    ))}
                  </div>
                </div>

                {/* Dialed back 320px Side Panels */}
                <div className={styles.sidePanels}>
                  
                  <div className={styles.aiPanel}>
                    <div className={styles.aiHeader}>
                      <Bot size={15} /> Autonomous AI Agent Routing
                    </div>
                    {[
                      'Triggered WhatsApp link for Mr. Gupta — high intent NRI lead',
                      '3 premium corner plots in Phase II highly likely to sell this week',
                      'Dispatched Google Maps route link for Parcel #B-15 visit tomorrow'
                    ].map((s, i) => (
                      <motion.div
                        key={i}
                        className={styles.aiItem}
                        initial={{ opacity: 0, x: 10 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 0.9 + i * 0.1 }}
                      >
                        <CheckCircle2 size={13} className={styles.aiCheckIcon} /> 
                        <span>{s}</span>
                      </motion.div>
                    ))}
                  </div>

                  <div className={styles.activityPanel}>
                    <div className={styles.actHeader}>Live Ledger Ticker</div>
                    {[
                      'Escrow locked — Parcel #A-22 (₹5,00,000 Advance)',
                      'Razorpay link settled — ₹12,50,000 (Green Valley)',
                      'DocuSign RERA agreement executed — Dr. Sharma'
                    ].map((a, i) => (
                      <div key={i} className={styles.actItem}>
                        <div className={styles.actDot} /> 
                        <span>{a}</span>
                      </div>
                    ))}
                  </div>

                </div>

              </div>

            </div>

          </div>
        </motion.div>

      </div>
    </section>
  )
}