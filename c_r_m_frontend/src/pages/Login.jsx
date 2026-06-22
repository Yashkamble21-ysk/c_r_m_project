import { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate, Link } from 'react-router-dom'
import { 
  Mail, Lock, Eye, EyeOff, LogIn, ArrowRight, 
  Shield, Zap, CheckCircle2, AlertCircle, ArrowLeft 
} from 'lucide-react'
import { toast } from 'react-toastify'
import styles from './Auth.module.css'

export default function Login() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState({})

  // Form validation
  const validateForm = () => {
    const newErrors = {}
    if (!formData.email) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email'
    }
    if (!formData.password) {
      newErrors.password = 'Password is required'
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Handle Login Submit
  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      toast.error('Please fix the errors')
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch('http://localhost:8000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        })
      })

      const data = await response.json()

      // Checking boolean true as per your Laravel code
      if (response.ok && data.status === true) {
        
        // Store token and customer data
        localStorage.setItem('authToken', data.token)
        localStorage.setItem('userData', JSON.stringify(data.customer))
        localStorage.setItem('userType', 'customer') // Since your model is Customer
        localStorage.setItem('isAuthenticated', 'true')

        // Success Popup
        toast.success(`Welcome back, ${data.customer.full_name}!`, {
          position: 'top-right',
          autoClose: 2000
        })

        // Redirect to dashboard
        setTimeout(() => {
          navigate('/dashboard', { replace: true })
        }, 1000)

      } else {
        // Handle Error
        const errorMessage = data.message || 'Invalid credentials'
        toast.error(errorMessage, {
          position: 'top-right',
          autoClose: 3000
        })
        setErrors({ general: errorMessage })
      }
    } catch (error) {
      console.error('Login error:', error)
      toast.error('Network error. Check your connection.', {
        position: 'top-right',
        autoClose: 3000
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }))
  }

  return (
    <div className={styles.authContainer}>
      {/* Left Panel - Branding */}
      <div className={styles.authLeftPanel}>
        <motion.div 
          className={styles.brandingContent}
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className={styles.logoSection}>
            <div className={styles.logoCircle}>
              <Shield size={32} />
            </div>
            <h1 className={styles.brandName}>
              PlotCRM <span className={styles.brandAccent}>AI</span>
            </h1>
          </div>

          <h2 className={styles.tagline}>
            Enterprise Real Estate Intelligence
          </h2>
          <p className={styles.description}>
            Secure RERA-compliant CRM ecosystem with AI-powered lead management.
          </p>

          <div className={styles.featuresList}>
            <div className={styles.featureItem}>
              <CheckCircle2 size={20} className={styles.featureIcon} />
              <div>
                <h4>Secure Authentication</h4>
                <p>Laravel Sanctum Powered</p>
              </div>
            </div>
          </div>

          <div className={styles.securityBadge}>
            <Shield size={16} />
            <span>ISO 27001 Certified</span>
          </div>
        </motion.div>
      </div>

      {/* Right Panel - Login Form */}
      <div className={styles.authRightPanel} style={{ position: 'relative' }}>
        
        {/* Back to Home Button */}
        <Link to="/" className={styles.backToHome}>
          <ArrowLeft size={18} />
          <span>Back to Home</span>
        </Link>

        <motion.div 
          className={styles.formContainer}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className={styles.formHeader}>
            <h2>Welcome Back</h2>
            <p>Login to your account</p>
          </div>

          {errors.general && (
            <motion.div 
              className={styles.errorAlert}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <AlertCircle size={18} />
              <span>{errors.general}</span>
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className={styles.authForm}>
            {/* Email Field */}
            <div className={styles.formGroup}>
              <label htmlFor="email" className={styles.formLabel}>
                Email Address
              </label>
              <div className={`${styles.inputWrapper} ${errors.email ? styles.inputError : ''}`}>
                <Mail size={18} className={styles.inputIcon} />
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className={styles.formInput}
                  disabled={isLoading}
                  autoFocus
                />
              </div>
              {errors.email && <span className={styles.fieldError}>{errors.email}</span>}
            </div>

            {/* Password Field */}
            <div className={styles.formGroup}>
              <label htmlFor="password" className={styles.formLabel}>
                Password
              </label>
              <div className={`${styles.inputWrapper} ${errors.password ? styles.inputError : ''}`}>
                <Lock size={18} className={styles.inputIcon} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className={styles.formInput}
                  disabled={isLoading}
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className={styles.passwordToggle} tabIndex={-1}>
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && <span className={styles.fieldError}>{errors.password}</span>}
            </div>

            {/* Remember Me */}
            <div className={styles.formOptions}>
              <label className={styles.checkboxLabel}>
                <input type="checkbox" name="rememberMe" checked={formData.rememberMe} onChange={handleChange} />
                <span>Remember me</span>
              </label>
            </div>

            {/* Submit Button */}
            <button type="submit" className={styles.submitBtn} disabled={isLoading}>
              {isLoading ? (
                <>
                  <div className={styles.spinner}></div>
                  <span>Authenticating...</span>
                </>
              ) : (
                <>
                  <LogIn size={18} />
                  <span>Sign In</span>
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          <div className={styles.authFooter}>
            <p>
              Don't have an account? 
              <Link to="/register" className={styles.authLink}>
                Create Account <ArrowRight size={14} />
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}