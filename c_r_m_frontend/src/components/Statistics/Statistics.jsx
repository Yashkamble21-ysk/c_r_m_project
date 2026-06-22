import { useEffect } from 'react'
import { motion, useMotionValue, useTransform, animate } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Building2, MessageSquare, Heart, Target, Coins } from 'lucide-react'
import styles from './Statistics.module.css'

const stats = [
  { icon: Building2, value: 50, suffix: 'K+', label: 'Active Businesses', color: '#2563EB' },
  { icon: MessageSquare, value: 3, suffix: 'M+', label: 'AI Conversations', color: '#8B5CF6' },
  { icon: Heart, value: 98, suffix: '%', label: 'Client Satisfaction', color: '#10B981' },
  { icon: Target, value: 150, suffix: 'K+', label: 'Plot Leads Routed', color: '#06B6D4' },
  { icon: Coins, value: 250, suffix: 'M+', label: 'Sales Value (INR)', color: '#F59E0B' },
]

// Pure Framer-Motion native counter (Bypasses Vite ESM import bugs)
function AnimatedCounter({ end, suffix }) {
  const count = useMotionValue(0)
  const display = useTransform(count, (latest) => Math.round(latest) + suffix)

  useEffect(() => {
    const controls = animate(count, end, { duration: 2.5, ease: 'easeOut' })
    return () => controls.stop()
  }, [end])

  return <motion.span>{display}</motion.span>
}

export default function Statistics() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 })

  return (
    <section id="stats" className={styles.section} ref={ref}>
      {/* Upgraded to container-fluid for edge-to-edge widescreen desktop span */}
      <div className={`container-fluid ${styles.containerInner}`}>
        <div className={styles.grid}>
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              className={styles.card}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.5, ease: 'easeOut' }}
            >
              <div className={styles.iconWrap} style={{ background: `${s.color}18`, color: s.color }}>
                {/* UPSCALED ICON SIZE FROM 28 to 36 */}
                <s.icon size={36} />
              </div>
              
              <div className={styles.number}>
                {inView ? <AnimatedCounter end={s.value} suffix={s.suffix} /> : '0'}
              </div>
              
              <div className={styles.label}>{s.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}