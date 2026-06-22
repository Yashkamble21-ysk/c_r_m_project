import { useState } from 'react'
import { Link } from 'react-router-dom'
import { LayoutDashboard, Send } from 'lucide-react'
import { toast } from 'react-toastify'
import styles from './Footer.module.css'

const footerLinks = {
  Company: [
    { label: 'About', href: '#' },
    { label: 'Careers', href: '#' },
    { label: 'Contact', href: '#contact' },
  ],
  Product: [
    { label: 'CRM', href: '#features' },
    { label: 'AI Assistant', href: '#ai-section' },
    { label: 'Marketing', href: '#features' },
  ],
  Support: [
    { label: 'Help Center', href: '#' },
    { label: 'Documentation', href: '#' },
    { label: 'FAQs', href: '#faq' },
  ],
  Legal: [
    { label: 'Privacy', href: '#' },
    { label: 'Terms', href: '#' },
  ],
}

const socials = [
  { label: 'LinkedIn', href: '#', icon: 'in' },
  { label: 'Facebook', href: '#', icon: 'fb' },
  { label: 'Instagram', href: '#', icon: 'ig' },
  { label: 'X', href: '#', icon: 'x' },
  { label: 'YouTube', href: '#', icon: 'yt' },
]

export default function Footer() {
  const [email, setEmail] = useState('')

  const handleSubscribe = (e) => {
    e.preventDefault()
    if (email) {
      toast.success('Subscribed successfully! 🎉')
      setEmail('')
    }
  }

  return (
    <footer className={styles.footer}>
      <div className={`container-fluid ${styles.containerInner}`}>
        <div className="row g-5">
          
          {/* Brand Column */}
          <div className="col-lg-4">
            <Link to="/" className={styles.logo}>
              <LayoutDashboard size={28} />
              <span>PlotCRM <strong>AI</strong></span>
            </Link>
            <p className={styles.brandDesc}>
              The #1 AI-powered CRM platform built specifically for plot sales businesses. Manage leads, automate follow-ups, and close deals faster.
            </p>
            <form className={styles.newsletter} onSubmit={handleSubscribe}>
              <input
                type="email"
                placeholder="Enter your business email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit"><Send size={18} /></button>
            </form>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title} className="col-6 col-lg-2">
              <h4 className={styles.linkTitle}>{title}</h4>
              <ul className={styles.linkList}>
                {links.map(link => (
                  <li key={link.label}>
                    <a href={link.href} className={styles.link}>{link.label}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

        </div>

        <div className={styles.bottom}>
          <p className={styles.copyright}>
            © {new Date().getFullYear()} Majestic Realties CRM AI Platform. All rights reserved.
          </p>
          <div className={styles.socials}>
            {socials.map(s => (
              <a
                key={s.label}
                href={s.href}
                className={styles.socialIcon}
                aria-label={s.label}
                title={s.label}
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}