import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Menu, X, ChevronDown, LayoutDashboard,
  Headphones, Building2, Mail
} from 'lucide-react'
import styles from './Navbar.module.css'

const navLinks = [
  { label: 'Product', href: '#features' },
  { label: 'Industries', href: '#ai-section' },
  { label: 'Customers', href: '#testimonials' },
  { label: 'Events', href: '#stats' },
  { label: 'Learning', href: '#faq' }
]

const dropdownItems = [
  { icon: Headphones, label: 'Support', href: '#contact' },
  { icon: Building2, label: 'Company', href: '#platform' },
  { icon: Mail, label: 'Contact Us', href: '#contact' }
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
    setDropdownOpen(false)
  }, [location])

  const handleNavClick = (e, href) => {
    if (href.startsWith('#')) {
      e.preventDefault()
      const el = document.querySelector(href)
      if (el) el.scrollIntoView({ behavior: 'smooth' })
      setMobileOpen(false)
    }
  }

  return (
    <motion.nav
      className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      {/* Changed 'container' to 'container-fluid' for full-screen desktop width */}
      <div className={`container-fluid ${styles.navInner}`}>
        <Link to="/" className={styles.logo}>
          <LayoutDashboard size={28} />
          <span>Majestic Realties RM <strong>AI</strong></span>
        </Link>

        <ul className={`${styles.navLinks} ${mobileOpen ? styles.open : ''}`}>
          {navLinks.map(link => (
            <li key={link.label}>
              <a
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={styles.navLink}
              >
                {link.label}
              </a>
            </li>
          ))}
          <li
            className={styles.dropdownWrap}
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
          >
            <button
              className={`${styles.navLink} ${styles.dropdownBtn}`}
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              More <ChevronDown size={14} className={`${styles.chevron} ${dropdownOpen ? styles.chevronUp : ''}`} />
            </button>
            <AnimatePresence>
              {dropdownOpen && (
                <motion.ul
                  className={styles.dropdown}
                  initial={{ opacity: 0, y: 8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.96 }}
                  transition={{ duration: 0.2 }}
                >
                  {dropdownItems.map(item => (
                    <li key={item.label}>
                      <a
                        href={item.href}
                        onClick={(e) => handleNavClick(e, item.href)}
                        className={styles.dropdownItem}
                      >
                        <item.icon size={16} />
                        {item.label}
                      </a>
                    </li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </li>
        </ul>

        <div className={`${styles.authBtns} ${mobileOpen ? styles.open : ''}`}>
          {/* <Link to="/customer-register" className={styles.btnOutline}>Register</Link> */}
          <Link to="/login" className={styles.btnPrimary}>Login</Link>
        </div>

        <button
          className={styles.hamburger}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className={styles.mobileMenu}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            {navLinks.map(link => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={styles.mobileLink}
              >
                {link.label}
              </a>
            ))}
            <div className={styles.mobileAuth}>
              <Link to="/customer-register" className={styles.btnOutline}>Register</Link>
              <Link to="/login" className={styles.btnPrimary}>Login</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}