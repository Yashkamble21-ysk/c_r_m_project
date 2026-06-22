import { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate, Link } from 'react-router-dom'
import { 
  Mail, Lock, Eye, EyeOff, User, Phone, Building,
  ArrowRight, Shield, CheckCircle2, AlertCircle 
} from 'lucide-react'
import { toast } from 'react-toastify'
import styles from './Auth.module.css'

export default function Register() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    company: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState({})

  // Form validation
  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.full_name.trim()) {
      newErrors.full_name = 'Full name is required'
    }
    
    if (!formData.email) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email'
    }
    
    if (!formData.phone) {
      newErrors.phone = 'Phone number is required'
    }
    
    if (!formData.company) {
      newErrors.company = 'Company name is required'
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password'
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }
    
    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the terms'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Handle Registration Submit
  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      toast.error('Please fix the errors in the form')
      return
    }

    setIsLoading(true)

    try {
      // Payload matches your Laravel Controller requirements
      const payload = {
        full_name: formData.full_name,
        email: formData.email,
        phone: formData.phone,
        company: formData.company,
        password: formData.password
      }

      const response = await fetch('http://localhost:8000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
      })

      const data = await response.json()

      if (response.ok && data.status === true) {
        // Success notification
        toast.success(data.message || 'Registration Successful! Please login.', {
          position: 'top-right',
          autoClose: 2000
        })

        // Redirect to login page after success
        setTimeout(() => {
          navigate('/login')
        }, 2000)

      } else {
        // Handle Laravel validation errors
        if (response.status === 422 && data.errors) {
          const backendErrors = {}
          Object.keys(data.errors).forEach(key => {
            backendErrors[key] = data.errors[key][0]
          })
          setErrors(backendErrors)
          toast.error('Validation failed. Please check the form.')
        } else {
          toast.error(data.message || 'Registration failed.', {
            position: 'top-right',
            autoClose: 3000
          })
        }
      }
    } catch (error) {
      console.error('Registration error:', error)
      toast.error('Network error. Please check your connection.', {
        position: 'top-right',
        autoClose: 3000
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
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
            Join the Future of Real Estate Management
          </h2>
          <p className={styles.description}>
            Create your account to access enterprise-grade property management tools.
          </p>

          <div className={styles.featuresList}>
            <div className={styles.featureItem}>
              <CheckCircle2 size={20} className={styles.featureIcon} />
              <div>
                <h4>Instant Access</h4>
                <p>Start managing leads immediately</p>
              </div>
            </div>
          </div>

          <div className={styles.securityBadge}>
            <Shield size={16} />
            <span>Secure Registration</span>
          </div>
        </motion.div>
      </div>

      {/* Right Panel - Registration Form */}
      <div className={styles.authRightPanel} style={{ position: 'relative' }}>
        
        {/* Back to Home Button */}
        <Link to="/" className={styles.backToHome}>
          <ArrowRight size={18} style={{ transform: 'rotate(180deg)' }} />
          <span>Back to Home</span>
        </Link>

        <motion.div 
          className={styles.formContainer}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className={styles.formHeader}>
            <h2>Create Account</h2>
            <p>Fill in your details to get started</p>
          </div>

          <form onSubmit={handleSubmit} className={styles.authForm}>
            {/* Full Name Field */}
            <div className={styles.formGroup}>
              <label htmlFor="full_name" className={styles.formLabel}>
                Full Name *
              </label>
              <div className={`${styles.inputWrapper} ${errors.full_name ? styles.inputError : ''}`}>
                <User size={18} className={styles.inputIcon} />
                <input
                  type="text"
                  id="full_name"
                  name="full_name"
                  value={formData.full_name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className={styles.formInput}
                  disabled={isLoading}
                  autoFocus
                />
              </div>
              {errors.full_name && <span className={styles.fieldError}>{errors.full_name}</span>}
            </div>

            {/* Email Field */}
            <div className={styles.formGroup}>
              <label htmlFor="email" className={styles.formLabel}>
                Email Address *
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
                />
              </div>
              {errors.email && <span className={styles.fieldError}>{errors.email}</span>}
            </div>

            {/* Phone Field */}
            <div className={styles.formGroup}>
              <label htmlFor="phone" className={styles.formLabel}>
                Phone Number *
              </label>
              <div className={`${styles.inputWrapper} ${errors.phone ? styles.inputError : ''}`}>
                <Phone size={18} className={styles.inputIcon} />
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+91 9876543210"
                  className={styles.formInput}
                  disabled={isLoading}
                />
              </div>
              {errors.phone && <span className={styles.fieldError}>{errors.phone}</span>}
            </div>

            {/* Company Field */}
            <div className={styles.formGroup}>
              <label htmlFor="company" className={styles.formLabel}>
                Company Name *
              </label>
              <div className={`${styles.inputWrapper} ${errors.company ? styles.inputError : ''}`}>
                <Building size={18} className={styles.inputIcon} />
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="Your company name"
                  className={styles.formInput}
                  disabled={isLoading}
                />
              </div>
              {errors.company && <span className={styles.fieldError}>{errors.company}</span>}
            </div>

            {/* Password Field */}
            <div className={styles.formGroup}>
              <label htmlFor="password" className={styles.formLabel}>
                Password *
              </label>
              <div className={`${styles.inputWrapper} ${errors.password ? styles.inputError : ''}`}>
                <Lock size={18} className={styles.inputIcon} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Min 6 characters"
                  className={styles.formInput}
                  disabled={isLoading}
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className={styles.passwordToggle} tabIndex={-1}>
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && <span className={styles.fieldError}>{errors.password}</span>}
            </div>

            {/* Confirm Password Field */}
            <div className={styles.formGroup}>
              <label htmlFor="confirmPassword" className={styles.formLabel}>
                Confirm Password *
              </label>
              <div className={`${styles.inputWrapper} ${errors.confirmPassword ? styles.inputError : ''}`}>
                <Lock size={18} className={styles.inputIcon} />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Re-enter password"
                  className={styles.formInput}
                  disabled={isLoading}
                />
                <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className={styles.passwordToggle} tabIndex={-1}>
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.confirmPassword && <span className={styles.fieldError}>{errors.confirmPassword}</span>}
            </div>

            {/* Terms Checkbox */}
            <div className={styles.formGroup}>
              <label className={`${styles.checkboxLabel} ${errors.agreeToTerms ? styles.checkboxError : ''}`}>
                <input type="checkbox" name="agreeToTerms" checked={formData.agreeToTerms} onChange={handleChange} />
                <span>I agree to the Terms and Privacy Policy</span>
              </label>
            </div>

            {/* Submit Button */}
            <button type="submit" className={styles.submitBtn} disabled={isLoading}>
              {isLoading ? (
                <>
                  <div className={styles.spinner}></div>
                  <span>Creating Account...</span>
                </>
              ) : (
                <>
                  <User size={18} />
                  <span>Create Account</span>
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          <div className={styles.authFooter}>
            <p>
              Already have an account? 
              <Link to="/login" className={styles.authLink}>
                Sign In <ArrowRight size={14} />
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}